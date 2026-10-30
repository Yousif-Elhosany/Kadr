// POST /api/redeem { code } → download links for that code's pack.
// Each successful call uses up one of the code's MAX_USES; links expire after LINK_TTL.
import { getStore } from '@netlify/blobs';
import { AwsClient } from 'aws4fetch';
import { PACKS, MAX_USES, checkCode } from '../../lib/codes.mjs';

const LINK_TTL = 60 * 60; // seconds

const json = (status, body) => Response.json(body, { status, headers: { 'cache-control': 'no-store' } });

async function signedUrl(key) {
  const env = process.env;
  const r2 = new AwsClient({ accessKeyId: env.R2_ACCESS_KEY_ID, secretAccessKey: env.R2_SECRET_ACCESS_KEY, service: 's3', region: 'auto' });
  const url = new URL(`https://${env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com/${env.R2_BUCKET}/${key}`);
  url.searchParams.set('X-Amz-Expires', String(LINK_TTL));
  url.searchParams.set('response-content-disposition', `attachment; filename="KADR-${key}"`);
  const signed = await r2.sign(new Request(url), { aws: { signQuery: true } });
  return signed.url;
}

export default async (req) => {
  if (req.method !== 'POST') return json(405, { error: 'method' });
  const env = process.env;
  if (!env.CODE_SECRET || !env.R2_ACCOUNT_ID || !env.R2_ACCESS_KEY_ID || !env.R2_SECRET_ACCESS_KEY || !env.R2_BUCKET) {
    return json(500, { error: 'setup' });
  }

  const { code: input } = await req.json().catch(() => ({}));
  const found = checkCode(env.CODE_SECRET, input);
  if (!found) return json(404, { error: 'invalid' });

  const store = getStore({ name: 'codes', consistency: 'strong' });
  const now = new Date().toISOString();
  const rec = (await store.get(found.code, { type: 'json' })) || { uses: 0, first: now };
  if (rec.uses >= MAX_USES) return json(410, { error: 'used', uses: rec.uses });

  rec.uses += 1;
  rec.last = now;
  await store.setJSON(found.code, rec);

  const files = await Promise.all(PACKS[found.prefix].map(async (key) => ({ name: key, url: await signedUrl(key) })));
  return json(200, { pack: found.prefix, files, left: MAX_USES - rec.uses, expiresIn: LINK_TTL });
};

export const config = { path: '/api/redeem' };

// Download page: send the coupon code to /api/redeem and list the files it unlocks.
(() => {
  const D = window.KADR;
  const T = {
    ar: {
      'dl.title': 'حمّل الباك بتاعك',
      'dl.sub': 'اكتب الكود اللي وصلك على الواتساب.',
      'dl.label': 'كود التحميل',
      'dl.go': 'حمّل',
      'dl.help': 'محتاج مساعدة؟ كلّمنا على واتساب',
      'dl.checking': 'بنشيّك على الكود…',
      'dl.ok': 'الكود شغال ✓ دوس على كل ملف علشان يتحمّل. اللينكات دي شغالة لمدة ساعة.',
      'dl.left': 'فاضلك {n} من {max} مرات تستخدم الكود.',
      'dl.last': 'ده كان آخر استخدام للكود، فحمّل كل الملفات دلوقتي.',
      'dl.invalid': 'الكود ده مش صحيح. اتأكد إنك كاتبه زي ما وصلك بالظبط.',
      'dl.used': 'الكود ده اتستخدم {max} مرات وخلص. كلّمنا على واتساب لو محتاج مساعدة.',
      'dl.setup': 'التحميل واقف دلوقتي. كلّمنا على واتساب وهنبعتلك الملفات.',
      'dl.net': 'فيه مشكلة في الاتصال. جرّب تاني.',
      'dl.wa': 'أهلاً كادر، عندي مشكلة في كود التحميل: {code}',
      'file.texture': 'باك التكستشر'
    },
    en: {
      'dl.title': 'Download your pack',
      'dl.sub': 'Enter the code you got on WhatsApp.',
      'dl.label': 'Download code',
      'dl.go': 'Download',
      'dl.help': 'Need help? Chat with us on WhatsApp',
      'dl.checking': 'Checking your code…',
      'dl.ok': 'Code accepted ✓ Tap each file to download it. These links work for one hour.',
      'dl.left': 'You can use this code {n} more times out of {max}.',
      'dl.last': 'That was the last use of this code, so download every file now.',
      'dl.invalid': 'That code isn’t valid. Check that you typed it exactly as you got it.',
      'dl.used': 'This code has been used {max} times and has expired. Chat with us on WhatsApp if you need help.',
      'dl.setup': 'Downloads are paused right now. Chat with us on WhatsApp and we’ll send your files.',
      'dl.net': 'Connection problem. Please try again.',
      'dl.wa': 'Hi KADR, I have a problem with my download code: {code}',
      'file.texture': 'Texture Pack'
    }
  };
  const MAX = 3;

  let lang = 'ar';
  try {
    const s = new URLSearchParams(location.search).get('lang') || localStorage.getItem('kadr-lang');
    if (s === 'en' || s === 'ar') lang = s;
  } catch (e) { /* storage blocked */ }

  const t = k => T[lang][k] ?? D.t[lang][k] ?? T.ar[k] ?? D.t.ar[k] ?? k;
  const num = n => new Intl.NumberFormat(lang === 'ar' ? 'ar-EG' : 'en-US').format(n);
  const $ = s => document.querySelector(s);
  const form = $('#dlForm'), input = $('#code'), go = $('#dlGo'), msg = $('#dlMsg'), list = $('#dlFiles'), help = $('#dlHelp');

  const fileName = key => {
    const id = key.replace(/\.zip$/, '');
    const pack = D.packs.find(p => p.id === id);
    return pack ? pack.name[lang] : t('file.' + id);
  };

  let shown = null; // last successful result, re-rendered on language switch
  let status = null; // [key, className] of the current message

  function say(key, cls) { status = [key, cls]; renderMsg(); }
  function renderMsg() {
    if (!status) { msg.textContent = ''; msg.className = 'dl-msg'; return; }
    msg.textContent = t(status[0]).replace('{max}', num(MAX));
    msg.className = 'dl-msg ' + (status[1] || '');
  }

  function renderFiles() {
    list.innerHTML = '';
    if (!shown) return;
    for (const f of shown.files) {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = f.url;
      a.rel = 'noopener';
      a.innerHTML = `<span></span><span class="arrow">↓ ZIP</span>`;
      a.firstChild.textContent = fileName(f.name);
      li.append(a);
      list.append(li);
    }
    const left = document.createElement('li');
    left.className = 'dl-msg';
    left.textContent = shown.left > 0 ? t('dl.left').replace('{n}', num(shown.left)).replace('{max}', num(MAX)) : t('dl.last');
    list.append(left);
  }

  function renderHelp() {
    const text = t('dl.wa').replace('{code}', input.value.trim() || '-');
    help.href = `https://wa.me/${D.config.whatsapp}?text=${encodeURIComponent(text)}`;
  }

  function applyLang() {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.title = `${t('brand')} | ${t('dl.title')}`;
    document.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n); });
    document.querySelectorAll('[data-i18n-aria]').forEach(el => el.setAttribute('aria-label', t(el.dataset.i18nAria)));
    renderMsg(); renderFiles(); renderHelp();
  }

  // A refresh shouldn't burn a use: reuse this tab's result while its links are fresh.
  const cacheKey = code => 'kadr-dl:' + code.toUpperCase().replace(/[^A-Z0-9]/g, '');
  function fromCache(code) {
    try {
      const c = JSON.parse(sessionStorage.getItem(cacheKey(code)));
      if (c && Date.now() < c.until) return c.data;
    } catch (e) { /* storage blocked */ }
    return null;
  }
  function toCache(code, data) {
    try { sessionStorage.setItem(cacheKey(code), JSON.stringify({ data, until: Date.now() + (data.expiresIn - 300) * 1000 })); } catch (e) { /* storage blocked */ }
  }

  async function redeem(code) {
    shown = null; renderFiles();
    const cached = fromCache(code);
    if (cached) { shown = cached; say('dl.ok', 'ok'); renderFiles(); return; }

    go.disabled = true;
    say('dl.checking');
    try {
      const res = await fetch('/api/redeem', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ code }) });
      const data = await res.json().catch(() => ({}));
      if (res.ok) { shown = data; toCache(code, data); say('dl.ok', 'ok'); renderFiles(); }
      else if (res.status === 404) say('dl.invalid', 'err');
      else if (res.status === 410) say('dl.used', 'err');
      else say('dl.setup', 'err');
    } catch (e) {
      say('dl.net', 'err');
    } finally {
      go.disabled = false;
    }
  }

  form.addEventListener('submit', e => {
    e.preventDefault();
    const code = input.value.trim();
    if (!code) { input.focus(); return; }
    renderHelp();
    redeem(code);
  });
  input.addEventListener('input', renderHelp);

  $('#langToggle').addEventListener('click', () => {
    lang = lang === 'ar' ? 'en' : 'ar';
    try { localStorage.setItem('kadr-lang', lang); } catch (e) { /* storage blocked */ }
    applyLang();
  });

  const pre = new URLSearchParams(location.search).get('code');
  if (pre) input.value = pre;
  applyLang();
})();

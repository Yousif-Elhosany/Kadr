(() => {
  'use strict';
  const D = window.KADR;
  const root = document.documentElement;
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(pointer: fine)').matches;
  root.classList.toggle('reduce', reduce);
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({ ignoreMobileResize: true });

  // ---------- language ----------
  let lang = 'ar';
  try {
    const s = new URLSearchParams(location.search).get('lang') || localStorage.getItem('kadr-lang');
    if (s === 'ar' || s === 'en') lang = s;
  } catch (e) { /* storage blocked */ }

  const t = k => D.t[lang][k] ?? D.t.ar[k] ?? k;
  const L = o => o[lang] ?? o.ar;
  const num = n => new Intl.NumberFormat(lang === 'ar' ? 'ar-EG' : 'en-US').format(n);
  const price = n => `${num(n)} ${D.config.currency[lang]}`;
  const inline = s => s.replace(/\*(.+?)\*/g, '<em>$1</em>');
  const wa = msg => `https://wa.me/${D.config.whatsapp}?text=${encodeURIComponent(msg)}`;

  // words wrapped for reveal; *stars* mark the accent words
  function splitInto(el, text) {
    el.setAttribute('aria-label', text.replace(/\*/g, ''));
    let acc = false;
    el.innerHTML = text.split(/\s+/).filter(Boolean).map(tok => {
      if (tok.startsWith('*')) acc = true;
      const html = `<span class="w" aria-hidden="true"><span class="wi${acc ? ' acc' : ''}">${tok.replace(/\*/g, '')}</span></span>`;
      if (tok.endsWith('*')) acc = false;
      return html;
    }).join(' ');
  }

  // ---------- generated textures + scene ----------
  (function makeNoise() {
    const c = document.createElement('canvas'), g = c.getContext('2d');
    c.width = c.height = 160;
    const img = g.createImageData(160, 160);
    for (let i = 0; i < img.data.length; i += 4) {
      const v = (60 + Math.random() * 195) | 0;
      img.data[i] = img.data[i + 1] = img.data[i + 2] = v;
      img.data[i + 3] = 255;
    }
    g.putImageData(img, 0, 0);
    root.style.setProperty('--noise', `url(${c.toDataURL()})`);
  })();

  const sceneSVG = id => `
    <svg viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="sky${id}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#1d2b53"/><stop offset=".5" stop-color="#c8574f"/><stop offset=".72" stop-color="#ffbf69"/>
        </linearGradient>
        <radialGradient id="sun${id}"><stop offset="0" stop-color="#fff6d5"/><stop offset=".55" stop-color="#ffd27a" stop-opacity=".9"/><stop offset="1" stop-color="#ffb347" stop-opacity="0"/></radialGradient>
        <linearGradient id="sea${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a4d7a"/><stop offset="1" stop-color="#0c1428"/></linearGradient>
      </defs>
      <rect width="1600" height="1000" fill="url(#sky${id})"/>
      <circle cx="1000" cy="590" r="300" fill="url(#sun${id})"/>
      <circle cx="1000" cy="590" r="108" fill="#fff1c9"/>
      <g fill="none" stroke="#2b1b2e" stroke-width="4" stroke-linecap="round">
        <path d="M560 300 q14 -14 28 0 q14 -14 28 0"/><path d="M640 250 q10 -10 20 0 q10 -10 20 0"/><path d="M500 360 q9 -9 18 0 q9 -9 18 0"/>
      </g>
      <path d="M0 610 L170 470 L330 560 L520 390 L700 540 L860 450 L1040 590 L1240 430 L1420 550 L1600 470 L1600 1000 L0 1000Z" fill="#7a3b5c" opacity=".9"/>
      <path d="M0 680 L240 550 L430 650 L640 520 L880 660 L1100 550 L1330 670 L1600 570 L1600 1000 L0 1000Z" fill="#4a2347"/>
      <rect y="700" width="1600" height="300" fill="url(#sea${id})"/>
      <g fill="#ffd9a0">
        <rect x="900" y="722" width="200" height="5" rx="2.5" opacity=".9"/><rect x="930" y="748" width="140" height="4" rx="2" opacity=".7"/>
        <rect x="955" y="772" width="90" height="4" rx="2" opacity=".5"/><rect x="975" y="796" width="50" height="3" rx="1.5" opacity=".35"/>
      </g>
      <g fill="#0b0f1e">
        <path d="M380 790 h170 l-28 24 h-114z"/><rect x="462" y="700" width="5" height="92"/><path d="M467 706 L520 782 H467Z"/>
      </g>
    </svg>`;
  $$('[data-scene]').forEach((el, i) => { el.innerHTML = sceneSVG(i); });

  // ---------- render language-dependent content ----------
  function visHTML(type) {
    if (type === 'wave') return `<div class="vis-wave">${Array.from({ length: 34 }, (_, i) =>
      `<i style="--h:${(22 + Math.abs(Math.sin(i * 1.7) * Math.cos(i * .4)) * 74).toFixed(0)}%;--d:${(-i * .07).toFixed(2)}s"></i>`).join('')}</div>`;
    if (type === 'swatch') return '<div class="vis-swatch"><i></i><i></i><i></i><i></i></div>';
    if (type === 'frames') return '<div class="vis-frames"><i></i><i></i><i></i></div>';
    return '<div class="vis-stack"><i></i><i></i><i></i></div>';
  }

  function tilt(card) {
    const rx = gsap.quickTo(card, 'rotationX', { duration: .5, ease: 'power3' });
    const ry = gsap.quickTo(card, 'rotationY', { duration: .5, ease: 'power3' });
    card.addEventListener('pointermove', e => {
      const r = card.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
      ry((x - .5) * 10); rx((.5 - y) * 10);
      card.style.setProperty('--mx', `${x * 100}%`);
      card.style.setProperty('--my', `${y * 100}%`);
    });
    card.addEventListener('pointerleave', () => { rx(0); ry(0); });
  }

  function renderPacks() {
    $('#packs').innerHTML = D.packs.map(p => {
      const name = L(p.name);
      const msg = t('wa.msg').replace('{pack}', name).replace('{price}', price(p.price));
      return `<article class="pack${p.featured ? ' featured' : ''}" data-reveal>
        ${p.featured ? `<span class="badge">${t('kit.featured')}</span>` : ''}
        <div class="pack-vis">${visHTML(p.vis)}</div>
        <h3>${name}</h3>
        <p class="count">${t('kit.files').replace('{n}', num(p.count))}</p>
        <p class="pack-desc">${L(p.desc)}</p>
        <ul>${L(p.items).map(i => `<li>${i}</li>`).join('')}</ul>
        <div class="price"><b>${price(p.price)}</b>${p.oldPrice ? `<s>${price(p.oldPrice)}</s>` : ''}</div>
        <a class="btn${p.featured ? '' : ' btn-ghost'}" href="${wa(msg)}" target="_blank" rel="noopener"><span>${t('kit.order')}</span></a>
        <div class="pack-glare"></div>
      </article>`;
    }).join('');
    if (fine && !reduce) $$('.pack').forEach(tilt);
  }

  function renderRest() {
    $('#faqList').innerHTML = D.faq.map(f =>
      `<details><summary>${L(f.q)}<i aria-hidden="true"></i></summary><p>${L(f.a)}</p></details>`).join('');

    const words = L(D.marquee);
    $$('.mrow').forEach((row, r) => {
      const list = [...words.slice(r * 3), ...words.slice(0, r * 3)];
      row.innerHTML = [...list, ...list, ...list].map((w, i) => `<span${(i + r) % 5 === 2 ? ' class="hl"' : ''}>${w}</span>`).join('');
    });

    const k = t('words.caption').split(/\s+/), kar = $('#karaoke');
    kar.style.setProperty('--n', k.length);
    kar.innerHTML = k.map((w, i) => `<span class="k" style="--i:${i}">${w}</span>`).join(' ');

    $('#waGeneral').href = wa(t('wa.general'));
  }

  function applyLang() {
    root.lang = lang;
    root.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.title = t('meta.title');
    $$('[data-i18n]').forEach(el => {
      const v = t(el.dataset.i18n);
      if (el.hasAttribute('data-split')) splitInto(el, v); else el.innerHTML = inline(v);
    });
    $$('[data-i18n-aria]').forEach(el => el.setAttribute('aria-label', t(el.dataset.i18nAria)));
    renderPacks();
    renderRest();
  }

  // ---------- hero static (TV noise) ----------
  const tv = (() => {
    const c = $('#static'), g = c.getContext('2d');
    c.width = 200; c.height = 112;
    const img = g.createImageData(200, 112);
    let run = false, last = 0;
    function frame(ts) {
      if (!run) return;
      if (ts - last > 45) {
        last = ts;
        const d = img.data;
        for (let i = 0; i < d.length; i += 4) { const v = (Math.random() * 255) | 0; d[i] = d[i + 1] = d[i + 2] = v; d[i + 3] = 255; }
        g.putImageData(img, 0, 0);
      }
      requestAnimationFrame(frame);
    }
    return { on() { if (!run) { run = true; requestAnimationFrame(frame); } }, off() { run = false; } };
  })();
  tv.on();

  // ---------- waveform (scroll = playhead) ----------
  const wave = (() => {
    const c = $('#wave'), g = c.getContext('2d'), N = 150, amps = [];
    const ev = [{ at: .14, w: .045, a: 1 }, { at: .38, w: .025, a: 1 }, { at: .62, w: .13, a: .85, rise: true }, { at: .86, w: .05, a: .9 }];
    for (let i = 0; i < N; i++) {
      const x = i / N;
      let a = .05 + Math.random() * .07;
      ev.forEach(e => {
        if (e.rise) { if (x <= e.at && x > e.at - e.w * 2) a = Math.max(a, e.a * (1 - (e.at - x) / (e.w * 2)) * (.8 + Math.random() * .2)); }
        else { const d = (x - e.at) / e.w; a = Math.max(a, e.a * Math.exp(-d * d * 2) * (.7 + Math.random() * .3)); }
      });
      amps.push(Math.min(1, a));
    }
    const tags = $$('.wave-tag');
    let p = 0, w = 0, h = 0, dpr = 1;
    function draw() {
      g.setTransform(dpr, 0, 0, dpr, 0, 0);
      g.clearRect(0, 0, w, h);
      const bw = w / N, mid = h / 2;
      for (let i = 0; i < N; i++) {
        const on = i / N < p, bh = Math.max(2, (on ? amps[i] : .02) * h * .8);
        g.fillStyle = on ? (amps[i] > .55 ? '#ff3b1f' : '#f2efe8') : 'rgba(242,239,232,.16)';
        g.fillRect(i * bw + bw * .2, mid - bh / 2, bw * .6, bh);
      }
      g.fillStyle = '#ffb000';
      g.fillRect(p * w - 1, 0, 2, h);
    }
    function size() {
      dpr = Math.min(2, window.devicePixelRatio || 1);
      w = c.clientWidth; h = c.clientHeight;
      c.width = w * dpr; c.height = h * dpr;
      draw();
    }
    addEventListener('resize', size);
    size();
    return {
      set(v) {
        const prev = p;
        p = v;
        draw();
        tags.forEach(tg => {
          const at = +tg.dataset.at, was = prev >= at, now = p >= at;
          tg.classList.toggle('on', now);
          if (now && !was) SFX.ui(tg.dataset.sfx);
        });
      }
    };
  })();

  // ---------- HUD ----------
  const hudFill = $('.hud-fill'), hudHead = $('.hud-head'), tcEl = $('#tc'), hudCh = $('#hudCh');
  const tc = sec => {
    const f = Math.floor(sec * 25), pad = n => String(n).padStart(2, '0');
    return `${pad(Math.floor(f / 90000))}:${pad(Math.floor(f / 1500) % 60)}:${pad(Math.floor(f / 25) % 60)}:${pad(f % 25)}`;
  };
  function hud(p) {
    hudFill.style.transform = `scaleX(${p})`;
    hudHead.style.left = `${p * 100}%`;
    tcEl.textContent = tc(p * D.config.storyLength);
  }
  // the active chapter is the last one whose top has passed 55% of the viewport
  // (measured live, so pinned sections and their spacers just work)
  const secs = $$('[data-chapter]');
  const box = sec => (sec.parentElement.classList.contains('pin-spacer') ? sec.parentElement : sec);
  let current = null;
  function chapterNow() {
    const line = innerHeight * .55;
    let active = secs[0];
    for (const sec of secs) if (box(sec).getBoundingClientRect().top <= line) active = sec;
    if (active === current) return;
    const first = current === null;
    current = active;
    hudCh.textContent = t(active.dataset.chapter);
    if (!first && !booting) SFX.ui('whoosh');
  }
  ScrollTrigger.addEventListener('refresh', () => {
    const max = ScrollTrigger.maxScroll(window) || 1;
    $('.hud-marks').innerHTML = secs.slice(1).map(sec => {
      const top = box(sec).getBoundingClientRect().top + scrollY - innerHeight * .55;
      return `<i class="hud-mark" style="left:${Math.min(100, Math.max(0, top / max * 100)).toFixed(2)}%"></i>`;
    }).join('');
    current = null;
    chapterNow();
  });
  const t0 = performance.now();
  setInterval(() => { $('#heroTc').textContent = tc((performance.now() - t0) / 1000); }, 40);

  // ---------- scroll story ----------
  let ctx, booting = !reduce;
  function build() {
    const rtl = root.dir === 'rtl';
    // created after the pins so their positions include the pin spacing
    const wireHud = () => {
      current = null;
      ScrollTrigger.create({ start: 0, end: 'max', onUpdate: st => { hud(st.progress); chapterNow(); } });
      ScrollTrigger.create({ start: 80, end: 'max', onToggle: st => $('.nav').classList.toggle('scrolled', st.isActive) });
    };
    ctx = gsap.context(() => {
      if (reduce) {
        $$('[data-count]').forEach(el => { el.textContent = num(+el.dataset.count); });
        wave.set(1);
        wireHud();
        return;
      }

      // hero: drift away + keep TV noise only while visible
      gsap.to('.hero-inner', { yPercent: -16, opacity: 0, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
      ScrollTrigger.create({ trigger: '.hero', start: 'top top', end: 'bottom top', onToggle: st => (st.isActive ? tv.on() : tv.off()) });

      // headings: words rise out of a mask
      $$('[data-split]').forEach(el => {
        if (el.closest('.hero, .ch-end')) return;
        gsap.from($$('.wi', el), { yPercent: 115, rotate: rtl ? -3 : 3, duration: 1.1, ease: 'expo.out', stagger: .05, scrollTrigger: { trigger: el, start: 'top 86%' } });
      });
      $$('[data-reveal]').forEach(el => gsap.from(el, { y: 44, opacity: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 90%' } }));

      $$('[data-count]').forEach(el => {
        const o = { v: 0 };
        el.textContent = num(0);
        gsap.to(o, { v: +el.dataset.count, duration: 1.8, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 94%' }, onUpdate: () => { el.textContent = num(Math.round(o.v)); } });
      });

      // 01 sound — scroll drives the playhead
      ScrollTrigger.create({ trigger: '.wave-wrap', start: 'top 85%', end: 'bottom 30%', scrub: true, onUpdate: st => wave.set(st.progress) });
      gsap.from('.pad', { y: 30, opacity: 0, stagger: .06, duration: .8, ease: 'power3.out', scrollTrigger: { trigger: '.pads', start: 'top 92%' } });

      // 02 color — pinned, scroll wipes LOG into the grade
      gsap.timeline({ scrollTrigger: { trigger: '.ch-color', start: 'top top', end: '+=140%', scrub: true, pin: true, anticipatePin: 1, refreshPriority: 3 } })
        .fromTo('.scene-log', { clipPath: 'inset(0% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 100%)', ease: 'none' }, 0)
        .fromTo('.split-line', { left: '0%' }, { left: '100%', ease: 'none' }, 0)
        .fromTo('.color-stage svg', { scale: 1.14 }, { scale: 1, ease: 'none' }, 0);

      // 03 motion — pinned horizontal reel (runs right-to-left in Arabic)
      const track = $('.mtrack');
      const dist = () => Math.max(0, track.scrollWidth - root.clientWidth);
      gsap.to(track, {
        x: () => (rtl ? 1 : -1) * dist(), ease: 'none',
        scrollTrigger: { trigger: '.ch-motion', start: 'top top', end: () => `+=${dist()}`, pin: true, scrub: .6, invalidateOnRefresh: true, refreshPriority: 2 }
      });

      // 04 texture — grain and halftone eat into the clean word
      gsap.fromTo('.tex-word', { '--grain': 0 }, { '--grain': 1, ease: 'none', scrollTrigger: { trigger: '.tex-word', start: 'top 85%', end: 'bottom 35%', scrub: true } });
      gsap.from('.tile', { y: 70, opacity: 0, rotate: i => (i % 2 ? 4 : -4), stagger: .08, duration: 1.1, ease: 'power3.out', scrollTrigger: { trigger: '.tiles', start: 'top 88%' } });

      // 05 words — rows slide against each other
      const s = rtl ? 1 : -1;
      $$('.mrow').forEach((row, i) => {
        const a = i % 2 ? 20 * s : 0, b = i % 2 ? 0 : 20 * s;
        gsap.fromTo(row, { xPercent: a }, { xPercent: b, ease: 'none', scrollTrigger: { trigger: '.marquee', start: 'top bottom', end: 'bottom top', scrub: true } });
      });

      // the end — iris out to black, then the title
      gsap.timeline({ scrollTrigger: { trigger: '.ch-end', start: 'top top', end: '+=150%', scrub: true, pin: true, refreshPriority: 1 } })
        .fromTo('.end-iris', { clipPath: 'circle(75% at 50% 50%)' }, { clipPath: 'circle(0% at 50% 50%)', ease: 'power2.in', duration: 1 })
        .fromTo('.end-iris svg', { scale: 1 }, { scale: 1.25, ease: 'none', duration: 1 }, 0)
        .from($$('.end-title .wi'), { yPercent: 115, stagger: .08, duration: .5, ease: 'power3.out' }, .85)
        .from(['.end-sub', '.end-cta'], { opacity: 0, y: 24, stagger: .1, duration: .4 }, 1.1);

      wireHud();
    });
    // pins refresh first (top to bottom, via refreshPriority), then everything else
    ScrollTrigger.sort();
    ScrollTrigger.refresh();
  }

  // ---------- TV switch-on intro ----------
  function boot() {
    const kids = ['.rec', '.hero-sub', '.hero-ctas', '.scroll-cue'];
    gsap.timeline({ onComplete: () => { booting = false; } })
      .set('.screen', { scaleX: 0, scaleY: .006, filter: 'brightness(4)' })
      .set('.static', { opacity: 1 })
      .set(['.hero-title', ...kids, '.hud', '.nav'], { autoAlpha: 0 })
      .to('.screen', { scaleX: 1, duration: .32, ease: 'power3.out', delay: .25 })
      .to('.screen', { scaleY: 1, duration: .45, ease: 'expo.out' })
      .to('.screen', { filter: 'brightness(1)', duration: .5 }, '<')
      .to('.static', { opacity: .07, duration: .55, ease: 'power2.in' }, '+=.5')
      .set('.hero-title', { autoAlpha: 1 }, '<.2')
      .from('.hero-title .wi', { yPercent: 115, duration: 1.1, ease: 'expo.out', stagger: .07 }, '<')
      .to([...kids, '.nav', '.hud'], { autoAlpha: 1, duration: .8, stagger: .08, ease: 'power2.out' }, '-=.7')
      .from(kids, { y: 18, duration: .8, stagger: .08, ease: 'power3.out' }, '<')
      .set('.screen', { clearProps: 'transform,filter' });
  }

  // ---------- smooth scroll ----------
  let lenis = null;
  if (window.Lenis && !reduce) {
    lenis = new Lenis({ lerp: .1 });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(time => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
  }

  // ---------- interactions ----------
  document.addEventListener('click', e => {
    const a = e.target.closest('a[href^="#"]');
    if (a) {
      const id = a.getAttribute('href');
      const el = id === '#top' ? 0 : id.length > 1 && $(id);
      if (el === false || el === null) return;
      e.preventDefault();
      if (lenis) lenis.scrollTo(el, { duration: 1.6 });
      else if (el === 0) scrollTo({ top: 0, behavior: 'smooth' });
      else el.scrollIntoView({ behavior: 'smooth' });
    }
    if (e.target.closest('a, button:not(.pad)')) SFX.ui('click');
  });

  $$('.pad').forEach(pad => pad.addEventListener('pointerdown', () => {
    SFX.play(pad.dataset.sfx);
    pad.classList.add('hit');
    setTimeout(() => pad.classList.remove('hit'), 160);
  }));

  $('#soundToggle').addEventListener('click', e => {
    const on = !SFX.on;
    SFX.set(on);
    root.classList.toggle('sound-on', on);
    e.currentTarget.setAttribute('aria-pressed', on);
  });

  $$('.lut').forEach(btn => btn.addEventListener('click', () => {
    const g = $('.scene-graded');
    g.className = g.className.replace(/\blut-\w+/, `lut-${btn.dataset.lut}`);
    $$('.lut').forEach(b => b.setAttribute('aria-pressed', b === btn));
    $('#lutName').textContent = btn.textContent.trim();
  }));

  $('#langToggle').addEventListener('click', () => {
    const max = ScrollTrigger.maxScroll(window) || 1, ratio = scrollY / max;
    gsap.fromTo('.flash', { opacity: .6 }, { opacity: 0, duration: .5, ease: 'power2.out' });
    SFX.ui('glitch');
    lang = lang === 'ar' ? 'en' : 'ar';
    try { localStorage.setItem('kadr-lang', lang); } catch (e) { /* storage blocked */ }
    ctx.revert();
    applyLang();
    build();
    ScrollTrigger.refresh();
    const y = ratio * ScrollTrigger.maxScroll(window);
    if (lenis) lenis.scrollTo(y, { immediate: true, force: true }); else scrollTo(0, y);
  });

  if (fine && !reduce) {
    const cur = $('.cursor');
    const xTo = gsap.quickTo(cur, 'x', { duration: .35, ease: 'power3' }), yTo = gsap.quickTo(cur, 'y', { duration: .35, ease: 'power3' });
    addEventListener('pointermove', e => { xTo(e.clientX); yTo(e.clientY); });
    document.addEventListener('pointerover', e => cur.classList.toggle('hover', !!e.target.closest('a, button, summary')));
  }

  // ---------- go ----------
  applyLang();
  build();
  if (!reduce) boot();
  document.fonts && document.fonts.ready.then(() => ScrollTrigger.refresh());
  addEventListener('load', () => ScrollTrigger.refresh());
})();

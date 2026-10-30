// All site copy, packs and settings live here. Edit this file, not the HTML.
// PLACEHOLDER: pack names, counts and prices are examples. Replace them once the
// packs you have resale rights for are sorted.
window.KADR = {
  config: {
    whatsapp: '201000685843', // country code first, digits only
    currency: { ar: 'ج.م', en: 'EGP' },
    storyLength: 180 // seconds shown on the timeline timecode from top to bottom
  },

  t: {
    ar: {
      'meta.title': 'كادر | أصول مونتاج بتحكي قصة',
      brand: 'كادر',
      'nav.story': 'القصة', 'nav.packs': 'الباكات', 'nav.buy': 'إزاي تشتري', 'nav.faq': 'أسئلة', 'nav.cta': 'اشتري دلوقتي',
      'ui.lang': 'EN', 'ui.sound': 'تشغيل الصوت', 'ui.langAria': 'Switch to English',

      'ch.intro': 'البداية', 'ch.sound': 'الصوت', 'ch.color': 'اللون', 'ch.motion': 'الحركة', 'ch.texture': 'الملمس',
      'ch.words': 'الكلام', 'ch.kit': 'الصندوق', 'ch.buy': 'الشراء', 'ch.faq': 'أسئلة', 'ch.end': 'النهاية',

      'hero.title': 'كل فيديو *عظيم* بيبدأ بشاشة سودا.',
      'hero.sub': 'كادر مكتبة أصول مونتاج متقسمة على حسب احتياج الفيديو: صوت، لون، حركة، ملمس، وكلام. انزل بالسكرول وشوف الفيديو بيتبني قدامك.',
      'hero.cta1': 'ابدأ القصة', 'hero.cta2': 'شوف الباكات', 'hero.scroll': 'اسكرول',

      'sound.title': 'الصورة من غير صوت… *مجرد صورة.*',
      'sound.body': 'Whoosh وImpact وRiser وAmbience. كل صوت متقسم ومتسمي باسم واضح، جاهز تسحبه على التايملاين على طول.',
      'sound.hint': 'شغّل الصوت من فوق علشان تسمع التايملاين وإنت بتسكرول.',
      'sound.try': 'دوس على أي زرار وجرّب',
      'pad.whoosh': 'ووش', 'pad.impact': 'ضربة', 'pad.riser': 'تصاعد', 'pad.glitch': 'تشويش', 'pad.click': 'كليك',
      'sound.stat': 'مؤثر صوتي وتراك مزيكا',

      'color.title': 'اللون هو *المود.*',
      'color.body': 'نفس اللقطة ممكن تبان باردة أو دافية أو سينمائية. اسكرول علشان تلوّنها، وبعدين جرّب الـ LUTs.',
      'color.before': 'LOG · خام', 'color.after': 'بعد التلوين',
      'color.stat': 'LUT وبريسيت ألوان',

      'motion.title': 'القطع بيوصّلك. *الانتقال بيحكي.*',
      'motion.body': 'Light leaks وGlitch وFilm burn وZoom وWhip pan. اختار الطاقة اللي تناسب قصتك.',
      'motion.hint': '← كمّل سكرول',
      'motion.leak': 'دفا ونوستالجيا. للذكريات والفلاش باك.',
      'motion.glitch': 'تكنولوجيا وتوتر. للحظة اللي كل حاجة بتبوظ فيها.',
      'motion.burn': 'نهاية فصل وبداية فصل جديد.',
      'motion.zoom': 'علشان تأكد على الكلمة المهمة.',
      'motion.whip': 'طاقة وسرعة بين لقطتين.',
      'motion.zoomWord': 'واو!',
      'motion.stat': 'ترانزيشن وأوفرلاي',

      'texture.title': 'الديجيتال نضيف *زيادة عن اللزوم.*',
      'texture.body': 'Grain وHalftone وورق وGrunge. طبقة واحدة بتخلي الفريم يبان إنه متصوّر، مش متعمل على الكمبيوتر.',
      'texture.word': 'ملمس',
      'texture.paper': 'ورق', 'texture.halftone': 'هافتون', 'texture.grain': 'جرين', 'texture.grunge': 'جرنج',
      'texture.stat': 'تكستشر وأوفرلاي',

      'words.title': 'وفي الآخر… *الكلام.*',
      'words.body': 'تايتلز وكابشنز بتتحرك مع الإيقاع، بالعربي والإنجليزي. الكلمة اللي بتتقال هي اللي بتنوّر.',
      'words.caption': 'الصوت واللون والحركة هما اللي بيحكوا القصة',

      'kit.title': 'كل اللي محتاجه *في صندوق واحد.*',
      'kit.body': 'خد باك لوحده، أو خد الصندوق كله بأوفر سعر.',
      'kit.featured': 'الأوفر', 'kit.files': '+{n} ملف', 'kit.order': 'اطلب على واتساب',
      'kit.note': 'الأسعار بالجنيه المصري. كل باك بيوصلك متسمي ومترتب في فولدرات.',
      'wa.msg': 'أهلاً كادر 👋 عايز أطلب: {pack} ({price})',
      'wa.general': 'أهلاً كادر 👋 عندي سؤال عن الباكات',

      'buy.title': 'تشتري في *٣ خطوات.*',
      'buy.s1t': 'اختار الباك', 'buy.s1p': 'دوس «اطلب على واتساب» والرسالة هتتكتب لوحدها.',
      'buy.s2t': 'حوّل المبلغ', 'buy.s2p': 'على InstaPay أو فودافون كاش أو أي محفظة، وابعت سكرين شوت التحويل.',
      'buy.s3t': 'استلم الكود', 'buy.s3p': 'بعد تأكيد التحويل يوصلك كود تحميل. اكتبه في صفحة التحميل وحمّل على طول.',
      'buy.wallet': 'أي محفظة', 'buy.cta': 'كلّمنا على واتساب', 'buy.step': 'خطوة', 'buy.have': 'معايا كود',

      'faq.title': 'أسئلة *بتتسأل كتير.*',

      'end.title': 'النهاية.',
      'end.sub': '…وبداية الفيديو بتاعك.',
      'end.cta': 'ابدأ بالصندوق الكامل',
      'foot.rights': '© ٢٠٢٦ كادر. كل الحقوق محفوظة.'
    },

    en: {
      'meta.title': 'KADR | Editing assets that tell a story',
      brand: 'KADR',
      'nav.story': 'Story', 'nav.packs': 'Packs', 'nav.buy': 'How to buy', 'nav.faq': 'FAQ', 'nav.cta': 'Get the box',
      'ui.lang': 'عربي', 'ui.sound': 'Toggle sound', 'ui.langAria': 'التحويل للعربي',

      'ch.intro': 'Intro', 'ch.sound': 'Sound', 'ch.color': 'Color', 'ch.motion': 'Motion', 'ch.texture': 'Texture',
      'ch.words': 'Words', 'ch.kit': 'The box', 'ch.buy': 'Checkout', 'ch.faq': 'FAQ', 'ch.end': 'The end',

      'hero.title': 'Every *great* edit starts with a black screen.',
      'hero.sub': 'KADR is an editing asset library sorted by what your video needs — sound, color, motion, texture and words. Scroll down and watch an edit come to life.',
      'hero.cta1': 'Start the story', 'hero.cta2': 'See the packs', 'hero.scroll': 'Scroll',

      'sound.title': 'Without sound, a picture is *just a picture.*',
      'sound.body': 'Whooshes, impacts, risers, ambience. Every sound sorted and clearly named, ready to drop straight onto your timeline.',
      'sound.hint': 'Turn sound on in the top bar to hear the timeline as you scroll.',
      'sound.try': 'Tap a pad to hear it',
      'pad.whoosh': 'air sweep', 'pad.impact': 'hit', 'pad.riser': 'build-up', 'pad.glitch': 'digital', 'pad.click': 'UI',
      'sound.stat': 'sound effects & music tracks',

      'color.title': 'Color is *the mood.*',
      'color.body': 'The same shot can feel cold, warm or cinematic. Scroll to grade it, then try a LUT.',
      'color.before': 'LOG · RAW', 'color.after': 'GRADED',
      'color.stat': 'LUTs & color presets',

      'motion.title': 'A cut gets you there. *A transition tells the story.*',
      'motion.body': 'Light leaks, glitches, film burns, zooms and whip pans. Pick the energy your story needs.',
      'motion.hint': 'Keep scrolling →',
      'motion.leak': 'Warmth and nostalgia — for memories and flashbacks.',
      'motion.glitch': 'Tech and tension — for the moment it all breaks.',
      'motion.burn': 'One chapter ends, the next begins.',
      'motion.zoom': 'Land the punchline.',
      'motion.whip': 'Speed and energy between two shots.',
      'motion.zoomWord': 'WOW!',
      'motion.stat': 'transitions & overlays',

      'texture.title': 'Digital is *too clean.*',
      'texture.body': 'Grain, halftone, paper, grunge. One layer makes a frame feel shot, not rendered.',
      'texture.word': 'TEXTURE',
      'texture.paper': 'Paper', 'texture.halftone': 'Halftone', 'texture.grain': 'Grain', 'texture.grunge': 'Grunge',
      'texture.stat': 'textures & overlays',

      'words.title': 'And finally — *the words.*',
      'words.body': 'Titles and captions that move on the beat, in Arabic and English. The word being spoken is the one that lights up.',
      'words.caption': 'Sound, color and motion are what tell the story',

      'kit.title': 'Everything you need, *in one box.*',
      'kit.body': 'Grab a single pack, or take the whole box for the best price.',
      'kit.featured': 'Best value', 'kit.files': '{n}+ files', 'kit.order': 'Order on WhatsApp',
      'kit.note': 'Prices in Egyptian pounds. Every pack arrives named and organised in folders.',
      'wa.msg': 'Hi KADR 👋 I’d like to order: {pack} ({price})',
      'wa.general': 'Hi KADR 👋 I have a question about the packs',

      'buy.title': 'Checkout in *3 steps.*',
      'buy.s1t': 'Pick a pack', 'buy.s1p': 'Tap “Order on WhatsApp” and the message writes itself.',
      'buy.s2t': 'Send the payment', 'buy.s2p': 'Via InstaPay, Vodafone Cash or any wallet, then send the screenshot.',
      'buy.s3t': 'Get your code', 'buy.s3p': 'Once the payment is confirmed you get a download code. Enter it on the download page and you’re in.',
      'buy.wallet': 'Any wallet', 'buy.cta': 'Chat on WhatsApp', 'buy.step': 'Step', 'buy.have': 'I have a code',

      'faq.title': 'Questions *people ask.*',

      'end.title': 'Fade to black.',
      'end.sub': '…and the start of yours.',
      'end.cta': 'Start with the full box',
      'foot.rights': '© 2026 KADR. All rights reserved.'
    }
  },

  marquee: {
    ar: ['صوت', 'لون', 'حركة', 'ملمس', 'كلام', 'مود', 'إيقاع', 'قصة'],
    en: ['SOUND', 'COLOR', 'MOTION', 'TEXTURE', 'WORDS', 'MOOD', 'RHYTHM', 'STORY']
  },

  packs: [
    {
      id: 'sound', vis: 'wave', price: 249, count: 1300,
      name: { ar: 'باك الصوت', en: 'Sound Pack' },
      desc: { ar: 'كل اللي التايملاين محتاجه علشان يتسمع.', en: 'Everything your timeline needs to be heard.' },
      items: {
        ar: ['Whooshes وترانزيشنز', 'Impacts وBooms', 'Risers وتصاعد', 'Ambience للخلفيات', 'مزيكا متقسمة بالمود'],
        en: ['Whooshes & transitions', 'Impacts & booms', 'Risers', 'Ambience beds', 'Music sorted by mood']
      }
    },
    {
      id: 'color', vis: 'swatch', price: 199, count: 330,
      name: { ar: 'باك اللون', en: 'Color Pack' },
      desc: { ar: 'من LOG باهت لفريم سينمائي في كليك.', en: 'From flat LOG to cinematic in one click.' },
      items: {
        ar: ['LUTs بصيغة ‎.cube', 'بريسيتات Premiere', 'لوكات Teal & Orange وMoody وB&W'],
        en: ['.cube LUTs', 'Premiere presets', 'Teal & Orange, Moody and B&W looks']
      }
    },
    {
      id: 'motion', vis: 'frames', price: 249, count: 440,
      name: { ar: 'باك الحركة', en: 'Motion Pack' },
      desc: { ar: 'ترانزيشنز وأوفرلايز لكل طاقة.', en: 'Transitions and overlays for every energy.' },
      items: {
        ar: ['Flash transitions', 'Light leaks وFilm burns', 'Glitch وPaper', 'عناصر Green screen'],
        en: ['Flash transitions', 'Light leaks & film burns', 'Glitch & paper', 'Green-screen elements']
      }
    },
    {
      id: 'box', vis: 'stack', price: 549, oldPrice: 697, featured: true, count: 2300,
      name: { ar: 'الصندوق الكامل', en: 'The Full Box' },
      desc: { ar: 'التلات باكات + باك التكستشر، بأوفر سعر.', en: 'All three packs + the texture pack, for less.' },
      items: {
        ar: ['باك الصوت', 'باك اللون', 'باك الحركة', '+ باك التكستشر هدية'],
        en: ['Sound Pack', 'Color Pack', 'Motion Pack', '+ Texture Pack free']
      }
    }
  ],

  faq: [
    {
      q: { ar: 'الأصول دي شغالة على أنهي برامج؟', en: 'Which apps do these work with?' },
      a: {
        ar: 'Premiere Pro وAfter Effects وCapCut وDaVinci Resolve وFinal Cut. الأصوات WAV وMP3، والـ LUTs بصيغة ‎.cube، والأوفرلايز MP4 وMOV.',
        en: 'Premiere Pro, After Effects, CapCut, DaVinci Resolve and Final Cut. Sounds are WAV and MP3, LUTs are .cube, overlays are MP4 and MOV.'
      }
    },
    {
      q: { ar: 'التحميل بيوصلني إزاي؟', en: 'How do I receive the files?' },
      a: {
        ar: 'بعد تأكيد التحويل بيوصلك كود تحميل على واتساب. بتكتبه في صفحة التحميل، وكل كود بيشتغل ٣ مرات. لو حصلت مشكلة، ابعتلنا ونحلها.',
        en: 'Once the payment is confirmed, you get a download code on WhatsApp. Enter it on the download page; each code works 3 times. If anything goes wrong, message us.'
      }
    },
    {
      q: { ar: 'ينفع أستخدمها في شغل لعملاء أو على يوتيوب؟', en: 'Can I use them in client work or on YouTube?' },
      a: {
        ar: 'شروط الاستخدام مكتوبة في ملف License جوه كل باك. اقراه قبل ما تنشر.',
        en: 'The usage terms are in the License file inside every pack. Read it before you publish.'
      }
    },
    {
      q: { ar: 'ينفع أجرّب قبل ما أشتري؟', en: 'Can I try before I buy?' },
      a: {
        ar: 'أكيد. ابعتلنا على واتساب ونبعتلك عينة مجانية من أي باك.',
        en: 'Sure. Message us on WhatsApp and we’ll send a free sample of any pack.'
      }
    },
    {
      q: { ar: 'ينفع أرجّع فلوسي؟', en: 'Can I get a refund?' },
      a: {
        ar: 'علشان دي منتجات ديجيتال، مفيش استرجاع بعد التحميل. بس لو أي ملف فيه مشكلة هنحلهالك.',
        en: 'These are digital products, so there are no refunds after download. If any file has a problem, we’ll fix it.'
      }
    }
  ]
};

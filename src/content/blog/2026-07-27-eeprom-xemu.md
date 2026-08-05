---
title: 'شرح ملف EEPROM في محاكي xemu'
description: 'xemu Guide Original Xbox EEPROM Settings طريقة تغيير اللغة والمنطقة ونسبة الشاشة ودقات العرض وإعدادات الشبكة، مع توضيح الحقول التي يجب تركها كما هي حتى لا تتأثر ملفات الحفظ أو يتوق…'
pubDate: '2026-07-27T07:02:39.250+03:00'
updatedDate: '2026-07-27T07:45:58.860+03:00'
heroImage: '../../assets/blog-placeholder-1.jpg'
heroImageUrl: 'https://raw.githubusercontent.com/Ernegien/XboxEepromEditor/master/Images/Security.png'
originalUrl: 'https://hakamiq1.blogspot.com/2026/07/eeprom-xemu.html'
labels: ["Xbox","Xbox-Original"]
---

<style>
.hqm-eeprom-guide{
  --bg:#0b0f14;--panel:#111821;--panel2:#151e29;--line:rgba(255,255,255,.10);
  --text:#f4f7fb;--muted:#aeb8c6;--green:#36d985;--green2:#128c54;--blue:#4eb8ff;
  --cyan:#42ded2;--gold:#ffd35c;--orange:#ffad55;--red:#ff5b55;--code:#091018;
  direction:rtl;width:100%;max-width:920px;margin:0 auto;padding:16px;color:var(--text);
  background:linear-gradient(180deg,#0d1219,#090d12);border:1px solid var(--line);border-radius:20px;
  box-sizing:border-box;font-family:"Tajawal","Cairo",Arial,sans-serif;font-size:16px;line-height:1.9;
  text-align:right;overflow:hidden;overflow-wrap:anywhere
}
.hqm-eeprom-guide,.hqm-eeprom-guide *{box-sizing:border-box}
.hqm-eeprom-guide a{text-decoration:none}.hqm-eeprom-guide p{margin:0 0 14px}
.hqm-eeprom-hero{position:relative;padding:27px;background:
  radial-gradient(circle at 12% 18%,rgba(78,184,255,.18),transparent 34%),
  radial-gradient(circle at 88% 14%,rgba(54,217,133,.18),transparent 35%),
  linear-gradient(145deg,#172330,#0d141d 62%);border:1px solid var(--line);border-radius:17px;overflow:hidden}
.hqm-eeprom-hero-grid{display:grid;grid-template-columns:minmax(0,1fr) 180px;gap:22px;align-items:center}
.hqm-eeprom-kicker{display:flex;flex-wrap:wrap;gap:7px;margin-bottom:13px}
.hqm-eeprom-pill{display:inline-flex;align-items:center;min-height:29px;padding:3px 11px;color:#fff;background:rgba(255,255,255,.07);border:1px solid var(--line);border-radius:999px;font-size:11.5px;font-weight:900}
.hqm-eeprom-pill.main{color:#07140d;background:var(--green);border-color:transparent}
.hqm-eeprom-hero h2{margin:0;color:#fff;font-size:clamp(27px,5vw,43px);line-height:1.32;letter-spacing:-.5px}
.hqm-eeprom-hero h2 span{color:var(--green)}
.hqm-eeprom-hero p{max-width:680px;margin:14px 0 0;color:#dce4ed;font-size:16px}
.hqm-eeprom-chip{position:relative;display:grid;place-items:center;width:150px;height:150px;margin:auto;background:#090d12;border:2px solid rgba(54,217,133,.42);border-radius:28px;box-shadow:0 18px 50px rgba(0,0,0,.35),inset 0 0 36px rgba(54,217,133,.06)}
.hqm-eeprom-chip::before,.hqm-eeprom-chip::after{content:"";position:absolute;inset:-15px 20px;border-top:5px dashed rgba(78,184,255,.28);border-bottom:5px dashed rgba(78,184,255,.28)}
.hqm-eeprom-chip::after{inset:20px -15px;border:0;border-right:5px dashed rgba(78,184,255,.28);border-left:5px dashed rgba(78,184,255,.28)}
.hqm-eeprom-chip b{position:relative;z-index:2;color:var(--green);font:900 23px/1.15 Arial,sans-serif;direction:ltr;text-align:center}
.hqm-eeprom-chip small{display:block;margin-top:8px;color:var(--muted);font:700 10px/1.2 Arial,sans-serif}
.hqm-eeprom-tldr{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;margin:15px 0}
.hqm-eeprom-mini{padding:14px;background:linear-gradient(145deg,var(--panel2),var(--panel));border:1px solid var(--line);border-radius:12px}
.hqm-eeprom-mini b{display:block;color:var(--blue);font-size:12px}.hqm-eeprom-mini span{display:block;color:#e4e9ef;font-size:13px}
.hqm-eeprom-section{margin-top:16px;padding:22px;background:linear-gradient(145deg,var(--panel2),var(--panel));border:1px solid var(--line);border-radius:15px}
.hqm-eeprom-title{display:flex;align-items:center;gap:10px;margin:0 0 15px;color:var(--gold);font-size:21px;line-height:1.45}
.hqm-eeprom-title::before{content:"";flex:0 0 auto;width:6px;height:24px;background:linear-gradient(180deg,var(--green),var(--blue));border-radius:999px}
.hqm-eeprom-section>p{color:#dce2ea}
.hqm-eeprom-simple{padding:15px 17px;color:#e9edf3;background:rgba(78,184,255,.07);border-right:4px solid var(--blue);border-radius:10px;font-weight:800}
.hqm-eeprom-note{margin-top:14px;padding:14px 16px;color:#e8ecf2;background:rgba(255,173,85,.07);border:1px solid rgba(255,173,85,.15);border-right:4px solid var(--orange);border-radius:10px}
.hqm-eeprom-danger{margin-top:14px;padding:14px 16px;color:#fff0ef;background:rgba(255,91,85,.08);border:1px solid rgba(255,91,85,.17);border-right:4px solid var(--red);border-radius:10px}
.hqm-eeprom-good{margin-top:14px;padding:14px 16px;color:#ecfff5;background:rgba(54,217,133,.07);border:1px solid rgba(54,217,133,.16);border-right:4px solid var(--green);border-radius:10px}
.hqm-eeprom-actions{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:9px;margin-top:15px}
.hqm-eeprom-btn{display:flex;align-items:center;justify-content:center;min-height:46px;padding:9px 12px;color:#fff!important;background:linear-gradient(135deg,#157b4a,#0e5433);border:1px solid rgba(255,255,255,.13);border-radius:9px;font-size:12.5px;font-weight:900;text-align:center}
.hqm-eeprom-btn.blue{background:linear-gradient(135deg,#187eb6,#105176)}
.hqm-eeprom-btn.dark{background:linear-gradient(135deg,#303947,#1c232e)}
.hqm-eeprom-btn:hover{filter:brightness(1.1)}
.hqm-eeprom-steps{counter-reset:hqmstep;display:grid;gap:10px;margin-top:13px}
.hqm-eeprom-step{position:relative;padding:15px 61px 15px 15px;background:rgba(0,0,0,.18);border:1px solid var(--line);border-radius:11px}
.hqm-eeprom-step::before{counter-increment:hqmstep;content:counter(hqmstep);position:absolute;top:14px;right:14px;display:grid;place-items:center;width:33px;height:33px;color:#07140d;background:var(--green);border-radius:10px;font:900 14px/1 Arial,sans-serif}
.hqm-eeprom-step b{display:block;margin-bottom:3px;color:#fff}.hqm-eeprom-step span{display:block;color:#cfd7e1;font-size:13px}
.hqm-eeprom-path{display:block;margin-top:8px;padding:10px 12px;color:var(--cyan);background:var(--code);border:1px solid rgba(66,222,210,.15);border-radius:8px;font:700 12px/1.7 Consolas,"Courier New",monospace;direction:ltr;text-align:left;white-space:normal;word-break:break-all}
.hqm-eeprom-recommended{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;margin-top:14px}
.hqm-eeprom-setting{min-width:0;padding:15px;background:rgba(0,0,0,.19);border:1px solid var(--line);border-radius:11px}
.hqm-eeprom-setting-head{display:flex;align-items:flex-start;justify-content:space-between;gap:10px;margin-bottom:8px}
.hqm-eeprom-setting b{color:var(--cyan);font-size:13px}.hqm-eeprom-choice{display:inline-flex;padding:3px 8px;color:#07140d;background:var(--green);border-radius:999px;font-size:10.5px;font-weight:900;white-space:nowrap}
.hqm-eeprom-setting p{margin:0;color:#d9e0e8;font-size:13px;line-height:1.75}
.hqm-eeprom-setting code{color:var(--gold);font-family:Consolas,"Courier New",monospace;direction:ltr}
.hqm-eeprom-do-not{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;margin-top:14px}
.hqm-eeprom-lock{padding:14px;background:rgba(255,91,85,.045);border:1px solid rgba(255,91,85,.14);border-radius:10px}
.hqm-eeprom-lock b{display:block;color:#ff8b86;font-size:13px}.hqm-eeprom-lock span{display:block;color:#d6dde6;font-size:12.5px;line-height:1.7}
.hqm-eeprom-fix{display:grid;gap:9px;margin-top:13px}
.hqm-eeprom-fix details{background:rgba(0,0,0,.18);border:1px solid var(--line);border-radius:10px;overflow:hidden}
.hqm-eeprom-fix summary{padding:13px 15px;color:var(--blue);cursor:pointer;font-size:13px;font-weight:900}
.hqm-eeprom-fix details div{padding:0 15px 14px;color:#d8dfe7;font-size:13px}
.hqm-eeprom-source-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;margin-top:13px}
.hqm-eeprom-source{display:flex;align-items:center;min-height:43px;padding:9px 12px;color:#eef3f8!important;background:rgba(0,0,0,.20);border:1px solid var(--line);border-radius:9px;font-size:12px;font-weight:800}
.hqm-eeprom-source:hover{border-color:rgba(78,184,255,.42)}
.hqm-eeprom-footer{margin-top:16px;padding:18px;color:#edf2f7;background:linear-gradient(135deg,rgba(54,217,133,.10),rgba(78,184,255,.09));border:1px solid var(--line);border-radius:12px;text-align:center;font-weight:800}
.hqm-eeprom-preview-intro{margin:15px 0 0;color:#d8e0e9;font-size:13px}
.hqm-eeprom-preview-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin-top:14px}
.hqm-eeprom-preview{min-width:0;margin:0;padding:12px;background:#0a0f15;border:1px solid var(--line);border-radius:12px;overflow:hidden}
.hqm-eeprom-preview a{display:flex;align-items:center;justify-content:center;min-height:250px;padding:10px;background:#f3f3f3;border-radius:8px;overflow:hidden}
.hqm-eeprom-preview img{display:block;width:auto!important;max-width:100%!important;height:auto!important;max-height:520px!important;margin:0 auto!important;object-fit:contain!important;background:#f3f3f3!important}
.hqm-eeprom-preview figcaption{padding:10px 3px 1px;color:#dbe3ec;font-size:12.5px;line-height:1.7}
.hqm-eeprom-preview figcaption b{display:block;color:var(--cyan);font-size:13px}
.hqm-eeprom-preview-warning{border-color:rgba(255,91,85,.22);background:rgba(255,91,85,.035)}
.hqm-eeprom-preview-warning figcaption b{color:#ff8b86}
@media(max-width:760px){.hqm-eeprom-hero-grid{grid-template-columns:1fr}.hqm-eeprom-chip{width:125px;height:125px}.hqm-eeprom-tldr{grid-template-columns:1fr}.hqm-eeprom-actions{grid-template-columns:1fr}.hqm-eeprom-recommended,.hqm-eeprom-do-not,.hqm-eeprom-source-grid,.hqm-eeprom-preview-grid{grid-template-columns:1fr}.hqm-eeprom-preview a{min-height:210px}}
@media(max-width:520px){.hqm-eeprom-guide{padding:10px;border-radius:14px;font-size:15px}.hqm-eeprom-hero,.hqm-eeprom-section{padding:17px}.hqm-eeprom-hero h2{font-size:26px}.hqm-eeprom-setting-head{display:block}.hqm-eeprom-choice{margin-top:7px}.hqm-eeprom-step{padding-right:57px}.hqm-eeprom-preview{padding:9px}.hqm-eeprom-preview a{min-height:180px;padding:7px}.hqm-eeprom-preview img{max-height:430px!important}}
</style>

<article class="hqm-eeprom-guide">
  <header class="hqm-eeprom-hero">
    <div class="hqm-eeprom-hero-grid">
      <div>
        <div class="hqm-eeprom-kicker">
          <span class="hqm-eeprom-pill main">xemu Guide</span>
          <span class="hqm-eeprom-pill">Original Xbox</span>
          <span class="hqm-eeprom-pill">EEPROM Settings</span></div>
        <p>طريقة تغيير اللغة والمنطقة ونسبة الشاشة ودقات العرض وإعدادات الشبكة، مع توضيح الحقول التي يجب تركها كما هي حتى لا تتأثر ملفات الحفظ أو يتوقف المحاكي عن العمل.</p>
      </div>
      <div aria-hidden="true" class="hqm-eeprom-chip"><b>EEPROM<small>Xbox Settings</small></b></div>
    </div>
  </header>

  <section aria-label="الخلاصة السريعة" class="hqm-eeprom-tldr">
    <div class="hqm-eeprom-mini"><b>هل الملف إلزامي؟</b><span>لا. xemu ينشئ ملفًا صالحًا تلقائيًا عند التشغيل الأول.</span></div>
    <div class="hqm-eeprom-mini"><b>متى أعدله؟</b><span>لتغيير اللغة والمنطقة ووضع الشاشة والدقات أو عنوان MAC.</span></div>
    <div class="hqm-eeprom-mini"><b>أهم تحذير</b><span>احتفظ بنسخة احتياطية، ولا تفعّل Surround أو AC3 أو DTS.</span></div>
  </section>

  <section class="hqm-eeprom-section">
    <h3 class="hqm-eeprom-title">ما هو EEPROM ببساطة؟</h3>
    <p class="hqm-eeprom-simple">تخيله كأنه بطاقة هوية وإعدادات لجهاز Xbox داخل المحاكي. يحتوي على لغة الجهاز، المنطقة، إعدادات الفيديو والصوت، عنوان الشبكة، ومفاتيح ترتبط ببعض ملفات الحفظ والقرص الصلب الافتراضي.</p>
    <p>في جهاز Xbox الحقيقي يكون EEPROM شريحة صغيرة. أما داخل xemu فتُحفظ محتوياتها في ملف، ويستطيع المحاكي إنشاء ملف صالح تلقائيًا إذا لم تختر ملفًا بنفسك.</p>
    <div class="hqm-eeprom-good"><b>للمستخدم العادي:</b> إذا كان المحاكي يعمل واللغة والصورة مناسبة، فلا تحتاج تعديل EEPROM أصلًا.</div>
  </section>

  <section class="hqm-eeprom-section">
    <h3 class="hqm-eeprom-title">الأداة الأسهل للتعديل</h3>
    <p>الأبسط هو محرر <b>Original Xbox EEPROM Online</b>. ترفع ملف <code>eeprom.bin</code>، تعدل الخيارات، ثم تنزل النسخة الجديدة. المشروع يعمل داخل المتصفح، ويمكن كذلك استخدام XboxEepromEditor على Windows للعمل دون اتصال.</p>
    <div class="hqm-eeprom-actions">
      <a class="hqm-eeprom-btn" href="https://eeprom.xboxarchive.org/" rel="noopener noreferrer" target="_blank">فتح محرر EEPROM Online</a>
      <a class="hqm-eeprom-btn blue" href="https://github.com/Ernegien/XboxEepromEditor/releases" rel="noopener noreferrer" target="_blank">تنزيل محرر Windows</a>
      <a class="hqm-eeprom-btn dark" href="https://xemu.app/docs/eeprom/" rel="noopener noreferrer" target="_blank">صفحة xemu الرسمية</a>
    </div>
    <div class="hqm-eeprom-note"><b>الخصوصية:</b> لا تنشر ملف EEPROM في المنتديات أو Discord؛ لأنه يحتوي على عنوان MAC ومفاتيح ومعرّفات خاصة بنسختك.</div>

    <p class="hqm-eeprom-preview-intro">هذه هي واجهة برنامج <b>Original Xbox EEPROM Editor</b> على Windows. اضغط على أي صورة لفتحها بالحجم الكامل.</p>
    <div class="hqm-eeprom-preview-grid">
      <figure class="hqm-eeprom-preview">
        <a href="https://github.com/Ernegien/XboxEepromEditor/blob/master/Images/Security.png?raw=true" rel="noopener noreferrer" target="_blank">
          <img alt="تبويب Security في برنامج Original Xbox EEPROM Editor ويعرض Hardware Type وConfounder وHDD Key والمنطقة" decoding="async" loading="lazy" referrerpolicy="no-referrer" src="https://raw.githubusercontent.com/Ernegien/XboxEepromEditor/master/Images/Security.png" />
        </a>
        <figcaption><b>Security</b>يعرض مراجعة الجهاز وConfounder ومفتاح القرص والمنطقة. لا تغيّر هذه القيم عشوائيًا.</figcaption>
      </figure>
      <figure class="hqm-eeprom-preview">
        <a href="https://github.com/Ernegien/XboxEepromEditor/blob/master/Images/Factory.png?raw=true" rel="noopener noreferrer" target="_blank">
          <img alt="تبويب Factory في برنامج Original Xbox EEPROM Editor ويعرض Serial وMAC Address وOnline Key وVideo Standard" decoding="async" loading="lazy" referrerpolicy="no-referrer" src="https://raw.githubusercontent.com/Ernegien/XboxEepromEditor/master/Images/Factory.png" />
        </a>
        <figcaption><b>Factory</b>يعرض الرقم التسلسلي وعنوان MAC وOnline Key ونظام الفيديو. احتفظ بالقيم الأصلية قبل أي تعديل.</figcaption>
      </figure>
    </div>
  </section>

  <section class="hqm-eeprom-section">
    <h3 class="hqm-eeprom-title">طريقة التعديل خطوة بخطوة</h3>
    <div class="hqm-eeprom-steps">
      <div class="hqm-eeprom-step"><b>أغلق محاكي xemu بالكامل</b><span>لا تعدل الملف بينما المحاكي يعمل، حتى لا يكتب فوق التغييرات عند الإغلاق.</span></div>
      <div class="hqm-eeprom-step"><b>حدد ملف EEPROM المستخدم</b><span>افتح إعدادات xemu وتحقق من مسار ملف EEPROM المحدد. الاسم المعتاد هو:</span><code class="hqm-eeprom-path">eeprom.bin</code></div>
      <div class="hqm-eeprom-step"><b>أنشئ نسخة احتياطية</b><span>انسخ الملف إلى نفس المجلد وسمّه مثلًا:</span><code class="hqm-eeprom-path">eeprom-backup.bin</code></div>
      <div class="hqm-eeprom-step"><b>افتح المحرر وارفع الملف</b><span>اضغط Upload EEPROM ثم اختر النسخة الأصلية من ملف <code>eeprom.bin</code>.</span></div>
      <div class="hqm-eeprom-step"><b>عدّل User Settings فقط</b><span>ابدأ باللغة والمنطقة والفيديو. لا تغيّر المفاتيح والحقول المشفرة لمجرد التجربة.</span></div>
      <div class="hqm-eeprom-step"><b>نزّل الملف الجديد</b><span>اضغط Download EEPROM، ثم تأكد أن الملف الناتج اسمه <code>eeprom.bin</code>.</span></div>
      <div class="hqm-eeprom-step"><b>استبدل الملف وشغّل xemu</b><span>ضع الملف الجديد في المسار الذي يستخدمه المحاكي، ثم شغّله واختبر القائمة واللعبة.</span></div>
    </div>
  </section>

  <section class="hqm-eeprom-section">
    <h3 class="hqm-eeprom-title">الإعدادات التي تهم المستخدم العادي</h3>
    <div class="hqm-eeprom-recommended">
      <div class="hqm-eeprom-setting">
        <div class="hqm-eeprom-setting-head"><b>Timezone Region</b><span class="hqm-eeprom-choice">اختر منطقتك</span></div>
        <p>يضبط ساعة Xbox. لمنطقة UTC+3 يمكنك اختيار <code>Kuwait (UTC+3)</code>. فعّل تعطيل التوقيت الصيفي فقط إذا كانت دولتك لا تستخدمه.</p>
      </div>
      <div class="hqm-eeprom-setting">
        <div class="hqm-eeprom-setting-head"><b>DVD Region</b><span class="hqm-eeprom-choice">Middle East = 2</span></div>
        <p>لمنطقة الشرق الأوسط اختر <code>2 Europe, Japan, Middle East</code>. هذا الخيار يخص منطقة DVD أكثر من تشغيل ألعاب XISO العادية.</p>
      </div>
      <div class="hqm-eeprom-setting">
        <div class="hqm-eeprom-setting-head"><b>Language</b><span class="hqm-eeprom-choice">حسب رغبتك</span></div>
        <p>اختر لغة واجهة Xbox والألعاب التي تدعمها. العربية غير موجودة ضمن خيارات Xbox الأصلي، لذلك غالبًا اختر English.</p>
      </div>
      <div class="hqm-eeprom-setting">
        <div class="hqm-eeprom-setting-head"><b>Video Output</b><span class="hqm-eeprom-choice">NTSC غالبًا</span></div>
        <p>اختر <code>NTSC</code> لمعظم النسخ الأمريكية واليابانية، أو <code>PAL</code> للنسخ الأوروبية. لا تغيّر المنطقة عشوائيًا إذا كانت ألعابك تعمل.</p>
      </div>
      <div class="hqm-eeprom-setting">
        <div class="hqm-eeprom-setting-head"><b>Normal / Widescreen</b><span class="hqm-eeprom-choice">Widescreen اختياري</span></div>
        <p>اختر Widescreen للشاشات الحديثة، ثم استخدم داخل xemu وضع العرض <code>Scale (Widescreen 16:9)</code>. بعض الألعاب لا تدعم 16:9 فعليًا.</p>
      </div>
      <div class="hqm-eeprom-setting">
        <div class="hqm-eeprom-setting-head"><b>480p / 720p / 1080i</b><span class="hqm-eeprom-choice">ابدأ بـ480p</span></div>
        <p>فعّل 480p أولًا. يمكن تفعيل 720p للألعاب التي تدعمه. أما رفع انتر ريزلوشن من قائمة xemu فهو إعداد منفصل عن دقة الإخراج المسجلة في EEPROM.</p>
      </div>
      <div class="hqm-eeprom-setting">
        <div class="hqm-eeprom-setting-head"><b>Audio Output</b><span class="hqm-eeprom-choice">Stereo فقط</span></div>
        <p>اتركه على <code>Stereo</code>. لا تفعّل Surround، ولا AC3، ولا DTS؛ لأن xemu لا يدعم الصوت المحيطي حاليًا.</p>
      </div>
      <div class="hqm-eeprom-setting">
        <div class="hqm-eeprom-setting-head"><b>MAC Address</b><span class="hqm-eeprom-choice">فريد لكل جهاز</span></div>
        <p>لا تستخدم نفس عنوان MAC في نسختين من xemu أو بين xemu وجهاز Xbox حقيقي عند System Link، وإلا قد لا تستطيع الانضمام للجلسة.</p>
      </div>
    </div>

    <p class="hqm-eeprom-preview-intro">التبويبات التالية تعرض الإعدادات العامة والرقابة الأبوية وخيارات Xbox Live داخل محرر Windows.</p>
    <div class="hqm-eeprom-preview-grid">
      <figure class="hqm-eeprom-preview">
        <a href="https://github.com/Ernegien/XboxEepromEditor/blob/master/Images/General.png?raw=true" rel="noopener noreferrer" target="_blank">
          <img alt="تبويب General في برنامج Original Xbox EEPROM Editor لإعدادات المستخدم العامة" decoding="async" loading="lazy" referrerpolicy="no-referrer" src="https://raw.githubusercontent.com/Ernegien/XboxEepromEditor/master/Images/General.png" />
        </a>
        <figcaption><b>General</b>هذا هو التبويب الأقرب للمستخدم العادي؛ منه تضبط اللغة والمنطقة وإعدادات العرض المتاحة.</figcaption>
      </figure>
      <figure class="hqm-eeprom-preview">
        <a href="https://github.com/Ernegien/XboxEepromEditor/blob/master/Images/Parental.png?raw=true" rel="noopener noreferrer" target="_blank">
          <img alt="تبويب Parental في برنامج Original Xbox EEPROM Editor لإعدادات الرقابة الأبوية" decoding="async" loading="lazy" referrerpolicy="no-referrer" src="https://raw.githubusercontent.com/Ernegien/XboxEepromEditor/master/Images/Parental.png" />
        </a>
        <figcaption><b>Parental</b>خيارات الرقابة الأبوية. اتركها كما هي ما لم تكن تحتاج تقييد محتوى محدد.</figcaption>
      </figure>
      <figure class="hqm-eeprom-preview">
        <a href="https://github.com/Ernegien/XboxEepromEditor/blob/master/Images/Live.png?raw=true" rel="noopener noreferrer" target="_blank">
          <img alt="تبويب Live في برنامج Original Xbox EEPROM Editor لإعدادات Xbox Live" decoding="async" loading="lazy" referrerpolicy="no-referrer" src="https://raw.githubusercontent.com/Ernegien/XboxEepromEditor/master/Images/Live.png" />
        </a>
        <figcaption><b>Live</b>إعدادات مرتبطة بخدمات Xbox Live القديمة. لا تحتاجها لتشغيل الألعاب المحلية داخل xemu.</figcaption>
      </figure>
    </div>
  </section>

  <section class="hqm-eeprom-section">
    <h3 class="hqm-eeprom-title">حقول لا تعدلها بلا سبب واضح</h3>
    <p>هذه الحقول ليست لتحسين الأداء أو جودة الصورة. تغييرها عشوائيًا قد يفصل ملفات الحفظ عن الجهاز الافتراضي أو يسبب إعدادًا غير صالح.</p>
    <div class="hqm-eeprom-do-not">
      <div class="hqm-eeprom-lock"><b>Hard drive key</b><span>مفتاح مرتبط بالقرص الصلب، وقد ترتبط به بعض ملفات الحفظ. لا تولّد مفتاحًا جديدًا لمجرد التجربة.</span></div>
      <div class="hqm-eeprom-lock"><b>Confounder</b><span>جزء من بنية التشفير والتحقق. اترك القيمة كما هي.</span></div>
      <div class="hqm-eeprom-lock"><b>Online Key</b><span>مفتاح هوية للشبكة. لا تشاركه ولا تغيّره إلا ضمن دليل واضح لخدمة محددة.</span></div>
      <div class="hqm-eeprom-lock"><b>Serial</b><span>رقم تسلسلي للجهاز الافتراضي. ليس إعداد أداء.</span></div>
      <div class="hqm-eeprom-lock"><b>RAM Timing</b><span>مطلوب فقط لمراجعة Hardware Revision 1.6. اختر Non 1.6 في الحالات الأخرى.</span></div>
      <div class="hqm-eeprom-lock"><b>Thermal Sensor Calibration</b><span>مخصص لمراجعة 1.6، والأداة نفسها تحذر من تغييره دون معرفة دقيقة.</span></div>
    </div>
    <div class="hqm-eeprom-danger"><b>لا تحذف EEPROM الأصلي قبل النسخ الاحتياطي.</b> بعض ملفات الحفظ قد تكون مرتبطة بمفتاح القرص الصلب داخل الملف؛ استبدال EEPROM بآخر جديد قد يجعل تلك الملفات غير قابلة للاستخدام.</div>

    <p class="hqm-eeprom-preview-intro">البرنامج يعرض أيضًا تبويبين باسم Unknown. وجودهما لا يعني أن المستخدم مطالب بتعديلهما.</p>
    <div class="hqm-eeprom-preview-grid">
      <figure class="hqm-eeprom-preview hqm-eeprom-preview-warning">
        <a href="https://github.com/Ernegien/XboxEepromEditor/blob/master/Images/Unknown1.png?raw=true" rel="noopener noreferrer" target="_blank">
          <img alt="تبويب Unknown الأول في برنامج Original Xbox EEPROM Editor" decoding="async" loading="lazy" referrerpolicy="no-referrer" src="https://raw.githubusercontent.com/Ernegien/XboxEepromEditor/master/Images/Unknown1.png" />
        </a>
        <figcaption><b>Unknown</b>قيم غير مخصصة للاستخدام العادي. اتركها كما هي.</figcaption>
      </figure>
      <figure class="hqm-eeprom-preview hqm-eeprom-preview-warning">
        <a href="https://github.com/Ernegien/XboxEepromEditor/blob/master/Images/Unknown2.png?raw=true" rel="noopener noreferrer" target="_blank">
          <img alt="تبويب Unknown الثاني في برنامج Original Xbox EEPROM Editor" decoding="async" loading="lazy" referrerpolicy="no-referrer" src="https://raw.githubusercontent.com/Ernegien/XboxEepromEditor/master/Images/Unknown2.png" />
        </a>
        <figcaption><b>Unknown (cont.)</b>لا تغيّر Flags أو القيم المجهولة بهدف تحسين الأداء؛ ليس لها علاقة برفع انتر ريزلوشن.</figcaption>
      </figure>
    </div>
  </section>

  <section class="hqm-eeprom-section">
    <h3 class="hqm-eeprom-title">إعداد مقترح بسيط وآمن</h3>
    <div class="hqm-eeprom-good">
      <b>لشاشة حديثة واستخدام عادي:</b><br />
      Language: English — Video Output: NTSC — Display: Widescreen — 480p: On — 720p: اختياري — 1080i: Off — Audio: Stereo — AC3: Off — DTS: Off.
    </div>
    <div class="hqm-eeprom-note"><b>مهم:</b> تفعيل Widescreen أو 720p لا يجبر كل لعبة على استخدامه. الدعم يختلف من لعبة لأخرى، بينما رفع انتر ريزلوشن يتم من إعدادات xemu نفسها.</div>
  </section>

  <section class="hqm-eeprom-section">
    <h3 class="hqm-eeprom-title">حل المشاكل الشائعة</h3>
    <div class="hqm-eeprom-fix">
      <details><summary>المحاكي توقف عن الإقلاع بعد التعديل</summary><div>أغلق xemu، احذف الملف المعدل، ثم أعد تسمية <code>eeprom-backup.bin</code> إلى <code>eeprom.bin</code>. إذا عاد المحاكي للعمل فالمشكلة في أحد التغييرات.</div></details>
      <details><summary>اللعبة أو ملف الحفظ لم يعد يتعرف على الحفظ القديم</summary><div>أعد EEPROM الأصلي؛ بعض ملفات الحفظ مرتبطة بمفتاح القرص الصلب الموجود داخله.</div></details>
      <details><summary>System Link يظهر الجلسة لكن لا يسمح بالانضمام</summary><div>تأكد أن كل نسخة xemu وكل جهاز Xbox على الشبكة يملك عنوان MAC مختلفًا.</div></details>
      <details><summary>xemu يتعطل بعد تفعيل الصوت المحيطي</summary><div>افتح EEPROM من جديد واختر Stereo، ثم عطّل Surround وAC3 وDTS.</div></details>
      <details><summary>الصورة أصبحت عريضة بشكل خاطئ</summary><div>إذا اخترت Widescreen داخل EEPROM، استخدم أيضًا وضع <code>Scale (Widescreen 16:9)</code> داخل xemu. وإذا كانت اللعبة لا تدعم الشاشة العريضة فأعدها إلى Normal.</div></details>
    </div>
  </section>

  <section class="hqm-eeprom-section">
    <h3 class="hqm-eeprom-title">المصادر الرسمية</h3>
    <div class="hqm-eeprom-source-grid">
      <a class="hqm-eeprom-source" href="https://xemu.app/docs/eeprom/" rel="noopener noreferrer" target="_blank">xemu — EEPROM Settings</a>
      <a class="hqm-eeprom-source" href="https://xemu.app/docs/faq/" rel="noopener noreferrer" target="_blank">xemu — الأسئلة الشائعة</a>
      <a class="hqm-eeprom-source" href="https://xemu.app/docs/networking/" rel="noopener noreferrer" target="_blank">xemu — إعدادات الشبكة وMAC</a>
      <a class="hqm-eeprom-source" href="https://github.com/Ryzee119/xbox_eeprom_online" rel="noopener noreferrer" target="_blank">GitHub — Xbox EEPROM Online</a>
      <a class="hqm-eeprom-source" href="https://github.com/Ernegien/XboxEepromEditor" rel="noopener noreferrer" target="_blank">GitHub — XboxEepromEditor</a>
      <a class="hqm-eeprom-source" href="https://eeprom.xboxarchive.org/" rel="noopener noreferrer" target="_blank">فتح المحرر مباشرة</a>
    </div>
  </section>

  <footer class="hqm-eeprom-footer">الخلاصة: عدّل فقط إعدادات المستخدم التي تحتاجها، واترك مفاتيح الجهاز كما هي، واحتفظ دائمًا بنسخة من EEPROM الأصلي قبل أي تغيير.</footer>
</article>

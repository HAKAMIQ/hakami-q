---
title: 'ربط يد PS4 مع محاكي Dolphin – الدليل المتقدم'
description: '🎮 ربط يد PS4 مع محاكي Dolphin – دليل متقدم الهدف من هذا الدليل هو تحويل يد PS4 إلى Wii Remote Plus بكامل خصائصها (جايروسكوب، تسارع، مؤشر، MotionPlus ) داخل محاكي Dolphin . العملية…'
pubDate: '2025-09-24T12:04:00.001+03:00'
updatedDate: '2025-09-24T12:05:32.462+03:00'
heroImage: '../../assets/blog-placeholder-1.jpg'
heroImageUrl: '/media/blogger/8d/8d11e137e6ce2e9065736f38601491276aa8a25655ecedb2c7df1b8c6e55a74d.png'
originalUrl: 'https://hakamiq1.blogspot.com/2025/09/dualshock-4-wii-remote-plus-dolphin.html'
labels: ["GameCube","Nintendo","Wii"]
---

<style>
/* المربعات */
.step-box {
  border: 2px solid #8B0000;
  border-radius: 12px;
  padding: 18px 20px;
  margin: 25px 0;
  background: #fff;
  font-family: "Tahoma", Arial, sans-serif;
  line-height: 1.9;
  color: #222;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
}

/* العناوين */
.step-box h2, 
.step-box h3 {
  color: #8B0000;
  margin-top: 0;
}

/* ملاحظات */
.note-box {
  background: #ffecec;
  border-left: 5px solid #8B0000;
  padding: 12px 15px;
  margin: 15px 0;
  border-radius: 6px;
  color: #333;
  font-size: 15px;
}

/* الصور */
.step-img {
  display: block;
  margin: 15px auto;
  max-width: 90%;
  border-radius: 8px;
  border: 1px solid #ddd;
}
</style>

<div class="step-box">
  <h2>🎮 ربط يد PS4 مع محاكي Dolphin – دليل متقدم</h2>
  <p>
  الهدف من هذا الدليل هو تحويل يد <b><a data-preview="" href="https://www.google.com/search?ved=1t:260882&amp;q=PS4+controller+models&amp;bbid=3771343465280744442&amp;bpid=6507232793422312674" target="_blank">PS4</a></b> إلى <b><a data-preview="" href="https://www.google.com/search?ved=1t:260882&amp;q=Wii+Remote+Plus&amp;bbid=3771343465280744442&amp;bpid=6507232793422312674" target="_blank">Wii Remote Plus</a></b> بكامل خصائصها <br />&nbsp;(جايروسكوب، تسارع، مؤشر، <a data-preview="" href="https://www.google.com/search?ved=1t:260882&amp;q=define+MotionPlus&amp;bbid=3771343465280744442&amp;bpid=6507232793422312674" target="_blank">MotionPlus</a>) داخل محاكي <b><a data-preview="" href="https://www.google.com/search?ved=1t:260882&amp;q=Dolphin+emulator&amp;bbid=3771343465280744442&amp;bpid=6507232793422312674" target="_blank">Dolphin</a></b>. <br />&nbsp;العملية تعتمد على ثلاث طبقات مترابطة:
  </p>
  <ul>
    <li><b><a data-preview="" href="https://www.google.com/search?ved=1t:260882&amp;q=DS4Windows&amp;bbid=3771343465280744442&amp;bpid=6507232793422312674" target="_blank">DS4Windows</a>:</b> وسيط بين اليد ونظام التشغيل.</li>
    <li><b><a data-preview="" href="https://www.google.com/search?ved=1t:260882&amp;q=UDP+Server+definition&amp;bbid=3771343465280744442&amp;bpid=6507232793422312674" target="_blank">UDP Server</a>:</b> قناة إرسال بيانات الحركة (Port 26760).</li>
    <li><b><a data-preview="" href="https://www.google.com/search?ved=1t:260882&amp;q=DSU+Client+definition&amp;bbid=3771343465280744442&amp;bpid=6507232793422312674" target="_blank">DSU Client</a> في Dolphin:</b> المستقبل الذي يترجم البيانات إلى Wii Remote افتراضي.</li>
  </ul>
  <div class="separator" style="clear: both; text-align: center"><a href="/media/blogger/87/870a936a5a9015b669b58b9ab96fd2a34f14a43ed4ae847902683db3f895d12c.png" style="margin-left: 1em; margin-right: 1em"></a><div class="separator" style="clear: both; text-align: center"><a href="/media/blogger/87/870a936a5a9015b669b58b9ab96fd2a34f14a43ed4ae847902683db3f895d12c.png" style="margin-left: 1em; margin-right: 1em"></a><a href="/media/blogger/8d/8d11e137e6ce2e9065736f38601491276aa8a25655ecedb2c7df1b8c6e55a74d.png" style="margin-left: 1em; margin-right: 1em"><img alt="" data-original-height="872" data-original-width="1569" height="178" src="/media/blogger/8d/8d11e137e6ce2e9065736f38601491276aa8a25655ecedb2c7df1b8c6e55a74d.png" width="320" /></a></div></div><br />
</div>

<div class="step-box">
  <h3>🔹 تحميل وإعداد DS4Windows</h3>
  <p>البرنامج متاح من الموقع الرسمي:  
  <a href="https://ds4-windows.com" target="_blank">ds4-windows.com</a></p>
  <p>عند التشغيل أول مرة:</p>
  <ul>
    <li><b><a data-preview="" href="https://www.google.com/search?ved=1t:260882&amp;q=Appdata+definition&amp;bbid=3771343465280744442&amp;bpid=6507232793422312674" target="_blank">Appdata</a>:</b> أنسب خيار لجهاز شخصي دائم.</li>
    <li><b><a data-preview="" href="https://www.google.com/search?ved=1t:260882&amp;q=Program+Folder+definition&amp;bbid=3771343465280744442&amp;bpid=6507232793422312674" target="_blank">Program Folder</a>:</b> نسخة محمولة (Portable)، لكنها قد تتطلب تشغيل كمسؤول.</li>
  </ul>
  <div class="note-box">
    ⚠️ يفضل للمستخدمين الخبراء اعتماد نسخة Appdata لضمان التوافق مع تعريفات <a data-preview="" href="https://www.google.com/search?ved=1t:260882&amp;q=Windows+Service+definition&amp;bbid=3771343465280744442&amp;bpid=6507232793422312674" target="_blank">Windows Service</a>.
  </div>
  <div class="separator" style="clear: both; text-align: center"><a href="/media/blogger/1b/1b5a05dfe9b9dc043a6d3ea9783d82bfbcdf6a0d3d5caf6001a49a5e940d36d1.png" style="margin-left: 1em; margin-right: 1em"><img alt="" data-original-height="237" data-original-width="590" height="129" src="/media/blogger/1b/1b5a05dfe9b9dc043a6d3ea9783d82bfbcdf6a0d3d5caf6001a49a5e940d36d1.png" width="320" /></a></div><br />
</div>

<div class="step-box">
  <h3>🔹 تفعيل الأجهزة المدعومة</h3>
  <p>من نافذة <b><a data-preview="" href="https://www.google.com/search?ved=1t:260882&amp;q=Enabled+Devices+Mapper+Support&amp;bbid=3771343465280744442&amp;bpid=6507232793422312674" target="_blank">Enabled Devices Mapper Support</a></b>:</p>
  <ul>
    <li>✅ <b>DS4 Device Support:</b> مفعّل افتراضيًا.</li>
    <li><a data-preview="" href="https://www.google.com/search?ved=1t:260882&amp;q=DualSense+controller&amp;bbid=3771343465280744442&amp;bpid=6507232793422312674" target="_blank">DualSense</a> / <a data-preview="" href="https://www.google.com/search?ved=1t:260882&amp;q=Switch+Pro+controller&amp;bbid=3771343465280744442&amp;bpid=6507232793422312674" target="_blank">Switch Pro</a> / <a data-preview="" href="https://www.google.com/search?ved=1t:260882&amp;q=JoyCon+controller&amp;bbid=3771343465280744442&amp;bpid=6507232793422312674" target="_blank">JoyCon</a>: تُستخدم لوحدات أخرى.</li>
    <li><a data-preview="" href="https://www.google.com/search?ved=1t:260882&amp;q=DS3+controller&amp;bbid=3771343465280744442&amp;bpid=6507232793422312674" target="_blank">DS3</a>: يحتاج تعريف <b><a data-preview="" href="https://www.google.com/search?ved=1t:260882&amp;q=DsHidMini+driver&amp;bbid=3771343465280744442&amp;bpid=6507232793422312674" target="_blank">DsHidMini</a></b>.</li>
  </ul>
  <div class="note-box">
    لمستوى متقدم: يمكن تفعيل أكثر من نوع معًا، لكن DS4 هو الأساس هنا.
  </div>
  <div class="separator" style="clear: both; text-align: center"><a href="/media/blogger/27/27e748bdb777d51d26e01d15e9a4640005589c6403683fc7f47ba412fab9f2d7.png" style="margin-left: 1em; margin-right: 1em"><img alt="" data-original-height="659" data-original-width="1053" height="200" src="/media/blogger/27/27e748bdb777d51d26e01d15e9a4640005589c6403683fc7f47ba412fab9f2d7.png" width="320" /></a></div><br />
</div>

<div class="step-box">
  <h3>🔹 تثبيت التعريفات المتقدمة</h3>
  <ol>
    <li><b><a data-preview="" href="https://www.google.com/search?ved=1t:260882&amp;q=ViGEmBus+Driver&amp;bbid=3771343465280744442&amp;bpid=6507232793422312674" target="_blank">ViGEmBus Driver</a>:</b> يحول إدخال PS4 إلى <a data-preview="" href="https://www.google.com/search?ved=1t:260882&amp;q=XInput+definition&amp;bbid=3771343465280744442&amp;bpid=6507232793422312674" target="_blank">XInput</a> (<a data-preview="" href="https://www.google.com/search?ved=1t:260882&amp;q=Xbox+360&amp;bbid=3771343465280744442&amp;bpid=6507232793422312674" target="_blank">Xbox 360</a>). ضروري لجميع الإعدادات.</li>
    <li><b><a data-preview="" href="https://www.google.com/search?ved=1t:260882&amp;q=HidHide&amp;bbid=3771343465280744442&amp;bpid=6507232793422312674" target="_blank">HidHide</a>:</b> يستخدم لحل مشكلة <b><a data-preview="" href="https://www.google.com/search?ved=1t:260882&amp;q=Double+Input+controller&amp;bbid=3771343465280744442&amp;bpid=6507232793422312674" target="_blank">Double Input</a></b>. بدونه قد تسجل الألعاب إدخالًا مزدوجًا (الحقيقي + الافتراضي).</li>
    <li><b><a data-preview="" href="https://www.google.com/search?ved=1t:260882&amp;q=FakerInput&amp;bbid=3771343465280744442&amp;bpid=6507232793422312674" target="_blank">FakerInput</a>:</b> مهم إذا كنت تلعب ألعاب مع أنظمة حماية قوية (مثل <a data-preview="" href="https://www.google.com/search?ved=1t:260882&amp;q=Valorant+game&amp;bbid=3771343465280744442&amp;bpid=6507232793422312674" target="_blank">Valorant</a>) حيث يتم رفض الإدخال التقليدي.</li>
  </ol>
  <div class="note-box">
    💡 الخبير يعرف متى يحتاج HidHide أو FakerInput.  
    <br />إذا كان Dolphin يقرأ اليد مرتين → فعل HidHide.  
    <br />إذا منع النظام الإدخال → استخدم FakerInput.
  </div>
  <div class="separator" style="clear: both; text-align: center"><a href="/media/blogger/c7/c79dc97e50efe56a071148dcfc3119edd04e2c38dbc3e95bc50e5dc48e140838.png" style="margin-left: 1em; margin-right: 1em"><img alt="" data-original-height="872" data-original-width="727" height="240" src="/media/blogger/c7/c79dc97e50efe56a071148dcfc3119edd04e2c38dbc3e95bc50e5dc48e140838.png" width="200" /></a></div><br />
</div>

<div class="step-box">
  <h3>🔹 تفعيل UDP Server</h3>
  <p>من إعدادات DS4Windows:</p>
  <ul>
    <li>Enable UDP Server ✅</li>
    <li>المنفذ الافتراضي: <b>26760</b></li>
    <li>العنوان: <b>127.0.0.1</b></li>
  </ul>
  <div class="note-box">
    ⚠️ إذا كان لديك برنامج آخر يستخدم نفس المنفذ (مثلاً <a data-preview="" href="https://www.google.com/search?ved=1t:260882&amp;q=CemuHook&amp;bbid=3771343465280744442&amp;bpid=6507232793422312674" target="_blank">CemuHook</a> مع <a data-preview="" href="https://www.google.com/search?ved=1t:260882&amp;q=Cemu+emulator&amp;bbid=3771343465280744442&amp;bpid=6507232793422312674" target="_blank">Cemu</a>) → غيّر المنفذ لتجنب التعارض.
  </div>
  <div class="separator" style="clear: both; text-align: center"><br /><a href="/media/blogger/fc/fcdac52f2a315c5deab67e6ed286c651e0871ad0ea1fc020a74a7d8c57c27c16.png" style="margin-left: 1em; margin-right: 1em"><img alt="" data-original-height="672" data-original-width="895" height="240" src="/media/blogger/fc/fcdac52f2a315c5deab67e6ed286c651e0871ad0ea1fc020a74a7d8c57c27c16.png" width="320" /></a></div><div class="separator" style="clear: both; text-align: center"><a href="/media/blogger/2c/2c14b543bc8d32a958b846eda7105e70e361d349fb35a64be7804a302f5dbdc0.png" style="margin-left: 1em; margin-right: 1em"><img alt="" data-original-height="692" data-original-width="893" height="240" src="/media/blogger/2c/2c14b543bc8d32a958b846eda7105e70e361d349fb35a64be7804a302f5dbdc0.png" width="310" /></a></div><br />
</div>

<div class="step-box">
  <h3>🔹 إعداد محاكي Dolphin</h3>
  <ol>
    <li>اذهب إلى <b>Controllers</b>.</li>
    <li>اختر <b><a data-preview="" href="https://www.google.com/search?ved=1t:260882&amp;q=Alternate+Input+Sources+controller&amp;bbid=3771343465280744442&amp;bpid=6507232793422312674" target="_blank">Alternate Input Sources</a></b> → Enable.</li>
    <li>أضف سيرفر جديد (مثلاً: ps4).</li>
    <li>اختر من قائمة الأجهزة: <b>DSUClient/0/DualShock 4</b>.</li>
  </ol>
  <div class="note-box">
    ✅ <b><a data-preview="" href="https://www.google.com/search?ved=1t:260882&amp;q=Background+Input+streaming&amp;bbid=3771343465280744442&amp;bpid=6507232793422312674" target="_blank">Background Input</a>:</b> مهم للبث المباشر، يسمح لليد بالعمل حتى مع فتح <a data-preview="" href="https://www.google.com/search?ved=1t:260882&amp;q=OBS+studio&amp;bbid=3771343465280744442&amp;bpid=6507232793422312674" target="_blank">OBS</a> أو <a data-preview="" href="https://www.google.com/search?ved=1t:260882&amp;q=Discord+app&amp;bbid=3771343465280744442&amp;bpid=6507232793422312674" target="_blank">Discord</a> في المقدمة.
  </div>
  <div class="separator" style="clear: both; text-align: center"><a href="/media/blogger/bd/bd7c17282c91fce1809597c78ffe5e4123800e3ec4ca3dda7d728b31b3360aff.png" style="margin-left: 1em; margin-right: 1em"><img alt="" data-original-height="841" data-original-width="673" height="320" src="/media/blogger/01/01e186383a58f00e054530ccf13c8203ebcd40ae76e0b57a583399edca713d9f.png" width="256" /></a></div><div class="separator" style="clear: both; text-align: center"><a href="/media/blogger/74/74d4bd8a16236d6403ad8236831098717f06e220507691f9b97e21f6794f670f.png" style="margin-left: 1em; margin-right: 1em"><img alt="" data-original-height="835" data-original-width="1064" height="251" src="/media/blogger/a8/a8aab97290cf628c36fabd8a7d175068fbe6f6a7701347185d898cb073680509.png" width="320" /></a><div class="separator" style="clear: both; text-align: center"><a href="/media/blogger/74/74d4bd8a16236d6403ad8236831098717f06e220507691f9b97e21f6794f670f.png" style="margin-left: 1em; margin-right: 1em"></a><a href="/media/blogger/ad/ad2c5fb9ec1d6a886e44442dd01587e6417cfb798ced39ab8a9acbca9afd801c.png" style="margin-left: 1em; margin-right: 1em"><img alt="" data-original-height="854" data-original-width="1236" height="221" src="/media/blogger/29/29d2dcc0892ff7558c2096703ac53e47847497d838e0449e93e24857aa60def4.png" width="320" /></a></div></div><br /><br />
</div>

<div class="step-box">
  <h3>🔹 فهم الحساسات (مستوى خبير)</h3>
  <p>يد PS4 تحتوي على:</p>
  <ul>
    <li><b><a data-preview="" href="https://www.google.com/search?ved=1t:260882&amp;q=Gyroscope+definition&amp;bbid=3771343465280744442&amp;bpid=6507232793422312674" target="_blank">Gyroscope</a>:</b> يقيس السرعة الزاوية (Pitch, Yaw, Roll). <br />&nbsp;- <i>Pitch:</i> الأمام/الخلف.  
    - <i>Yaw:</i> يمين/يسار.  
    - <i>Roll:</i> دوران حول المحور.<br /><br /><div class="separator" style="clear: both; text-align: center"><div class="separator" style="clear: both; text-align: center"><a href="/media/blogger/b9/b9117e4429714cf16d7ff903555f3a866915f9e36ea0c569a7ccc20737d231ff.png" style="margin-left: 1em; margin-right: 1em"><img alt="" data-original-height="907" data-original-width="1448" height="200" src="/media/blogger/b9/b9117e4429714cf16d7ff903555f3a866915f9e36ea0c569a7ccc20737d231ff.png" width="320" /></a></div></div><br /></li>
    <li><b>Accelerometer:</b> يقيس التسارع الخطي (اهتزازات/هزات أمامية وخلفية).<br /><div class="separator" style="clear: both; text-align: center"><a href="/media/blogger/ec/eceed262e9259dd384a8610671d2ef65bd9711832999866a7f65daa2c21c5fec.png" style="margin-left: 1em; margin-right: 1em"><img alt="" data-original-height="779" data-original-width="1279" height="195" src="/media/blogger/ec/eceed262e9259dd384a8610671d2ef65bd9711832999866a7f65daa2c21c5fec.png" width="320" /></a></div><br /></li>
  </ul>
  <div class="note-box">
    🎯 دمج الجيروسكوب + التسارع يعطي محاكاة قريبة جدًا من Wii Remote الحقيقي، 
    لكن بعض الألعاب قد تتطلب ضبط <b>Dead Zone</b> لتجنب الانحراف أو <b>Calibration Period</b> (3 ثوانٍ).
  </div>
  <div class="separator" style="clear: both; text-align: center"><a href="/media/blogger/48/489b5adb3493aae1f90e53e81790c17fa8ff1632dd5582d74f9d4ff53bdb32b4.png" style="margin-left: 1em; margin-right: 1em"><img alt="" data-original-height="743" data-original-width="786" height="240" src="/media/blogger/48/489b5adb3493aae1f90e53e81790c17fa8ff1632dd5582d74f9d4ff53bdb32b4.png" width="254" /></a></div><br />
</div>

<div class="step-box">
  <h3>🔹 المؤشر Pointer</h3>
  <p>في Dolphin يتم ربط المؤشر بمحوري <b>Yaw</b> و <b>Pitch</b> من الجيروسكوب. <br />&nbsp;تفعيل <b>Relative Input</b> يجعله يعمل مثل الماوس (لا يعود للوسط تلقائيًا).</p>
  <p>زر <b>R1</b> يعاد تكوينه كـ <b>Recenter</b> لإرجاع المؤشر للوسط عند الانحراف.</p>
  <div class="separator" style="clear: both; text-align: center"><a href="/media/blogger/ea/ea9486b469251f831f325726df5c80b7e52e479952cdc8bafc23c8cf27477c32.png" style="margin-left: 1em; margin-right: 1em"><img alt="" data-original-height="686" data-original-width="1480" height="148" src="/media/blogger/ea/ea9486b469251f831f325726df5c80b7e52e479952cdc8bafc23c8cf27477c32.png" width="320" /></a><br /><br /></div>
</div>

<div class="step-box">
  <h3>🔹 MotionPlus</h3>
  <p>في Wii الأصلي، كان <b>MotionPlus</b> قطعة إضافية لتحسين دقة الجيروسكوب.  
  في Dolphin، يمكن تفعيل خيار <b>Attach MotionPlus</b> لمحاكاة ذلك.  
  بعض الألعاب لن تعمل بدونه مثل:</p>
  <ul>
    <li>Zelda: Skyward Sword</li>
    <li>Wii Sports Resort</li>
    <li>Red Steel 2</li>
  </ul>
  <div class="note-box">
    🔬 Dolphin يحاكي MotionPlus برمجيًا، مما قد يستهلك مزيدًا من المعالجة عند دقة عالية.
  </div>
  <div class="separator" style="clear: both; text-align: center"><a href="/media/blogger/4d/4df1ea705efed8c307d32368468099970ea183c58d1c3afd5299105e8ea34617.png" style="margin-left: 1em; margin-right: 1em"><img alt="" data-original-height="698" data-original-width="875" height="240" src="/media/blogger/4d/4df1ea705efed8c307d32368468099970ea183c58d1c3afd5299105e8ea34617.png" width="301" /></a></div><br />
</div>

<div class="step-box">
  <h3>🔹 التجربة العملية</h3>
  <p>جرب تشغيل <b>Zelda: Skyward Sword</b>:</p>
  <ul>
    <li>حركة السيف تتبع يدك يمين/يسار وفوق/تحت.</li>
    <li>التصويب بالقوس أو الخطاف يتم بدقة عالية.</li>
    <li>إذا انحرف المؤشر → اضغط <b>R1</b> للعودة للوسط.</li>
  </ul>
  <div class="separator" style="clear: both; text-align: center"><a href="/media/blogger/d4/d4aafce70b38d4cac33eb51fb1e9e75294dd276213f1165f629f43908a564d50.png" style="margin-left: 1em; margin-right: 1em"><img alt="" data-original-height="504" data-original-width="882" height="183" src="/media/blogger/d4/d4aafce70b38d4cac33eb51fb1e9e75294dd276213f1165f629f43908a564d50.png" width="320" /></a></div><br />
</div>

<div class="step-box">
  <h3>🔧 ملاحظات&nbsp;</h3>
  <ul>
    <li>شغل DS4Windows دائمًا قبل Dolphin.</li>
    <li>إذا لم يظهر DSUClient → تحقق من جدار الحماية (Firewall).</li>
    <li>UDP Port 26760 قد يتعارض مع برامج أخرى (CemuHook) → غيّر المنفذ يدويًا.</li>
    <li>لضبط الاستقرار: فعل <b>HidHide</b> إذا واجهت إدخالًا مزدوجًا.</li>
    <li>في البث المباشر: استخدم <b>Background Input</b> لضمان استمرار التحكم أثناء تعدد المهام.</li>
  </ul>
</div>

<div class="step-box">
  <h3>🎯 النتيجة</h3>
  <p>
  بفضل هذه الإعدادات، تتحول يد <b>PS4</b> إلى وحدة تحكم متكاملة لمحاكي Dolphin، 
  مع دقة عالية في الحركة والتصويب، ودعم MotionPlus، وإمكانية تخصيص عميق للخبراء.  
  هذه الطريقة تمنحك تجربة قريبة جدًا من Wii الأصلي، بل مع استقرار ودقة أعلى عند استخدام الأجهزة الحديثة.
  </p>
</div>

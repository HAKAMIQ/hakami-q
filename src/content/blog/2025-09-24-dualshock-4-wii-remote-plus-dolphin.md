---
title: 'ربط يد PS4 مع محاكي Dolphin – الدليل المتقدم'
description: '🎮 ربط يد PS4 مع محاكي Dolphin – دليل متقدم الهدف من هذا الدليل هو تحويل يد PS4 إلى Wii Remote Plus بكامل خصائصها (جايروسكوب، تسارع، مؤشر، MotionPlus ) داخل محاكي Dolphin . العملية…'
pubDate: '2025-09-24T12:04:00.001+03:00'
updatedDate: '2025-09-24T12:05:32.462+03:00'
heroImage: '../../assets/blog-placeholder-1.jpg'
heroImageUrl: 'https://blogger.googleusercontent.com/img/a/AVvXsEg5iEqpL-3yMisPDhXoIYhRbZ2pb7k8kTrg_3lfuI3HZ5hDoInMxHZegGM5rbo4l0kc5mWUJljq7379N7-gW25qAA2Cv0cWTqxJiUUk72Pj0T6btDetYG3u4xT2OWXrfAxX3kl4xnE3oZOM-IPP_14Y4EAhyLBoF-XgSFEmWFw3WoCWc4HWJ3vp8EHQDlY'
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
  <div class="separator" style="clear: both; text-align: center;"><a href="https://blogger.googleusercontent.com/img/a/AVvXsEgQlrrv90DDGlVGFHsOU80-q1f2my74j0FfdnYMC0o_OY19HAV_c1FFopOUeSr83eFqGx3BBmZrM91mLPwq5i2P5J7gSHbKU1wX1rzQ8EwrZrm-GLbsYP8CEi2uVn0J37c2ezB5gmBz1Q3M1pjaj3-3xfjGXF3weIW-k81P0Pjd4aHPeu9gcQzIV4SfTi0" style="margin-left: 1em; margin-right: 1em;"></a><div class="separator" style="clear: both; text-align: center;"><a href="https://blogger.googleusercontent.com/img/a/AVvXsEgQlrrv90DDGlVGFHsOU80-q1f2my74j0FfdnYMC0o_OY19HAV_c1FFopOUeSr83eFqGx3BBmZrM91mLPwq5i2P5J7gSHbKU1wX1rzQ8EwrZrm-GLbsYP8CEi2uVn0J37c2ezB5gmBz1Q3M1pjaj3-3xfjGXF3weIW-k81P0Pjd4aHPeu9gcQzIV4SfTi0" style="margin-left: 1em; margin-right: 1em;"></a><a href="https://blogger.googleusercontent.com/img/a/AVvXsEg5iEqpL-3yMisPDhXoIYhRbZ2pb7k8kTrg_3lfuI3HZ5hDoInMxHZegGM5rbo4l0kc5mWUJljq7379N7-gW25qAA2Cv0cWTqxJiUUk72Pj0T6btDetYG3u4xT2OWXrfAxX3kl4xnE3oZOM-IPP_14Y4EAhyLBoF-XgSFEmWFw3WoCWc4HWJ3vp8EHQDlY" style="margin-left: 1em; margin-right: 1em;"><img alt="" data-original-height="872" data-original-width="1569" height="178" src="https://blogger.googleusercontent.com/img/a/AVvXsEg5iEqpL-3yMisPDhXoIYhRbZ2pb7k8kTrg_3lfuI3HZ5hDoInMxHZegGM5rbo4l0kc5mWUJljq7379N7-gW25qAA2Cv0cWTqxJiUUk72Pj0T6btDetYG3u4xT2OWXrfAxX3kl4xnE3oZOM-IPP_14Y4EAhyLBoF-XgSFEmWFw3WoCWc4HWJ3vp8EHQDlY" width="320" /></a></div></div><br />
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
  <div class="separator" style="clear: both; text-align: center;"><a href="https://blogger.googleusercontent.com/img/a/AVvXsEjRhV7M_L8Lvqxc0lV_A_ZND9CP4srBw0QGyDNQtYeQh3unKZdaOItK8fX-EMOE2yyVSWlyPtEh01rDPKd6ntWu07z-sjtQBVtZnWS6WseqU0kLFScr3jRT0vwsj9KrmVEMB5g5ldB0OUMg6wTh3eRkXY2_Qc2ZG-st6Kx6edktWh4YXRX0mZDugjib24Y" style="margin-left: 1em; margin-right: 1em;"><img alt="" data-original-height="237" data-original-width="590" height="129" src="https://blogger.googleusercontent.com/img/a/AVvXsEjRhV7M_L8Lvqxc0lV_A_ZND9CP4srBw0QGyDNQtYeQh3unKZdaOItK8fX-EMOE2yyVSWlyPtEh01rDPKd6ntWu07z-sjtQBVtZnWS6WseqU0kLFScr3jRT0vwsj9KrmVEMB5g5ldB0OUMg6wTh3eRkXY2_Qc2ZG-st6Kx6edktWh4YXRX0mZDugjib24Y" width="320" /></a></div><br />
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
  <div class="separator" style="clear: both; text-align: center;"><a href="https://blogger.googleusercontent.com/img/a/AVvXsEiojFNfmb3Iv5zZY-eCTtu4Jkw2gTScR78kW0Ua19FeW35jrWTo8u4BrG7yCy2VEGxO3LwpmR3qOoggfmCOG6KtcFLyi5bb5McKfzW4X6MVWkpbm09oncAQxoZJkLSu0VzbeMehfsiKiZi745VJR-vRmaXymTBQjtpm_B7WtVMonHaWz0K9pP2map71Zfw" style="margin-left: 1em; margin-right: 1em;"><img alt="" data-original-height="659" data-original-width="1053" height="200" src="https://blogger.googleusercontent.com/img/a/AVvXsEiojFNfmb3Iv5zZY-eCTtu4Jkw2gTScR78kW0Ua19FeW35jrWTo8u4BrG7yCy2VEGxO3LwpmR3qOoggfmCOG6KtcFLyi5bb5McKfzW4X6MVWkpbm09oncAQxoZJkLSu0VzbeMehfsiKiZi745VJR-vRmaXymTBQjtpm_B7WtVMonHaWz0K9pP2map71Zfw" width="320" /></a></div><br />
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
  <div class="separator" style="clear: both; text-align: center;"><a href="https://blogger.googleusercontent.com/img/a/AVvXsEh9YxI393hlBEEO30v8lmiZa8svgxTDoe2KU7MoLxBFB_R-51WAXsZ9m_JMD6E9uML5YbWVT7dJGWUOwr6KW0-6lKHcxe6CCEyZnN-o1MUFVdY8i_XvsjAjHAPSFuAoanM9UpLcSNcOBDmZpocGQTjFyb4_x09FeZ_Xg1um_Zer9jBuW9YfX1ESnc_8unI" style="margin-left: 1em; margin-right: 1em;"><img alt="" data-original-height="872" data-original-width="727" height="240" src="https://blogger.googleusercontent.com/img/a/AVvXsEh9YxI393hlBEEO30v8lmiZa8svgxTDoe2KU7MoLxBFB_R-51WAXsZ9m_JMD6E9uML5YbWVT7dJGWUOwr6KW0-6lKHcxe6CCEyZnN-o1MUFVdY8i_XvsjAjHAPSFuAoanM9UpLcSNcOBDmZpocGQTjFyb4_x09FeZ_Xg1um_Zer9jBuW9YfX1ESnc_8unI" width="200" /></a></div><br />
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
  <div class="separator" style="clear: both; text-align: center;"><br /><a href="https://blogger.googleusercontent.com/img/a/AVvXsEgWT-r95U288EOC0DblAQ4z_AVN7DiZqEoZPBdj_dJcunAsE2hmr8eGxiTZU_ofSIh-8j7HPqKNCqQDH9y_sjQhsaA3GI0FDtnKDcOIfoprF7grIsXd-XfR77Tzo8jV66EAAFhd8Jakou6gCfH6OmmCtbtpA2fCjbCQDfNjlkUi2v7YopxzvrEAJQ793zU" style="margin-left: 1em; margin-right: 1em;"><img alt="" data-original-height="672" data-original-width="895" height="240" src="https://blogger.googleusercontent.com/img/a/AVvXsEgWT-r95U288EOC0DblAQ4z_AVN7DiZqEoZPBdj_dJcunAsE2hmr8eGxiTZU_ofSIh-8j7HPqKNCqQDH9y_sjQhsaA3GI0FDtnKDcOIfoprF7grIsXd-XfR77Tzo8jV66EAAFhd8Jakou6gCfH6OmmCtbtpA2fCjbCQDfNjlkUi2v7YopxzvrEAJQ793zU" width="320" /></a></div><div class="separator" style="clear: both; text-align: center;"><a href="https://blogger.googleusercontent.com/img/a/AVvXsEi9pJRb_aFIYzgTA673ni8YGpm8K8wLhEqsL1obmB9sEQwowgXpeSXao_djKuVw4AWTiwzKRKKsbSbAUvtAnGYh_YzE_msR31OIl7kSvEzruqa0cBHGl0nMAtQWBCFTnBrWZuhk4wiOS10razLKfD0_Ro89AJhxnGs1whjttLhsUJAceAhiQVkzlB1yotc" style="margin-left: 1em; margin-right: 1em;"><img alt="" data-original-height="692" data-original-width="893" height="240" src="https://blogger.googleusercontent.com/img/a/AVvXsEi9pJRb_aFIYzgTA673ni8YGpm8K8wLhEqsL1obmB9sEQwowgXpeSXao_djKuVw4AWTiwzKRKKsbSbAUvtAnGYh_YzE_msR31OIl7kSvEzruqa0cBHGl0nMAtQWBCFTnBrWZuhk4wiOS10razLKfD0_Ro89AJhxnGs1whjttLhsUJAceAhiQVkzlB1yotc" width="310" /></a></div><br />
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
  <div class="separator" style="clear: both; text-align: center;"><a href="https://blogger.googleusercontent.com/img/a/AVvXsEhW50KA0LbXDHT24XgN2moWZcIEvRb1oVE-bzihKGAT9fcGa_mOuKgYzSNv7ARYbGUehnaUsg5xLx305UCEMTFsAG57yIGZwyX5bTCwmEgDEau8fU2xh-PCy14_dI8qcXuB02NEz5HaaKUB5oYcVt4HGbvfLLz07yNalAxgen2_4p5_avftubddEKvSLGc" style="margin-left: 1em; margin-right: 1em;"><img alt="" data-original-height="841" data-original-width="673" height="320" src="https://blogger.googleusercontent.com/img/a/AVvXsEhW50KA0LbXDHT24XgN2moWZcIEvRb1oVE-bzihKGAT9fcGa_mOuKgYzSNv7ARYbGUehnaUsg5xLx305UCEMTFsAG57yIGZwyX5bTCwmEgDEau8fU2xh-PCy14_dI8qcXuB02NEz5HaaKUB5oYcVt4HGbvfLLz07yNalAxgen2_4p5_avftubddEKvSLGc=w256-h320" width="256" /></a></div><div class="separator" style="clear: both; text-align: center;"><a href="https://blogger.googleusercontent.com/img/a/AVvXsEg89wPRHRwwBN9ynoWAImLVSBuge1x0R5ubqU9O_aN-RP701nMg4RskFE_wuUPkX6Prr-UxR--9CHST-89WQXWQ8V-6TeY1i5yvN9EkQZx4kk2D7mwKXb1x0v7-VjVOdNMCyrlSITli0WowP-dRBxgiGbSDSlaMVj9WHzJwPX3QcWzy7yyc7M9xj-4vmis" style="margin-left: 1em; margin-right: 1em;"><img alt="" data-original-height="835" data-original-width="1064" height="251" src="https://blogger.googleusercontent.com/img/a/AVvXsEg89wPRHRwwBN9ynoWAImLVSBuge1x0R5ubqU9O_aN-RP701nMg4RskFE_wuUPkX6Prr-UxR--9CHST-89WQXWQ8V-6TeY1i5yvN9EkQZx4kk2D7mwKXb1x0v7-VjVOdNMCyrlSITli0WowP-dRBxgiGbSDSlaMVj9WHzJwPX3QcWzy7yyc7M9xj-4vmis=w320-h251" width="320" /></a><div class="separator" style="clear: both; text-align: center;"><a href="https://blogger.googleusercontent.com/img/a/AVvXsEg89wPRHRwwBN9ynoWAImLVSBuge1x0R5ubqU9O_aN-RP701nMg4RskFE_wuUPkX6Prr-UxR--9CHST-89WQXWQ8V-6TeY1i5yvN9EkQZx4kk2D7mwKXb1x0v7-VjVOdNMCyrlSITli0WowP-dRBxgiGbSDSlaMVj9WHzJwPX3QcWzy7yyc7M9xj-4vmis" style="margin-left: 1em; margin-right: 1em;"></a><a href="https://blogger.googleusercontent.com/img/a/AVvXsEidlMwaPIDEje9VRYjDukmcB6t7tzM0gnsCX4uDrU9BLMOQisI5TMKPNumel7Lbr6BRvwLenMOBIsFoElVOhPb10moKXEqVHwPXNEB3oaHs7PnQVOmfzAtoc-h0uoHq5ZcCyImFQaMOwPHwk7PqmFutwoosHeV5VwGsxDAqyOMYyl9RxweszP8bCHPzRRQ" style="margin-left: 1em; margin-right: 1em;"><img alt="" data-original-height="854" data-original-width="1236" height="221" src="https://blogger.googleusercontent.com/img/a/AVvXsEidlMwaPIDEje9VRYjDukmcB6t7tzM0gnsCX4uDrU9BLMOQisI5TMKPNumel7Lbr6BRvwLenMOBIsFoElVOhPb10moKXEqVHwPXNEB3oaHs7PnQVOmfzAtoc-h0uoHq5ZcCyImFQaMOwPHwk7PqmFutwoosHeV5VwGsxDAqyOMYyl9RxweszP8bCHPzRRQ=w320-h221" width="320" /></a></div></div><br /><br />
</div>

<div class="step-box">
  <h3>🔹 فهم الحساسات (مستوى خبير)</h3>
  <p>يد PS4 تحتوي على:</p>
  <ul>
    <li><b><a data-preview="" href="https://www.google.com/search?ved=1t:260882&amp;q=Gyroscope+definition&amp;bbid=3771343465280744442&amp;bpid=6507232793422312674" target="_blank">Gyroscope</a>:</b> يقيس السرعة الزاوية (Pitch, Yaw, Roll). <br />&nbsp;- <i>Pitch:</i> الأمام/الخلف.  
    - <i>Yaw:</i> يمين/يسار.  
    - <i>Roll:</i> دوران حول المحور.<br /><br /><div class="separator" style="clear: both; text-align: center;"><div class="separator" style="clear: both; text-align: center;"><a href="https://blogger.googleusercontent.com/img/a/AVvXsEgA9pscWgzIGVRbeT8ek25JUtm1o89NAFxeUkZd0tvyQO6nzUhhZmWVWOIAYpy6eL-SRHqNy3wZb39uRthJ4ntJJVQYxUHmmZM9JXmbe5Qqm6SMffdbg3DCMgCHpvveXydl3ffgfo4HgAhxiTWMu_KajM-3dRlDvA67zxZVioJqO6E3C_sgGhomI39Wpo8" style="margin-left: 1em; margin-right: 1em;"><img alt="" data-original-height="907" data-original-width="1448" height="200" src="https://blogger.googleusercontent.com/img/a/AVvXsEgA9pscWgzIGVRbeT8ek25JUtm1o89NAFxeUkZd0tvyQO6nzUhhZmWVWOIAYpy6eL-SRHqNy3wZb39uRthJ4ntJJVQYxUHmmZM9JXmbe5Qqm6SMffdbg3DCMgCHpvveXydl3ffgfo4HgAhxiTWMu_KajM-3dRlDvA67zxZVioJqO6E3C_sgGhomI39Wpo8" width="320" /></a></div></div><br /></li>
    <li><b>Accelerometer:</b> يقيس التسارع الخطي (اهتزازات/هزات أمامية وخلفية).<br /><div class="separator" style="clear: both; text-align: center;"><a href="https://blogger.googleusercontent.com/img/a/AVvXsEirP7vcbTADlVlcPRX73FqE-P0siRs-KCvGLE-C3O82GHkAJjbLsqleeQbWrk8TM0hxh8iLhsZ8iW8_AQOdg4_jSDtzvd0fYmCmRTpmu4qhTeLux1YHONj5n36p7YLncTEMq-FOdfX2wvGR3wtp8EFMyuI8HaRg2yEWB0vgeabnMZ_XTt8CQqe6NGQjk8o" style="margin-left: 1em; margin-right: 1em;"><img alt="" data-original-height="779" data-original-width="1279" height="195" src="https://blogger.googleusercontent.com/img/a/AVvXsEirP7vcbTADlVlcPRX73FqE-P0siRs-KCvGLE-C3O82GHkAJjbLsqleeQbWrk8TM0hxh8iLhsZ8iW8_AQOdg4_jSDtzvd0fYmCmRTpmu4qhTeLux1YHONj5n36p7YLncTEMq-FOdfX2wvGR3wtp8EFMyuI8HaRg2yEWB0vgeabnMZ_XTt8CQqe6NGQjk8o" width="320" /></a></div><br /></li>
  </ul>
  <div class="note-box">
    🎯 دمج الجيروسكوب + التسارع يعطي محاكاة قريبة جدًا من Wii Remote الحقيقي، 
    لكن بعض الألعاب قد تتطلب ضبط <b>Dead Zone</b> لتجنب الانحراف أو <b>Calibration Period</b> (3 ثوانٍ).
  </div>
  <div class="separator" style="clear: both; text-align: center;"><a href="https://blogger.googleusercontent.com/img/a/AVvXsEgPDiaZuv0IcTwgj0TGwaMfeZ7AkOo6m9Dki9imlmrTfG3r0MjjB_infOQNG0unum_QxGJob_tTsAwmxlKERx0azEwIoXSxLLQnx5QEU63ZOXwMOOH4FpHfxlurrJF7X-0bsteqeAoN1fkbKe_tmpbMRJ-dGlmPso7Jpj6HTF36NndAa5xi9swYbE8jxgs" style="margin-left: 1em; margin-right: 1em;"><img alt="" data-original-height="743" data-original-width="786" height="240" src="https://blogger.googleusercontent.com/img/a/AVvXsEgPDiaZuv0IcTwgj0TGwaMfeZ7AkOo6m9Dki9imlmrTfG3r0MjjB_infOQNG0unum_QxGJob_tTsAwmxlKERx0azEwIoXSxLLQnx5QEU63ZOXwMOOH4FpHfxlurrJF7X-0bsteqeAoN1fkbKe_tmpbMRJ-dGlmPso7Jpj6HTF36NndAa5xi9swYbE8jxgs" width="254" /></a></div><br />
</div>

<div class="step-box">
  <h3>🔹 المؤشر Pointer</h3>
  <p>في Dolphin يتم ربط المؤشر بمحوري <b>Yaw</b> و <b>Pitch</b> من الجيروسكوب. <br />&nbsp;تفعيل <b>Relative Input</b> يجعله يعمل مثل الماوس (لا يعود للوسط تلقائيًا).</p>
  <p>زر <b>R1</b> يعاد تكوينه كـ <b>Recenter</b> لإرجاع المؤشر للوسط عند الانحراف.</p>
  <div class="separator" style="clear: both; text-align: center;"><a href="https://blogger.googleusercontent.com/img/a/AVvXsEhFkGwHuX8RdGGUQg4y0dFbGybRePLABx_2rP5GGzBZ7slNfIKal6HA04G26SAVjsotXm5w9riXnW4pa4ddZxj_s0X5OjIq4REnLqa-H9MAyvAXQbOsD7D0-glCUZK6RmWUqkCJzwkYidmDznGIeKjWZm4fbLEFhrAzBn5_5lP_VV5xNCQNUvPbe72JtgU" style="margin-left: 1em; margin-right: 1em;"><img alt="" data-original-height="686" data-original-width="1480" height="148" src="https://blogger.googleusercontent.com/img/a/AVvXsEhFkGwHuX8RdGGUQg4y0dFbGybRePLABx_2rP5GGzBZ7slNfIKal6HA04G26SAVjsotXm5w9riXnW4pa4ddZxj_s0X5OjIq4REnLqa-H9MAyvAXQbOsD7D0-glCUZK6RmWUqkCJzwkYidmDznGIeKjWZm4fbLEFhrAzBn5_5lP_VV5xNCQNUvPbe72JtgU" width="320" /></a><br /><br /></div>
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
  <div class="separator" style="clear: both; text-align: center;"><a href="https://blogger.googleusercontent.com/img/a/AVvXsEiWiJHGe5u9_EngiIN-iQRWY9s_-GRHd-FJEsDwvXWbNe4vwhcdV2p8UlNNSV9XLKEQWD_DY3JDUslkQcdHnzlEJEQcYV-IPW-zcvRlkV1oBLugcgj-A1O7VXJxNLN4igS00JjEOTx9e3Qbg4Cay3jAhbbdRKifg2xlTG044YuG8wGwO8SXJnD5mZJG7rY" style="margin-left: 1em; margin-right: 1em;"><img alt="" data-original-height="698" data-original-width="875" height="240" src="https://blogger.googleusercontent.com/img/a/AVvXsEiWiJHGe5u9_EngiIN-iQRWY9s_-GRHd-FJEsDwvXWbNe4vwhcdV2p8UlNNSV9XLKEQWD_DY3JDUslkQcdHnzlEJEQcYV-IPW-zcvRlkV1oBLugcgj-A1O7VXJxNLN4igS00JjEOTx9e3Qbg4Cay3jAhbbdRKifg2xlTG044YuG8wGwO8SXJnD5mZJG7rY" width="301" /></a></div><br />
</div>

<div class="step-box">
  <h3>🔹 التجربة العملية</h3>
  <p>جرب تشغيل <b>Zelda: Skyward Sword</b>:</p>
  <ul>
    <li>حركة السيف تتبع يدك يمين/يسار وفوق/تحت.</li>
    <li>التصويب بالقوس أو الخطاف يتم بدقة عالية.</li>
    <li>إذا انحرف المؤشر → اضغط <b>R1</b> للعودة للوسط.</li>
  </ul>
  <div class="separator" style="clear: both; text-align: center;"><a href="https://blogger.googleusercontent.com/img/a/AVvXsEhUcM3VErtCmYLhGXxke2FYefIpk8XJWveG4wqwAcSFWQw3B4U1nQ180BraJVLT1MWd_Tone3EIipZxPGj3b28zV3le0eJf5UuRnhUS1bVw1SwtXVkJUjsJ9zMDLVrM33kOKlH87QpW0UxwTDIBuMoIh3Waw1ANcuHx4H-lw-MK4aXV0u5UfqFUUbPV9xc" style="margin-left: 1em; margin-right: 1em;"><img alt="" data-original-height="504" data-original-width="882" height="183" src="https://blogger.googleusercontent.com/img/a/AVvXsEhUcM3VErtCmYLhGXxke2FYefIpk8XJWveG4wqwAcSFWQw3B4U1nQ180BraJVLT1MWd_Tone3EIipZxPGj3b28zV3le0eJf5UuRnhUS1bVw1SwtXVkJUjsJ9zMDLVrM33kOKlH87QpW0UxwTDIBuMoIh3Waw1ANcuHx4H-lw-MK4aXV0u5UfqFUUbPV9xc" width="320" /></a></div><br />
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

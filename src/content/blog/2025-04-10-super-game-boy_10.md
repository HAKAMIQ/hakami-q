---
title: 'كيف تشغل ألعاب Super Game Boy داخل المحاكي؟'
description: '🕹️ وش هو Super Game Boy (SGB)؟ SGB هو محول كان يُستخدم على جهاز Super Nintendo لتشغيل ألعاب Game Boy على التلفزيون مع ألوان وإطارات وأحياناً مزايا صوتية إضافية. واليوم، نقدر نستعي…'
pubDate: '2025-04-10T23:31:00.002+03:00'
updatedDate: '2025-04-10T23:31:47.161+03:00'
heroImage: '../../assets/blog-placeholder-1.jpg'
heroImageUrl: '/media/blogger/41/416e779d8b9bb4e7ea5e5fc2f086591c476d935244d2dbd273c5f1a2ddfd6c95.png'
originalUrl: 'https://hakamiq1.blogspot.com/2025/04/super-game-boy_10.html'
labels: ["Nintendo","SGB"]
---

<style>
  body {
    font-family: "Tajawal", sans-serif;
    color: #2e2e2e;
    line-height: 1.8;
    font-size: 16px;
  }
  h2 {
    color: #5c6bc0;
    margin-top: 40px;
  }
  h3 {
    color: #388e3c;
    margin-top: 30px;
    font-size: 20px;
  }
  p {
    margin-bottom: 20px;
  }
  ul {
    margin-bottom: 20px;
  }
  hr {
    border: none;
    border-top: 1px solid #ccc;
    margin: 40px 0;
  }
  code {
    background-color: #f4f4f4;
    padding: 2px 6px;
    border-radius: 4px;
    font-family: monospace;
  }
</style>

<div class="separator" style="clear: both; text-align: center"><a href="/media/blogger/41/416e779d8b9bb4e7ea5e5fc2f086591c476d935244d2dbd273c5f1a2ddfd6c95.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em"><img alt="صورة توضيحية ضمن مقال كيف تشغل ألعاب Super Game Boy داخل المحاكي؟" border="0" data-original-height="1024" data-original-width="1024" height="320" src="/media/blogger/41/416e779d8b9bb4e7ea5e5fc2f086591c476d935244d2dbd273c5f1a2ddfd6c95.png" width="320" /></a></div><h2>🕹️ وش هو Super Game Boy (SGB)؟</h2>
<p>
<code>SGB</code> هو محول كان يُستخدم على جهاز Super Nintendo لتشغيل ألعاب Game Boy على التلفزيون مع ألوان وإطارات وأحياناً مزايا صوتية إضافية.
</p>
<p>
واليوم، نقدر نستعيد التجربة هذي عن طريق المحاكيات… وبسهولة بعد!
</p>

<hr />

<h2>💾 المتطلبات</h2>
<ul>
  <li>📁 <strong>ملف BIOS خاص بـ SGB</strong> – اسمه غالباً: <code>sgb.boot</code></li>
  <li>🎮 <strong>أحد المحاكيات التالية:</strong></li>
  <ul>
    <li>✅ <strong>SameBoy</strong> (ممتاز جداً ويدعم SGB رسميًا)</li>
    <li>✅ <strong>RetroArch</strong> (مع نواة SameBoy أو Gambatte)</li>
    <li>✅ <strong>bgb</strong> (خفيف وسهل على الويندوز)</li>
  </ul>
</ul>

<hr />

<h2>🧠 ملاحظة مهمة</h2>
<p>
مو كل ألعاب GB تدعم SGB. لازم تتأكد إن اللعبة مكتوب عليها “<strong>SGB Enhanced</strong>” أو فيها ميزات مرئية خاصة بـ SGB.
</p>

<hr />

<h2>🔧 طريقة التشغيل – عبر SameBoy</h2>

<h3>📂 1. ضع ملف BIOS</h3>
<p>
حمّل ملف <code>sgb.boot</code>، وضعه في نفس مجلد المحاكي أو داخل مجلد اسمه <code>BIOS</code>.  
يجب أن يكون الاسم مطابق تمامًا، وإلا ما رح يشتغل.
</p>

<h3>🕹️ 2. تشغيل اللعبة</h3>
<p>
افتح المحاكي، شغّل أي لعبة تدعم SGB (مثل Donkey Kong).  
إذا اشتغلت معك بإطار ملوّن وخلفية حول الشاشة؟ معناها الوضع تمام ✅
</p>

<h3>🎨 3. فعّل مظهر SGB اليدوي</h3>
<p>
بعض الألعاب تحتاج تفعيل من إعدادات المحاكي:  
<code>Options → Console Mode → Super Game Boy</code>
</p>

<hr />

<h2>🧩 عبر RetroArch</h2>

<h3>📦 1. تأكد أنك تستخدم نواة SameBoy</h3>
<p>RetroArch فيه نواة اسمها <code>SameBoy</code>.  
ادخل مدير النوى، حملها، وشغل اللعبة منها.
</p>

<h3>📁 2. ضع ملف BIOS داخل مجلد النظام</h3>
<p>
روح لـ <code>Settings → Directory → System/BIOS</code>  
وانسخ فيه ملف <code>sgb.boot</code>
</p>

<h3>🎮 3. شغّل اللعبة واختر الوضع</h3>
<p>
من داخل المحاكي:  
<code>Quick Menu → Options → Console Type = Super Game Boy</code>
</p>

<hr />

<h2>✨ نصائح حكميك لتجربة فخمة</h2>
<ul>
  <li>🎨 استخدم شيدرز (فلاتر بصرية) تعطي تأثير CRT</li>
  <li>🔊 فعل الصوت المحسن – بعض المحاكيات تدعمه</li>
  <li>🖼️ اختار لعبة تدعم SGB فعليًا (مثل Pokémon Yellow أو Donkey Kong)</li>
</ul>

<hr />

<h2>📌 خلاصة التجربة</h2>
<p>
تجربة SGB على المحاكي مش بس ترف…  
هي استعادة لواحدة من أذكى اختراعات نينتندو،  
وتخليك تلعب ألعاب المحمول وكأنك رجعت 1995… بس بألوان، صوت، وشاشة كبيرة!
</p>
<p><strong>حكميك</strong> ينصحك:  
جربها اليوم… وصدقني بتتفاجأ إن ألعاب الأبيض والأسود تقدر تطلع بـ ألوان الحياة 💜</p>

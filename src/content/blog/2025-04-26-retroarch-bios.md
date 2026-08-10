---
title: 'RetroArch الإعداد وتركيب ملفات BIOS والأنوية | الجزء الثاني'
description: '📦 متابعة من الجزء الأول: إعداد وتركيب ملفات BIOS والأنوية في RetroArch بعد الانتهاء من الجزء الأول من سلسلة RetroArch والذي شرحت فيه خطوات التثبيت وتحميل الأنوية، ننتقل الآن إلى ا…'
pubDate: '2025-04-26T02:53:00.007+03:00'
updatedDate: '2025-05-07T00:55:07.137+03:00'
heroImage: '../../assets/blog-placeholder-1.jpg'
heroImageUrl: '/media/blogger/16/165a28e60727ef74af435dd3b54d440baffb612764ee3723456d3e4cc1b1e353.png'
originalUrl: 'https://hakamiq1.blogspot.com/2025/04/retroarch-bios.html'
labels: ["MultiEmu","RetroArch"]
---

<style>
body {
  font-family: 'Tajawal', sans-serif;
  color: #e0e0e0;
  background-color: #121212;
  line-height: 1.8;
  font-size: 16px;
  padding: 10px;
}
h2, h3 {
  color: #00c3ff;
  margin-top: 30px;
}
p {
  margin-bottom: 16px;
}
ul {
  padding-left: 20px;
  margin-bottom: 16px;
}
.box {
  background: #1f1f1f;
  border-left: 5px solid #00c3ff;
  padding: 15px;
  margin: 25px 0;
  border-radius: 10px;
}
.notice {
  background: #333;
  border-left: 5px solid #ff9800;
  padding: 15px;
  margin: 25px 0;
  border-radius: 10px;
}
.separator {
  margin: 40px 0;
  border-top: 1px solid #444;
}
a {
  color: #00c3ff;
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
 
}
   
</style>

<div class="box">&nbsp;📦 متابعة من الجزء الأول: إعداد وتركيب ملفات BIOS والأنوية في RetroArch</div><div class="separator" style="clear: both; text-align: center;"><a href="/media/blogger/16/165a28e60727ef74af435dd3b54d440baffb612764ee3723456d3e4cc1b1e353.png" style="margin-left: 1em; margin-right: 1em;"><img alt="صورة توضيحية ضمن مقال RetroArch الإعداد وتركيب ملفات BIOS والأنوية | الجزء الثاني" border="0" data-original-height="1024" data-original-width="1024" height="320" src="/media/blogger/16/165a28e60727ef74af435dd3b54d440baffb612764ee3723456d3e4cc1b1e353.png" width="320" /></a></div><p>بعد الانتهاء من <a href="https://hakamiq1.blogspot.com/2025/04/retroarch-install.html">الجزء الأول</a> من سلسلة RetroArch والذي شرحت فيه خطوات التثبيت وتحميل الأنوية، ننتقل الآن إلى المرحلة التالية التي تحل أغلب المشاكل الشائعة.</p>

<p>في هذا الدليل سنغطي:</p>
<ul>
<li>🔍 كيفية التحقق من ملفات BIOS.</li>
<li>📂 أماكن وضع الملفات داخل النظام.</li>
<li>🧠 ترتيب مجلدات كل نواة.</li>
<li>⚙️ إعداد الأنوية لتعمل بكفاءة ودون أخطاء.</li>
</ul>

<div class="notice">
💡 بعض الخطوات لا يتم توضيحها حتى في الدليل الرسمي. تم تبسيطها هنا للمستخدم العربي.
</div>

<div class="separator"></div>

<h2>🧠 التحقق من ملفات BIOS</h2>

<p>تعطّل الألعاب، الشاشة السوداء، أو فشل تحميل النواة غالبًا ما يكون سببه:</p>
<ul>
<li>📁 الملف غير موجود أو في مسار خاطئ.</li>
<li>❌ الاسم غير مطابق تمامًا.</li>
<li>🧩 الملف نفسه غير صالح أو تم تعديله.</li>
</ul>

<h3>1️⃣ المسار الصحيح (Location)</h3>
<p>اذهب إلى: <b>Settings → Directory → System/BIOS</b></p>
<p>هذا هو المجلد الذي يبحث فيه RetroArch عن ملفات BIOS. تأكد أن ملفاتك هنا أو في المجلدات الفرعية التي تطلبها بعض الأنوية (مثال: <code>system/dc</code> لمحاكي دريم كاست).</p>

<h3>2️⃣ اسم الملف (Name)</h3>
<p>بعض الأنوية تتحسس من الحروف الصغيرة والكبيرة. تأكد أن الاسم مطابق 100٪ للاسم الرسمي.</p>
<p>مثال خاطئ: <code>SCPH5501.BIN</code> بدلاً من <code>scph5501.bin</code></p>
<p>📎 راجع <a href="https://docs.libretro.com/library/bios/">دليل BIOS الرسمي من Libretro</a> لأسماء الملفات المطلوبة.</p>

<h3>3️⃣ سلامة الملف (File Hash)</h3>
<p>حتى إذا وُجد الملف وكان اسمه صحيحًا، فقد لا يعمل إذا لم يكن نسخة أصلية. يمكن التحقق من تطابق "الهاش" باستخدام أدوات مخصصة مثل:</p>
<ul>
<li>✅ winMD5free</li>
<li>✅ HashMyFiles</li>
</ul>

<div class="separator"></div>

<h2>🧩 إعداد الأنوية بشكل صحيح</h2>

<h3>📦 الصيغ المدعومة (Supported Extensions)</h3>
<p>تدعم كل نواة أنواع معينة من الملفات مثل: <code>.chd</code>، <code>.bin</code>، <code>.cue</code></p>
<div class="box">
✅ استخدم صيغة مدعومة لضمان عمل اللعبة بالشكل الصحيح.
</div>

<h3>💾 دعم الحفظ (Save State Support)</h3>
<ul>
<li>🔴 None: لا يدعم الحفظ.</li>
<li>🟡 Basic: يدوي فقط.</li>
<li>🟢 Serialized: يدعم الرجوع بالزمن.</li>
<li>🟢🟢 Deterministic: الأفضل (دقة أعلى + Netplay + Run-Ahead)</li>
</ul>

<h3>🖥️ متطلبات كرت الشاشة (Graphics API)</h3>
<ul>
<li>OpenGL ≥ 3.0: الأضعف، يدعم الأقدم.</li>
<li>OpenGL Core ≥ 3.1: متوسط.</li>
<li>Vulkan ≥ 1.0: الأفضل لأداء عالي.</li>
<li>Direct3D 11/12: مناسب لويندوز ويدعم مؤثرات حديثة.</li>
</ul>

<div class="separator"></div>

<h2>📂 تنظيم مجلد BIOS</h2>

<p>المجلد الرئيسي هو <code>RetroArch/system</code></p>
<p>لكن بعض الأنوية تتطلب مسارات مخصصة، مثل:</p>
<ul>
<li><code>system/pcsx2/bios</code> → PlayStation 2</li>
<li><code>system/dc</code> → Dreamcast</li>
</ul>

<div class="notice">
✍️ إذا لم توضع الملفات في المسار الصحيح، فلن تعمل النواة إطلاقًا.
</div>

<div class="separator"></div>

<h2>🎬 الخاتمة</h2>

<p>تم في هذا الجزء تغطية:</p>
<ul>
<li>✅ التحقق من ملفات BIOS</li>
<li>✅ ترتيب الملفات والأسماء</li>
<li>✅ الصيغ والدعم الرسومي</li>
</ul>

<p>وفي الجزء القادم، سنتناول:</p>
<div class="box">
🔹 صيغ الألعاب مثل CHD وملفات .zip<br />
🔹 الفرق بين حفظ اللعبة وحفظ النواة<br />
🔹 إعدادات متقدمة داخل <b>Quick Menu</b><br />
</div>

<p>📎 لمتابعة الأجزاء القادمة، احفظ الصفحة وابقَ على اطلاع دائم بالتحديثات في المدونة.</p>

<p><a href="https://hakamiq1.blogspot.com/2025/04/retroarch-install.html">🔗 العودة إلى الجزء الأول</a></p>

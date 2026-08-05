---
title: 'كيفية تشغيل الألعاب عبر ملفات PKG وRAP على RPCS3'
description: 'كيفية تشغيل الألعاب عبر ملفات PKG و RAP على محاكي RPCS3 إذا كنت تمتلك ألعاب PS3 بصيغ PKG أو RAP، فإن هذا الدليل سيوضح لك الخطوات التقنية الصحيحة لتثبيتها وتشغيل التراخيص الخاصة بها…'
pubDate: '2025-04-13T02:48:00.005+03:00'
updatedDate: '2026-02-25T00:55:11.877+03:00'
heroImage: '../../assets/blog-placeholder-1.jpg'
heroImageUrl: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiAaLeeojpZ6vq78FhCJqsNVSwGC6GnvP6OgiPLo6-c3YFWQ6EFm8PGQ4ZYhYDTGvFP_EIs4jQKMddzylawM35YktoWv4oBdhdvoIfm5RlbcoH8ZtZ_N6iJu9OAMUlhsZdxia_p3EQnxpQ0vedhXRQtdBpvtomuR2M6l9jW9KeuTu3tgPllmbwwMlj_wDs/s320/sddefault%20(1).jpg'
originalUrl: 'https://hakamiq1.blogspot.com/2025/04/pkg-rap-rpcs3.html'
labels: ["PlayStation","PS3"]
---

<style>
    :root {
        --xe-gold: #ffd600;
        --xe-green: #00e676;
        --xe-blue: #29b6f6;
        --xe-dark: #121212;
        --xe-card: #1e1e1e;
        --text-main: #f4f4f4;
        --text-muted: #94a3b8;
    }

    .pkg-rap-guide-wrapper {
        direction: rtl;
        text-align: right;
        font-family: 'Tajawal', 'Cairo', sans-serif;
        line-height: 1.9;
        color: var(--text-main);
        max-width: 950px;
        margin: 0 auto;
        padding: 20px;
        background-color: var(--xe-dark);
        border-radius: 16px;
        border: 1px solid #333;
    }

    .tech-header { text-align: center; margin-bottom: 35px; border-bottom: 1px dashed #444; padding-bottom: 25px; }
    .section-card { background: var(--xe-card); border-radius: 12px; padding: 25px; margin-bottom: 25px; border: 1px solid #2a2a2a; }
    .section-card h3 { margin-top: 0; border-bottom: 1px solid #333; padding-bottom: 12px; margin-bottom: 20px; }

    .img-frame { border-radius: 12px; overflow: hidden; margin: 0 auto 20px auto; display: block; max-width: 100%; height: auto; border: 1px solid #333; }

    /* نظام القوائم المعزول لتجنب الطلاسم */
    .clean-list { padding-right: 20px !important; list-style: none !important; margin: 15px 0; }
    .clean-list li { position: relative; padding-right: 25px !important; margin-bottom: 12px; background: none !important; }
    .clean-list li::before { 
        content: "" !important; 
        position: absolute; 
        right: 0; 
        top: 10px; 
        width: 10px; 
        height: 10px; 
        background: var(--xe-blue) !important; 
        border-radius: 50%; 
        display: block !important;
    }
    .clean-list li::after { display: none !important; }

    .note-box { background: rgba(255, 214, 0, 0.05); border-right: 5px solid var(--xe-gold); padding: 15px; border-radius: 8px; margin: 15px 0; }
    
    code { background: #000; color: var(--xe-green); padding: 2px 6px; border-radius: 4px; font-family: 'Consolas', monospace; direction: ltr; display: inline-block; }
    a { color: var(--xe-blue); text-decoration: none; font-weight: bold; }
    a:hover { color: var(--xe-gold); }
</style>

<div class="pkg-rap-guide-wrapper">

    <header class="tech-header">
        <div class="separator" style="clear: both; text-align: center;">
            <a href="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiAaLeeojpZ6vq78FhCJqsNVSwGC6GnvP6OgiPLo6-c3YFWQ6EFm8PGQ4ZYhYDTGvFP_EIs4jQKMddzylawM35YktoWv4oBdhdvoIfm5RlbcoH8ZtZ_N6iJu9OAMUlhsZdxia_p3EQnxpQ0vedhXRQtdBpvtomuR2M6l9jW9KeuTu3tgPllmbwwMlj_wDs/s640/sddefault%20(1).jpg">
                <img class="img-frame" src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiAaLeeojpZ6vq78FhCJqsNVSwGC6GnvP6OgiPLo6-c3YFWQ6EFm8PGQ4ZYhYDTGvFP_EIs4jQKMddzylawM35YktoWv4oBdhdvoIfm5RlbcoH8ZtZ_N6iJu9OAMUlhsZdxia_p3EQnxpQ0vedhXRQtdBpvtomuR2M6l9jW9KeuTu3tgPllmbwwMlj_wDs/s320/sddefault%20(1).jpg" width="320" />
            </a>
        </div>
        <h2 style="color: var(--xe-blue); text-align: center;">كيفية تشغيل الألعاب عبر ملفات PKG و RAP على محاكي RPCS3</h2>
        <p>إذا كنت تمتلك ألعاب PS3 بصيغ PKG أو RAP، فإن هذا الدليل سيوضح لك الخطوات التقنية الصحيحة لتثبيتها وتشغيل التراخيص الخاصة بها لضمان عملها بأعلى جودة على المحاكي.</p>
    </header>

    <section class="section-card">
        <h3 style="color: var(--xe-gold);">أولاً: تحميل وتثبيت محاكي RPCS3</h3>
        <ol class="clean-list">
            <li>قم بزيارة الموقع الرسمي: <a href="https://rpcs3.net" target="_blank">rpcs3.net</a> وحمل النسخة المتوافقة مع نظامك.</li>
            <li>استخرج الملفات وقم بتشغيل ملف <code>rpcs3.exe</code> لبدء البرنامج.</li>
            <li>تأكد من تثبيت ملفات BIOS الخاصة بجهاز PS3 لتمكين المحاكي من قراءة ملفات النظام.</li>
        </ol>
        <div class="note-box">
            نصيحة: احرص دائماً على تحميل ملفات BIOS من مصادر موثوقة لضمان استقرار التشغيل.
        </div>
    </section>

    <section class="section-card">
        <h3 style="color: var(--xe-gold);">ثانياً: إضافة ملفات PKG إلى المحاكي</h3>
        <p>لبدء تثبيت اللعبة، اتبع الخطوات التالية داخل واجهة المحاكي:</p>
        <ol class="clean-list">
            <li>اذهب إلى القائمة <b>File</b> ثم اختر <b>Install Firmware</b> لتثبيت ملفات النظام أولاً.</li>
            <li>لتحميل اللعبة، اختر <b>File</b> ثم <b>Install .pkg</b> وحدد ملف اللعبة من جهازك.</li>
            <li>اضغط على <b>Install</b> وانتظر حتى تكتمل عملية التثبيت بنجاح.</li>
        </ol>
        <div class="note-box">
            تنبيه: تأكد من أن ملف PKG هو نسخة نظيفة ومتوافق مع إصدار المحاكي المستخدم.
        </div>
    </section>

    <section class="section-card">
        <h3 style="color: var(--xe-gold);">ثالثاً: إضافة ملف RAP (التراخيص)</h3>
        <p>تحتاج ألعاب PKG إلى ملف ترخيص RAP لتعمل. يتم تفعيل الترخيص يدوياً باتباع المسار التالي:</p>
        <ol class="clean-list">
            <li>قم بنقل ملف <code>.rap</code> إلى المسار التالي في مجلد المحاكي:</li>
            <li><code>RPCS3 &gt; dev_hdd0 &gt; home &gt; 00000001 &gt; exdata</code></li>
            <li>إذا لم تجد مجلد <b>exdata</b>، قم بإنشائه يدوياً بنفس الاسم بالضبط.</li>
            <li>أعد تشغيل المحاكي لتفعيل الترخيص والتعرف على اللعبة.</li>
        </ol>
        <div class="note-box">
            ملاحظة: يجب أن يتطابق اسم ملف RAP تماماً مع كود اللعبة المثبتة ليتم تفعيلها بشكل صحيح.
        </div>
    </section>

    <section class="section-card" style="border-right: 5px solid var(--xe-green);">
        <h3 style="color: var(--xe-green);">رابعاً: تشغيل اللعبة وضبط الأداء</h3>
        <p>بعد اكتمال التثبيت، ستظهر اللعبة في القائمة الرئيسية للمحاكي. اختر اللعبة واضغط على <b>Boot</b>. في حال واجهت مشاكل في الأداء، ينصح بالتوجه لإعدادات الجرافيكس واختيار محرك <b>Vulkan</b> لتحسين سرعة معالجة الرسوميات.</p>
    </section>

    <footer style="background: #252525; padding: 15px; border-radius: 10px; text-align: center;">
        <p style="margin: 0;">يعد محاكي RPCS3 الأداة الأقوى حالياً لتشغيل ألعاب PS3؛ وباتباع هذه الخطوات البسيطة ستتمكن من الاستمتاع بمكتبة ألعابك المفضلة بكل سلاسة.</p>
    </footer>

</div>

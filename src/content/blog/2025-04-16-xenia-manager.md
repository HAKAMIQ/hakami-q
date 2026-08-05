---
title: '🎮 دليلك لإدارة الألعاب والإضافات والتحديثات داخل Xenia Manager'
description: 'لو كنت تستخدم Xenia Manager ، فهذا الدليل بيكون رفيقك، من أول إضافة اللعبة إلى تثبيت التحديثات والـ DLC، لين توصل لمرحلة التنظيف 😎 ✅ أولاً: إضافة الألعاب إلى Xenia Manager افتح Xe…'
pubDate: '2025-04-16T17:00:00.004+03:00'
updatedDate: '2026-02-24T06:23:15.585+03:00'
heroImage: '../../assets/blog-placeholder-1.jpg'
heroImageUrl: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiEzXecBe8H9ddJmGMmJcUJLooUmpeJZBmLPdmmaRGs7D4erHeqZu4nJY9DFfgtsPwfCfQYAZJUqkhPbinyDFmx2FFwPSa3yhG4XMvh9F0yras6nn1Usbnm69VSXNNgMjBD8HI284ffw2p16mJ67bt_Z0ym5cc1eo71ZbMO96De75-XPyDYBYV7u8FS8Tk/s320/22.png'
originalUrl: 'https://hakamiq1.blogspot.com/2025/04/xenia-manager.html'
labels: ["Xbox","Xbox360"]
---

<style>
    :root {
        --xe-blue: #4fc3f7;
        --xe-green: #81c784;
        --xe-red: #f44336;
        --xe-dark: #1e1e1e;
        --xe-card: #2b2c2c;
        --text-main: #f0f0f0;
        --text-muted: #94a3b8;
    }

    .xenia-manager-wrapper {
        direction: rtl;
        text-align: right;
        font-family: 'Tajawal', 'Cairo', sans-serif;
        line-height: 1.8;
        color: var(--text-main);
        max-width: 950px;
        margin: 0 auto;
        padding: 20px;
        background-color: var(--xe-dark);
        border-radius: 12px;
    }

    .tech-header {
        text-align: center;
        margin-bottom: 30px;
        padding-bottom: 20px;
        border-bottom: 1px dashed #444;
    }

    .section-card {
        background: var(--xe-card);
        border-radius: 12px;
        padding: 20px;
        margin-bottom: 20px;
        border: 1px solid #333;
    }

    .section-card h3 { 
        margin-top: 0; 
        border-bottom: 1px solid #444; 
        padding-bottom: 10px; 
        margin-bottom: 15px; 
    }

    .styled-list { padding-right: 25px; margin: 0; }
    .styled-list li { margin-bottom: 10px; }

    .alert-box {
        background: rgba(244, 67, 54, 0.05);
        border-right: 5px solid var(--xe-red);
        padding: 15px 20px;
        border-radius: 10px;
        margin: 20px 0;
    }

    code {
        background: #000;
        color: var(--xe-blue);
        padding: 2px 6px;
        border-radius: 4px;
        font-family: 'Consolas', monospace;
    }

    .img-frame { border-radius: 8px; overflow: hidden; margin-bottom: 15px; display: block; max-width: 100%; height: auto; }
</style>

<div class="xenia-manager-wrapper">

    <header class="tech-header">
        <div class="separator" style="clear: both; text-align: center;">
            <a href="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiEzXecBe8H9ddJmGMmJcUJLooUmpeJZBmLPdmmaRGs7D4erHeqZu4nJY9DFfgtsPwfCfQYAZJUqkhPbinyDFmx2FFwPSa3yhG4XMvh9F0yras6nn1Usbnm69VSXNNgMjBD8HI284ffw2p16mJ67bt_Z0ym5cc1eo71ZbMO96De75-XPyDYBYV7u8FS8Tk/s1536/22.png">
                <img class="img-frame" alt="إدارة الألعاب في Xenia Manager" src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiEzXecBe8H9ddJmGMmJcUJLooUmpeJZBmLPdmmaRGs7D4erHeqZu4nJY9DFfgtsPwfCfQYAZJUqkhPbinyDFmx2FFwPSa3yhG4XMvh9F0yras6nn1Usbnm69VSXNNgMjBD8HI284ffw2p16mJ67bt_Z0ym5cc1eo71ZbMO96De75-XPyDYBYV7u8FS8Tk/s320/22.png" style="max-width: 320px; margin: 0 auto;" />
            </a>
        </div>
        <p>لو كنت تستخدم <strong>Xenia Manager</strong>، فهذا الدليل بيكون رفيقك، من أول إضافة اللعبة إلى تثبيت التحديثات والـ DLC، لين توصل لمرحلة التنظيف 😎</p>
    </header>

    <section class="section-card">
        <h3 style="color: var(--xe-blue);">✅ أولاً: إضافة الألعاب إلى Xenia Manager</h3>
        <ol class="styled-list">
            <li>افتح Xenia Manager واضغط على زر <strong>"+"</strong> لإضافة لعبة جديدة.</li>
            <li>اختر ملف اللعبة من جهازك. ممكن يكون:
                <ul style="margin-top:5px;">
                    <li>ملف GoD</li>
                    <li>أو ISO</li>
                    <li>أو المفضل دائمًا: ملف <code>default.xex</code></li>
                </ul>
            </li>
            <li>المحاكي بيحاول يتعرف على عنوان اللعبة تلقائيًا، ويفتح نافذة تربطها بقاعدة بيانات Xbox Marketplace.</li>
            <li>إذا ما لقى اللعبة، تقدر تختار صورة افتراضية (وتغيرها لاحقًا).</li>
            <li>لو فعلت خيار "Automatic Game Detection" من الإعدادات، كل الخطوات اللي فوق بتصير تلقائيًا.</li>
        </ol>
        
        <div class="alert-box">
            <strong style="color: var(--xe-red);">⚠️ ملاحظة مهمة:</strong>
            <p style="margin: 0px;">تأكد إن مجلد اللعبة ومسار المحاكي كامل باللغة الإنجليزية فقط! أي اسم مجلد يحتوي على حروف عربية أو رموز غريبة (مثل: [ ] / _ عربي) ممكن يمنع تشغيل اللعبة أو يتسبب في خطأ غريب داخل Xenia Manager.</p>
        </div>
    </section>

    <section class="section-card">
        <h3 style="color: var(--xe-green);">📦 ثانياً: تثبيت الإضافات (DLCs) والتحديثات (Title Updates)</h3>
        <ol class="styled-list">
            <li>اضغط يمين على غلاف اللعبة (Box Art) واختر <strong>Game Details</strong> لمعرفة <code>Title ID</code>.</li>
            <li>اضغط يمين مرة ثانية واختر: <strong>Content → Install DLC/Updates</strong>.</li>
            <li>بتفتح لك نافذة جديدة، اضغط على أيقونة "المستكشف" بجانب زر "Confirm".</li>
            <li>اختر ملفات الـ DLC أو التحديث من جهازك، تقدر تحدد أكثر من ملف لو كانوا بنفس المجلد.</li>
            <li>بعد ما تحددهم، اضغط <strong>Open</strong>.</li>
            <li>لو ودك تحذف إضافة، حددها من القائمة واضغط <strong>Remove</strong>.</li>
            <li>وأخيرًا، اضغط <strong>Confirm</strong> وخل المحاكي يشتغل شغله.</li>
        </ol>
        <p style="color: var(--xe-red); font-size: 14px; margin-top: 10px;"><strong>🚫 ملاحظة مهمة:</strong> لا تثبت أكثر من تحديث للعبة وحدة، ممكن يصير تعارض أو خرابيط.</p>
    </section>

    <section class="section-card">
        <h3 style="color: #e57373;">🗑️ ثالثاً: حذف الإضافات والتحديثات</h3>
        <ol class="styled-list">
            <li>اضغط يمين على اللعبة واختر <strong>Content → View Installed Content</strong>.</li>
            <li>بتفتح نافذة تعرض كل المحتوى المثبت: إضافات، تحديثات، ملفات حفظ.</li>
            <li>حدد اللي تبي تحذفه واضغط <strong>Remove</strong>.</li>
        </ol>
    </section>

    <footer style="margin-top: 30px; border-top: 1px dashed #444; padding-top: 20px;">
        <p style="text-align: center; font-weight: bold;">🚀 جاهز تدخل عالم الإكسبوكس بقوة؟ هذا الدليل بيخليك ترتب مكتبتك مثل المحترفين.</p>
        <p style="font-size: 14px; color: var(--text-muted); text-align: center;">
            📚 المصدر: <a href="https://github.com/xenia-canary/xenia-canary/wiki/FAQ" target="_blank" style="color: var(--xe-blue); text-decoration: none;">Xenia FAQ</a>
        </p>
    </footer>

</div>

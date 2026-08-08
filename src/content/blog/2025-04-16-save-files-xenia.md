---
title: '💾 طريقة استيراد وتصدير ملفات الحفظ (Save Files) في محاكي Xenia'
description: 'لا يوجد شعور أقهر من أن تنهي نصف اللعبة وتضيع تخزينتك... ولكن لا تقلق، في Xenia تستطيع حفظ واسترجاع ملفات الحفظ بكل سهولة! سنشرح هنا كيف تستورد تخزينات جاهزة أو تصدّر تخزينتك الخاص…'
pubDate: '2025-04-16T17:13:00.003+03:00'
updatedDate: '2026-02-24T06:20:21.576+03:00'
heroImage: '../../assets/blog-placeholder-1.jpg'
heroImageUrl: '/media/blogger/90/90880ff498996e8702a60b7fdc7475decadbf57d03ccef682007c2d6ff4aa3e4.png'
originalUrl: 'https://hakamiq1.blogspot.com/2025/04/save-files-xenia.html'
labels: ["Xbox360","Xbox-Original"]
---

<style>
    :root {
        --xe-blue: #4fc3f7;
        --xe-green: #81c784;
        --xe-gold: #ffb300;
        --xe-dark: #121212;
        --xe-card: #1e1e1e;
        --text-main: #f0f0f0;
        --text-muted: #94a3b8;
    }

    .save-manager-wrapper {
        direction: rtl;
        text-align: right;
        font-family: 'Tajawal', 'Cairo', sans-serif;
        line-height: 1.8;
        color: var(--text-main);
        max-width: 950px;
        margin: 0 auto;
        padding: 20px;
        background-color: var(--xe-dark);
        border-radius: 16px;
        border: 1px solid #333;
    }

    /* الهيدر */
    .tech-header {
        text-align: center;
        margin-bottom: 35px;
        padding-bottom: 20px;
        border-bottom: 1px dashed #444;
    }

    /* بطاقات الشرح */
    .section-card {
        background: var(--xe-card);
        border-radius: 12px;
        padding: 25px;
        margin-bottom: 25px;
        border: 1px solid #2a2a2a;
    }

    .section-card h3 { 
        margin-top: 0; 
        border-bottom: 1px solid #333; 
        padding-bottom: 10px; 
        margin-bottom: 15px; 
    }

    /* هيكلية الملفات */
    .file-tree {
        background: #000;
        color: #fff;
        padding: 15px;
        border-radius: 8px;
        direction: ltr;
        text-align: left;
        font-family: 'Consolas', monospace;
        font-size: 14px;
        border: 1px solid #444;
        overflow-x: auto;
    }

    /* القوائم المرقمة */
    .styled-steps { padding-right: 25px; }
    .styled-steps li { margin-bottom: 10px; }

    /* صندوق التنبيه */
    .note-box {
        background: rgba(255, 179, 0, 0.05);
        border-right: 5px solid var(--xe-gold);
        padding: 15px 20px;
        border-radius: 10px;
        margin: 20px 0;
    }

    /* الرأي الشخصي */
    .opinion-box {
        background: linear-gradient(to left, #1a1a1a, #0a0a0a);
        border-right: 5px solid var(--xe-green);
        padding: 20px;
        border-radius: 12px;
        margin-top: 30px;
    }

    .img-frame { border-radius: 12px; overflow: hidden; margin: 0 auto 15px auto; display: block; max-width: 100%; height: auto; border: 1px solid #333; }
</style>

<div class="save-manager-wrapper">

    <header class="tech-header">
        <div class="separator" style="clear: both; text-align: center;">
            <a href="/media/blogger/90/90880ff498996e8702a60b7fdc7475decadbf57d03ccef682007c2d6ff4aa3e4.png">
                <img class="img-frame" alt="Save Files Management Xenia" src="/media/blogger/90/90880ff498996e8702a60b7fdc7475decadbf57d03ccef682007c2d6ff4aa3e4.png" style="max-width: 450px;" />
            </a>
        </div>
        <p>لا يوجد شعور أقهر من أن تنهي نصف اللعبة وتضيع تخزينتك... ولكن لا تقلق، في Xenia تستطيع حفظ واسترجاع ملفات الحفظ بكل سهولة! سنشرح هنا كيف تستورد تخزينات جاهزة أو تصدّر تخزينتك الخاصة للاحتياط 🔄.</p>
    </header>

    <section class="section-card">
        <h3 style="color: var(--xe-blue);">📥 أولاً: استيراد ملفات الحفظ (Import Save Files)</h3>
        <p><b>متطلبات:</b> يجب أن يكون ملف الحفظ مضغوطاً بصيغة <code>.zip</code> ومرتباً بالهيكلة التالية:</p>
        <pre class="file-tree">[TitleID]
└── 00000001
     └── Save Content
          └── ملفات الحفظ</pre>
        
        <ol class="styled-steps">
            <li>افتح <b>Xenia Manager</b> واضغط بيمين الفأرة على اللعبة، ثم اختر <b>Content → View Installed Content</b>.</li>
            <li>من القائمة العلوية المنبثقة، اختر <b>"Saved Game"</b>.</li>
            <li>حدد ملف التعريف المناسب (XUID).</li>
            <li>اضغط على زر <b>Import</b> واختر ملف الـ <code>.zip</code> الخاص بك.</li>
            <li>بمجرد التحديد، سيقوم المحاكي بضبط كل شيء تلقائياً.</li>
        </ol>
    </section>

    <section class="section-card">
        <h3 style="color: var(--xe-green);">📤 ثانياً: تصدير ملفات الحفظ (Export Save Files)</h3>
        <ol class="styled-steps">
            <li>بنفس الخطوات السابقة، اضغط بيمين الفأرة واختر <b>Content → View Installed Content</b>.</li>
            <li>اختر <b>"Saved Game"</b> من القائمة العلوية.</li>
            <li>حدد البروفايل (XUID) المطلوب ثم اضغط على <b>Export</b>.</li>
        </ol>
        <div class="note-box" style="border-right-color: var(--xe-blue);">
            سيتم تصدير التخزينة إلى سطح المكتب فوراً باسم: <br>
            <code>[التاريخ والوقت] - [اسم اللعبة] Save File.zip</code>
        </div>
    </section>

    <div class="note-box">
        <strong style="color: var(--xe-gold);">💡 ملاحظة هامة:</strong>
        <p style="margin: 0;">Xenia يستخدم نفس الهيكلية لكل عمليات التصدير والاستيراد، فإذا حملت تخزينة من الإنترنت وأردت ضبطها يدوياً، تأكد أنها تتبع نفس المسار والشكل المذكور أعلاه!</p>
    </div>

    <footer class="opinion-box">
        <p style="margin: 0;">🧠 <b>نصيحة حكميك:</b> دائماً قم بعمل نسخة احتياطية لتخزيناتك قبل تجربة أي باتش أو مود جديد... "الاحتياط واجب" خصوصاً مع الألعاب التي قد تحتوي شفرات غير مستقرة 😅.</p>
    </footer>

    <p style="font-size: 14px; color: var(--text-muted); margin-top: 20px; text-align: center;">
        📚 المصدر التقني: <a href="https://github.com/xenia-canary/xenia-canary/wiki/FAQ" target="_blank" style="color: var(--xe-blue); text-decoration: none;">Xenia FAQ Wiki</a>
    </p>

</div>

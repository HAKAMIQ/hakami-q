---
title: 'دليل تثبيت Graphic Packs في محاكي Cemu'
description: 'Cemu Graphic Packs: الدليل الهندسي الكامل لعام 2026 ℹ️ ما هي الـ Graphic Packs؟ هي حزم برمجية مطورة من قبل المجتمع تتيح لك تخطي حدود جهاز Wii U الأصلي عبر رفع الدقة إلى HD/2K/4K ،…'
pubDate: '2025-08-26T11:24:00.003+03:00'
updatedDate: '2026-02-24T05:00:48.178+03:00'
heroImage: '../../assets/blog-placeholder-1.jpg'
heroImageUrl: '/media/blogger/e1/e1f7710c28ce5e23132f13ece0f0fc616159326852b17aae7a224f9dd0961610.png'
originalUrl: 'https://hakamiq1.blogspot.com/2025/08/graphic-packs-cemu.html'
labels: ["Nintendo","Wii-U"]
---

<style>
    :root {
        --cemu-red: #b71c1c;
        --cemu-gold: #f9a825;
        --cemu-blue: #1e88e5;
        --h-bg: #f8fafc;
        --card-bg: #ffffff;
        --card-shadow: 0 10px 30px rgba(183, 28, 28, 0.08);
    }

    .cemu-packs-wrapper {
        direction: rtl;
        text-align: right;
        font-family: 'Tajawal', 'Segoe UI', sans-serif;
        line-height: 1.8;
        color: #334155;
        max-width: 1000px;
        margin: 0 auto;
        padding: 20px;
        background-color: var(--h-bg);
    }

    /* الهيدر الرئيسي */
    .hero-header {
        background: linear-gradient(135deg, #b71c1c, #4a0e0e);
        color: white;
        padding: 45px 25px;
        border-radius: 24px;
        text-align: center;
        margin-bottom: 40px;
        box-shadow: 0 20px 40px rgba(183, 28, 28, 0.2);
    }

    .hero-header h1 { font-size: 28px; margin: 15px 0; color: #fff; }

    /* بطاقة الأقسام (Smart Card) */
    .tech-card {
        background: white;
        border-radius: 18px;
        padding: 30px;
        margin-bottom: 35px;
        box-shadow: var(--card-shadow);
        border: 1px solid #f1f5f9;
        border-right: 6px solid var(--cemu-red);
        position: relative;
    }

    .tech-card h2, .tech-card h3 {
        color: #1e293b;
        margin-top: 0;
        border-bottom: 2px solid #f1f5f9;
        padding-bottom: 12px;
        margin-bottom: 20px;
        font-size: 22px;
    }

    /* صناديق الحالة */
    .h-tip { background: #fef7e0; border-right: 5px solid var(--cemu-gold); padding: 15px 20px; border-radius: 12px; margin: 15px 0; font-size: 15px; }
    .h-info { background: #fcebea; border-right: 5px solid var(--cemu-red); padding: 15px 20px; border-radius: 12px; margin: 15px 0; font-size: 15px; }
    .h-blue { background: #eef2ff; border-right: 5px solid var(--cemu-blue); padding: 15px 20px; border-radius: 12px; margin: 15px 0; }

    /* كود المسارات */
    code { background: #1e293b; color: #81d4fa; padding: 2px 8px; border-radius: 4px; font-family: monospace; font-weight: bold; }

    /* الجداول */
    .version-table { width: 100%; border-collapse: collapse; margin: 20px 0; font-size: 14px; background: white; border-radius: 12px; overflow: hidden; }
    .version-table th { background: var(--cemu-red); color: white; padding: 12px; text-align: center; }
    .version-table td { padding: 12px; border: 1px solid #eee; text-align: center; }

    .img-frame { border-radius: 15px; overflow: hidden; margin: 25px auto; box-shadow: var(--card-shadow); display: block; max-width: 100%; }
</style>

<div class="cemu-packs-wrapper">

    <header class="hero-header">
        <div class="separator" style="clear: both; text-align: center;">
            <a href="/media/blogger/e1/e1f7710c28ce5e23132f13ece0f0fc616159326852b17aae7a224f9dd0961610.png">
                <img alt="Cemu Graphic Packs Guide" src="/media/blogger/e1/e1f7710c28ce5e23132f13ece0f0fc616159326852b17aae7a224f9dd0961610.png" width="213" style="border-radius: 10px;" />
            </a>
        </div>
        <h2>Cemu Graphic Packs: الدليل الهندسي الكامل لعام 2026</h2>
    </header>

    <section class="h-info">
        ℹ️ <strong>ما هي الـ Graphic Packs؟</strong><br>
        هي حزم برمجية مطورة من قبل المجتمع تتيح لك تخطي حدود جهاز Wii U الأصلي عبر رفع الدقة إلى <b>HD/2K/4K</b>، تحسين الظلال والإضاءة، وضبط الأداء حسب قوة عتاد جهازك.
    </section>

    <section class="tech-card">
        <h3>📥 التثبيت التلقائي (الموصى به)</h3>
        <p>بدءاً من الإصدار <b>1.15.1</b>، أصبح بإمكانك جلب التحديثات بضغطة زر:</p>
        <ol style="padding-right: 20px;">
            <li>افتح Cemu واذهب إلى <code>Options -> Graphic packs</code>.</li>
            <li>اضغط على زر <b>Download latest community graphic packs</b> في الأسفل.</li>
            <li>بعد انتهاء التحميل، فعّل الإعدادات التي تناسب قوة جهازك.</li>
        </ol>
        <img class="img-frame" alt="واجهة تحميل الحزم في Cemu" src="/media/blogger/4d/4d6988edb9f9c97b77afb14e5fdd845ff7a31fbd791390a4d16638e27f3a179c.png" width="400" />
    </section>

    <section class="tech-card" style="border-right-color: var(--cemu-blue);">
        <h3>🛠️ التثبيت اليدوي (للمحترفين)</h3>
        <p>إذا كنت تستخدم حزم مخصصة أو تريد العودة لإصدار معين:</p>
        <ol style="padding-right: 20px;">
            <li>حمل ملف ZIP من <a href="https://github.com/slashiee/cemu_graphic_packs" target="_blank">المستودع الرسمي على GitHub</a>.</li>
            <li>احذف كافة الحزم القديمة من مجلد <code>graphicPacks</code> داخل مسار المحاكي.</li>
            <li>فك ضغط الملف الجديد وانقل المجلدات إلى نفس المسار.</li>
        </ol>
        <div style="display: flex; gap: 10px; justify-content: center;">
            <img class="img-frame" alt="مجلد حزم القوام" src="/media/blogger/71/7142eb23d0a47c8881c64c6340900cb18f4c7b81e94d99af9108ed5b48ae607f.png" width="200" />
            <img class="img-frame" alt="هيكل المجلدات" src="/media/blogger/b1/b1697676bd310c95532aee9469e0e33a2f38c05dafc463d7922f3ab60c85a374.png" width="150" />
        </div>
    </section>

    <section class="tech-card" style="border-right-color: var(--cemu-gold);">
        <h3>❓ الأسئلة الشائعة وحلول الأداء</h3>
        
        <div class="h-blue">
            <strong>كيف أضيف دقة شاشة مخصصة (Ultrawide)؟</strong>
            <p style="font-size: 13px; margin-top: 5px;">ادخل مجلد اللعبة ثم <code>Resolution</code> وافتح ملف <code>rules.txt</code>. عدّل القيم يدوياً كما يلي:</p>
            <pre style="background: #000; color: #00ffcc; padding: 10px; border-radius: 8px; direction: ltr; text-align: left; font-size: 12px;">[Preset]
name = 2560x1080 (Custom)
$width = 2560
$height = 1080</pre>
        </div>

        <div class="h-tip">
            💡 <strong>تنبيه إصدار 1.14.0:</strong> بسبب إعادة تصميم نظام القوام في هذا الإصدار، توقفت بعض الحزم القديمة. تأكد دائماً من تحميل أحدث نسخة لتجنب "الوميض" أو انهيار اللعبة.
        </div>
    </section>

    <section class="tech-card">
        <h3>📅 سجل التحديثات الأخيرة (Releases)</h3>
        <div style="overflow-x: auto;">
            <table class="version-table">
                <thead>
                    <tr><th>التاريخ</th><th>التحسين المضاف</th><th>الحالة</th></tr>
                </thead>
                <tbody>
                    <tr><td>قبل 3 أسابيع</td><td>Lego City Undercover: Anisotropic Filtering</td><td>✅ جاهز</td></tr>
                    <tr style="background: #f8fafc;"><td>قبل شهرين</td><td>BotW: 90FPS Advanced Preset Fix</td><td>✅ مستقر</td></tr>
                    <tr><td>2026 Update</td><td>Global Vulkan Pipeline Optimization</td><td>🚀 جديد</td></tr>
                </tbody>
            </table>
        </div>
    </section>

    <footer style="background: #1e293b; color: white; padding: 30px; border-radius: 20px; text-align: center;">
        <h2 style="color: #60a5fa; letter-spacing: 4px; margin: 0;">HAKAMIQ</h2>
        <p style="color: #94a3b8; font-family: monospace; font-size: 11px; margin-top: 10px;">// GRAPHIC_ENGINE_READY // ALL_SYSTEMS_GO</p>
        <p style="margin-top: 20px; font-size: 14px;">باستخدام الـ Graphic Packs، أنت لا تلعب فقط، بل تعيد صياغة الجمال البصري للأساطير الكلاسيكية.</p>
    </footer>

</div>

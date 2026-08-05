---
title: 'دليل تثبيت Graphic Packs في محاكي Cemu'
description: 'Cemu Graphic Packs: الدليل الهندسي الكامل لعام 2026 ℹ️ ما هي الـ Graphic Packs؟ هي حزم برمجية مطورة من قبل المجتمع تتيح لك تخطي حدود جهاز Wii U الأصلي عبر رفع الدقة إلى HD/2K/4K ،…'
pubDate: '2025-08-26T11:24:00.003+03:00'
updatedDate: '2026-02-24T05:00:48.178+03:00'
heroImage: '../../assets/blog-placeholder-1.jpg'
heroImageUrl: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh8N1X1k9OFIpTI-qrmmeEd9xcpVHfXJCd8-Gqe3CeQe3_DhTXPNUneAAmgQmWL64GEIO7qO9zEj36z687yI_zSMHt9CggobbGEZlFSfKEQ4I08xtXhtFDbaxccfW9S0txciKvmKnNvhLC2VDDwUJ3y2E76TklyUVxB73o4mrjSY9u35-1j2A2PZJzqk2E/s320/98a1aa73-7dd4-45fb-bd96-772f23c097f9.png'
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
            <a href="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh8N1X1k9OFIpTI-qrmmeEd9xcpVHfXJCd8-Gqe3CeQe3_DhTXPNUneAAmgQmWL64GEIO7qO9zEj36z687yI_zSMHt9CggobbGEZlFSfKEQ4I08xtXhtFDbaxccfW9S0txciKvmKnNvhLC2VDDwUJ3y2E76TklyUVxB73o4mrjSY9u35-1j2A2PZJzqk2E/s1536/98a1aa73-7dd4-45fb-bd96-772f23c097f9.png">
                <img alt="Cemu Graphic Packs Guide" src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh8N1X1k9OFIpTI-qrmmeEd9xcpVHfXJCd8-Gqe3CeQe3_DhTXPNUneAAmgQmWL64GEIO7qO9zEj36z687yI_zSMHt9CggobbGEZlFSfKEQ4I08xtXhtFDbaxccfW9S0txciKvmKnNvhLC2VDDwUJ3y2E76TklyUVxB73o4mrjSY9u35-1j2A2PZJzqk2E/s320/98a1aa73-7dd4-45fb-bd96-772f23c097f9.png" width="213" style="border-radius: 10px;" />
            </a>
        </div>
        <h1>Cemu Graphic Packs: الدليل الهندسي الكامل لعام 2026</h1>
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
        <img class="img-frame" alt="واجهة تحميل الحزم في Cemu" src="https://blogger.googleusercontent.com/img/a/AVvXsEgu0g1PkVkJJ27SBnMaRNoDnxFRFVpzE5QMLNedE4p4q0rKQKE-Vvt480yc7Ft4YzCnZ_chg9ESZhXB1JuJEqzFkMAhX19Wb1oNWQ0C4761NKDNsfkH9YEm3wNFp8Q1YEqGBE2A0AkAdjNwnySwK8srn6tbVkSjFB4IBh40hK7nZolz-3wDGASuLUdOVHM" width="400" />
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
            <img class="img-frame" alt="مجلد حزم القوام" src="https://blogger.googleusercontent.com/img/a/AVvXsEijO0CSPlNH1eyAJtNbfq1I0IiYd0Muiqopi2MD2K1GtvM5yID8-gE1SB_LhN-IFhFMLvZWlHjimnEw9La9Pvkx1Z_ml25HAfiaB0xBYHfPq_bvm-KNGtX2Kq7tZ44wcyUVi8mLNUXTy22T8hmilZbd_B9ZVIjI9ICn4ASwTovj3lSQh2B7JwQYlliKgrY" width="200" />
            <img class="img-frame" alt="هيكل المجلدات" src="https://blogger.googleusercontent.com/img/a/AVvXsEh2bBfWP_KUoqx9Ua0NHvzI9HcVG4oAhU7vI6atLSJNXd5H-Mcqb2JyFXkaAG9DgqYu-RJpspyHqRXCqxf1zAnbF1oqXjr0vO9QmQlSQf3xCEug3jNtNWsl5c0en-RrhxSSvYWpZENk_GWiPvlGAUftUXjANuc3m5nsaVChEx04uZmudJMTUzJx9Dzq0mI" width="150" />
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

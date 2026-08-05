---
title: 'الإعدادات الافتراضية في محاكي RPCS3 | إعدادات (I/O configuration)'
description: 'إعدادات I/O في محاكي RPCS3 تتحكم في كيفية تفاعل الأجهزة الخارجية مثل لوحة المفاتيح، الفأرة، الكاميرا، والأدوات الموسيقية مع الألعاب. ضبط هذه الخيارات ضروري لتشغيل الطرفيات الخاصة ب…'
pubDate: '2025-04-14T01:18:00.003+03:00'
updatedDate: '2026-02-25T00:12:22.181+03:00'
heroImage: '../../assets/blog-placeholder-1.jpg'
heroImageUrl: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi1KDcWDPUzeEZBSXvvbMGahuyjF_0_MHmwPFTdxFuWri5a0GD9ZotZzoRzVoR26j8hGSP_EmjaNRUGJP4ch6cJT2w57124ySZPvwtfijJNTAEdrPQldGu0VlOo8xsyCheyg9unzuHBVK7JUGCYiNb0xPKXHCE1rNJ3zgw7_EG9G0x4x3zKfuS_3MwkCo0/s320/rpcs3___icon_by_blagoicons_ddg7o8z-400t.png'
originalUrl: 'https://hakamiq1.blogspot.com/2025/04/rpcs3-io-configuration.html'
labels: ["PlayStation","PS3"]
---

<style>
    :root {
        --xe-gold: #ffd600;
        --xe-green: #00e676;
        --xe-blue: #29b6f6;
        --xe-red: #ff5252;
        --xe-dark: #121212;
        --xe-card: #1e1e1e;
        --text-main: #f4f4f4;
        --text-muted: #94a3b8;
    }

    .hakamiq-guide-wrapper {
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

    .table-container { overflow-x: auto; margin: 20px 0; border-radius: 8px; border: 1px solid #333; }
    table { width: 100%; border-collapse: collapse; background: #111; text-align: center; font-size: 14px; }
    th { background: #252525; color: var(--xe-blue); padding: 12px; border: 1px solid #333; }
    td { padding: 12px; border: 1px solid #333; color: #ddd; text-align: right; }

    .row-safe { border-right: 5px solid var(--xe-green); }
    .row-warn { border-right: 5px solid var(--xe-gold); }
    .row-risky { border-right: 5px solid var(--xe-red); }
    .row-try { border-right: 5px solid var(--xe-blue); }

    .legend-container { display: flex; flex-wrap: wrap; gap: 10px; justify-content: center; margin-top: 20px; }
    .legend-item { padding: 5px 12px; border-radius: 6px; font-size: 13px; font-weight: bold; }

    code { background: #000; color: var(--xe-green); padding: 2px 6px; border-radius: 4px; font-family: 'Consolas', monospace; }
    .img-frame { border-radius: 12px; overflow: hidden; margin: 0 auto 20px auto; display: block; max-width: 100%; height: auto; border: 1px solid #333; }
</style>

<div class="hakamiq-guide-wrapper">

    <header class="tech-header">
        <div class="separator" style="clear: both; text-align: center;">
            <a href="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi1KDcWDPUzeEZBSXvvbMGahuyjF_0_MHmwPFTdxFuWri5a0GD9ZotZzoRzVoR26j8hGSP_EmjaNRUGJP4ch6cJT2w57124ySZPvwtfijJNTAEdrPQldGu0VlOo8xsyCheyg9unzuHBVK7JUGCYiNb0xPKXHCE1rNJ3zgw7_EG9G0x4x3zKfuS_3MwkCo0/s400/rpcs3___icon_by_blagoicons_ddg7o8z-400t.png">
                <img class="img-frame" src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi1KDcWDPUzeEZBSXvvbMGahuyjF_0_MHmwPFTdxFuWri5a0GD9ZotZzoRzVoR26j8hGSP_EmjaNRUGJP4ch6cJT2w57124ySZPvwtfijJNTAEdrPQldGu0VlOo8xsyCheyg9unzuHBVK7JUGCYiNb0xPKXHCE1rNJ3zgw7_EG9G0x4x3zKfuS_3MwkCo0/s320/rpcs3___icon_by_blagoicons_ddg7o8z-400t.png" width="320" />
            </a>
        </div>
        <p>إعدادات I/O في محاكي RPCS3 تتحكم في كيفية تفاعل الأجهزة الخارجية مثل لوحة المفاتيح، الفأرة، الكاميرا، والأدوات الموسيقية مع الألعاب. ضبط هذه الخيارات ضروري لتشغيل الطرفيات الخاصة ببعض الألعاب بشكل صحيح.</p>
    </header>

    <section class="section-card">
        <h3 style="color: var(--xe-blue);">🕹️ جدول إعدادات I/O (الإدخال والإخراج)</h3>
        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th>الإعداد</th>
                        <th>الوضع الافتراضي</th>
                        <th>الشرح</th>
                        <th>نصيحة حكميك</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="row-warn"><td>Keyboard Handler</td><td>Null</td><td>يدعم إدخال لوحة المفاتيح في بعض الألعاب.</td><td>غيّره إلى Basic لو اللعبة تدعمه.</td></tr>
                    <tr class="row-safe"><td>Mouse Handler</td><td>Basic</td><td>يدعم إدخال الفأرة (الماوس) بشكل مباشر.</td><td>يشتغل بامتياز مع الألعاب التي تدعم الفأرة.</td></tr>
                    <tr class="row-risky"><td>Move Handler</td><td>Null</td><td>دعم PlayStation Move (غير مكتمل).</td><td>خلّه Null، وضع Fake تجريبي وغير مستقر.</td></tr>
                    <tr class="row-try"><td>Path Handler Mode</td><td>Single-threaded</td><td>يحدد عدد الخيوط البرمجية المستخدمة للإدخال.</td><td>جرّب Multi-threaded لو معالجك قوي.</td></tr>
                    <tr class="row-safe"><td>Enable Background Input</td><td>On</td><td>يسمح بالتحكم حتى لو لم تكن نافذة اللعبة مفعلة.</td><td>خله مفعلاً لتجنب انقطاع التحكم المفاجئ.</td></tr>
                    <tr class="row-warn"><td>Show PS Move Cursor</td><td>Off</td><td>يعرض مؤشر حركة الـ Move على الشاشة.</td><td>فعّله فقط لو كنت تستخدم طرفية Move.</td></tr>
                    <tr class="row-warn"><td>Camera Input</td><td>Unknown</td><td>تحديد نوع مدخلات الكاميرا للألعاب.</td><td>يختلف الضبط حسب متطلبات كل لعبة.</td></tr>
                    <tr class="row-warn"><td>Camera Handler</td><td>Null</td><td>يستخدم محرك QT الخاص بالنظام لتشغيل الكاميرا.</td><td>بدله إلى QT إذا كنت تملك كاميرا حقيقية.</td></tr>
                    <tr class="row-try"><td>Camera</td><td>Default</td><td>اختيار كاميرا الويب المراد استخدامها.</td><td>اختر الكاميرا المناسبة يدوياً عند الحاجة.</td></tr>
                    <tr class="row-try"><td>Camera Flip</td><td>No</td><td>يقلب صورة الكاميرا رأسياً أو أفقياً.</td><td>مفيد لو كانت صورة الكاميرا تظهر معكوسة.</td></tr>
                    <tr class="row-try"><td>Buzz! Controller</td><td>Null</td><td>يحاكي أجهزة التحكم الخاصة بلعبة Buzz!.</td><td>اختر 1 أو 2 لو كنت تلعبها بدون الطرفية.</td></tr>
                    <tr class="row-try"><td>DJ Hero Turntable</td><td>Null</td><td>يحاكي طاولة الدي جي الخاصة بلعبة DJ Hero.</td><td>فعّله فقط لو كنت تلعب بدون القطعة الأصلية.</td></tr>
                    <tr class="row-try"><td>Guitar Hero Guitar</td><td>Null</td><td>يحاكي الغيتار الخاص بلعبة Guitar Hero Live.</td><td>مفيد جداً عند اللعب باستخدام يد التحكم العادية.</td></tr>
                </tbody>
            </table>
        </div>
    </section>

    <footer style="background: #252525; padding: 20px; border-radius: 12px; text-align: center;">
        <h3 style="color: var(--xe-gold); margin-top: 0;">📌 دليل الألوان</h3>
        <div class="legend-container">
            <div class="legend-item" style="background: rgba(0, 230, 118, 0.2); color: var(--xe-green);">✅ آمن / مستحسن</div>
            <div class="legend-item" style="background: rgba(255, 214, 0, 0.2); color: var(--xe-gold);">⚠️ متقدم / اختياري</div>
            <div class="legend-item" style="background: rgba(255, 82, 82, 0.2); color: var(--xe-red);">❌ غير مفيد غالباً</div>
            <div class="legend-item" style="background: rgba(41, 182, 246, 0.2); color: var(--xe-blue);">🎮 للتجربة حسب اللعبة</div>
        </div>
    </footer>

</div>

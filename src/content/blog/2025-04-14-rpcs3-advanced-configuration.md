---
title: 'الإعدادات الافتراضية في محاكي RPCS3 | إعدادات (Advanced Configuration)'
description: '⚙️ جدول إعدادات Advanced Configuration في محاكي RPCS3 دليل حكميك الشامل لكل خيارات التعديل المتقدمة في محاكي RPCS3 🛠️ تبويب Advanced هو المكان المخصص للمستخدمين المتقدمين للتحكم ف…'
pubDate: '2025-04-14T01:42:00.001+03:00'
updatedDate: '2026-02-25T00:03:19.808+03:00'
heroImage: '../../assets/blog-placeholder-1.jpg'
heroImageUrl: '/media/blogger/f1/f1d1b29db9475ed2c5865cfac1e00c73f8a0d95790938bed56c53b0084a1e0ff.png'
originalUrl: 'https://hakamiq1.blogspot.com/2025/04/rpcs3-advanced-configuration.html'
labels: ["PlayStation","PS3"]
---

<style>
    @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;700;900&display=swap');

    :root {
        --xe-gold: #ffd600;
        --xe-green: #00e676;
        --xe-blue: #29b6f6;
        --xe-red: #ff5252;
        --xe-dark: #0a0a0a;
        --xe-card: #141414;
        --text-main: #f4f4f4;
        --text-muted: #94a3b8;
        --border-color: #222;
    }

    .hakamiq-guide-wrapper {
        direction: rtl;
        text-align: right;
        font-family: 'Tajawal', sans-serif;
        background-color: var(--xe-dark);
        color: var(--text-main);
        max-width: 1100px;
        margin: 20px auto;
        padding: 30px;
        border-radius: 20px;
        border: 1px solid var(--border-color);
        line-height: 1.8;
    }

    .hakamiq-main-title {
        font-size: clamp(1.5rem, 4vw, 2.2rem);
        color: var(--xe-blue);
        font-weight: 900;
        text-align: center;
        margin-bottom: 25px;
        border-bottom: 2px solid var(--border-color);
        padding-bottom: 15px;
    }

    /* 🌟 تقنية التأطير الذكي والوصف المقترن لـ SEO */
    .hakamiq-smart-figure {
        margin: 0 auto 35px auto;
        text-align: center;
        max-width: 250px;
    }

    .hakamiq-smart-figure img {
        width: 100%;
        border-radius: 15px;
        aspect-ratio: 1 / 1;
        object-fit: contain;
        filter: drop-shadow(0 0 20px rgba(41, 182, 246, 0.3));
        display: block;
    }

    .hakamiq-smart-figure figcaption {
        margin-top: 12px;
        font-size: 0.9rem;
        color: var(--text-muted);
        font-weight: bold;
    }

    .hakamiq-intro-box {
        background: linear-gradient(135deg, rgba(41, 182, 246, 0.1), transparent);
        border-right: 6px solid var(--xe-blue);
        padding: 20px 25px;
        border-radius: 12px;
        margin-bottom: 40px;
    }

    /* 📊 تنسيق الجدول الاحترافي والمتجاوب */
    .hakamiq-table-container {
        width: 100%;
        overflow-x: auto;
        margin: 25px 0;
        border-radius: 12px;
        border: 1px solid var(--border-color);
    }

    .hakamiq-table {
        width: 100%;
        border-collapse: collapse;
        background: var(--xe-card);
        min-width: 900px;
    }

    .hakamiq-table th {
        background-color: #1a1a1a;
        color: var(--xe-blue);
        padding: 15px;
        text-align: center;
        border-bottom: 2px solid var(--border-color);
    }

    .hakamiq-table td {
        padding: 15px;
        border-bottom: 1px solid #222;
        font-size: 0.92rem;
    }

    /* حالات الصفوف الملونة */
    .row-safe { border-right: 5px solid var(--xe-green); }
    .row-warn { border-right: 5px solid var(--xe-gold); }
    .row-risky { border-right: 5px solid var(--xe-red); }
    .row-try { border-right: 5px solid var(--xe-blue); }

    .hakamiq-legend {
        display: flex;
        flex-wrap: wrap;
        gap: 15px;
        margin-top: 20px;
        padding: 15px;
        background: #111;
        border-radius: 10px;
    }

    .legend-item {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 0.9rem;
        font-weight: bold;
    }

    .hakamiq-highlight { color: #fff; font-weight: bold; }

    @media (max-width: 600px) {
        .hakamiq-guide-wrapper { padding: 15px; }
    }
</style>

<article class="hakamiq-guide-wrapper">

    <header>
        <h1 class="hakamiq-main-title">⚙️ جدول إعدادات Advanced Configuration في محاكي RPCS3</h1>
        
        <figure class="hakamiq-smart-figure">
            <img src="/media/blogger/f1/f1d1b29db9475ed2c5865cfac1e00c73f8a0d95790938bed56c53b0084a1e0ff.png" alt="RPCS3 Advanced Configuration Icon" loading="lazy" decoding="async">
            <figcaption>دليل حكميك الشامل لكل خيارات التعديل المتقدمة في محاكي RPCS3 🛠️</figcaption>
        </figure>
    </header>

    <div class="hakamiq-intro-box">
        تبويب <span class="hakamiq-highlight">Advanced</span> هو المكان المخصص للمستخدمين المتقدمين للتحكم في سلوك المحاكي بدقة. هذا الجدول يحتوي على كافة الخيارات المتاحة، وضعها الافتراضي، وشرح كامل لكل منها.
    </div>

    <div class="hakamiq-table-container">
        <table class="hakamiq-table">
            <thead>
                <tr>
                    <th>الإعداد</th>
                    <th>الوضع الافتراضي</th>
                    <th>الشرح التقني</th>
                    <th>ملاحظات حكميك</th>
                </tr>
            </thead>
            <tbody>
                <tr class="row-risky"><td>Debug console mode</td><td>Off</td><td>يزيد الذاكرة لتقليد أجهزة DECR المخصصة للمطورين.</td><td>❌ يؤثر على دقة المحاكاة ولا ينصح به.</td></tr>
                <tr class="row-safe"><td>Accurate DFMA</td><td>On</td><td>يوفر دقة إضافية في تعليمات FMA الحسابية.</td><td>✅ اتركه مفعلاً لتحسين الدقة وتجنب الأخطاء.</td></tr>
                <tr class="row-warn"><td>Accurate RSX reservation access</td><td>Off</td><td>يحسن الاستقرار في بعض الألعاب لكن يخفض الأداء.</td><td>⚠️ فعّله فقط إذا واجهت مشاكل رسومية.</td></tr>
                <tr class="row-warn"><td>Accurate SPU DMA</td><td>Off</td><td>يعالج عمليات SPU DMA بدقة عالية جداً.</td><td>⚠️ قد يحسن الاستقرار لكنه يستهلك الأداء.</td></tr>
                <tr class="row-safe"><td>PPU Non-Java mode Fixup</td><td>On</td><td>خيار قديم يُصلح القيم في وضع Non-Java.</td><td>✅ اتركه مفعلاً لضمان التوافق.</td></tr>
                <tr class="row-warn"><td>PPU Vector NaN Fixup</td><td>Off</td><td>يصحح نتائج NaN في تعليمات PPU.</td><td>⚠️ فعّله فقط إذا ظهرت أخطاء رسومية غير معتادة.</td></tr>
                <tr class="row-safe"><td>PPU LLVM precompilation</td><td>On</td><td>يُحمّل وحدات PPU مسبقاً أثناء التشغيل.</td><td>✅ يقلل جداً من التقطيع المفاجئ داخل اللعبة.</td></tr>
                <tr class="row-risky"><td>Delay each odd MFC command</td><td>Off</td><td>يؤخر تنفيذ بعض أوامر MFC لتبطيء الأداء.</td><td>❌ يبطئ المحاكي جداً، لا تستخدمه إلا للتجارب.</td></tr>
                <tr class="row-try"><td>Suspend-emulation savestates</td><td>On</td><td>يجعل الحفظ يوقف المحاكي ويمنع إعادة التحميل.</td><td>🎮 مفيد لمن يريد الحفظ بدون غش.</td></tr>
                <tr class="row-warn"><td>Silence all logs</td><td>Off</td><td>يمنع تسجيل أي ملفات سجل بعد بداية اللعبة.</td><td>⚠️ لا تستخدمه إلا عند الضرورة القصوى.</td></tr>
                <tr class="row-try"><td>Sleep timers accuracy</td><td>Usleep only</td><td>يتحكم في دقة فترات النوم البرمجية.</td><td>🎮 جرب تغييره إذا لاحظت لاج غير مفسر.</td></tr>
                <tr class="row-safe"><td>Maximum number of SPURS threads</td><td>Unlimited</td><td>يحدد عدد خيوط SPURS المستخدمة.</td><td>✅ اتركه على Unlimited لتجنب الأعطال المفاجئة.</td></tr>
                <tr class="row-try"><td>Clocks scale</td><td>100%</td><td>يضبط توقيت النظام الداخلي للمحاكي.</td><td>🎮 لا تغيره إلا عند إعدادات خاصة بكل لعبة.</td></tr>
                <tr class="row-warn"><td>Read depth buffers</td><td>Off</td><td>يمكّن قراءة قيم العمق من الذاكرة.</td><td>⚠️ فعّله فقط لحل مشاكل رسومية معينة.</td></tr>
                <tr class="row-warn"><td>Write depth buffers</td><td>Off</td><td>يسجل بيانات العمق إلى الذاكرة.</td><td>⚠️ نفس السابق، لا تغيره إلا عند الحاجة الفنية.</td></tr>
                <tr class="row-warn"><td>Read color buffers</td><td>Off</td><td>يمكّن قراءة بيانات الألوان من الذاكرة.</td><td>⚠️ فعّله في حال وجود مشاكل إضاءة أو ألوان.</td></tr>
                <tr class="row-risky"><td>Disable on-disk shader cache</td><td>Off</td><td>يعطل تخزين التظليل المؤقت على القرص الصلب.</td><td>❌ يسبب بطء شديد؛ لا يُنصح بتفعيله أبداً.</td></tr>
                <tr class="row-try"><td>Disable vertex cache</td><td>Off</td><td>يعطل تخزين رؤوس الرسومات.</td><td>🎮 جربه إذا كانت الرسومات تختفي أو تومض.</td></tr>
                <tr class="row-warn"><td>Allow host GPU labels</td><td>Off</td><td>يتيح للمحاكي المزامنة المباشرة مع الـ GPU.</td><td>⚠️ خيار تجريبي، لا يُستخدم إلا عند الضرورة.</td></tr>
                <tr class="row-safe"><td>Vulkan queue scheduler</td><td>Safe</td><td>يتحكم في جدولة أعمال GPU في Vulkan.</td><td>✅ اتركه على Safe لتجنب مشاكل التعليق.</td></tr>
                <tr class="row-try"><td>RSX FIFO Accuracy</td><td>Fast</td><td>يتحكم في دقة FIFO الرسومية.</td><td>🎮 جرب وضع Atomic لتحسين الثبات أحياناً.</td></tr>
                <tr class="row-safe"><td>Exclusive fullscreen mode</td><td>Automatic</td><td>يتحكم في وضع ملء الشاشة الحقيقي.</td><td>✅ مناسب لجميع الأجهزة والبطاقات الحديثة.</td></tr>
                <tr class="row-try"><td>Driver wake-up delay</td><td>1 µs</td><td>يؤثر على استقرار بعض الألعاب الحساسة.</td><td>🎮 جرّب قيم 200 أو 400 إذا ظهرت مشاكل.</td></tr>
                <tr class="row-try"><td>VBlank frequency</td><td>60 Hz</td><td>يتحكم في تردد إشارات VBlank.</td><td>🎮 مفيد فقط لألعاب تحتاج توقيت دقيق للغاية.</td></tr>
                <tr class="row-warn"><td>VBlank NTSC Fixup</td><td>Off</td><td>يصلح تردد VBlank لبعض ألعاب الإيقاع.</td><td>⚠️ فعّله فقط إذا طلبته لعبة معينة.</td></tr>
            </tbody>
        </table>
    </div>

    <div class="hakamiq-legend">
        <div class="legend-item"><span style="color: var(--xe-green);">●</span> إعداد آمن ومستحسن</div>
        <div class="legend-item"><span style="color: var(--xe-gold);">●</span> إعداد متقدم أو اختياري</div>
        <div class="legend-item"><span style="color: var(--xe-red);">●</span> إعداد غير موصى به</div>
        <div class="legend-item"><span style="color: var(--xe-blue);">●</span> جربه حسب حاجة اللعبة</div>
    </div>

    <footer style="text-align: center; margin-top: 40px; padding: 25px; background: #111; border-radius: 15px; border-top: 4px solid var(--xe-blue);">
        <h3 style="margin-top: 0; color: var(--xe-gold);">🎯 نصيحة الحكميك الختامية</h3>
        إعدادات <span class="hakamiq-highlight">Advanced</span> هي "الصندوق الأسود" لمحاكي <span style="color: var(--xe-blue);">RPCS3</span>. تذكر دائماً أن الإعدادات الافتراضية هي الأفضل لغالبية الألعاب، ولا تغير أي خيار هنا إلا إذا كنت تبحث عن حل لمشكلة محددة مذكورة في ويكي المحاكي الرسمي.
    </footer>

</article>

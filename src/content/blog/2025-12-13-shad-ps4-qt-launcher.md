---
title: 'دليل تشغيل محاكي ShadPs4 باستخدام Qt Launcher'
description: '📘 المقدمة هذا الدليل التعليمي موجّه لكل من يرغب في تجربة محاكي shadPS4 وتشغيل ألعاب PlayStation 4 على الحاسوب بأسلوب منظم وواضح. نعتمد هنا على الواجهة الرسمية shadps4-qtlauncher ل…'
pubDate: '2025-12-13T03:02:00.005+03:00'
updatedDate: '2026-02-24T04:03:27.510+03:00'
heroImage: '../../assets/blog-placeholder-1.jpg'
heroImageUrl: '/media/blogger/6e/6eab2b65bbea02e9f11c853b85cd84d9c088a8eeeacd3fe608fd2890c2448d92.png'
originalUrl: 'https://hakamiq1.blogspot.com/2025/12/shad-ps4-qt-launcher.html'
labels: ["PlayStation","PS4"]
---

<style>
    :root {
        --h-red: #b71c1c;
        --h-dark-red: #7f1d1d;
        --h-bg: #ffffff;
        --h-text: #2d3436;
        --h-gray: #f8f9fa;
        --card-shadow: 0 10px 30px rgba(0,0,0,0.08);
    }

    .hakamiq-guide-wrapper {
        direction: rtl;
        text-align: right;
        font-family: 'Tajawal', 'Segoe UI', sans-serif;
        line-height: 1.8;
        color: var(--h-text);
        max-width: 950px;
        margin: 0 auto;
        padding: 15px;
    }

    /* هيدر الفصول */
    .chapter-header {
        background: linear-gradient(135deg, var(--h-dark-red), var(--h-red));
        color: white;
        padding: 25px;
        border-radius: 15px 15px 0 0;
        font-size: 24px;
        font-weight: bold;
        box-shadow: var(--card-shadow);
        display: flex;
        align-items: center;
        gap: 15px;
    }

    /* محتوى الفصول (البطاقة) */
    .chapter-card {
        background: white;
        border: 1px solid #eee;
        border-radius: 0 0 15px 15px;
        padding: 30px;
        margin-bottom: 40px;
        box-shadow: var(--card-shadow);
    }

    /* الجداول الاحترافية */
    .tech-table {
        width: 100%;
        border-collapse: collapse;
        margin: 20px 0;
        border-radius: 10px;
        overflow: hidden;
    }

    .tech-table th {
        background: var(--h-dark-red);
        color: #fde68a;
        padding: 15px;
        text-align: center;
    }

    .tech-table td {
        padding: 12px;
        border-bottom: 1px solid #eee;
        text-align: center;
        background: #fffafa;
    }

    /* صناديق التنبيه والملاحظات */
    .h-alert {
        background: #fff5f5;
        border-right: 6px solid var(--h-red);
        padding: 20px;
        border-radius: 10px;
        margin: 20px 0;
    }

    .h-tip {
        background: #f0fdf4;
        border-right: 6px solid #22c55e;
        padding: 20px;
        border-radius: 10px;
        margin: 20px 0;
    }

    /* تنسيق الصور */
    .guide-img {
        width: 100%;
        max-width: 700px;
        border-radius: 15px;
        display: block;
        margin: 20px auto;
        box-shadow: var(--card-shadow);
    }

    /* قوائم الميزات */
    .feature-list {
        list-style: none;
        padding: 0;
    }

    .feature-list li {
        margin-bottom: 12px;
        padding-right: 30px;
        position: relative;
    }

    .feature-list li::before {
        content: "🔹";
        position: absolute;
        right: 0;
    }

    /* أزرار التحميل */
    .h-btn {
        display: inline-block;
        background: var(--h-red);
        color: white !important;
        padding: 10px 25px;
        border-radius: 8px;
        text-decoration: none;
        font-weight: bold;
        transition: 0.3s;
    }

    .h-btn:hover { background: #000; }
</style>

<div class="hakamiq-guide-wrapper">

    <header class="chapter-header">📘 المقدمة</header>
    <section class="chapter-card">
        <img class="guide-img" alt="شرح محاكي shadPS4 Qt Launcher - حكميك" src="/media/blogger/6e/6eab2b65bbea02e9f11c853b85cd84d9c088a8eeeacd3fe608fd2890c2448d92.png" />
        <p>هذا الدليل التعليمي موجّه لكل من يرغب في تجربة محاكي <strong>shadPS4</strong> وتشغيل ألعاب <strong>PlayStation 4</strong> على الحاسوب بأسلوب منظم وواضح. نعتمد هنا على الواجهة الرسمية <strong>shadps4-qtlauncher</strong> لأنها الأكثر استقراراً وتطوراً حالياً.</p>
        
        <div class="h-alert">
            <strong>محتويات الدليل:</strong>
            <ul class="feature-list" style="margin-top:10px">
                <li>تثبيت المحاكي والإعداد الأولي.</li>
                <li>إضافة الألعاب وتنظيم المكتبة.</li>
                <li>ضبط الإعدادات الرسومية والتحكم.</li>
                <li>شرح أدوات الواجهة والاختصارات.</li>
            </ul>
        </div>
    </section>

    <header class="chapter-header">💻 الفصل الأول – المتطلبات الأساسية</header>
    <section class="chapter-card">
        <p>تأكد من أن جهازك يلبي هذه المواصفات لضمان تجربة محاكاة مستقرة:</p>
        <div class="table-container" style="overflow-x:auto">
            <table class="tech-table">
                <thead>
                    <tr><th>العنصر</th><th>الحد الأدنى</th><th>الموصى به</th></tr>
                </thead>
                <tbody>
                    <tr><td>المعالج (CPU)</td><td>4 أنوية / 6 خيوط</td><td>6 أنوية فأعلى (3.5GHz)</td></tr>
                    <tr><td>الجرافيك (GPU)</td><td>Vulkan 1.3 / 4GB VRAM</td><td>GTX 1660 / RX 6600 فأعلى</td></tr>
                    <tr><td>الذاكرة (RAM)</td><td>8GB</td><td>16GB أو أكثر</td></tr>
                </tbody>
            </table>
        </div>
        
        <div class="h-tip">
            ✅ <strong>نصيحة:</strong> تحديث تعريف كرت الشاشة ضروري جداً لتجنب كراشات Vulkan في ألعاب مثل Bloodborne.
        </div>
    </section>

    <header class="chapter-header">📦 الفصل الثاني – تحميل QtLauncher</header>
    <section class="chapter-card">
        <p>مشروع <strong>shadPS4</strong> يتكون من النواة والواجهة الرسومية <strong>QtLauncher</strong> التي تتيح لك إدارة مكتبتك بسهولة:</p>
        <ul class="feature-list">
            <li>توجه للموقع الرسمي: <a href="https://shadps4.net/downloads" class="h-btn" target="_blank">صفحة التحميل</a></li>
            <li>ثبت مكتبة <strong>Visual C++ 2022</strong> (ضروري جداً لعمل المحاكي على ويندوز).</li>
            <li>استخدم تبويب <strong>Version Manager</strong> داخل اللانشر لجلب آخر التحديثات تلقائياً.</li>
        </ul>
        <img class="guide-img" alt="واجهة Version Manager في shadPS4" src="/media/blogger/35/3527592f33d09a81c8662dadb407cd10768d1c627a486bef6531becc20cc2b34.png" />
    </section>

    <header class="chapter-header">⚙️ الفصل الثالث – إعدادات المحاكي</header>
    <section class="chapter-card">
        <div class="h-alert">
            <strong>🎨 إعدادات الرسوميات (Graphics):</strong>
            <ul class="feature-list" style="margin-top:10px">
                <li><strong>Graphics Device:</strong> اختر كرت الشاشة الخارجي (NVIDIA/AMD).</li>
                <li><strong>Borderless:</strong> أفضل وضع عرض لتفادي مشاكل الانتقال بين النوافذ.</li>
                <li><strong>FSR:</strong> فعله لتحسين الأداء ورفع "انتر ريزلوشن" الصورة.</li>
            </ul>
        </div>
        <img class="guide-img" alt="إعدادات الجرافيك في Qt Launcher" src="/media/blogger/e3/e39c984a9fdb2cfa948529c89fd10524eceb6c1e0cef1da09fa4bf9b4fda7a13.png" />
    </section>

    <header class="chapter-header">🧰 الفصل الرابع – الاختصارات والأدوات</header>
    <section class="chapter-card">
        <p>تحتوي واجهة <strong>QtLauncher</strong> على اختصارات سريعة تسهل عليك المهمة:</p>
        <table class="tech-table">
            <thead><tr><th>الاختصار</th><th>الوظيفة</th></tr></thead>
            <tbody>
                <tr><td><b>F10</b></td><td>إظهار عداد الإطارات (FPS)</td></tr>
                <tr><td><b>F11</b></td><td>تبديل وضع الشاشة الكاملة</td></tr>
                <tr><td><b>F12</b></td><td>فتح سجل التشغيل (Log) للتصحيح</td></tr>
            </tbody>
        </table>
        <div class="h-tip">
            💡 <strong>Utils:</strong> استخدم قائمة الأدوات المساعدة لتنزيل <strong>Cheats/Patches</strong> وتحديث حالة توافق الألعاب بضغطة واحدة.
        </div>
    </section>

    <header class="chapter-header">🏁 الفصل الخامس – نصائح الأداء والختام</header>
    <section class="chapter-card">
        <p>المحاكي في تطور مستمر، لذا تذكر دائماً:</p>
        <ul class="feature-list">
            <li>لا تفعل إعدادات <strong>Debug</strong> إلا إذا طلب منك المطورون ذلك لتقليل استهلاك المعالج.</li>
            <li>راجع <a href="https://github.com/shadPS4/shadPS4/wiki">ShadPS4 Wiki</a> لمعرفة أفضل إعدادات لكل لعبة.</li>
        </ul>
        <div class="h-alert" style="text-align:center; background: var(--h-dark-red); color: white">
            🎮 أنت الآن جاهز لخوض تجربة ألعاب PS4 باحترافية على حاسوبك!
        </div>
        <p style="text-align:center; margin-top:20px">📢 تابع <strong>HAKAMIQ</strong> لمزيد من الشروحات الحصرية وتحديثات المحاكيات.</p>
    </section>

</div>

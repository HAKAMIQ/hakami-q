---
title: 'حل خطأ MSVCP140.dll وكراش PCSX2 على Windows'
description: 'إذا كان PCSX2 ما يفتح، أو ينهار عند فتح الإعدادات أو تشغيل لعبة، فالسبب غالبًا يكون مكتبات Visual C++ ناقصة، تعريف كرت شاشة قديم، تعديل على واجهة Windows، أو حزمة توافق Vulkan غير…'
pubDate: '2026-07-24T06:59:16.386+03:00'
updatedDate: '2026-07-24T07:06:50.284+03:00'
heroImage: '../../assets/blog-placeholder-1.jpg'
heroImageUrl: 'https://raw.githubusercontent.com/PCSX2/pcsx2-net-www/main/docs/troubleshooting/img/vcredist.webp'
originalUrl: 'https://hakamiq1.blogspot.com/2026/07/msvcp140dll-pcsx2-windows.html'
labels: ["PS2"]
---

<style>
    .pcsx2-windows-guide {
        --pw-red: #ef3027;
        --pw-red-dark: #a81410;
        --pw-blue: #29b6f6;
        --pw-gold: #ffd600;
        --pw-green: #00e676;
        --pw-orange: #ffab40;
        --pw-bg: #101115;
        --pw-card: #191b21;
        --pw-soft: #14161b;
        --pw-border: rgba(255, 255, 255, 0.09);
        --pw-text: #f4f4f4;
        --pw-muted: #aeb4bf;

        direction: rtl;
        width: 100%;
        max-width: 950px;
        margin: 0 auto;
        padding: 20px;
        color: var(--pw-text);
        background: var(--pw-bg);
        border: 1px solid var(--pw-border);
        border-radius: 16px;
        box-sizing: border-box;
        font-family: "Tajawal", "Cairo", Arial, sans-serif;
        font-size: 16px;
        line-height: 1.9;
        text-align: right;
    }

    .pcsx2-windows-guide,
    .pcsx2-windows-guide * {
        box-sizing: border-box;
    }

    .pcsx2-windows-guide p {
        margin: 0 0 14px;
    }

    .pcsx2-windows-guide p:last-child {
        margin-bottom: 0;
    }

    .pcsx2-windows-guide a {
        color: var(--pw-blue);
        text-decoration: none;
        font-weight: 800;
    }

    .pcsx2-windows-guide a:hover {
        color: var(--pw-gold);
    }

    .pw-hero {
        margin-bottom: 22px;
        padding: 25px;
        text-align: center;
        background:
            radial-gradient(circle at top right, rgba(239, 48, 39, 0.18), transparent 42%),
            radial-gradient(circle at bottom left, rgba(41, 182, 246, 0.12), transparent 38%),
            linear-gradient(145deg, #1a1c22, #101115);
        border: 1px solid rgba(255, 255, 255, 0.09);
        border-radius: 14px;
        box-shadow: 0 10px 28px rgba(0, 0, 0, 0.25);
    }

    .pw-badge {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-height: 30px;
        margin-bottom: 10px;
        padding: 4px 14px;
        color: #fff;
        background: linear-gradient(135deg, var(--pw-red), var(--pw-red-dark));
        border: 1px solid rgba(255, 255, 255, 0.13);
        border-radius: 999px;
        font-size: 13px;
        font-weight: 800;
    }

    .pw-hero h2 {
        max-width: 870px;
        margin: 7px auto 10px;
        color: var(--pw-blue);
        font-size: 28px;
        line-height: 1.5;
    }

    .pw-hero p {
        max-width: 830px;
        margin: 8px auto 0;
        color: #dadde4;
    }

    .pw-card,
    .pw-source-card {
        margin-bottom: 20px;
        padding: 23px;
        overflow: hidden;
        background: linear-gradient(145deg, var(--pw-card), var(--pw-soft));
        border: 1px solid var(--pw-border);
        border-radius: 13px;
        box-shadow: 0 7px 22px rgba(0, 0, 0, 0.18);
    }

    .pw-card h3,
    .pw-source-card h3 {
        position: relative;
        margin: 0 0 18px;
        padding: 0 15px 11px 0;
        color: var(--pw-gold);
        border-bottom: 1px solid rgba(255, 255, 255, 0.09);
        font-size: 19px;
        line-height: 1.55;
    }

    .pw-card h3::before,
    .pw-source-card h3::before {
        content: "";
        position: absolute;
        top: 7px;
        right: 0;
        width: 4px;
        height: 18px;
        background: var(--pw-red);
        border-radius: 4px;
    }

    .pw-card h4 {
        margin: 23px 0 11px;
        color: var(--pw-blue);
        font-size: 16.5px;
        line-height: 1.6;
    }

    .pw-note,
    .pw-warning,
    .pw-info,
    .pw-danger,
    .pw-success {
        margin: 18px 0;
        padding: 15px 17px;
        color: #eceef2;
        background: rgba(0, 0, 0, 0.22);
        border-radius: 9px;
    }

    .pw-note {
        border-right: 4px solid var(--pw-blue);
    }

    .pw-warning {
        border-right: 4px solid var(--pw-orange);
    }

    .pw-info {
        border-right: 4px solid var(--pw-gold);
    }

    .pw-danger {
        border-right: 4px solid var(--pw-red);
    }

    .pw-success {
        border-right: 4px solid var(--pw-green);
    }

    .pw-code {
        direction: ltr;
        unicode-bidi: embed;
        display: inline-block;
        max-width: 100%;
        padding: 2px 7px;
        color: var(--pw-green);
        background: #07080a;
        border: 1px solid rgba(0, 230, 118, 0.14);
        border-radius: 5px;
        font-family: Consolas, Monaco, monospace;
        font-size: 0.92em;
        white-space: nowrap;
    }

    .pw-path {
        direction: ltr;
        unicode-bidi: embed;
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 58px;
        margin: 18px 0;
        padding: 12px;
        color: var(--pw-green);
        background: #06070a;
        border: 1px solid rgba(0, 230, 118, 0.16);
        border-radius: 10px;
        font-family: Consolas, Monaco, monospace;
        font-size: 17px;
        font-weight: 900;
        text-align: center;
    }

    /* Blogger-safe steps: no OL/LI elements */
    .pw-step-grid {
        display: grid !important;
        grid-template-columns: 1fr !important;
        gap: 10px !important;
        width: 100% !important;
        margin: 15px 0 0 !important;
        padding: 0 !important;
        direction: rtl !important;
    }

    .pw-step-row {
        display: grid !important;
        grid-template-columns: 34px minmax(0, 1fr) !important;
        align-items: start !important;
        column-gap: 10px !important;
        width: 100% !important;
        min-width: 0 !important;
        min-height: 48px !important;
        margin: 0 !important;
        padding: 9px 10px !important;
        color: #e2e4e9 !important;
        background: rgba(0, 0, 0, 0.20) !important;
        border: 1px solid rgba(255, 255, 255, 0.07) !important;
        border-radius: 9px !important;
        direction: rtl !important;
        text-align: right !important;
    }

    .pw-step-number {
        position: static !important;
        display: inline-flex !important;
        align-items: center !important;
        justify-content: center !important;
        grid-column: 1 !important;
        width: 28px !important;
        height: 28px !important;
        margin: 1px 0 0 !important;
        padding: 0 !important;
        color: #fff !important;
        background: linear-gradient(135deg, var(--pw-red), var(--pw-red-dark)) !important;
        border: 0 !important;
        border-radius: 50% !important;
        font-size: 13px !important;
        font-weight: 900 !important;
        line-height: 28px !important;
        direction: ltr !important;
        text-align: center !important;
        box-shadow: none !important;
    }

    .pw-step-text {
        grid-column: 2 !important;
        min-width: 0 !important;
        margin: 0 !important;
        padding: 1px 0 0 !important;
        color: #e2e4e9 !important;
        font-size: inherit !important;
        line-height: 1.85 !important;
        direction: rtl !important;
        text-align: right !important;
        overflow-wrap: anywhere !important;
        word-break: normal !important;
    }

    .pw-step-text .pw-code {
        margin: 0 4px !important;
        vertical-align: baseline !important;
    }

    .pw-image {
        margin: 20px 0;
        padding: 7px;
        overflow: hidden;
        background: #0e0f13;
        border: 1px solid rgba(255, 255, 255, 0.10);
        border-radius: 13px;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.22);
    }

    .pw-image img {
        display: block;
        width: 100%;
        height: auto;
        margin: 0;
        object-fit: contain;
        background: #08090c;
        border-radius: 8px;
    }

    .pw-caption {
        margin: 0;
        padding: 10px 10px 4px;
        color: var(--pw-muted);
        font-size: 13px;
        line-height: 1.65;
        text-align: center;
    }

    .pw-error-box {
        direction: ltr;
        unicode-bidi: embed;
        margin: 18px 0;
        padding: 17px;
        overflow-wrap: anywhere;
        color: #ffb4af;
        background: #0b0c0f;
        border: 1px solid rgba(239, 48, 39, 0.28);
        border-radius: 10px;
        font-family: Consolas, Monaco, monospace;
        font-size: 14px;
        line-height: 1.7;
        text-align: left;
    }

    .pw-vendor-grid {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 12px;
        margin: 18px 0;
    }

    .pw-vendor-card {
        display: flex;
        flex-direction: column;
        min-height: 132px;
        padding: 16px;
        background: rgba(0, 0, 0, 0.20);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 10px;
    }

    .pw-vendor-card strong {
        display: block;
        margin-bottom: 7px;
        color: var(--pw-blue);
        font-size: 16px;
    }

    .pw-vendor-card p {
        flex: 1;
        color: #d7dae0;
        font-size: 14px;
        line-height: 1.7;
    }

    .pw-vendor-card a {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        align-self: flex-start;
        min-height: 34px;
        padding: 5px 12px;
        color: #fff !important;
        background: #292c33;
        border: 1px solid rgba(255, 255, 255, 0.09);
        border-radius: 8px;
        font-size: 12px;
    }

    .pw-vendor-card a:hover {
        background: linear-gradient(135deg, var(--pw-red), var(--pw-red-dark));
    }

    .pw-links {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 11px;
        margin-top: 16px;
    }

    .pw-link {
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 45px;
        padding: 9px 13px;
        color: #fff !important;
        background: rgba(0, 0, 0, 0.23);
        border: 1px solid rgba(255, 255, 255, 0.09);
        border-radius: 9px;
        text-align: center;
    }

    .pw-link:hover {
        background: linear-gradient(135deg, var(--pw-red), var(--pw-red-dark));
    }

    .pw-footer {
        padding: 17px;
        color: #e1e3e8;
        background: #24262c;
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 10px;
        text-align: center;
    }

    .pw-footer p {
        margin: 0;
    }

    @media (max-width: 760px) {
        .pcsx2-windows-guide {
            padding: 14px;
            font-size: 15px;
            border-radius: 12px;
        }

        .pw-hero {
            padding: 19px;
        }

        .pw-hero h2 {
            font-size: 22px;
        }

        .pw-card,
        .pw-source-card {
            padding: 18px;
        }

        .pw-card h3,
        .pw-source-card h3 {
            font-size: 17px;
        }

        .pw-vendor-grid,
        .pw-links {
            grid-template-columns: 1fr;
        }

        .pw-path {
            font-size: 14px;
        }
    }

    @media (max-width: 520px) {
        .pw-step-row {
            grid-template-columns: 30px minmax(0, 1fr) !important;
            column-gap: 8px !important;
            padding: 8px !important;
        }

        .pw-step-number {
            width: 26px !important;
            height: 26px !important;
            line-height: 26px !important;
        }

        .pw-code {
            white-space: normal;
            overflow-wrap: anywhere;
        }
    }
</style>
<div class="pcsx2-windows-guide">
<header class="pw-hero"><p>إذا كان PCSX2 ما يفتح، أو ينهار عند فتح الإعدادات أو تشغيل لعبة،
            فالسبب غالبًا يكون مكتبات Visual C++ ناقصة، تعريف كرت شاشة قديم،
            تعديل على واجهة Windows، أو حزمة توافق Vulkan غير سليمة.
        </p>
</header>
<section class="pw-card">
<h3>حل خطأ MSVCP140.dll عند تشغيل PCSX2</h3>
<div class="pw-image"><img alt="رسالة خطأ MSVCP140.dll عند تشغيل PCSX2" loading="eager" src="https://raw.githubusercontent.com/PCSX2/pcsx2-net-www/main/docs/troubleshooting/img/vcredist.webp" /><p class="pw-caption">رسالة الخطأ الأصلية التي قد تظهر عند غياب مكتبات Microsoft Visual C++.</p></div><div class="pw-error-box">
            The code execution cannot proceed because MSVCP140.dll was not found.
        </div>
<p>
            PCSX2 على Windows يحتاج أحدث إصدار من
            <span class="pw-code">Microsoft Visual C++ Redistributable</span>
            بمعمارية <span class="pw-code">X64</span>.
        </p>
<div class="pw-image">
<img alt="اختيار نسخة X64 من Microsoft Visual C++ Redistributable" loading="eager" src="https://raw.githubusercontent.com/PCSX2/pcsx2-net-www/main/docs/troubleshooting/img/vcredist_website.webp" />
<p class="pw-caption">
                اختر تنزيل X64 فقط كما هو موضح في الصورة الرسمية لدليل PCSX2.
            </p>
</div>
<div class="pw-step-grid">
<div class="pw-step-row">
<span class="pw-step-number">1</span>
<div class="pw-step-text">
                    افتح صفحة Visual C++ الرسمية من Microsoft.
                </div>
</div>
<div class="pw-step-row">
<span class="pw-step-number">2</span>
<div class="pw-step-text">
                    نزل ملف <span class="pw-code">vc_redist.x64.exe</span>.
                    لا تختار X86 أو ARM64.
                </div>
</div>
<div class="pw-step-row">
<span class="pw-step-number">3</span>
<div class="pw-step-text">
                    شغل المثبت واضغط <span class="pw-code">Install</span>.
                </div>
</div>
<div class="pw-step-row">
<span class="pw-step-number">4</span>
<div class="pw-step-text">
                    أعد تشغيل الكمبيوتر إذا طلب منك المثبت ذلك.
                </div>
</div>
</div>
<div class="pw-success">
            رابط التنزيل الرسمي المباشر لنسخة X64:
            <a href="https://aka.ms/vc14/vc_redist.x64.exe" rel="noopener noreferrer" target="_blank">
                vc_redist.x64.exe
            </a>
</div>
<div class="pw-danger">
            لا تحمل ملف <span class="pw-code">MSVCP140.dll</span> منفردًا من مواقع DLL.
            الحل الصحيح هو تثبيت حزمة Visual C++ الكاملة من Microsoft.
        </div>
</section>
<section class="pw-card">
<h3>الخطأ مستمر بعد تثبيت Visual C++</h3>
<p>
            لو استمر خطأ <span class="pw-code">MSVCP140.dll</span>، أو ظهرت رسالة
            تقول إن إصدار Visual C++ غير متوافق، ممكن تكون ملفات أضفتها يدويًا
            أو نسخة Runtime قديمة تتدخل مع التثبيت الصحيح.
        </p>
<div class="pw-info">
            بتشوف أكثر من عنصر باسم Microsoft Visual C++ داخل قائمة البرامج.
            احذف النسخة <span class="pw-code">X64</span> الأحدث اللي ثبتها للتو،
            ولا تحذف جميع الإصدارات بشكل عشوائي.
        </div>
<div class="pw-step-grid">
<div class="pw-step-row">
<span class="pw-step-number">1</span>
<div class="pw-step-text">
                    افتح <span class="pw-code">Settings → Apps → Installed apps</span>.
                </div>
</div>
<div class="pw-step-row">
<span class="pw-step-number">2</span>
<div class="pw-step-text">
                    احذف أحدث عنصر Microsoft Visual C++ Runtime بمعمارية X64.
                </div>
</div>
<div class="pw-step-row">
<span class="pw-step-number">3</span>
<div class="pw-step-text">
                    أعد تشغيل الكمبيوتر.
                </div>
</div>
<div class="pw-step-row">
<span class="pw-step-number">4</span>
<div class="pw-step-text">
                    ثبت <span class="pw-code">vc_redist.x64.exe</span> من جديد.
                </div>
</div>
<div class="pw-step-row">
<span class="pw-step-number">5</span>
<div class="pw-step-text">
                    أعد تشغيل الكمبيوتر مرة ثانية ثم جرب PCSX2.
                </div>
</div>
</div>
</section>
<section class="pw-card">
<h3>PCSX2 ينهار عند فتح الإعدادات أو تشغيل لعبة</h3>
<p>
            إذا انهار المحاكي عند فتح Settings، أو ظهر خطأ عند تشغيل اللعبة،
            فالسبب المعروف غالبًا هو تعريف قديم لكرت الشاشة.
        </p><div class="pw-image"><img alt="رسالة خطأ تعريف كرت الشاشة القديم في PCSX2" loading="lazy" src="https://raw.githubusercontent.com/PCSX2/pcsx2-net-www/main/docs/troubleshooting/img/old_driver.webp" /><p class="pw-caption">هذه الرسالة تعني أن تعريف كرت الشاشة قديم ويحتاج إلى تحديث.</p></div>
<div class="pw-vendor-grid">
<div class="pw-vendor-card">
<strong>Intel</strong>
<p>
                    ابحث عن موديل المعالج أو كرت Intel، أو استخدم أداة
                    Intel Driver &amp; Support Assistant.
                </p>
<a href="https://www.intel.com/content/www/us/en/download-center/home.html" rel="noopener noreferrer" target="_blank">
                    تعريفات Intel
                </a>
</div>
<div class="pw-vendor-card">
<strong>Nvidia</strong>
<p>
                    ابحث عن موديل GeForce من صفحة التعريفات، أو استخدم NVIDIA App
                    للتحديث التلقائي.
                </p>
<a href="https://www.nvidia.com/en-us/drivers/" rel="noopener noreferrer" target="_blank">
                    تعريفات Nvidia
                </a>
</div>
<div class="pw-vendor-card">
<strong>AMD</strong>
<p>
                    ابحث عن موديل Radeon أو Ryzen، أو استخدم أداة اكتشاف التعريف
                    من صفحة دعم AMD.
                </p>
<a href="https://www.amd.com/en/support.html" rel="noopener noreferrer" target="_blank">
                    تعريفات AMD
                </a>
</div>
</div>
<div class="pw-warning">
            حدث تعريف جميع كروت الشاشة الموجودة بالجهاز، حتى لو ما تستخدمها
            داخل PCSX2. في اللابتوبات لازم تحدث الكرت المدمج والكرت المنفصل مع بعض.
        </div>
</section>
<section class="pw-card">
<h3>كراش عند إضافة مجلد ألعاب أو فتح الإعدادات</h3>
<p>
            بعض برامج تعديل واجهة Windows أو Windows Shell تتدخل مع نوافذ اختيار
            الملفات والمجلدات، وتسبب انهيار PCSX2. من الأمثلة المعروفة:
            <span class="pw-code">OldNewExplorer</span>.
        </p>
<div class="pw-danger">
            تعطيل البرنامج مؤقتًا ممكن ما يكفي. الحل المذكور في دليل PCSX2 هو
            إزالة برنامج تعديل Shell المسبب للمشكلة بالكامل، ثم إعادة تشغيل Windows.
        </div>
<div class="pw-step-grid">
<div class="pw-step-row">
<span class="pw-step-number">1</span>
<div class="pw-step-text">
                    افتح قائمة البرامج المثبتة في Windows.
                </div>
</div>
<div class="pw-step-row">
<span class="pw-step-number">2</span>
<div class="pw-step-text">
                    ابحث عن برامج تعديل File Explorer أو Windows Shell.
                </div>
</div>
<div class="pw-step-row">
<span class="pw-step-number">3</span>
<div class="pw-step-text">
                    احذف البرنامج المسبب للمشكلة بالكامل.
                </div>
</div>
<div class="pw-step-row">
<span class="pw-step-number">4</span>
<div class="pw-step-text">
                    أعد تشغيل الكمبيوتر ثم جرب إضافة مجلد اللعبة من جديد.
                </div>
</div>
</div>
</section>
<section class="pw-card">
<h3>كراش بسبب OpenCL وOpenGL وVulkan Compatibility Pack</h3>
<p>
            توجد حزمة في Windows باسم:
        </p>
<div class="pw-path">OpenCL™, OpenGL®, and Vulkan® Compatibility Pack</div>
<p>
            حسب توثيق PCSX2، هذه الحزمة لا تلتزم بمواصفات Vulkan بالشكل المطلوب،
            وقد تسبب انهيار PCSX2 وبرامج ثانية تستخدم Vulkan. غالبية الأجهزة
            ما تحتاجها إذا كانت تعريفات كرت الشاشة الأصلية مثبتة.
        </p>
<h4>ملاحظة لمستخدمي ROG Ally</h4>
<div class="pw-warning">
            بعض أجهزة ROG Ally جاءت بهذه الحزمة مثبتة مسبقًا، رغم أن الجهاز
            يحتوي تعريف GPU كامل. احذف الحزمة حتى يعمل PCSX2 مع Vulkan بشكل صحيح.
        </div>
<h4>طريقة حذف الحزمة</h4>
<div class="pw-step-grid">
<div class="pw-step-row">
<span class="pw-step-number">1</span>
<div class="pw-step-text">
                    افتح <span class="pw-code">Start</span> ثم
                    <span class="pw-code">Settings</span>.
                </div>
</div>
<div class="pw-step-row">
<span class="pw-step-number">2</span>
<div class="pw-step-text">
                    ادخل <span class="pw-code">Apps → Installed apps</span>.
                </div>
</div>
<div class="pw-step-row">
<span class="pw-step-number">3</span>
<div class="pw-step-text">
                    ابحث عن
                    <span class="pw-code">OpenCL, OpenGL, and Vulkan Compatibility Pack</span>.
                </div>
</div>
<div class="pw-step-row">
<span class="pw-step-number">4</span>
<div class="pw-step-text">
                    اضغط على القائمة بجانبه واختر
                    <span class="pw-code">Uninstall</span>.
                </div>
</div>
<div class="pw-step-row">
<span class="pw-step-number">5</span>
<div class="pw-step-text">
                    أعد تشغيل الكمبيوتر بعد انتهاء الحذف.
                </div>
</div>
</div>
</section>
<section class="pw-card">
<h3>الترتيب الصحيح لتجربة الحلول</h3>
<div class="pw-step-grid">
<div class="pw-step-row">
<span class="pw-step-number">1</span>
<div class="pw-step-text">
                    ثبت أحدث Visual C++ X64 من Microsoft.
                </div>
</div>
<div class="pw-step-row">
<span class="pw-step-number">2</span>
<div class="pw-step-text">
                    حدث تعريفات جميع كروت الشاشة.
                </div>
</div>
<div class="pw-step-row">
<span class="pw-step-number">3</span>
<div class="pw-step-text">
                    احذف برامج تعديل Windows Shell إذا كان الكراش يظهر عند اختيار مجلد.
                </div>
</div>
<div class="pw-step-row">
<span class="pw-step-number">4</span>
<div class="pw-step-text">
                    احذف Vulkan Compatibility Pack إذا كان موجودًا.
                </div>
</div>
<div class="pw-step-row">
<span class="pw-step-number">5</span>
<div class="pw-step-text">
                    أعد التشغيل وجرب PCSX2 قبل تغيير أي إعدادات داخل المحاكي.
                </div>
</div>
</div>
</section>
<section class="pw-source-card">
<h3>المصادر الرسمية</h3>
<div class="pw-links">
<a class="pw-link" href="https://pcsx2.net/docs/troubleshooting/windows/" rel="noopener noreferrer" target="_blank">
                دليل مشاكل Windows من PCSX2
            </a>
<a class="pw-link" href="https://learn.microsoft.com/en-us/cpp/windows/latest-supported-vc-redist" rel="noopener noreferrer" target="_blank">
                صفحة Visual C++ الرسمية
            </a>
<a class="pw-link" href="https://aka.ms/vc14/vc_redist.x64.exe" rel="noopener noreferrer" target="_blank">
                تنزيل Visual C++ X64
            </a>
<a class="pw-link" href="https://www.intel.com/content/www/us/en/download-center/home.html" rel="noopener noreferrer" target="_blank">
                مركز تعريفات Intel
            </a>
<a class="pw-link" href="https://www.nvidia.com/en-us/drivers/" rel="noopener noreferrer" target="_blank">
                تعريفات Nvidia الرسمية
            </a>
<a class="pw-link" href="https://www.amd.com/en/support.html" rel="noopener noreferrer" target="_blank">
                تعريفات AMD الرسمية
            </a>
<a class="pw-link" href="https://pcsx2.net/docs/troubleshooting/identify/" rel="noopener noreferrer" target="_blank">
                جمع Emulog والإبلاغ
            </a>
<a class="pw-link" href="https://github.com/PCSX2/pcsx2/issues" rel="noopener noreferrer" target="_blank">
                بلاغات PCSX2 على GitHub
            </a>
</div>
</section>
<footer class="pw-footer">
<p>
            ابدأ بالمكتبات والتعريفات ومكونات Windows قبل تعديل إعدادات PCSX2؛
            هذه المشاكل تحصل خارج المحاكي، وتغيير Renderer أو انتر ريزلوشن ما يعالج سببها.
        </p>
</footer>
</div>

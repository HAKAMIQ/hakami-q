---
title: 'طريقة بناء RPCS3 من المصدر على Windows وLinux | الدليل المحدث'
description: 'هذا الدليل موجه للمطورين والمستخدمين اللي يحتاجون يبنون RPCS3 بأنفسهم للتطوير أو الاختبار. استخدام النسخة الجاهزة يظل الأفضل للمستخدم العادي، أما البناء من المصدر فيحتاج أدوات تطوي…'
pubDate: '2026-07-24T07:14:09.235+03:00'
updatedDate: '2026-07-24T07:14:09.236+03:00'
heroImage: '../../assets/blog-placeholder-1.jpg'
heroImageUrl: 'https://opengraph.githubassets.com/1/RPCS3/rpcs3'
originalUrl: 'https://hakamiq1.blogspot.com/2026/07/rpcs3-windows-linux.html'
labels: ["PS3"]
---

<style>
    .rpcs3-build-guide {
        --rb-red: #ef3027;
        --rb-red-dark: #a81410;
        --rb-blue: #29b6f6;
        --rb-gold: #ffd600;
        --rb-green: #00e676;
        --rb-orange: #ffab40;
        --rb-bg: #101115;
        --rb-card: #191b21;
        --rb-soft: #14161b;
        --rb-border: rgba(255, 255, 255, 0.09);
        --rb-text: #f4f4f4;
        --rb-muted: #aeb4bf;

        direction: rtl;
        width: 100%;
        max-width: 980px;
        margin: 0 auto;
        padding: 20px;
        color: var(--rb-text);
        background: var(--rb-bg);
        border: 1px solid var(--rb-border);
        border-radius: 16px;
        box-sizing: border-box;
        font-family: "Tajawal", "Cairo", Arial, sans-serif;
        font-size: 16px;
        line-height: 1.9;
        text-align: right;
    }

    .rpcs3-build-guide,
    .rpcs3-build-guide * {
        box-sizing: border-box;
    }

    .rpcs3-build-guide p {
        margin: 0 0 14px;
    }

    .rpcs3-build-guide p:last-child {
        margin-bottom: 0;
    }

    .rpcs3-build-guide a {
        color: var(--rb-blue);
        text-decoration: none;
        font-weight: 800;
    }

    .rpcs3-build-guide a:hover {
        color: var(--rb-gold);
    }

    .rb-hero {
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

    .rb-badge {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-height: 30px;
        margin-bottom: 10px;
        padding: 4px 14px;
        color: #fff;
        background: linear-gradient(135deg, var(--rb-red), var(--rb-red-dark));
        border: 1px solid rgba(255, 255, 255, 0.13);
        border-radius: 999px;
        font-size: 13px;
        font-weight: 800;
    }

    .rb-hero h2 {
        max-width: 870px;
        margin: 7px auto 10px;
        color: var(--rb-blue);
        font-size: 28px;
        line-height: 1.5;
    }

    .rb-hero p {
        max-width: 840px;
        margin: 8px auto 0;
        color: #dadde4;
    }

    .rb-card,
    .rb-source-card {
        margin-bottom: 20px;
        padding: 23px;
        overflow: hidden;
        background: linear-gradient(145deg, var(--rb-card), var(--rb-soft));
        border: 1px solid var(--rb-border);
        border-radius: 13px;
        box-shadow: 0 7px 22px rgba(0, 0, 0, 0.18);
    }

    .rb-card h3,
    .rb-source-card h3 {
        position: relative;
        margin: 0 0 18px;
        padding: 0 15px 11px 0;
        color: var(--rb-gold);
        border-bottom: 1px solid rgba(255, 255, 255, 0.09);
        font-size: 19px;
        line-height: 1.55;
    }

    .rb-card h3::before,
    .rb-source-card h3::before {
        content: "";
        position: absolute;
        top: 7px;
        right: 0;
        width: 4px;
        height: 18px;
        background: var(--rb-red);
        border-radius: 4px;
    }

    .rb-card h4 {
        margin: 24px 0 12px;
        color: var(--rb-blue);
        font-size: 16.5px;
        line-height: 1.6;
    }

    .rb-note,
    .rb-warning,
    .rb-info,
    .rb-success,
    .rb-danger {
        margin: 18px 0;
        padding: 15px 17px;
        color: #eceef2;
        background: rgba(0, 0, 0, 0.22);
        border-radius: 9px;
    }

    .rb-note { border-right: 4px solid var(--rb-blue); }
    .rb-warning { border-right: 4px solid var(--rb-orange); }
    .rb-info { border-right: 4px solid var(--rb-gold); }
    .rb-success { border-right: 4px solid var(--rb-green); }
    .rb-danger { border-right: 4px solid var(--rb-red); }

    .rb-code {
        direction: ltr;
        unicode-bidi: embed;
        display: inline-block;
        max-width: 100%;
        padding: 2px 7px;
        color: var(--rb-green);
        background: #07080a;
        border: 1px solid rgba(0, 230, 118, 0.14);
        border-radius: 5px;
        font-family: Consolas, Monaco, monospace;
        font-size: 0.92em;
        white-space: nowrap;
    }

    .rb-command {
        direction: ltr;
        unicode-bidi: embed;
        position: relative;
        margin: 16px 0;
        padding: 16px;
        overflow-x: auto;
        color: #c9ffd9;
        background: #07080a;
        border: 1px solid rgba(0, 230, 118, 0.16);
        border-radius: 10px;
        font-family: Consolas, Monaco, monospace;
        font-size: 13.5px;
        line-height: 1.75;
        text-align: left;
        white-space: pre;
        -webkit-overflow-scrolling: touch;
    }

    .rb-command-label {
        direction: rtl;
        display: block;
        margin-bottom: 7px;
        color: var(--rb-muted);
        font-family: "Tajawal", "Cairo", Arial, sans-serif;
        font-size: 12px;
        font-weight: 800;
        text-align: right;
    }

    .rb-step-grid {
        display: grid !important;
        grid-template-columns: 1fr !important;
        gap: 10px !important;
        width: 100% !important;
        margin: 15px 0 0 !important;
        padding: 0 !important;
        direction: rtl !important;
    }

    .rb-step-row {
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

    .rb-step-number {
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
        background: linear-gradient(135deg, var(--rb-red), var(--rb-red-dark)) !important;
        border: 0 !important;
        border-radius: 50% !important;
        font-size: 13px !important;
        font-weight: 900 !important;
        line-height: 28px !important;
        direction: ltr !important;
        text-align: center !important;
        box-shadow: none !important;
    }

    .rb-step-text {
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

    .rb-image {
        margin: 20px 0;
        padding: 7px;
        overflow: hidden;
        background: #0e0f13;
        border: 1px solid rgba(255, 255, 255, 0.10);
        border-radius: 13px;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.22);
    }

    .rb-image img {
        display: block;
        width: 100%;
        height: auto;
        margin: 0;
        object-fit: contain;
        background: #08090c;
        border-radius: 8px;
    }

    .rb-caption {
        margin: 0;
        padding: 10px 10px 4px;
        color: var(--rb-muted);
        font-size: 13px;
        line-height: 1.65;
        text-align: center;
    }

    .rb-table-wrap {
        margin: 18px 0;
        overflow-x: auto;
        background: #0e0f12;
        border: 1px solid rgba(255, 255, 255, 0.10);
        border-radius: 10px;
        -webkit-overflow-scrolling: touch;
    }

    .rpcs3-build-guide table {
        width: 100%;
        min-width: 700px;
        border-collapse: collapse;
        text-align: right;
    }

    .rpcs3-build-guide th {
        padding: 12px;
        color: var(--rb-gold);
        background: #25272d;
        border: 1px solid rgba(255, 255, 255, 0.08);
        white-space: nowrap;
    }

    .rpcs3-build-guide td {
        padding: 11px 12px;
        color: #dfe1e6;
        border: 1px solid rgba(255, 255, 255, 0.07);
        vertical-align: top;
    }

    .rpcs3-build-guide td:first-child {
        direction: ltr;
        width: 180px;
        color: var(--rb-green);
        background: rgba(0, 0, 0, 0.16);
        font-family: Consolas, Monaco, monospace;
        font-weight: 900;
        text-align: center;
        white-space: nowrap;
    }

    .rb-platform-grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 13px;
        margin: 18px 0;
    }

    .rb-platform-card {
        padding: 17px;
        background: rgba(0, 0, 0, 0.20);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 10px;
    }

    .rb-platform-card strong {
        display: block;
        margin-bottom: 7px;
        color: var(--rb-blue);
        font-size: 16px;
    }

    .rb-links {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 11px;
        margin-top: 16px;
    }

    .rb-link {
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

    .rb-link:hover {
        background: linear-gradient(135deg, var(--rb-red), var(--rb-red-dark));
    }

    .rb-footer {
        padding: 17px;
        color: #e1e3e8;
        background: #24262c;
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 10px;
        text-align: center;
    }

    .rb-footer p {
        margin: 0;
    }

    @media (max-width: 760px) {
        .rpcs3-build-guide {
            padding: 14px;
            font-size: 15px;
            border-radius: 12px;
        }

        .rb-hero {
            padding: 19px;
        }

        .rb-hero h2 {
            font-size: 22px;
        }

        .rb-card,
        .rb-source-card {
            padding: 18px;
        }

        .rb-card h3,
        .rb-source-card h3 {
            font-size: 17px;
        }

        .rb-platform-grid,
        .rb-links {
            grid-template-columns: 1fr;
        }

        .rpcs3-build-guide th,
        .rpcs3-build-guide td {
            padding: 10px;
            font-size: 13px;
        }
    }

    @media (max-width: 520px) {
        .rb-step-row {
            grid-template-columns: 30px minmax(0, 1fr) !important;
            column-gap: 8px !important;
            padding: 8px !important;
        }

        .rb-step-number {
            width: 26px !important;
            height: 26px !important;
            line-height: 26px !important;
        }

        .rb-code {
            white-space: normal;
            overflow-wrap: anywhere;
        }

        .rb-command {
            font-size: 12.5px;
        }
    }
</style>

<div class="rpcs3-build-guide">

    <header class="rb-hero"><p>هذا الدليل موجه للمطورين والمستخدمين اللي يحتاجون يبنون RPCS3 بأنفسهم
            للتطوير أو الاختبار. استخدام النسخة الجاهزة يظل الأفضل للمستخدم العادي،
            أما البناء من المصدر فيحتاج أدوات تطوير ومساحة ووقت تجميع.
        </p>
    </header>

    <div class="rb-image">
        <a href="https://github.com/RPCS3/rpcs3" rel="noopener noreferrer" target="_blank">
            <img alt="مستودع RPCS3 الرسمي على GitHub" loading="eager" src="https://opengraph.githubassets.com/1/RPCS3/rpcs3" />
        </a>
        <p class="rb-caption">
            الكود المصدري الرسمي لـ RPCS3 موجود داخل مستودع المشروع على GitHub.
        </p>
    </div>

    <section class="rb-card">
        <h3>مهم قبل البدء</h3>

        <div class="rb-platform-grid">
            <div class="rb-platform-card">
                <strong>Windows وLinux</strong>
                منصات البناء المدعومة رسميًا من فريق RPCS3.
            </div>

            <div class="rb-platform-card">
                <strong>macOS وFreeBSD والمنصات الثانية</strong>
                ممكن يشتغل البناء عليها، لكنها مو مدعومة بنفس مستوى Windows وLinux
                وقد تتعطل تعليماتها مع التحديثات.
            </div>
        </div>

        <div class="rb-warning">
            تعليمات قديمة تعتمد على <span class="rb-code">Qt 6.6.3</span> أو
            <span class="rb-code">CMake 3.16.9</span> أو
            <span class="rb-code">GCC 11</span> و
            <span class="rb-code">Clang 12</span> ما عادت تمثل متطلبات المشروع الحالية.
        </div>

        <div class="rb-note">
            هذا شرح بناء وليس شرح تشغيل ألعاب. المستخدم العادي يحمل آخر Build
            جاهز من صفحة تنزيل RPCS3 الرسمية.
        </div>
    </section>

    <section class="rb-card">
        <h3>المتطلبات الحالية</h3>

        <h4>Windows 10 أو أحدث</h4>

        <div class="rb-table-wrap">
            <table>
                <thead>
                    <tr>
                        <th>الأداة</th>
                        <th>الإصدار المطلوب</th>
                        <th>ملاحظات</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Visual Studio</td>
                        <td>2022 أو 2026</td>
                        <td>حل <span class="rb-code">rpcs3.sln</span> هو المسار المفضل للبناء على Windows.</td>
                    </tr>
                    <tr>
                        <td>CMake</td>
                        <td>3.28.0 أو أحدث</td>
                        <td>اختياري عند استخدام Visual Studio، لكن Visual Studio 2026 يحتاج CMake 4.2.0 أو أحدث.</td>
                    </tr>
                    <tr>
                        <td>Python</td>
                        <td>3.6 أو أحدث</td>
                        <td>لازم يكون مضاف إلى PATH.</td>
                    </tr>
                    <tr>
                        <td>Qt</td>
                        <td>6.11.1</td>
                        <td>ثبت مكون <span class="rb-code">qtmultimedia</span> مع نسخة MSVC.</td>
                    </tr>
                    <tr>
                        <td>Vulkan SDK</td>
                        <td>1.4.341.1</td>
                        <td>استخدم الإصدار المحدد في الدليل؛ الإصدارات المستقبلية قد تسبب فشلًا مؤقتًا بالبناء.</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <h4>Linux</h4>

        <div class="rb-table-wrap">
            <table>
                <thead>
                    <tr>
                        <th>الأداة</th>
                        <th>الإصدار المطلوب</th>
                        <th>ملاحظات</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Clang / GCC</td>
                        <td>Clang 17+ أو GCC 13+</td>
                        <td>هذه الحدود الدنيا الحالية للمترجمات.</td>
                    </tr>
                    <tr>
                        <td>CMake</td>
                        <td>3.28.0 أو أحدث</td>
                        <td>يستخدم لتوليد ملفات البناء.</td>
                    </tr>
                    <tr>
                        <td>Qt</td>
                        <td>6.11.1</td>
                        <td>قد تكون حزم Ubuntu أقدم من المطلوب.</td>
                    </tr>
                    <tr>
                        <td>Vulkan SDK</td>
                        <td>1.4.341.1</td>
                        <td>الإصدارات القديمة ممكن تسبب أخطاء Compile.</td>
                    </tr>
                    <tr>
                        <td>SDL</td>
                        <td>SDL3</td>
                        <td>مطلوب لواجهة FAudio.</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="rb-info">
            مستخدم Nvidia على Linux قد يحتاج تثبيت حزمة
            <span class="rb-code">libglvnd</span>.
        </div>
    </section>

    <section class="rb-card">
        <h3>استنساخ مستودع RPCS3</h3>

        <p>
            استخدم خيار <span class="rb-code">--recurse-submodules</span>
            عشان ينزل المستودع الرئيسي وجميع المكتبات الفرعية من البداية.
        </p>

        <div class="rb-command"><span class="rb-command-label">PowerShell أو Terminal</span>git clone --recurse-submodules https://github.com/RPCS3/rpcs3.git
cd rpcs3
git submodule sync
git submodule update --init --recursive</div>

        <div class="rb-warning">
            تنزيل المستودع بدون Submodules يسبب أخطاء مكتبات مفقودة عند Configure أو Build.
        </div>
    </section>

    <section class="rb-card">
        <h3>بناء RPCS3 على Windows بالطريقة المفضلة</h3>

        <h4>1. تعريف مسار Qt</h4>

        <p>
            عند استخدام حل Visual Studio العادي، عرّف متغير البيئة
            <span class="rb-code">QTDIR</span> على مسار Qt:
        </p>

        <div class="rb-command"><span class="rb-command-label">مثال</span>QTDIR=C:\Qt\6.11.1\msvc2022_64\</div>

        <p>
            تقدر بدل ذلك تستخدم إضافة
            <span class="rb-code">Qt VS Tools</span> داخل Visual Studio.
        </p>

        <h4>2. فتح الحل</h4>

        <div class="rb-step-grid">
            <div class="rb-step-row">
                <span class="rb-step-number">1</span>
                <div class="rb-step-text">افتح Visual Studio.</div>
            </div>

            <div class="rb-step-row">
                <span class="rb-step-number">2</span>
                <div class="rb-step-text">
                    اختر <span class="rb-code">Open a project or solution</span>.
                </div>
            </div>

            <div class="rb-step-row">
                <span class="rb-step-number">3</span>
                <div class="rb-step-text">
                    افتح ملف <span class="rb-code">rpcs3.sln</span> من جذر المستودع.
                </div>
            </div>

            <div class="rb-step-row">
                <span class="rb-step-number">4</span>
                <div class="rb-step-text">
                    من Solution Configurations اختر
                    <span class="rb-code">Release</span>.
                </div>
            </div>
        </div>

        <h4>3. تجهيز LLVM</h4>

        <p>
            تقدر تستخدم مكتبات LLVM الجاهزة لتقليل وقت البناء، أو تبنيها من داخل
            مجموعة المشاريع <span class="rb-code">__BUILD_BEFORE</span>.
        </p>

        <div class="rb-step-grid">
            <div class="rb-step-row">
                <span class="rb-step-number">1</span>
                <div class="rb-step-text">
                    وسع مجموعة <span class="rb-code">__BUILD_BEFORE</span>.
                </div>
            </div>

            <div class="rb-step-row">
                <span class="rb-step-number">2</span>
                <div class="rb-step-text">
                    ابنِ مشروع <span class="rb-code">llvm_build</span>،
                    أو <span class="rb-code">llvm_build_clang_cl</span>
                    لو مركب Clang داخل Visual Studio.
                </div>
            </div>
        </div>

        <div class="rb-info">
            مكتبات LLVM غير المحسنة الخاصة بـ Debug مو متوفرة جاهزة.
            استخدام مكتبات Release داخل Debug يؤدي إلى خطأ
            <span class="rb-code">cannot open file</span>.
        </div>

        <h4>4. بناء المحاكي</h4>

        <div class="rb-step-grid">
            <div class="rb-step-row">
                <span class="rb-step-number">1</span>
                <div class="rb-step-text">
                    تأكد أن Configuration هو <span class="rb-code">Release</span>.
                </div>
            </div>

            <div class="rb-step-row">
                <span class="rb-step-number">2</span>
                <div class="rb-step-text">
                    افتح قائمة <span class="rb-code">Build</span> واختر
                    <span class="rb-code">Build Solution</span>.
                </div>
            </div>

            <div class="rb-step-row">
                <span class="rb-step-number">3</span>
                <div class="rb-step-text">
                    بعد النجاح بتلقى المحاكي داخل
                    <span class="rb-code">&lt;rpcs3_root&gt;\bin</span>.
                </div>
            </div>
        </div>
    </section>

    <section class="rb-card">
        <h3>البناء على Windows باستخدام CMake</h3>

        <p>
            لمسار CMake عرّف متغير البيئة
            <span class="rb-code">Qt6_ROOT</span> بدل
            <span class="rb-code">QTDIR</span>:
        </p>

        <div class="rb-command"><span class="rb-command-label">مثال</span>Qt6_ROOT=C:\Qt\6.11.1\msvc2022_64\</div>

        <h4>Visual Studio CMake</h4>

        <div class="rb-step-grid">
            <div class="rb-step-row">
                <span class="rb-step-number">1</span>
                <div class="rb-step-text">
                    اختر <span class="rb-code">Open a local folder</span>
                    وافتح جذر RPCS3.
                </div>
            </div>

            <div class="rb-step-row">
                <span class="rb-step-number">2</span>
                <div class="rb-step-text">
                    حول العرض إلى <span class="rb-code">CMake Targets View</span>.
                </div>
            </div>

            <div class="rb-step-row">
                <span class="rb-step-number">3</span>
                <div class="rb-step-text">
                    اختر Configuration باسم <span class="rb-code">msvc-release</span>.
                </div>
            </div>

            <div class="rb-step-row">
                <span class="rb-step-number">4</span>
                <div class="rb-step-text">
                    نفذ <span class="rb-code">Configure Cache</span> ثم
                    <span class="rb-code">Build All</span>.
                </div>
            </div>

            <div class="rb-step-row">
                <span class="rb-step-number">5</span>
                <div class="rb-step-text">
                    الناتج يكون داخل
                    <span class="rb-code">&lt;rpcs3_root&gt;\build-msvc\bin</span>.
                </div>
            </div>
        </div>

        <h4>Standalone CMake</h4>

        <div class="rb-command"><span class="rb-command-label">من جذر المستودع</span>cmake --preset msvc
cmake --build --preset msvc-release</div>

        <div class="rb-success">
            الناتج يكون داخل
            <span class="rb-code">&lt;rpcs3_root&gt;\build-msvc\bin</span>.
        </div>
    </section>

    <section class="rb-card">
        <h3>تثبيت متطلبات Linux</h3>

        <h4>Arch Linux</h4>

        <div class="rb-command"><span class="rb-command-label">Terminal</span>sudo pacman -S glew openal cmake ninja vulkan-validation-layers qt6-base qt6-declarative qt6-multimedia qt6-svg sdl3 sndio jack2 base-devel</div>

        <h4>Debian وUbuntu</h4>

        <div class="rb-command"><span class="rb-command-label">Terminal</span>sudo apt-get install build-essential ninja-build libasound2-dev libpulse-dev libopenal-dev libglew-dev zlib1g-dev libedit-dev libvulkan-dev libudev-dev git libevdev-dev libsdl3-dev libjack-dev libsndio-dev libcurl4-openssl-dev qt6-base-dev qt6-base-private-dev qt6-multimedia-dev qt6-svg-dev libxkbcommon-dev</div>

        <div class="rb-warning">
            مستودعات Ubuntu ممكن تكون أقدم من إصدارات Qt وGCC وVulkan وCMake
            المطلوبة للمشروع، لذلك لا تعتمد على رقم الحزمة فقط وتأكد من الإصدار الفعلي.
        </div>

        <h4>Fedora</h4>

        <div class="rb-command"><span class="rb-command-label">Terminal</span>sudo dnf install alsa-lib-devel cmake ninja-build glew glew-devel libatomic libevdev-devel libudev-devel openal-soft-devel qt6-qtbase-devel qt6-qtbase-private-devel vulkan-devel pipewire-jack-audio-connection-kit-devel qt6-qtmultimedia-devel qt6-qtsvg-devel llvm-devel libcurl-devel</div>

        <h4>OpenSUSE</h4>

        <div class="rb-command"><span class="rb-command-label">Terminal</span>sudo zypper install git cmake ninja libasound2 libpulse-devel openal-soft-devel glew-devel zlib-devel libedit-devel vulkan-devel libudev-devel libqt6-qtbase-devel libqt6-qtmultimedia-devel libqt6-qtsvg-devel libQt6Gui-private-headers-devel libevdev-devel libsndio7_1 libjack-devel</div>
    </section>

    <section class="rb-card">
        <h3>بناء وتشغيل RPCS3 على Linux</h3>

        <div class="rb-command"><span class="rb-command-label">من جذر مستودع RPCS3</span>cmake -B build -G Ninja
cmake --build build
./build/bin/rpcs3</div>

        <p>
            لاستخدام Clang بدل المترجم الافتراضي:
        </p>

        <div class="rb-command"><span class="rb-command-label">اختيار Clang</span>CC=clang CXX=clang++ cmake -B build -G Ninja
cmake --build build</div>

        <h4>البناء على ARM</h4>

        <div class="rb-command"><span class="rb-command-label">لتجنب بعض أخطاء NEON</span>cmake -B build -G Ninja -DUSE_NATIVE_INSTRUCTIONS=OFF
cmake --build build</div>

        <div class="rb-info">
            عند استخدام GDB، يوصي الدليل بجعل المصحح يتجاهل إشارة
            <span class="rb-code">SIGSEGV</span> المستخدمة داخليًا:
        </div>

        <div class="rb-command"><span class="rb-command-label">داخل GDB</span>handle SIGSEGV nostop noprint</div>
    </section>

    <section class="rb-card">
        <h3>أهم خيارات CMake</h3>

        <p>
            الخيارات تتغير مع تطوير المشروع، لذلك راجع
            <span class="rb-code">CMakeLists.txt</span> قبل اعتماد أي قيمة في سكربت ثابت.
        </p>

        <div class="rb-table-wrap">
            <table>
                <thead>
                    <tr>
                        <th>الخيار</th>
                        <th>وظيفته</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td>-DUSE_NATIVE_INSTRUCTIONS=</td><td>يبني باستخدام تعليمات المعالج المحلي. مناسب للبناء الشخصي، لكنه غير مناسب للحزم العامة.</td></tr>
                    <tr><td>-DWITH_LLVM=</td><td>تفعيل بناء RPCS3 مع LLVM.</td></tr>
                    <tr><td>-DBUILD_LLVM_SUBMODULE=</td><td>استخدام أو بناء LLVM الموجود ضمن Submodule الخاص بالمشروع.</td></tr>
                    <tr><td>-DUSE_ALSA=</td><td>تفعيل واجهة ALSA الصوتية على Linux.</td></tr>
                    <tr><td>-DUSE_PULSE=</td><td>تفعيل PulseAudio.</td></tr>
                    <tr><td>-DUSE_DISCORD_RPC=</td><td>تفعيل Discord Rich Presence.</td></tr>
                    <tr><td>-DUSE_VULKAN=</td><td>تفعيل دعم Vulkan.</td></tr>
                    <tr><td>-DUSE_SYSTEM_ZLIB=</td><td>استخدام ZLIB من النظام بدل النسخة المضمنة.</td></tr>
                    <tr><td>-DUSE_SYSTEM_LIBPNG=</td><td>استخدام libpng من النظام؛ قد يساعد في تعارض الإصدارات أو الأيقونات السوداء.</td></tr>
                    <tr><td>-DUSE_SYSTEM_FFMPEG=</td><td>استخدام FFmpeg من النظام بدل النسخة المعدلة المضمنة.</td></tr>
                    <tr><td>-DENABLE_AMD_EXTENSIONS=</td><td>تفعيل امتدادات AMD الخاصة.</td></tr>
                    <tr><td>-DENABLE_NV_EXTENSIONS=</td><td>تفعيل امتدادات Nvidia الخاصة.</td></tr>
                </tbody>
            </table>
        </div>

        <div class="rb-warning">
            لا تنسخ خيارات من أدلة قديمة بدون مراجعة. الخيار ممكن ينحذف أو يتغير
            اسمه أو تتغير قيمته الافتراضية في أي تحديث.
        </div>
    </section>

    <section class="rb-card">
        <h3>وش وضع macOS وMSYS2؟</h3>

        <div class="rb-danger">
            أوامر macOS القديمة اللي تعتمد Rosetta وHomebrew x64 وQt 6.6.3،
            وتعليمات MSYS2 المبنية على Qt5 وPython 2، تعتبر مسارات قديمة وغير
            مدعومة رسميًا حاليًا. لا تستخدمها كدليل رئيسي للبناء.
        </div>

        <p>
            المشروع يقبل مساهمات تساعد المنصات الثانية على البناء، لكن فريق التطوير
            يوضح أن الدعم الرسمي للبناء يتركز على Windows وLinux، والمنصات الثانية
            ممكن تنكسر مع تغييرات الكود أو المكتبات.
        </p>
    </section>

    <section class="rb-source-card">
        <h3>المصادر الرسمية</h3>

        <div class="rb-links">
            <a class="rb-link" href="https://github.com/RPCS3/rpcs3/blob/master/BUILDING.md" rel="noopener noreferrer" target="_blank">
                دليل BUILDING.md الحالي
            </a>

            <a class="rb-link" href="https://github.com/RPCS3/rpcs3" rel="noopener noreferrer" target="_blank">
                مستودع RPCS3 الرسمي
            </a>

            <a class="rb-link" href="https://github.com/RPCS3/rpcs3/blob/master/CMakeLists.txt" rel="noopener noreferrer" target="_blank">
                خيارات CMake الحالية
            </a>

            <a class="rb-link" href="https://visualstudio.microsoft.com/" rel="noopener noreferrer" target="_blank">
                Visual Studio الرسمي
            </a>

            <a class="rb-link" href="https://cmake.org/download/" rel="noopener noreferrer" target="_blank">
                تنزيل CMake
            </a>

            <a class="rb-link" href="https://www.python.org/downloads/" rel="noopener noreferrer" target="_blank">
                تنزيل Python
            </a>

            <a class="rb-link" href="https://www.qt.io/download-qt-installer" rel="noopener noreferrer" target="_blank">
                تنزيل Qt
            </a>

            <a class="rb-link" href="https://vulkan.lunarg.com/sdk/home" rel="noopener noreferrer" target="_blank">
                Vulkan SDK من LunarG
            </a>

            <a class="rb-link" href="https://github.com/libsdl-org/SDL/releases" rel="noopener noreferrer" target="_blank">
                إصدارات SDL3
            </a>

            <a class="rb-link" href="https://wiki.rpcs3.net/index.php?title=Building" rel="noopener noreferrer" target="_blank">
                صفحة المنصات الأخرى
            </a>

            <a class="rb-link" href="https://rpcs3.net/download" rel="noopener noreferrer" target="_blank">
                النسخ الجاهزة للمستخدمين
            </a>

            <a class="rb-link" href="https://discord.gg/rpcs3" rel="noopener noreferrer" target="_blank">
                Discord الرسمي للمشروع
            </a>
        </div>
    </section>

    <footer class="rb-footer">
        <p>
            ابدأ من BUILDING.md الموجود في نفس Commit اللي بتبنيه، لأن إصدارات
            Qt وVulkan وCMake وخيارات البناء تتغير مع تحديث المشروع.
        </p>
    </footer>

</div>

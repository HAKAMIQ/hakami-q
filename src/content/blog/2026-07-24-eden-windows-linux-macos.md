---
title: 'طريقة بناء محاكي Eden من المصدر على Windows وLinux وmacOS'
description: 'هذا الدليل مخصص للمطورين والـPackagers فقط. بناء Eden من المصدر يحتاج معرفة بـGit وCMake والمترجمات وحل أخطاء الاعتماديات، وليس الطريقة المناسبة للمستخدم اللي يبي يشغل المحاكي فقط.…'
pubDate: '2026-07-24T17:42:48.443+03:00'
heroImage: '../../assets/blog-placeholder-1.jpg'
heroImageUrl: 'https://eden-emu.dev/assets/logos/named_logo.png'
originalUrl: 'https://hakamiq1.blogspot.com/2026/07/eden-windows-linux-macos.html'
labels: ["NS","PC"]
---

<style>
    .eden-building-guide {
        --eb-red: #ef3027;
        --eb-red-dark: #a81410;
        --eb-blue: #29b6f6;
        --eb-gold: #ffd600;
        --eb-green: #00e676;
        --eb-orange: #ffab40;
        --eb-bg: #101115;
        --eb-card: #191b21;
        --eb-soft: #14161b;
        --eb-border: rgba(255,255,255,.09);
        --eb-text: #f4f4f4;
        --eb-muted: #aeb4bf;

        direction: rtl;
        width: 100%;
        max-width: 980px;
        margin: 0 auto;
        padding: 20px;
        color: var(--eb-text);
        background: var(--eb-bg);
        border: 1px solid var(--eb-border);
        border-radius: 16px;
        box-sizing: border-box;
        font-family: "Tajawal","Cairo",Arial,sans-serif;
        font-size: 16px;
        line-height: 1.9;
        text-align: right;
    }

    .eden-building-guide,
    .eden-building-guide * {
        box-sizing: border-box;
    }

    .eden-building-guide p {
        margin: 0 0 14px;
    }

    .eden-building-guide p:last-child {
        margin-bottom: 0;
    }

    .eden-building-guide a {
        color: var(--eb-blue);
        text-decoration: none;
        font-weight: 800;
    }

    .eden-building-guide a:hover {
        color: var(--eb-gold);
    }

    .eb-hero {
        margin-bottom: 22px;
        padding: 25px;
        text-align: center;
        background:
            radial-gradient(circle at top right, rgba(239,48,39,.18), transparent 42%),
            radial-gradient(circle at bottom left, rgba(41,182,246,.12), transparent 38%),
            linear-gradient(145deg,#1a1c22,#101115);
        border: 1px solid rgba(255,255,255,.09);
        border-radius: 14px;
        box-shadow: 0 10px 28px rgba(0,0,0,.25);
    }

    .eb-badge {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-height: 30px;
        margin-bottom: 10px;
        padding: 4px 14px;
        color: #fff;
        background: linear-gradient(135deg,var(--eb-red),var(--eb-red-dark));
        border: 1px solid rgba(255,255,255,.13);
        border-radius: 999px;
        font-size: 13px;
        font-weight: 800;
    }

    .eb-hero h2 {
        max-width: 870px;
        margin: 7px auto 10px;
        color: var(--eb-blue);
        font-size: 28px;
        line-height: 1.5;
    }

    .eb-hero p {
        max-width: 840px;
        margin: 8px auto 0;
        color: #dadde4;
    }

    .eb-logo {
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 150px;
        margin-bottom: 20px;
        padding: 23px;
        overflow: hidden;
        background:
            radial-gradient(circle,rgba(41,182,246,.09),transparent 58%),
            #0e0f13;
        border: 1px solid rgba(255,255,255,.10);
        border-radius: 13px;
        box-shadow: 0 8px 24px rgba(0,0,0,.22);
    }

    .eb-logo img {
        display: block;
        width: auto;
        max-width: min(100%,520px);
        max-height: 115px;
        height: auto;
        margin: 0;
        object-fit: contain;
    }

    .eb-card,
    .eb-source-card {
        margin-bottom: 20px;
        padding: 23px;
        overflow: hidden;
        background: linear-gradient(145deg,var(--eb-card),var(--eb-soft));
        border: 1px solid var(--eb-border);
        border-radius: 13px;
        box-shadow: 0 7px 22px rgba(0,0,0,.18);
    }

    .eb-card h3,
    .eb-source-card h3 {
        position: relative;
        margin: 0 0 18px;
        padding: 0 15px 11px 0;
        color: var(--eb-gold);
        border-bottom: 1px solid rgba(255,255,255,.09);
        font-size: 19px;
        line-height: 1.55;
    }

    .eb-card h3::before,
    .eb-source-card h3::before {
        content: "";
        position: absolute;
        top: 7px;
        right: 0;
        width: 4px;
        height: 18px;
        background: var(--eb-red);
        border-radius: 4px;
    }

    .eb-card h4 {
        margin: 23px 0 11px;
        color: var(--eb-blue);
        font-size: 16.5px;
        line-height: 1.6;
    }

    .eb-note,
    .eb-warning,
    .eb-info,
    .eb-success,
    .eb-danger {
        margin: 18px 0;
        padding: 15px 17px;
        color: #eceef2;
        background: rgba(0,0,0,.22);
        border-radius: 9px;
    }

    .eb-note { border-right: 4px solid var(--eb-blue); }
    .eb-warning { border-right: 4px solid var(--eb-orange); }
    .eb-info { border-right: 4px solid var(--eb-gold); }
    .eb-success { border-right: 4px solid var(--eb-green); }
    .eb-danger { border-right: 4px solid var(--eb-red); }

    .eb-code {
        direction: ltr;
        unicode-bidi: embed;
        display: inline-block;
        max-width: 100%;
        padding: 2px 7px;
        color: var(--eb-green);
        background: #07080a;
        border: 1px solid rgba(0,230,118,.14);
        border-radius: 5px;
        font-family: Consolas,Monaco,monospace;
        font-size: .92em;
        white-space: nowrap;
    }

    .eb-code-block {
        direction: ltr;
        unicode-bidi: embed;
        display: block;
        width: 100%;
        margin: 13px 0;
        padding: 14px 16px;
        overflow-x: auto;
        color: #d7ffe6;
        background: #07080a;
        border: 1px solid rgba(0,230,118,.15);
        border-radius: 9px;
        font-family: Consolas,Monaco,monospace;
        font-size: 13px;
        line-height: 1.75;
        text-align: left;
        white-space: pre;
        -webkit-overflow-scrolling: touch;
    }

    .eb-method-grid {
        display: grid;
        grid-template-columns: repeat(2,minmax(0,1fr));
        gap: 13px;
        margin: 18px 0;
    }

    .eb-method-card {
        padding: 17px;
        background: rgba(0,0,0,.20);
        border: 1px solid rgba(255,255,255,.08);
        border-radius: 10px;
    }

    .eb-method-card strong {
        display: block;
        margin-bottom: 8px;
        color: var(--eb-blue);
        font-size: 15px;
    }

    .eb-method-card span {
        display: block;
        color: var(--eb-muted);
        font-size: 13px;
    }

    .eb-step-grid {
        display: grid !important;
        grid-template-columns: 1fr !important;
        gap: 10px !important;
        width: 100% !important;
        margin: 15px 0 0 !important;
        padding: 0 !important;
        direction: rtl !important;
    }

    .eb-step-row {
        display: grid !important;
        grid-template-columns: 34px minmax(0,1fr) !important;
        align-items: start !important;
        column-gap: 10px !important;
        width: 100% !important;
        min-width: 0 !important;
        min-height: 48px !important;
        margin: 0 !important;
        padding: 9px 10px !important;
        color: #e2e4e9 !important;
        background: rgba(0,0,0,.20) !important;
        border: 1px solid rgba(255,255,255,.07) !important;
        border-radius: 9px !important;
        direction: rtl !important;
        text-align: right !important;
    }

    .eb-step-number {
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
        background: linear-gradient(135deg,var(--eb-red),var(--eb-red-dark)) !important;
        border: 0 !important;
        border-radius: 50% !important;
        font-size: 13px !important;
        font-weight: 900 !important;
        line-height: 28px !important;
        direction: ltr !important;
        text-align: center !important;
        box-shadow: none !important;
    }

    .eb-step-text {
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
    }

    .eb-output-grid {
        display: grid;
        grid-template-columns: repeat(3,minmax(0,1fr));
        gap: 12px;
        margin: 18px 0;
    }

    .eb-output-card {
        padding: 15px;
        background: rgba(0,0,0,.20);
        border: 1px solid rgba(255,255,255,.08);
        border-radius: 10px;
    }

    .eb-output-card strong {
        display: block;
        margin-bottom: 7px;
        color: var(--eb-gold);
        font-size: 14px;
    }

    .eb-output-card code {
        direction: ltr;
        unicode-bidi: embed;
        display: block;
        color: var(--eb-green);
        font-family: Consolas,Monaco,monospace;
        font-size: 12px;
        line-height: 1.65;
        text-align: left;
        overflow-wrap: anywhere;
    }

    .eb-user-card {
        margin-bottom: 20px;
        padding: 20px;
        background:
            radial-gradient(circle at top left,rgba(255,0,51,.12),transparent 42%),
            linear-gradient(145deg,#1b1d23,#13151a);
        border: 1px solid rgba(255,255,255,.10);
        border-radius: 13px;
        box-shadow: 0 8px 24px rgba(0,0,0,.20);
    }

    .eb-user-label {
        display: inline-flex;
        align-items: center;
        min-height: 28px;
        margin-bottom: 10px;
        padding: 3px 11px;
        color: #fff;
        background: linear-gradient(135deg,#ff0033,#b50024);
        border-radius: 999px;
        font-size: 12px;
        font-weight: 900;
    }

    .eb-user-card h3 {
        margin: 0 0 10px;
        color: var(--eb-gold);
        font-size: 20px;
        line-height: 1.65;
    }

    .eb-user-button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-height: 42px;
        padding: 8px 16px;
        color: #fff !important;
        background: linear-gradient(135deg,#ff0033,#b50024);
        border: 1px solid rgba(255,255,255,.12);
        border-radius: 9px;
        font-size: 14px;
        font-weight: 900;
    }

    .eb-user-button:hover {
        color: #fff !important;
        filter: brightness(1.08);
    }

    .eb-links {
        display: grid;
        grid-template-columns: repeat(2,minmax(0,1fr));
        gap: 11px;
        margin-top: 16px;
    }

    .eb-link {
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 45px;
        padding: 9px 13px;
        color: #fff !important;
        background: rgba(0,0,0,.23);
        border: 1px solid rgba(255,255,255,.09);
        border-radius: 9px;
        text-align: center;
    }

    .eb-link:hover {
        background: linear-gradient(135deg,var(--eb-red),var(--eb-red-dark));
    }

    .eb-footer {
        padding: 17px;
        color: #e1e3e8;
        background: #24262c;
        border: 1px solid rgba(255,255,255,.08);
        border-radius: 10px;
        text-align: center;
    }

    .eb-footer p {
        margin: 0;
    }

    @media (max-width:760px) {
        .eden-building-guide {
            padding: 14px;
            font-size: 15px;
            border-radius: 12px;
        }

        .eb-hero {
            padding: 19px;
        }

        .eb-hero h2 {
            font-size: 22px;
        }

        .eb-card,
        .eb-source-card,
        .eb-user-card {
            padding: 18px;
        }

        .eb-card h3,
        .eb-source-card h3 {
            font-size: 17px;
        }

        .eb-method-grid,
        .eb-output-grid,
        .eb-links {
            grid-template-columns: 1fr;
        }
    }

    @media (max-width:520px) {
        .eb-step-row {
            grid-template-columns: 30px minmax(0,1fr) !important;
            column-gap: 8px !important;
            padding: 8px !important;
        }

        .eb-step-number {
            width: 26px !important;
            height: 26px !important;
            line-height: 26px !important;
        }

        .eb-code {
            white-space: normal;
            overflow-wrap: anywhere;
        }

        .eb-code-block {
            padding: 12px;
            font-size: 12px;
        }
    }
</style>

<div class="eden-building-guide">

    <header class="eb-hero"><p>هذا الدليل مخصص للمطورين والـPackagers فقط. بناء Eden من المصدر
            يحتاج معرفة بـGit وCMake والمترجمات وحل أخطاء الاعتماديات، وليس
            الطريقة المناسبة للمستخدم اللي يبي يشغل المحاكي فقط.
        </p>
    </header>

    <div class="eb-logo">
        <a href="https://git.eden-emu.dev/eden-emu/eden" rel="noopener noreferrer" target="_blank">
            <img alt="شعار محاكي Eden الرسمي" loading="eager" src="https://eden-emu.dev/assets/logos/named_logo.png" />
        </a>
    </div>

    <section class="eb-user-card">
        <span class="eb-user-label">للمستخدم العادي</span>

        <h3>Eden Emulator 2025: تثبيت وتشغيل Switch</h3>

        <p>
            ما تحتاج تبني المشروع من المصدر عشان تستخدم Eden. تابع شرح التثبيت
            والتشغيل الجاهز في قناة HAKAMIQ بدل الدخول في بيئة التطوير.
        </p>

        <a class="eb-user-button" href="https://www.youtube.com/@HAKAMIQ/search?query=Eden%20Emulator%202025" rel="noopener noreferrer" target="_blank">
            فتح الفيديو داخل قناة HAKAMIQ
        </a>
    </section>

    <section class="eb-card">
        <h3>تنبيه المطورين</h3>

        <div class="eb-danger">
            الدعم المخصص لعملية البناء غالبًا يُقدم للمطورين والـPackagers فقط.
            لا تستخدم هذه الخطوات كبديل عن تنزيل Stable أو Nightly الجاهز.
        </div>

        <div class="eb-note">
            تعليمات البناء والاعتماديات تتغير مع تطور المشروع. استخدم صفحة
            المنصة الرسمية وراجع آخر تغييرات المستودع قبل تثبيت نسخ محددة من
            CMake أو Qt أو المترجم.
        </div>
    </section>

    <section class="eb-card">
        <h3>الاعتماديات الأساسية</h3>

        <p>
            تختلف الحزم الدقيقة حسب النظام وطريقة البناء، لكن بيئة التطوير
            تحتاج عادةً العناصر التالية:
        </p>

        <div class="eb-method-grid">
            <div class="eb-method-card">
                <strong>Git</strong>
                لاستنساخ المستودع وتحديث المصدر.
            </div>

            <div class="eb-method-card">
                <strong>CMake حديث</strong>
                لتهيئة المشروع وتوليد ملفات البناء.
            </div>

            <div class="eb-method-card">
                <strong>C++ Toolchain</strong>
                مثل GCC أو Clang أو MSVC/clang-cl حسب النظام.
            </div>

            <div class="eb-method-card">
                <strong>Qt 6 وVulkan</strong>
                لبناء الواجهة الرسومية ومكونات العرض المطلوبة.
            </div>

            <div class="eb-method-card">
                <strong>Ninja أو Generator مناسب</strong>
                حسب طريقة البناء والبيئة المستخدمة.
            </div>

            <div class="eb-method-card">
                <strong>حزم المنصة</strong>
                مكتبات وأدوات إضافية موضحة في صفحة Dependencies الخاصة بنظامك.
            </div>
        </div>

        <div class="eb-warning">
            المشروع رفع الحد الأدنى لـCMake في الإصدارات الحديثة. لا تعتمد على
            قوائم اعتماديات قديمة محفوظة في شروحات أو توزيعات سابقة.
        </div>
    </section>

    <section class="eb-card">
        <h3>استنساخ مصدر Eden</h3>

        <p>
            افتح Terminal أو PowerShell في المكان اللي تبي تحفظ المشروع داخله،
            ثم نفذ:
        </p>

        <pre class="eb-code-block">git clone https://git.eden-emu.dev/eden-emu/eden.git
cd eden</pre>

        <div class="eb-info">
            تقدر تستنسخ المشروع من داخل Qt Creator عبر:
            <span class="eb-code">Create Project → Import Project → Git Clone</span>.
        </div>
    </section>

    <section class="eb-card">
        <h3>بناء Android</h3>

        <p>
            نسخة Android تستخدم مسار بناء مختلف عن نسخ Desktop، لذلك ما تطبق
            عليها خطوات Qt Creator أو CMake العامة الموجودة تحت.
        </p>

        <div class="eb-success">
            افتح دليل <strong>Building for Android</strong> الرسمي والتزم بنسخ
            Android Studio وSDK وNDK وGradle المذكورة فيه.
        </div>
    </section>

    <section class="eb-card">
        <h3>اختيار طريقة التهيئة والبناء</h3>

        <div class="eb-method-grid">
            <div class="eb-method-card">
                <strong>Option A — Qt Creator</strong>
                الطريقة الرسومية الموصى بها على Linux وmacOS وWindows.
                <span>مناسبة لتحرير الكود والتهيئة والبناء والتشغيل من نفس الواجهة.</span>
            </div>

            <div class="eb-method-card">
                <strong>Option B — Command Line</strong>
                الأفضل للـCI والسكربتات والمطور اللي يعرف CMake وGenerators.
                <span>الإعداد يتغير حسب النظام والمترجم.</span>
            </div>

            <div class="eb-method-card">
                <strong>Option C — CLion</strong>
                بيئة JetBrains مع CMake Profiles وToolchains.
                <span>تحتاج ضبط Build Type وGenerator ومسار build.</span>
            </div>

            <div class="eb-method-card">
                <strong>Option D — Visual Studio + clang-cl</strong>
                خيار Windows لاستخدام Visual Studio Generator مع ClangCL.
                <span>موجه للمطورين اللي يحتاجون اختبار clang-cl بدل MSVC.</span>
            </div>
        </div>
    </section>

    <section class="eb-card">
        <h3>Option A — البناء باستخدام Qt Creator</h3>

        <div class="eb-step-grid">
            <div class="eb-step-row">
                <span class="eb-step-number">1</span>
                <div class="eb-step-text">
                    افتح مجلد مصدر Eden أو استنسخه مباشرة من Qt Creator.
                </div>
            </div>

            <div class="eb-step-row">
                <span class="eb-step-number">2</span>
                <div class="eb-step-text">
                    اختر Kit مناسب لنظامك ومعمارية الجهاز.
                </div>
            </div>

            <div class="eb-step-row">
                <span class="eb-step-number">3</span>
                <div class="eb-step-text">
                    خل Build Type على <span class="eb-code">Release</span>
                    للاستخدام الطبيعي، أو Debug فقط عند التشخيص.
                </div>
            </div>

            <div class="eb-step-row">
                <span class="eb-step-number">4</span>
                <div class="eb-step-text">
                    راجع CMake Configuration واترك الخيارات الافتراضية أولًا.
                </div>
            </div>

            <div class="eb-step-row">
                <span class="eb-step-number">5</span>
                <div class="eb-step-text">
                    اضغط <span class="eb-code">Ctrl+B</span>
                    أو أيقونة المطرقة لبدء البناء.
                </div>
            </div>

            <div class="eb-step-row">
                <span class="eb-step-number">6</span>
                <div class="eb-step-text">
                    للتشغيل اضغط <span class="eb-code">Ctrl+R</span>
                    أو أيقونة Play.
                </div>
            </div>
        </div>
    </section>

    <section class="eb-card">
        <h3>Option B — البناء من Command Line</h3>

        <p>
            أمر التهيئة يختلف حسب النظام والـGenerator. المثال التالي يستخدم
            Ninja وRelease على بيئة تدعمه:
        </p>

        <pre class="eb-code-block">cmake -S . -B build -G Ninja -DCMAKE_BUILD_TYPE=Release
cmake --build build --parallel</pre>

        <div class="eb-note">
            الأمر الأساسي المذكور في الدليل هو:
            <span class="eb-code">cmake --build build</span>.
            أضف <span class="eb-code">--parallel</span> مع Ninja أو UNIX Makefiles
            أو Visual Studio 2022 لتسريع البناء إذا كانت الذاكرة والمعالج تسمح.
        </div>

        <div class="eb-warning">
            لا تنسخ Generator من نظام مختلف. اختيار Ninja أو Visual Studio أو
            UNIX Makefiles يعتمد على الأدوات المثبتة عندك.
        </div>
    </section>

    <section class="eb-card">
        <h3>Option C — البناء باستخدام CLion</h3>

        <div class="eb-step-grid">
            <div class="eb-step-row">
                <span class="eb-step-number">1</span>
                <div class="eb-step-text">
                    افتح المشروع داخل CLion وانتظر اكتمال فهرسة المصدر.
                </div>
            </div>

            <div class="eb-step-row">
                <span class="eb-step-number">2</span>
                <div class="eb-step-text">
                    أنشئ CMake Profile باسم
                    <span class="eb-code">Release</span>.
                </div>
            </div>

            <div class="eb-step-row">
                <span class="eb-step-number">3</span>
                <div class="eb-step-text">
                    اختر Toolchain الصحيح واترك Generator تلقائيًا إلا إذا
                    كانت صفحة منصتك تطلب غير ذلك.
                </div>
            </div>

            <div class="eb-step-row">
                <span class="eb-step-number">4</span>
                <div class="eb-step-text">
                    خل Build Directory باسم
                    <span class="eb-code">build</span>.
                </div>
            </div>

            <div class="eb-step-row">
                <span class="eb-step-number">5</span>
                <div class="eb-step-text">
                    اختر Target الخاص بـEden ثم نفذ Build أو Run.
                </div>
            </div>
        </div>
    </section>

    <section class="eb-card">
        <h3>Option D — Visual Studio مع clang-cl</h3>

        <p>
            هذا الخيار مخصص لبناء Windows باستخدام Visual Studio Generator
            مع أداة ClangCL بدل مترجم MSVC الافتراضي.
        </p>

        <pre class="eb-code-block">cmake -S . -B build -G "Visual Studio 17 2022" -A x64 -T ClangCL
cmake --build build --config Release --parallel</pre>

        <div class="eb-warning">
            لازم تكون مكونات C++ وClang tools وWindows SDK مثبتة من Visual Studio
            Installer. لو فشلت التهيئة، ارجع لصفحة Dependencies الخاصة بـWindows.
        </div>
    </section>

    <section class="eb-card">
        <h3>مكان الملف التنفيذي بعد البناء</h3>

        <div class="eb-output-grid">
            <div class="eb-output-card">
                <strong>Windows</strong>
                <code>build/bin/eden.exe</code>
            </div>

            <div class="eb-output-card">
                <strong>macOS</strong>
                <code>build/bin/eden.app/Contents/MacOS/eden</code>
            </div>

            <div class="eb-output-card">
                <strong>Linux والأنظمة الأخرى</strong>
                <code>build/bin/eden</code>
            </div>
        </div>

        <div class="eb-info">
            بعض الـGenerators متعددة الإعدادات قد تضيف مجلدًا خاصًا بـRelease
            حسب طريقة التهيئة. راجع مخرجات CMake لو ما لقيت الملف في المسار المتوقع.
        </div>
    </section>

    <section class="eb-card">
        <h3>حل فشل Initial Configure</h3>

        <div class="eb-step-grid">
            <div class="eb-step-row">
                <span class="eb-step-number">1</span>
                <div class="eb-step-text">
                    راجع دليل Dependencies من البداية وتأكد أن الأدوات موجودة في PATH.
                </div>
            </div>

            <div class="eb-step-row">
                <span class="eb-step-number">2</span>
                <div class="eb-step-text">
                    احذف CPM Cache:
                    <span class="eb-code">.cache/cpm</span>.
                </div>
            </div>

            <div class="eb-step-row">
                <span class="eb-step-number">3</span>
                <div class="eb-step-text">
                    احذف CMake Cache:
                    <span class="eb-code">&lt;build directory&gt;/CMakeCache.txt</span>.
                </div>
            </div>

            <div class="eb-step-row">
                <span class="eb-step-number">4</span>
                <div class="eb-step-text">
                    اقرأ أول Error فعلي في سجل Configure، مو آخر سطر فقط.
                </div>
            </div>

            <div class="eb-step-row">
                <span class="eb-step-number">5</span>
                <div class="eb-step-text">
                    راجع إعدادات CPM لمعرفة هل تحتاج إجبار المشروع على Bundled Package.
                </div>
            </div>

            <div class="eb-step-row">
                <span class="eb-step-number">6</span>
                <div class="eb-step-text">
                    لو استمرت المشكلة، ارفق سجل Configure كامل عند طلب الدعم
                    في Stoat أو Discord الخاص بالمشروع.
                </div>
            </div>
        </div>

        <div class="eb-danger">
            حذف <span class="eb-code">CMakeCache.txt</span> وحده قد ما يكفي إذا
            تغير Generator أو Toolchain. أحيانًا الأفضل حذف مجلد build كامل
            وإنشاؤه من جديد.
        </div>
    </section>

    <section class="eb-card">
        <h3>Caveats الخاصة بالمنصات</h3>

        <p>
            Windows وLinux وmacOS وبقية الأنظمة لها اختلافات في المترجمات
            والمكتبات ومسارات التشغيل والتوقيع وحزم الرسوميات. راجع Caveats
            الخاصة بمنصتك قبل اعتبار أي خطأ مشكلة في كود Eden نفسه.
        </p>
    </section>

    <section class="eb-card">
        <h3>استخدام سكربتات CI</h3>

        <p>
            مستودع Eden يحتوي سكربتات CI تقدر تراجعها لفهم طريقة إعداد بيئات
            البناء الرسمية. على أي POSIX Shell يمكن الاستفادة من:
        </p>

        <pre class="eb-code-block">.ci/common/configure.sh</pre>

        <div class="eb-warning">
            المطورون يشجعون على كتابة سكربتك الخاص اعتمادًا على CMake بدل نسخ
            سكربت CI كامل بدون فهم؛ سكربتات CI قد تحتوي افتراضات خاصة بخوادم البناء.
        </div>
    </section>

    <section class="eb-source-card">
        <h3>المصادر والروابط الرسمية</h3>

        <div class="eb-links">
            <a class="eb-link" href="https://git.eden-emu.dev/eden-emu/eden" rel="noopener noreferrer" target="_blank">
                مستودع Eden الرسمي
            </a>

            <a class="eb-link" href="https://git.eden-emu.dev/eden-emu/eden/wiki/Building-for-Windows.-" rel="noopener noreferrer" target="_blank">
                دليل البناء على Windows
            </a>

            <a class="eb-link" href="https://git.eden-emu.dev/eden-emu/eden/wiki/Building-for-Linux.-" rel="noopener noreferrer" target="_blank">
                دليل البناء على Linux
            </a>

            <a class="eb-link" href="https://git.eden-emu.dev/eden-emu/eden/wiki/Building-for-Android" rel="noopener noreferrer" target="_blank">
                دليل البناء على Android
            </a>

            <a class="eb-link" href="https://git.eden-emu.dev/eden-emu/eden/wiki/?action=_pages" rel="noopener noreferrer" target="_blank">
                جميع صفحات Eden Wiki
            </a>

            <a class="eb-link" href="https://eden-emu.dev/downloads/" rel="noopener noreferrer" target="_blank">
                تنزيل Builds الجاهزة
            </a>

            <a class="eb-link" href="https://git.eden-emu.dev/eden-emu/eden/src/branch/master/.ci" rel="noopener noreferrer" target="_blank">
                سكربتات CI في المستودع
            </a>

            <a class="eb-link" href="https://www.youtube.com/@HAKAMIQ/search?query=Eden%20Emulator%202025" rel="noopener noreferrer" target="_blank">
                شرح Eden في قناة HAKAMIQ
            </a>
        </div>
    </section>

    <footer class="eb-footer">
        <p>
            ابدأ بالاعتماديات الخاصة بمنصتك، ثم استنسخ المصدر وهيئ CMake
            ببيئة صحيحة. عند فشل البناء، اعتمد على أول خطأ فعلي ونظف Cache
            قبل تغيير خيارات عشوائية.
        </p>
    </footer>

</div>

---
title: 'طريقة تشغيل Pretendo واللعب أونلاين على محاكي Cemu'
description: 'Pretendo Network Cemu 2.6 Dumpling 2.7.2 Online Play شرح تجهيز PNID على Wii U، واستخراج ملفات الأونلاين باستخدام Dumpling، ونسخها إلى Cemu، ثم اختيار Pretendo من إعدادات الحساب للع…'
pubDate: '2026-07-25T00:04:37.418+03:00'
updatedDate: '2026-07-25T08:07:00.368+03:00'
heroImage: '../../assets/blog-placeholder-1.jpg'
heroImageUrl: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEisj8LuMAMn0qPbWP4hO5Rzw0ialgZQsOQm06Vkr3ErrIid2BzGImA4kU-OBZw4K3WKVde_0PEFeS4PSE9e_N5vn5Mqi0oUDf-eFKq_W_FZ83sLZAnmgt6lEU1adEYlPRcbQfGfX-m0puArOjYnRSFZKUrgJXfBPJXSRW0yH3qtbrJXaxsuKKnh7YGVwgM/s1600/lgvu65lgvu65lgvu.jpg'
originalUrl: 'https://hakamiq1.blogspot.com/2026/07/pretendo-cemu.html'
labels: ["Nintendo","Wii-U"]
---

<style>
    .cemu-pretendo-guide {
        --cp-red: #ef3027;
        --cp-red-dark: #a81410;
        --cp-blue: #29b6f6;
        --cp-gold: #ffd600;
        --cp-green: #00e676;
        --cp-orange: #ffab40;
        --cp-bg: #101115;
        --cp-card: #191b21;
        --cp-soft: #14161b;
        --cp-border: rgba(255,255,255,.09);
        --cp-text: #f4f4f4;
        --cp-muted: #aeb4bf;

        direction: rtl;
        width: 100%;
        max-width: 1000px;
        margin: 0 auto;
        padding: 20px;
        color: var(--cp-text);
        background: var(--cp-bg);
        border: 1px solid var(--cp-border);
        border-radius: 16px;
        box-sizing: border-box;
        font-family: "Tajawal","Cairo",Arial,sans-serif;
        font-size: 16px;
        line-height: 1.9;
        text-align: right;
    }

    .cemu-pretendo-guide,
    .cemu-pretendo-guide * {
        box-sizing: border-box;
    }

    .cemu-pretendo-guide p {
        margin: 0 0 14px;
    }

    .cemu-pretendo-guide a {
        color: var(--cp-blue);
        text-decoration: none;
        font-weight: 800;
    }

    .cemu-pretendo-guide a:hover {
        color: var(--cp-gold);
    }

    .cp-hero {
        margin-bottom: 20px;
        padding: 25px;
        text-align: center;
        background:
            radial-gradient(circle at top right,rgba(239,48,39,.18),transparent 42%),
            radial-gradient(circle at bottom left,rgba(41,182,246,.12),transparent 38%),
            linear-gradient(145deg,#1a1c22,#101115);
        border: 1px solid rgba(255,255,255,.09);
        border-radius: 14px;
        box-shadow: 0 10px 28px rgba(0,0,0,.25);
    }

    .cp-badges {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 8px;
        margin-bottom: 10px;
    }

    .cp-badge {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-height: 29px;
        padding: 3px 12px;
        color: #fff;
        background: linear-gradient(135deg,var(--cp-red),var(--cp-red-dark));
        border-radius: 999px;
        font-size: 12px;
        font-weight: 900;
    }

    .cp-badge-green {
        background: linear-gradient(135deg,#00b85f,#00783f);
    }

    .cp-badge-blue {
        background: linear-gradient(135deg,#217eb5,#155170);
    }

    .cp-hero h2 {
        max-width: 900px;
        margin: 8px auto 10px;
        color: var(--cp-blue);
        font-size: 28px;
        line-height: 1.5;
    }

    .cp-hero p {
        max-width: 860px;
        margin: 8px auto 0;
        color: #dadde4;
    }

    .cp-card,
    .cp-source-card {
        margin-bottom: 20px;
        padding: 23px;
        overflow: hidden;
        background: linear-gradient(145deg,var(--cp-card),var(--cp-soft));
        border: 1px solid var(--cp-border);
        border-radius: 13px;
        box-shadow: 0 7px 22px rgba(0,0,0,.18);
    }

    .cp-card h3,
    .cp-source-card h3 {
        position: relative;
        margin: 0 0 18px;
        padding: 0 15px 11px 0;
        color: var(--cp-gold);
        border-bottom: 1px solid rgba(255,255,255,.09);
        font-size: 19px;
        line-height: 1.55;
    }

    .cp-card h3::before,
    .cp-source-card h3::before {
        content: "";
        position: absolute;
        top: 7px;
        right: 0;
        width: 4px;
        height: 18px;
        background: var(--cp-red);
        border-radius: 4px;
    }

    .cp-card h4 {
        margin: 22px 0 10px;
        color: var(--cp-blue);
        font-size: 16.5px;
        line-height: 1.6;
    }

    .cp-note,
    .cp-info,
    .cp-warning,
    .cp-success,
    .cp-danger {
        margin: 17px 0;
        padding: 15px 17px;
        color: #eceef2;
        background: rgba(0,0,0,.22);
        border-radius: 9px;
    }

    .cp-note { border-right: 4px solid var(--cp-blue); }
    .cp-info { border-right: 4px solid var(--cp-gold); }
    .cp-warning { border-right: 4px solid var(--cp-orange); }
    .cp-success { border-right: 4px solid var(--cp-green); }
    .cp-danger { border-right: 4px solid var(--cp-red); }

    .cp-inline {
        direction: ltr;
        unicode-bidi: isolate;
        display: inline-block;
        max-width: 100%;
        padding: 2px 7px;
        color: var(--cp-green);
        background: #07080a;
        border: 1px solid rgba(0,230,118,.14);
        border-radius: 5px;
        font-family: Consolas,Monaco,monospace;
        font-size: .92em;
        white-space: nowrap;
    }

    .cp-grid-2,
    .cp-grid-3,
    .cp-links {
        display: grid;
        gap: 12px;
        margin: 17px 0;
    }

    .cp-grid-2,
    .cp-links {
        grid-template-columns: repeat(2,minmax(0,1fr));
    }

    .cp-grid-3 {
        grid-template-columns: repeat(3,minmax(0,1fr));
    }

    .cp-mini,
    .cp-requirement,
    .cp-file-card,
    .cp-problem {
        min-width: 0;
        padding: 16px;
        background: rgba(0,0,0,.20);
        border: 1px solid rgba(255,255,255,.08);
        border-radius: 10px;
    }

    .cp-mini strong,
    .cp-requirement strong,
    .cp-file-card strong,
    .cp-problem strong {
        display: block;
        margin-bottom: 7px;
        color: var(--cp-blue);
        font-size: 15px;
    }

    .cp-file-card {
        border-top: 3px solid var(--cp-green);
    }

    .cp-file-card strong {
        color: var(--cp-green);
    }

    .cp-file-card code {
        direction: ltr;
        unicode-bidi: isolate;
        display: block;
        color: #c8f9db;
        font-family: Consolas,Monaco,monospace;
        font-size: 12px;
        line-height: 1.7;
        text-align: left;
        overflow-wrap: anywhere;
    }

    .cp-button-row {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin: 14px 0 0;
    }

    .cp-button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-height: 40px;
        padding: 7px 13px;
        color: #fff !important;
        background: linear-gradient(135deg,#1269a0,#0b466e);
        border: 1px solid rgba(255,255,255,.11);
        border-radius: 8px;
        font-size: 13px;
        font-weight: 900;
        text-align: center;
    }

    .cp-button-green {
        background: linear-gradient(135deg,#00a95a,#006f3b);
    }

    .cp-button-red {
        background: linear-gradient(135deg,var(--cp-red),var(--cp-red-dark));
    }

    .cp-button:hover {
        color: #fff !important;
        filter: brightness(1.08);
    }

    .cp-step-grid {
        display: grid !important;
        grid-template-columns: 1fr !important;
        gap: 10px !important;
        width: 100% !important;
        margin: 15px 0 0 !important;
        padding: 0 !important;
        direction: rtl !important;
    }

    .cp-step-row {
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

    .cp-step-number {
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
        background: linear-gradient(135deg,var(--cp-red),var(--cp-red-dark)) !important;
        border: 0 !important;
        border-radius: 50% !important;
        font-size: 13px !important;
        font-weight: 900 !important;
        line-height: 28px !important;
        direction: ltr !important;
        text-align: center !important;
    }

    .cp-step-text {
        grid-column: 2 !important;
        min-width: 0 !important;
        margin: 0 !important;
        padding: 1px 0 0 !important;
        color: #e2e4e9 !important;
        line-height: 1.85 !important;
        direction: rtl !important;
        text-align: right !important;
        overflow-wrap: anywhere !important;
    }

    .cp-step-media {
        grid-column: 1 / -1 !important;
        display: grid !important;
        grid-template-columns: 1fr !important;
        gap: 10px !important;
        width: 100% !important;
        margin: 10px 0 2px !important;
    }

    .cp-step-media-2 {
        grid-template-columns: repeat(2,minmax(0,1fr)) !important;
    }

    .cp-shot {
        min-width: 0;
        overflow: hidden;
        background: #0b0d11;
        border: 1px solid rgba(255,255,255,.10);
        border-radius: 10px;
        box-shadow: 0 6px 18px rgba(0,0,0,.18);
    }

    .cp-shot .cp-image-viewer {
        display: block;
        overflow: hidden;
        background: #08090c;
    }

    .cp-shot img {
        display: block;
        width: 100%;
        max-height: 620px;
        height: auto;
        margin: 0;
        object-fit: contain;
        background: #08090c;
    }

    .cp-shot p {
        margin: 0 !important;
        padding: 9px 11px 10px;
        color: var(--cp-muted);
        font-size: 12.5px;
        line-height: 1.65;
        text-align: center;
    }

    .cp-cover {
        margin: 0 0 20px;
    }

    .cp-cover img {
        max-height: 720px;
    }

    .cp-path {
        direction: ltr;
        unicode-bidi: isolate;
        display: block;
        width: 100%;
        margin: 11px 0;
        padding: 12px 14px;
        overflow-x: auto;
        color: var(--cp-green);
        background: #07080a;
        border: 1px solid rgba(0,230,118,.14);
        border-radius: 8px;
        font-family: Consolas,Monaco,monospace;
        font-size: 13px;
        line-height: 1.7;
        text-align: left;
        white-space: nowrap;
    }

    .cp-flow {
        display: grid;
        grid-template-columns: repeat(3,minmax(0,1fr));
        gap: 10px;
        margin: 17px 0;
        direction: rtl;
    }

    .cp-flow-card {
        position: relative;
        min-width: 0;
        padding: 15px;
        color: #e6e8ed;
        background: rgba(0,0,0,.22);
        border: 1px solid rgba(255,255,255,.08);
        border-radius: 10px;
        direction: rtl;
        text-align: center;
    }

    .cp-flow-card strong {
        display: block;
        margin-bottom: 5px;
        color: var(--cp-blue);
    }

    .cp-flow-card:not(:last-child)::after {
        content: "←";
        position: absolute;
        top: 50%;
        right: auto;
        left: -15px;
        z-index: 2;
        color: var(--cp-gold);
        font-size: 21px;
        font-weight: 900;
        transform: translateY(-50%);
    }

    .cp-link {
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

    .cp-link:hover {
        background: linear-gradient(135deg,var(--cp-red),var(--cp-red-dark));
    }

    .cp-footer {
        padding: 17px;
        color: #e1e3e8;
        background: #24262c;
        border: 1px solid rgba(255,255,255,.08);
        border-radius: 10px;
        text-align: center;
    }

    @media (max-width:760px) {
        .cemu-pretendo-guide {
            padding: 14px;
            font-size: 15px;
            border-radius: 12px;
        }

        .cp-hero {
            padding: 19px;
        }

        .cp-hero h2 {
            font-size: 22px;
        }

        .cp-card,
        .cp-source-card {
            padding: 18px;
        }

        .cp-grid-2,
        .cp-grid-3,
        .cp-links,
        .cp-step-media-2,
        .cp-flow {
            grid-template-columns: 1fr !important;
        }

        .cp-flow-card:not(:last-child)::after {
            content: "↓";
            top: auto;
            right: auto;
            left: 50%;
            bottom: -21px;
            transform: translateX(-50%);
        }
    }

    @media (max-width:520px) {
        .cp-step-row {
            grid-template-columns: 30px minmax(0,1fr) !important;
            column-gap: 8px !important;
            padding: 8px !important;
        }

        .cp-step-number {
            width: 26px !important;
            height: 26px !important;
            line-height: 26px !important;
        }

        .cp-inline {
            white-space: normal;
            overflow-wrap: anywhere;
        }

        .cp-button-row {
            flex-direction: column;
        }

        .cp-button {
            width: 100%;
        }
    }


.cp-image-viewer{
    position:relative!important;
    display:flex!important;
    align-items:center!important;
    justify-content:center!important;
    width:100%!important;
    min-height:0!important;
    margin:0!important;
    padding:0!important;
    overflow:hidden!important;
    color:inherit!important;
    background:#08090c!important;
    border:0!important;
    border-radius:inherit!important;
    box-shadow:none!important;
    cursor:zoom-in!important;
    appearance:none!important;
    -webkit-appearance:none!important
}
.cp-image-viewer::after{
    content:"عرض بالحجم الطبيعي";
    position:absolute;
    left:10px;
    bottom:10px;
    z-index:3;
    min-height:29px;
    padding:4px 10px;
    color:#fff;
    background:rgba(8,9,12,.84);
    border:1px solid rgba(255,255,255,.17);
    border-radius:7px;
    font-family:"Tajawal","Cairo",Arial,sans-serif;
    font-size:11px;
    font-weight:900;
    line-height:1.45;
    direction:rtl;
    pointer-events:none
}
.cp-image-viewer img{
    display:block!important;
    width:100%!important;
    max-width:100%!important;
    height:auto!important;
    max-height:720px!important;
    margin:0 auto!important;
    object-fit:contain!important;
    object-position:center!important;
    background:#08090c!important;
    transition:transform .2s ease,filter .2s ease!important
}
.cp-image-viewer:hover img{
    transform:scale(1.012);
    filter:brightness(1.04)
}
.cp-lightbox{
    position:fixed;
    inset:0;
    z-index:2147483646;
    display:none;
    align-items:center;
    justify-content:center;
    padding:62px 18px 20px;
    background:rgba(0,0,0,.95);
    backdrop-filter:blur(6px);
    -webkit-backdrop-filter:blur(6px)
}
.cp-lightbox.is-open{display:flex}
.cp-lightbox-stage{
    display:flex;
    align-items:center;
    justify-content:center;
    width:min(96vw,1700px);
    height:calc(100vh - 86px)
}
.cp-lightbox-image{
    display:block;
    max-width:100%;
    max-height:100%;
    width:auto;
    height:auto;
    margin:0;
    object-fit:contain;
    background:#07080a;
    border:1px solid rgba(255,255,255,.14);
    border-radius:10px;
    box-shadow:0 18px 60px rgba(0,0,0,.58)
}
.cp-lightbox-close{
    position:fixed;
    top:13px;
    right:14px;
    z-index:2147483647;
    display:inline-flex;
    align-items:center;
    justify-content:center;
    width:42px;
    height:42px;
    margin:0;
    padding:0;
    color:#fff;
    background:#ef3027;
    border:1px solid rgba(255,255,255,.20);
    border-radius:50%;
    font-family:Arial,sans-serif;
    font-size:26px;
    font-weight:900;
    line-height:1;
    cursor:pointer;
    appearance:none;
    -webkit-appearance:none
}
.cp-lightbox-caption{
    position:fixed;
    top:18px;
    right:70px;
    left:70px;
    z-index:2147483647;
    overflow:hidden;
    color:#fff;
    font-family:"Tajawal","Cairo",Arial,sans-serif;
    font-size:13px;
    font-weight:800;
    line-height:1.5;
    text-align:center;
    text-overflow:ellipsis;
    white-space:nowrap;
    pointer-events:none
}
@media(max-width:600px){
    .cp-image-viewer::after{
        left:7px;
        bottom:7px;
        min-height:27px;
        padding:3px 8px;
        font-size:10.5px
    }
    .cp-image-viewer img{
        width:100%!important;
        max-height:none!important
    }
    .cp-lightbox{padding:54px 8px 10px}
    .cp-lightbox-stage{width:100%;height:calc(100vh - 66px)}
    .cp-lightbox-close{top:8px;right:8px;width:38px;height:38px}
    .cp-lightbox-caption{top:13px;right:54px;left:54px;font-size:11.5px}
}
</style>
<div class="cemu-pretendo-guide">
<header class="cp-hero">
<div class="cp-badges">
<span class="cp-badge">Pretendo Network</span>
<span class="cp-badge cp-badge-green">Cemu 2.6</span>
<span class="cp-badge cp-badge-blue">Dumpling 2.7.2</span>
<span class="cp-badge">Online Play</span></div><p>
            شرح تجهيز PNID على Wii U، واستخراج ملفات الأونلاين باستخدام Dumpling،
            ونسخها إلى Cemu، ثم اختيار Pretendo من إعدادات الحساب للعب مع مستخدمي
            المحاكي وأجهزة Wii U الحقيقية.
        </p>
</header>
<figure class="cp-shot cp-cover">
<button aria-label="عرض الصورة بحجمها الطبيعي" class="cp-image-viewer" data-full="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEisj8LuMAMn0qPbWP4hO5Rzw0ialgZQsOQm06Vkr3ErrIid2BzGImA4kU-OBZw4K3WKVde_0PEFeS4PSE9e_N5vn5Mqi0oUDf-eFKq_W_FZ83sLZAnmgt6lEU1adEYlPRcbQfGfX-m0puArOjYnRSFZKUrgJXfBPJXSRW0yH3qtbrJXaxsuKKnh7YGVwgM/s1600/lgvu65lgvu65lgvu.jpg" type="button"><img alt="تشغيل Pretendo واللعب أونلاين على محاكي Cemu" loading="eager" src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEisj8LuMAMn0qPbWP4hO5Rzw0ialgZQsOQm06Vkr3ErrIid2BzGImA4kU-OBZw4K3WKVde_0PEFeS4PSE9e_N5vn5Mqi0oUDf-eFKq_W_FZ83sLZAnmgt6lEU1adEYlPRcbQfGfX-m0puArOjYnRSFZKUrgJXfBPJXSRW0yH3qtbrJXaxsuKKnh7YGVwgM/s1600/lgvu65lgvu65lgvu.jpg" /></button>
<p>تشغيل Pretendo Network داخل Cemu باستخدام ملفات PNID المستخرجة من جهاز Wii U.</p>
</figure>
<section class="cp-card">
<h3>تصحيح مهم حول إصدارات Cemu</h3>
<p>
            صفحة Pretendo الرسمية ما زالت تحتوي فقرة قديمة تذكر إصدارات
            Cemu 2.0 التجريبية. هذا الجزء فقط لم يعد مواكبًا للإصدارات الحالية.
            دعم Pretendo مدمج داخل Cemu، ومنذ Cemu 2.1 أصبح للمحاكي مسار إصدار
            واحد بدل تقسيم Stable وExperimental.
        </p>
<div class="cp-success">
            استخدم أحدث إصدار رسمي من Cemu. وقت إعداد هذا الموضوع أحدث إصدار
            هو <span class="cp-inline">Cemu 2.6</span>.
        </div>
<div class="cp-button-row">
<a class="cp-button cp-button-green" href="https://github.com/cemu-project/Cemu/releases/latest" rel="noopener noreferrer" target="_blank">
                تحميل أحدث Cemu
            </a>
<a class="cp-button" href="https://github.com/cemu-project/Cemu" rel="noopener noreferrer" target="_blank">
                مستودع Cemu الرسمي
            </a>
</div>
</section>
<section class="cp-card">
<h3>قبل البدء: جهز Pretendo على Wii U</h3>
<p>
            ملفات Cemu المطلوبة لازم تُستخرج من جهاز Wii U حقيقي عليه حساب
            Pretendo PNID شغال ومجرب. ما تقدر إنشاء ملفات الأونلاين من الكمبيوتر
            فقط أو تنزيل ملفات مستخدم آخر.
        </p>
<div class="cp-button-row">
<a class="cp-button cp-button-red" href="https://hakamiq1.blogspot.com/2026/07/pretendo-wii-u-pnid_01417582110.html" rel="noopener noreferrer" target="_blank">
                شرح تثبيت Pretendo على Wii U
            </a>
</div>
<div class="cp-danger">
            لا تشارك <span class="cp-inline">otp.bin</span> أو
            <span class="cp-inline">seeprom.bin</span> أو مجلدات حسابك مع أي شخص.
            هذه ملفات خاصة بجهازك وحسابك.
        </div>
</section>
<section class="cp-card">
<h3>تحذيرات اللعب أونلاين</h3>
<div class="cp-grid-2">
<div class="cp-problem">
<strong>لا تستخدم Cheats أو Mods أونلاين</strong>
                التعديلات التي تعطي أفضلية أو تغير سلوك اللعب قد تسبب حظر حسابك
                أو جهازك من الخدمة.
            </div>
<div class="cp-problem">
<strong>لا تشغل الحساب مرتين</strong>
                تشغيل PNID نفسه على Wii U وCemu في نفس الوقت يطرد أحد الجهازين
                أو كليهما من أغلب الألعاب.
            </div>
<div class="cp-problem">
<strong>لا تفرمت Wii U</strong>
                الفورمات يفصل PNID عن الجهاز، وتحتاج إعادة ربطه واستخراج الملفات
                من جديد.
            </div>
<div class="cp-problem">
<strong>احتفظ بنسخة احتياطية من ملفاتك</strong>
                حذف الحساب أو تغيير إعدادات الجهاز قد يجبرك على إعادة استخراج
                ملفات الأونلاين من نفس Wii U مرة ثانية.
            </div>
</div>
</section>
<section class="cp-card">
<h3>المتطلبات</h3>
<div class="cp-grid-3">
<div class="cp-requirement">
<strong>Wii U حقيقي</strong>
                عليه Pretendo وPNID يعملان بدون مشاكل.
            </div>
<div class="cp-requirement">
<strong>SD أو USB</strong>
                بطاقة SD بنظام FAT32، ويفضل Allocation Size بحجم 32KB.
                Dumpling يدعم أيضًا وحدات USB بنظام FAT32 أو exFAT.
            </div>
<div class="cp-requirement">
<strong>Dumpling 2.7.2</strong>
                لاستخراج ملفات الحساب وشهادات الاتصال المطلوبة لـCemu.
            </div>
</div>
<div class="cp-info">
            مع Dumpling 2.7.2، إذا كنت تستخدم Aroma وبطاقة SD، أعد تشغيل Wii U
            مع الاستمرار على زر R للدخول بدون Aroma، ثم شغل Dumpling من
            <span class="cp-inline">https://dumpingapp.com/</span>.
            السبب هو منع Aroma وDumpling من الوصول إلى بطاقة SD في الوقت نفسه.
            وحدات USB لا تتأثر بنفس طريقة وصول SD.
        </div>
</section>
<section class="cp-card">
<h3>تجهيز الحساب على Wii U</h3>
<div class="cp-step-grid">
<div class="cp-step-row">
<span class="cp-step-number">1</span>
<div class="cp-step-text">
                    شغل Wii U واختر مستخدم PNID الذي تريد استخدامه داخل Cemu.
                </div>
</div>
<div class="cp-step-row">
<span class="cp-step-number">2</span>
<div class="cp-step-text">
                    افتح صورة المستخدم أعلى يسار القائمة.
                </div>
</div>
<div class="cp-step-row">
<span class="cp-step-number">3</span>
<div class="cp-step-text">
                    انزل إلى إعدادات الحساب وفعّل
                    <span class="cp-inline">Save password?</span>.
                </div>
</div>
<div class="cp-step-row">
<span class="cp-step-number">4</span>
<div class="cp-step-text">
                    تأكد أن PNID يدخل إلى خدمة Pretendo بشكل طبيعي على الجهاز
                    قبل استخراج الملفات.
                </div>
</div>
</div>
<div class="cp-warning">
            عند تشغيل Dumpling تأكد أن الحساب المحدد هو PNID، وليس NNID القديم
            أو مستخدمًا محليًا مختلفًا.
        </div>
</section>
<section class="cp-card">
<h3>تشغيل Dumpling</h3>
<div class="cp-step-grid">
<div class="cp-step-row">
<span class="cp-step-number">1</span>
<div class="cp-step-text">
                    وصل بطاقة SD أو USB بجهاز Wii U.
                </div>
</div>
<div class="cp-step-row">
<span class="cp-step-number">2</span>
<div class="cp-step-text">
                    افتح متصفح Wii U وانتقل إلى
                    <span class="cp-inline">https://dumpingapp.com/</span>.
                </div>
</div>
<div class="cp-step-row">
<span class="cp-step-number">3</span>
<div class="cp-step-text">
                    اضغط <span class="cp-inline">Launch Dumpling</span>.
                </div>
<div class="cp-step-media">
<figure class="cp-shot">
<button aria-label="عرض الصورة بحجمها الطبيعي" class="cp-image-viewer" data-full="https://wiiu.cdn.fortheusers.org/packages/dumpling/screen1.png" type="button"><img alt="واجهة تطبيق Dumpling على جهاز Wii U" loading="eager" src="https://wiiu.cdn.fortheusers.org/packages/dumpling/screen1.png" /></button>
<p>إحدى شاشات واجهة Dumpling الرسمية على Wii U.</p>
</figure>
</div>
</div>
<div class="cp-step-row">
<span class="cp-step-number">4</span>
<div class="cp-step-text">
                    إذا تجمد الجهاز أكثر من عشر ثوانٍ، اضغط زر Power أربع ثوانٍ
                    لإعادة التشغيل ثم امسح بيانات حفظ المتصفح وأعد المحاولة.
                </div>
</div>
</div>
</section>
<section class="cp-card">
<h3>استخراج ملفات Pretendo لاستخدامها في Cemu</h3>
<div class="cp-step-grid">
<div class="cp-step-row">
<span class="cp-step-number">1</span>
<div class="cp-step-text">
                    من Dumpling اختر
                    <span class="cp-inline">Dump files to use Cemu online</span>.
                </div>
<div class="cp-step-media cp-step-media-2">
<figure class="cp-shot">
<button aria-label="عرض الصورة بحجمها الطبيعي" class="cp-image-viewer" data-full="https://wiiu.cdn.fortheusers.org/packages/dumpling/screen2.png" type="button"><img alt="قائمة الخيارات داخل تطبيق Dumpling على Wii U" loading="lazy" src="https://wiiu.cdn.fortheusers.org/packages/dumpling/screen2.png" /></button>
<p>واجهة خيارات النسخ داخل Dumpling.</p>
</figure>
<figure class="cp-shot">
<button aria-label="عرض الصورة بحجمها الطبيعي" class="cp-image-viewer" data-full="https://wiiu.cdn.fortheusers.org/packages/dumpling/screen3.png" type="button"><img alt="شاشة تنفيذ عملية النسخ داخل Dumpling" loading="lazy" src="https://wiiu.cdn.fortheusers.org/packages/dumpling/screen3.png" /></button>
<p>شاشة من عملية النسخ باستخدام Dumpling.</p>
</figure>
</div>
</div>
<div class="cp-step-row">
<span class="cp-step-number">2</span>
<div class="cp-step-text">
                    تأكد أن الحساب المختار هو PNID المطلوب.
                </div>
</div>
<div class="cp-step-row">
<span class="cp-step-number">3</span>
<div class="cp-step-text">
                    اضغط Start وانتظر اكتمال استخراج Online Files.
                </div>
</div>
<div class="cp-step-row">
<span class="cp-step-number">4</span>
<div class="cp-step-text">
                    لا تفصل بطاقة SD أو USB أثناء عملية النسخ.
                </div>
</div>
</div>
<div class="cp-success">
            بعد اكتمال العملية تحصل على ملفات الجهاز ومجلد MLC الذي يحتوي
            الحساب والشهادات الضرورية للاتصال.
        </div>
</section>
<section class="cp-card">
<h3>استخراج تطبيق Friend List</h3>
<p>
            هذه الخطوة اختيارية لكنها مفيدة لإضافة الأصدقاء وإدارة القائمة
            من داخل Cemu بدون الرجوع إلى جهاز Wii U.
        </p>
<div class="cp-step-grid">
<div class="cp-step-row">
<span class="cp-step-number">1</span>
<div class="cp-step-text">
                    اختر
                    <span class="cp-inline">Dump Wii U applications</span>.
                </div>
</div>
<div class="cp-step-row">
<span class="cp-step-number">2</span>
<div class="cp-step-text">
                    حدد <span class="cp-inline">Friend List</span>.
                </div>
</div>
<div class="cp-step-row">
<span class="cp-step-number">3</span>
<div class="cp-step-text">
                    اضغط + ثم اختر Confirm لبدء النسخ.
                </div>
</div>
<div class="cp-step-row">
<span class="cp-step-number">4</span>
<div class="cp-step-text">
                    ثبته في Cemu لاحقًا مثل أي System Application عبر ملف
                    <span class="cp-inline">meta.xml</span>.
                </div>
</div>
</div>
</section>
<section class="cp-card">
<h3>نسخ ملفات الأونلاين إلى Cemu</h3>
<div class="cp-flow">
<div class="cp-flow-card">
<strong>SD أو USB</strong>
                ملفات Dumpling
            </div>
<div class="cp-flow-card">
<strong>Cemu Folder</strong>
                otp.bin وseeprom.bin
            </div>
<div class="cp-flow-card">
<strong>MLC Folder</strong>
                مجلدا sys وusr
            </div>
</div>
<div class="cp-step-grid">
<div class="cp-step-row">
<span class="cp-step-number">1</span>
<div class="cp-step-text">
                    اقفل Wii U وانقل بطاقة SD أو USB إلى الكمبيوتر.
                </div>
</div>
<div class="cp-step-row">
<span class="cp-step-number">2</span>
<div class="cp-step-text">
                    شغل Cemu واختر
                    <span class="cp-inline">File → Open Cemu Folder</span>.
                </div>
</div>
<div class="cp-step-row">
<span class="cp-step-number">3</span>
<div class="cp-step-text">
                    انسخ الملفين التاليين من:
                    <span class="cp-inline">/dumpling/Online Files</span>
                    إلى Cemu Folder.
                </div>
</div>
</div>
<div class="cp-grid-2">
<div class="cp-file-card">
<strong>ملف الجهاز الأول</strong>
<code>otp.bin</code>
</div>
<div class="cp-file-card">
<strong>ملف الجهاز الثاني</strong>
<code>seeprom.bin</code>
</div>
</div>
<div class="cp-step-grid">
<div class="cp-step-row">
<span class="cp-step-number">4</span>
<div class="cp-step-text">
                    في Cemu اختر
                    <span class="cp-inline">File → Open MLC Folder</span>.
                </div>
</div>
<div class="cp-step-row">
<span class="cp-step-number">5</span>
<div class="cp-step-text">
                    افتح المسار التالي على SD أو USB:
                </div>
</div>
</div>
<span class="cp-path">/dumpling/Online Files/mlc01/</span>
<div class="cp-step-grid">
<div class="cp-step-row">
<span class="cp-step-number">6</span>
<div class="cp-step-text">
                    انسخ مجلدي <span class="cp-inline">sys</span>
                    و<span class="cp-inline">usr</span>
                    إلى MLC Folder الذي فتحه Cemu.
                </div>
</div>
<div class="cp-step-row">
<span class="cp-step-number">7</span>
<div class="cp-step-text">
                    وافق على Merge وOverwrite إذا طلب Windows ذلك.
                </div>
</div>
</div>
<div class="cp-danger">
            لا تخمن مسارات Cemu يدويًا، خصوصًا مع Installer أو Linux أو Steam Deck.
            استخدم Open Cemu Folder وOpen MLC Folder حتى تنسخ الملفات إلى المسار
            النشط فعلًا.
        </div>
</section>
<section class="cp-card">
<h3>تفعيل Pretendo داخل Cemu</h3>
<div class="cp-step-grid">
<div class="cp-step-row">
<span class="cp-step-number">1</span>
<div class="cp-step-text">
                    افتح <span class="cp-inline">Options → General settings</span>.
                </div>
</div>
<div class="cp-step-row">
<span class="cp-step-number">2</span>
<div class="cp-step-text">
                    انتقل إلى تبويب <span class="cp-inline">Account</span>.
                </div>
</div>
<div class="cp-step-row">
<span class="cp-step-number">3</span>
<div class="cp-step-text">
                    من <span class="cp-inline">Active account</span>
                    اختر حساب PNID الذي استخرجته من Wii U.
                </div>
</div>
<div class="cp-step-row">
<span class="cp-step-number">4</span>
<div class="cp-step-text">
                    من قسم <span class="cp-inline">Network Service</span>
                    اختر <span class="cp-inline">Pretendo</span>.
                </div>
<div class="cp-step-media">
<figure class="cp-shot">
<button aria-label="عرض الصورة بحجمها الطبيعي" class="cp-image-viewer" data-full="https://pretendo.network/assets/images/docs/install/cemu/network-services-settings.webp" type="button"><img alt="اختيار Pretendo من Network Service في إعدادات حساب Cemu" loading="lazy" src="https://pretendo.network/assets/images/docs/install/cemu/network-services-settings.webp" /></button>
<p>
                            اختر PNID من Active account ثم حدد Pretendo من Network Service.
                        </p>
</figure>
</div>
</div>
<div class="cp-step-row">
<span class="cp-step-number">5</span>
<div class="cp-step-text">
                    اقفل نافذة الإعدادات وشغل لعبة مدعومة لاختبار الاتصال.
                </div>
</div>
</div>
<div class="cp-note">
            لإيقاف الاتصال اختر <span class="cp-inline">Offline</span>.
            خيار Custom مخصص لخادم آخر يزودك بملف
            <span class="cp-inline">network_services.xml</span>.
        </div>
</section>
<section class="cp-card">
<h3>كيف تعرف أن الإعداد صحيح؟</h3>
<div class="cp-grid-2">
<div class="cp-mini">
<strong>PNID يظهر في Active account</strong>
                هذا يعني أن مجلد usr وبيانات المستخدم وصلت إلى MLC الصحيح.
            </div>
<div class="cp-mini">
<strong>Pretendo متاح للاختيار</strong>
                هذا يعني أنك تستخدم إصدار Cemu حديث يدعم Network Service.
            </div>
<div class="cp-mini">
<strong>اللعبة تدخل للأونلاين</strong>
                يؤكد أن ملفات الجهاز والحساب والشهادات تعمل.
            </div>
<div class="cp-mini">
<strong>Friend List يعمل</strong>
                يتيح لك إضافة الأصدقاء وإدارتهم من Cemu عند تثبيته.
            </div>
</div>
</section>
<section class="cp-card">
<h3>المشاكل الشائعة</h3>
<div class="cp-grid-2">
<div class="cp-problem">
<strong>PNID غير موجود</strong>
                غالبًا نُسخ usr وsys إلى MLC مختلف، أو تم استخراج حساب آخر داخل Dumpling.
            </div>
<div class="cp-problem">
<strong>Online Mode لا يعمل</strong>
                راجع وجود otp.bin وseeprom.bin داخل Cemu Folder، وتأكد أن النسخ اكتمل.
            </div>
<div class="cp-problem">
<strong>يتم طردك من اللعبة</strong>
                لا تستخدم PNID نفسه على Wii U وCemu في الوقت نفسه.
            </div>
<div class="cp-problem">
<strong>فقد الاتصال بعد فورمات الجهاز</strong>
                أعد ربط PNID على نفس Wii U ثم استخرج Online Files من جديد.
            </div>
<div class="cp-problem">
<strong>اللعبة عالقة في Please wait</strong>
                أغلق Mods وCheats، تأكد من تحديث اللعبة، ثم راجع
                <span class="cp-inline">log.txt</span>.
            </div>
<div class="cp-problem">
<strong>خدمة أو لعبة غير مدعومة</strong>
                راجع صفحة Progress؛ تثبيت Pretendo لا يعني أن كل خوادم Wii U تعمل.
            </div>
</div>
</section>
<section class="cp-card">
<h3>دعم Miiverse داخل Cemu</h3>
<div class="cp-warning">
            دعم Miiverse داخل Cemu محدود جدًا. بعض الميزات الموجودة داخل الألعاب
            قد تعمل، لكن هذا غير مضمون، وتطبيق Miiverse Applet لا يعمل في الإصدارات
            الرسمية حاليًا.
        </div>
</section>
<section class="cp-source-card">
<h3>المصادر والروابط</h3>
<div class="cp-links">
<a class="cp-link" href="https://pretendo.network/docs/install/cemu" rel="noopener noreferrer" target="_blank">
                دليل Pretendo الرسمي لـCemu
            </a>
<a class="cp-link" href="https://cemu.cfw.guide/online-play" rel="noopener noreferrer" target="_blank">
                دليل Online Play
            </a>
<a class="cp-link" href="https://cemu.cfw.guide/dumping-games" rel="noopener noreferrer" target="_blank">
                دليل Dumpling
            </a>
<a class="cp-link" href="https://github.com/cemu-project/Cemu/releases/latest" rel="noopener noreferrer" target="_blank">
                أحدث إصدار Cemu
            </a>
<a class="cp-link" href="https://github.com/dumpling-app/dumpling/releases/latest" rel="noopener noreferrer" target="_blank">
                أحدث إصدار Dumpling
            </a>
<a class="cp-link" href="https://hb-app.store/wiiu/dumpling" rel="noopener noreferrer" target="_blank">
                Dumpling في Homebrew App Store
            </a>
<a class="cp-link" href="https://dumpingapp.com/" rel="noopener noreferrer" target="_blank">
                تشغيل Dumpling من متصفح Wii U
            </a>
<a class="cp-link" href="https://pretendo.network/progress" rel="noopener noreferrer" target="_blank">
                حالة دعم الألعاب والخدمات
            </a>
<a class="cp-link" href="https://forum.pretendo.network/c/support/cemu-support/17" rel="noopener noreferrer" target="_blank">
                قسم دعم Cemu في منتدى Pretendo
            </a>
<a class="cp-link" href="https://hakamiq1.blogspot.com/2026/07/pretendo-wii-u-pnid_01417582110.html" rel="noopener noreferrer" target="_blank">
                شرح Pretendo على Wii U
            </a>
<a class="cp-link" href="https://discord.gg/5psYsup" rel="noopener noreferrer" target="_blank">
                Discord الرسمي لـCemu
            </a>
</div>
</section>
<footer class="cp-footer">
        جهز PNID على Wii U، استخرج Online Files عبر Dumpling، انسخ ملفات الجهاز
        إلى Cemu Folder ومجلدي sys وusr إلى MLC، ثم اختر PNID وPretendo من Account.
    </footer>
</div>

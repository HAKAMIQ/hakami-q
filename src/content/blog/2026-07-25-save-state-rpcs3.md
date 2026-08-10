---
title: 'طريقة استخدام Save State في RPCS3 وإدارة الحالات المحفوظة'
description: 'RPCS3 Save State Multi-Slot SaveState Manager شرح إنشاء Save State وتحميلها، والفرق بينها وبين حفظ اللعبة العادي، وإدارة عدة حالات لكل لعبة، وضبط خيارات Savestate، ومعالجة مشاكل ال…'
pubDate: '2026-07-25T03:10:00.691+03:00'
updatedDate: '2026-07-27T08:08:33.819+03:00'
heroImage: '../../assets/blog-placeholder-1.jpg'
heroImageUrl: '/media/blogger/fd/fd2b1eef1f81358904ee5b48a217ee994570173354f1dd91f60e5a996d03a024.jpg'
originalUrl: 'https://hakamiq1.blogspot.com/2026/07/save-state-rpcs3.html'
labels: ["PlayStation","PS3"]
---

<style>
    .rpcs3-savestate-guide {
        --ss-red: #ef3027;
        --ss-red-dark: #a81410;
        --ss-blue: #29b6f6;
        --ss-gold: #ffd600;
        --ss-green: #00e676;
        --ss-orange: #ffab40;
        --ss-bg: #101115;
        --ss-card: #191b21;
        --ss-soft: #14161b;
        --ss-border: rgba(255,255,255,.09);
        --ss-text: #f4f4f4;
        --ss-muted: #aeb4bf;

        direction: rtl;
        width: 100%;
        max-width: 1040px;
        margin: 0 auto;
        padding: 20px;
        overflow-wrap: anywhere;
        color: var(--ss-text);
        background: var(--ss-bg);
        border: 1px solid var(--ss-border);
        border-radius: 16px;
        box-sizing: border-box;
        font-family: "Tajawal","Cairo",Arial,sans-serif;
        font-size: 16px;
        line-height: 1.9;
        text-align: right;
    }

    .rpcs3-savestate-guide,
    .rpcs3-savestate-guide * {
        box-sizing: border-box;
    }

    .rpcs3-savestate-guide p {
        margin: 0 0 14px;
    }

    .rpcs3-savestate-guide figure {
        margin: 0;
    }

    .rpcs3-savestate-guide img {
        max-width: 100%;
    }

    .rpcs3-savestate-guide a {
        color: var(--ss-blue);
        text-decoration: none;
        font-weight: 800;
    }

    .rpcs3-savestate-guide a:hover {
        color: var(--ss-gold);
    }

    .ss-hero {
        margin-bottom: 20px;
        padding: 26px;
        overflow: hidden;
        text-align: center;
        background:
            radial-gradient(circle at top right,rgba(239,48,39,.18),transparent 42%),
            radial-gradient(circle at bottom left,rgba(41,182,246,.13),transparent 38%),
            linear-gradient(145deg,#1a1c22,#101115);
        border: 1px solid rgba(255,255,255,.09);
        border-radius: 14px;
        box-shadow: 0 10px 28px rgba(0,0,0,.25);
    }

    .ss-hero-media {
        width: 100%;
        margin: 0 0 16px;
        overflow: hidden;
        background: #080a0d;
        border: 1px solid rgba(255,255,255,.10);
        border-radius: 12px;
        box-shadow: 0 8px 24px rgba(0,0,0,.24);
    }

    .ss-hero-media .ss-image-viewer {
        display: block;
        width: 100%;
    }

    .ss-hero-media img {
        display: block;
        width: 100%;
        height: auto;
        margin: 0;
        object-fit: contain;
        object-position: center;
        background: #080a0d;
    }

    .ss-badges {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 8px;
        width: 100%;
        margin: 0 0 10px;
    }

    .ss-badge {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-height: 29px;
        padding: 3px 12px;
        color: #fff;
        background: linear-gradient(135deg,var(--ss-red),var(--ss-red-dark));
        border-radius: 999px;
        font-size: 12px;
        font-weight: 900;
    }

    .ss-badge-green {
        background: linear-gradient(135deg,#00b85f,#00783f);
    }

    .ss-badge-blue {
        background: linear-gradient(135deg,#217eb5,#155170);
    }

    .ss-hero h2 {
        max-width: 900px;
        margin: 8px auto 10px;
        color: var(--ss-blue);
        font-size: 28px;
        line-height: 1.5;
    }

    .ss-hero p {
        max-width: 860px;
        margin: 8px auto 0;
        color: #dadde4;
    }

    .ss-card,
    .ss-source-card {
        margin-bottom: 20px;
        padding: 23px;
        overflow: hidden;
        background: linear-gradient(145deg,var(--ss-card),var(--ss-soft));
        border: 1px solid var(--ss-border);
        border-radius: 13px;
        box-shadow: 0 7px 22px rgba(0,0,0,.18);
    }

    .ss-card h3,
    .ss-source-card h3 {
        position: relative;
        margin: 0 0 18px;
        padding: 0 15px 11px 0;
        color: var(--ss-gold);
        border-bottom: 1px solid rgba(255,255,255,.09);
        font-size: 20px;
        line-height: 1.55;
    }

    .ss-card h3::before,
    .ss-source-card h3::before {
        content: "";
        position: absolute;
        top: 7px;
        right: 0;
        width: 4px;
        height: 18px;
        background: var(--ss-red);
        border-radius: 4px;
    }

    .ss-card h4 {
        margin: 22px 0 10px;
        color: var(--ss-blue);
        font-size: 16.5px;
        line-height: 1.6;
    }

    .ss-note,
    .ss-info,
    .ss-warning,
    .ss-success,
    .ss-danger {
        margin: 17px 0;
        padding: 15px 17px;
        color: #eceef2;
        background: rgba(0,0,0,.22);
        border-radius: 9px;
    }

    .ss-note { border-right: 4px solid var(--ss-blue); }
    .ss-info { border-right: 4px solid var(--ss-gold); }
    .ss-warning { border-right: 4px solid var(--ss-orange); }
    .ss-success { border-right: 4px solid var(--ss-green); }
    .ss-danger { border-right: 4px solid var(--ss-red); }

    .ss-inline {
        direction: ltr;
        unicode-bidi: isolate;
        display: inline-block;
        max-width: 100%;
        padding: 2px 7px;
        color: var(--ss-green);
        background: #07080a;
        border: 1px solid rgba(0,230,118,.14);
        border-radius: 5px;
        font-family: Consolas,Monaco,monospace;
        font-size: .92em;
        white-space: nowrap;
    }

    .ss-grid-2,
    .ss-grid-3,
    .ss-grid-4,
    .ss-links,
    .ss-shot-grid {
        display: grid;
        gap: 12px;
        margin: 17px 0;
    }

    .ss-grid-2,
    .ss-links,
    .ss-shot-grid {
        grid-template-columns: repeat(2,minmax(0,1fr));
    }

    .ss-grid-3 {
        grid-template-columns: repeat(3,minmax(0,1fr));
    }

    .ss-grid-4 {
        grid-template-columns: repeat(4,minmax(0,1fr));
    }

    .ss-mini,
    .ss-setting,
    .ss-shortcut,
    .ss-problem {
        min-width: 0;
        height: 100%;
        padding: 16px;
        background: rgba(0,0,0,.20);
        border: 1px solid rgba(255,255,255,.08);
        border-radius: 10px;
    }

    .ss-mini strong,
    .ss-setting strong,
    .ss-shortcut strong,
    .ss-problem strong {
        display: block;
        margin-bottom: 7px;
        color: var(--ss-blue);
        font-size: 15px;
    }

    .ss-shortcut {
        text-align: center;
        border-top: 3px solid var(--ss-green);
    }

    .ss-shortcut strong {
        direction: ltr;
        unicode-bidi: isolate;
        color: var(--ss-green);
        font-family: Consolas,Monaco,monospace;
        font-size: 17px;
    }

    .ss-step-grid {
        display: grid !important;
        grid-template-columns: 1fr !important;
        gap: 10px !important;
        width: 100% !important;
        margin: 15px 0 0 !important;
        padding: 0 !important;
        direction: rtl !important;
    }

    .ss-step-row {
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

    .ss-step-number {
        display: inline-flex !important;
        align-items: center !important;
        justify-content: center !important;
        grid-column: 1 !important;
        width: 28px !important;
        height: 28px !important;
        margin: 1px 0 0 !important;
        padding: 0 !important;
        color: #fff !important;
        background: linear-gradient(135deg,var(--ss-red),var(--ss-red-dark)) !important;
        border-radius: 50% !important;
        font-size: 13px !important;
        font-weight: 900 !important;
        line-height: 28px !important;
        direction: ltr !important;
        text-align: center !important;
    }

    .ss-step-text {
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

    .ss-step-media {
        grid-column: 1 / -1 !important;
        display: grid !important;
        grid-template-columns: 1fr !important;
        gap: 10px !important;
        width: 100% !important;
        margin: 10px 0 2px !important;
    }

    .ss-shot-grid {
        grid-template-columns: 1fr;
        align-items: start;
        gap: 14px;
    }

    .ss-shot {
        width: 100%;
        max-width: 920px;
        min-width: 0;
        margin: 0 auto;
        overflow: hidden;
        background: #0b0d11;
        border: 1px solid rgba(255,255,255,.10);
        border-radius: 10px;
        box-shadow: 0 6px 18px rgba(0,0,0,.18);
    }

    .ss-shot .ss-image-viewer {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        min-height: 180px;
        overflow: hidden;
        background: #08090c;
    }

    .ss-shot img {
        display: block;
        width: auto;
        max-width: 100%;
        height: auto;
        max-height: 720px;
        margin: 0 auto;
        object-fit: contain;
        object-position: center;
        background: #08090c;
    }

    .ss-shot p {
        margin: 0 !important;
        padding: 10px 13px 12px;
        color: var(--ss-muted);
        background: #11141a;
        border-top: 1px solid rgba(255,255,255,.08);
        font-size: 12.5px;
        line-height: 1.65;
        text-align: center;
    }

    .ss-path {
        direction: ltr;
        unicode-bidi: isolate;
        display: block;
        width: 100%;
        margin: 10px 0;
        padding: 12px 14px;
        overflow-x: auto;
        color: var(--ss-green);
        background: #07080a;
        border: 1px solid rgba(0,230,118,.14);
        border-radius: 8px;
        font-family: Consolas,Monaco,monospace;
        font-size: 13px;
        line-height: 1.7;
        text-align: left;
        white-space: nowrap;
    }

    .ss-button-row {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin: 14px 0 0;
    }

    .ss-button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-height: 41px;
        padding: 8px 14px;
        color: #fff !important;
        background: linear-gradient(135deg,#1269a0,#0b466e);
        border: 1px solid rgba(255,255,255,.11);
        border-radius: 8px;
        font-size: 13px;
        font-weight: 900;
        text-align: center;
    }

    .ss-button-green {
        background: linear-gradient(135deg,#00a95a,#006f3b);
    }

    .ss-button-red {
        background: linear-gradient(135deg,var(--ss-red),var(--ss-red-dark));
    }

    .ss-button:hover {
        color: #fff !important;
        filter: brightness(1.08);
    }

    .ss-link {
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

    .ss-link:hover {
        background: linear-gradient(135deg,var(--ss-red),var(--ss-red-dark));
    }

    .ss-footer {
        padding: 17px;
        color: #e1e3e8;
        background: #24262c;
        border: 1px solid rgba(255,255,255,.08);
        border-radius: 10px;
        text-align: center;
    }

    @media (max-width:900px) {
        .ss-grid-4 {
            grid-template-columns: repeat(2,minmax(0,1fr));
        }
    }

    @media (max-width:760px) {
        .rpcs3-savestate-guide {
            padding: 12px;
            font-size: 15px;
            border-radius: 12px;
        }

        .ss-hero {
            padding: 12px;
        }

        .ss-hero-media {
            margin-bottom: 12px;
            border-radius: 9px;
        }

        .ss-shot .ss-image-viewer {
            min-height: 120px;
        }

        .ss-shot img {
            width: 100%;
            max-height: none;
        }

        .ss-hero h2 {
            font-size: 22px;
        }

        .ss-card,
        .ss-source-card {
            padding: 16px;
        }

        .ss-grid-2,
        .ss-grid-3,
        .ss-links,
        .ss-shot-grid {
            grid-template-columns: 1fr;
        }

        .ss-path {
            white-space: normal;
            overflow-wrap: anywhere;
        }
    }

    @media (max-width:520px) {
        .ss-grid-4 {
            grid-template-columns: 1fr;
        }

        .ss-step-row {
            grid-template-columns: 30px minmax(0,1fr) !important;
            column-gap: 8px !important;
            padding: 8px !important;
        }

        .ss-step-number {
            width: 26px !important;
            height: 26px !important;
            line-height: 26px !important;
        }

        .ss-inline {
            max-width: 100%;
            white-space: normal;
            overflow-wrap: anywhere;
            word-break: break-word;
        }

        .ss-button-row {
            flex-direction: column;
        }

        .ss-button {
            width: 100%;
        }
    }


.ss-image-viewer{
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
.ss-image-viewer::after{
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
.ss-image-viewer img{
    display:block!important;
    width:auto!important;
    max-width:100%!important;
    height:auto!important;
    max-height:720px!important;
    margin:0 auto!important;
    object-fit:contain!important;
    object-position:center!important;
    background:#08090c!important;
    transition:transform .2s ease,filter .2s ease!important
}
.ss-hero-media .ss-image-viewer img{
    width:100%!important;
    max-height:none!important
}
.ss-image-viewer:hover img{
    transform:scale(1.012);
    filter:brightness(1.04)
}
.ss-lightbox{
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
.ss-lightbox.is-open{display:flex}
.ss-lightbox-stage{
    display:flex;
    align-items:center;
    justify-content:center;
    width:min(96vw,1700px);
    height:calc(100vh - 86px)
}
.ss-lightbox-image{
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
.ss-lightbox-close{
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
.ss-lightbox-caption{
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
    .ss-image-viewer::after{
        left:7px;
        bottom:7px;
        min-height:27px;
        padding:3px 8px;
        font-size:10.5px
    }
    .ss-image-viewer img{
        width:100%!important;
        max-height:none!important
    }
    .ss-lightbox{padding:54px 8px 10px}
    .ss-lightbox-stage{width:100%;height:calc(100vh - 66px)}
    .ss-lightbox-close{top:8px;right:8px;width:38px;height:38px}
    .ss-lightbox-caption{top:13px;right:54px;left:54px;font-size:11.5px}
}
</style>
<div class="rpcs3-savestate-guide">
<header class="ss-hero">
<div class="ss-hero-media">
<button aria-label="عرض الصورة بحجمها الطبيعي" class="ss-image-viewer" data-full="/media/blogger/fd/fd2b1eef1f81358904ee5b48a217ee994570173354f1dd91f60e5a996d03a024.jpg" type="button"><img alt="شرح استخدام Save State في محاكي RPCS3" decoding="async" fetchpriority="high" height="893" loading="eager" src="/media/blogger/fd/fd2b1eef1f81358904ee5b48a217ee994570173354f1dd91f60e5a996d03a024.jpg" width="1600" /></button>
</div>
<div class="ss-badges">
<span class="ss-badge">RPCS3 Save State</span>
<span class="ss-badge ss-badge-green">Multi-Slot</span>
<span class="ss-badge ss-badge-blue">SaveState Manager</span></div>
<p>
            شرح إنشاء Save State وتحميلها، والفرق بينها وبين حفظ اللعبة العادي،
            وإدارة عدة حالات لكل لعبة، وضبط خيارات Savestate، ومعالجة مشاكل
            التوافق وتجهيز تقرير صحيح للمطورين.
        </p>
</header>
<section class="ss-card">
<h3>وش يعني Save State؟</h3>
<p>
            Save State هي لقطة كاملة لحالة المحاكي واللعبة في لحظة محددة.
            عند تحميلها ترجع لنفس المشهد والحركة والقوائم والذاكرة التي كانت
            موجودة وقت إنشاء الحالة.
        </p>
<div class="ss-grid-2">
<div class="ss-mini">
<strong>Save State</strong>
                لقطة من حالة RPCS3 الكاملة، وقد يكون حجمها مئات الميجابايت أو أكثر.
                تعتمد على توافق إصدار المحاكي واللعبة.
            </div>
<div class="ss-mini">
<strong>Save Data</strong>
                الحفظ الطبيعي الذي تنشئه اللعبة داخل نظام PS3، وحجمه أصغر
                وأكثر ملاءمة للنسخ الاحتياطي طويل المدى.
            </div>
</div>
<div class="ss-warning">
            Save State ليست بديلًا عن Save Data. استمر باستخدام نقاط الحفظ
            الطبيعية داخل اللعبة وخذ نسخة احتياطية من Save Data المهمة.
        </div>
</section>
<section class="ss-card">
<h3>تحديث مهم: الدليل القديم ما عاد يغطي كل المزايا</h3>
<p>
            الإصدارات الحديثة من RPCS3 أضافت SaveState Manager وقائمة الحالات
            الأخيرة ودعم Multi-Slot، مع إمكانية إنشاء عدة حالات لكل لعبة
            بدل الاعتماد على ملف واحد فقط.
        </p>
<div class="ss-grid-4">
<div class="ss-setting">
<strong>عدة حالات</strong>
                كل حالة جديدة تحصل على رقم متزايد داخل مجلد اللعبة.
            </div>
<div class="ss-setting">
<strong>SaveState Manager</strong>
                يعرض الحالات، توافقها، تاريخها ومسارها، ويسمح بتشغيلها أو حذفها.
            </div>
<div class="ss-setting">
<strong>حد الملفات</strong>
                الحد الافتراضي المضاف مع Multi-Slot هو 4 ملفات لكل لعبة.
            </div>
<div class="ss-setting">
<strong>حد الحجم</strong>
                الحد الافتراضي الإجمالي المضاف هو 4GB، ثم تُحذف الحالات الأقدم.
            </div>
</div>
<div class="ss-button-row">
<a class="ss-button ss-button-green" href="https://github.com/RPCS3/rpcs3/pull/16611" rel="noopener noreferrer" target="_blank">
                تطوير Multi-Slot الرسمي
            </a>
<a class="ss-button" href="https://github.com/RPCS3/rpcs3/pull/16606" rel="noopener noreferrer" target="_blank">
                تطوير SaveState Manager
            </a>
</div>
</section>
<section class="ss-card">
<h3>إنشاء Save State</h3>
<div class="ss-step-grid">
<div class="ss-step-row">
<span class="ss-step-number">1</span>
<div class="ss-step-text">
                    شغل اللعبة ووصل للمكان اللي تبي تحفظ عنده.
                </div>
</div>
<div class="ss-step-row">
<span class="ss-step-number">2</span>
<div class="ss-step-text">
                    تأكد أن اللعبة ما تعرض علامة Autosave وما تثبت Game Data.
                </div>
</div>
<div class="ss-step-row">
<span class="ss-step-number">3</span>
<div class="ss-step-text">
                    اضغط <span class="ss-inline">Ctrl + S</span>
                    لإنشاء Save State.
                </div>
</div>
<div class="ss-step-row">
<span class="ss-step-number">4</span>
<div class="ss-step-text">
                    انتظر انتهاء Progress Dialog وكتابة الملف بالكامل.
                </div>
</div>
</div>
<div class="ss-danger">
            لا تنشئ Save State أثناء حفظ اللعبة أو أثناء تثبيت بيانات القرص.
            مقاطعة الكتابة في هذي اللحظات قد تسبب حفظًا غير صالح أو تعارضًا
            مع بيانات اللعبة.
        </div>
<div class="ss-info">
            عند استخدام Suspend Emulation Savestate Mode الافتراضي، تنتهي جلسة
            اللعب بعد إنشاء الحالة وتحتاج تشغيلها مرة ثانية من Save State.
        </div>
</section>
<section class="ss-card">
<h3>تحميل Save State</h3>
<div class="ss-step-grid">
<div class="ss-step-row">
<span class="ss-step-number">1</span>
<div class="ss-step-text">
                    اضغط يمين على اللعبة داخل القائمة.
                </div>
</div>
<div class="ss-step-row">
<span class="ss-step-number">2</span>
<div class="ss-step-text">
                    اختر
                    <span class="ss-inline">Boot with last SaveState</span>
                    لتشغيل أحدث حالة مباشرة.
                </div>
</div>
<div class="ss-step-row">
<span class="ss-step-number">3</span>
<div class="ss-step-text">
                    إذا عندك أكثر من حالة اختر
                    <span class="ss-inline">Choose SaveState to boot</span>
                    لفتح المدير واختيار الحالة المطلوبة.
                </div>
</div>
<div class="ss-step-row">
<span class="ss-step-number">4</span>
<div class="ss-step-text">
                    تقدر أيضًا تستخدم
                    <span class="ss-inline">File → Boot Savestate</span>
                    أو تسحب ملف Save State وتفلته داخل نافذة RPCS3.
                </div>
<div class="ss-step-media">
<figure class="ss-shot"><div class="separator" style="clear: both; text-align: center"><a href="/media/blogger/1f/1fec04a70f0f0c6a4dee36224a8d60c12c4e1e8f1700b094206258d61b3bcd38.png" style="margin-left: 1em; margin-right: 1em"><img alt="" data-original-height="455" data-original-width="287" height="240" src="/media/blogger/1f/1fec04a70f0f0c6a4dee36224a8d60c12c4e1e8f1700b094206258d61b3bcd38.png" width="151" /></a></div><br /><br /><p>
                            صورة حقيقية من واجهة RPCS3 توضح Boot Savestate
                            وBoot Recent Savestate داخل قائمة File.
                        </p>
</figure>
</div>
</div>
</div>
</section>
<section class="ss-card">
<h3>اختصارات التحميل السريع</h3>
<div class="ss-grid-4">
<div class="ss-shortcut">
<strong>Ctrl + Alt + 1</strong>
                تحميل أحدث Save State.
            </div>
<div class="ss-shortcut">
<strong>Ctrl + Alt + 2</strong>
                تحميل ثاني أحدث حالة.
            </div>
<div class="ss-shortcut">
<strong>Ctrl + Alt + 3</strong>
                تحميل ثالث أحدث حالة.
            </div>
<div class="ss-shortcut">
<strong>Ctrl + Alt + 4</strong>
                تحميل رابع أحدث حالة.
            </div>
</div>
<div class="ss-note">
            اختصار <span class="ss-inline">Ctrl + R</span> يعتمد على تعطيل
            Suspend Emulation Savestate Mode، ويعمل بعد تشغيل اللعبة؛ ما يعمل
            من قائمة RPCS3 واللعبة مقفلة حسب سلوك الدليل الأصلي.
        </div>
</section>
<section class="ss-card">
<h3>استخدام SaveState Manager</h3>
<p>
            افتح <span class="ss-inline">Manage → Savestates</span>
            لعرض الألعاب التي لديها حالات محفوظة. اختر اللعبة، ثم شغل الحالة
            أو احذفها أو افتح مسارها.
        </p>
<div class="ss-shot">
<button aria-label="عرض الصورة بحجمها الطبيعي" class="ss-image-viewer" data-full="https://github.com/user-attachments/assets/8344e38f-9f09-4022-8809-cc5639b9b445" type="button"><img alt="نافذة SaveState Manager الرسمية داخل RPCS3" decoding="async" loading="lazy" src="https://github.com/user-attachments/assets/8344e38f-9f09-4022-8809-cc5639b9b445" /></button>
<p>
                الصورة الرسمية المرفقة مع Pull Request الذي أضاف SaveState Manager
                لعرض الحالات وتشغيلها وحذفها حسب اللعبة.
            </p>
</div>
<div class="ss-success">
            خانة Compatible مهمة: الحالة غير المتوافقة مع Build الحالي قد ترفض
            التشغيل حتى لو كان الملف موجودًا وسليمًا.
        </div>
</section>
<section class="ss-card">
<h3>مكان ملفات Save State</h3>
<p>
            الإصدارات الحديثة تنظّم الحالات داخل مجلد
            <span class="ss-inline">savestates</span>
            وتضع كل لعبة في مجلد مستقل باسم Serial أو Title ID.
        </p>
<div class="ss-grid-3">
<div class="ss-mini">
<strong>Windows Portable</strong>
                داخل مجلد RPCS3 النشط:
                <span class="ss-path">savestates\TITLE_ID\</span>
</div>
<div class="ss-mini">
<strong>Linux وFreeBSD</strong>
                داخل مجلد إعداد RPCS3:
                <span class="ss-path">~/.config/rpcs3/savestates/TITLE_ID/</span>
</div>
<div class="ss-mini">
<strong>macOS</strong>
                داخل Application Support:
                <span class="ss-path">~/Library/Application Support/rpcs3/savestates/TITLE_ID/</span>
</div>
</div>
<div class="ss-note">
            استخدم SaveState Manager أو Open RPCS3 Folder بدل تخمين المسار،
            خصوصًا عند استخدام Portable User Directory أو أكثر من نسخة RPCS3.
        </div>
</section>
<section class="ss-card">
<h3>خيارات Savestate</h3>
<p>
            تقدر تضبط الخيارات من GUI، أو من قسم Savestate داخل
            <span class="ss-inline">config.yml</span>. إذا اللعبة تستخدم Custom
            Configuration، عدل نفس الخيارات داخل ملف إعدادها المخصص.
        </p>
<div class="ss-grid-2">
<div class="ss-setting">
<strong>Start Paused</strong>
                القيمة الافتراضية False. عند تفعيلها تبدأ الحالة المحملة وهي متوقفة.
            </div>
<div class="ss-setting">
<strong>Suspend Emulation Savestate Mode</strong>
                مفعّل افتراضيًا. يحافظ على أسلوب Suspend الآمن ويستهلك الحالة
                عند التحميل حسب الوضع.
            </div>
<div class="ss-setting">
<strong>Inspection Mode Savestates</strong>
                خيار Debugging للمطورين. المستخدم العادي ما يحتاج يفعله.
            </div>
<div class="ss-setting">
<strong>Maximum SaveState Files / Size</strong>
                يتحكم بعدد الحالات وحجمها الإجمالي قبل حذف الملفات الأقدم تلقائيًا.
            </div>
</div>
<div class="ss-danger">
            تعطيل Suspend Emulation Savestate Mode يسمح بإعادة استخدام الحالة،
            لكن HDD0 State لا يُستعاد بالكامل. لو عدلت اللعبة ملفات HDD0 بعد
            إنشاء الحالة، قد تظهر مشاكل عند تحميلها مرة ثانية.
        </div>
</section>
<section class="ss-card">
<h3>متى ما تستخدم Save State؟</h3>
<div class="ss-grid-2">
<div class="ss-problem">
<strong>أثناء Autosave</strong>
                انتظر اختفاء أيقونة الحفظ قبل الضغط على Ctrl+S.
            </div>
<div class="ss-problem">
<strong>أثناء Manual Save</strong>
                لا تحفظ حالة والمحاكي يكتب Save Data في الوقت نفسه.
            </div>
<div class="ss-problem">
<strong>أثناء تثبيت Game Data</strong>
                انتظر انتهاء التثبيت بالكامل في ألعاب الأقراص.
            </div>
<div class="ss-problem">
<strong>قبل تحديث RPCS3 فقط</strong>
                لا تعتمد على الحالة وحدها؛ بعض التحديثات الكبيرة قد تكسر توافقها.
            </div>
</div>
</section>
<section class="ss-card">
<h3>المشاكل المعروفة والحلول</h3>
<div class="ss-grid-2">
<div class="ss-problem">
<strong>الحالة ما تفتح</strong>
                جرب أحدث Build، راجع Compatible داخل Manager، وتأكد أن اللعبة
                ونفس Serial ما زالا موجودين.
            </div>
<div class="ss-problem">
<strong>الصورة ناقصة بعد التحميل</strong>
                بعض الألعاب قد تستفيد من Write Color Buffers وForce CPU Blit،
                لكن هذي الخيارات تقلل الأداء.
            </div>
<div class="ss-problem">
<strong>اللعبة تنهار بعد دقائق</strong>
                اختبر Save Data العادي، ثم أنشئ حالة جديدة من موقع مختلف داخل اللعبة.
            </div>
<div class="ss-problem">
<strong>الحالة القديمة غير متوافقة</strong>
                احتفظ بالـBuild الذي أنشأها مؤقتًا أو ارجع إلى Save Data طبيعي.
            </div>
<div class="ss-problem">
<strong>الحجم كبير</strong>
                هذا طبيعي في بعض الألعاب؛ قلل Maximum SaveState Files بدل حذف
                الحالات يدويًا كل مرة.
            </div>
<div class="ss-problem">
<strong>المساحة تمتلئ</strong>
                راجع مجلد كل Title ID وحد الحجم الإجمالي في خيارات Savestate.
            </div>
</div>
</section>
<section class="ss-card">
<h3>طريقة الإبلاغ عن مشكلة Save State</h3>
<div class="ss-step-grid">
<div class="ss-step-row">
<span class="ss-step-number">1</span>
<div class="ss-step-text">
                    وصل للمكان الذي تظهر فيه المشكلة.
                </div>
</div>
<div class="ss-step-row">
<span class="ss-step-number">2</span>
<div class="ss-step-text">
                    أوقف المحاكاة عبر <span class="ss-inline">Ctrl + P</span>.
                </div>
</div>
<div class="ss-step-row">
<span class="ss-step-number">3</span>
<div class="ss-step-text">
                    افتح
                    <span class="ss-inline">Utilities → Kernel Explorer → Log All</span>.
                </div>
</div>
<div class="ss-step-row">
<span class="ss-step-number">4</span>
<div class="ss-step-text">
                    أنشئ Save State ولا تقفل RPCS3.
                </div>
</div>
<div class="ss-step-row">
<span class="ss-step-number">5</span>
<div class="ss-step-text">
                    حاول تحميل الحالة، وكرر Pause وLog All إذا أمكن.
                </div>
</div>
<div class="ss-step-row">
<span class="ss-step-number">6</span>
<div class="ss-step-text">
                    بعد ظهور المشكلة اقفل اللعبة والمحاكي وخذ
                    <span class="ss-inline">RPCS3.log.gz</span>.
                </div>
</div>
<div class="ss-step-row">
<span class="ss-step-number">7</span>
<div class="ss-step-text">
                    افتح Issue في GitHub واتبع القالب، واكتب خطوات إعادة المشكلة
                    وموضعها داخل اللعبة.
                </div>
</div>
<div class="ss-step-row">
<span class="ss-step-number">8</span>
<div class="ss-step-text">
                    إذا المشكلة مرتبطة بمرحلة معينة أرفق Save Data العادي، مو ملف
                    Save State فقط.
                </div>
</div>
</div>
<div class="ss-warning">
            لا ترفع ملفات اللعبة أو محتوى محمي بحقوق النشر. المطلوب Log وSave Data
            وخطوات واضحة لإعادة العطل.
        </div>
</section>
<section class="ss-source-card">
<h3>المصادر وروابط التطوير</h3>
<div class="ss-links">
<a class="ss-link" href="https://wiki.rpcs3.net/index.php?title=Help:Save_State" rel="noopener noreferrer" target="_blank">
                دليل Save State في RPCS3 Wiki
            </a>
<a class="ss-link" href="https://github.com/RPCS3/rpcs3/pull/16606" rel="noopener noreferrer" target="_blank">
                Pull Request: SaveState Manager
            </a>
<a class="ss-link" href="https://github.com/RPCS3/rpcs3/pull/16611" rel="noopener noreferrer" target="_blank">
                Pull Request: Multi-Slot Savestates
            </a>
<a class="ss-link" href="https://github.com/RPCS3/rpcs3/pull/17606" rel="noopener noreferrer" target="_blank">
                إصلاحات SaveState Manager
            </a>
<a class="ss-link" href="https://github.com/RPCS3/rpcs3/releases/latest" rel="noopener noreferrer" target="_blank">
                أحدث إصدار RPCS3
            </a>
<a class="ss-link" href="https://github.com/RPCS3/rpcs3/issues" rel="noopener noreferrer" target="_blank">
                الإبلاغ عن مشكلة
            </a>
<a class="ss-link" href="https://forums.rpcs3.net/" rel="noopener noreferrer" target="_blank">
                منتدى RPCS3 الرسمي
            </a>
<a class="ss-link" href="https://discord.gg/RPCS3" rel="noopener noreferrer" target="_blank">
                Discord الرسمي
            </a>
</div>
</section>
<footer class="ss-footer">
        استخدم Save State للاختصارات المؤقتة، واحتفظ دائمًا بـSave Data طبيعي.
        لا تنشئ حالة أثناء الحفظ أو التثبيت، وراجع التوافق بعد تحديث RPCS3.
    </footer>
</div>

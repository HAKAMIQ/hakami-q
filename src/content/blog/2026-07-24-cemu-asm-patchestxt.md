---
title: 'طريقة إنشاء باتشات Cemu بصيغة .asm وتحويل patches.txt'
description: 'Cemu Patches Native .asm Cemu 2.6 PowerPC 32-bit دليل للمطورين يشرح صيغة الباتش الأصلية داخل Cemu 2.x، وتحديد ملفات RPX وRPL عن طريق CRC، وكتابة التعليمات داخل Codecave، واستخدام L…'
pubDate: '2026-07-24T21:04:00.795+03:00'
updatedDate: '2026-07-25T08:33:05.381+03:00'
heroImage: '../../assets/blog-placeholder-1.jpg'
heroImageUrl: 'https://wiki.cemu.info/images/f/f0/GraphicPack_Menu.png'
originalUrl: 'https://hakamiq1.blogspot.com/2026/07/cemu-asm-patchestxt.html'
labels: ["Nintendo","Wii-U"]
---

<style>
    .cemu-patches-guide {
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

    .cemu-patches-guide,
    .cemu-patches-guide * {
        box-sizing: border-box;
    }

    .cemu-patches-guide p {
        margin: 0 0 14px;
    }

    .cemu-patches-guide a {
        color: var(--cp-blue);
        text-decoration: none;
        font-weight: 800;
    }

    .cemu-patches-guide a:hover {
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

    .cp-badge-row {
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

    .cp-hero h2 {
        max-width: 900px;
        margin: 8px auto 10px;
        color: var(--cp-blue);
        font-size: 28px;
        line-height: 1.5;
    }

    .cp-hero p {
        max-width: 850px;
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

    .cp-code-wrap {
        position: relative;
        margin: 14px 0;
        overflow: hidden;
        background: #07080a;
        border: 1px solid rgba(0,230,118,.14);
        border-radius: 10px;
    }

    .cp-code-title {
        direction: ltr;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        gap: 10px;
        min-height: 35px;
        padding: 7px 12px;
        color: #cfd4dc;
        background: #202329;
        border-bottom: 1px solid rgba(255,255,255,.08);
        font-family: Consolas,Monaco,monospace;
        font-size: 11.5px;
        text-align: left;
    }

    .cp-code-title span:last-child {
        color: var(--cp-muted);
    }

    .cp-code-block {
        direction: ltr;
        unicode-bidi: embed;
        display: block;
        width: 100%;
        margin: 0;
        padding: 15px 16px;
        overflow-x: auto;
        color: #d7ffe6;
        background: #07080a;
        border: 0;
        font-family: Consolas,Monaco,monospace;
        font-size: 13px;
        line-height: 1.75;
        text-align: left;
        white-space: pre;
        tab-size: 4;
        -webkit-overflow-scrolling: touch;
    }

    .cp-grid-2,
    .cp-grid-3,
    .cp-directives,
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

    .cp-directives {
        grid-template-columns: repeat(4,minmax(0,1fr));
    }

    .cp-mini,
    .cp-directive,
    .cp-rule,
    .cp-check {
        min-width: 0;
        padding: 16px;
        background: rgba(0,0,0,.20);
        border: 1px solid rgba(255,255,255,.08);
        border-radius: 10px;
    }

    .cp-mini strong,
    .cp-directive strong,
    .cp-rule strong,
    .cp-check strong {
        display: block;
        margin-bottom: 7px;
        color: var(--cp-blue);
        font-size: 15px;
    }

    .cp-directive {
        text-align: center;
    }

    .cp-directive strong {
        direction: ltr;
        color: var(--cp-green);
        font-family: Consolas,Monaco,monospace;
    }

    .cp-directive span {
        display: block;
        color: var(--cp-muted);
        font-size: 13px;
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

    .cp-compare {
        display: grid;
        grid-template-columns: repeat(2,minmax(0,1fr));
        gap: 14px;
        margin: 17px 0;
    }

    .cp-compare-card {
        min-width: 0;
        overflow: hidden;
        background: #0d0f13;
        border: 1px solid rgba(255,255,255,.09);
        border-radius: 11px;
    }

    .cp-compare-head {
        padding: 11px 14px;
        color: #fff;
        background: #272a31;
        border-bottom: 1px solid rgba(255,255,255,.08);
        font-weight: 900;
    }

    .cp-compare-old .cp-compare-head {
        border-right: 4px solid var(--cp-orange);
    }

    .cp-compare-new .cp-compare-head {
        border-right: 4px solid var(--cp-green);
    }

    .cp-compare-card .cp-code-block {
        min-height: 420px;
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

    @media (max-width:820px) {
        .cp-directives {
            grid-template-columns: repeat(2,minmax(0,1fr));
        }
    }

    @media (max-width:760px) {
        .cemu-patches-guide {
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
        .cp-compare {
            grid-template-columns: 1fr;
        }

        .cp-compare-card .cp-code-block {
            min-height: 0;
        }
    }

    @media (max-width:520px) {
        .cp-directives {
            grid-template-columns: 1fr;
        }

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

        .cp-code-block {
            padding: 13px;
            font-size: 12px;
        }
    }


    .cp-image {
        margin: 18px 0;
        padding: 7px;
        overflow: hidden;
        background: #0e0f13;
        border: 1px solid rgba(255,255,255,.10);
        border-radius: 13px;
        box-shadow: 0 8px 24px rgba(0,0,0,.22);
    }

    .cp-image .cp-image-viewer {
        display: block;
    }

    .cp-image img {
        display: block;
        width: 100%;
        max-height: 650px;
        height: auto;
        margin: 0;
        object-fit: contain;
        background: #08090c;
        border-radius: 8px;
    }

    .cp-caption {
        margin: 0 !important;
        padding: 10px 10px 4px;
        color: var(--cp-muted);
        font-size: 13px;
        line-height: 1.65;
        text-align: center;
    }

    .cp-research-grid {
        display: grid;
        grid-template-columns: repeat(2,minmax(0,1fr));
        gap: 12px;
        margin: 17px 0;
    }

    .cp-research-card {
        min-width: 0;
        padding: 16px;
        background: rgba(0,0,0,.20);
        border: 1px solid rgba(255,255,255,.08);
        border-radius: 10px;
    }

    .cp-research-card strong {
        display: block;
        margin-bottom: 7px;
        color: var(--cp-blue);
        font-size: 15px;
    }

    .cp-log-key {
        display: inline-flex;
        align-items: center;
        min-height: 27px;
        margin: 4px 4px 4px 0;
        padding: 2px 9px;
        direction: ltr;
        color: #d7ffe6;
        background: #07080a;
        border: 1px solid rgba(0,230,118,.14);
        border-radius: 999px;
        font-family: Consolas,Monaco,monospace;
        font-size: 11.5px;
    }

    .cp-source-label {
        display: inline-flex;
        margin-bottom: 8px;
        padding: 3px 10px;
        color: #fff;
        background: linear-gradient(135deg,#217eb5,#155170);
        border-radius: 999px;
        font-size: 11.5px;
        font-weight: 900;
    }

    @media (max-width:760px) {
        .cp-research-grid {
            grid-template-columns: 1fr;
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
        max-height:none!important
    }
    .cp-lightbox{padding:54px 8px 10px}
    .cp-lightbox-stage{width:100%;height:calc(100vh - 66px)}
    .cp-lightbox-close{top:8px;right:8px;width:38px;height:38px}
    .cp-lightbox-caption{top:13px;right:54px;left:54px;font-size:11.5px}
}
</style>
<div class="cemu-patches-guide">
<header class="cp-hero">
<div class="cp-badge-row">
<span class="cp-badge">Cemu Patches</span>
<span class="cp-badge cp-badge-green">Native .asm</span>
<span class="cp-badge">Cemu 2.6</span>
<span class="cp-badge">PowerPC 32-bit</span></div><p>
            دليل للمطورين يشرح صيغة الباتش الأصلية داخل Cemu 2.x، وتحديد ملفات
            RPX وRPL عن طريق CRC، وكتابة التعليمات داخل Codecave، واستخدام
            Labels وConstants وData Directives، ثم نقل باتشات Cemuhook القديمة
            إلى صيغة Cemu الأصلية.
        </p>
</header>
<div class="cp-image">
<button aria-label="عرض الصورة بحجمها الطبيعي" class="cp-image-viewer" data-full="https://wiki.cemu.info/images/f/f0/GraphicPack_Menu.png" type="button"><img alt="نافذة Graphic Packs في محاكي Cemu لتنزيل الحزم وتفعيلها" loading="eager" src="https://wiki.cemu.info/images/f/f0/GraphicPack_Menu.png" /></button>
<p class="cp-caption">
        نافذة Graphic Packs التي يستخدمها المستخدم لتنزيل الحزم، البحث عنها،
        وتفعيل الباتش المطلوب داخل Cemu.
    </p>
</div>
<section class="cp-card">
<h3>وضع الباتشات حاليًا في Cemu 2.6</h3>
<div class="cp-grid-3">
<div class="cp-mini">
<strong>صيغة .asm الأصلية</strong>
            هي الصيغة الأساسية لهذا الدليل، ويطبقها Cemu مباشرة من داخل
            Graphic Packs بدون إضافة خارجية.
        </div>
<div class="cp-mini">
<strong>patches.txt القديمة</strong>
            ما زال Cemu يقرأها للتوافق مع الحزم القديمة، لكنها صيغة موروثة
            من Cemuhook وليست الخيار الأفضل لباتش جديد.
        </div>
<div class="cp-mini">
<strong>Cemuhook</strong>
            إضافة قديمة ومتوقفة عمليًا مع Cemu 2.x، لذلك لا تثبتها من أجل
            Assembly Patching أو باتشات FPS الحديثة.
        </div>
</div>
<div class="cp-success">
        عند إنشاء باتش جديد استخدم
        <span class="cp-inline">patch_&lt;name&gt;.asm</span>
        مع <span class="cp-inline">rules.txt</span> بإصدار
        <span class="cp-inline">version = 6</span>.
    </div>
</section>
<section class="cp-card">
<h3>وش هي Cemu Patches؟</h3>
<p>
            بداية من Cemu 1.17.0 صار المحاكي يدعم تعديل Game Code مباشرة من
            خلال Graphic Packs. قبل ذلك كانت عملية Assembly Patching تعتمد
            على Cemuhook وملف <span class="cp-inline">patches.txt</span>.
        </p>
<div class="cp-grid-2">
<div class="cp-mini">
<strong>صيغة التوافق القديمة</strong>
<span class="cp-inline">patches.txt</span>
                بدأت مع Cemuhook، ويقرأها Cemu حاليًا للتوافق مع الحزم القديمة.
            </div>
<div class="cp-mini">
<strong>صيغة Cemu الأصلية</strong>
<span class="cp-inline">patch_&lt;anything&gt;.asm</span>
                وهي الصيغة الموصى بها عند إنشاء باتش جديد.
            </div>
</div>
<div class="cp-danger">
            هذا موضوع تطوير باتشات، مو شرح تفعيل Graphic Packs للمستخدم العادي.
            كتابة عنوان خاطئ أو CRC غير صحيح ممكن يمنع الباتش من العمل أو يكسر تنفيذ اللعبة.
        </div>
</section>
<section class="cp-card">
<h3>مكان الملف وتسميته</h3>
<p>
            عندما يطابق <span class="cp-inline">rules.txt</span> اللعبة،
            يفحص Cemu مجلد Graphic Pack بحثًا عن أي ملف يطابق النمط:
        </p>
<div class="cp-code-wrap">
<div class="cp-code-title">
<span>File pattern</span>
<span>ASM</span>
</div>
<pre class="cp-code-block">patch_&lt;anything&gt;.asm</pre>
</div>
<div class="cp-grid-3">
<div class="cp-rule">
<strong>صحيح</strong>
<span class="cp-inline">patch_main.asm</span>
</div>
<div class="cp-rule">
<strong>صحيح</strong>
<span class="cp-inline">patch_fps.asm</span>
</div>
<div class="cp-rule">
<strong>غير مطابق</strong>
<span class="cp-inline">my_patch.asm</span>
</div>
</div>
<div class="cp-note">
            تقدر تحط أكثر من ملف Patch داخل الحزمة، وتقدر تحط أكثر من Patch Group
            داخل نفس الملف.
        </div>
</section>
<section class="cp-card">
<h3>الحد الأدنى المطلوب داخل rules.txt</h3>
<p>
        ملف <span class="cp-inline">rules.txt</span> هو اللي يربط الحزمة باللعبة
        ويحدد اسمها ومسار ظهورها داخل نافذة Graphic Packs. مع Cemu 2.x استخدم
        <span class="cp-inline">version = 6</span>.
    </p>
<div class="cp-code-wrap">
<div class="cp-code-title">
<span>rules.txt</span>
<span>Graphic Pack v6</span>
</div>
<pre class="cp-code-block">[Definition]
titleIds = 0005000012345600
name = My Patch
path = "Example Game/Mods/My Patch"
description = Applies a custom PPC patch.
version = 6</pre>
</div>
<div class="cp-grid-2">
<div class="cp-mini">
<strong>titleIds</strong>
            ضع Title ID للنسخة الأساسية التي تستهدفها الحزمة. أضف أكثر من قيمة
            فقط عندما يكون نفس الباتش صالحًا فعلًا لهذه الإصدارات.
        </div>
<div class="cp-mini">
<strong>path وname</strong>
            يحددان مكان ظهور الحزمة واسمها داخل Cemu، وليس اسم مجلد Windows فقط.
        </div>
</div>
<div class="cp-warning">
<span class="cp-inline">titleIds</span> يحدد اللعبة التي تظهر لها الحزمة،
        بينما <span class="cp-inline">moduleMatches</span> يحدد RPX أو RPL الذي
        سيطبق عليه كود الباتش. الاثنين لهم وظيفة مختلفة.
    </div>
</section>
<section class="cp-card">
<h3>وش يشوف المستخدم النهائي داخل Cemu؟</h3>
<span class="cp-source-label">واجهة Cemu الفعلية + Community Graphic Packs</span>
<p>
        المطور يكتب <span class="cp-inline">rules.txt</span> وملفات
        <span class="cp-inline">patch_*.asm</span>، لكن المستخدم النهائي
        ما يحتاج يفتح الكود. كل اللي يشوفه هو اسم الحزمة ومسارها ووصفها
        والخيارات الموجودة في نافذة Graphic Packs.
    </p>
<div class="cp-step-grid">
<div class="cp-step-row">
<span class="cp-step-number">1</span>
<div class="cp-step-text">
                افتح <span class="cp-inline">Options → Graphic packs</span>.
            </div>
</div>
<div class="cp-step-row">
<span class="cp-step-number">2</span>
<div class="cp-step-text">
                للحزم الرسمية اضغط
                <span class="cp-inline">Download latest community graphic packs</span>.
            </div>
</div>
<div class="cp-step-row">
<span class="cp-step-number">3</span>
<div class="cp-step-text">
                للحزمة اليدوية أو التجريبية ضع المجلد داخل
                <span class="cp-inline">graphicPacks</span>، وليس
                <span class="cp-inline">downloadedGraphicPacks</span>.
            </div>
</div>
<div class="cp-step-row">
<span class="cp-step-number">4</span>
<div class="cp-step-text">
                فعّل المربع بجانب الحزمة، ثم شغل اللعبة أو أعد تشغيل Cemu.
            </div>
</div>
<div class="cp-step-row">
<span class="cp-step-number">5</span>
<div class="cp-step-text">
                ظهور اسم الحزمة باللون الأخضر أثناء تشغيل اللعبة يعني أنها Active.
            </div>
</div>
</div>
<div class="cp-warning">
        لو عدلت حزمة موجودة داخل
        <span class="cp-inline">downloadedGraphicPacks</span>،
        انسخها أولًا إلى مجلد
        <span class="cp-inline">graphicPacks</span>
        حتى ما يستبدلها التحديث التلقائي للحزم.
    </div>
<div class="cp-image">
<button aria-label="عرض الصورة بحجمها الطبيعي" class="cp-image-viewer" data-full="https://staticdelivery.nexusmods.com/mods/2250/images/62/62-1721228499-494907394.png" type="button"><img alt="مثال على نافذة Graphic Packs وخيارات الحزمة داخل Cemu" loading="lazy" src="https://staticdelivery.nexusmods.com/mods/2250/images/62/62-1721228499-494907394.png" /></button>
<p class="cp-caption">
            مثال واضح على ظهور الحزمة وخياراتها للمستخدم النهائي؛
            الاسم والمسار والوصف والـPresets كلها تأتي من ملفات Graphic Pack.
        </p>
</div>
</section>
<section class="cp-card">
<h3>ملاحظات مهمة من تطوير Cemu</h3>
<span class="cp-source-label">Release Notes + Developer Tracker</span>
<div class="cp-research-grid">
<div class="cp-research-card">
<strong>Cemu 1.17.0</strong>
            أضاف دعمًا أصليًا لملف patches.txt، وقدم صيغة .asm الجديدة مع
            Automatic Codecave Sizing وWrite Cursor وLabels وVariables،
            وإمكانية تقسيم الباتش إلى عدة ملفات ومجموعات.
        </div>
<div class="cp-research-card">
<strong>Cemu 1.20.2</strong>
            صار Cemu نفسه يتولى تطبيق باتشات Cemuhook حتى لو كانت الإضافة مثبتة،
            مع تنبيه أن بعض Syntax وSemantics تختلف عند التحويل.
        </div>
<div class="cp-research-card">
<strong>Cemu 1.22.2</strong>
            صار Disassembly View يعرض أسماء Functions وLabels المعرفة داخل
            Graphic Pack، ويعرض نوع البيانات مثل
            <span class="cp-inline">.float</span>.
        </div>
<div class="cp-research-card">
<strong>Cemu 2.6 والمستودع الحالي</strong>
            صيغة .asm ما زالت مستخدمة في الإصدار الحالي، والأمثلة الفعلية موجودة
            في مستودع <span class="cp-inline">cemu_graphic_packs</span>،
            وخصوصًا مجلد Mods الذي يحتوي باتشات FPS والغش وتعديلات اللعب.
        </div>
</div>
<div class="cp-info">
        أفضل طريقة لتعلم الصيغة بعد فهم الأساسيات هي فتح باتش فعلي من المستودع،
        ومقارنة <span class="cp-inline">rules.txt</span> مع
        <span class="cp-inline">patch_*.asm</span> وسجل تشغيل اللعبة.
    </div>
</section>
<section class="cp-card">
<h3>Patch Groups وmoduleMatches</h3>
<p>
            كل مجموعة باتش تبدأ باسم داخل أقواس مربعة، ثم
            <span class="cp-inline">moduleMatches</span> الذي يحتوي CRC واحدًا
            أو أكثر لتحديد ملفات RPX أو RPL المستهدفة.
        </p>
<div class="cp-code-wrap">
<div class="cp-code-title">
<span>patch_main.asm</span>
<span>Patch group</span>
</div>
<pre class="cp-code-block">[group_name]
moduleMatches = 0x11223344, 0xCFF30E4E</pre>
</div>
<div class="cp-grid-2">
<div class="cp-mini">
<strong>اسم المجموعة</strong>
                يستخدم أساسًا في Debugging. رسائل الأخطاء تشير إلى اسم المجموعة
                ورقم السطر.
            </div>
<div class="cp-mini">
<strong>moduleMatches</strong>
                قائمة CRCs خاصة بملفات RPX أو RPL المستهدفة، وقد تحتوي أكثر من
                إصدار عندما يكون نفس الكود صالحًا لها.
            </div>
</div>
<div class="cp-info">
            تقدر تحصل CRC الخاص بكل Module من ملف
            <span class="cp-inline">log.txt</span> بعد تشغيل اللعبة في Cemu.
        </div>
<div class="cp-warning">
            Labels وConstants تقدر تُستخدم بين مجموعات مختلفة داخل نفس Graphic Pack
            فقط عندما تكون المجموعات مفعلة لنفس Module أو CRC. ما تقدر المجموعة
            تصل إلى تعريفات خارج الحزمة الحالية.
        </div>
</section>
<section class="cp-card">
<h3>تعديل تعليمات منفردة</h3>
<p>
            أبسط استخدام هو الكتابة داخل عنوان محدد في الـModule. اكتب العنوان،
            ثم علامة <span class="cp-inline">=</span>، وبعدها تعليمة PowerPC أو
            Data Directive يدعمها المجمّع.
        </p>
<div class="cp-code-wrap">
<div class="cp-code-title">
<span>patch_main.asm</span>
<span>Per-line addresses</span>
</div>
<pre class="cp-code-block">0x0200E3A4 = li r3, 0
0x0200E400 = nop</pre>
</div>
<div class="cp-grid-2">
<div class="cp-mini">
<strong>li r3, 0</strong>
                يستبدل التعليمة الموجودة في العنوان ويضع القيمة 0 في r3.
            </div>
<div class="cp-mini">
<strong>nop</strong>
                يعطل التعليمة الأصلية في العنوان المحدد.
            </div>
</div>
</section>
<section class="cp-card">
<h3>Write Cursor واستخدام .origin</h3>
<p>
            لما تكتب عدة تعليمات متتالية، ما تحتاج تحسب عنوان كل سطر يدويًا.
            استخدم <span class="cp-inline">.origin</span> لتحديد مؤشر الكتابة،
            وCemu يزيده تلقائيًا بعد كل تعليمة أو Data Directive.
        </p>
<div class="cp-code-wrap">
<div class="cp-code-title">
<span>patch_main.asm</span>
<span>Text section</span>
</div>
<pre class="cp-code-block">.origin = 0x0200E3A4
bla someLabel
blr</pre>
</div>
<div class="cp-grid-2">
<div class="cp-mini">
<strong>السطر الأول</strong>
                يكتب في <span class="cp-inline">0x0200E3A4</span>.
            </div>
<div class="cp-mini">
<strong>السطر الثاني</strong>
                يكتب تلقائيًا في <span class="cp-inline">0x0200E3A8</span>.
            </div>
</div>
<div class="cp-warning">
            العنوان المكتوب مباشرة بصيغة
            <span class="cp-inline">address = instruction</span>
            له أولوية أعلى من <span class="cp-inline">.origin</span>، ولا يزيد
            مؤشر الكتابة الحالي.
        </div>
</section>
<section class="cp-card">
<h3>كتابة Function داخل Codecave</h3>
<p>
            الكلمة <span class="cp-inline">codecave</span> تنقل مؤشر الكتابة
            إلى مساحة غير مستخدمة مخصصة للكود الإضافي.
        </p>
<div class="cp-code-wrap">
<div class="cp-code-title">
<span>patch_main.asm</span>
<span>Codecave function</span>
</div>
<pre class="cp-code-block">.origin = codecave

someLabel:
li r3, 0
blr</pre>
</div>
<div class="cp-step-grid">
<div class="cp-step-row">
<span class="cp-step-number">1</span>
<div class="cp-step-text">
                    يبدأ Cemu الكتابة داخل منطقة Codecave.
                </div>
</div>
<div class="cp-step-row">
<span class="cp-step-number">2</span>
<div class="cp-step-text">
                    ينشئ Label باسم <span class="cp-inline">someLabel</span>
                    في الموضع الحالي.
                </div>
</div>
<div class="cp-step-row">
<span class="cp-step-number">3</span>
<div class="cp-step-text">
                    يكتب التعليمات بالتتابع ويحدث العناوين تلقائيًا.
                </div>
</div>
</div>
</section>
<section class="cp-card">
<h3>Labels والعناوين الخارجية</h3>
<p>
            عرّف Label بكتابة الاسم متبوعًا بنقطتين. Cemu يعالج Relocation
            تلقائيًا عشان يظل الاسم يشير إلى مكان الكود الصحيح في الذاكرة.
        </p>
<div class="cp-code-wrap">
<div class="cp-code-title">
<span>patch_main.asm</span>
<span>Local label</span>
</div>
<pre class="cp-code-block">OurLabel:</pre>
</div>
<p>
            وتقدر تربط Label بعنوان موجود داخل Text أو Data Section في اللعبة:
        </p>
<div class="cp-code-wrap">
<div class="cp-code-title">
<span>patch_main.asm</span>
<span>External address label</span>
</div>
<pre class="cp-code-block">0x0202034C = ExternalLabel:</pre>
</div>
<div class="cp-note">
            هذا مفيد عند استدعاء Function موجودة داخل اللعبة أو الوصول إلى
            Variable خارج كودك الإضافي.
        </div>
</section>
<section class="cp-card">
<h3>Constants وExpressions</h3>
<p>
            صيغة Cemu تدعم Constants وعمليات حسابية وقت التجميع، وتقدر تستخدم
            Preset Variables القادمة من Graphic Pack.
        </p>
<div class="cp-code-wrap">
<div class="cp-code-title">
<span>patch_main.asm</span>
<span>Constant</span>
</div>
<pre class="cp-code-block">myConst = $presetVariable + 5
li r3, myConst</pre>
</div>
<p>
            أو تكتب التعبير مباشرة داخل التعليمة:
        </p>
<div class="cp-code-wrap">
<div class="cp-code-title">
<span>patch_main.asm</span>
<span>Inline expression</span>
</div>
<pre class="cp-code-block">li r3, $presetVariable + 5</pre>
</div>
<div class="cp-danger">
            Constant ما يحجز مساحة في الذاكرة، لذلك ما يصلح كهدف لتعليمات
            Load أو Store. لما تحتاج Variable قابلًا للعنونة استخدم Data Directive
            مع Label.
        </div>
</section>
<section class="cp-card">
<h3>Data Directives المدعومة</h3>
<div class="cp-directives">
<div class="cp-directive"><strong>.byte</strong><span>عدد 8-bit</span></div>
<div class="cp-directive"><strong>.short</strong><span>عدد 16-bit</span></div>
<div class="cp-directive"><strong>.int</strong><span>عدد 32-bit</span></div>
<div class="cp-directive"><strong>.ptr</strong><span>Alias لـ.int</span></div>
<div class="cp-directive"><strong>.float</strong><span>Float 32-bit</span></div>
<div class="cp-directive"><strong>.double</strong><span>Float 64-bit</span></div>
<div class="cp-directive"><strong>.string</strong><span>نص بطول متغير</span></div>
</div>
<div class="cp-code-wrap">
<div class="cp-code-title">
<span>patch_main.asm</span>
<span>Float variable</span>
</div>
<pre class="cp-code-block">SomeFloat:
.float 123.45

lis r12, SomeFloat@ha
lfs f0, SomeFloat@l(r12)</pre>
</div>
<div class="cp-note">
            Label <span class="cp-inline">SomeFloat</span> يشير إلى مكان القيمة
            داخل الذاكرة، لذلك تقدر تستخدمه مع تعليمات Load وStore.
        </div>
</section>
<section class="cp-card">
<h3>الفرق الخطير عند التحويل من Cemuhook</h3>
<p>
            الصيغتان تقبلان كتابة
            <span class="cp-inline">name = value</span>،
            لكن معنى السطر مختلف.
        </p>
<div class="cp-grid-2">
<div class="cp-mini">
<strong>Cemuhook</strong>
<span class="cp-inline">name = 0x12345</span>
                يتعامل معها كPointer إلى العنوان ويطبق Relocation.
            </div>
<div class="cp-mini">
<strong>Cemu .asm</strong>
                نفس السطر ينشئ Constant قيمته
                <span class="cp-inline">0x12345</span>
                بدون Relocation.
            </div>
</div>
<div class="cp-success">
            للحصول على نفس سلوك Cemuhook اكتب:
            <span class="cp-inline">name = reloc(0x12345)</span>
            أو:
            <span class="cp-inline">0x12345 = name:</span>
</div>
</section>
<section class="cp-card">
<h3>مثال كامل: الصيغة القديمة مقابل صيغة Cemu</h3>
<div class="cp-compare">
<article class="cp-compare-card cp-compare-old">
<div class="cp-compare-head">Cemuhook — patches.txt</div>
<pre class="cp-code-block">[PatchName]
moduleMatches = 0x12345678

# code Cave
codeCaveSize = 0x24

# preset variable
_ourVariable = 0x0000000
0x0000000 = .int $gfxPackPresetVariable

# function in code cave
_codeCaveFunction = 0x0000004
0x0000004 = lis r11, _ourVariable@ha
0x0000008 = lwz r11, _ourVariable@l(r11)
0x000000C = cmpwi r11, 1
0x0000010 = bne .+0x0C
0x0000014 = li r3, 0
0x0000018 = blr
0x000001C = addi r3, r3, 1
0x0000020 = blr

# redirect game code
0x21EFAA8 = bla _codeCaveFunction</pre>
</article>
<article class="cp-compare-card cp-compare-new">
<div class="cp-compare-head">Cemu — patch_main.asm</div>
<pre class="cp-code-block">[PatchName]
moduleMatches = 0x12345678

.origin = codecave

# preset variable
_ourVariable:
.int $gfxPackPresetVariable

# function in code cave
_codeCaveFunction:
lis r11, _ourVariable@ha
lwz r11, _ourVariable@l(r11)
cmpwi r11, 1
bne label_skip
li r3, 0
blr

label_skip:
addi r3, r3, 1
blr

# redirect game code
0x21EFAA8 = bla _codeCaveFunction</pre>
</article>
</div>
<div class="cp-info">
            صيغة Cemu أوضح لأن Labels تستبدل الحسابات اليدوية لعناوين Codecave،
            و<span class="cp-inline">.origin = codecave</span> يدير مؤشر الكتابة
            بدل تحديد Offset لكل سطر.
        </div>
</section>
<section class="cp-card">
<h3>ترتيب إنشاء باتش جديد</h3>
<div class="cp-step-grid">
<div class="cp-step-row">
<span class="cp-step-number">1</span>
<div class="cp-step-text">
                    أنشئ Graphic Pack صحيحًا يحتوي
                    <span class="cp-inline">rules.txt</span>.
                </div>
</div>
<div class="cp-step-row">
<span class="cp-step-number">2</span>
<div class="cp-step-text">
                    شغل اللعبة واستخرج CRC للـRPX أو RPL من
                    <span class="cp-inline">log.txt</span>.
                </div>
</div>
<div class="cp-step-row">
<span class="cp-step-number">3</span>
<div class="cp-step-text">
                    أنشئ ملفًا باسم يبدأ بـ
                    <span class="cp-inline">patch_</span>
                    وينتهي بـ<span class="cp-inline">.asm</span>.
                </div>
</div>
<div class="cp-step-row">
<span class="cp-step-number">4</span>
<div class="cp-step-text">
                    أضف Patch Group واكتب
                    <span class="cp-inline">moduleMatches</span>.
                </div>
</div>
<div class="cp-step-row">
<span class="cp-step-number">5</span>
<div class="cp-step-text">
                    ضع الكود الإضافي في Codecave، ثم اربط Game Code به باستخدام
                    Branch مناسب مثل <span class="cp-inline">bla</span>.
                </div>
</div>
<div class="cp-step-row">
<span class="cp-step-number">6</span>
<div class="cp-step-text">
                    فعّل Graphic Pack، شغل اللعبة، وراجع
                    <span class="cp-inline">log.txt</span>
                    لأي Parse أو Assembly Error.
                </div>
</div>
</div>
</section>
<section class="cp-card">
<h3>تأكد أن الباتش اشتغل من log.txt</h3>
<span class="cp-source-label">Cemu Bug Tracker القديم — سجل تشغيل فعلي</span>
<p>
        سجل Cemu يعطيك اسم الـModule والـChecksum واسم Patch Group الذي تم
        تطبيقه، وقد يعرض نطاق Codecave والحزمة المفعلة. المثال التالي مأخوذ من
        تقرير قديم في Bug Tracker ويظل مفيدًا لفهم شكل السجل:
    </p>
<div class="cp-code-wrap">
<div class="cp-code-title">
<span>log.txt</span>
<span>Runtime verification</span>
</div>
<pre class="cp-code-block">Loaded module 'turbo' with checksum 0xd09700ce
Applying patch group 'MK8FullDrawVer4_1'
Activate graphic pack: Mario Kart 8/Mods/60FPS in splitscreen
Applying patch group 'MK8AspectVer4_1' (Codecave: 01800000-01800018)</pre>
</div>
<div class="cp-research-grid">
<div class="cp-research-card">
<strong>Loaded module + checksum</strong>
            هذه القيمة هي اللي تقارنها مع
            <span class="cp-inline">moduleMatches</span>.
        </div>
<div class="cp-research-card">
<strong>Applying patch group</strong>
            ظهورها يعني أن CRC طابق وأن Cemu بدأ تطبيق المجموعة.
        </div>
<div class="cp-research-card">
<strong>Codecave range</strong>
            ظهور النطاق يؤكد أن Cemu حجز مساحة للكود الإضافي.
        </div>
<div class="cp-research-card">
<strong>Activate graphic pack</strong>
            يوضح اسم الحزمة والمسار والـPreset الذي اشتغل فعليًا.
        </div>
</div>
<div class="cp-success">
        ابحث داخل السجل عن:
        <span class="cp-log-key">Loaded module</span>
<span class="cp-log-key">checksum</span>
<span class="cp-log-key">Applying patch group</span>
<span class="cp-log-key">Codecave</span>
</div>
<div class="cp-danger">
        إذا الحزمة ظهرت Active لكن ما ظهر
        <span class="cp-inline">Applying patch group</span>،
        فالسبب الأقرب CRC غير مطابق، اسم ملف غير صحيح، أو Parse Error قبل التطبيق.
    </div>
</section>
<section class="cp-card">
<h3>أخطاء شائعة تمنع الباتش من العمل</h3>
<div class="cp-grid-2">
<div class="cp-check">
<strong>اسم الملف غير صحيح</strong>
                لازم يطابق <span class="cp-inline">patch_&lt;anything&gt;.asm</span>.
            </div>
<div class="cp-check">
<strong>CRC غير مطابق</strong>
                الباتش ما يتفعل إذا Module CRC مختلف عن
                <span class="cp-inline">moduleMatches</span>.
            </div>
<div class="cp-check">
<strong>Relocation خاطئ</strong>
                نقل تعريفات Cemuhook بصيغة
                <span class="cp-inline">name = address</span>
                بدون <span class="cp-inline">reloc()</span>.
            </div>
<div class="cp-check">
<strong>Branch أو Label غير صالح</strong>
                راجع اسم الـLabel ورسالة الـAssembler وموضع Codecave؛ لا تفترض
                أن كل نوع Branch يصل إلى أي عنوان.
            </div>
<div class="cp-check">
<strong>Preset Variable مفقود</strong>
                تأكد أن الاسم معرف في
                <span class="cp-inline">rules.txt</span>.
            </div>
<div class="cp-check">
<strong>تعارض Graphic Packs</strong>
                حزمتان تعدلان العنوان نفسه ممكن تسببان كراش أو سلوكًا غير متوقع.
            </div>
</div>
</section>
<section class="cp-card">
<h3>متى المشكلة من الباتش وليست من Cemu؟</h3>
<p>
        في Bug Tracker الرسمي أُغلق تقرير كراش لأن العطل كان يظهر فقط مع
        Graphic Pack، وتم توجيهه ليُصلح داخل الحزمة نفسها بدل تعديل Cemu Core.
    </p>
<div class="cp-step-grid">
<div class="cp-step-row">
<span class="cp-step-number">1</span>
<div class="cp-step-text">
                عطل الحزمة وحدها وجرب نفس المكان داخل اللعبة.
            </div>
</div>
<div class="cp-step-row">
<span class="cp-step-number">2</span>
<div class="cp-step-text">
                إذا اختفت المشكلة، أعد تفعيل الحزمة وحدد أي Patch Group يسببها.
            </div>
</div>
<div class="cp-step-row">
<span class="cp-step-number">3</span>
<div class="cp-step-text">
                أرفق <span class="cp-inline">log.txt</span> بعد حدوث المشكلة مباشرة.
            </div>
</div>
<div class="cp-step-row">
<span class="cp-step-number">4</span>
<div class="cp-step-text">
                اكتب Cemu Version، إصدار اللعبة، Region، Module Checksum،
                واسم الحزمة والـPreset.
            </div>
</div>
<div class="cp-step-row">
<span class="cp-step-number">5</span>
<div class="cp-step-text">
                افتح التقرير في Issues الخاصة بمستودع Community Graphic Packs
                عندما تكون المشكلة مرتبطة بالحزمة فقط، وليس في مستودع Cemu Core.
            </div>
</div>
</div>
<div class="cp-note">
        المشاكل اللي تستمر بعد تعطيل جميع Graphic Packs تُفحص بعدها كمشكلة
        في Cemu أو اللعبة أو التعريفات، مو كخطأ باتش.
    </div>
</section>
<section class="cp-source-card">
<h3>المصادر الرسمية</h3>
<div class="cp-links">
<a class="cp-link" href="https://wiki.cemu.info/wiki/Cemu_patches" rel="noopener noreferrer" target="_blank">
                توثيق Cemu Patches
            </a>
<a class="cp-link" href="https://wiki.cemu.info/wiki/Assembly_Patching" rel="noopener noreferrer" target="_blank">
                شرح Assembly Patching
            </a>
<a class="cp-link" href="https://wiki.cemu.info/wiki/Graphic_packs_creation" rel="noopener noreferrer" target="_blank">
                إنشاء Graphic Packs
            </a>
<a class="cp-link" href="https://wiki.cemu.info/wiki/Graphic_packs_installation_and_usage" rel="noopener noreferrer" target="_blank">
                تثبيت واستخدام Graphic Packs
            </a>
<a class="cp-link" href="https://github.com/cemu-project/cemu_graphic_packs" rel="noopener noreferrer" target="_blank">
                Community Graphic Packs
            </a>
<a class="cp-link" href="https://github.com/cemu-project/Cemu/releases/tag/v2.6" rel="noopener noreferrer" target="_blank">
                Cemu 2.6
            </a>
<a class="cp-link" href="https://wiki.cemu.info/wiki/Cemuhook" rel="noopener noreferrer" target="_blank">
                حالة Cemuhook الحالية
            </a>
<a class="cp-link" href="https://wiki.cemu.info/wiki/Release_1.17.0" rel="noopener noreferrer" target="_blank">
    إضافات Patch Format في Cemu 1.17.0
</a><a class="cp-link" href="https://wiki.cemu.info/wiki/Release_1.20.2" rel="noopener noreferrer" target="_blank">
    ملاحظات التحويل في Cemu 1.20.2
</a><a class="cp-link" href="https://wiki.cemu.info/wiki/Release_1.22.2" rel="noopener noreferrer" target="_blank">
    Labels داخل Disassembly View
</a><a class="cp-link" href="https://cemu-project.github.io/cemu_graphic_packs/" rel="noopener noreferrer" target="_blank">
    موقع Community Graphic Packs
</a><a class="cp-link" href="https://bugs.cemu.info/issues/401" rel="noopener noreferrer" target="_blank">
    مثال Developer Log حقيقي
</a><a class="cp-link" href="https://github.com/cemu-project/cemu_graphic_packs/issues" rel="noopener noreferrer" target="_blank">
    الإبلاغ عن مشاكل Graphic Packs
</a></div>
</section>
<footer class="cp-footer">
        في Cemu 2.x أنشئ Graphic Pack بإصدار 6، استخدم CRC الصحيح لكل RPX أو RPL،
        واكتب الكود الإضافي داخل Codecave مع Labels واضحة. عند تحويل patches.txt
        قديم، راجع معنى Relocation قبل نقل أي تعريف بصيغة name = address.
    </footer>
</div>

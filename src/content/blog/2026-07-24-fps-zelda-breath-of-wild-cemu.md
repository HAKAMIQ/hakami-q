---
title: 'تفعيل FPS++ ورفع فريمات Zelda Breath of the Wild على Cemu'
description: 'Cemu FPS++ Zelda BOTW Graphic Packs Vulkan / OpenGL شرح تنزيل Community Graphic Packs وتفعيل FPS++، والفرق بين الوضع الديناميكي وStatic FPS، وضبط 30 أو 60 فريم، مع حلول التقطيع ومش…'
pubDate: '2026-07-24T20:38:11.252+03:00'
updatedDate: '2026-07-25T08:38:15.545+03:00'
heroImage: '../../assets/blog-placeholder-1.jpg'
heroImageUrl: '/media/blogger/c6/c66b379b3bb48c838c582a50ec42355c0d0d433a580764149b921fae5536a0f3.jpg'
originalUrl: 'https://hakamiq1.blogspot.com/2026/07/fps-zelda-breath-of-wild-cemu.html'
labels: ["Nintendo","Wii-U"]
---

<style>
    .cemu-fps-guide {
        --cf-red: #ef3027;
        --cf-red-dark: #a81410;
        --cf-blue: #29b6f6;
        --cf-gold: #ffd600;
        --cf-green: #00e676;
        --cf-orange: #ffab40;
        --cf-bg: #101115;
        --cf-card: #191b21;
        --cf-soft: #14161b;
        --cf-border: rgba(255,255,255,.09);
        --cf-text: #f4f4f4;
        --cf-muted: #aeb4bf;

        direction: rtl;
        width: 100%;
        max-width: 1000px;
        margin: 0 auto;
        padding: 20px;
        color: var(--cf-text);
        background: var(--cf-bg);
        border: 1px solid var(--cf-border);
        border-radius: 16px;
        box-sizing: border-box;
        font-family: "Tajawal","Cairo",Arial,sans-serif;
        font-size: 16px;
        line-height: 1.9;
        text-align: right;
    }

    .cemu-fps-guide,
    .cemu-fps-guide * {
        box-sizing: border-box;
    }

    .cemu-fps-guide p {
        margin: 0 0 14px;
    }

    .cemu-fps-guide a {
        color: var(--cf-blue);
        text-decoration: none;
        font-weight: 800;
    }

    .cemu-fps-guide a:hover {
        color: var(--cf-gold);
    }

    .cf-hero {
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

    .cf-badge-row {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 8px;
        margin-bottom: 10px;
    }

    .cf-badge {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-height: 29px;
        padding: 3px 12px;
        color: #fff;
        background: linear-gradient(135deg,var(--cf-red),var(--cf-red-dark));
        border-radius: 999px;
        font-size: 12px;
        font-weight: 900;
    }

    .cf-badge-green {
        background: linear-gradient(135deg,#00b85f,#00783f);
    }

    .cf-hero h2 {
        max-width: 880px;
        margin: 8px auto 10px;
        color: var(--cf-blue);
        font-size: 28px;
        line-height: 1.5;
    }

    .cf-hero p {
        max-width: 850px;
        margin: 8px auto 0;
        color: #dadde4;
    }

    .cf-card,
    .cf-source-card {
        margin-bottom: 20px;
        padding: 23px;
        overflow: hidden;
        background: linear-gradient(145deg,var(--cf-card),var(--cf-soft));
        border: 1px solid var(--cf-border);
        border-radius: 13px;
        box-shadow: 0 7px 22px rgba(0,0,0,.18);
    }

    .cf-card h3,
    .cf-source-card h3 {
        position: relative;
        margin: 0 0 18px;
        padding: 0 15px 11px 0;
        color: var(--cf-gold);
        border-bottom: 1px solid rgba(255,255,255,.09);
        font-size: 19px;
        line-height: 1.55;
    }

    .cf-card h3::before,
    .cf-source-card h3::before {
        content: "";
        position: absolute;
        top: 7px;
        right: 0;
        width: 4px;
        height: 18px;
        background: var(--cf-red);
        border-radius: 4px;
    }

    .cf-card h4 {
        margin: 22px 0 10px;
        color: var(--cf-blue);
        font-size: 16.5px;
        line-height: 1.6;
    }

    .cf-note,
    .cf-info,
    .cf-warning,
    .cf-success,
    .cf-danger {
        margin: 17px 0;
        padding: 15px 17px;
        color: #eceef2;
        background: rgba(0,0,0,.22);
        border-radius: 9px;
    }

    .cf-note { border-right: 4px solid var(--cf-blue); }
    .cf-info { border-right: 4px solid var(--cf-gold); }
    .cf-warning { border-right: 4px solid var(--cf-orange); }
    .cf-success { border-right: 4px solid var(--cf-green); }
    .cf-danger { border-right: 4px solid var(--cf-red); }

    .cf-code {
        direction: ltr;
        unicode-bidi: isolate;
        display: inline-block;
        max-width: 100%;
        padding: 2px 7px;
        color: var(--cf-green);
        background: #07080a;
        border: 1px solid rgba(0,230,118,.14);
        border-radius: 5px;
        font-family: Consolas,Monaco,monospace;
        font-size: .92em;
        white-space: nowrap;
    }

    .cf-grid-2,
    .cf-grid-3,
    .cf-video-grid,
    .cf-links {
        display: grid;
        gap: 12px;
        margin: 17px 0;
    }

    .cf-grid-2,
    .cf-video-grid,
    .cf-links {
        grid-template-columns: repeat(2,minmax(0,1fr));
    }

    .cf-grid-3 {
        grid-template-columns: repeat(3,minmax(0,1fr));
    }

    .cf-mini,
    .cf-setting,
    .cf-problem,
    .cf-version-card {
        min-width: 0;
        padding: 16px;
        background: rgba(0,0,0,.20);
        border: 1px solid rgba(255,255,255,.08);
        border-radius: 10px;
    }

    .cf-mini strong,
    .cf-setting strong,
    .cf-problem strong,
    .cf-version-card strong {
        display: block;
        margin-bottom: 7px;
        color: var(--cf-blue);
        font-size: 15px;
    }

    .cf-version-card {
        border-top: 3px solid var(--cf-green);
    }

    .cf-version-card strong {
        color: var(--cf-green);
    }

    .cf-step-grid {
        display: grid !important;
        grid-template-columns: 1fr !important;
        gap: 10px !important;
        width: 100% !important;
        margin: 15px 0 0 !important;
        padding: 0 !important;
        direction: rtl !important;
    }

    .cf-step-row {
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

    .cf-step-number {
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
        background: linear-gradient(135deg,var(--cf-red),var(--cf-red-dark)) !important;
        border: 0 !important;
        border-radius: 50% !important;
        font-size: 13px !important;
        font-weight: 900 !important;
        line-height: 28px !important;
        direction: ltr !important;
        text-align: center !important;
    }

    .cf-step-text {
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

    .cf-video {
        display: flex;
        min-width: 0;
        flex-direction: column;
        overflow: hidden;
        background:
            radial-gradient(circle at top left,rgba(255,0,51,.10),transparent 42%),
            linear-gradient(145deg,#1b1d23,#13151a);
        border: 1px solid rgba(255,255,255,.10);
        border-radius: 12px;
        box-shadow: 0 7px 20px rgba(0,0,0,.18);
    }

    .cf-thumb {
        position: relative;
        display: block;
        overflow: hidden;
        aspect-ratio: 16 / 9;
        background: #08090c;
    }

    .cf-thumb img {
        display: block;
        width: 100%;
        height: 100%;
        margin: 0;
        object-fit: cover;
    }

    .cf-play {
        position: absolute;
        top: 50%;
        left: 50%;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 58px;
        height: 41px;
        color: #fff;
        background: #ff0033;
        border-radius: 11px;
        font-size: 19px;
        transform: translate(-50%,-50%);
        box-shadow: 0 8px 20px rgba(0,0,0,.35);
    }

    .cf-duration {
        position: absolute;
        right: 8px;
        bottom: 8px;
        direction: ltr;
        padding: 2px 7px;
        color: #fff;
        background: rgba(0,0,0,.82);
        border-radius: 5px;
        font-family: Consolas,Monaco,monospace;
        font-size: 12px;
        font-weight: 900;
    }

    .cf-video-content {
        display: flex;
        flex: 1;
        flex-direction: column;
        padding: 16px;
    }

    .cf-video-label {
        align-self: flex-start;
        display: inline-flex;
        margin-bottom: 8px;
        padding: 3px 10px;
        color: #fff;
        background: linear-gradient(135deg,#ff0033,#b50024);
        border-radius: 999px;
        font-size: 11.5px;
        font-weight: 900;
    }

    .cf-video-content h4 {
        margin: 0 0 8px;
        color: var(--cf-gold);
        font-size: 16px;
        line-height: 1.6;
    }

    .cf-video-content p {
        flex: 1;
        color: #d9dce2;
        font-size: 14px;
    }

    .cf-button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-height: 40px;
        padding: 7px 13px;
        color: #fff !important;
        background: linear-gradient(135deg,#ff0033,#b50024);
        border-radius: 8px;
        font-size: 13px;
        font-weight: 900;
        text-align: center;
    }

    .cf-link {
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

    .cf-link:hover {
        background: linear-gradient(135deg,var(--cf-red),var(--cf-red-dark));
    }

    .cf-footer {
        padding: 17px;
        color: #e1e3e8;
        background: #24262c;
        border: 1px solid rgba(255,255,255,.08);
        border-radius: 10px;
        text-align: center;
    }

    @media (max-width:760px) {
        .cemu-fps-guide {
            padding: 14px;
            font-size: 15px;
            border-radius: 12px;
        }

        .cf-hero {
            padding: 19px;
        }

        .cf-hero h2 {
            font-size: 22px;
        }

        .cf-card,
        .cf-source-card {
            padding: 18px;
        }

        .cf-grid-2,
        .cf-grid-3,
        .cf-video-grid,
        .cf-links {
            grid-template-columns: 1fr;
        }
    }

    @media (max-width:520px) {
        .cf-step-row {
            grid-template-columns: 30px minmax(0,1fr) !important;
            column-gap: 8px !important;
            padding: 8px !important;
        }

        .cf-step-number {
            width: 26px !important;
            height: 26px !important;
            line-height: 26px !important;
        }

        .cf-code {
            white-space: normal;
            overflow-wrap: anywhere;
        }
    }


    .cf-image {
        margin: 18px 0;
        padding: 7px;
        overflow: hidden;
        background: #0e0f13;
        border: 1px solid rgba(255,255,255,.10);
        border-radius: 13px;
        box-shadow: 0 8px 24px rgba(0,0,0,.22);
    }

    .cf-image .cf-image-viewer {
        display: block;
    }

    .cf-image img {
        display: block;
        width: 100%;
        max-height: 620px;
        height: auto;
        margin: 0;
        object-fit: contain;
        background: #08090c;
        border-radius: 8px;
    }

    .cf-image-wide img {
        aspect-ratio: 5 / 1;
        object-fit: cover;
        object-position: center;
    }

    .cf-caption {
        margin: 0 !important;
        padding: 10px 10px 4px;
        color: var(--cf-muted);
        font-size: 13px;
        line-height: 1.65;
        text-align: center;
    }

    @media (max-width:760px) {
        .cf-image-wide img {
            aspect-ratio: 16 / 7;
        }
    }


.cf-cover{
    margin:0 0 20px!important
}
.cf-image-viewer{
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
.cf-image-viewer::after{
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
.cf-image-viewer img{
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
.cf-image-wide .cf-image-viewer img{
    aspect-ratio:5 / 1!important;
    object-fit:cover!important;
    object-position:center!important
}
.cf-thumb.cf-image-viewer{
    display:block!important;
    aspect-ratio:16 / 9!important
}
.cf-thumb.cf-image-viewer img{
    width:100%!important;
    height:100%!important;
    max-height:none!important;
    object-fit:cover!important
}
.cf-play,
.cf-duration{
    pointer-events:none!important
}
.cf-image-viewer:hover img{
    transform:scale(1.012);
    filter:brightness(1.04)
}
.cf-lightbox{
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
.cf-lightbox.is-open{display:flex}
.cf-lightbox-stage{
    display:flex;
    align-items:center;
    justify-content:center;
    width:min(96vw,1700px);
    height:calc(100vh - 86px)
}
.cf-lightbox-image{
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
.cf-lightbox-close{
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
.cf-lightbox-caption{
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
@media(max-width:760px){
    .cf-image-wide .cf-image-viewer img{
        aspect-ratio:16 / 7!important
    }
}
@media(max-width:600px){
    .cf-image-viewer::after{
        left:7px;
        bottom:7px;
        min-height:27px;
        padding:3px 8px;
        font-size:10.5px
    }
    .cf-image-viewer img{
        max-height:none!important
    }
    .cf-lightbox{padding:54px 8px 10px}
    .cf-lightbox-stage{width:100%;height:calc(100vh - 66px)}
    .cf-lightbox-close{top:8px;right:8px;width:38px;height:38px}
    .cf-lightbox-caption{top:13px;right:54px;left:54px;font-size:11.5px}
}
</style>
<div class="cemu-fps-guide">
<header class="cf-hero">
<div class="cf-badge-row"><span class="cf-badge">Cemu FPS++</span><span class="cf-badge cf-badge-green">Zelda BOTW</span><span class="cf-badge">Graphic Packs</span><span class="cf-badge">Vulkan / OpenGL</span></div><p>شرح تنزيل Community Graphic Packs وتفعيل FPS++، والفرق بين الوضع الديناميكي وStatic FPS، وضبط 30 أو 60 فريم، مع حلول التقطيع ومشاكل Vulkan وOpenGL في The Legend of Zelda: Breath of the Wild.</p></header><figure class="cf-image cf-cover"><button aria-label="عرض صورة الموضوع بحجمها الطبيعي" class="cf-image-viewer" data-full="/media/blogger/c6/c66b379b3bb48c838c582a50ec42355c0d0d433a580764149b921fae5536a0f3.jpg" type="button"><img alt="طريقة تفعيل FPS++ في Cemu للعبة Zelda Breath of the Wild" fetchpriority="high" loading="eager" src="/media/blogger/c6/c66b379b3bb48c838c582a50ec42355c0d0d433a580764149b921fae5536a0f3.jpg" /></button></figure><div class="cf-image cf-image-wide">
<button aria-label="عرض الصورة بحجمها الطبيعي" class="cf-image-viewer" data-full="https://images.gamebanana.com/img/Webpage/Game/Profile/Background/5a7f08e190773.jpg" type="button"><img alt="مشهد رسمي للعبة The Legend of Zelda Breath of the Wild" loading="eager" src="https://images.gamebanana.com/img/Webpage/Game/Profile/Background/5a7f08e190773.jpg" /></button>
<p class="cf-caption">
        لعبة The Legend of Zelda: Breath of the Wild التي يستهدفها مود FPS++ داخل Cemu.
    </p>
</div>
<section class="cf-card">
<h3>وش هو FPS++؟</h3>
<p>
            FPS++ عبارة عن Assembly Mod داخل Community Graphic Packs. يعدل
            محرك Zelda Breath of the Wild عشان يستخدم Framerate وTimestep
            ديناميكيين بدل الالتزام بسرعة ثابتة عند 20 أو 24 أو 30 FPS.
        </p>
<div class="cf-grid-3">
<div class="cf-mini">
<strong>Graphic Packs</strong>
                تغير الدقة والظلال والمؤثرات، وتضيف إصلاحات ومودات مخصصة للألعاب.
            </div>
<div class="cf-mini">
<strong>Assembly Patching</strong>
                يعدل تعليمات PPC32 داخل اللعبة باستخدام ملفات Patch.
            </div>
<div class="cf-mini">
<strong>FPS++</strong>
                أشهر مثال على Assembly Patching، ويضبط سرعة اللعبة حسب الفريمات الفعلية.
            </div>
</div>
<div class="cf-info">
            معظم مودات FPS، وباتشات Widescreen، والغش، تعتمد على نفس فكرة
            Assembly Patching من خلال Graphic Packs.
        </div>
</section>
<section class="cf-card">
<h3>هل تحتاج Cemuhook؟</h3>
<div class="cf-danger">
            لا تثبت Cemuhook على Cemu 2.0 والإصدارات الحديثة. الإضافة صارت
            Deprecated بعد تحول Cemu إلى مشروع مفتوح المصدر، ودعم Assembly
            Patching موجود داخل المحاكي نفسه.
        </div>
<p>
            بعض الشروحات القديمة تذكر Cemuhook لأنه كان يقدم H.264 وMotion
            Controls وAssembly Patching في الإصدارات القديمة. هذا الكلام يخص
            Cemu القديم، مو الإصدارات الحديثة.
        </p>
</section>
<section class="cf-card">
<h3>المتطلبات قبل تفعيل FPS++</h3>
<div class="cf-grid-3">
<div class="cf-version-card">
<strong>إصدار اللعبة</strong>
<span class="cf-code">1.5.0 / v208</span>
                وهو الإصدار النهائي المطلوب لتوافق FPS++ الحديث.
            </div>
<div class="cf-version-card">
<strong>إصدار DLC</strong>
<span class="cf-code">3.0 / v80</span>
                عند استخدام المحتوى الإضافي.
            </div>
<div class="cf-version-card">
<strong>المحاكي</strong>
                استخدم إصدار Cemu حديث وحزمة Graphic Packs محدثة.
            </div>
</div>
<div class="cf-warning">
            تفعيل FPS++ على تحديث قديم ممكن يخلي اللعبة تعمل بسرعة زائدة أو
            Slow Motion. تأكد أن Cemu يعرض إصدار اللعبة
            <span class="cf-code">V208</span>.
        </div>
</section>
<section class="cf-card">
<h3>تنزيل أحدث Community Graphic Packs</h3>
<div class="cf-step-grid">
<div class="cf-step-row">
<span class="cf-step-number">1</span>
<div class="cf-step-text">
                    اقفل أي لعبة تعمل داخل Cemu.
                </div>
</div>
<div class="cf-step-row">
<span class="cf-step-number">2</span>
<div class="cf-step-text">
                    افتح <span class="cf-code">Options → Graphic packs</span>.
                </div>
</div>
<div class="cf-step-row">
<span class="cf-step-number">3</span>
<div class="cf-step-text">
                    اضغط
                    <span class="cf-code">Download latest community graphic packs</span>.
                </div>
</div>
<div class="cf-step-row">
<span class="cf-step-number">4</span>
<div class="cf-step-text">
                    انتظر اكتمال التنزيل، ثم استخدم مربع البحث لكتابة
                    <span class="cf-code">Breath of the Wild</span>.
                </div>
</div>
</div>
<div class="cf-note">
            للتثبيت اليدوي ضع الحزمة داخل مجلد
            <span class="cf-code">graphicPacks</span>، وليس
            <span class="cf-code">downloadedGraphicPacks</span>.
        </div>
</section>
<section class="cf-card">
<h3>طريقة تفعيل FPS++</h3>
<div class="cf-step-grid">
<div class="cf-step-row">
<span class="cf-step-number">1</span>
<div class="cf-step-text">
                    افتح Graphic Packs وابحث عن Zelda Breath of the Wild.
                </div>
</div>
<div class="cf-step-row">
<span class="cf-step-number">2</span>
<div class="cf-step-text">
                    افتح قسم <span class="cf-code">Mods</span>
                    وفعّل <span class="cf-code">FPS++</span>.
                </div>
</div>
<div class="cf-step-row">
<span class="cf-step-number">3</span>
<div class="cf-step-text">
                    اختر Framerate Limit يناسب جهازك. ابدأ بـ30 FPS للاستقرار،
                    أو 60 FPS إذا جهازك يحافظ عليه.
                </div>
</div>
<div class="cf-step-row">
<span class="cf-step-number">4</span>
<div class="cf-step-text">
                    استخدم الوضع الديناميكي. لا تفعل Static FPS مع FPS++ في نفس الوقت.
                </div>
</div>
<div class="cf-step-row">
<span class="cf-step-number">5</span>
<div class="cf-step-text">
                    شغل اللعبة وتأكد أن اسم الحزمة يظهر باللون الأخضر داخل
                    Graphic Packs، وهذا يدل أنها مفعلة.
                </div>
</div>
</div>
<div class="cf-danger">
            لا تضع 120 FPS لمجرد أن الشاشة تدعمه. إذا المعالج ما يثبت الفريمات،
            بتحصل تقطيع وتذبذب أسوأ من حد ثابت أقل.
        </div>
</section>
<section class="cf-card">
<h3>إعدادات FPS++ المناسبة</h3>
<div class="cf-grid-2">
<div class="cf-setting">
<strong>30 FPS — الأكثر استقرارًا</strong>
                مناسب للأجهزة الأضعف، ولتجاوز المهمات والألغاز اللي تتأثر
                بالفيزياء فوق 30 FPS.
            </div>
<div class="cf-setting">
<strong>60 FPS — الخيار المتوازن</strong>
                مناسب لمعالج حديث، ويعطي سلاسة واضحة مع مشاكل أقل من 90 أو 120 FPS.
            </div>
<div class="cf-setting">
<strong>Menu Fix</strong>
                فعّله من Advanced Settings إذا اختيار العناصر سريع وتضطر تحرك
                العصا بنقرة خفيفة.
            </div>
<div class="cf-setting">
<strong>NPC Stutter Fix</strong>
                يفيد خصوصًا عند تجمد NPC أو Enemy AI على OpenGL مع NVIDIA.
            </div>
</div>
<div class="cf-warning">
            إذا حصل Freeze دائم أو خلل في مهمة، ارجع مؤقتًا إلى 30 FPS، أو استخدم
            Static 30 FPS، أو عطل FPS++ إلى أن تتجاوز المكان ثم فعله من جديد.
        </div>
</section>
<section class="cf-card">
<h3>مشاكل معروفة عند اللعب فوق 30 FPS</h3>
<div class="cf-grid-2">
<div class="cf-problem">
<strong>القفز أثناء التسلق</strong>
                مسافة القفز تزيد فوق 30 FPS، وهذا يغير فيزياء اللعبة.
            </div>
<div class="cf-problem">
<strong>مهمة Mail Delivery</strong>
                الرسالة تنجرف بسرعة في النهر. ضع الحد على 30 FPS قبل بدء المهمة.
            </div>
<div class="cf-problem">
<strong>Hila Rao Shrine</strong>
                الأجسام العائمة قد تعلق في الجدار أو تحت الماء. ادخل الضريح على 30 FPS.
            </div>
<div class="cf-problem">
<strong>Shai Utoh Shrine</strong>
                حركة الصندوق والميزان قد تمنع الوصول إلى الصندوق الثاني.
            </div>
</div>
<div class="cf-info">
            لو ظهرت مشكلة في Cutscene أو Boss أو لغز فيزيائي، خفض الحد إلى
            30 أو 60 FPS قبل المشهد بدل حذف الحزمة بالكامل.
        </div>
</section>
<section class="cf-card">
<h3>التقطيع وبناء Shader Cache</h3>
<p>
            التوقفات القصيرة أثناء اللعب تكون طبيعية لما Cemu يبني Shader Cache
            أو Vulkan Pipeline Cache لأول مرة. بعد اكتمال بناء المشاهد، يقل
            التقطيع عند تكرارها.
        </p>
<div class="cf-warning">
            تحديث تعريف كرت الشاشة أو Cemu قد يعيد بعض تقطيع Vulkan لأن Pipeline
            Cache القديم ما يقدر يعيد استخدام جميع البيانات.
        </div>
<div class="cf-note">
            إذا امتلأت RAM، يبدأ Windows باستخدام Pagefile على القرص، وهذا أبطأ
            بكثير وقد يسبب تقطيعًا قويًا أو كراش.
        </div>
<div class="cf-image">
<button aria-label="عرض الصورة بحجمها الطبيعي" class="cf-image-viewer" data-full="https://www.rom-game.fr/multimedia/news/200105_vulkan.jpg" type="button"><img alt="تشغيل Zelda Breath of the Wild على Cemu باستخدام Vulkan مع عرض الفريمات" loading="lazy" src="https://www.rom-game.fr/multimedia/news/200105_vulkan.jpg" /></button>
<p class="cf-caption">
        مثال لتشغيل Breath of the Wild على Cemu باستخدام Vulkan مع مراقبة الفريمات واستهلاك المعالج والذاكرة.
    </p>
</div></section>
<section class="cf-card">
<h3>انخفاض الأداء بعد 30 دقيقة</h3>
<p>
            المشكلة تظهر غالبًا مع Vulkan على كروت أقل من 4GB VRAM. جرب تقليل
            Resolution وShadow Resolution، أو أعد تشغيل Cemu لتفريغ الموارد
            المحجوزة مؤقتًا.
        </p>
<div class="cf-success">
            إذا رجع الأداء بعد إعادة تشغيل المحاكي أو بعد مشهد ذاكرة، فهذا مؤشر
            أن استهلاك VRAM هو السبب الأقرب.
        </div>
</section>
<section class="cf-card">
<h3>خطأ Vulkan: failed to submit command buffer -4</h3>
<div class="cf-code" style="display: block; margin: 12px 0px; padding: 12px; text-align: left; white-space: normal;">
            vkWaitForFences: Returned unhandled error -4<br />
            Unrecoverable error in Vulkan renderer<br />
            Msg: failed to submit command buffer. Error -4
        </div>
<div class="cf-grid-2">
<div class="cf-problem">
<strong>راجع Log.txt</strong>
                تأكد أن الأسطر تظهر مباشرة قبل Stack Trace قرب نهاية السجل.
            </div>
<div class="cf-problem">
<strong>ثبت تعريفًا نظيفًا</strong>
                أزل تعريف كرت الشاشة وثبته من جديد، خصوصًا مع الكروت القديمة.
            </div>
<div class="cf-problem">
<strong>قلل استهلاك VRAM</strong>
                خفض الدقة والظلال وأوقف الحزم الثقيلة.
            </div>
<div class="cf-problem">
<strong>جرب OpenGL</strong>
                استخدمه كاختبار لمعرفة هل المشكلة مرتبطة بـVulkan.
            </div>
</div>
</section>
<section class="cf-card">
<h3>مشاكل Vulkan وOpenGL الشائعة</h3>
<div class="cf-grid-2">
<div class="cf-problem">
<strong>سماء سوداء أو رمادية على NVIDIA</strong>
                تحدث مع تعريفات قديمة على Vulkan. حدث التعريف أو جرب OpenGL.
            </div>
<div class="cf-problem">
<strong>Textures تختفي عند التشغيل عبر Steam</strong>
                عطل Steam Shader Pre-Caching من إعدادات Steam.
            </div>
<div class="cf-problem">
<strong>AMD Crashes على OpenGL</strong>
                فعّل Workaround المناسب من Graphic Packs، أو انتقل إلى Vulkan.
            </div>
<div class="cf-problem">
<strong>ظلال AMD وIntel</strong>
                استخدم حزمة
                <span class="cf-code">AMD &amp; Intel Shadows</span>.
            </div>
<div class="cf-problem">
<strong>دخان الانفجارات على NVIDIA</strong>
                استخدم
                <span class="cf-code">NVIDIA Explosion Smoke</span>.
            </div>
<div class="cf-problem">
<strong>مربع الظل حول مشاعل Kakariko</strong>
                فعّل
                <span class="cf-code">Kakariko Torch Shadows</span>.
            </div>
<div class="cf-problem">
<strong>السحب ممدودة بشكل عمودي</strong>
                فعّل
                <span class="cf-code">Stretched Clouds</span>.
            </div>
<div class="cf-problem">
<strong>ماء أبيض أو ألوان مشوهة</strong>
                على OpenGL تأكد أن
                <span class="cf-code">Full sync at GX2DrawDone</span>
                مفعّل عند استمرار المشكلة.
            </div>
</div>
</section>
<section class="cf-card">
<h3>استهلاك RAM وتجمد NPC</h3>
<div class="cf-grid-2">
<div class="cf-setting">
<strong>Shader Mul Accuracy</strong>
                لا تخفضه إلى Min إلا إذا نفدت RAM وبدأت اللعبة تكراش؛ بعض
                المؤثرات راح تظهر بجودة أقل.
            </div>
<div class="cf-setting">
<strong>Enemy AI وNPC Freeze</strong>
                على OpenGL مع NVIDIA فعّل FPS++ CPU Occlusion Query أو
                NPC Stutter Fix.
            </div>
</div>
<div class="cf-note">
            البديل هو تفعيل
            <span class="cf-code">Full sync at GX2DrawDone</span>،
            لكنه قد يقلل الأداء.
        </div>
</section>
<section class="cf-card">
<h3>إصدارات Zelda المتوافقة مع FPS++</h3>
<div class="cf-grid-3">
<div class="cf-version-card">
<strong>1.5.0 / v208</strong>
                مدعوم بالكامل وهو الإصدار المطلوب حاليًا.
            </div>
<div class="cf-mini">
<strong>1.4.1 / v192 و1.4.0 / v176</strong>
                تحتاج إصدارات Cemu قديمة، لذلك ما ينصح باستخدامها.
            </div>
<div class="cf-mini">
<strong>1.3.4 / v160 وما قبل</strong>
                غير مناسبة لـFPS++ الحديث.
            </div>
</div>
<div class="cf-danger">
            الحل الصحيح مو تنزيل Cemu قديم عشان يناسب Update قديم؛ حدث نسختك
            الأصلية من اللعبة إلى v208 واستخدم Cemu حديث.
        </div>
</section>
<section class="cf-card">
<h3>شروحات HAKAMIQ المرتبطة</h3>
<div class="cf-video-grid">
<article class="cf-video">
<button aria-label="عرض صورة الفيديو بحجمها الطبيعي" class="cf-thumb cf-image-viewer" data-full="https://i.ytimg.com/vi/PsWg6gqrxlk/hqdefault.jpg" type="button"><img alt="شرح محاكي سيمو Cemu لتشغيل ألعاب Wii U باحتراف 2024" loading="lazy" src="https://i.ytimg.com/vi/PsWg6gqrxlk/hqdefault.jpg" /><span class="cf-play">▶</span><span class="cf-duration">4:59</span></button>
<div class="cf-video-content">
<span class="cf-video-label">شرح Cemu الأساسي</span>
<h4>شرح محاكي سيمو Cemu لتشغيل ألعاب Wii U باحتراف 2024</h4>
<p>
                        مناسب لفهم واجهة المحاكي، إضافة الألعاب، وقائمة التوافق
                        قبل الدخول في FPS++ وGraphic Packs.
                    </p>
<a class="cf-button" href="https://www.youtube.com/watch?v=PsWg6gqrxlk" rel="noopener noreferrer" target="_blank">
                        مشاهدة الشرح
                    </a>
</div>
</article>
<article class="cf-video">
<button aria-label="عرض صورة الفيديو بحجمها الطبيعي" class="cf-thumb cf-image-viewer" data-full="https://i.ytimg.com/vi/HIR298KkSXA/hqdefault.jpg" type="button"><img alt="طريقة تثبيت Shader Cache لتثبيت الفريمات في Cemu" loading="lazy" src="https://i.ytimg.com/vi/HIR298KkSXA/hqdefault.jpg" /><span class="cf-play">▶</span><span class="cf-duration">5:01</span></button>
<div class="cf-video-content">
<span class="cf-video-label">حل التقطيع</span>
<h4>طريقة تثبيت Shader Cache لتثبيت الفريمات في Cemu</h4>
<p>
                        شرح مرتبط مباشرة بقسم التقطيع وبناء Shader Cache
                        واستقرار الفريمات داخل ألعاب Cemu.
                    </p>
<a class="cf-button" href="https://www.youtube.com/watch?v=HIR298KkSXA" rel="noopener noreferrer" target="_blank">
                        مشاهدة الشرح
                    </a>
</div>
</article>
</div>
</section>
<section class="cf-source-card">
<h3>المصادر الرسمية</h3>
<div class="cf-links">
<a class="cf-link" href="https://wiki.cemu.info/wiki/FPS%2B%2B" rel="noopener noreferrer" target="_blank">
                صفحة FPS++ في Cemu Wiki
            </a>
<a class="cf-link" href="https://wiki.cemu.info/wiki/The_Legend_of_Zelda:_Breath_of_the_Wild" rel="noopener noreferrer" target="_blank">
                صفحة Zelda BOTW والمشاكل
            </a>
<a class="cf-link" href="https://wiki.cemu.info/wiki/Graphic_packs" rel="noopener noreferrer" target="_blank">
                شرح Graphic Packs
            </a>
<a class="cf-link" href="https://wiki.cemu.info/wiki/Graphic_packs_installation_and_usage" rel="noopener noreferrer" target="_blank">
                تثبيت واستخدام Graphic Packs
            </a>
<a class="cf-link" href="https://wiki.cemu.info/wiki/Assembly_Patching" rel="noopener noreferrer" target="_blank">
                شرح Assembly Patching
            </a>
<a class="cf-link" href="https://wiki.cemu.info/wiki/Cemuhook" rel="noopener noreferrer" target="_blank">
                حالة Cemuhook الحالية
            </a>
<a class="cf-link" href="https://github.com/cemu-project/cemu_graphic_packs" rel="noopener noreferrer" target="_blank">
                مستودع Community Graphic Packs
            </a>
<a class="cf-link" href="https://github.com/cemu-project/Cemu/releases/latest" rel="noopener noreferrer" target="_blank">
                تنزيل أحدث Cemu
            </a>
</div>
</section>
<footer class="cf-footer">
        حدث اللعبة إلى v208، نزل آخر Graphic Packs، فعّل FPS++ وحدد 30 أو
        60 FPS حسب ثبات جهازك. عند أي خلل في مهمة أو فيزياء، ارجع مؤقتًا إلى 30 FPS.
    </footer>
</div>

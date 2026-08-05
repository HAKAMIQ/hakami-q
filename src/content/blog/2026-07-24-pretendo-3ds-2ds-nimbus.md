---
title: 'طريقة تشغيل Pretendo على أجهزة 3DS و2DS باستخدام Nimbus'
description: 'Pretendo Network Nimbus v2.1.1 Luma3DS 13.4 3DS / 2DS Family شرح تنزيل Nimbus، وتفعيل باتشات Luma3DS، والتبديل بين Nintendo وPretendo، وربط حساب PNID، مع معالجة مشكلة الملفات المفق…'
pubDate: '2026-07-24T22:47:46.473+03:00'
updatedDate: '2026-07-25T08:09:36.387+03:00'
heroImage: '../../assets/blog-placeholder-1.jpg'
heroImageUrl: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhlvLzNyq62CYSorEW9qp6CFE-1zG3rp51UVKhyphenhyphencvVug0RTg_PIzjQ3rn3p93dykrernLsSe63BobsXI27fdk1l1Heg7cPk3PDcKNPzdzuZX6-7jTIT6N6fwjONn8J7WuoWJWFjaldhtK3I4rVYFSUYVNQNn1ckWnYwbaHvx_5aevmVtQvwd2R4UcgD5mY/s1600/6ps5ec6ps5ec6ps5.jpg'
originalUrl: 'https://hakamiq1.blogspot.com/2026/07/pretendo-3ds-2ds-nimbus.html'
labels: ["N3DS","Nintendo"]
---

<style id="hakamiq-fullscreen-image-style">
    .hakamiq-image-viewer {
        position: relative !important;
        display: block !important;
        width: 100% !important;
        margin: 0 !important;
        padding: 0 !important;
        overflow: hidden !important;
        color: inherit !important;
        background: #08090c !important;
        border: 0 !important;
        border-radius: inherit !important;
        box-shadow: none !important;
        cursor: zoom-in !important;
        font: inherit !important;
        line-height: 0 !important;
        text-align: center !important;
        appearance: none !important;
        -webkit-appearance: none !important;
    }

    .hakamiq-image-viewer::after {
        content: "عرض بالحجم الكامل";
        position: absolute;
        left: 10px;
        bottom: 10px;
        z-index: 2;
        display: inline-flex;
        align-items: center;
        min-height: 30px;
        padding: 4px 10px;
        color: #fff;
        background: rgba(8,9,12,.82);
        border: 1px solid rgba(255,255,255,.18);
        border-radius: 7px;
        font-family: "Tajawal","Cairo",Arial,sans-serif;
        font-size: 11.5px;
        font-weight: 900;
        line-height: 1.4;
        direction: rtl;
        pointer-events: none;
        opacity: .88;
        transition: opacity .18s ease, transform .18s ease;
    }

    .hakamiq-image-viewer:hover::after,
    .hakamiq-image-viewer:focus-visible::after {
        opacity: 1;
        transform: translateY(-2px);
    }

    .hakamiq-image-viewer img {
        display: block !important;
        width: 100% !important;
        height: auto !important;
        margin: 0 !important;
        object-fit: contain !important;
        transition: transform .2s ease, filter .2s ease !important;
    }

    .hakamiq-image-viewer:hover img {
        transform: scale(1.012);
        filter: brightness(1.04);
    }
.hakamiq-lightbox {
        position: fixed;
        inset: 0;
        z-index: 2147483646;
        display: none;
        align-items: center;
        justify-content: center;
        padding: 62px 18px 20px;
        background: rgba(0,0,0,.94);
        backdrop-filter: blur(6px);
        -webkit-backdrop-filter: blur(6px);
        direction: rtl;
    }

    .hakamiq-lightbox.is-open {
        display: flex;
    }

    .hakamiq-lightbox-stage {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        width: min(96vw, 1700px);
        height: calc(100vh - 86px);
    }

    .hakamiq-lightbox-image {
        display: block;
        max-width: 100%;
        max-height: 100%;
        width: auto;
        height: auto;
        margin: 0;
        object-fit: contain;
        background: #07080a;
        border: 1px solid rgba(255,255,255,.14);
        border-radius: 10px;
        box-shadow: 0 18px 60px rgba(0,0,0,.55);
    }

    .hakamiq-lightbox-close {
        position: fixed;
        top: 13px;
        right: 14px;
        z-index: 2147483647;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 42px;
        height: 42px;
        margin: 0;
        padding: 0;
        color: #fff;
        background: #ef3027;
        border: 1px solid rgba(255,255,255,.2);
        border-radius: 50%;
        font-family: Arial,sans-serif;
        font-size: 26px;
        font-weight: 900;
        line-height: 1;
        cursor: pointer;
        appearance: none;
        -webkit-appearance: none;
    }

    .hakamiq-lightbox-caption {
        position: fixed;
        right: 70px;
        top: 18px;
        left: 70px;
        z-index: 2147483647;
        overflow: hidden;
        color: #fff;
        font-family: "Tajawal","Cairo",Arial,sans-serif;
        font-size: 13px;
        font-weight: 800;
        line-height: 1.5;
        text-align: center;
        text-overflow: ellipsis;
        white-space: nowrap;
        pointer-events: none;
    }

    @media (max-width: 600px) {
        .hakamiq-image-viewer::after {
            left: 7px;
            bottom: 7px;
            min-height: 27px;
            padding: 3px 8px;
            font-size: 10.5px;
        }

        .hakamiq-lightbox {
            padding: 54px 8px 10px;
        }

        .hakamiq-lightbox-stage {
            width: 100%;
            height: calc(100vh - 66px);
        }

        .hakamiq-lightbox-close {
            top: 8px;
            right: 8px;
            width: 38px;
            height: 38px;
        }

        .hakamiq-lightbox-caption {
            right: 54px;
            top: 13px;
            left: 54px;
            font-size: 11.5px;
        }
    }
</style>
<style>
    .pretendo-3ds-guide {
        --p3-red: #ef3027;
        --p3-red-dark: #a81410;
        --p3-blue: #29b6f6;
        --p3-gold: #ffd600;
        --p3-green: #00e676;
        --p3-orange: #ffab40;
        --p3-bg: #101115;
        --p3-card: #191b21;
        --p3-soft: #14161b;
        --p3-border: rgba(255,255,255,.09);
        --p3-text: #f4f4f4;
        --p3-muted: #aeb4bf;

        direction: rtl;
        width: 100%;
        max-width: 1000px;
        margin: 0 auto;
        padding: 20px;
        color: var(--p3-text);
        background: var(--p3-bg);
        border: 1px solid var(--p3-border);
        border-radius: 16px;
        box-sizing: border-box;
        font-family: "Tajawal","Cairo",Arial,sans-serif;
        font-size: 16px;
        line-height: 1.9;
        text-align: right;
    }

    .pretendo-3ds-guide,
    .pretendo-3ds-guide * {
        box-sizing: border-box;
    }

    .pretendo-3ds-guide p {
        margin: 0 0 14px;
    }

    .pretendo-3ds-guide a {
        color: var(--p3-blue);
        text-decoration: none;
        font-weight: 800;
    }

    .pretendo-3ds-guide a:hover {
        color: var(--p3-gold);
    }

    .p3-hero {
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

    .p3-badges {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 8px;
        margin-bottom: 10px;
    }

    .p3-badge {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-height: 29px;
        padding: 3px 12px;
        color: #fff;
        background: linear-gradient(135deg,var(--p3-red),var(--p3-red-dark));
        border-radius: 999px;
        font-size: 12px;
        font-weight: 900;
    }

    .p3-badge-green {
        background: linear-gradient(135deg,#00b85f,#00783f);
    }

    .p3-badge-blue {
        background: linear-gradient(135deg,#217eb5,#155170);
    }

    .p3-hero h2 {
        max-width: 900px;
        margin: 8px auto 10px;
        color: var(--p3-blue);
        font-size: 28px;
        line-height: 1.5;
    }

    .p3-hero p {
        max-width: 860px;
        margin: 8px auto 0;
        color: #dadde4;
    }

    .p3-card,
    .p3-source-card {
        margin-bottom: 20px;
        padding: 23px;
        overflow: hidden;
        background: linear-gradient(145deg,var(--p3-card),var(--p3-soft));
        border: 1px solid var(--p3-border);
        border-radius: 13px;
        box-shadow: 0 7px 22px rgba(0,0,0,.18);
    }

    .p3-card h3,
    .p3-source-card h3 {
        position: relative;
        margin: 0 0 18px;
        padding: 0 15px 11px 0;
        color: var(--p3-gold);
        border-bottom: 1px solid rgba(255,255,255,.09);
        font-size: 19px;
        line-height: 1.55;
    }

    .p3-card h3::before,
    .p3-source-card h3::before {
        content: "";
        position: absolute;
        top: 7px;
        right: 0;
        width: 4px;
        height: 18px;
        background: var(--p3-red);
        border-radius: 4px;
    }

    .p3-card h4 {
        margin: 22px 0 10px;
        color: var(--p3-blue);
        font-size: 16.5px;
        line-height: 1.6;
    }

    .p3-note,
    .p3-info,
    .p3-warning,
    .p3-success,
    .p3-danger {
        margin: 17px 0;
        padding: 15px 17px;
        color: #eceef2;
        background: rgba(0,0,0,.22);
        border-radius: 9px;
    }

    .p3-note { border-right: 4px solid var(--p3-blue); }
    .p3-info { border-right: 4px solid var(--p3-gold); }
    .p3-warning { border-right: 4px solid var(--p3-orange); }
    .p3-success { border-right: 4px solid var(--p3-green); }
    .p3-danger { border-right: 4px solid var(--p3-red); }

    .p3-inline {
        direction: ltr;
        unicode-bidi: isolate;
        display: inline-block;
        max-width: 100%;
        padding: 2px 7px;
        color: var(--p3-green);
        background: #07080a;
        border: 1px solid rgba(0,230,118,.14);
        border-radius: 5px;
        font-family: Consolas,Monaco,monospace;
        font-size: .92em;
        white-space: nowrap;
    }

    .p3-grid-2,
    .p3-grid-3,
    .p3-links {
        display: grid;
        gap: 12px;
        margin: 17px 0;
    }

    .p3-grid-2,
    .p3-links {
        grid-template-columns: repeat(2,minmax(0,1fr));
    }

    .p3-grid-3 {
        grid-template-columns: repeat(3,minmax(0,1fr));
    }

    .p3-mini,
    .p3-method,
    .p3-file,
    .p3-problem {
        min-width: 0;
        padding: 16px;
        background: rgba(0,0,0,.20);
        border: 1px solid rgba(255,255,255,.08);
        border-radius: 10px;
    }

    .p3-mini strong,
    .p3-method strong,
    .p3-file strong,
    .p3-problem strong {
        display: block;
        margin-bottom: 7px;
        color: var(--p3-blue);
        font-size: 15px;
    }

    .p3-method-main {
        border-top: 3px solid var(--p3-green);
    }

    .p3-method-main strong {
        color: var(--p3-green);
    }

    .p3-method-alt {
        border-top: 3px solid var(--p3-blue);
    }

    .p3-file code {
        direction: ltr;
        unicode-bidi: isolate;
        display: block;
        color: #c8f9db;
        font-family: Consolas,Monaco,monospace;
        font-size: 11.5px;
        line-height: 1.65;
        text-align: left;
        overflow-wrap: anywhere;
    }

    .p3-button-row {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin: 13px 0 0;
    }

    .p3-button {
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

    .p3-button-green {
        background: linear-gradient(135deg,#00a95a,#006f3b);
    }

    .p3-button-grey {
        background: linear-gradient(135deg,#5a5e68,#343740);
    }

    .p3-button:hover {
        color: #fff !important;
        filter: brightness(1.08);
    }

    .p3-step-grid {
        display: grid !important;
        grid-template-columns: 1fr !important;
        gap: 10px !important;
        width: 100% !important;
        margin: 15px 0 0 !important;
        padding: 0 !important;
        direction: rtl !important;
    }

    .p3-step-row {
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

    .p3-step-number {
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
        background: linear-gradient(135deg,var(--p3-red),var(--p3-red-dark)) !important;
        border: 0 !important;
        border-radius: 50% !important;
        font-size: 13px !important;
        font-weight: 900 !important;
        line-height: 28px !important;
        direction: ltr !important;
        text-align: center !important;
    }

    .p3-step-text {
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

    .p3-step-media {
        grid-column: 1 / -1 !important;
        display: grid !important;
        grid-template-columns: 1fr !important;
        gap: 10px !important;
        width: 100% !important;
        margin: 10px 0 2px !important;
    }

    .p3-step-media-2 {
        grid-template-columns: repeat(2,minmax(0,1fr)) !important;
    }

    .p3-shot {
        min-width: 0;
        overflow: hidden;
        background: #0b0d11;
        border: 1px solid rgba(255,255,255,.10);
        border-radius: 10px;
        box-shadow: 0 6px 18px rgba(0,0,0,.18);
    }

    .p3-shot a {
        display: block;
        overflow: hidden;
        background: #08090c;
    }

    .p3-shot img {
        display: block;
        width: 100%;
        max-height: 620px;
        height: auto;
        margin: 0;
        object-fit: contain;
        background: #08090c;
    }

    .p3-shot p {
        margin: 0 !important;
        padding: 9px 11px 10px;
        color: var(--p3-muted);
        font-size: 12.5px;
        line-height: 1.65;
        text-align: center;
    }

    .p3-cover {
        margin: 0 0 20px;
    }

    .p3-cover img {
        max-height: 720px;
    }

    .p3-path-box {
        direction: ltr;
        unicode-bidi: isolate;
        display: grid;
        grid-template-columns: repeat(2,minmax(0,1fr));
        gap: 9px;
        margin: 17px 0;
    }

    .p3-path {
        padding: 11px 12px;
        color: #c8f9db;
        background: #07080a;
        border: 1px solid rgba(0,230,118,.12);
        border-radius: 8px;
        font-family: Consolas,Monaco,monospace;
        font-size: 11.5px;
        line-height: 1.65;
        text-align: left;
        overflow-wrap: anywhere;
    }

    .p3-switch {
        display: grid;
        grid-template-columns: repeat(2,minmax(0,1fr));
        gap: 14px;
        margin: 17px 0;
    }

    .p3-switch-card {
        min-width: 0;
        padding: 16px;
        background: rgba(0,0,0,.20);
        border: 1px solid rgba(255,255,255,.08);
        border-radius: 10px;
    }

    .p3-switch-card strong {
        display: block;
        margin-bottom: 7px;
        color: var(--p3-blue);
    }

    .p3-link {
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

    .p3-link:hover {
        background: linear-gradient(135deg,var(--p3-red),var(--p3-red-dark));
    }

    .p3-footer {
        padding: 17px;
        color: #e1e3e8;
        background: #24262c;
        border: 1px solid rgba(255,255,255,.08);
        border-radius: 10px;
        text-align: center;
    }

    @media (max-width:760px) {
        .pretendo-3ds-guide {
            padding: 14px;
            font-size: 15px;
            border-radius: 12px;
        }

        .p3-hero {
            padding: 19px;
        }

        .p3-hero h2 {
            font-size: 22px;
        }

        .p3-card,
        .p3-source-card {
            padding: 18px;
        }

        .p3-grid-2,
        .p3-grid-3,
        .p3-links,
        .p3-path-box,
        .p3-switch,
        .p3-step-media-2 {
            grid-template-columns: 1fr !important;
        }
    }

    @media (max-width:520px) {
        .p3-step-row {
            grid-template-columns: 30px minmax(0,1fr) !important;
            column-gap: 8px !important;
            padding: 8px !important;
        }

        .p3-step-number {
            width: 26px !important;
            height: 26px !important;
            line-height: 26px !important;
        }

        .p3-inline {
            white-space: normal;
            overflow-wrap: anywhere;
        }

        .p3-button-row {
            flex-direction: column;
        }

        .p3-button {
            width: 100%;
        }
    }
</style>
<div class="pretendo-3ds-guide">
<header class="p3-hero">
<div class="p3-badges">
<span class="p3-badge">Pretendo Network</span>
<span class="p3-badge p3-badge-green">Nimbus v2.1.1</span>
<span class="p3-badge p3-badge-blue">Luma3DS 13.4</span>
<span class="p3-badge">3DS / 2DS Family</span></div>
<p>
            شرح تنزيل Nimbus، وتفعيل باتشات Luma3DS، والتبديل بين Nintendo
            وPretendo، وربط حساب PNID، مع معالجة مشكلة الملفات المفقودة بعد
            التثبيت من Universal-Updater وطريقة حماية شارات Badge Arcade.
        </p>
</header>
<figure class="p3-shot p3-cover">
<button aria-label="عرض الصورة بحجمها الطبيعي" class="hakamiq-image-viewer" data-full="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhlvLzNyq62CYSorEW9qp6CFE-1zG3rp51UVKhyphenhyphencvVug0RTg_PIzjQ3rn3p93dykrernLsSe63BobsXI27fdk1l1Heg7cPk3PDcKNPzdzuZX6-7jTIT6N6fwjONn8J7WuoWJWFjaldhtK3I4rVYFSUYVNQNn1ckWnYwbaHvx_5aevmVtQvwd2R4UcgD5mY/s2752/6ps5ec6ps5ec6ps5.jpg" data-original="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhlvLzNyq62CYSorEW9qp6CFE-1zG3rp51UVKhyphenhyphencvVug0RTg_PIzjQ3rn3p93dykrernLsSe63BobsXI27fdk1l1Heg7cPk3PDcKNPzdzuZX6-7jTIT6N6fwjONn8J7WuoWJWFjaldhtK3I4rVYFSUYVNQNn1ckWnYwbaHvx_5aevmVtQvwd2R4UcgD5mY/s1600/6ps5ec6ps5ec6ps5.jpg" type="button"><img alt="تشغيل Pretendo على أجهزة Nintendo 3DS و2DS باستخدام Nimbus" loading="eager" src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhlvLzNyq62CYSorEW9qp6CFE-1zG3rp51UVKhyphenhyphencvVug0RTg_PIzjQ3rn3p93dykrernLsSe63BobsXI27fdk1l1Heg7cPk3PDcKNPzdzuZX6-7jTIT6N6fwjONn8J7WuoWJWFjaldhtK3I4rVYFSUYVNQNn1ckWnYwbaHvx_5aevmVtQvwd2R4UcgD5mY/s1600/6ps5ec6ps5ec6ps5.jpg" /></button>
<p>تشغيل Pretendo Network على أجهزة 3DS و2DS باستخدام تطبيق Nimbus.</p>
</figure>
<section class="p3-card">
<h3>تحذيرات لازم تقرأها قبل البداية</h3>
<div class="p3-danger">
            لا تحذف حساب NNID الموجود على جهازك. حذفه قد يفقدك الشارات والثيمات
            والألعاب القابلة لإعادة التنزيل وبيانات Pokémon Bank.
        </div>
<div class="p3-danger">
            لا تستخدم System Transfer أثناء اتصالك بخوادم Pretendo. الخدمة غير
            مدعومة حاليًا، ومحاولة النقل قد تمنع الجهاز من الاتصال أونلاين لاحقًا.
        </div>
<div class="p3-warning">
            شارات Nintendo Badge Arcade مرتبطة ببيانات محلية وبيانات الخادم.
            جمع الشارات على شبكة ثم فتح التطبيق على الشبكة الثانية قد يجعلها تختفي.
        </div>
</section>
<section class="p3-card">
<h3>المتطلبات</h3>
<div class="p3-grid-3">
<div class="p3-mini">
<strong>جهاز معدل</strong>
                3DS أو 2DS يعمل بـboot9strap وLuma3DS.
            </div>
<div class="p3-mini">
<strong>Luma3DS حديث</strong>
                Nimbus يحتاج Luma3DS 13.0 أو أحدث. الإصدار الحالي وقت تحديث
                الموضوع هو 13.4.
            </div>
<div class="p3-mini">
<strong>بطاقة SD سليمة</strong>
                خذ نسخة احتياطية لمحتواها قبل نسخ ملفات Nimbus.
            </div>
</div>
<div class="p3-note">
            إيقاف خدمات Nintendo Network الرسمية ما يمنع المتصفح أو اتصال
            تطبيقات Homebrew بالإنترنت؛ التوقف يخص خوادم الألعاب والخدمات الرسمية.
        </div>
<div class="p3-success">
            طريقة Nimbus على 3DS و2DS لا تحتاج تغيير DNS. إعدادات SSSL وDNS تخص
            طريقة Wii U ولا تطبقها على جهاز 3DS.
        </div>
<div class="p3-button-row">
<a class="p3-button p3-button-green" href="https://3ds.hacks.guide/" rel="noopener noreferrer" target="_blank">
                دليل تعديل 3DS الرسمي
            </a>
<a class="p3-button" href="https://github.com/LumaTeam/Luma3DS/releases/latest" rel="noopener noreferrer" target="_blank">
                أحدث Luma3DS
            </a>
</div>
</section>
<section class="p3-card">
<h3>أفضل طريقة لتنزيل Nimbus</h3>
<div class="p3-grid-2">
<article class="p3-method p3-method-main">
<strong>Universal-Updater — الأسهل</strong>
<p>
                    افتح Universal-Updater وابحث عن Nimbus، ثم ثبت النسخة المطلوبة.
                    بعد التثبيت افتح Nimbus واضغط START حتى ينقل ملفات التحديث
                    والباتشات إلى أماكنها الصحيحة.
                </p>
</article>
<article class="p3-method p3-method-alt">
<strong>Combined ZIP — الأكثر وضوحًا</strong>
<p>
                    يحمل CIA و3DSX وجميع ملفات IPS المطلوبة. مناسب للتثبيت الأول
                    أو لحل مشكلة الملفات المفقودة.
                </p>
</article>
</div>
<div class="p3-info">
            بعد تنزيل Nimbus من Universal-Updater افتح التطبيق واضغط START لإكمال
            نقل الملفات. إذا لم تظهر ملفات IPS وnimbus.3gx وjuxt-prod.pem بعد ذلك،
            فك Combined ZIP في جذر بطاقة SD. دليل Pretendo الرسمي ما زال يحذر من
            أن التثبيت الأول من الجهاز قد يحتاج ملفات الباتشات المرتبطة بالإصدار.
        </div>
<div class="p3-button-row">
<a class="p3-button p3-button-green" href="https://db.universal-team.net/3ds/nimbus" rel="noopener noreferrer" target="_blank">
                Nimbus في Universal-DB
            </a>
<a class="p3-button" href="https://github.com/PretendoNetwork/Nimbus/releases/latest" rel="noopener noreferrer" target="_blank">
                صفحة Nimbus الرسمية
            </a>
<a class="p3-button p3-button-grey" href="https://github.com/PretendoNetwork/Nimbus/releases/download/v2.1.1/combined.2.1.1.zip" rel="noopener noreferrer" target="_blank">
                تحميل Combined 2.1.1
            </a>
</div>
</section>
<section class="p3-card">
<h3>التثبيت اليدوي باستخدام Combined ZIP</h3>
<div class="p3-step-grid">
<div class="p3-step-row">
<span class="p3-step-number">1</span>
<div class="p3-step-text">
                    اقفل الجهاز بالكامل وأخرج بطاقة SD وضعها في الكمبيوتر.
                </div>
</div>
<div class="p3-step-row">
<span class="p3-step-number">2</span>
<div class="p3-step-text">
                    افتح إصدار Nimbus v2.1.1 الصادر بتاريخ 9 يونيو 2026،
                    وحمل الملف
                    <span class="p3-inline">combined.2.1.1.zip</span>.
                </div>
<div class="p3-step-media">
<figure class="p3-shot">
<button aria-label="عرض الصورة بحجمها الطبيعي" class="hakamiq-image-viewer" data-full="https://pretendo.network/assets/images/docs/install/3ds/zip-highlight.webp" data-original="https://pretendo.network/assets/images/docs/install/3ds/zip-highlight.webp" type="button"><img alt="اختيار ملف combined من صفحة إصدار Nimbus الرسمية" loading="eager" src="https://pretendo.network/assets/images/docs/install/3ds/zip-highlight.webp" />
</button>
<p>اختر Combined ZIP للحصول على CIA و3DSX وباتشات Nimbus معًا.</p>
</figure>
</div>
</div>
<div class="p3-step-row">
<span class="p3-step-number">3</span>
<div class="p3-step-text">
                    فك محتويات ZIP في جذر بطاقة SD. وافق على Merge وReplace
                    عند ظهورها.
                </div>
</div>
<div class="p3-step-row">
<span class="p3-step-number">4</span>
<div class="p3-step-text">
                    تأكد من وجود ملفات التحديث والباتشات الموضحة تحت.
                </div>
</div>
<div class="p3-step-row">
<span class="p3-step-number">5</span>
<div class="p3-step-text">
                    أعد بطاقة SD إلى الجهاز وشغله.
                </div>
</div>
</div>
<div class="p3-path-box">
<div class="p3-path">SD:/3ds/nimbus/update/000400300000BC02.ips</div>
<div class="p3-path">SD:/3ds/nimbus/update/000400300000BD02.ips</div>
<div class="p3-path">SD:/3ds/nimbus/update/000400300000BE02.ips</div>
<div class="p3-path">SD:/3ds/nimbus/update/0004013000002902.ips</div>
<div class="p3-path">SD:/3ds/nimbus/update/0004013000002E02.ips</div>
<div class="p3-path">SD:/3ds/nimbus/update/0004013000002F02.ips</div>
<div class="p3-path">SD:/3ds/nimbus/update/0004013000003202.ips</div>
<div class="p3-path">SD:/3ds/nimbus/update/0004013000003802.ips</div>
<div class="p3-path">SD:/3ds/nimbus/update/juxt-prod.pem</div>
<div class="p3-path">SD:/3ds/nimbus/update/nimbus.3gx</div>
<div class="p3-path">SD:/cias/nimbus.cia</div>
<div class="p3-path">SD:/3ds/nimbus.3dsx</div>
</div>
<div class="p3-note">
            ملفات IPS و<span class="p3-inline">juxt-prod.pem</span> و
            <span class="p3-inline">nimbus.3gx</span> مطلوبة للتبديل بين الشبكتين.
            لتشغيل التطبيق تحتاج واحدًا فقط من
            <span class="p3-inline">nimbus.cia</span> أو
            <span class="p3-inline">nimbus.3dsx</span>، بينما Combined ZIP يوفر الاثنين.
        </div>
</section>
<section class="p3-card">
<h3>تفعيل باتشات Luma3DS</h3>
<div class="p3-step-grid">
<div class="p3-step-row">
<span class="p3-step-number">1</span>
<div class="p3-step-text">
                    اقفل الجهاز، واضغط باستمرار على SELECT أثناء تشغيله.
                </div>
</div>
<div class="p3-step-row">
<span class="p3-step-number">2</span>
<div class="p3-step-text">
                    فعّل
                    <span class="p3-inline">Enable loading external FIRMs and modules</span>.
                </div>
</div>
<div class="p3-step-row">
<span class="p3-step-number">3</span>
<div class="p3-step-text">
                    فعّل
                    <span class="p3-inline">Enable game patching</span>.
                </div>
<div class="p3-step-media">
<figure class="p3-shot">
<button aria-label="عرض الصورة بحجمها الطبيعي" class="hakamiq-image-viewer" data-full="https://forum.pretendo.network/uploads/default/original/3X/7/b/7b1e1da7c1cbc852ff49f9c046e67cf4b7c6b274.jpeg" data-original="https://forum.pretendo.network/uploads/default/original/3X/7/b/7b1e1da7c1cbc852ff49f9c046e67cf4b7c6b274.jpeg" type="button"><img alt="إعدادات Luma3DS مع تفعيل external FIRMs and modules وgame patching" loading="lazy" src="https://forum.pretendo.network/uploads/default/original/3X/7/b/7b1e1da7c1cbc852ff49f9c046e67cf4b7c6b274.jpeg" /></button>
<p>الصورتان المطلوبتان داخل Luma لازم تكونان مفعّلتين بعلامة X.</p>
</figure>
</div>
</div>
<div class="p3-step-row">
<span class="p3-step-number">4</span>
<div class="p3-step-text">
                    اضغط START لحفظ الإعدادات وتشغيل النظام.
                </div>
</div>
</div>
</section>
<section class="p3-card">
<h3>تثبيت Nimbus على HOME Menu باستخدام FBI</h3>
<div class="p3-step-grid">
<div class="p3-step-row">
<span class="p3-step-number">1</span>
<div class="p3-step-text">
                    افتح FBI ثم اختر
                    <span class="p3-inline">SD → cias</span>.
                </div>
</div>
<div class="p3-step-row">
<span class="p3-step-number">2</span>
<div class="p3-step-text">
                    حدد <span class="p3-inline">nimbus.cia</span>.
                </div>
</div>
<div class="p3-step-row">
<span class="p3-step-number">3</span>
<div class="p3-step-text">
                    اختر
                    <span class="p3-inline">Install CIA</span>
                    أو
                    <span class="p3-inline">Install and delete CIA</span>.
                </div>
</div>
<div class="p3-step-row">
<span class="p3-step-number">4</span>
<div class="p3-step-text">
                    بعد اكتمال التثبيت اضغط HOME، واخرج من FBI، وافتح الهدية
                    الجديدة لإظهار Nimbus على HOME Menu.
                </div>
</div>
</div>
<div class="p3-note">
            نسخة 3DSX لا تظهر كتطبيق مستقل على HOME Menu؛ شغلها من Homebrew Launcher.
        </div>
</section>
<section class="p3-card">
<h3>التبديل بين Nintendo وPretendo</h3>
<p>
            افتح Nimbus من HOME Menu أو Homebrew Launcher، ثم اختر Nintendo
            أو Pretendo. اختيار الشبكة يستمر بعد إعادة تشغيل الجهاز.
        </p>
<div class="p3-switch">
<article class="p3-switch-card">
<strong>Nintendo</strong>
                استخدمه للرجوع إلى الحساب والبيئة الرسمية القديمة عند الحاجة.
            </article>
<article class="p3-switch-card">
<strong>Pretendo</strong>
                استخدمه للاتصال بخوادم Pretendo والخدمات المدعومة.
            </article>
</div>
<div class="p3-step-media p3-step-media-2">
<figure class="p3-shot">
<button aria-label="عرض الصورة بحجمها الطبيعي" class="hakamiq-image-viewer" data-full="https://db.universal-team.net/assets/images/screenshots/nimbus/nintendo.png" data-original="https://db.universal-team.net/assets/images/screenshots/nimbus/nintendo.png" type="button"><img alt="شاشة اختيار Nintendo داخل Nimbus على 3DS" loading="lazy" src="https://db.universal-team.net/assets/images/screenshots/nimbus/nintendo.png" /></button>
<p>اختيار Nintendo داخل Nimbus.</p>
</figure>
<figure class="p3-shot">
<button aria-label="عرض الصورة بحجمها الطبيعي" class="hakamiq-image-viewer" data-full="https://db.universal-team.net/assets/images/screenshots/nimbus/pretendo.png" data-original="https://db.universal-team.net/assets/images/screenshots/nimbus/pretendo.png" type="button"><img alt="شاشة اختيار Pretendo داخل Nimbus على 3DS" loading="lazy" src="https://db.universal-team.net/assets/images/screenshots/nimbus/pretendo.png" /></button>
<p>اختيار Pretendo داخل Nimbus.</p>
</figure>
</div>
<div class="p3-info">
            ظهور شاشة سوداء لبضع ثوانٍ ثم الرجوع إلى HOME Menu أثناء التبديل
            سلوك طبيعي. افتح Nimbus مرة ثانية للتأكد من الشبكة المختارة.
        </div>
</section>
<section class="p3-card">
<h3>هل تحتاج حساب PNID؟</h3>
<p>
            أغلب ألعاب 3DS لا تعتمد على NNID للدخول إلى خوادم اللعب، لذلك
            PNID ليس مطلوبًا لمعظم الألعاب. بعض العمليات تحتاجه، وNintendo Badge
            Arcade هو المثال المعروف الذي يحتاج حسابًا للاستخدام العام، لكنه غير
            مدعوم حاليًا على Pretendo.
        </p>
<div class="p3-step-grid">
<div class="p3-step-row">
<span class="p3-step-number">1</span>
<div class="p3-step-text">
                    افتح Nimbus واختر Pretendo.
                </div>
</div>
<div class="p3-step-row">
<span class="p3-step-number">2</span>
<div class="p3-step-text">
                    افتح System Settings ثم Nintendo Network ID Settings.
                    الاسم يبقى Nintendo داخل الواجهة، لكن الاتصال يذهب إلى Pretendo.
                </div>
</div>
<div class="p3-step-row">
<span class="p3-step-number">3</span>
<div class="p3-step-text">
                    أنشئ PNID من الجهاز أو اربط حسابًا أنشأته من موقع Pretendo.
                </div>
</div>
<div class="p3-step-row">
<span class="p3-step-number">4</span>
<div class="p3-step-text">
                    استخدم اسمًا مختلفًا عن اسم NNID المرتبط سابقًا بالجهاز.
                </div>
</div>
</div>
<div class="p3-success">
            Pretendo يوصي بإنشاء PNID من الجهاز حاليًا لأن إنشاء الحساب من الموقع
            لا يسمح بتعديل جميع بيانات المستخدم.
        </div>
</section>
<section class="p3-card">
<h3>كيف يعمل Nimbus؟</h3>
<p>
            Nimbus ينشئ حسابًا محليًا ثانيًا مضبوطًا على بيئة
            <span class="p3-inline">test</span> داخل NASC. باتشات IPS تغيّر عناوين
            بيئة الاختبار لتتصل بخوادم Pretendo، بينما الحساب المحلي الأصلي
            يبقى على بيئة <span class="p3-inline">prod</span>.
        </p>
<div class="p3-grid-2">
<div class="p3-mini">
<strong>حساب Nintendo المحلي</strong>
                يبقى منفصلًا ولا يحتاج حذفه.
            </div>
<div class="p3-mini">
<strong>حساب Pretendo المحلي</strong>
                معزول داخل بيئة test ويمكن التبديل إليه من Nimbus.
            </div>
</div>
</section>
<section class="p3-card">
<h3>استعادة شارات Nintendo Badge Arcade</h3>
<div class="p3-danger">
            خذ نسخة احتياطية قبل أي تعديل. حقن بيانات خاطئة قد يحذف ترتيب
            الشارات الموجود على HOME Menu، وستحتاج لإضافتها من جديد.
        </div>
<div class="p3-step-grid">
<div class="p3-step-row">
<span class="p3-step-number">1</span>
<div class="p3-step-text">
                    انسخ مجلد الشارات:
                    <span class="p3-inline">SD:/Nintendo 3DS/ID0/ID1/extdata/00000000/000014d1</span>.
                </div>
</div>
<div class="p3-step-row">
<span class="p3-step-number">2</span>
<div class="p3-step-text">
                    ثبت Simple Badge Injector وشغل Nimbus على Pretendo.
                </div>
</div>
<div class="p3-step-row">
<span class="p3-step-number">3</span>
<div class="p3-step-text">
                    افتح SBI وسجل قيمة Nintendo Network ID الظاهرة، ثم Dump
                    ملفات الشارات.
                </div>
</div>
<div class="p3-step-row">
<span class="p3-step-number">4</span>
<div class="p3-step-text">
                    على الكمبيوتر افتح Advanced Badge Editor، ثم افتح
                    <span class="p3-inline">BadgeData.dat</span>
                    و<span class="p3-inline">BadgeMngFile.dat</span>
                    من مجلد Dumped.
                </div>
</div>
<div class="p3-step-row">
<span class="p3-step-number">5</span>
<div class="p3-step-text">
                    استبدل NNID بالقيمة التي سجلتها من SBI، واحفظ نسخة جديدة
                    منفصلة عن النسخة الاحتياطية.
                </div>
</div>
<div class="p3-step-row">
<span class="p3-step-number">6</span>
<div class="p3-step-text">
                    ضع الملفات المعدلة داخل
                    <span class="p3-inline">SD:/3ds/SimpleBadgeInjector</span>.
                </div>
</div>
<div class="p3-step-row">
<span class="p3-step-number">7</span>
<div class="p3-step-text">
                    افتح SBI وInject الملفات المعدلة.
                </div>
</div>
</div>
<div class="p3-warning">
            الشارات المحقونة أثناء اتصال Pretendo قد تختفي عند الرجوع إلى Nintendo،
            والعكس صحيح، بسبب اختلاف بيانات الخادم عن البيانات المحلية.
        </div>
</section>
<section class="p3-card">
<h3>مشاكل متكررة من منتدى Pretendo وReddit</h3>
<div class="p3-grid-2">
<div class="p3-problem">
<strong>ملفات IPS غير موجودة</strong>
                بعد تنزيل Nimbus من Universal-Updater افتحه واضغط START لإكمال
                نقل الملفات. إذا بقيت الملفات ناقصة، فك Combined ZIP في جذر SD
                ووافق على Merge وReplace.
            </div>
<div class="p3-problem">
<strong>Nimbus يرجع إلى HOME Menu</strong>
                الشاشة السوداء القصيرة والرجوع إلى HOME طبيعيان أثناء التبديل.
                افتح Nimbus مجددًا وتأكد من الشبكة النشطة.
            </div>
<div class="p3-problem">
<strong>يبقى على Nintendo</strong>
                تأكد أن خياري Luma مفعّلان، وحدّث Luma، ثم أعد تثبيت Nimbus
                من Universal-Updater بدون الحاجة لحذف التطبيق أولًا.
            </div>
<div class="p3-problem">
<strong>PNID لا يرتبط</strong>
                انتقل إلى Pretendo أولًا، وافتح NNID Settings، وتأكد أن اسم PNID
                مختلف عن اسم NNID القديم.
            </div>
<div class="p3-problem">
<strong>تعديل DNS</strong>
                إعداد DNS الخاص بطريقة SSSL يخص Wii U، وليس تثبيت Nimbus على 3DS.
            </div>
<div class="p3-problem">
<strong>لعبة لا تتصل</strong>
                Pretendo مشروع قيد التطوير، ودعم كل لعبة وخدمة يختلف. راجع
                صفحة Progress قبل اعتبار التثبيت فاشلًا.
            </div>
</div>
</section>
<section class="p3-source-card">
<h3>المصادر والروابط</h3>
<div class="p3-links">
<a class="p3-link" href="https://pretendo.network/docs/install/3ds" rel="noopener noreferrer" target="_blank">
                دليل Pretendo الرسمي للـ3DS
            </a>
<a class="p3-link" href="https://github.com/PretendoNetwork/Nimbus/releases/latest" rel="noopener noreferrer" target="_blank">
                إصدارات Nimbus
            </a>
<a class="p3-link" href="https://db.universal-team.net/3ds/nimbus" rel="noopener noreferrer" target="_blank">
                Nimbus على Universal-DB
            </a>
<a class="p3-link" href="https://github.com/LumaTeam/Luma3DS/releases/latest" rel="noopener noreferrer" target="_blank">
                أحدث Luma3DS
            </a>
<a class="p3-link" href="https://3ds.hacks.guide/" rel="noopener noreferrer" target="_blank">
                3DS Hacks Guide
            </a>
<a class="p3-link" href="https://github.com/Steveice10/FBI/releases/latest" rel="noopener noreferrer" target="_blank">
                تنزيل FBI
            </a>
<a class="p3-link" href="https://pretendo.network/account" rel="noopener noreferrer" target="_blank">
                حساب Pretendo
            </a>
<a class="p3-link" href="https://pretendo.network/progress" rel="noopener noreferrer" target="_blank">
                حالة دعم الخدمات
            </a>
<a class="p3-link" href="https://forum.pretendo.network/t/setup-clarification/26709" rel="noopener noreferrer" target="_blank">
                ضغط START بعد Universal-Updater
            </a>
<a class="p3-link" href="https://forum.pretendo.network/t/cant-switch-to-pretendo-account/13977" rel="noopener noreferrer" target="_blank">
                مثال إعدادات Luma
            </a>
<a class="p3-link" href="https://github.com/AntiMach/simple-badge-injector/releases/latest" rel="noopener noreferrer" target="_blank">
                Simple Badge Injector
            </a>
<a class="p3-link" href="https://github.com/AntiMach/advanced-badge-editor/releases/latest" rel="noopener noreferrer" target="_blank">
                Advanced Badge Editor
            </a>
</div>
</section>
<footer class="p3-footer">
        لا تحذف NNID ولا تستخدم System Transfer. ثبت Nimbus، فعّل خياري Luma،
        ثم اختر Pretendo من التطبيق. استخدم Combined ZIP عند نقص ملفات IPS.
    </footer>
</div>

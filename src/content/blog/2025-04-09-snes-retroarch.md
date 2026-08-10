---
title: 'تشغيل SNES باستخدام RetroArch'
description: 'تشغيل SNES على RetroArch: عيش تجربة الـ 16-بت على أصولها دليلك التقني لتشغيل زيلدا وماريو بأعلى دقة بكسل لعام 2026 Super Nintendo (SNES) لم يكن مجرد جهاز، بل كان قفزة نوعية في تاري…'
pubDate: '2025-04-09T04:51:00.002+03:00'
updatedDate: '2026-02-24T05:17:44.511+03:00'
heroImage: '../../assets/blog-placeholder-1.jpg'
heroImageUrl: '/media/blogger/e0/e0c995b942c308f31cacac3434f03858a0dcf75a5c3ebff91cb7581723a24157.jpg'
originalUrl: 'https://hakamiq1.blogspot.com/2025/04/snes-retroarch.html'
labels: ["Nintendo","SNES"]
---

<style>
    :root {
        --sn-purple: #6157a6;
        --sn-light-gray: #d1d5db;
        --sn-dark: #1f2937;
        --sn-red: #ef4444;
        --sn-emerald: #10b981;
        --h-bg: #f8fafc;
        --card-bg: #ffffff;
        --card-shadow: 0 10px 30px rgba(97, 87, 166, 0.1);
    }

    .snes-guide-wrapper {
        direction: rtl;
        text-align: right;
        font-family: 'Tajawal', 'Cairo', sans-serif;
        line-height: 1.8;
        color: #374151;
        max-width: 1000px;
        margin: 0 auto;
        padding: 20px;
        background-color: #f3f4f6;
    }

    /* الهيدر الرئيسي بألوان SNES */
    .hero-header {
        background: linear-gradient(135deg, #6157a6, #4a418a);
        color: white;
        padding: 45px 25px;
        border-radius: 24px;
        text-align: center;
        margin-bottom: 40px;
        box-shadow: 0 20px 40px rgba(0,0,0,0.2);
        border-bottom: 6px solid #ffcc00; /* لمسة نينتندو الذهبية */
    }

    .hero-header h1 { font-size: 26px; margin: 15px 0; color: #fff; }

    /* بطاقة الأقسام (Smart Card) */
    .tech-card {
        background: white;
        border-radius: 18px;
        padding: 30px;
        margin-bottom: 35px;
        box-shadow: var(--card-shadow);
        border: 1px solid #e5e7eb;
        border-right: 6px solid var(--sn-purple);
        position: relative;
    }

    .tech-card h3 { 
        color: var(--sn-purple); 
        margin-top: 0; 
        border-bottom: 2px solid #f3f4f6; 
        padding-bottom: 12px; 
        margin-bottom: 20px; 
        font-size: 22px; 
    }

    /* صناديق الأنوية والمسارات */
    code {
        background: #f3f4f6;
        color: var(--sn-red);
        padding: 3px 8px;
        border-radius: 6px;
        font-family: 'JetBrains Mono', monospace;
        font-weight: bold;
        font-size: 14px;
    }

    /* صناديق النصائح */
    .h-tip { 
        background: #ecfdf5; 
        border-right: 5px solid var(--sn-emerald); 
        padding: 20px; 
        border-radius: 15px; 
        margin: 30px 0; 
        font-size: 15px; 
    }

    .img-frame { border-radius: 15px; overflow: hidden; margin: 25px auto; box-shadow: var(--card-shadow); display: block; max-width: 100%; }

    .btn-link {
        display: inline-block;
        background: var(--sn-purple);
        color: white !important;
        padding: 10px 25px;
        border-radius: 8px;
        text-decoration: none;
        font-weight: bold;
        transition: 0.3s;
    }
    .btn-link:hover { background: #000; transform: translateY(-2px); }

    .game-list {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 10px;
        margin-top: 15px;
    }

    .game-item {
        background: #f9fafb;
        padding: 10px;
        border-radius: 8px;
        border-left: 3px solid var(--sn-purple);
        font-size: 14px;
        font-weight: bold;
    }
</style>

<div class="snes-guide-wrapper">

    <header class="hero-header">
        <div class="separator" style="clear: both; text-align: center">
            <a href="/media/blogger/e0/e0c995b942c308f31cacac3434f03858a0dcf75a5c3ebff91cb7581723a24157.jpg">
                <img class="img-frame" alt="Super Nintendo - SNES" src="/media/blogger/e0/e0c995b942c308f31cacac3434f03858a0dcf75a5c3ebff91cb7581723a24157.jpg" style="max-width: 320px" />
            </a>
        </div>
        <h2>تشغيل SNES على RetroArch: عيش تجربة الـ 16-بت على أصولها</h2>
        <p style="opacity: 0.9">دليلك التقني لتشغيل زيلدا وماريو بأعلى دقة بكسل لعام 2026</p>
    </header>

    <section class="tech-card">
        <p><b>Super Nintendo (SNES)</b> لم يكن مجرد جهاز، بل كان قفزة نوعية في تاريخ الألعاب؛ رسومات 2D ساحرة، ألحان خالدة، وألعاب شكلت هويتنا كلاعبين. اليوم سنعطيك "مفتاح التشغيل" عبر العملاق <b>RetroArch</b>.</p>
    </section>

    <section class="tech-card">
        <h3>1️⃣ التحميل واختيار "النواة" (Core)</h3>
        <p>أولاً، حمّل المحاكي من موقعه الرسمي:</p>
        <div style="margin: 15px 0; text-align: center">
            <a href="https://www.retroarch.com/" class="btn-link" target="_blank">تحميل RetroArch الرسمي ➔</a>
        </div>
        <p>بعد التثبيت، اذهب إلى <code>Load Core -> Download a Core</code> واختر:</p>
        <code>Snes9x (Super Nintendo)</code>
        <div class="h-tip" style="padding: 12px; margin-top: 15px; font-size: 13px">
            💡 <strong>نصيحة حكميك:</strong> نواة <b>Snes9x</b> هي الأفضل توازناً، لكن إذا كنت تملك جهازاً قوياً جداً وتطمع في "دقة محاكاة" مطلقة، جرّب نواة <b>bsnes</b>.
        </div>
    </section>

    <section class="tech-card" style="border-right-color: var(--sn-emerald)">
        <h3>2️⃣ إضافة الألعاب (ROMs)</h3>
        <p>ألعاب الـ SNES تأتي عادة بصيغة <span style="font-family: monospace; font-weight: bold">.smc</span> أو <span style="font-family: monospace; font-weight: bold">.sfc</span>. لتبدأ اللعب:</p>
        <ul style="padding-right: 20px">
            <li>🔸 ضع ملفاتك في مجلد مرتب، مثلاً: <code>ROMS/SNES</code>.</li>
            <li>🔸 من القائمة الرئيسية اختر <code>Load Content</code> وحدد لعبتك.</li>
        </ul>
        <div class="game-list">
            <div class="game-item">🌍 Super Mario World</div>
            <div class="game-item">🛡️ A Link to the Past</div>
            <div class="game-item">🐒 Donkey Kong Country</div>
            <div class="game-item">⚔️ Chrono Trigger</div>
        </div>
    </section>

    <section class="tech-card">
        <h3>3️⃣ هندسة التحكم والجرافيك</h3>
        <p><b>التحكم:</b> اذهب لـ <code>Settings -> Input -> Port 1 Binds</code>. تأكد من ضبط الأزرار (A, B, X, Y) حسب ترتيب يد SNES الأصلية لتفادي اللخبطة.</p>
        <p style="margin-top: 15px"><b>الفلاتر (Shaders):</b> لتعيش جو الثمانينات الحقيقي، فعّل الشيدرات من <code>Video -> Shaders</code> وجرب:</p>
        <ul style="padding-right: 20px">
            <li>🔸 <code>crt-geom</code>: يعيد لك هيبة التلفزيونات القديمة.</li>
            <li>🔸 <code>pixellate</code>: لحدة بكسلات واضحة جداً وبدون تشويش.</li>
        </ul>
    </section>

    <section class="h-tip">
        <h3>🎯 لماذا نستخدم Save States؟</h3>
        <p>الألعاب القديمة مثل <i>Ghosts 'n Goblins</i> قد تكون محبطة جداً. استخدم <code>F2</code> للحفظ اللحظي و <code>F4</code> للتحميل السريع لتتجاوز العقبات المستحيلة بلمحة بصر.</p>
    </section>

    <footer style="margin-top: 50px; padding-top: 30px; border-top: 1px dashed #cbd5e1; text-align: center">
        <h2 style="color: white; font-size: 28px; letter-spacing: 3px; margin: 0">HAKAMIQ</h2>
        <p style="color: #94a3b8; font-family: monospace; font-size: 12px; margin-top: 10px">// SYSTEM_STATUS: 16_BIT_ACTIVE // SNES_EMULATION_STABLE</p>
        <p style="margin-top: 15px; font-weight: bold; color: var(--sn-purple)">جرب سوبر ماريو وعيش صوت "اليييهه" يوم تاخذ الفطر! 🍄💥</p>
    </footer>

</div>

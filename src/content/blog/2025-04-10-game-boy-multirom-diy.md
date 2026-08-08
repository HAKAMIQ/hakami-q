---
title: '💿 كيف تدمج أكثر من لعبة Game Boy في ملف واحد؟ (MultiROM DIY)'
description: '💡 وش فكرة MultiROM؟ بدل ما يكون عندك 10 ملفات لألعاب مختلفة، تقدر تدمجهم كلهم في ملف واحد يحتوي على "قائمة ألعاب" داخلية تختار منها اللعبة وقت التشغيل. هذي الحركة مفيدة خصوصًا لـ:…'
pubDate: '2025-04-10T23:40:00.002+03:00'
updatedDate: '2026-02-25T04:01:35.000+03:00'
heroImage: '../../assets/blog-placeholder-1.jpg'
heroImageUrl: '/media/blogger/7e/7e22739c427c8b5265bbd783185e053910202ca9dd10abd04f68165f173d9d6d.png'
originalUrl: 'https://hakamiq1.blogspot.com/2025/04/game-boy-multirom-diy.html'
labels: ["Game Boy","Nintendo"]
---

<style>
    :root {
        --xe-gold: #ffd600;
        --xe-green: #00e676;
        --xe-blue: #29b6f6;
        --xe-dark: #121212;
        --xe-card: #1e1e1e;
        --text-main: #f4f4f4;
        --text-muted: #94a3b8;
    }

    .orbital-full-wrapper {
        direction: rtl;
        text-align: right;
        font-family: 'Tajawal', 'Cairo', sans-serif;
        line-height: 1.9;
        color: var(--text-main);
        max-width: 950px;
        margin: 0 auto;
        padding: 20px;
        background-color: var(--xe-dark);
        border-radius: 16px;
        border: 1px solid #333;
    }

    .tech-header { text-align: center; margin-bottom: 35px; border-bottom: 1px dashed #444; padding-bottom: 25px; }
    
    .section-card { background: var(--xe-card); border-radius: 12px; padding: 25px; margin-bottom: 25px; border: 1px solid #2a2a2a; }
    .section-card h3 { margin-top: 0; border-bottom: 1px solid #333; padding-bottom: 12px; margin-bottom: 20px; }
    
    /* تنسيق خاص للخطوات */
    .step-title { 
        color: var(--xe-blue); 
        margin-top: 25px; 
        margin-bottom: 10px; 
        font-size: 1.1em; 
        font-weight: bold;
        background: rgba(41, 182, 246, 0.1);
        padding: 8px 15px;
        border-radius: 8px;
        border-right: 4px solid var(--xe-blue);
        display: inline-block;
    }

    code { background: #000; color: var(--xe-green); padding: 2px 6px; border-radius: 4px; font-family: 'Consolas', monospace; }
    .img-frame { border-radius: 12px; overflow: hidden; margin: 0 auto 20px auto; display: block; max-width: 100%; height: auto; border: 1px solid #333; }

    /* نظام القوائم المعزول */
    .clean-list { padding-right: 20px !important; list-style: none !important; margin: 15px 0; }
    .clean-list li { position: relative; padding-right: 25px !important; margin-bottom: 12px; background: none !important; }
    .clean-list li::before { 
        content: "" !important; 
        position: absolute; 
        right: 0; 
        top: 10px; 
        width: 10px; 
        height: 10px; 
        background: var(--xe-gold) !important; 
        border-radius: 50%; 
        display: block !important;
    }
    .clean-list li::after { display: none !important; }

    .info-box { background: rgba(0, 230, 118, 0.1); border-right: 4px solid var(--xe-green); padding: 10px 15px; border-radius: 8px; margin: 15px 0; font-weight: bold; }

    a { color: var(--xe-blue); text-decoration: none; font-weight: bold; }
    a:hover { color: var(--xe-gold); }
</style>

<div class="orbital-full-wrapper">

    <header class="tech-header">
        <div class="separator" style="clear: both; text-align: center;">
            <a href="/media/blogger/7e/7e22739c427c8b5265bbd783185e053910202ca9dd10abd04f68165f173d9d6d.png" target="_blank">
                <img class="img-frame" src="/media/blogger/7e/7e22739c427c8b5265bbd783185e053910202ca9dd10abd04f68165f173d9d6d.png" width="320" alt="Game Boy MultiROM" />
            </a>
        </div>
        <h2 style="color: var(--xe-blue); text-align: center;">💡 وش فكرة MultiROM؟</h2>
        <p>بدل ما يكون عندك 10 ملفات لألعاب مختلفة، تقدر تدمجهم كلهم في <strong style="color: var(--xe-gold);">ملف واحد</strong> يحتوي على "قائمة ألعاب" داخلية تختار منها اللعبة وقت التشغيل.</p>
        <p>هذي الحركة مفيدة خصوصًا لـ:</p>
        <ul class="clean-list" style="max-width: 400px; margin: 0 auto; text-align: right;">
            <li>📦 التجميعات</li>
            <li>🔄 التنقل السريع</li>
            <li>🎮 الاستخدام في الكونسولات المحمولة أو المحاكيات البسيطة</li>
        </ul>
    </header>

    <section class="section-card">
        <h3 style="color: var(--xe-gold);">🛠️ البرامج اللي نحتاجها</h3>
        <ul class="clean-list">
            <li>✅ <strong>Goomba Color</strong> (محول GBA يشغل ألعاب GB/GBC)</li>
            <li>✅ <strong>Goomba Frontend</strong> (واجهة تسهّل الدمج)</li>
            <li>💾 ملفات ألعاب بصيغة <code>.gb</code> أو <code>.gbc</code></li>
        </ul>
        <div class="info-box">
            💡 رابط البرنامج: ابحث في جوجل عن "Goomba Color rom builder" أو "Goomba Frontend".
        </div>
    </section>

    <section class="section-card">
        <h3 style="color: var(--xe-gold); border-bottom: none;">📦 خطوات الدمج</h3>
        
        <div class="step-title">1. فك الضغط عن Goomba</div>
        <p>بيكون عندك ملف اسمه <code>goomba.gba</code> هذا هو نواة الـ MultiROM.</p>

        <div class="step-title">2. افتح Goomba Frontend</div>
        <p>اختر الألعاب اللي تبي تدمجها، ورتبها حسب مزاجك (Up/Down).</p>

        <div class="step-title">3. اضغط Build</div>
        <p>راح يطلع لك ملف GBA جديد فيه كل الألعاب. مثلاً: <code>mycollection.gba</code></p>

        <div class="step-title">4. جرب الملف!</div>
        <p>شغّله على أي محاكي GBA يدعم Goomba (مثل mGBA أو RetroArch)، راح تشوف قائمة فيها كل ألعابك تختار منها. 😍</p>
    </section>

    <section class="section-card">
        <h3 style="color: var(--xe-gold);">🔍 ملاحظات مهمة</h3>
        <ul class="clean-list">
            <li>💥 يدعم GB و GBC… لكنه يحتاج محاكي GBA</li>
            <li>⚠️ بعض الألعاب ما تشتغل بكامل الأداء (خصوصًا اللي فيها خصائص SGB)</li>
            <li>🎮 Goomba ما يدعم حفظ الحالة (Save State)، فقط الحفظ الداخلي باللعبة</li>
        </ul>
    </section>

    <section class="section-card">
        <h3 style="color: var(--xe-gold);">🎯 استخداماته العملية</h3>
        <ul class="clean-list">
            <li>🎁 توزيع مجموعات مخصصة من الألعاب (زي أفضل ألعاب البوكيمون أو ماريو)</li>
            <li>🕹️ تشغيل أكثر من لعبة على أجهزة محمولة فيها فتحة GBA فقط</li>
            <li>📱 نقل الألعاب للجوال في ملف واحد فقط</li>
        </ul>
    </section>

    <footer style="background: #252525; padding: 25px; border-radius: 12px; border: 1px solid #333; text-align: center;">
        <h3 style="color: var(--xe-gold); margin-top: 0;">📌 حكميك ينصحك</h3>
        <p style="margin-bottom: 15px;">إذا عندك تجميعة من ألعابك المفضلة، لا تخليها تتشتت… اجمعها بملف واحد، واضبطها بقائمة سريعة تعيشك جو التسعينات بكفاءة 2026 💾🔥</p>
    </footer>

</div>

---
title: ' دليل تفصيلي: كيف تخصص إطار Super Game Boy بنفسك؟'
description: '🖼️ وش هو إطار Super Game Boy؟ الإطار (Border) هو الخلفية اللي تظهر حوالين شاشة اللعب لما تشغّل ألعاب GB على SGB. نينتندو كانت تحط إطارات رسمية لبعض الألعاب… لكن الحين؟ تقدر تصمم و…'
pubDate: '2025-04-11T00:22:00.003+03:00'
updatedDate: '2026-02-25T03:57:02.261+03:00'
heroImage: '../../assets/blog-placeholder-1.jpg'
heroImageUrl: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgfK_sJ9hgw6qpTI0ivQJUPs5rQJeUrvh-SlQ0IQYWtJG9ZUnZFPIMZwQ_Fhndy1giaoUaBpGYZ-yNnzW49R2bjfYGL3mwXz3CKAy8WRMPk6iXliXD191ta_3mES_kfFF1pXpCOIsBPkUgkgHbjHdIG34ovplIqTn8I6O48Jd2-f_2k5e9rOy-Dcl2-9mI/s320/ac7e32b9-3dcb-4749-1bec534e2a7f.png'
originalUrl: 'https://hakamiq1.blogspot.com/2025/04/super-game-boy_11.html'
labels: ["Nintendo","SGB"]
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
    .section-card h4 { color: var(--xe-blue); margin-top: 20px; margin-bottom: 10px; font-size: 1.1em; }

    code { background: #000; color: var(--xe-green); padding: 2px 6px; border-radius: 4px; font-family: 'Consolas', monospace; }
    .img-frame { border-radius: 12px; overflow: hidden; margin: 0 auto 20px auto; display: block; max-width: 100%; height: auto; border: 1px solid #333; }

    /* نظام القوائم المعزول لمنع التداخل مع أيقونات القالب */
    .clean-list { padding-right: 20px !important; list-style: none !important; margin: 15px 0; }
    .clean-list li { position: relative; padding-right: 25px !important; margin-bottom: 12px; background: none !important; }
    .clean-list li::before { 
        content: "" !important; 
        position: absolute; 
        right: 0; 
        top: 10px; 
        width: 10px; 
        height: 10px; 
        background: var(--xe-blue) !important; 
        border-radius: 50%; 
        display: block !important;
    }
    .clean-list li::after { display: none !important; }

    a { color: var(--xe-blue); text-decoration: none; font-weight: bold; }
    a:hover { color: var(--xe-gold); }
</style>

<div class="orbital-full-wrapper">

    <header class="tech-header">
        <div class="separator" style="clear: both; text-align: center;">
            <a href="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgfK_sJ9hgw6qpTI0ivQJUPs5rQJeUrvh-SlQ0IQYWtJG9ZUnZFPIMZwQ_Fhndy1giaoUaBpGYZ-yNnzW49R2bjfYGL3mwXz3CKAy8WRMPk6iXliXD191ta_3mES_kfFF1pXpCOIsBPkUgkgHbjHdIG34ovplIqTn8I6O48Jd2-f_2k5e9rOy-Dcl2-9mI/s1536/ac7e32b9-3dcb-4749-1bec534e2a7f.png" target="_blank">
                <img class="img-frame" src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgfK_sJ9hgw6qpTI0ivQJUPs5rQJeUrvh-SlQ0IQYWtJG9ZUnZFPIMZwQ_Fhndy1giaoUaBpGYZ-yNnzW49R2bjfYGL3mwXz3CKAy8WRMPk6iXliXD191ta_3mES_kfFF1pXpCOIsBPkUgkgHbjHdIG34ovplIqTn8I6O48Jd2-f_2k5e9rOy-Dcl2-9mI/s320/ac7e32b9-3dcb-4749-1bec534e2a7f.png" width="320" alt="Super Game Boy Border" />
            </a>
        </div>
        <h2 style="color: var(--xe-blue); text-align: center;">🖼️ وش هو إطار Super Game Boy؟</h2>
        <p>الإطار (Border) هو الخلفية اللي تظهر حوالين شاشة اللعب لما تشغّل ألعاب GB على SGB. نينتندو كانت تحط إطارات رسمية لبعض الألعاب… لكن الحين؟ تقدر تصمم واحد بنفسك 💥</p>
    </header>

    <section class="section-card">
        <h3 style="color: var(--xe-gold);">🛠️ الأشياء اللي تحتاجها</h3>
        <ul class="clean-list">
            <li>🎨 برنامج رسم (يفضل Photoshop أو GIMP)</li>
            <li>📦 أداة <strong>SGB Border Injector</strong> أو <strong>GB Enhanced</strong></li>
            <li>📁 ROM لعبة GB تدعم SGB أو يمكن تعديلها</li>
        </ul>
    </section>

    <section class="section-card">
        <h3 style="color: var(--xe-gold);">📐 أبعاد التصميم</h3>
        <ul class="clean-list">
            <li>🖼️ الحجم: <code>256x224</code> بيكسل (نفس دقة شاشة SNES)</li>
            <li>🎨 4 ألوان فقط لكل جزء (بسبب حدود الـ VRAM)</li>
            <li>🌈 استخدم تنسيق <code>.PNG</code> أو <code>.BMP</code> في النهاية</li>
        </ul>
    </section>

    <section class="section-card">
        <h3 style="color: var(--xe-gold);">🧪 خطوات التخصيص بالكامل</h3>
        
        <h4>1. صمّم الإطار</h4>
        <p>استخدم أي برنامج رسم وخلّي المساحة اللي وسط فارغة (مكان شاشة اللعب). مثلاً: حط شعارك فوق، شخصيتك الغامضة يمين، وخلفية ريترونتندو بالزاوية!</p>
        
        <h4>2. حفظ الملف بصيغة مقبولة</h4>
        <p>احفظ التصميم كـ <code>24-bit BMP</code> أو <code>indexed PNG</code> وتأكد إنك ملتزم بـ 4 ألوان كحد أقصى!</p>
        
        <h4>3. استخدام SGB Border Injector</h4>
        <p>افتح البرنامج، اختَر ROM اللعبة، وحدد صورة الإطار… راح يحط الإطار داخل اللعبة نفسها (منطقة SGB فقط).</p>
        
        <h4>4. جرّب اللعبة على محاكي يدعم SGB</h4>
        <p>RetroArch مع نواة SameBoy – أو حتى محاكي bgb – راح يعرض الإطار الخاص فيك إذا كان الـ ROM معدل بشكل سليم.</p>
    </section>

    <section class="section-card">
        <h3 style="color: var(--xe-gold);">📁 نصائح حكميك الذهبية</h3>
        <ul class="clean-list">
            <li>🖌️ صمّم إطار مو مزعج… خلّي الألوان خفيفة وما تشتت عن اللعب</li>
            <li>⚠️ لا تغيّر من بيانات ROM بشكل كبير، خلي بس الإطار</li>
            <li>🎮 جرّب الإطار على أكثر من محاكي للتأكد إنه يظهر بشكل صحيح</li>
        </ul>
    </section>

    <footer style="background: #252525; padding: 25px; border-radius: 12px; border: 1px solid #333; text-align: center;">
        <h3 style="color: var(--xe-gold); margin-top: 0;">📌 وش تسوي بالإطارات بعدين؟</h3>
        <ul class="clean-list" style="text-align: right; max-width: 450px; margin: 0 auto 20px auto;">
            <li>– تقدر توزعها للمتابعين بصيغة ROM</li>
            <li>– أو تسوي تجميعة ألعاب فيها كل وحدة بإطار خاص</li>
            <li>– أو حتى تنشئ لعبة GB بسيطة وتحط لها هويتك الخاصة على SGB فقط!</li>
        </ul>
    </footer>

</div>

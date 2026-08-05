---
title: 'دمج ملفات الألعاب بصيغة NDS وملفات الحفظ Save Data'
description: '🧩 كيف تدمج ملفات ألعاب NDS مع ملفات الحفظ (Save Data)؟ مشتاق ترجع تكمل لعبتك القديمة؟ حملت اللعبة وملف الحفظ بس مو راضي يشتغل؟ خلك معي، هالشرح بيفك لك اللغز ويحفظ لك تعبك 💾🔥 1.…'
pubDate: '2025-04-11T03:19:00.003+03:00'
updatedDate: '2026-02-25T03:17:48.436+03:00'
heroImage: '../../assets/blog-placeholder-1.jpg'
heroImageUrl: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEigLsAV3I_QI59-7fBmyoXp7acKqoO7PCuyOHwo8_knff5JT0NpPbrrPmKMg27HYV8XnehilukL1aPmGf8pIuxFRH11qvvg6RXGKjwilmuzG4l_5hzo7Uii7l-hVukazh8Get_pTGlDnwtqtxJOT3BX7QfoJQ1qX50W_0oKdHyC_7twhJb1AqiDRg6YqTw/s320/maxresdefault%20(1).jpg'
originalUrl: 'https://hakamiq1.blogspot.com/2025/04/nds-save-data.html'
labels: ["N-DS","Nintendo"]
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

    .guide-wrapper {
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
    .section-card h3 { margin-top: 0; border-bottom: 1px solid #333; padding-bottom: 12px; margin-bottom: 20px; color: var(--xe-gold); }

    code { background: #000; color: var(--xe-green); padding: 2px 8px; border-radius: 4px; font-family: 'Consolas', monospace; direction: ltr; display: inline-block;}
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
        background: var(--xe-blue) !important; 
        border-radius: 50%; 
        display: block !important;
    }
    .clean-list li::after { display: none !important; }

    a.action-link { color: var(--xe-blue); text-decoration: none; font-weight: bold; display: inline-block; margin-top: 10px; padding: 8px 15px; background: #111; border-radius: 8px; border: 1px solid #333; transition: 0.3s; }
    a.action-link:hover { color: var(--xe-gold); border-color: var(--xe-gold); }
</style>

<div class="guide-wrapper">

    <header class="tech-header">
        <div class="separator" style="clear: both; text-align: center;">
            <a href="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEigLsAV3I_QI59-7fBmyoXp7acKqoO7PCuyOHwo8_knff5JT0NpPbrrPmKMg27HYV8XnehilukL1aPmGf8pIuxFRH11qvvg6RXGKjwilmuzG4l_5hzo7Uii7l-hVukazh8Get_pTGlDnwtqtxJOT3BX7QfoJQ1qX50W_0oKdHyC_7twhJb1AqiDRg6YqTw/s1280/maxresdefault%20(1).jpg" target="_blank">
                <img class="img-frame" src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEigLsAV3I_QI59-7fBmyoXp7acKqoO7PCuyOHwo8_knff5JT0NpPbrrPmKMg27HYV8XnehilukL1aPmGf8pIuxFRH11qvvg6RXGKjwilmuzG4l_5hzo7Uii7l-hVukazh8Get_pTGlDnwtqtxJOT3BX7QfoJQ1qX50W_0oKdHyC_7twhJb1AqiDRg6YqTw/s320/maxresdefault%20(1).jpg" width="320" alt="شرح دمج الحفظ مع اللعبة" />
            </a>
        </div>
        <h2 style="color: var(--xe-blue); text-align: center;">🧩 كيف تدمج ملفات ألعاب NDS مع ملفات الحفظ (Save Data)؟</h2>
        <p>مشتاق ترجع تكمل لعبتك القديمة؟ حملت اللعبة وملف الحفظ بس مو راضي يشتغل؟ خلك معي، هالشرح بيفك لك اللغز ويحفظ لك تعبك 💾🔥</p>
    </header>

    <section class="section-card">
        <h3>1. تأكد من تطابق الأسماء</h3>
        
        <p>لازم يكون اسم ملف اللعبة وملف الحفظ بالضبط متشابه قبل الامتداد. لو الحروف أو النقاط تختلف؟ باي باي للحفظ 🙃</p>
        <p><strong>مثال صحيح:</strong></p>
        <ul class="clean-list">
            <li>ملف اللعبة: <code>pokemon.nds</code></li>
            <li>ملف الحفظ: <code>pokemon.sav</code></li>
        </ul>
    </section>

    <section class="section-card">
        <h3>2. وين نحط ملف الحفظ؟</h3>
        
        <p>بعض المحاكيات تحط ملف الحفظ في نفس مجلد اللعبة، وبعضها في مجلد مخصص. المهم تحط ملف الحفظ في المكان الصحيح مع اسم مطابق تمامًا:</p>
        <ul class="clean-list">
            <li><strong>melonDS:</strong> عادة في مجلد اسمه <code>saves</code></li>
            <li><strong>DeSmuME:</strong> يحفظ تلقائي بصيغة <code>.dsv</code></li>
        </ul>
    </section>

    <section class="section-card">
        <h3>3. تحويل صيغة الحفظ (لو ما اشتغل)</h3>
        <p>بعض المحاكيات ما تتعرف على الحفظ بصيغة ثانية، فالحل إنك تحوّل الملف إلى الصيغة المدعومة.</p>
        <p>استخدم هذا الموقع الأسطوري لتحويل صيغ الحفظ بين المحاكيات بكل سهولة:</p>
        <a class="action-link" href="https://www.shunyweb.info/convert.php" target="_blank">🔁 موقع Shunyweb لتحويل ملفات الحفظ</a>
    </section>

    <section class="section-card">
        <h3>4. دمج اللعبة والحفظ في مجلد محمول</h3>
        <p>إذا بتخزن اللعبة وملف الحفظ على فلاشة أو مجلد محمول (Portable)، خلهم مع بعض واحتفظ بالأسماء متطابقة لضمان عملهم على أي جهاز.</p>
        <p><strong>معلومة جانبية:</strong> فيه أدوات مثل <code>NDSTokyoTrim</code> تساعدك تنسق الملفات وتضغط حجمها بذكاء بدون ما تخرب الحفظ.</p>
    </section>

    <section class="section-card">
        <h3>💡 نصائح محششين</h3>
        <ul class="clean-list">
            <li>تبي تنقل الحفظ من الجوال للكمبيوتر؟ انسخ الملف وحطه بمجلد المحاكي وسمّه بنفس اسم اللعبة، بس كذا.</li>
            <li>اللعبة تشتغل من البداية بدون الحفظ؟ تأكد إنك ما غيرت مسافة أو حرف كابيتال في الاسم.</li>
            <li>بعض الألعاب تسوي ملف حفظ تلقائي مخفي، فتش في مجلدات المحاكي (مثل مجلد Battery).</li>
        </ul>
    </section>

    <footer style="background: #252525; padding: 25px; border-radius: 10px; text-align: center; border: 1px solid #333;">
        <h3 style="color: var(--text-main); margin-top: 0; margin-bottom: 15px;">📌 الخلاصة</h3>
        <p style="margin-bottom: 15px; font-weight: bold;">لا تكثر فلسفة، خل اسم الملف واحد، وحطه بالمكان الصح، وعيش جوك 😎🎮</p>
        <p style="margin: 0; color: var(--xe-blue); font-weight: bold;">تحياتي،<br />🕹️ حكميك</p>
    </footer>

</div>

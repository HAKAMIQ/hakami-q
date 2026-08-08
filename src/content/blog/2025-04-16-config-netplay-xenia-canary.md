---
title: ' إعداد ملف config لـ Netplay في Xenia Canary'
description: 'دليل إعداد ملف config لـ Netplay في Xenia Canary ميزة Netplay في Xenia Canary فتحت باباً كبيراً لتجربة اللعب الجماعي على محاكي Xbox 360، لكنها تحتاج إعدادات دقيقة في ملف xenia.conf…'
pubDate: '2025-04-16T23:12:00.003+03:00'
updatedDate: '2026-02-24T06:13:07.138+03:00'
heroImage: '../../assets/blog-placeholder-1.jpg'
heroImageUrl: '/media/blogger/7b/7b056bb6ae73bae6b0b0879e0f1532134ad33c2d12547f35866a7279fdbf14b3.png'
originalUrl: 'https://hakamiq1.blogspot.com/2025/04/config-netplay-xenia-canary.html'
labels: ["Xbox","Xbox360"]
---

<style>
    :root {
        --xe-green: #107c10;
        --xe-cyan: #4fc3f7;
        --xe-gold: #ffcc00;
        --xe-dark: #121212;
        --xe-card: #1e1e1e;
        --text-main: #f0f0f0;
        --text-muted: #94a3b8;
    }

    .xenia-netplay-wrapper {
        direction: rtl;
        text-align: right;
        font-family: 'Tajawal', 'Cairo', sans-serif;
        line-height: 1.8;
        color: var(--text-main);
        max-width: 950px;
        margin: 0 auto;
        padding: 20px;
        background-color: var(--xe-dark);
        border-radius: 16px;
        border: 1px solid #333;
    }

    /* الهيدر */
    .tech-header {
        text-align: center;
        margin-bottom: 35px;
        padding-bottom: 25px;
        border-bottom: 2px dashed #333;
    }

    .tech-header h2 { 
        color: var(--xe-cyan); 
        font-size: 26px; 
        margin: 15px 0 10px 0; 
        text-shadow: 0 0 10px rgba(79, 195, 247, 0.2); 
    }

    /* بطاقات الشرح */
    .option-card {
        background: var(--xe-card);
        border-radius: 12px;
        padding: 20px;
        margin-bottom: 25px;
        border: 1px solid #2a2a2a;
        transition: 0.3s ease;
    }

    .option-card:hover { border-color: var(--xe-cyan); transform: translateY(-3px); }

    .option-card h3 { 
        margin-top: 0; 
        color: var(--xe-cyan); 
        border-bottom: 1px solid #333; 
        padding-bottom: 10px; 
        margin-bottom: 15px; 
        font-family: 'Consolas', monospace;
    }

    /* تنسيق الأكواد */
    .code-block {
        background: #000;
        color: var(--xe-gold);
        padding: 12px 15px;
        border-radius: 8px;
        border-right: 4px solid var(--xe-cyan);
        direction: ltr;
        text-align: left;
        font-family: 'JetBrains Mono', 'Consolas', monospace;
        font-size: 14px;
        margin: 15px 0;
        overflow-x: auto;
    }

    /* القوائم */
    .styled-list { padding-right: 20px; margin: 0; list-style: none; }
    .styled-list li { margin-bottom: 10px; position: relative; padding-right: 20px; }
    .styled-list li::before { content: "•"; color: var(--xe-cyan); position: absolute; right: 0; font-weight: bold; }

    /* رأي حكميك */
    .opinion-box {
        background: linear-gradient(to left, #1a1a1a, #0a0a0a);
        border: 1px solid #333;
        border-right: 5px solid var(--xe-gold);
        padding: 25px;
        border-radius: 12px;
        margin-top: 40px;
    }

    .opinion-box h3 { color: var(--xe-gold); margin-top: 0; }

    .img-frame { border-radius: 12px; overflow: hidden; margin: 0 auto 20px auto; display: block; max-width: 100%; border: 1px solid #333; }
    
    .source-links a { color: var(--xe-cyan); text-decoration: none; font-weight: bold; }
    .source-links a:hover { text-decoration: underline; }
</style>

<div class="xenia-netplay-wrapper">

    <header class="tech-header">
        <div class="separator" style="clear: both; text-align: center;">
            <a href="/media/blogger/7b/7b056bb6ae73bae6b0b0879e0f1532134ad33c2d12547f35866a7279fdbf14b3.png">
                <img class="img-frame" alt="Xenia Canary Netplay Config Guide" src="/media/blogger/7b/7b056bb6ae73bae6b0b0879e0f1532134ad33c2d12547f35866a7279fdbf14b3.png" style="max-width: 450px;" />
            </a>
        </div>
        <h2>دليل إعداد ملف config لـ Netplay في Xenia Canary</h2>
        <p style="color: var(--text-muted);">
            ميزة Netplay في Xenia Canary فتحت باباً كبيراً لتجربة اللعب الجماعي على محاكي Xbox 360، لكنها تحتاج إعدادات دقيقة في ملف <code>xenia.config.toml</code> لضمان استقرار الاتصال وسلاسة اللعب الجماعي.
        </p>
    </header>

    <section class="option-card">
        <h3>🔗 api_address</h3>
        <p>هذا هو العنوان الأساسي الذي يستخدمه المحاكي للتواصل مع الخادم. إذا كنت تستخدم خادماً عاماً مقدماً من المجتمع أو استضافة محلية، يجب تغيير هذا الخيار من العنوان الافتراضي.</p>
        <div class="code-block">
            api_address = "https://xenia-netplay-2a0298c0e3f4.herokuapp.com"
        </div>
        <p style="font-size: 14px; color: var(--xe-gold);">💡 نصيحة: استخدم دائماً عنواناً مستقراً ومعروفاً لتجنب الانقطاعات المفاجئة.</p>
    </section>

    <section class="option-card">
        <h3>📜 api_list</h3>
        <p>يحتفظ هذا الخيار بسجل لآخر 10 خوادم تم استخدامها. يفيدك جداً إذا كنت تتنقل بين خوادم مختلفة مع مجموعات أصدقاء متنوعة.</p>
        <div class="code-block">
            api_list = "https://xenia-netplay-2a0298c0e3f4.herokuapp.com/, 192.168.0.1:36000/"
        </div>
    </section>

    <section class="option-card">
        <h3>🌐 upnp</h3>
        <p>ميزة UPnP (التوصيل والتشغيل) تكون مغلقة افتراضياً لأسباب أمنية، لكن تفعيلها ضروري جداً إذا كنت أنت من سيقوم باستضافة (Host) جلسة اللعب.</p>
        <div class="code-block">
            upnp = true
        </div>
        <p>بمجرد تفعيلها، سيقوم الجهاز بفتح المنافذ (Ports) المطلوبة تلقائياً في الراوتر الخاص بك.</p>
    </section>

    <section class="option-card">
        <h3>📶 network_mode</h3>
        <p>يتحكم هذا الخيار في طريقة عمل الاتصال الشبكي. القيم المتوفرة لها تأثير مباشر على استقرار الجلسة:</p>
        <ul class="styled-list">
            <li><b>0 - Offline:</b> للعب الفردي فقط، يمنع أي محاولة اتصال شبكي.</li>
            <li><b>1 - LAN/Systemlink:</b> للعب عبر الشبكة المحلية أو برامج الـ VPN مثل <i>Radmin VPN</i>.</li>
            <li><b>2 - Xbox Live:</b> للاتصال عبر الإنترنت باستخدام خادم REST API (يدعم قائمة الأصدقاء).</li>
        </ul>
        <p>للعب عن بُعد مع الأصدقاء، استخدم القيمة <b>2</b>. أما للشبكة المحلية، فاستخدم القيمة <b>1</b>.</p>
    </section>

    <section class="option-card">
        <h3>👥 friends_xuids</h3>
        <p>يسمح لك هذا الخيار بتسجيل قائمة أصدقاء عبر أرقام XUID الخاصة بهم. إذا كان صديقك مسجلاً في نفس الخادم، ستتمكن من رؤيته والدخول في جلسته تلقائياً.</p>
        <div class="code-block">
            friends_xuids = "0009XXXXXXXXXXXX, 0009XXXXXXXXXXXX"
        </div>
    </section>

    <div class="opinion-box">
        <h3>📝 رأي حكميك الشخصي</h3>
        <p style="margin-bottom: 0;">
            تعديل ملف <code>xenia.config.toml</code> ليس مجرد خطوة إضافية، بل هو "مفتاح" الدخول لعالم الأونلاين في Xbox 360 اليوم. ميزة Netplay تطورت بشكل مذهل، ولكنها تظل حساسة جداً لإعدادات الشبكة. ضبط هذه الخيارات بشكل صحيح سيغنيك عن 90% من مشاكل الفصل والتعليق.
        </p>
    </div>

    <footer class="source-links" style="margin-top: 30px; font-size: 14px; border-top: 1px solid #333; padding-top: 15px;">
        <p>📚 المصادر الرسمية:</p>
        <ul class="styled-list">
            <li><a href="https://github.com/xenia-canary/xenia-canary/wiki/Config-Setup" target="_blank">Xenia Canary Wiki – Config Setup</a></li>
            <li><a href="https://github.com/xenia-canary/xenia-canary/wiki/Netplay-Compatibility" target="_blank">Netplay Compatibility Guide</a></li>
        </ul>
    </footer>

</div>

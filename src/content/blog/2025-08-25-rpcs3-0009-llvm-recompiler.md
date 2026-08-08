---
title: '🕹️ RPCS3 0.0.0.9 – التحديث التاريخي إزالة LLVM Recompiler'
description: '🕹️ RPCS3 0.0.0.9: التحديث التاريخي (إعادة الولادة) بتاريخ 16 أبريل 2016 ، غيّر فريق التطوير مسار المحاكاة للأبد عبر الطلب رقم PR #1521. 🔧 أبرز التحولات البرمجية نظام الإعدادات: ا…'
pubDate: '2025-08-25T09:25:00.002+03:00'
updatedDate: '2026-02-24T05:02:18.381+03:00'
heroImage: '../../assets/blog-placeholder-1.jpg'
heroImageUrl: '/media/blogger/69/69887352e74403c0cb7304ed51dbbaebd8eff91ffac596076470a6c01595b209.png'
originalUrl: 'https://hakamiq1.blogspot.com/2025/08/rpcs3-0009-llvm-recompiler.html'
labels: ["PlayStation","PS3"]
---

<style>
    :root {
        --r-red: #ff4444;
        --r-gold: #ffcc66;
        --r-blue: #66ccff;
        --h-bg: #0f172a;
        --card-bg: #1e293b;
        --card-shadow: 0 10px 30px rgba(255, 68, 68, 0.1);
    }

    .rpcs3-history-wrapper {
        direction: rtl;
        text-align: right;
        font-family: 'IBM Plex Sans Arabic', 'Tajawal', sans-serif;
        line-height: 1.8;
        color: #e2e8f0;
        max-width: 1000px;
        margin: 0 auto;
        padding: 20px;
        background-color: #010409;
    }

    /* الهيدر الأرشيفي */
    .hero-header {
        background: linear-gradient(135deg, #2a1a1a, #000);
        padding: 45px 25px;
        border-radius: 24px;
        text-align: center;
        margin-bottom: 40px;
        box-shadow: var(--card-shadow);
        border-bottom: 6px solid var(--r-red);
    }

    .hero-header h2 { font-size: 26px; color: white; margin-top: 15px; }

    /* بطاقة التغييرات التقنية (Smart Card) */
    .tech-card {
        background: var(--card-bg);
        border-radius: 18px;
        padding: 30px;
        margin-bottom: 35px;
        box-shadow: 0 15px 35px rgba(0,0,0,0.3);
        border-right: 6px solid var(--r-red);
        position: relative;
    }

    .tech-card h3 { color: var(--r-red); margin-top: 0; border-bottom: 1px solid #334155; padding-bottom: 12px; margin-bottom: 20px; font-size: 20px; }

    /* صناديق المعلومات الجانبية */
    .info-box {
        background: #0d1117;
        border-right: 4px solid var(--r-gold);
        padding: 20px;
        border-radius: 12px;
        margin: 20px 0;
    }

    .info-box h3 { color: var(--r-gold); font-size: 18px; margin-top: 0; }

    /* كود وإعدادات */
    code { background: #000; color: #00ffcc; padding: 2px 6px; border-radius: 4px; font-family: monospace; }

    /* تنسيق الصور */
    .img-frame { border-radius: 15px; overflow: hidden; margin: 25px auto; box-shadow: var(--card-shadow); display: block; max-width: 100%; }

    footer {
        margin-top: 60px;
        padding-top: 30px;
        border-top: 1px dashed #334155;
        text-align: center;
    }

    .btn-github {
        display: inline-block;
        background: #24292e;
        color: white !important;
        padding: 10px 25px;
        border-radius: 50px;
        text-decoration: none;
        font-weight: bold;
        transition: 0.3s;
    }
    .btn-github:hover { transform: scale(1.05); background: #000; }
</style>

<div class="rpcs3-history-wrapper">

    <header class="hero-header">
        <div class="separator" style="clear: both; text-align: center;">
            <a href="/media/blogger/69/69887352e74403c0cb7304ed51dbbaebd8eff91ffac596076470a6c01595b209.png">
                <img alt="شعار RPCS3 التاريخي" src="/media/blogger/69/69887352e74403c0cb7304ed51dbbaebd8eff91ffac596076470a6c01595b209.png" style="max-width: 400px;" />
            </a>
        </div>
        <h2>🕹️ RPCS3 0.0.0.9: التحديث التاريخي (إعادة الولادة)</h2>
        <p style="opacity: 0.8; margin-top: 10px;">بتاريخ <b>16 أبريل 2016</b>، غيّر فريق التطوير مسار المحاكاة للأبد عبر الطلب رقم PR #1521.</p>
    </header>

    <section class="tech-card">
        <h3>🔧 أبرز التحولات البرمجية</h3>
        <ol style="padding-right: 20px;">
            <li><b>نظام الإعدادات:</b> الانتقال الثوري من ملفات INI التقليدية إلى تنسيق <b>YAML</b> (مثل <code>config.yml</code>) لتنظيم أسهل للأكواد.</li>
            <li><b>إزالة LLVM Recompiler:</b> تم حذف <b>PPULLVMRecompiler</b> بالكامل في هذه الخطوة لتنظيف البنية الأساسية قبل إعادة بنائه لاحقاً بشكل أقوى وأسرع.</li>
            <li><b>إعادة هندسة الأنظمة:</b> بناء <b>ELF/PRX Loader</b> جديد وتحسين وظائف حيوية مثل <code>cellVideoOut</code> و <code>cellAudio</code> لضمان استقرار الصورة والصوت.</li>
            <li><b>واجهة الاستكشاف:</b> دعم عناوين 32-bit في مفكك الأكواد (Disassembler) وتنظيم مدير وحدات LLE.</li>
        </ol>
    </section>

    

    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px;">
        <div class="info-box">
            <h3>💬 كواليس النقاش وقتها</h3>
            <ul style="padding-right: 15px; font-size: 14px; color: #94a3b8;">
                <li>شدد المطورون <b>AniLeo</b> و <b>Ekaseo</b> على ضرورة وجود إعدادات خاصة لكل لعبة (Per-Game Config).</li>
                <li>حجم التعديل كان هائلاً: <b>677 ملفاً</b>، مع إضافة 41 ألف سطر برمجي وحذف 70 ألف سطر!</li>
                <li>تغير رقم الإصدار فجأة إلى 0.0.0.9 كاستعداد للانتقال لمرحلة 0.0.1.</li>
            </ul>
        </div>
        <div class="info-box" style="border-right-color: var(--r-red);">
            <h3 style="color: var(--r-red);">⚠️ نتائج فورية</h3>
            <ul style="padding-right: 15px; font-size: 14px; color: #94a3b8;">
                <li>ظهور بعض التراجعات (Regressions) مثل مشكلة الشاشة السوداء في <i>House of the Dead 3</i>.</li>
                <li>بداية الاعتماد الرسمي على ملفات <b>SPRX</b> الأصلية بدلاً من المحاكاة البرمجية (HLE).</li>
                <li>تأسيس النظام الحديث الذي سمح لاحقاً بدمج محرك <b>Vulkan</b>.</li>
            </ul>
        </div>
    </div>

    <section class="tech-card" style="border-right-color: var(--r-blue); margin-top: 40px;">
        <h3 style="color: var(--r-blue);">📌 كلمة "حكميك" في الخلاصة</h3>
        <p style="font-size: 15px;">إصدار <b>RPCS3 0.0.0.9</b> لم يكن مجرد تحديث عادي، بل كان إعادة هيكلة شاملة للعقل المدبر للمحاكي. بحذف الأنظمة القديمة وبناء هيكل YAML، وضع المطورون حجر الزاوية لكل ما نراه اليوم من أداء مذهل ودعم لآلاف الألعاب بدقة 4K.</p>
    </section>

    <footer>
        <a href="https://github.com/rpcs3/rpcs3/pull/1521" class="btn-github" target="_blank">🔗 تفاصيل الـ Pull Request #1521 على GitHub</a>
        <p style="margin-top: 30px; font-size: 11px; color: #475569;">TECH_ARCHIVE // RPCS3_LEGACY // HAKAMIQ 2026</p>
    </footer>

</div>

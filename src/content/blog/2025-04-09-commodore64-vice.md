---
title: 'طريقة تشغيل Commodore64 على الكمبيوتر باستخدام المحاكي VICE'
description: '🖥️ طريقة تشغيل Commodore 64 على الكمبيوتر باستخدام VICE استعد تجربة الـ C64 الكاملة وكأنك أمام شاشة CRT في الثمانينات 🔧 المتطلبات الأساسية 🔸 كمبيوتر بنظام Windows / Mac / Linux…'
pubDate: '2025-04-09T04:35:00.001+03:00'
updatedDate: '2026-02-24T05:13:14.227+03:00'
heroImage: '../../assets/blog-placeholder-1.jpg'
heroImageUrl: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi0E2-z8qg-EwCOsqs-gvuaQwmywqa5kqHlnS3BrLvfSsqMArY7OQ4iCbSadesmIwqrlPLctparmEHIphtJQFcW9J2Oi-sQq5iJMbJGW6nT-IuliYsaIDWczHjpVPvoUbszlHlYdfEdldyRaQiW-iwiCnzOodMUpprXfCNv5d-NzJ6wYCJlN-NBZ02EMNs/s1600/images.jfif'
originalUrl: 'https://hakamiq1.blogspot.com/2025/04/commodore64-vice.html'
labels: ["Commodore","Commodore64"]
---

<style>
    :root {
        --c64-blue: #00417a;
        --c64-cyan: #00ffd5;
        --c64-light: #e2e8f0;
        --c64-dark: #0d1117;
        --card-bg: #ffffff;
        --card-shadow: 0 10px 30px rgba(0, 65, 122, 0.1);
    }

    .vice-guide-wrapper {
        direction: rtl;
        text-align: right;
        font-family: 'Tajawal', 'Segoe UI', sans-serif;
        line-height: 1.8;
        color: #334155;
        max-width: 950px;
        margin: 0 auto;
        padding: 20px;
        background-color: #f8fafc;
    }

    /* الهيدر الرئيسي */
    .hero-header {
        background: linear-gradient(135deg, #00417a, #001a33);
        color: white;
        padding: 45px 25px;
        border-radius: 24px;
        text-align: center;
        margin-bottom: 40px;
        box-shadow: 0 20px 40px rgba(0,0,0,0.2);
        border-bottom: 6px solid var(--c64-cyan);
    }

    .hero-header h1 { font-size: 26px; margin: 15px 0; color: #fff; }

    /* بطاقة الأقسام (Smart Card) */
    .tech-card {
        background: white;
        border-radius: 18px;
        padding: 30px;
        margin-bottom: 35px;
        box-shadow: var(--card-shadow);
        border: 1px solid #f1f5f9;
        border-right: 6px solid var(--c64-blue);
        position: relative;
    }

    .tech-card h3 { color: #1e293b; margin-top: 0; border-bottom: 2px solid #f1f5f9; padding-bottom: 12px; margin-bottom: 20px; font-size: 22px; }

    /* صناديق الأوامر (Command Line) */
    .terminal-box {
        background: #0d1117;
        color: var(--c64-cyan);
        padding: 15px 20px;
        border-radius: 10px;
        font-family: 'JetBrains Mono', 'Consolas', monospace;
        direction: ltr;
        text-align: left;
        margin: 15px 0;
        border: 1px solid #334155;
        font-size: 15px;
        font-weight: bold;
    }

    /* صناديق النصائح */
    .h-tip { background: #f0f9ff; border-right: 5px solid var(--c64-blue); padding: 15px 20px; border-radius: 12px; margin: 20px 0; font-size: 15px; }

    .img-frame { border-radius: 15px; overflow: hidden; margin: 25px auto; box-shadow: var(--card-shadow); display: block; max-width: 100%; }

    .btn-download {
        display: inline-block;
        background: var(--c64-blue);
        color: white !important;
        padding: 10px 25px;
        border-radius: 8px;
        text-decoration: none;
        font-weight: bold;
        transition: 0.3s;
    }
    .btn-download:hover { background: #000; transform: translateY(-2px); }

    .format-tag {
        background: #f1f5f9;
        color: var(--c64-blue);
        padding: 4px 10px;
        border-radius: 4px;
        font-family: monospace;
        font-weight: bold;
        margin: 0 5px;
        border: 1px solid #e2e8f0;
    }
</style>

<div class="vice-guide-wrapper">

    <header class="hero-header">
        <div class="separator" style="clear: both; text-align: center;">
            <a href="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi0E2-z8qg-EwCOsqs-gvuaQwmywqa5kqHlnS3BrLvfSsqMArY7OQ4iCbSadesmIwqrlPLctparmEHIphtJQFcW9J2Oi-sQq5iJMbJGW6nT-IuliYsaIDWczHjpVPvoUbszlHlYdfEdldyRaQiW-iwiCnzOodMUpprXfCNv5d-NzJ6wYCJlN-NBZ02EMNs/s275/images.jfif">
                <img class="img-frame" alt="محاكي VICE للـ C64" src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi0E2-z8qg-EwCOsqs-gvuaQwmywqa5kqHlnS3BrLvfSsqMArY7OQ4iCbSadesmIwqrlPLctparmEHIphtJQFcW9J2Oi-sQq5iJMbJGW6nT-IuliYsaIDWczHjpVPvoUbszlHlYdfEdldyRaQiW-iwiCnzOodMUpprXfCNv5d-NzJ6wYCJlN-NBZ02EMNs/s1600/images.jfif" />
            </a>
        </div>
        <h1>🖥️ طريقة تشغيل Commodore 64 على الكمبيوتر باستخدام VICE</h1>
        <p style="opacity: 0.8; margin-top: 10px;">استعد تجربة الـ C64 الكاملة وكأنك أمام شاشة CRT في الثمانينات</p>
    </header>

    <section class="tech-card">
        <h3>🔧 المتطلبات الأساسية</h3>
        <ul style="padding-right: 20px;">
            <li>🔸 كمبيوتر بنظام <b>Windows / Mac / Linux</b>.</li>
            <li>🔸 تحميل محاكي <b>VICE</b> (Versatile Commodore Emulator).</li>
            <li>🔸 ألعاب Commodore 64 بصيغ <span class="format-tag">.d64</span> أو <span class="format-tag">.crt</span>.</li>
        </ul>
        <div style="text-align: center; margin-top: 20px;">
            <a href="https://vice-emu.sourceforge.io/" class="btn-download" target="_blank">تحميل محاكي VICE الرسمي ➔</a>
        </div>
    </section>

    <img class="img-frame" alt="واجهة محاكي VICE" src="https://upload.wikimedia.org/wikipedia/commons/6/6b/VICE_C64_emulator.png" width="500" />

    <section class="tech-card" style="border-right-color: var(--c64-cyan);">
        <h3>🚀 بروتوكول تشغيل الألعاب</h3>
        <ol style="padding-right: 20px;">
            <li>افتح ملف <code>x64sc.exe</code> (النسخة الأكثر دقة في المحاكاة).</li>
            <li>من الشريط العلوي اختر: <code>File -> Attach Disk Image -> Drive 8</code>.</li>
            <li>اختر ملف اللعبة بصيغة <b>.d64</b>.</li>
            <li>في شاشة المحاكي الزرقاء، اكتب الأمر التالي بدقة:</li>
        </ol>
        <div class="terminal-box">LOAD"*",8,1</div>
        <p style="padding-right: 20px; font-size: 14px;">بعد انتهاء التحميل وظهور كلمة <b>READY</b>، اكتب:</p>
        <div class="terminal-box">RUN</div>
    </section>

    <section class="h-tip">
        <h3>🎯 نصائح حكميك الاحترافية</h3>
        <ul style="padding-right: 20px;">
            <li>✅ <b>فلتر CRT:</b> لا تنسَ تفعيله من إعدادات الفيديو لتعيش الجو الأصلي بظلال الشاشة القديمة.</li>
            <li>✅ <b>سرعة التشغيل:</b> استخدم زر <code>Alt + R</code> لإعادة التشغيل السريع (Soft Reset).</li>
            <li>✅ <b>أرصفة التحميل:</b> بعض الألعاب تتطلب انتظاراً طويلاً بعد كلمة RUN؛ لا تغلق المحاكي، اللعبة تعمل في الخلفية!.</li>
        </ul>
    </section>

    <section class="tech-card">
        <h3>📁 مكتبة الألعاب (Archives)</h3>
        <p>يمكنك العثور على أضخم مكتبة ألعاب تاريخية لهذا الجهاز في المواقع التالية:</p>
        <ul style="padding-right: 20px;">
            <li>🔹 <a href="https://www.c64.com/" target="_blank">موقع C64.com</a> (الأكثر تنظيماً).</li>
            <li>🔹 <a href="https://www.zimmers.net/anonftp/pub/cbm/c64/games/" target="_blank">أرشيف Zimmers</a> (المصدر التقني).</li>
        </ul>
    </section>

    <footer style="margin-top: 50px; padding-top: 30px; border-top: 1px dashed #cbd5e1; text-align: center;">
        <h2 style="color: #1e293b; letter-spacing: 4px; margin: 0;">HAKAMIQ</h2>
        <p style="color: #64748b; font-family: monospace; font-size: 12px; margin-top: 10px;">// SYSTEM_STATUS: COMMODORE_64_ONLINE // 2026_EDITION</p>
        <p style="margin-top: 20px; font-weight: bold; color: var(--c64-blue);">كأنك فتحت بوابة زمنية للثمانينات.. استمتع بالبكسلات النقية! 👾💾</p>
    </footer>

</div>

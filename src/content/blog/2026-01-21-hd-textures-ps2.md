---
title: 'مكتبة حزم الـ HD Textures لألعاب PS2 (الجزء الأول)'
description: 'أرشيف حزم القوام (HD Textures) لمحاكي PCSX2 ترقية جرافيكس الألعاب الكلاسيكية لتناسب شاشات 4K الحديثة ⚠️ تنبيه هام قبل التحميل لضمان عمل هذه الحزم بنسبة 100% وتجنب الشاشة السوداء، ي…'
pubDate: '2026-01-21T15:46:00.002+03:00'
updatedDate: '2026-02-24T04:52:16.022+03:00'
heroImage: '../../assets/blog-placeholder-1.jpg'
heroImageUrl: '/media/blogger/63/6396dce56f0d6564a45719975dd37a0e5626c027e748beeb341a45c743dd035f.png'
originalUrl: 'https://hakamiq1.blogspot.com/2026/01/hd-textures-ps2.html'
labels: ["PlayStation","PS2"]
---

<style>
    :root {
        --t-cyan: #00e5ff;
        --t-blue: #1e88e5;
        --t-red: #ff4444;
        --t-green: #00ff88;
        --t-orange: #ffaa00;
        --h-bg: #010409;
        --card-bg: #161b22;
        --card-shadow: 0 10px 30px rgba(0, 229, 255, 0.1);
    }

    .textures-archive-wrapper {
        direction: rtl;
        text-align: right;
        font-family: 'Tajawal', 'Segoe UI', sans-serif;
        line-height: 1.8;
        color: #c9d1d9;
        max-width: 1000px;
        margin: 0 auto;
        padding: 20px;
        background-color: var(--h-bg);
    }

    /* الهيدر الرئيسي */
    .archive-header {
        background: linear-gradient(135deg, #161b22, #0d1117);
        padding: 40px 25px;
        border-radius: 20px;
        text-align: center;
        margin-bottom: 40px;
        box-shadow: var(--card-shadow);
        border-bottom: 5px solid var(--t-cyan);
    }

    .archive-header h1 { font-size: 26px; color: white; margin: 15px 0; }

    /* بطاقة التنبيه الملحّة */
    .warning-card {
        background: #2a1a1a;
        border-right: 6px solid var(--t-red);
        padding: 25px;
        border-radius: 15px;
        margin-bottom: 35px;
    }

    /* بطاقة التعليمات (How-to) */
    .guide-card {
        background: var(--card-bg);
        border-radius: 16px;
        padding: 25px;
        margin-bottom: 40px;
        border: 1px solid #30363d;
    }

    .guide-card h3 { color: white; border-bottom: 1px solid #30363d; padding-bottom: 10px; margin-bottom: 20px; }

    /* قائمة الألعاب (Grid Layout) */
    .game-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
        gap: 20px;
        margin-top: 30px;
    }

    .game-card {
        background: var(--card-bg);
        border-radius: 12px;
        padding: 20px;
        border: 1px solid #30363d;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        transition: 0.3s;
    }

    .game-card:hover { transform: translateY(-5px); border-color: var(--t-cyan); box-shadow: var(--card-shadow); }

    .game-card h3 { color: var(--t-cyan); margin: 0 0 10px 0; font-size: 18px; }

    /* أزرار التحميل */
    .btn-dl {
        display: inline-block;
        background: transparent;
        color: var(--t-cyan) !important;
        border: 1px solid var(--t-cyan);
        padding: 8px 20px;
        border-radius: 6px;
        text-decoration: none;
        font-weight: bold;
        text-align: center;
        margin-top: 15px;
        transition: 0.3s;
    }

    .btn-dl:hover { background: var(--t-cyan); color: black !important; }

    .img-frame { border-radius: 12px; overflow: hidden; margin: 20px auto; display: block; max-width: 100%; }
    code { background: #000; color: var(--t-green); padding: 2px 6px; border-radius: 4px; font-family: monospace; }
</style>

<div class="textures-archive-wrapper">

    <header class="archive-header">
        <div class="separator" style="clear: both; text-align: center;">
            <a href="/media/blogger/63/6396dce56f0d6564a45719975dd37a0e5626c027e748beeb341a45c743dd035f.png">
                <img alt="أرشيف حزم القوام PCSX2 - حكميك" src="/media/blogger/63/6396dce56f0d6564a45719975dd37a0e5626c027e748beeb341a45c743dd035f.png" style="width:100%; max-width: 600px; border-radius: 10px;" />
            </a>
        </div>
        <h1>أرشيف حزم القوام (HD Textures) لمحاكي PCSX2</h1>
        <p style="color: #8b949e;">ترقية جرافيكس الألعاب الكلاسيكية لتناسب شاشات 4K الحديثة</p>
    </header>

    <section class="warning-card">
        <h3 style="color: var(--t-red); margin-top:0;">⚠️ تنبيه هام قبل التحميل</h3>
        <p>لضمان عمل هذه الحزم بنسبة 100% وتجنب الشاشة السوداء، يوصى باستخدام نسخة المحاكي <b>v1.7.4250</b>. النسخ الأحدث قد تسبب تعارضاً مع بعض ملفات القوام.</p>
        <div style="text-align: center;">
            <a href="https://github.com/PCSX2/pcsx2/releases/download/v1.7.4250/pcsx2-v1.7.4250-windows-64bit-SSE4-Qt.7z" class="btn-dl" style="background: var(--t-red); color: white !important; border:none;">📥 تحميل نسخة المحاكي المطلوبة</a>
        </div>
    </section>

    <section class="guide-card">
        <h3>⚙️ بروتوكول التركيب</h3>
        <ol style="padding-right: 20px;">
            <li>حمل ملف الـ Texture وفك الضغط عنه.</li>
            <li>ستجد مجلداً يحمل كود اللعبة (مثل: <code>SLUS-21727</code>).</li>
            <li>انقل المجلد بالكامل إلى مسار: <code>PCSX2 > textures</code>.</li>
            <li>من إعدادات المحاكي <b>Graphics</b>، فعّل خيار <b>Load Textures</b>.</li>
        </ol>
    </section>

    

    <h2 style="border-right: 4px solid var(--t-cyan); padding-right: 15px; color: white;">🎮 مكتبة الحزم (Mega Server)</h2>
    
    <div class="game-grid">
        <div class="game-card">
            <div>
                <h3>Baroque</h3>
                <p style="font-size: 13px; color: #8b949e;">لعبة RPG سوداوية بأسلوب استكشاف الأبراج المحصنة.</p>
            </div>
            <a href="https://mega.nz/file/Qds2kQAR#H0axHO4bIWOciSqh0jNkkzwpfHMiZ8AukDQfFClLMuI" class="btn-dl" target="_blank">تحميل الحزمة ⬇️</a>
        </div>

        <div class="game-card">
            <div>
                <h3>Black</h3>
                <p style="font-size: 13px; color: #8b949e;">ملك ألعاب التصويب (FPS) على الجيل الثاني بجرافيكس سينمائي.</p>
            </div>
            <a href="https://mega.nz/file/1NFxQCxb#pTjLHhhXsHFzQkIgIoR4lL-ciNE94LBi83FbCJEeca8" class="btn-dl" target="_blank">تحميل الحزمة ⬇️</a>
        </div>

        <div class="game-card" style="border-color: var(--t-orange);">
            <div>
                <h3 style="color: var(--t-orange);">Devil May Cry 2 (Combined)</h3>
                <p style="font-size: 12px; color: #8b949e;">حزمة مدمجة للقرصين. <b>مهم:</b> قم بتغيير اسم المجلد حسب الشخصية:</p>
                <ul style="font-size: 11px; padding-right: 15px;">
                    <li>لـ Lucia: <code>SLUS-20627</code></li>
                    <li>لـ Dante: <code>SLUS-20484</code></li>
                </ul>
            </div>
            <a href="https://mega.nz/file/8MFVVTDQ#K2VnsSy2u6mjtsP4T1n9rN_iYjuuF75zsbwjW12Hfhk" class="btn-dl" style="border-color: var(--t-orange); color: var(--t-orange) !important;" target="_blank">تحميل الحزمة ⬇️</a>
        </div>

        <div class="game-card">
            <div>
                <h3>The Matrix: Path of Neo</h3>
                <p style="font-size: 13px; color: #8b949e;">عش رحلة نيو كاملة مع تحكم مذهل بالزمن.</p>
            </div>
            <a href="https://mega.nz/file/RE03RCCK#Bu0XhEXvsrZzlFIUxck12c1ArUo1ntWVmb6Vv2fXYBU" class="btn-dl" target="_blank">تحميل الحزمة ⬇️</a>
        </div>

        <div class="game-card" style="border-top-color: var(--t-green);">
            <div>
                <h3 style="color: var(--t-green);">.hack// Collection</h3>
                <p style="font-size: 13px; color: #8b949e;">تشمل الأجزاء الأربعة: Infection, Mutation, Outbreak, Quarantine.</p>
            </div>
            <a href="https://mega.nz/file/AJEWgT5C#jRvpYoSHh-31sH0Ik88JLFPtgjhcxuZdUZvGwr2UMaA" class="btn-dl" style="border-color: var(--t-green); color: var(--t-green) !important;" target="_blank">تحميل الحزمة ⬇️</a>
        </div>

        <div class="game-card">
            <div>
                <h3>Need For Speed: Underground</h3>
                <p style="font-size: 13px; color: #8b949e;">بداية أسطورة التعديل والسباقات الليلية.</p>
            </div>
            <a href="https://mega.nz/file/cYFHgYRB#wrGA6tTGYMOLTh2n7YGliz8XbjwkpaBUdQ8peFHKKxI" class="btn-dl" target="_blank">تحميل الحزمة ⬇️</a>
        </div>
    </div>

    

    <footer style="margin-top: 60px; padding-top: 30px; border-top: 1px solid #30363d; text-align: center;">
        <h2 style="color: white; font-size: 32px; letter-spacing: 4px; margin: 0;">HAKAMIQ</h2>
        <p style="color: #666; font-family: monospace; font-size: 14px;">TEXTURE_ARCHIVE_LOADED // MEGA_SERVER_ACTIVE</p>
        <p style="margin-top: 15px; font-size: 13px; color: #8b949e;">تم نقل كافة الروابط لسيرفرات Mega لضمان بقائها للأبد. استمتع بالجرافيكس الجديد!</p>
    </footer>

</div>

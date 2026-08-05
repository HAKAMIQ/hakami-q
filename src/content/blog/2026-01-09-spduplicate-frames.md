---
title: 'شرح خيار SPDuplicate Frames في محاكي الدولفين'
description: 'ماذا يفعل خيار المزامنة العمودية؟ وهل يجب تفعيله؟ 🎭 حكاية "الرسام والعارض" لتبسيط العملية، لنتخيل أن الكمبيوتر يتكون من شخصين يقومان بمهمة عرض اللعبة: 🎨 اللعبة (الرسام) مسؤول عن…'
pubDate: '2026-01-09T11:00:00.004+03:00'
updatedDate: '2026-02-24T04:08:02.238+03:00'
heroImage: '../../assets/blog-placeholder-1.jpg'
heroImageUrl: 'https://blogger.googleusercontent.com/img/a/AVvXsEgpYme-i-Re3NyY6nriMZrqUTstRoUySX_KvU4mAthCYF5_-ZB_U0ehiO0Ywv4v3uui8FyTc8xM4qdYBkAxTh86tqBO47dkAhLvcJ5GTY-9UH84s3ZB_RCXMapGzB70WNLKWozU_a8CHh3FM6ysZ4XqPtInEiSO516DTfskFxip0dp6Uxfk_sN_f0WMpgs'
originalUrl: 'https://hakamiq1.blogspot.com/2026/01/spduplicate-frames.html'
labels: ["Nintendo","Wii"]
---

<style>
    :root {
        --vs-indigo: #4338ca;
        --vs-pink: #db2777;
        --vs-cyan: #0891b2;
        --vs-green: #166534;
        --vs-bg: #f9fafb;
        --card-shadow: 0 10px 25px rgba(0,0,0,0.05);
    }

    .vsync-article {
        direction: rtl;
        text-align: right;
        font-family: 'Tajawal', 'Segoe UI', sans-serif;
        line-height: 1.8;
        color: #374151;
        max-width: 900px;
        margin: 0 auto;
        padding: 15px;
        background-color: var(--vs-bg);
    }

    /* الهيدر الرئيسي */
    .vs-header {
        text-align: center;
        margin-bottom: 40px;
        padding: 20px;
    }

    .vs-header h2 { font-size: 26px; color: #111; margin-top: 15px; }

    /* البطاقة التعليمية (Material Card) */
    .material-card {
        background: white;
        border-radius: 16px;
        padding: 25px;
        margin-bottom: 30px;
        box-shadow: var(--card-shadow);
        border-top: 5px solid var(--vs-indigo);
    }

    .material-card h3 {
        color: var(--vs-indigo);
        font-size: 22px;
        margin-top: 0;
        border-bottom: 1px solid #eee;
        padding-bottom: 10px;
        margin-bottom: 20px;
    }

    /* شبكة الشخصيات (الرسام والعارض) */
    .char-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 20px;
        margin: 20px 0;
    }

    .char-box {
        padding: 20px;
        border-radius: 12px;
        text-align: center;
        transition: 0.3s;
    }

    .char-box:hover { transform: translateY(-5px); }
    .bg-indigo { background: #eef2ff; border: 1px solid #e0e7ff; }
    .bg-pink { background: #fdf2f8; border: 1px solid #fce7f3; }

    /* خط الزمن (Timeline) */
    .timeline-container {
        background: #1f2937;
        border-radius: 12px;
        padding: 25px;
        color: white;
        text-align: center;
        overflow-x: auto;
    }

    .timeline-flex {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 15px;
        min-width: 500px;
    }

    .frame-node {
        background: #22c55e;
        padding: 10px 20px;
        border-radius: 8px;
        font-weight: bold;
    }

    .frame-error {
        background: #ef4444;
        border: 2px solid #facc15;
        padding: 10px 20px;
        border-radius: 8px;
        font-weight: bold;
    }

    /* الخاتمة */
    .vs-footer {
        background: white;
        padding: 30px;
        border-radius: 16px;
        text-align: center;
        box-shadow: var(--card-shadow);
        border: 1px solid #f3f4f6;
    }

    .vs-footer p { font-size: 18px; color: var(--vs-indigo); font-weight: 600; }
</style>

<div class="vsync-article">

    <header class="vs-header">
        <div class="separator" style="clear: both; text-align: center;">
            <a href="https://blogger.googleusercontent.com/img/a/AVvXsEgpYme-i-Re3NyY6nriMZrqUTstRoUySX_KvU4mAthCYF5_-ZB_U0ehiO0Ywv4v3uui8FyTc8xM4qdYBkAxTh86tqBO47dkAhLvcJ5GTY-9UH84s3ZB_RCXMapGzB70WNLKWozU_a8CHh3FM6ysZ4XqPtInEiSO516DTfskFxip0dp6Uxfk_sN_f0WMpgs">
                <img alt="شرح خيار V-Sync في إعدادات الألعاب - مدونة حكميك" src="https://blogger.googleusercontent.com/img/a/AVvXsEgpYme-i-Re3NyY6nriMZrqUTstRoUySX_KvU4mAthCYF5_-ZB_U0ehiO0Ywv4v3uui8FyTc8xM4qdYBkAxTh86tqBO47dkAhLvcJ5GTY-9UH84s3ZB_RCXMapGzB70WNLKWozU_a8CHh3FM6ysZ4XqPtInEiSO516DTfskFxip0dp6Uxfk_sN_f0WMpgs" style="max-width:100%; height:auto;" />
            </a>
        </div>
        <h2>ماذا يفعل خيار المزامنة العمودية؟ وهل يجب تفعيله؟</h2>
    </header>

    <section class="material-card">
        <h3>🎭 حكاية "الرسام والعارض"</h3>
        <p>لتبسيط العملية، لنتخيل أن الكمبيوتر يتكون من شخصين يقومان بمهمة عرض اللعبة:</p>
        <div class="char-grid">
            <div class="char-box bg-indigo">
                <div style="font-size: 40px;">🎨</div>
                <h4 style="color:var(--vs-indigo);">اللعبة (الرسام)</h4>
                <p>مسؤول عن رسم صورة (إطار) جديدة كل لحظة وإرسالها للعرض.</p>
            </div>
            <div class="char-box bg-pink">
                <div style="font-size: 40px;">📺</div>
                <h4 style="color:var(--vs-pink);">الجهاز (العارض)</h4>
                <p>يأخذ الصورة من الرسام ويعلقها على الشاشة فوراً لتراها عينك.</p>
            </div>
        </div>
    </section>

    <section class="material-card" style="border-top-color: var(--vs-pink);">
        <h3>🛑 الحالة الأولى: بدون تفعيل الخيار</h3>
        <p>عندما يتأخر الرسام (اللعبة) في إنتاج صورة جديدة، ماذا يفعل العارض؟</p>
        <div class="timeline-container">
            <div class="timeline-flex">
                <div class="frame-node">صورة 1</div>
                <div>➡</div>
                <div class="frame-error">صورة 1 (تكرار)</div>
                <div>➡</div>
                <div class="frame-node">صورة 2</div>
            </div>
            <p style="margin-top:15px; font-size:14px; color:#d1d5db;">النتيجة: الجهاز يبذل جهداً 100% لإعادة عرض نفس الصورة، مما ينهك الأجهزة الضعيفة ويسبب "تمزق الشاشة".</p>
        </div>
    </section>

    <section class="material-card" style="border-top-color: var(--vs-cyan);">
        <h3>✅ الحالة الثانية: عند تفعيل الخيار (V-Sync)</h3>
        <p>الآن، العارض يقرر أن "يرتاح" إذا لم تصل صورة جديدة من الرسام.</p>
        <div class="timeline-container">
            <div class="timeline-flex">
                <div class="frame-node">صورة 1</div>
                <div>➡</div>
                <div style="background:#374151; padding:10px 20px; border-radius:8px; border:1px dashed var(--vs-cyan);">💤 راحة</div>
                <div>➡</div>
                <div class="frame-node">صورة 2</div>
            </div>
            <p style="margin-top:15px; font-size:14px; color:#9ca3af;">النتيجة: نفس الصور ظهرت، لكن الجهاز ارتاح بينهما وقل الضغط عليه، واختفى التمزق البصري.</p>
        </div>
    </section>

    <section class="material-card">
        <h3>📊 تحليل التأثير: جهاز ضعيف vs جهاز قوي</h3>
        <div class="separator" style="clear: both; text-align: center;">
            <a href="https://blogger.googleusercontent.com/img/a/AVvXsEiJ2L7S1Ew9xAF00XIcm1bLQi3Jn9fsJ_9tn0KKgSHynLk12ofOvFbi0EEONnIm6OtWKTuQzYg58xk0WIV2VW5X3Kg6dxir59McuF9UBNLlA7euWyhzG3mAb2WbX7h8sox1IgiroKeHO6VsOBXQCFVugDDBNHVjBaH9r1YbK-XO_UzFfUuYESKhaA9Vxz0">
                <img alt="رسم بياني لتأثير V-Sync على الأداء" src="https://blogger.googleusercontent.com/img/a/AVvXsEiJ2L7S1Ew9xAF00XIcm1bLQi3Jn9fsJ_9tn0KKgSHynLk12ofOvFbi0EEONnIm6OtWKTuQzYg58xk0WIV2VW5X3Kg6dxir59McuF9UBNLlA7euWyhzG3mAb2WbX7h8sox1IgiroKeHO6VsOBXQCFVugDDBNHVjBaH9r1YbK-XO_UzFfUuYESKhaA9Vxz0" style="max-width:100%; border-radius:10px;" />
            </a>
        </div>
        <ul style="margin-top:20px;">
            <li>🔹 <strong>جهازك ضعيف؟</strong> فعّل الخيار فوراً لتقليل الضغط ومنع التقطيع (Stutter).</li>
            <li>🔹 <strong>جهازك قوي؟</strong> قد ترغب في إغلاقه لتقليل تأخر الاستجابة (Input Lag) في الألعاب التنافسية.</li>
        </ul>
    </section>

    <footer class="vs-footer">
        <h3>💡 الخلاصة النهائية</h3>
        <p>"هذا الخيار لا يزيد عدد الفريمات (FPS)، هو فقط يعطي استراحة للمحارب المتعب."</p>
        <p style="font-size:14px; color:#6b7280; margin-top:10px;">📢 تابع HAKAMIQ لمزيد من الشروحات التقنية العميقة!</p>
    </footer>

</div>

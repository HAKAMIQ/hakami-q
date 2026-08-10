---
title: '📊 قائمة الألعاب المدعومة في Netplay على محاكي Xenia'
description: 'دليل الألعاب المدعومة في Netplay على محاكي Xenia مع ميزة Netplay، أصبح بإمكانك عيش تجربة اللعب الجماعي لأساطير Xbox 360 على جهازك الشخصي. في هذا الجدول، نستعرض أشهر الألعاب التي تم…'
pubDate: '2025-04-16T22:53:00.002+03:00'
updatedDate: '2026-02-24T06:13:46.002+03:00'
heroImage: '../../assets/blog-placeholder-1.jpg'
heroImageUrl: '/media/blogger/0c/0c4b57f02871fbc007f24d38a8f4f6733b90716fbf6ee76a88b0f2c81a11d58c.jpg'
originalUrl: 'https://hakamiq1.blogspot.com/2025/04/netplay-xenia_16.html'
labels: ["Xbox","Xbox360"]
---

<style>
    :root {
        --xe-green: #107c10;
        --xe-light-green: #4ade80;
        --xe-dark: #0a0a0a;
        --xe-card: #1e1e1e;
        --xe-cyan: #4fc3f7;
        --xe-gold: #ffcc00;
        --xe-red: #f87171;
        --text-main: #f8fafc;
        --text-muted: #94a3b8;
    }

    .netplay-list-wrapper {
        direction: rtl;
        text-align: right;
        font-family: 'Tajawal', 'Cairo', sans-serif;
        line-height: 1.8;
        color: var(--text-main);
        max-width: 1000px;
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
        text-shadow: 0 0 15px rgba(79, 195, 247, 0.2); 
    }

    /* صناديق الإحصائيات */
    .stats-container {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: 15px;
        margin-bottom: 35px;
    }

    .stat-card {
        background: var(--xe-card);
        padding: 15px;
        border-radius: 12px;
        text-align: center;
        border: 1px solid #2a2a2a;
    }

    .stat-card b { display: block; font-size: 22px; color: var(--xe-cyan); }
    .stat-card span { font-size: 14px; color: var(--text-muted); }

    /* الجدول المتطور */
    .table-container {
        overflow-x: auto;
        margin-bottom: 30px;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        border: 1px solid #2a2a2a;
    }

    .game-table {
        width: 100%;
        border-collapse: collapse;
        background: var(--xe-card);
        font-size: 14px;
        text-align: center;
    }

    .game-table th { 
        background: #18181b;
        color: var(--xe-cyan); 
        padding: 15px; 
        font-weight: bold;
        white-space: nowrap;
        border-bottom: 2px solid #333;
    }

    .game-table td { 
        padding: 12px 15px; 
        border-bottom: 1px solid #2a2a2a; 
        color: #e2e8f0;
    }

    /* ألوان الحالة */
    .status-ok { background: rgba(74, 222, 128, 0.1); color: var(--xe-light-green); font-weight: bold; }
    .status-warn { background: rgba(255, 204, 0, 0.1); color: var(--xe-gold); font-weight: bold; }
    .status-error { background: rgba(248, 113, 113, 0.1); color: var(--xe-red); font-weight: bold; }

    code {
        background: #000;
        color: var(--xe-cyan);
        padding: 2px 6px;
        border-radius: 4px;
        font-family: 'JetBrains Mono', monospace;
    }

    /* رأي حكميك */
    .opinion-box {
        background: linear-gradient(135deg, #1a1a1a, #0a0a0a);
        border-right: 5px solid var(--xe-gold);
        padding: 25px;
        border-radius: 12px;
        margin-top: 40px;
        border-top: 1px solid #333;
        border-bottom: 1px solid #333;
        border-left: 1px solid #333;
    }

    .img-frame { border-radius: 12px; overflow: hidden; margin: 0 auto 20px auto; display: block; max-width: 100%; border: 1px solid #333; }
</style>

<div class="netplay-list-wrapper">

    <header class="tech-header">
        <div class="separator" style="clear: both; text-align: center">
            <a href="/media/blogger/0c/0c4b57f02871fbc007f24d38a8f4f6733b90716fbf6ee76a88b0f2c81a11d58c.jpg">
                <img class="img-frame" alt="Xenia Netplay Compatibility" src="/media/blogger/0c/0c4b57f02871fbc007f24d38a8f4f6733b90716fbf6ee76a88b0f2c81a11d58c.jpg" style="max-width: 300px" />
            </a>
        </div>
        <h2>دليل الألعاب المدعومة في Netplay على محاكي Xenia</h2>
        <p style="color: var(--text-muted); max-width: 850px; margin: 15px auto 0 auto">
            مع ميزة Netplay، أصبح بإمكانك عيش تجربة اللعب الجماعي لأساطير Xbox 360 على جهازك الشخصي. في هذا الجدول، نستعرض أشهر الألعاب التي تم اختبارها، سواء كانت تعمل كلياً أو جزئياً، مع ملاحظات تقنية لضمان أفضل أداء.
        </p>
    </header>

    <h3 style="color: var(--xe-cyan); margin-bottom: 15px">📈 إحصائيات التوافق الحالية:</h3>
    <div class="stats-container">
        <div class="stat-card"><span>Working Public</span><b>148</b></div>
        <div class="stat-card"><span>Tested Locally</span><b>215</b></div>
        <div class="stat-card"><span>Systemlink</span><b>110</b></div>
        <div class="stat-card" style="border-color: var(--xe-cyan)"><span>Total Supported</span><b>439</b></div>
    </div>

    

    <div class="table-container">
        <table class="game-table">
            <thead>
                <tr>
                    <th>🎮 اللعبة</th>
                    <th>🧩 نوع الاتصال</th>
                    <th>📶 الحالة</th>
                    <th>⚙️ ملاحظات الإعداد</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Call of Duty: World at War</td>
                    <td>Systemlink</td>
                    <td class="status-ok">✅ يعمل كلياً</td>
                    <td>يتطلب Title Update 7 و <code>network_mode = 1</code></td>
                </tr>
                <tr>
                    <td>Gears of War 3</td>
                    <td>Public Server</td>
                    <td class="status-ok">✅ يعمل كلياً</td>
                    <td>أفضل أداء في النسخة الأساسية (بدون تحديثات)</td>
                </tr>
                <tr>
                    <td>Halo Reach</td>
                    <td>Systemlink</td>
                    <td class="status-warn">⚠️ جزئي</td>
                    <td>مشاكل إضاءة، يفضل تفعيل <code>readback_resolve</code></td>
                </tr>
                <tr>
                    <td>Left 4 Dead 2</td>
                    <td>Public / Radmin</td>
                    <td class="status-ok">✅ يعمل كلياً</td>
                    <td>دعم كامل لـ Mousehook، مستقر على Radmin VPN</td>
                </tr>
                <tr>
                    <td>Red Dead Redemption</td>
                    <td>Systemlink</td>
                    <td class="status-warn">⚠️ جزئي</td>
                    <td>يتطلب سيرفر محلي وتفعيل ملف <code>protect_zero</code></td>
                </tr>
                <tr>
                    <td>Perfect Dark Zero</td>
                    <td>Systemlink</td>
                    <td class="status-ok">✅ يعمل كلياً</td>
                    <td>يدعم الشبكة مع ملاحظة مشاكل بسيطة في الكاميرا التجسسية</td>
                </tr>
                <tr>
                    <td>Dead Rising 2: Case West</td>
                    <td>Public Server</td>
                    <td class="status-ok">✅ يعمل كلياً</td>
                    <td>عطّل خيار <code>cam-chase</code> للحصول على أعلى سلاسة</td>
                </tr>
                <tr>
                    <td>Project Gotham Racing 4</td>
                    <td>Systemlink</td>
                    <td class="status-ok">✅ يعمل كلياً</td>
                    <td>استخدم TU5 Patch للحصول على أفضل استقرار</td>
                </tr>
                <tr>
                    <td>Forza Motorsport 4</td>
                    <td>Systemlink</td>
                    <td class="status-error">❌ لا يعمل</td>
                    <td>يتصل بالشبكة لكنه ينهار عند محاولة بدء اللعب الجماعي</td>
                </tr>
            </tbody>
        </table>
    </div>

    <section class="opinion-box">
        <h3 style="color: var(--xe-gold); margin-top: 0">🎮 رأي حكميك الشخصي - HAKAMIQ</h3>
        <p style="margin-bottom: 0">
            بصراحة... عندما رأيت كمية الألعاب التي عادت للحياة عبر Netplay انصدمت! ألعاب كانت في طي النسيان، عادت لتعمل وكأنك تملك سيرفر Xbox Live خاص بك. 
            <br><br>
            <b>السر يكمن في الترتيب:</b> تطابق نسخة المحاكي بينك وبين أصدقائك، تحديثات اللعبة (Title Updates)، وتفعيل الخيارات الدقيقة مثل <code>network_mode</code> أو <code>protect_zero</code>. إذا كنت تحب التجارب الجماعية الكلاسيكية، جرب Gears أو Left 4 Dead مع خويك، ستعيش لحظة حماس كأنكم جالسين سوياً قبل 10 سنوات! 😎🔥
        </p>
    </section>

    <div style="margin-top: 30px; text-align: center">
        <a href="https://github.com/xenia-canary/xenia-canary/wiki/Netplay-Compatibility" target="_blank" style="color: var(--xe-cyan); text-decoration: none; font-weight: bold">🔗 اضغط هنا للاطلاع على القائمة الكاملة والمحدثة رسمياً</a>
    </div>

</div>

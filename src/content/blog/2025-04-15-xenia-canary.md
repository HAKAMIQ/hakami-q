---
title: '🎮 كل ما تحتاجه لتشغيل Xenia Canary على جهازك [دليل شامل]'
description: 'دليل Quickstart الكامل لتشغيل ألعاب Xbox 360 عبر محاكي Xenia Canary إذا كنت مهتماً بتجربة أساطير الـ Xbox 360 على حاسوبك، فهذا الدليل هو دليلك الشامل. سنشرح كل شيء من المتطلبات، تح…'
pubDate: '2025-04-15T19:51:00.002+03:00'
updatedDate: '2026-02-24T06:29:34.276+03:00'
heroImage: '../../assets/blog-placeholder-1.jpg'
heroImageUrl: '/media/blogger/38/38ddabf1634ac01a16509fc5f2a1f9f555296918fe5afb89d8620e21163512ea.png'
originalUrl: 'https://hakamiq1.blogspot.com/2025/04/xenia-canary.html'
labels: ["Xbox","Xbox360"]
---

<style>
    :root {
        --xe-green: #00e676;
        --xe-blue: #4fc3f7;
        --xe-yellow: #ffd600;
        --xe-orange: #ff8a65;
        --xe-red: #f44336;
        --xe-dark: #121212;
        --xe-card: #1e1e1e;
        --text-main: #f4f4f4;
        --text-muted: #94a3b8;
    }

    .xenia-quickstart-wrapper {
        direction: rtl;
        text-align: right;
        font-family: 'Tajawal', 'Cairo', sans-serif;
        line-height: 1.9;
        color: var(--text-main);
        max-width: 950px;
        margin: 0 auto;
        padding: 25px;
        background-color: var(--xe-dark);
        border-radius: 16px;
        border: 1px solid #333;
    }

    /* الهيدر والصورة الرئيسية */
    .tech-header {
        text-align: center;
        margin-bottom: 35px;
        padding-bottom: 25px;
        border-bottom: 1px dashed #444;
    }

    .tech-header h2 { 
        color: var(--xe-green); 
        font-size: 24px; 
        margin-top: 15px;
        line-height: 1.6;
    }

    /* بطاقات الأقسام */
    .guide-card {
        background: var(--xe-card);
        border-radius: 12px;
        padding: 25px;
        margin-bottom: 30px;
        border: 1px solid #2a2a2a;
        box-shadow: 0 8px 20px rgba(0,0,0,0.3);
    }

    .guide-card h3 { 
        margin-top: 0; 
        border-bottom: 1px solid #333; 
        padding-bottom: 12px; 
        margin-bottom: 20px; 
    }

    /* الجداول الاحترافية */
    .table-container { overflow-x: auto; margin: 20px 0; border-radius: 8px; border: 1px solid #333; }
    table { width: 100%; border-collapse: collapse; background: #111; text-align: center; }
    th { background: #252525; color: var(--xe-blue); padding: 12px; border: 1px solid #333; }
    td { padding: 10px; border: 1px solid #333; color: #ddd; vertical-align: top; }

    /* تنسيق القوائم والأكواد */
    .styled-list { padding-right: 25px; margin: 0; }
    .styled-list li { margin-bottom: 10px; }

    code, pre {
        background: #000 !important;
        color: #68ffbb !important;
        padding: 4px 8px;
        border-radius: 6px;
        font-family: 'Consolas', monospace;
        direction: ltr;
        text-align: left;
    }
    pre { display: block; padding: 15px; margin: 10px 0; border: 1px solid #333; overflow-x: auto; }

    /* صناديق التنبيه */
    .alert-box {
        background: rgba(244, 67, 54, 0.05);
        border-right: 5px solid var(--xe-red);
        padding: 15px;
        border-radius: 8px;
        margin: 20px 0;
    }

    .img-frame { border-radius: 12px; overflow: hidden; margin: 0 auto 20px auto; display: block; max-width: 100%; height: auto; border: 1px solid #333; }
</style>

<div class="xenia-quickstart-wrapper">

    <header class="tech-header">
        <div class="separator" style="clear: both; text-align: center">
            <a href="/media/blogger/38/38ddabf1634ac01a16509fc5f2a1f9f555296918fe5afb89d8620e21163512ea.png">
                <img class="img-frame" alt="Xenia Canary Quickstart" src="/media/blogger/38/38ddabf1634ac01a16509fc5f2a1f9f555296918fe5afb89d8620e21163512ea.png" style="max-width: 500px" />
            </a>
        </div>
        <h2>دليل Quickstart الكامل لتشغيل ألعاب Xbox 360 عبر محاكي Xenia Canary</h2>
        <p>إذا كنت مهتماً بتجربة أساطير الـ Xbox 360 على حاسوبك، فهذا الدليل هو دليلك الشامل. سنشرح كل شيء من المتطلبات، تحميل المحاكي، استخراج الألعاب، وحتى تثبيت الإضافات (DLCs).</p>
    </header>

    <section class="guide-card">
        <h3 style="color: var(--xe-yellow)">🧰 متطلبات تشغيل Xenia Canary</h3>
        <div class="table-container">
            <table>
                <thead>
                    <tr><th>المستوى</th><th>المتطلبات التقنية</th></tr>
                </thead>
                <tbody>
                    <tr>
                        <td><b style="color: var(--xe-green)">موصى بها</b></td>
                        <td>
                            <ul class="styled-list">
                                <li>نظام التشغيل: Windows 11 x64</li>
                                <li>المعالج: سداسي النواة أو أكثر (يدعم AVX/AVX2)</li>
                                <li>كرت الشاشة: NVIDIA GTX 980 Ti أو أحدث</li>
                                <li>الذاكرة: 6 جيجا أو أكثر</li>
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <td><b style="color: var(--xe-orange)">الحد الأدنى</b></td>
                        <td>
                            <ul class="styled-list">
                                <li>النظام: Windows 10 x64 / Linux (Proton)</li>
                                <li>المعالج: 64-bit يدعم AVX أو AVX2</li>
                                <li>كرت الشاشة: داعم لـ D3D12 أو Vulkan</li>
                                <li>الذاكرة: 4 جيجا</li>
                            </ul>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="alert-box">
            ⚠️ <b>تنبيه هام:</b> المحاكي لا يعمل على OpenGL أو Direct3D 11. ويندوز 7 غير مدعوم نهائياً. كروت AMD قد تواجه بعض المشاكل التقنية حالياً.
        </div>
    </section>

    <section class="guide-card">
        <h3 style="color: var(--xe-blue)">📥 تحميل محاكي Xenia</h3>
        <ul class="styled-list">
            <li><a href="https://github.com/xenia-canary/xenia-canary" target="_blank">Xenia Canary</a> – الخيار الأفضل (الأكثر تحديثاً).</li>
            <li><a href="https://github.com/xenia-project/xenia" target="_blank">Xenia Master</a> – النسخة المستقرة.</li>
        </ul>
        <p style="font-size: 14px; opacity: 0.8">💡 إذا اكتشفه مضاد الفيروسات، تجاهل التنبيه طالما التحميل من الروابط الرسمية أعلاه.</p>
    </section>

    <section class="guide-card">
        <h3 style="color: var(--xe-yellow)">💿 استخراج الألعاب من Xbox 360</h3>
        <p style="color: var(--xe-red)"><b>❌ تنبيه:</b> لا يمكن تشغيل الألعاب مباشرة من القرص، ولا يمكنك استخدام Xbox One/Series لاستخراجها!</p>
        
        <h4>🔌 التجهيز المطلوب:</h4>
        <ul class="styled-list">
            <li>جهاز Xbox 360 أصلي (يقرأ الأقراص).</li>
            <li>USB بحجم 16GB أو أكثر.</li>
            <li>أداة <a href="https://github.com/Voxel9/Velocity" target="_blank">Velocity</a>.</li>
        </ul>

        <h4>🧩 الخطوات العملية:</h4>
        <ol class="styled-list">
            <li><b>النسخ:</b> أدخل USB في الـ Xbox وقم بتهيئته من إعدادات النظام، ثم ثبت اللعبة من القرص إلى الـ USB.</li>
            <li><b>النقل:</b> وصل الـ USB بالكمبيوتر، أظهر الملفات المخفية، وابحث عن ملف اللعبة في مسار <code>Content\0000000000000000</code>.</li>
            <li><b>التشغيل:</b> شغل الملف المستخرج داخل Xenia مباشرة، أو اسحب ملف <code>default.xex</code> للمحاكي.</li>
        </ol>

        <h4>🔓 تفعيل النسخة الكاملة:</h4>
        <p>افتح ملف الإعدادات <code>xenia-canary.config.toml</code> وغير القيمة التالية:</p>
        <pre>license_mask = 1</pre>
        <p>هذا يحول اللعبة من وضع الديمو إلى النسخة الكاملة.</p>
    </section>

    <section class="guide-card">
        <h3 style="color: var(--xe-orange)">📂 تثبيت الإضافات (DLCs)</h3>
        <p><b>في نسخة Canary:</b> شغل اللعبة لمعرفة الـ Title ID، ثم من القائمة اختر <b>Install Content</b> وحدد حزمة الـ DLC.</p>
        <p><b>في نسخة Master:</b> استخرج الـ DLC باستخدام أداة Velocity إلى المسار التالي:</p>
        <pre>Documents\Xenia\TitleID\00000002</pre>
    </section>

    <section class="guide-card">
        <h3 style="color: var(--xe-blue)">🔗 روابط ومراجع هامة:</h3>
        <ul class="styled-list">
            <li><a href="https://xenia.jp" target="_blank">الموقع الرسمي للمشروع</a></li>
            <li><a href="https://xenia.jp/compatibility" target="_blank">قائمة توافق الألعاب</a></li>
            <li><a href="http://wiki.redump.org/index.php?title=Microsoft_Xbox_and_Xbox_360_Dumping_Guide" target="_blank">دليل Redump الرسمي لاستخراج الأقراص</a></li>
        </ul>
    </section>

    <footer style="background: #252525; padding: 20px; border-radius: 12px; border: 1px solid #444; text-align: center">
        <p style="margin: 0; font-weight: bold">🎮 نصيحة سريعة: لا تقم بتحويل الألعاب إلى ISO؛ فهي تستهلك مساحة ضخمة بدون أي فائدة تقنية حقيقية!</p>
    </footer>

</div>

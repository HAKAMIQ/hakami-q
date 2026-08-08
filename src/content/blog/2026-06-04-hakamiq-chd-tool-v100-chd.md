---
title: 'إطلاق Hakamiq CHD Tool v1.0.0 لإدارة وتحويل ملفات CHD على ويندوز'
description: 'إطلاق Hakamiq CHD Tool v1.0.0 إطلاق Hakamiq CHD Tool v1.0.0 لإدارة وتحويل ملفات CHD على ويندوز أُعلن اليوم عن إطلاق أول إصدار عام من Hakamiq CHD Tool v1.0.0 ، وهي أداة سطح مكتب لنظ…'
pubDate: '2026-06-04T19:42:30.166+03:00'
updatedDate: '2026-06-04T23:18:37.306+03:00'
heroImage: '../../assets/blog-placeholder-1.jpg'
heroImageUrl: '/media/blogger/4f/4fceaf9e2caa84a89aa5a8f82067508b35f363c2df1760b5c6d94aaae987ec60.jpg'
originalUrl: 'https://hakamiq1.blogspot.com/2026/06/hakamiq-chd-tool-v100-chd.html'
labels: ["PC"]
---

<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>إطلاق Hakamiq CHD Tool v1.0.0</title>
    
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@600;700;800&family=Tajawal:wght@400;500;700&display=swap" rel="stylesheet">
    
    <style>
        /* تعريف المتغيرات للألوان */
        :root {
            --xe-gold: #ffd600;
            --xe-green: #00e676;
            --xe-blue: #29b6f6;
            --xe-dark: #121212;
            --xe-card: #1e1e1e;
            --text-main: #f4f4f4;
            --text-muted: #94a3b8;
        }

        /* تنسيق الحاوية الرئيسية */
        .orbital-full-wrapper {
            direction: rtl;
            text-align: right;
            font-family: 'Tajawal', sans-serif; /* استخدام خط تجوال للنصوص العادية */
            font-size: 17px;
            font-weight: 500;
            line-height: 1.9;
            color: var(--text-main);
            max-width: 950px;
            margin: 0 auto;
            padding: 30px;
            background-color: var(--xe-dark);
            border-radius: 16px;
            border: 1px solid #2a2a2a;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
        }

        /* تنسيق العناوين بخط كايرو لبروز أفضل */
        .orbital-full-wrapper h2, 
        .orbital-full-wrapper h3, 
        .orbital-full-wrapper h4 {
            font-family: 'Cairo', sans-serif;
            font-weight: 700;
            letter-spacing: -0.3px;
        }

        /* تنسيق رأس الصفحة (Header) */
        .tech-header { 
            text-align: center; 
            margin-bottom: 35px; 
            border-bottom: 1px dashed #444; 
            padding-bottom: 25px; 
        }
        
        .tech-header h2 {
            color: var(--xe-blue);
            margin-top: 15px;
            font-size: 26px;
        }

        /* أنماط للفقرة داخل الرأس */
        .tech-header p {
            color: var(--text-muted);
            font-size: 16px;
        }

        /* توسيط الصورة الأولى داخل الرأس */
        .tech-header-img-center {
            display: block;
            margin: 0 auto;
            max-width: 100%;
            height: auto;
        }

        /* تنسيق بطاقات الأقسام (Section Cards) */
        .section-card { 
            background: var(--xe-card); 
            border-radius: 12px; 
            padding: 25px 30px; 
            margin-bottom: 25px; 
            border: 1px solid #2a2a2a;
            transition: border-color 0.3s ease;
        }
        
        .section-card:hover {
            border-color: #3a3a3a;
        }

        .section-card h3 { 
            color: var(--xe-gold);
            margin-top: 0; 
            border-bottom: 1px solid #333; 
            padding-bottom: 15px; 
            margin-bottom: 20px; 
            font-size: 20px;
        }

        /* أنماط للفقرات داخل بطاقات الأقسام */
        .section-card p.muted {
            color: var(--text-muted);
        }

        /* حاوية الصور داخل الأقسام مع توسيط */
        .separator-center {
            clear: both;
            text-align: center;
        }

        /* تنسيق الجداول */
        .table-container { 
            overflow-x: auto; 
            margin: 20px 0; 
            border-radius: 10px; 
            border: 1px solid #333; 
        }
        
        table { 
            width: 100%; 
            border-collapse: collapse; 
            background: #151515; 
            text-align: right; 
        }
        
        th { 
            background: #252525; 
            color: var(--xe-gold); 
            padding: 15px; 
            border-bottom: 2px solid #333; 
            font-family: 'Cairo', sans-serif;
            font-size: 16px;
        }
        
        td { 
            padding: 15px; 
            border-bottom: 1px solid #2a2a2a; 
            color: #ddd; 
        }
        
        tr:last-child td {
            border-bottom: none;
        }

        /* تنسيق الرموز البرمجية */
        code { 
            background: rgba(0, 230, 118, 0.1); 
            color: var(--xe-green); 
            padding: 3px 8px; 
            border-radius: 6px; 
            font-family: 'Consolas', 'Courier New', monospace; 
            font-size: 15px;
            border: 1px solid rgba(0, 230, 118, 0.2);
        }

        /* تنسيق الصور بإطار للفصل عن الفقرات */
        .img-frame { 
            border-radius: 12px; 
            overflow: hidden; 
            margin: 10px auto 25px auto; 
            display: block; 
            max-width: 100%; 
            height: auto; 
            border: 1px solid #333;
            box-shadow: 0 4px 15px rgba(0,0,0,0.3);
        }

        /* تنسيق القوائم المعزولة */
        .clean-list { 
            padding-right: 0 !important; 
            list-style: none !important; 
            margin: 15px 0; 
        }
        
        .clean-list li { 
            position: relative; 
            padding-right: 25px !important; 
            margin-bottom: 14px; 
            background: none !important; 
            color: #eee;
        }
        
        /* الرمز النقطي المخصص */
        .clean-list li::before { 
            content: "" !important; 
            position: absolute; 
            right: 0; 
            top: 12px; 
            width: 8px; 
            height: 8px; 
            background: var(--xe-blue) !important; 
            border-radius: 50%; 
            display: block !important;
            box-shadow: 0 0 8px rgba(41, 182, 246, 0.5);
        }

        /* تنسيق الروابط */
        a { 
            color: var(--xe-blue); 
            text-decoration: none; 
            font-weight: 700; 
            transition: color 0.2s ease;
        }
        
        a:hover { 
            color: var(--xe-gold); 
        }
        
        /* تنسيق التذييل (Footer) */
        .orbital-footer {
            background: #1a1a1a; 
            border-radius: 12px; 
            padding: 25px; 
            text-align: center;
            border: 1px solid #2a2a2a;
            margin-top: 20px;
        }

        /* فقرة التذييل */
        .orbital-footer p {
            color: var(--text-muted);
            font-size: 16px;
            line-height: 1.8;
        }

        /* استعلامات الوسائط الأساسية للتجاوب */
        @media (max-width: 768px) {
            .orbital-full-wrapper {
                padding: 20px;
            }
            .section-card {
                padding: 20px;
            }
            .tech-header h2 {
                font-size: 22px;
            }
        }
    </style>
</head>
<body>

<div class="orbital-full-wrapper">

    <header class="tech-header">
        <a href="/media/blogger/4f/4fceaf9e2caa84a89aa5a8f82067508b35f363c2df1760b5c6d94aaae987ec60.jpg" imageanchor="1">
            <img class="tech-header-img-center" border="0" data-original-height="768" data-original-width="1376" height="224" src="/media/blogger/4f/4fceaf9e2caa84a89aa5a8f82067508b35f363c2df1760b5c6d94aaae987ec60.jpg" width="400" />
        </a>
        <h2>إطلاق Hakamiq CHD Tool v1.0.0 لإدارة وتحويل ملفات CHD على ويندوز</h2>
        <p>أُعلن اليوم عن إطلاق أول إصدار عام من <b>Hakamiq CHD Tool v1.0.0</b>، وهي أداة سطح مكتب لنظام Windows x64 مخصصة لتسهيل التعامل مع ملفات CHD وعمليات التحويل، والاستخراج، والتحقق، كبديل عملي ومنظم عن الاعتماد الكامل على أوامر <code>chdman</code> اليدوية.</p>
    </header>

    <section class="section-card">
        <h3>ما هي فكرة برنامج Hakamiq CHD Tool؟</h3>
        <div class="separator-center">
            <a href="https://github.com/HAKAMIQ/HakamiqChdTool.App" target="_blank">
                <img alt="Hakamiq CHD Tool Interface" class="img-frame" data-original-height="634" data-original-width="955" src="/media/blogger/84/841aec21c2e6d41fb1364bfb3e810403ab36254a1c03d719c764ea1884dc3a1a.png" />
            </a>
        </div>
        <p>برنامج Hakamiq CHD Tool يعمل كواجهة رسومية منظمة مبنية حول أداة MAME chdman، ويهدف إلى تبسيط كافة المهام المتعلقة بملفات CHD. بدل كتابة أوامر يدوية معقدة في الطرفية، يمكن للمستخدم ببساطة إضافة الملفات إلى البرنامج، واختيار العملية المناسبة، ثم متابعة حالة المعالجة والتقدم والنتيجة النهائية من داخل قائمة معالجة واحدة وبشكل سلس.</p>
    </section>

    <section class="section-card">
        <h3>أهم ما يقدمه الإصدار v1.0.0</h3>
        <p>يركز هذا الإصدار على تقديم نسخة أولى مستقرة وقابلة للاستخدام العام، وتغطي أهم الوظائف الأساسية التي يحتاجها المستخدم، ويدعم ما يلي:</p>
        <ul class="clean-list">
            <li>تحويل ملفات الأقراص المدعومة إلى صيغة CHD.</li>
            <li>التحقق من سلامة ملفات CHD باستخدام أمر <code>chdman verify</code>.</li>
            <li>الاستخراج من ملفات CHD (عند دعم العملية).</li>
            <li>إضافة عدة ملفات إلى قائمة معالجة واحدة ومتابعة حالة وتقدم كل مهمة داخل الواجهة.</li>
            <li>دعم استخراج وتخصيص بعض الملفات المضغوطة مثل ZIP و RAR و 7Z حسب طبقة الاستخراج.</li>
            <li>تضمين أدوات <code>chdman</code> و <code>7-Zip</code> ضمن الحزمة لتسهيل التشغيل مباشرة.</li>
            <li>واجهة مرنة تدعم اتجاهي RTL و LTR باللغتين العربية والإنجليزية.</li>
            <li>سمات وتصاميم متعددة: Light و Dark و HAKAMIQ.</li>
            <li>وجود ملفات الترخيص والتنبيهات القانونية الخاصة بالأدوات المرفقة.</li>
        </ul>
    </section>

    <section class="section-card">
        <h3>لمن هذا البرنامج؟</h3>
        <div class="separator-center">
            <a href="https://github.com/HAKAMIQ/HakamiqChdTool.App" target="_blank">
                <img alt="Hakamiq CHD Tool Usage" class="img-frame" data-original-height="639" data-original-width="914" src="/media/blogger/b5/b51f41e91ae80fe3f47ba653836431e173adc3a8820b69f3945bb26c67b2d540.png" />
            </a>
        </div>
        <p>البرنامج مناسب تماماً للمستخدمين الذين يتعاملون بكثرة مع ملفات CHD أو ملفات الأقراص ويريدون واجهة رسومية منظمة بدل الأوامر اليدوية. سيكون مفيداً جداً لمن يريد:</p>
        <ul class="clean-list">
            <li>تنظيم عمليات التحويل إلى CHD ومتابعة عدة مهام من مكان واحد.</li>
            <li>فحص سلامة ملفات CHD الخاصة به أو استخراج محتواها عند الحاجة.</li>
            <li>استخدام واجهة Windows واضحة وسهلة الاستخدام بدل سطر الأوامر (CMD).</li>
            <li>التعامل مع ملفات قانونية يملكها أو لديه حق استخدامها.</li>
        </ul>
    </section>

    <section class="section-card">
        <h3>نسخ التحميل المتوفرة وأيها تختار؟</h3>
        <p>يتوفر الإصدار بملفين مختلفين ليناسب بيئة جهازك:</p>
        
        <p><b>1. نسخة Self-Contained (المستقلة)</b></p>
        <p class="muted">نسخة كاملة للتشغيل المباشر، وتتضمن كافة مكونات التشغيل المطلوبة بداخلها. هذا الخيار هو الأنسب إذا كنت لا تعرف الفرق بين النسختين أو لا ترغب بتثبيت .NET يدويًا.<br />
        📥 <i>اسم الملف:</i> <code>HakamiqChdTool-v1.0.0-win-x64-self-contained.zip</code></p>
        
        <p style="margin-top: 25px;"><b>2. نسخة Framework-Dependent (المعتمدة على إطار العمل)</b></p>
        <p class="muted">هذه النسخة أخف حجماً، لكنها تتطلب وجود بيئة تشغيل .NET 8 Desktop Runtime مثبتة مسبقاً على جهازك.<br />
        📥 <i>اسم الملف:</i> <code>HakamiqChdTool-v1.0.0-win-x64-framework-dependent.zip</code></p>

        <div style="border-top: 1px dashed rgb(51, 51, 51); margin-top: 25px; padding-top: 20px;">
            <p><b>روابط التحميل الرسمية:</b></p>
            <ul class="clean-list">
                <li><b>تحميل الإصدار من صفحة GitHub Releases:</b> <a href="https://github.com/HAKAMIQ/HakamiqChdTool.App/releases/tag/v1.0.0" target="_blank">اضغط هنا للتحميل</a></li>
                <li><b>صفحة المشروع الرئيسية (للاطلاع والمتابعة):</b> <a href="https://github.com/HAKAMIQ/HakamiqChdTool.App" target="_blank">زيارة المستودع</a></li>
            </ul>
        </div>
    </section>

    <section class="section-card">
        <h3>ملاحظات مهمة وقانونية قبل الاستخدام</h3>
        <ul class="clean-list">
            <li>هذا البرنامج <b>لا يحتوي</b> على ألعاب، أو ROMs، أو BIOS، أو ملفات ISO، أو ملفات CHD، أو قواعد Redump، أو أي بيانات مستخدمين.</li>
            <li>الأداة مخصصة حصراً لمعالجة الملفات التي يملكها المستخدم أو لديه حق قانوني لاستخدامها، ويُمنع استخدامها لتوزيع محتوى لا تملك حق استخدامه.</li>
            <li>Hakamiq CHD Tool ليس تابعًا أو مدعومًا من MAMEdev. يتم استخدام <code>chdman</code> وفق تراخيصه الأصلية المرفقة في المشروع.</li>
            <li><b>تنبيه:</b> يُنصح دائمًا بالاحتفاظ بنسخة احتياطية من الملفات المهمة قبل تنفيذ أي عمليات تحويل أو استخراج أو حذف يدوي.</li>
        </ul>
    </section>

    <section class="section-card">
        <h3>متطلبات التشغيل الأساسية</h3>
        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th>المتطلب</th>
                        <th>المواصفات التقنية</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>نظام التشغيل</td>
                        <td>Windows (بمعمارية x64)</td>
                    </tr>
                    <tr>
                        <td>إطار العمل</td>
                        <td>.NET 8 Desktop Runtime (لنسخة Framework-Dependent فقط)</td>
                    </tr>
                    <tr>
                        <td>مساحة التخزين</td>
                        <td>مساحة كافية تتناسب مع أحجام ملفات CHD والملفات المستخرجة</td>
                    </tr>
                    <tr>
                        <td>المكونات المرفقة</td>
                        <td>تتضمن الحزمة أدوات <code>chdman</code> و <code>7-Zip</code> بشكل مدمج</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>

    <footer class="orbital-footer">
        <h3>الخلاصة</h3>
        <p>
            Hakamiq CHD Tool v1.0.0 هو أول إصدار عام من الأداة، صُمم لجعل التعامل مع ملفات CHD أكثر سهولة وتنظيماً من خلال واجهة Windows واضحة. هذه هي البداية، وسيتم تطوير المشروع وتحسينه تدريجياً بناءً على التجربة والملاحظات. نتطلع لتجربتكم!
        </p>
    </footer>

</div>

</body>
</html>

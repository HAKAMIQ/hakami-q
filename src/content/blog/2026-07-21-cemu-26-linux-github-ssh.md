---
title: 'اختراق نسخ Cemu 2.6 على Linux وسرقة مفاتيح GitHub وSSH'
description: 'رسالة التحذير المنشورة من أحد مطوري محاكي Cemu بعد اكتشاف الملفات المتأثرة. نشر أحد مطوري محاكي Cemu تحذيرًا أمنيًا بشأن تعرض بعض ملفات إصدار Cemu 2.6 المخصصة لنظام Linux للاختراق…'
pubDate: '2026-07-21T20:15:24.326+03:00'
heroImage: '../../assets/blog-placeholder-1.jpg'
heroImageUrl: '/media/blogger/3e/3e492b04994f927e287cf6314cd8e8e4ec4a8ed14fb45824a709ccefb1c242ae.png'
originalUrl: 'https://hakamiq1.blogspot.com/2026/07/cemu-26-linux-github-ssh.html'
labels: ["articles","Nintendo","Wii-U"]
---

<style>
    :root {
        --cemu-blue: #29b6f6;
        --cemu-gold: #ffd600;
        --cemu-green: #00e676;
        --cemu-red: #ff5252;
        --cemu-orange: #ffab40;
        --cemu-dark: #121212;
        --cemu-card: #1e1e1e;
        --text-main: #f4f4f4;
        --text-muted: #aab2c0;
    }

    .cemu-security-wrapper {
        direction: rtl;
        text-align: right;
        width: 100%;
        max-width: 950px;
        margin: 0 auto;
        padding: 20px;
        color: var(--text-main);
        background: var(--cemu-dark);
        border: 1px solid #333;
        border-radius: 16px;
        font-family: 'Tajawal', 'Cairo', Arial, sans-serif;
        line-height: 1.95;
        box-sizing: border-box;
        overflow: hidden;
    }

    .cemu-security-wrapper *,
    .cemu-security-wrapper *::before,
    .cemu-security-wrapper *::after {
        box-sizing: border-box;
    }

    .cemu-header {
        width: 100%;
        padding-bottom: 25px;
        margin-bottom: 28px;
        text-align: center;
        border-bottom: 1px dashed #444;
        clear: both;
    }

    .cemu-header h2 {
        clear: both;
        margin: 20px 0 12px;
        color: var(--cemu-red);
        line-height: 1.55;
        text-align: center;
    }

    .cemu-header > p {
        width: 100%;
        max-width: 840px;
        margin: 0 auto 15px;
        color: #dce2eb;
        text-align: right;
    }

    .section-card {
        clear: both;
        width: 100%;
        padding: 25px;
        margin-bottom: 25px;
        background: var(--cemu-card);
        border: 1px solid #2d2d2d;
        border-radius: 12px;
    }

    .section-card h3 {
        margin: 0 0 20px;
        padding-bottom: 12px;
        color: var(--cemu-gold);
        border-bottom: 1px solid #333;
        line-height: 1.6;
        text-align: right;
    }

    .section-card h4 {
        margin: 22px 0 12px;
        color: var(--cemu-blue);
        line-height: 1.6;
        text-align: right;
    }

    .section-card p {
        margin: 0 0 16px;
        text-align: right;
    }

    .article-image {
        display: block;
        clear: both;
        width: 100%;
        max-width: 900px;
        padding: 10px;
        margin: 0 auto 25px;
        overflow: hidden;
        background: #151515;
        border: 1px solid #333;
        border-radius: 13px;
        text-align: center;
    }

    .article-image::after {
        content: "";
        display: table;
        clear: both;
    }

    .image-link {
        display: block !important;
        width: 100% !important;
        margin: 0 !important;
        padding: 0 !important;
        line-height: 0 !important;
        text-align: center !important;
    }

    .img-frame {
        display: block !important;
        float: none !important;
        width: 100% !important;
        max-width: 880px !important;
        height: auto !important;
        margin: 0 auto !important;
        padding: 0 !important;
        background: #111;
        border: 1px solid #3a3a3a;
        border-radius: 12px;
        object-fit: contain;
    }

    .image-caption {
        display: block;
        clear: both;
        margin: 12px 5px 2px !important;
        color: var(--text-muted) !important;
        text-align: center !important;
        font-size: 14px;
        line-height: 1.7;
    }

    .cemu-security-wrapper .separator {
        display: block !important;
        clear: both !important;
        float: none !important;
        width: 100% !important;
        margin: 0 !important;
        padding: 0 !important;
        text-align: center !important;
    }

    .cemu-security-wrapper .separator a {
        display: block !important;
        float: none !important;
        width: 100% !important;
        margin: 0 !important;
        padding: 0 !important;
    }

    .cemu-security-wrapper img {
        float: none !important;
    }

    .danger-box,
    .warning-box,
    .success-box,
    .note-box {
        clear: both;
        width: 100%;
        padding: 16px 18px;
        margin: 18px 0;
        background: #151515;
        border-radius: 9px;
        text-align: right;
    }

    .danger-box {
        background: rgba(255, 82, 82, 0.09);
        border-right: 4px solid var(--cemu-red);
    }

    .warning-box {
        border-right: 4px solid var(--cemu-orange);
    }

    .success-box {
        border-right: 4px solid var(--cemu-green);
    }

    .note-box {
        border-right: 4px solid var(--cemu-blue);
    }

    .clean-list {
        padding: 0 20px 0 0 !important;
        margin: 15px 0 !important;
        list-style: none !important;
    }

    .clean-list li {
        position: relative;
        padding: 0 25px 0 0 !important;
        margin-bottom: 12px;
        background: none !important;
        text-align: right;
    }

    .clean-list li::before {
        content: "" !important;
        position: absolute;
        top: 12px;
        right: 0;
        display: block !important;
        width: 10px;
        height: 10px;
        background: var(--cemu-blue) !important;
        border-radius: 50%;
    }

    .clean-list li::after {
        display: none !important;
    }

    .danger-list li::before {
        background: var(--cemu-red) !important;
    }

    .safe-list li::before {
        background: var(--cemu-green) !important;
    }

    .command-box {
        direction: ltr;
        unicode-bidi: embed;
        display: block;
        clear: both;
        width: 100%;
        overflow-x: auto;
        padding: 16px;
        margin: 16px 0;
        color: var(--cemu-green);
        background: #050505;
        border: 1px solid #333;
        border-left: 4px solid var(--cemu-green);
        border-radius: 9px;
        font-family: Consolas, Monaco, monospace;
        line-height: 1.7;
        text-align: left;
        white-space: pre-wrap;
        word-break: break-word;
    }

    .file-box {
        direction: ltr;
        unicode-bidi: embed;
        display: block;
        clear: both;
        width: 100%;
        overflow-x: auto;
        padding: 14px;
        margin: 12px 0;
        color: #fff;
        background: #090909;
        border: 1px solid #3b3b3b;
        border-radius: 8px;
        font-family: Consolas, Monaco, monospace;
        text-align: left;
        word-break: break-all;
    }

    .table-container {
        width: 100%;
        overflow-x: auto;
        margin: 20px 0;
        border: 1px solid #333;
        border-radius: 8px;
        -webkit-overflow-scrolling: touch;
    }

    .cemu-security-wrapper table {
        width: 100%;
        min-width: 650px;
        background: #111;
        border-collapse: collapse;
        text-align: center;
    }

    .cemu-security-wrapper th {
        padding: 12px;
        color: var(--cemu-gold);
        background: #252525;
        border: 1px solid #333;
    }

    .cemu-security-wrapper td {
        padding: 12px;
        color: #ddd;
        border: 1px solid #333;
    }

    .cemu-security-wrapper code {
        direction: ltr;
        unicode-bidi: embed;
        display: inline-block;
        padding: 2px 7px;
        color: var(--cemu-green);
        background: #050505;
        border-radius: 4px;
        font-family: Consolas, Monaco, monospace;
    }

    .cemu-security-wrapper a {
        color: var(--cemu-blue);
        font-weight: bold;
        text-decoration: none;
    }

    .cemu-security-wrapper a:hover {
        color: var(--cemu-gold);
    }

    .ltr-value {
        direction: ltr;
        unicode-bidi: embed;
        display: inline-block;
    }

    .action-number {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        width: 31px;
        height: 31px;
        margin-left: 8px;
        color: #111;
        background: var(--cemu-gold);
        border-radius: 50%;
        font-weight: bold;
        vertical-align: middle;
    }

    .article-footer {
        clear: both;
        width: 100%;
        padding: 18px;
        background: #252525;
        border: 1px solid #333;
        border-radius: 10px;
        text-align: center;
    }

    .article-footer p {
        margin: 0;
        text-align: center;
    }

    @media (max-width: 720px) {
        .cemu-security-wrapper {
            padding: 12px;
            border-radius: 10px;
        }

        .section-card {
            padding: 18px;
        }

        .cemu-header h2 {
            font-size: 22px;
        }

        .article-image {
            padding: 6px;
            margin-bottom: 20px;
        }

        .danger-box,
        .warning-box,
        .success-box,
        .note-box {
            padding: 14px;
        }

        .action-number {
            width: 28px;
            height: 28px;
        }
    }
</style>

<div class="cemu-security-wrapper">

    <header class="cemu-header">

        <div class="article-image">

            <a class="image-link" href="/media/blogger/3e/3e492b04994f927e287cf6314cd8e8e4ec4a8ed14fb45824a709ccefb1c242ae.png" rel="noopener noreferrer" target="_blank">

                <img alt="تحذير أمني بشأن نسخ Cemu 2.6 على Linux" class="img-frame" height="543" loading="eager" src="/media/blogger/3e/3e492b04994f927e287cf6314cd8e8e4ec4a8ed14fb45824a709ccefb1c242ae.png" width="942" />

            </a>

            <p class="image-caption">
                رسالة التحذير المنشورة من أحد مطوري محاكي Cemu بعد اكتشاف الملفات المتأثرة.</p></div>

        <p>
            نشر أحد مطوري محاكي <b>Cemu</b> تحذيرًا أمنيًا بشأن تعرض بعض ملفات
            إصدار <span class="ltr-value">Cemu 2.6</span> المخصصة لنظام
            <b>Linux</b> للاختراق واستبدالها بملفات تحتوي على برمجية خبيثة.
        </p>

        <div class="danger-box">
            التحذير يخص ملفي Linux المحددين أدناه. لا تشغلهما مجددًا إذا سبق
            تحميلهما خلال الفترة المتأثرة.
        </div>

    </header>

    <section class="section-card">

        <h3>ما الملفات المتأثرة؟</h3>

        <p>
            بحسب رسالة المطور، تأثرت نسختا Linux التاليتان:
        </p>

        <div class="file-box">Cemu-2.6-x86_64.AppImage</div>

        <div class="file-box">cemu-2.6-ubuntu-22.04-x64.zip</div>

        <p>
            ذكر المطور أن الملفات المصابة ظلت متاحة للتنزيل مدة تقارب
            <span class="ltr-value">5-6 أيام</span>، ثم أُزيلت بعد اكتشاف المشكلة.
        </p>

        <div class="note-box">
            وفقًا للإعلان الأولي، من حمّل الملفات قبل
            <span class="ltr-value">6 مايو</span> ليس ضمن فترة الإصابة التي حددها المطور.
            مع ذلك، تحقق من مصدر الملف وتاريخه قبل تشغيله.
        </div>

    </section>

    <section class="section-card">

        <h3>ماذا تفعل البرمجية الخبيثة؟</h3>

        <p>
            وفقًا للتحليل الأولي الذي نشره المطور، يبدو أن الهدف الأساسي للبرمجية
            هو الانتشار وسرقة بيانات الوصول الحساسة، وليس إتلاف الجهاز مباشرة
            في جميع الحالات.
        </p>

        <ul class="clean-list danger-list">
            <li>البحث عن مفاتيح <code>SSH</code> وسرقتها.</li>
            <li>سرقة رموز الوصول إلى GitHub.</li>
            <li>سرقة كلمات المرور أو بيانات الاعتماد المتاحة.</li>
            <li>سرقة Service Tokens الخاصة بالخدمات والتطبيقات.</li>
            <li>استخدام البيانات المسروقة لمحاولة إصابة حزم أو إصدارات برمجية أخرى.</li>
            <li>الاتصال بخادم خارجي ثابت للتحكم أو نقل البيانات.</li>
        </ul>

        <div class="warning-box">
            هذه النتائج وُصفت بأنها <b>تحليل أولي</b>. وقد تتغير التفاصيل مع
            استمرار التحقيق وتحليل الملفات المصابة.
        </div>

    </section>

    <section class="section-card">

        <h3>خطر حذف الملفات في ظروف محددة</h3>

        <p>
            أشار المطور إلى وجود سلوك إضافي شديد الخطورة: إذا اكتشفت البرمجية
            إعدادات منطقة وزمن وتخطيط لوحة مفاتيح مرتبطة بإسرائيل، فقد توجد فرصة
            عشوائية لتنفيذ أمر يمسح ملفات النظام عند تشغيل النسخة المصابة.
        </p>

        <div class="command-box">subprocess.run(["rm", "-rf", "/*"])</div>

        <div class="danger-box">
            لا تحاول تشغيل الملف داخل جهازك للتحقق من هذا السلوك. احذف الملف
            وتعامل مع النظام الذي شغّله على أنه نظام مخترق.
        </div>

    </section>

    <section class="section-card">

        <h3>ماذا تفعل إذا حملت أو شغّلت النسخة المصابة؟</h3>

        <h4>
            <span class="action-number">1</span>
            افصل الجهاز عن الإنترنت
        </h4>

        <p>
            افصل شبكة Wi-Fi أو كابل الشبكة لتقليل احتمال استمرار الاتصال بالخادم
            الخارجي أو إرسال المزيد من البيانات.
        </p>

        <h4>
            <span class="action-number">2</span>
            احذف ملفات Cemu المتأثرة
        </h4>

        <p>
            احذف ملفي Linux المذكورين، ولا تفتحهما أو تنقلهما إلى جهاز آخر.
        </p>

        <h4>
            <span class="action-number">3</span>
            غيّر كلمات المرور من جهاز آمن
        </h4>

        <p>
            استخدم جهازًا آخر موثوقًا لتغيير كلمات مرور GitHub والبريد الإلكتروني
            وأي حسابات حساسة استُخدمت على الجهاز المصاب.
        </p>

        <h4>
            <span class="action-number">4</span>
            ألغِ رموز الوصول
        </h4>

        <p>
            ألغِ جميع GitHub Personal Access Tokens وService Tokens ومفاتيح
            الجلسات التي يمكن أن تكون موجودة على الجهاز.
        </p>

        <h4>
            <span class="action-number">5</span>
            استبدل مفاتيح SSH
        </h4>

        <p>
            احذف مفاتيح SSH القديمة من الخدمات المرتبطة بها، ثم أنشئ مفاتيح جديدة
            من جهاز نظيف.
        </p>

        <h4>
            <span class="action-number">6</span>
            راجع حساب GitHub
        </h4>

        <ul class="clean-list">
            <li>راجع عمليات تسجيل الدخول والأجهزة والجلسات النشطة.</li>
            <li>راجع Personal Access Tokens وOAuth Apps وGitHub Apps.</li>
            <li>راجع مفاتيح SSH وGPG المسجلة في الحساب.</li>
            <li>راجع الإصدارات والحزم وGitHub Actions التي نُفذت مؤخرًا.</li>
            <li>راجع أي Commits أو Releases لم تنشئها بنفسك.</li>
        </ul>

        <h4>
            <span class="action-number">7</span>
            أعد تثبيت النظام عند تشغيل الملف
        </h4>

        <p>
            فحص الحماية وحده لا يضمن إزالة كل آليات الاستمرارية أو الملفات
            المزروعة. الخيار الأكثر أمانًا بعد تشغيل ملف مؤكد الإصابة هو نسخ
            الملفات الشخصية الضرورية فقط ثم إعادة تثبيت النظام من مصدر موثوق.
        </p>

    </section>

    <section class="section-card">

        <h3>عنوان الاتصال الخارجي المذكور</h3>

        <p>
            نصح المطور بحظر عنوان IP التالي احترازيًا:
        </p>

        <div class="command-box">83.142.209.194</div>

        <div class="warning-box">
            حظر العنوان لا ينظف الجهاز ولا يلغي البيانات التي سُرقت سابقًا.
            هو إجراء احترازي إضافي فقط.
        </div>

    </section>

    <section class="section-card">

        <h3>ما النسخ غير المتأثرة؟</h3>

        <p>
            وفقًا لرسالة المطور، لم تشمل الإصابة النسخ التالية:
        </p>

        <ul class="clean-list safe-list">
            <li>نسخة Cemu المخصصة لنظام Windows.</li>
            <li>نسخة Cemu المخصصة لنظام macOS.</li>
            <li>نسخة Cemu المتوفرة عبر Flatpak على Linux.</li>
        </ul>

        <div class="note-box">
            هذه المعلومة مبنية على الإعلان الأولي للمطور. تابع القنوات الرسمية
            لمشروع Cemu لأي تحديثات أو توسع في نطاق التحقيق.
        </div>

    </section>

    <section class="section-card">

        <h3>كيف وقع الاختراق؟</h3>

        <p>
            النظرية الأولية التي ذكرها المطور هي أن جهاز أحد مطوري Cemu شغّل
            برنامجًا مصابًا داخل بيئة <code>WSL</code>، ومن خلاله حصل المهاجمون
            على GitHub Token مرتبط بالحساب.
        </p>

        <p>
            بعد الحصول على الرمز، أصبح من الممكن استخدام صلاحيات الحساب للوصول
            إلى ملفات الإصدار أو استبدالها بملفات مصابة.
        </p>

        <div class="warning-box">
            هذا التفسير ما زال نظرية أولية وفقًا لنص الإعلان، وليس تقريرًا نهائيًا
            مكتملًا عن سلسلة الاختراق.
        </div>

    </section>

    <section class="section-card">

        <h3>كيف تتجنب الإصدارات المزيفة أو المصابة؟</h3>

        <ul class="clean-list">
            <li>نزّل Cemu من مستودع المشروع الرسمي فقط.</li>
            <li>تجنب روابط إعادة الرفع ومواقع التحميل غير الرسمية.</li>
            <li>تحقق من تاريخ رفع الملف وأي إعلان أمني قبل تشغيله.</li>
            <li>قارن قيمة SHA-256 عندما يوفر المشروع بصمة رسمية.</li>
            <li>لا تستخدم حساب GitHub الرئيسي داخل جهاز تجارب غير معزول.</li>
            <li>استخدم رموز وصول محدودة الصلاحيات وقصيرة المدة.</li>
            <li>لا تحتفظ بمفاتيح SSH الحساسة داخل أنظمة اختبار غير موثوقة.</li>
        </ul>

    </section>

    <section class="section-card">

        <h3>الخلاصة</h3>

        <p>
            التحذير لا يخص جميع نسخ Cemu، بل يركز على ملفي Linux لإصدار
            <span class="ltr-value">2.6</span> خلال فترة زمنية محددة.
        </p>

        <ul class="clean-list">
            <li>لا تشغّل النسخ القديمة المشكوك فيها مرة أخرى.</li>
            <li>احذف الملفات المتأثرة فورًا.</li>
            <li>غيّر كلمات المرور وألغِ رموز الوصول من جهاز آمن.</li>
            <li>استبدل مفاتيح SSH إذا شغّلت الملف.</li>
            <li>راجع حساب GitHub والإصدارات والأنشطة الأخيرة.</li>
            <li>فكر جديًا في إعادة تثبيت النظام بعد تشغيل النسخة المصابة.</li>
        </ul>

        <div class="danger-box">
            لا تعتمد على حذف ملف Cemu وحده. إذا شغّلت النسخة المصابة، فقد تكون
            بيانات الاعتماد قد سُرقت قبل حذف الملف.
        </div>

    </section>

    <section class="section-card">

        <h3>الروابط الرسمية</h3>

        <ul class="clean-list">

            <li>
                <a href="https://github.com/cemu-project/Cemu/releases" rel="noopener noreferrer" target="_blank">
                    صفحة إصدارات Cemu الرسمية على GitHub
                </a>
            </li>

            <li>
                <a href="https://github.com/cemu-project/Cemu" rel="noopener noreferrer" target="_blank">
                    مستودع Cemu الرسمي
                </a>
            </li>

            <li>
                <a href="https://teamcpc.cyberdigest.international/" rel="noopener noreferrer" target="_blank">
                    صفحة المعلومات الأمنية المذكورة في إعلان المطور
                </a>
            </li>

        </ul>

    </section>

    <footer class="article-footer">

        <p>
            شارك التحذير مع مستخدمي Cemu على Linux، خصوصًا من حمّلوا إصدار
            <span class="ltr-value">2.6</span> خلال الفترة المتأثرة.
        </p>

    </footer>

</div>

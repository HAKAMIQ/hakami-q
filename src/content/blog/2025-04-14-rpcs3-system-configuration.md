---
title: 'الإعدادات الافتراضية في محاكي RPCS3 | إعدادات (System Configuration)'
description: 'إعدادات النظام في RPCS3 تتحكم في هوية الجهاز المحاكى ولغة الألعاب وتوقيت النظام. ضبط هذه الخيارات يضمن تشغيل الألعاب بالمنطقة واللغة الصحيحة وتجنب مشاكل الإقلاع المرتبطة ببيانات ال…'
pubDate: '2025-04-14T01:19:00.006+03:00'
updatedDate: '2026-02-25T00:11:14.703+03:00'
heroImage: '../../assets/blog-placeholder-1.jpg'
heroImageUrl: '/media/blogger/f1/f1d1b29db9475ed2c5865cfac1e00c73f8a0d95790938bed56c53b0084a1e0ff.png'
originalUrl: 'https://hakamiq1.blogspot.com/2025/04/rpcs3-system-configuration.html'
labels: ["PlayStation","PS3"]
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

    .hakamiq-guide-wrapper {
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
    .section-card h3 { margin-top: 0; border-bottom: 1px solid #333; padding-bottom: 12px; margin-bottom: 20px; }

    .table-container { overflow-x: auto; margin: 20px 0; border-radius: 8px; border: 1px solid #333; }
    table { width: 100%; border-collapse: collapse; background: #111; text-align: center; font-size: 14px; }
    th { background: #252525; color: var(--xe-blue); padding: 12px; border: 1px solid #333; }
    td { padding: 12px; border: 1px solid #333; color: #ddd; text-align: right; }

    .row-safe { border-right: 5px solid var(--xe-green); }
    .row-warn { border-right: 5px solid var(--xe-gold); }
    .row-try { border-right: 5px solid var(--xe-blue); }

    .legend-container { display: flex; flex-wrap: wrap; gap: 10px; justify-content: center; margin-top: 20px; }
    .legend-item { padding: 5px 12px; border-radius: 6px; font-size: 13px; font-weight: bold; }

    code { background: #000; color: var(--xe-green); padding: 2px 6px; border-radius: 4px; font-family: 'Consolas', monospace; }
    .img-frame { border-radius: 12px; overflow: hidden; margin: 0 auto 20px auto; display: block; max-width: 100%; height: auto; border: 1px solid #333; }
</style>

<div class="hakamiq-guide-wrapper">

    <header class="tech-header">
        <div class="separator" style="clear: both; text-align: center;">
            <a href="/media/blogger/f1/f1d1b29db9475ed2c5865cfac1e00c73f8a0d95790938bed56c53b0084a1e0ff.png">
                <img class="img-frame" src="/media/blogger/f1/f1d1b29db9475ed2c5865cfac1e00c73f8a0d95790938bed56c53b0084a1e0ff.png" width="320" />
            </a>
        </div>
        <p>إعدادات النظام في RPCS3 تتحكم في هوية الجهاز المحاكى ولغة الألعاب وتوقيت النظام. ضبط هذه الخيارات يضمن تشغيل الألعاب بالمنطقة واللغة الصحيحة وتجنب مشاكل الإقلاع المرتبطة ببيانات الجهاز.</p>
    </header>

    <section class="section-card">
        <h3 style="color: var(--xe-blue);">🧩 جدول إعدادات النظام (System Configuration)</h3>
        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th>الإعداد</th>
                        <th>الوضع الافتراضي</th>
                        <th>الشرح</th>
                        <th>نصيحة حكميك</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="row-safe">
                        <td>Console Language</td>
                        <td>English (US)</td>
                        <td>لغة النظام، تؤثر على لغة الحوارات والنصوص داخل الألعاب.</td>
                        <td>اختر لغة مدعومة من اللعبة لتجنب مشاكل الإقلاع.</td>
                    </tr>
                    <tr class="row-safe">
                        <td>Console Region</td>
                        <td>America</td>
                        <td>تحدد المنطقة الجغرافية لرخصة الجهاز المحاكى.</td>
                        <td>اتركها America إلا إذا كنت تشغل ألعاباً يابانية حصراً.</td>
                    </tr>
                    <tr class="row-try">
                        <td>Enter Button Assignment</td>
                        <td>Enter with cross</td>
                        <td>تبديل وظيفة زر التأكيد في القوائم بين X و O.</td>
                        <td>الألعاب اليابانية تستخدم عادة زر O للتأكيد.</td>
                    </tr>
                    <tr class="row-warn">
                        <td>Clear Disk Cache Automatically</td>
                        <td>Off</td>
                        <td>يقوم بحذف ملفات التخزين المؤقت للقرص بشكل تلقائي.</td>
                        <td>فعّله فقط عند نقص المساحة أو وجود مشاكل في الأداء.</td>
                    </tr>
                    <tr class="row-safe">
                        <td>Keyboard Type</td>
                        <td>English (US)</td>
                        <td>يحدد توزيع لوحة المفاتيح المستخدمة داخل المحاكي.</td>
                        <td>لا تغيره إلا إذا كنت تستخدم لوحة مفاتيح غير إنجليزية.</td>
                    </tr>
                    <tr class="row-safe">
                        <td>Console Time</td>
                        <td>Current Time</td>
                        <td>يضبط توقيت النظام الداخلي للمحاكي.</td>
                        <td>استخدم "Set to Now" لمزامنة الوقت مع جهازك الحالي.</td>
                    </tr>
                    <tr class="row-warn">
                        <td>Homebrew: Enable /host_root/</td>
                        <td>Off</td>
                        <td>يسمح بالوصول لجذر الملفات، مطلوب لبعض التطبيقات المنزلية.</td>
                        <td>فعّله فقط إذا كنت تستخدم تطبيقات Homebrew متقدمة.</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>

    <footer style="background: #252525; padding: 20px; border-radius: 12px; text-align: center;">
        <h3 style="color: var(--xe-gold); margin-top: 0;">📌 دليل الألوان</h3>
        <div class="legend-container">
            <div class="legend-item" style="background: rgba(0, 230, 118, 0.2); color: var(--xe-green);">✅ آمن / مستحسن</div>
            <div class="legend-item" style="background: rgba(255, 214, 0, 0.2); color: var(--xe-gold);">⚠️ متقدم / اختياري</div>
            <div class="legend-item" style="background: rgba(41, 182, 246, 0.2); color: var(--xe-blue);">🎮 للتجربة فقط</div>
        </div>
    </footer>

</div>

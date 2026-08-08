---
title: 'الإعدادات الافتراضية في محاكي RPCS3 | إعدادات (Debug Configuration)'
description: 'قائمة Debug في محاكي RPCS3 هي منطقة مخصصة للعمليات التقنية العميقة وتصحيح الأخطاء البرمجية. غالباً ما تكون مخفية وتحتاج لتفعيل يدوي لأنها تؤثر بشكل مباشر على سلوك المحاكاة وتوافقية…'
pubDate: '2025-04-14T01:37:00.005+03:00'
updatedDate: '2026-02-25T00:07:09.484+03:00'
heroImage: '../../assets/blog-placeholder-1.jpg'
heroImageUrl: '/media/blogger/f1/f1d1b29db9475ed2c5865cfac1e00c73f8a0d95790938bed56c53b0084a1e0ff.png'
originalUrl: 'https://hakamiq1.blogspot.com/2025/04/rpcs3-debug-configuration.html'
labels: ["PlayStation","PS3"]
---

<style>
    :root {
        --xe-gold: #ffd600;
        --xe-green: #00e676;
        --xe-blue: #29b6f6;
        --xe-red: #ff5252;
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
    .row-risky { border-right: 5px solid var(--xe-red); }
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
        <p>قائمة Debug في محاكي RPCS3 هي منطقة مخصصة للعمليات التقنية العميقة وتصحيح الأخطاء البرمجية. غالباً ما تكون مخفية وتحتاج لتفعيل يدوي لأنها تؤثر بشكل مباشر على سلوك المحاكاة وتوافقية الألعاب.</p>
    </header>

    <section class="section-card">
        <h3 style="color: var(--xe-blue);">🧩 جدول إعدادات Debug الشامل</h3>
        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th>الإعداد</th>
                        <th>الوضع الافتراضي</th>
                        <th>الشرح والوظيفة</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="row-risky"><td>RenderDoc compatibility</td><td>Off</td><td>تفعيل أدوات التقاط RenderDoc للمطورين.</td></tr>
                    <tr class="row-risky"><td>Debug output</td><td>Off</td><td>تفعيل مخرجات التصحيح الداخلية (يقلل الأداء).</td></tr>
                    <tr class="row-risky"><td>Debug overlay</td><td>Off</td><td>عرض معلومات تصحيحية حية على الشاشة.</td></tr>
                    <tr class="row-risky"><td>Log shader programs</td><td>Off</td><td>حفظ ملفات الشيدر لأغراض برمجية.</td></tr>
                    <tr class="row-risky"><td>Use high precision Z-buffer</td><td>Off</td><td>للتصحيح الدقيق بين أنواع العتاد المختلفة.</td></tr>
                    <tr class="row-warn"><td>Disable ZCull occlusion</td><td>Off</td><td>تعطيل اختبارات التخفي لزيادة الأداء (قد يسبب مشاكل).</td></tr>
                    <tr class="row-risky"><td>Force CPU blit emulation</td><td>Off</td><td>نقل المعالجة للمعالج بدلاً من الكرت (يبطئ جداً).</td></tr>
                    <tr class="row-risky"><td>Disable Vulkan allocator</td><td>Off</td><td>تعطيل مدير الذاكرة الخاص بمكتبة Vulkan.</td></tr>
                    <tr class="row-risky"><td>Disable FIFO reordering</td><td>Off</td><td>تعطيل تحسينات RSX FIFO.</td></tr>
                    <tr class="row-risky"><td>Strict texture flushing</td><td>Off</td><td>إجبار إعادة تحميل القوام باستمرار.</td></tr>
                    <tr class="row-risky"><td>Force GPU texture scaling</td><td>Off</td><td>إجبار تحويل القوام على كرت الشاشة.</td></tr>
                    <tr class="row-risky"><td>PPU debug</td><td>Off</td><td>توليد سجلات خاصة بوحدة المعالجة PPU.</td></tr>
                    <tr class="row-risky"><td>SPU debug</td><td>Off</td><td>توليد سجلات خاصة بوحدة المعالجة SPU.</td></tr>
                    <tr class="row-risky"><td>MFC debug</td><td>Off</td><td>توليد سجلات الـ Memory Flow Controller.</td></tr>
                    <tr class="row-risky"><td>Set DAZ and FTZ</td><td>Off</td><td>ضبط أعلام التصحيح لتعليمات SSE.</td></tr>
                    <tr class="row-risky"><td>Accurate PPU Saturation</td><td>Off</td><td>تحديد قيم التشبع في PPU بدقة عالية.</td></tr>
                    <tr class="row-risky"><td>Accurate PPU Non-Java</td><td>Off</td><td>احترام قيم وضع non-java الأصلي.</td></tr>
                    <tr class="row-risky"><td>Accurate PPU vector NaN</td><td>Off</td><td>معالجة نتائج NaN بدقة في التعليمات الشعاعية.</td></tr>
                    <tr class="row-risky"><td>Accurate PPU Float Condition</td><td>Off</td><td>ضبط بتات FPCC بدقة متناهية.</td></tr>
                    <tr class="row-risky"><td>Accurate cache line stories</td><td>Off</td><td>معالجة تعليمات DCBZ بدقة في الكاش.</td></tr>
                    <tr class="row-risky"><td>Hook static functions</td><td>Off</td><td>استبدال الدوال الثابتة (تجريبي).</td></tr>
                    <tr class="row-risky"><td>Enable performance report</td><td>Off</td><td>عرض تقرير الأداء التفصيلي بعد الإغلاق.</td></tr>
                    <tr class="row-risky"><td>Accurate PPU 128 res.</td><td>Disabled</td><td>ضبط العمليات الذرية بناءً على الطول.</td></tr>
                    <tr class="row-warn"><td>PPU thread count</td><td>2</td><td>عدد خيوط الـ PPU (الوضع الآمن هو 2).</td></tr>
                    <tr class="row-warn"><td>LOD bias offset</td><td>0.00</td><td>تغيير دقة عينات القوام (المدى الآمن -3 إلى +3).</td></tr>
                </tbody>
            </table>
        </div>
    </section>

    <footer style="background: #252525; padding: 20px; border-radius: 12px;">
        <h3 style="color: var(--xe-gold); margin-top: 0; text-align: center;">📌 دليل الألوان</h3>
        <div class="legend-container">
            <div class="legend-item" style="background: rgba(0, 230, 118, 0.2); color: var(--xe-green);">✅ آمن / افتراضي</div>
            <div class="legend-item" style="background: rgba(255, 214, 0, 0.2); color: var(--xe-gold);">⚠️ متقدم / اختياري</div>
            <div class="legend-item" style="background: rgba(255, 82, 82, 0.2); color: var(--xe-red);">❌ غير موصى به</div>
            <div class="legend-item" style="background: rgba(41, 182, 246, 0.2); color: var(--xe-blue);">🎮 للتجربة فقط</div>
        </div>
        <p style="margin-top: 20px; font-size: 14px; text-align: center;">📝 <b>نصيحة حكميك:</b> لا تغير أي خيار في هذه القائمة إلا إذا كنت تتبع حلاً لمشكلة تقنية محددة موثقة في Wiki المحاكي.</p>
    </footer>

</div>

---
title: 'تشغيل ألعاب Nintendo 3DS على نظارات Meta Quest بتقنية الواقع الافتراضي'
description: '🕶️ CitraVR (Beta) - تشغيل ألعاب 3DS على Quest CitraVR هو مشروع مفتوح المصدر (GPL) يهدف لتشغيل ألعاب Nintendo 3DS الشخصية والمحتوى المنزلي (Homebrew) بتقنية ثلاثية الأبعاد 3D الحقي…'
pubDate: '2025-10-12T15:25:00.005+03:00'
updatedDate: '2026-02-24T03:52:21.321+03:00'
heroImage: '../../assets/blog-placeholder-1.jpg'
heroImageUrl: '/media/blogger/6b/6be9cb7488c984ce0c32a4c196103deb698fce051f0d7791e159b70788e831a3.png'
originalUrl: 'https://hakamiq1.blogspot.com/2025/10/nintendo-3ds-meta-quest.html'
labels: ["articles"]
---

<style>
    /* الحاوية الرئيسية للمقال لضبط الاتجاه والخطوط */
    .hakamiq-post-container {
        direction: rtl;
        text-align: right;
        font-family: 'Segoe UI', Tajawal, sans-serif;
        line-height: 1.9;
        color: #222222;
        font-size: 18px;
    }

    /* تنسيق العنوان الرئيسي H2 */
    .hakamiq-main-title {
        color: #b71c1c; /* اللون الأحمر الغامق */
        font-size: 28px;
        font-weight: 700;
        padding-bottom: 10px;
        border-bottom: 3px solid #b71c1c; /* خط أحمر تحت العنوان */
        margin-top: 10px;
        margin-bottom: 25px;
    }

    /* تنسيق العناوين الفرعية H3 */
    .hakamiq-sub-title {
        color: #b71c1c;
        font-size: 22px;
        font-weight: 600;
        margin-top: 30px;
        margin-bottom: 15px;
        display: flex;
        align-items: center;
    }

    /* تنسيق الصناديق المقتبسة (المربعات الرمادية ذات الحد الأحمر) */
    .hakamiq-box {
        background: #fcfcfc; /* خلفية رمادية فاتحة جداً */
        border-radius: 8px; /* حواف دائرية */
        border-right: 5px solid #b71c1c; /* حد أحمر سميك على اليمين */
        margin: 20px 0;
        padding: 20px;
        box-shadow: 0 2px 5px rgba(0,0,0,0.05); /* ظل خفيف للصندوق */
    }

    /* تنسيق خاص لصندوق الخلاصة النهائية لتمييزه */
    .hakamiq-summary-box {
        background: #fffafa; /* خلفية مائلة للحمرة قليلاً */
        border-right: 6px solid #b71c1c;
    }

    /* تنسيق الروابط داخل الصناديق */
    .hakamiq-box a {
        color: #b71c1c;
        text-decoration: none;
        font-weight: bold;
        transition: all 0.3s ease;
    }

    /* تأثير عند مرور الماوس على الروابط */
    .hakamiq-box a:hover {
        text-decoration: underline;
        opacity: 0.8;
    }

    /* تنسيق الفاصل بين الروابط السريعة */
    .link-separator {
        margin: 0 8px;
        color: #ccc;
    }

    /* تنسيق القوائم النقطية داخل الصناديق */
    .hakamiq-box ul {
        margin-right: 25px; /* مسافة بادئة لليمين */
        padding-left: 0;
    }
    .hakamiq-box li {
        margin-bottom: 10px; /* مسافة بين النقاط */
    }
    
    /* تنسيق الصورة الرئيسية */
    .main-post-image {
        display: block;
        margin: 0 auto 20px auto;
        max-width: 100%;
        height: auto;
        border-radius: 10px;
        box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    }
</style>

<div class="hakamiq-post-container">

    <div class="separator" style="clear: both; text-align: center">
        <a href="/media/blogger/6b/6be9cb7488c984ce0c32a4c196103deb698fce051f0d7791e159b70788e831a3.png" style="margin-left: 1em; margin-right: 1em">
            <img class="main-post-image" alt="شعار محاكي CitraVR لتشغيل ألعاب نينتندو 3DS على نظارات كويست" title="CitraVR Banner" src="/media/blogger/6b/6be9cb7488c984ce0c32a4c196103deb698fce051f0d7791e159b70788e831a3.png" width="640" height="159" />
        </a>
    </div>

    <h2 class="hakamiq-main-title">
        🕶️ CitraVR (Beta) - تشغيل ألعاب 3DS على Quest
    </h2>

    <blockquote class="hakamiq-box">
        <p><strong>CitraVR</strong> هو مشروع مفتوح المصدر (GPL) يهدف لتشغيل ألعاب <strong>Nintendo 3DS</strong> الشخصية والمحتوى المنزلي (Homebrew) بتقنية ثلاثية الأبعاد <strong>3D</strong> الحقيقية على نظارات الواقع الافتراضي <strong>Meta Quest</strong>.</p>
        <p>يتميز التطبيق بأنه يعمل مباشرة عبر <strong>OpenXR</strong> بدون الحاجة لأي محرك ألعاب خارجي (مثل Unity)، مع إتاحة الكود المصدري للجميع.</p>
    </blockquote>

    <h3 class="hakamiq-sub-title">🔗 روابط سريعة ومهمة</h3>
    <blockquote class="hakamiq-box" style="text-align: center">
        <p>
            <a href="https://github.com/CitraVR/CitraVR#compatibility" target="_blank" rel="noopener">Compatibility</a>
            <span class="link-separator">|</span>
            <a href="https://github.com/CitraVR/CitraVR/releases" target="_blank" rel="noopener">Releases (التحميل)</a>
            <span class="link-separator">|</span>
            <a href="https://github.com/CitraVR/CitraVR/issues" target="_blank" rel="noopener">Known Issues</a>
            <span class="link-separator">|</span>
            <a href="https://github.com/CitraVR/CitraVR#how-to-install-and-run" target="_blank" rel="noopener">How to Install</a>
            <br> <a href="https://github.com/CitraVR/CitraVR#building" target="_blank" rel="noopener">Building</a>
            <span class="link-separator">|</span>
            <a href="https://discord.gg/flat2vr" target="_blank" rel="noopener">Discord Community</a>
            <span class="link-separator">|</span>
            <a href="https://github.com/CitraVR/CitraVR#support" target="_blank" rel="noopener">Support</a>
            <span class="link-separator">|</span>
            <a href="https://github.com/CitraVR/CitraVR/blob/main/LICENSE.txt" target="_blank" rel="noopener">License</a>
        </p>
    </blockquote>

    <h3 class="hakamiq-sub-title">📘 قصة المشروع</h3>
    <blockquote class="hakamiq-box">
        <p>تم إنشاء <strong>CitraVR</strong> في البداية كتجربة تقنية (Proof of Concept) لإثبات إمكانية دمج العرض ثنائي وثلاثي الأبعاد في الواقع الافتراضي، وتصميم واجهة مستخدم تفاعلية باستخدام طبقات VR عالية الدقة للحصول على نصوص وصور فائقة الوضوح.</p>
        <p>تم اختيار محاكي <strong>Citra 3DS Emulator</strong> الشهير كنموذج لتطبيق هذه الأفكار. ورغم أن المشروع ما زال في مراحله الأولى (Beta)، إلا أنه يتطور بسرعة.</p>
    </blockquote>

    <h3 class="hakamiq-sub-title">⚙️ أبرز المميزات</h3>
    <blockquote class="hakamiq-box">
        <ul>
            <li>✅ عرض ثلاثي الأبعاد حقيقي (Stereoscopic Rendering) كما في الجهاز الأصلي.</li>
            <li>✅ دعم ممتاز لوحدات تحكم Quest اللمسية (Touch Controllers).</li>
            <li>✅ شاشة افتراضية ضخمة قابلة للتحريك، التكبير، والتصغير بحرية.</li>
            <li>✅ إمكانية اللعب في وضع الواقع المختلط (Mixed Reality) لرؤية غرفتك أثناء اللعب.</li>
            <li>✅ أداء خفيف جداً على النظام (Low Overhead) بفضل عدم استخدام محركات وسيطة.</li>
            <li>✅ مفتوح المصدر بالكامل تحت رخصة GPL.</li>
        </ul>
    </blockquote>

    <h3 class="hakamiq-sub-title">🎧 نظارات Meta المدعومة</h3>
    <blockquote class="hakamiq-box">
        <ul>
            <li>Meta Quest 2</li>
            <li>Meta Quest Pro</li>
            <li>Meta Quest 3</li>
            <li>Meta Quest 3S</li>
        </ul>
    </blockquote>

    <h3 class="hakamiq-sub-title">🎮 توافق الألعاب والتحكم</h3>
    <blockquote class="hakamiq-box">
        <p><strong>الألعاب:</strong> ليست كل الألعاب تعمل بمثالية بعد. للاطلاع على القائمة المحدثة، قم بزيارة <a href="https://github.com/CitraVR/CitraVR/wiki/Game-Compatibility-List" target="_blank" rel="noopener">صفحة توافق ألعاب CitraVR الرسمية</a>.</p>
        <hr style="border-color: #eee; margin: 15px 0">
        <p><strong>التحكم:</strong> يدعم المحاكي وحدات التحكم اللمسية (Touch)، وأيضاً أيادي التحكم العادية (Bluetooth/USB). يمكنك الاطلاع على <a href="https://github.com/CitraVR/CitraVR/wiki/Touch-Controller-Input-Bindings" target="_blank" rel="noopener">مخطط توزيع الأزرار هنا</a>.</p>
    </blockquote>

    <h3 class="hakamiq-sub-title">📦 التحميل والمشاكل المعروفة</h3>
    <blockquote class="hakamiq-box">
        <ul>
            <li>📥 <strong>التحميل:</strong> احصل على آخر ملف APK من <a href="https://github.com/CitraVR/CitraVR/releases" target="_blank" rel="noopener">صفحة الإصدارات الرسمية (Releases)</a>.</li>
            <li>💾 <strong>التثبيت:</strong> راجع دليل <a href="https://github.com/CitraVR/CitraVR#how-to-install-and-run-citravr-on-quest" target="_blank" rel="noopener">كيفية التثبيت والتشغيل على Quest</a> (يحتاج Sideload).</li>
            <li>⚠️ <strong>المشاكل:</strong> قبل الإبلاغ عن خطأ، راجع قائمة <a href="https://github.com/CitraVR/CitraVR/issues" target="_blank" rel="noopener">المشاكل المفتوحة (Known Issues)</a> على GitHub.</li>
        </ul>
    </blockquote>

    <h3 class="hakamiq-sub-title" style="color: #b71c1c">💡 خلاصة HAKAMIQ</h3>
    <blockquote class="hakamiq-box hakamiq-summary-box">
        <p><strong>CitraVR</strong> ليس مجرد محاكي، بل هو نظرة مستقبلية لما يمكن أن تكون عليه المحاكاة في الواقع الافتراضي. تجربة ألعاب <strong>Nintendo 3DS</strong> الكلاسيكية بشاشتها ثلاثية الأبعاد داخل نظارة Quest هي تجربة ساحرة وتستحق التجربة لكل محب لألعاب الريترو 🔥.</p>
        <p style="margin-top: 10px; font-size: 16px">تابعوا مدونة وقناة حكميك للمزيد من الشروحات الحصرية!</p>
    </blockquote>

</div>

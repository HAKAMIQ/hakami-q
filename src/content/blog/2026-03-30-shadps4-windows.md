---
title: 'الألعاب القابلة للتشغيل بالكامل على محاكي shadPS4 لنظام Windows'
description: 'مرحباً بكم في هذا التقرير التقني الشامل .. إذا كنت من عشاق محاكيات الألعاب، فمن المؤكد أنك سمعت عن التطور المذهل الذي يشهده محاكي shadPS4 . في هذا الموضوع ، نستعرض معكم التحديثات ا…'
pubDate: '2026-03-30T14:35:00.004+03:00'
updatedDate: '2026-03-30T15:07:40.274+03:00'
heroImage: '../../assets/blog-placeholder-1.jpg'
heroImageUrl: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhlnj1zWlSdzMoQIdLHmlAmrHrmqQdzvUdaYBXZ_Uet7yQc5rAy9cJvUJ36w5KMkabxIdd1qTlXsbY9_JUmcbFvqn3hgF1s-sEX3ffmEGG-V0d-PWRGidXqf5C-pfDu6qViXFbYajnxIqg-a1MfSaOG1Vm0x-YUDuCQQ8DYOuELLQiQw31lax_dp3D83ks/s1280/1.jpg'
originalUrl: 'https://hakamiq1.blogspot.com/2026/03/shadps4-windows.html'
labels: ["PlayStation","PS4"]
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

    .orbital-full-wrapper {
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
        border: 1px solid #2a2a2a;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
    }

    .tech-header { text-align: center; margin-bottom: 35px; border-bottom: 1px dashed #444; padding-bottom: 25px; }
    
    /* تنظيف وتنسيق صورة بلوجر */
    .blog-image-container { text-align: center; margin-bottom: 25px; }
    .blog-image-container img {
        max-width: 100%;
        height: auto;
        border-radius: 12px;
        border: 2px solid #333;
        box-shadow: 0 8px 20px rgba(0,0,0,0.6);
        transition: transform 0.3s ease;
    }
    .blog-image-container img:hover { transform: scale(1.02); border-color: var(--xe-blue); }

    .section-card { 
        background: var(--xe-card); 
        border-radius: 12px; 
        padding: 25px; 
        margin-bottom: 25px; 
        border: 1px solid #2a2a2a; 
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    }
    .section-card h3 { margin-top: 0; border-bottom: 1px solid #333; padding-bottom: 12px; margin-bottom: 20px; font-weight: 700; }

    /* تصميم الجدول الاحترافي مع شريط التمرير */
    .table-container { 
        overflow-x: auto; 
        overflow-y: auto; 
        max-height: 500px; /* تحديد ارتفاع الجدول */
        margin: 20px 0; 
        border-radius: 8px; 
        border: 1px solid #333; 
        background: #111;
    }
    
    /* تخصيص شريط التمرير للجدول */
    .table-container::-webkit-scrollbar { width: 8px; height: 8px; }
    .table-container::-webkit-scrollbar-track { background: #1a1a1a; border-radius: 8px; }
    .table-container::-webkit-scrollbar-thumb { background: #444; border-radius: 8px; }
    .table-container::-webkit-scrollbar-thumb:hover { background: var(--xe-blue); }

    table { width: 100%; border-collapse: collapse; text-align: center; font-size: 14.5px; }
    
    /* ترويسة الجدول الثابتة */
    th { 
        background: #252525; 
        color: var(--xe-gold); 
        padding: 15px 12px; 
        border: 1px solid #333; 
        white-space: nowrap; 
        position: sticky; 
        top: 0; 
        z-index: 10;
        box-shadow: 0 2px 5px rgba(0,0,0,0.5);
    }
    
    td { padding: 12px; border: 1px solid #333; color: #ddd; transition: background 0.2s; }
    
    /* تأثيرات صفوف الجدول */
    tbody tr:nth-child(even) { background-color: #161616; }
    tbody tr:hover td { background-color: #2a2a2a; color: #fff; cursor: default; }
    
    .status-playable { color: var(--xe-green); font-weight: bold; text-shadow: 0 0 5px rgba(0, 230, 118, 0.3); }

    code { background: #000; color: var(--xe-green); padding: 3px 8px; border-radius: 6px; font-family: 'Consolas', monospace; font-size: 0.9em; border: 1px solid #222; }

    /* نظام القوائم المعزول */
    .clean-list { padding-right: 0 !important; list-style: none !important; margin: 15px 0; }
    .clean-list li { position: relative; padding-right: 25px !important; margin-bottom: 12px; background: none !important; }
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
        box-shadow: 0 0 8px var(--xe-blue);
    }

    a { color: var(--xe-blue); text-decoration: none; font-weight: bold; transition: color 0.3s; }
    a:hover { color: var(--xe-gold); }
    
    footer { border: 1px solid #333; }
</style>

<div class="orbital-full-wrapper">

    <header class="tech-header">
        <div class="blog-image-container">
            <a href="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhlnj1zWlSdzMoQIdLHmlAmrHrmqQdzvUdaYBXZ_Uet7yQc5rAy9cJvUJ36w5KMkabxIdd1qTlXsbY9_JUmcbFvqn3hgF1s-sEX3ffmEGG-V0d-PWRGidXqf5C-pfDu6qViXFbYajnxIqg-a1MfSaOG1Vm0x-YUDuCQQ8DYOuELLQiQw31lax_dp3D83ks/s1280/1.jpg" target="_blank">
                <img alt="محاكي shadPS4 للألعاب" src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhlnj1zWlSdzMoQIdLHmlAmrHrmqQdzvUdaYBXZ_Uet7yQc5rAy9cJvUJ36w5KMkabxIdd1qTlXsbY9_JUmcbFvqn3hgF1s-sEX3ffmEGG-V0d-PWRGidXqf5C-pfDu6qViXFbYajnxIqg-a1MfSaOG1Vm0x-YUDuCQQ8DYOuELLQiQw31lax_dp3D83ks/s1280/1.jpg" />
            </a>
        </div>
        <p style="font-size: 1.05em;">مرحباً بكم في هذا التقرير التقني الشامل .. إذا كنت من عشاق محاكيات الألعاب، فمن المؤكد أنك سمعت عن التطور المذهل الذي يشهده محاكي <code data-darkreader-inline-color="" style="--darkreader-inline-color: var(--darkreader-text--xe-gold, var(--darkreader-text-000000, #d8d7d5)); color: var(--xe-gold);">shadPS4</code>. في هذا الموضوع ، نستعرض معكم التحديثات الأخيرة حتى عام 2026، مع قائمة كاملة تضم 109 لعبة قابلة للعب بشكل كامل (Playable) على أنظمة ويندوز.</p>
    </header>

    <section class="section-card">
        <h3 data-darkreader-inline-color="" style="--darkreader-inline-color: var(--darkreader-text--xe-gold, var(--darkreader-text-000000, #d8d7d5)); color: var(--xe-gold);">إحصائيات التوافقية الحالية</h3>
        <p>يقدم المحاكي أداءً متفاوتًا بناءً على نظام التشغيل، وإليكم نبذة عن الإحصائيات (بناءً على الألعاب المختبرة):</p>
        <ul class="clean-list">
            <li><b>نظام Windows:</b> تم اختبار 724 لعبة، منها 109 لعبة قابلة للعب بالكامل (15.06%)، و184 لعبة تصل لمرحلة اللعب داخل اللعبة.</li>
            <li><b>نظام Linux:</b> تم اختبار 756 لعبة، منها 126 لعبة قابلة للعب (16.67%).</li>
            <li><b>نظام macOS:</b> تم اختبار 271 لعبة، منها 11 لعبة فقط قابلة للعب (4.06%).</li>
        </ul>
    </section>

    <section class="section-card">
        <h3 data-darkreader-inline-color="" style="--darkreader-inline-color: var(--darkreader-text--xe-gold, var(--darkreader-text-000000, #d8d7d5)); color: var(--xe-gold);">متطلبات التشغيل الأساسية</h3>
        <div class="table-container" style="max-height: max-content; overflow: hidden;"> <table>
                <thead>
                    <tr><th>المتطلب</th><th>المواصفات التقنية الموصى بها</th></tr>
                </thead>
                <tbody>
                    <tr><td>نظام التشغيل</td><td>Windows 10 / 11 (64-bit) أو Linux</td></tr>
                    <tr><td>المعالج (CPU)</td><td>معالج يدعم تعليمات AVX2 (مثل Intel Core i5 جيل ثامن أو AMD Ryzen 5 فما فوق)</td></tr>
                    <tr><td>الذاكرة (RAM)</td><td>8 جيجابايت كحد أدنى (يُفضل 16 جيجابايت)</td></tr>
                    <tr><td>الكرت (GPU)</td><td>بطاقة تدعم Vulkan 1.3 (مثل NVIDIA GTX 1060 أو AMD RX 580 فما أحدث)</td></tr>
                </tbody>
            </table>
        </div>
    </section>

    <section class="section-card">
        <h3 data-darkreader-inline-color="" style="--darkreader-inline-color: var(--darkreader-text--xe-gold, var(--darkreader-text-000000, #d8d7d5)); color: var(--xe-gold);">القائمة الكاملة للألعاب القابلة للعب (Windows) - 109 لعبة</h3>
        <p>إليك الجدول الكامل لجميع الألعاب التي تم تصنيفها كـ "Playable" (قابلة للعب بشكل كامل) على نظام ويندوز. <b>(يمكنك التمرير داخل الجدول للأسفل لرؤية كافة الألعاب):</b></p>
        
        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th>كود اللعبة</th>
                        <th>اسم اللعبة (Title)</th>
                        <th>الحالة</th>
                        <th>إصدار المحاكي</th>
                        <th>آخر تحديث</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td>CUSA07023</td><td>Sonic Mania</td><td class="status-playable">Playable</td><td>0.15.0</td><td>29/03/2026</td></tr>
                    <tr><td>CUSA06509</td><td>Puyo Puyo™ Tetris®</td><td class="status-playable">Playable</td><td>0.15.0</td><td>29/03/2026</td></tr>
                    <tr><td>CUSA33783</td><td>Potion Permit</td><td class="status-playable">Playable</td><td>0.15.0</td><td>29/03/2026</td></tr>
                    <tr><td>CUSA02122</td><td>LEGO® MARVEL's Avengers</td><td class="status-playable">Playable</td><td>0.15.0</td><td>28/03/2026</td></tr>
                    <tr><td>CUSA10487</td><td>Dragon's Crown Pro</td><td class="status-playable">Playable</td><td>0.15.0</td><td>28/03/2026</td></tr>
                    <tr><td>CUSA23948</td><td>KINGDOM HEARTS Melody of Memory DEMO Version</td><td class="status-playable">Playable</td><td>0.15.0</td><td>26/03/2026</td></tr>
                    <tr><td>CUSA25661</td><td>Shadow Man Remastered</td><td class="status-playable">Playable</td><td>0.15.0</td><td>26/03/2026</td></tr>
                    <tr><td>CUSA01341</td><td>DRAGON BALL XENOVERSE</td><td class="status-playable">Playable</td><td>0.15.0</td><td>26/03/2026</td></tr>
                    <tr><td>CUSA08643</td><td>anywhereVR</td><td class="status-playable">Playable</td><td>0.15.0</td><td>25/03/2026</td></tr>
                    <tr><td>CUSA02058</td><td>GODZILLA</td><td class="status-playable">Playable</td><td>0.15.0</td><td>25/03/2026</td></tr>
                    <tr><td>CUSA09977</td><td>Digimon Story: Cyber Sleuth - Hacker's Memory</td><td class="status-playable">Playable</td><td>0.15.0</td><td>25/03/2026</td></tr>
                    <tr><td>CUSA02966</td><td>DIGIMON STORY CYBER SLEUTH</td><td class="status-playable">Playable</td><td>0.15.0</td><td>25/03/2026</td></tr>
                    <tr><td>CUSA00242</td><td>Diablo III: Reaper of Souls – Ultimate Evil Edition</td><td class="status-playable">Playable</td><td>0.09.0</td><td>25/03/2026</td></tr>
                    <tr><td>CUSA50171</td><td>NEEDY GIRL OVERDOSE</td><td class="status-playable">Playable</td><td>0.15.0</td><td>23/03/2026</td></tr>
                    <tr><td>CUSA01290</td><td>Odin Sphere Leifthrasir</td><td class="status-playable">Playable</td><td>0.15.0</td><td>22/03/2026</td></tr>
                    <tr><td>CUSA26908</td><td>Clockwork Aquario</td><td class="status-playable">Playable</td><td>0.15.0</td><td>22/03/2026</td></tr>
                    <tr><td>CUSA00743</td><td>Peggle 2</td><td class="status-playable">Playable</td><td>0.10.0</td><td>21/03/2026</td></tr>
                    <tr><td>CUSA04802</td><td>2Dark</td><td class="status-playable">Playable</td><td>0.14.0</td><td>21/03/2026</td></tr>
                    <tr><td>CUSA02396</td><td>Frozen Free Fall: Snowball Fight</td><td class="status-playable">Playable</td><td>0.15.0</td><td>19/03/2026</td></tr>
                    <tr><td>CUSA17112</td><td>IxSHE Tell</td><td class="status-playable">Playable</td><td>0.15.0</td><td>18/03/2026</td></tr>
                    <tr><td>CUSA06093</td><td>Hatsune Miku: Project DIVA Future Tone</td><td class="status-playable">Playable</td><td>0.15.0</td><td>18/03/2026</td></tr>
                    <tr><td>CUSA00806</td><td>Lara Croft and the Temple of Osiris</td><td class="status-playable">Playable</td><td>0.15.0</td><td>18/03/2026</td></tr>
                    <tr><td>CUSA00652</td><td>Thief Demo</td><td class="status-playable">Playable</td><td>0.15.0</td><td>18/03/2026</td></tr>
                    <tr><td>CUSA11772</td><td>Fallout Shelter</td><td class="status-playable">Playable</td><td>0.15.0</td><td>18/03/2026</td></tr>
                    <tr><td>CUSA05209</td><td>Clicker Heroes</td><td class="status-playable">Playable</td><td>0.15.0</td><td>17/03/2026</td></tr>
                    <tr><td>CUSA06548</td><td>Cities: Skylines</td><td class="status-playable">Playable</td><td>0.15.0</td><td>17/03/2026</td></tr>
                    <tr><td>CUSA03287</td><td>Armello</td><td class="status-playable">Playable</td><td>0.15.0</td><td>17/03/2026</td></tr>
                    <tr><td>CUSA08142</td><td>Bloons TD 5</td><td class="status-playable">Playable</td><td>0.15.0</td><td>17/03/2026</td></tr>
                    <tr><td>CUSA06921</td><td>BLACKHOLE: Complete Edition</td><td class="status-playable">Playable</td><td>0.15.0</td><td>17/03/2026</td></tr>
                    <tr><td>CUSA03234</td><td>AdVenture Capitalist</td><td class="status-playable">Playable</td><td>0.15.0</td><td>17/03/2026</td></tr>
                    <tr><td>CUSA05932</td><td>A KING'S TALE: FINAL FANTASY XV</td><td class="status-playable">Playable</td><td>0.15.0</td><td>17/03/2026</td></tr>
                    <tr><td>CUSA01176</td><td>LEGO® DIMENSIONS™</td><td class="status-playable">Playable</td><td>0.15.0</td><td>17/03/2026</td></tr>
                    <tr><td>CUSA00038</td><td>RESOGUN™</td><td class="status-playable">Playable</td><td>0.15.0</td><td>17/03/2026</td></tr>
                    <tr><td>CUSA29248</td><td>Teenage Mutant Ninja Turtles: The Cowabunga Collection</td><td class="status-playable">Playable</td><td>0.14.0</td><td>17/03/2026</td></tr>
                    <tr><td>CUSA24361</td><td>Katamari Damacy Reroll</td><td class="status-playable">Playable</td><td>0.14.0</td><td>17/03/2026</td></tr>
                    <tr><td>CUSA01317</td><td>MONOPOLY FAMILY FUN PACK</td><td class="status-playable">Playable</td><td>0.14.0</td><td>17/03/2026</td></tr>
                    <tr><td>CUSA06997</td><td>YAKUZA KIWAMI</td><td class="status-playable">Playable</td><td>0.14.0</td><td>17/03/2026</td></tr>
                    <tr><td>CUSA28770</td><td>JoJo's Bizarre Adventure: All-Star Battle R</td><td class="status-playable">Playable</td><td>0.14.0</td><td>17/03/2026</td></tr>
                    <tr><td>CUSA10155</td><td>The Witch and the Hundred Knight 2</td><td class="status-playable">Playable</td><td>0.14.0</td><td>17/03/2026</td></tr>
                    <tr><td>CUSA30448</td><td>Sonic Origins</td><td class="status-playable">Playable</td><td>0.14.0</td><td>17/03/2026</td></tr>
                    <tr><td>CUSA00113</td><td>Need for Speed™ Rivals</td><td class="status-playable">Playable</td><td>0.14.0</td><td>17/03/2026</td></tr>
                    <tr><td>CUSA02180</td><td>Skylanders™ SuperChargers</td><td class="status-playable">Playable</td><td>0.14.0</td><td>17/03/2026</td></tr>
                    <tr><td>CUSA41246</td><td>Colossal Cave</td><td class="status-playable">Playable</td><td>0.14.0</td><td>12/03/2026</td></tr>
                    <tr><td>CUSA04647</td><td>WORLD OF FINAL FANTASY</td><td class="status-playable">Playable</td><td>0.14.0</td><td>12/03/2026</td></tr>
                    <tr><td>CUSA06809</td><td>The Disney Afternoon Collection</td><td class="status-playable">Playable</td><td>0.14.0</td><td>10/03/2026</td></tr>
                    <tr><td>CUSA05637</td><td>SONIC FORCES</td><td class="status-playable">Playable</td><td>0.14.0</td><td>28/02/2026</td></tr>
                    <tr><td>CUSA01627</td><td>DEAD OR ALIVE 5 Last Round</td><td class="status-playable">Playable</td><td>0.14.0</td><td>22/02/2026</td></tr>
                    <tr><td>CUSA05235</td><td>DRAGON QUEST BUILDERS</td><td class="status-playable">Playable</td><td>0.14.0</td><td>22/02/2026</td></tr>
                    <tr><td>CUSA00628</td><td>Shadow Warrior</td><td class="status-playable">Playable</td><td>0.14.0</td><td>22/02/2026</td></tr>
                    <tr><td>CUSA03817</td><td>Tales from the Borderlands</td><td class="status-playable">Playable</td><td>0.14.0</td><td>22/02/2026</td></tr>
                    <tr><td>CUSA09856</td><td>Tempest 4000</td><td class="status-playable">Playable</td><td>0.14.0</td><td>22/02/2026</td></tr>
                    <tr><td>CUSA05751</td><td>Yooka-Laylee</td><td class="status-playable">Playable</td><td>0.14.0</td><td>22/02/2026</td></tr>
                    <tr><td>CUSA07345</td><td>Ni no Kuni™ II: Revenant Kingdom</td><td class="status-playable">Playable</td><td>0.14.0</td><td>22/02/2026</td></tr>
                    <tr><td>CUSA20229</td><td>New Super Lucky's Tale</td><td class="status-playable">Playable</td><td>0.14.0</td><td>22/02/2026</td></tr>
                    <tr><td>CUSA27714</td><td>ユニコーンオーバーロード</td><td class="status-playable">Playable</td><td>0.14.0</td><td>16/02/2026</td></tr>
                    <tr><td>CUSA06930</td><td>World to the West</td><td class="status-playable">Playable</td><td>0.13.0</td><td>07/02/2026</td></tr>
                    <tr><td>CUSA06906</td><td>PAC-MAN™ Championship Edition 2 + Arcade Game Series™</td><td class="status-playable">Playable</td><td>0.13.0</td><td>07/02/2026</td></tr>
                    <tr><td>CUSA06995</td><td>Valkyria Revolution</td><td class="status-playable">Playable</td><td>0.11.0</td><td>05/02/2026</td></tr>
                    <tr><td>CUSA12811</td><td>Persona 4: Dancing All Night</td><td class="status-playable">Playable</td><td>0.09.0</td><td>23/01/2026</td></tr>
                    <tr><td>CUSA15884</td><td>Two Point Hospital</td><td class="status-playable">Playable</td><td>0.12.5</td><td>07/01/2026</td></tr>
                    <tr><td>CUSA01783</td><td>WE ARE DOOMED</td><td class="status-playable">Playable</td><td>0.12.5</td><td>24/12/2025</td></tr>
                    <tr><td>CUSA02670</td><td>Amplitude</td><td class="status-playable">Playable</td><td>0.12.5</td><td>24/12/2025</td></tr>
                    <tr><td>CUSA00109</td><td>Tomb Raider: Definitive Edition</td><td class="status-playable">Playable</td><td>0.12.5</td><td>24/12/2025</td></tr>
                    <tr><td>CUSA28972</td><td>JoJo's Bizarre Adventure: All-Star Battle R</td><td class="status-playable">Playable</td><td>0.12.5</td><td>24/12/2025</td></tr>
                    <tr><td>CUSA08495</td><td>DARK SOULS™: REMASTERED</td><td class="status-playable">Playable</td><td>0.12.5</td><td>24/12/2025</td></tr>
                    <tr><td>CUSA11463</td><td>Project Highrise: Architect's Edition</td><td class="status-playable">Playable</td><td>0.12.5</td><td>24/12/2025</td></tr>
                    <tr><td>CUSA23259</td><td>Iris.Fall</td><td class="status-playable">Playable</td><td>0.12.5</td><td>24/12/2025</td></tr>
                    <tr><td>CUSA43773</td><td>Tomb Raider I-III Remastered Starring Lara Croft</td><td class="status-playable">Playable</td><td>0.12.5</td><td>24/12/2025</td></tr>
                    <tr><td>CUSA44837</td><td>Tomb Raider IV-VI Remastered</td><td class="status-playable">Playable</td><td>0.12.5</td><td>24/12/2025</td></tr>
                    <tr><td>CUSA02560</td><td>SWORD ART ONLINE Re: Hollow Fragment</td><td class="status-playable">Playable</td><td>0.12.5</td><td>24/12/2025</td></tr>
                    <tr><td>CUSA12877</td><td>TerraTech</td><td class="status-playable">Playable</td><td>0.12.5</td><td>24/12/2025</td></tr>
                    <tr><td>CUSA01843</td><td>Teenage Mutant Ninja Turtles™: Mutants in Manhattan</td><td class="status-playable">Playable</td><td>0.12.5</td><td>10/12/2025</td></tr>
                    <tr><td>CUSA11258</td><td>Kerbal Space Program Enhanced Edition</td><td class="status-playable">Playable</td><td>0.10.0</td><td>02/12/2025</td></tr>
                    <tr><td>CUSA15243</td><td>Zombieland: Double Tap - Road Trip</td><td class="status-playable">Playable</td><td>0.12.5</td><td>01/12/2025</td></tr>
                    <tr><td>CUSA03300</td><td>Armello</td><td class="status-playable">Playable</td><td>0.12.5</td><td>19/11/2025</td></tr>
                    <tr><td>CUSA23079</td><td>Untitled Goose Game</td><td class="status-playable">Playable</td><td>0.12.5</td><td>11/11/2025</td></tr>
                    <tr><td>CUSA02823</td><td>Sword Art Online: Lost Song</td><td class="status-playable">Playable</td><td>0.12.5</td><td>11/11/2025</td></tr>
                    <tr><td>CUSA29745</td><td>フユキス</td><td class="status-playable">Playable</td><td>0.12.5</td><td>07/11/2025</td></tr>
                    <tr><td>CUSA17453</td><td>Zombie Driver: Immortal Edition</td><td class="status-playable">Playable</td><td>0.11.0</td><td>06/11/2025</td></tr>
                    <tr><td>CUSA14324</td><td>春音アリス*グラム</td><td class="status-playable">Playable</td><td>0.11.0</td><td>31/10/2025</td></tr>
                    <tr><td>CUSA00184</td><td>Angry Birds Star Wars</td><td class="status-playable">Playable</td><td>0.11.0</td><td>31/10/2025</td></tr>
                    <tr><td>CUSA25257</td><td>Rusty Spout Rescue Adventure</td><td class="status-playable">Playable</td><td>0.11.0</td><td>31/10/2025</td></tr>
                    <tr><td>CUSA08517</td><td>Wuppo</td><td class="status-playable">Playable</td><td>0.11.0</td><td>31/10/2025</td></tr>
                    <tr><td>CUSA27817</td><td>Marsupilami Hoobadventure</td><td class="status-playable">Playable</td><td>0.11.0</td><td>31/10/2025</td></tr>
                    <tr><td>CUSA08026</td><td>初音ミク Project DIVA Future Tone DX</td><td class="status-playable">Playable</td><td>0.11.0</td><td>31/10/2025</td></tr>
                    <tr><td>CUSA16178</td><td>Super Monkey Ball Banana Blitz HD</td><td class="status-playable">Playable</td><td>0.11.0</td><td>31/10/2025</td></tr>
                    <tr><td>CUSA15128</td><td>DYSMANTLE</td><td class="status-playable">Playable</td><td>0.11.0</td><td>31/10/2025</td></tr>
                    <tr><td>CUSA12648</td><td>FINAL FANTASY XV POCKET EDITION HD</td><td class="status-playable">Playable</td><td>0.11.0</td><td>31/10/2025</td></tr>
                    <tr><td>CUSA00090</td><td>Sound Shapes</td><td class="status-playable">Playable</td><td>0.11.0</td><td>31/10/2025</td></tr>
                    <tr><td>CUSA19620</td><td>13 Sentinels: Aegis Rim</td><td class="status-playable">Playable</td><td>0.11.0</td><td>27/09/2025</td></tr>
                    <tr><td>CUSA07337</td><td>Velocity®2X</td><td class="status-playable">Playable</td><td>0.11.0</td><td>18/09/2025</td></tr>
                    <tr><td>CUSA07027</td><td>Cars 3: Driven to Win</td><td class="status-playable">Playable</td><td>0.11.0</td><td>18/09/2025</td></tr>
                    <tr><td>CUSA00192</td><td>Worms Battlegrounds</td><td class="status-playable">Playable</td><td>0.10.0</td><td>18/09/2025</td></tr>
                    <tr><td>CUSA03263</td><td>Mount &amp; Blade: Warband</td><td class="status-playable">Playable</td><td>0.10.0</td><td>18/09/2025</td></tr>
                    <tr><td>CUSA02500</td><td>Broken Sword 5 - the Serpent's Curse</td><td class="status-playable">Playable</td><td>0.10.0</td><td>18/09/2025</td></tr>
                    <tr><td>CUSA02025</td><td>The Book of Unwritten Tales 2</td><td class="status-playable">Playable</td><td>0.10.0</td><td>18/09/2025</td></tr>
                    <tr><td>CUSA18364</td><td>Five Nights at Freddy's 2</td><td class="status-playable">Playable</td><td>0.10.0</td><td>18/09/2025</td></tr>
                    <tr><td>CUSA00069</td><td>Rayman® Legends</td><td class="status-playable">Playable</td><td>0.10.0</td><td>06/09/2025</td></tr>
                    <tr><td>CUSA04040</td><td>UNO®</td><td class="status-playable">Playable</td><td>0.10.0</td><td>01/08/2025</td></tr>
                    <tr><td>CUSA07047</td><td>CHAOS;CHILD らぶchu☆chu!!</td><td class="status-playable">Playable</td><td>0.10.0</td><td>01/08/2025</td></tr>
                    <tr><td>CUSA10105</td><td>BLAZBLUE CROSS TAG BATTLE</td><td class="status-playable">Playable</td><td>0.10.0</td><td>19/07/2025</td></tr>
                    <tr><td>CUSA00940</td><td>Project CARS</td><td class="status-playable">Playable</td><td>0.09.0</td><td>06/07/2025</td></tr>
                    <tr><td>CUSA27209</td><td>Persona 4 Arena Ultimax</td><td class="status-playable">Playable</td><td>0.09.0</td><td>06/07/2025</td></tr>
                    <tr><td>CUSA18841</td><td>Zombies Ate My Neighbors and Ghoul Patrol</td><td class="status-playable">Playable</td><td>0.09.0</td><td>06/07/2025</td></tr>
                    <tr><td>CUSA26789</td><td>Beach Buggy Racing 2: Island Adventure</td><td class="status-playable">Playable</td><td>0.09.0</td><td>06/07/2025</td></tr>
                    <tr><td>CUSA06770</td><td>Cladun Returns: This is Sengoku!</td><td class="status-playable">Playable</td><td>0.09.0</td><td>06/07/2025</td></tr>
                    <tr><td>CUSA08510</td><td>Ghost Blade HD</td><td class="status-playable">Playable</td><td>0.08.0</td><td>02/05/2025</td></tr>
                    <tr><td>CUSA13032</td><td>GUNDEMONIUMS</td><td class="status-playable">Playable</td><td>0.08.0</td><td>02/05/2025</td></tr>
                    <tr><td>CUSA11603</td><td>Shikhondo - 食魂徒</td><td class="status-playable">Playable</td><td>0.08.0</td><td>02/05/2025</td></tr>
                </tbody>
            </table>
        </div>
        <p data-darkreader-inline-color="" style="--darkreader-inline-color: var(--darkreader-text--text-muted, var(--darkreader-text-000000, #d8d7d5)); color: var(--text-muted); font-size: 0.9em; text-align: left;">* ملاحظة: يتم تحديث توافقية الألعاب باستمرار من قبل مطوري المحاكي، لذا تأكد من استخدام النسخة المذكورة أو أحدث للحصول على أفضل أداء.</p>
    </section>

    <footer data-darkreader-inline-bgcolor="" data-darkreader-inline-bgimage="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left="" data-darkreader-inline-border-right="" data-darkreader-inline-border-top="" style="--darkreader-inline-bgcolor: var(--darkreader-background-191919, #232425); --darkreader-inline-bgimage: initial; --darkreader-inline-border-bottom: var(--darkreader-border-333333, #7a746c); --darkreader-inline-border-left: var(--darkreader-border-333333, #7a746c); --darkreader-inline-border-right: var(--darkreader-border-333333, #7a746c); --darkreader-inline-border-top: var(--darkreader-border-333333, #7a746c); background: rgb(25, 25, 25); border-radius: 10px; border: 1px solid rgb(51, 51, 51); margin-top: 30px; padding: 20px; text-align: center;">
        <p data-darkreader-inline-color="" style="--darkreader-inline-color: var(--darkreader-text--xe-blue, var(--darkreader-text-000000, #d8d7d5)); color: var(--xe-blue); font-weight: bold; margin: 0px;">نتمنى أن يكون هذا الدليل المرجعي مفيداً لكم في تجربة ألعاب PS4 المفضلة لديكم على الكمبيوتر. لا تتردد في ترك تعليق بالأسفل لأي استفسار تقني..</p>
    </footer>

</div>

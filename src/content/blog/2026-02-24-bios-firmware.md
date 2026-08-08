---
title: 'الدليل الشامل لملفات تشغيل المحاكيات (BIOS & Firmware)'
description: 'المكتبة الشاملة لملفات BIOS و Firmware - نينتندو (Nintendo) هل قمت بتحميل محاكي لتستعيد ذكريات الطفولة، لكنك فوجئت بشاشة سوداء أو رسالة خطأ "Missing BIOS"؟ المحاكي هو مجرد "جسد" لل…'
pubDate: '2026-02-24T10:00:00.004+03:00'
updatedDate: '2026-03-05T01:15:36.513+03:00'
heroImage: '../../assets/blog-placeholder-1.jpg'
heroImageUrl: '/media/blogger/2b/2b0dfba1bc6d79baaaa4fc8f1f67e78ebd9b1fdd69ecd1b35fd7a05ded20ea79.jpg'
originalUrl: 'https://hakamiq1.blogspot.com/2026/02/bios-firmware.html'
labels: ["articles","Nintendo","PlayStation","RetroArch","Xbox"]
---

<style>
    @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;700;900&display=swap');

    .hakamiq-main-wrapper {
        direction: rtl;
        text-align: right;
        font-family: 'Tajawal', 'Cairo', sans-serif;
        background-color: #0f0f0f;
        color: #e0e0e0;
        border-radius: 20px;
        padding: 30px;
        margin: 20px auto;
        max-width: 1000px;
        line-height: 1.8;
        border: 1px solid #222;
        box-shadow: 0 10px 40px rgba(0,0,0,0.7);
    }

    .hakamiq-header-title {
        color: #ff0015;
        border-right: 8px solid #ff0015;
        padding-right: 15px;
        margin-bottom: 25px;
        font-size: clamp(1.6rem, 4vw, 2.4rem);
        font-weight: 900;
    }

    .hakamiq-main-img {
        width: 100%;
        border-radius: 15px;
        border: 1px solid #333;
        margin-bottom: 25px;
        aspect-ratio: 16 / 9;
    }

    .hakamiq-info-box {
        background: linear-gradient(to right, rgba(9, 132, 227, 0.05), rgba(9, 132, 227, 0.15));
        border: 1px solid #0984e3;
        border-radius: 12px;
        padding: 20px;
        margin-bottom: 30px;
        color: #fff;
    }

    .hakamiq-legend-box {
        background-color: #1a1a1a;
        border: 1px solid #0984e3;
        padding: 20px;
        border-radius: 12px;
        margin-bottom: 30px;
    }

    .hakamiq-section-title {
        font-size: 1.6rem;
        margin-top: 50px;
        margin-bottom: 20px;
        border-bottom: 2px solid #222;
        padding-bottom: 10px;
        display: flex;
        align-items: center;
        gap: 10px;
        font-weight: 700;
    }

    .hakamiq-table-container {
        width: 100%;
        margin: 20px 0;
    }

    table.hakamiq-tech-table {
        width: 100%;
        border-collapse: collapse;
        background-color: #151515;
        border-radius: 12px;
        overflow: hidden;
        border: 1px solid #333;
    }

    .hakamiq-tech-table th {
        background-color: #222;
        color: #00ffff;
        padding: 18px;
        text-align: center;
        font-size: 16px;
        border-bottom: 2px solid #333;
    }

    .hakamiq-tech-table td {
        padding: 15px;
        border-bottom: 1px solid #252525;
        vertical-align: middle;
        font-size: 15px;
        text-align: center;
        color: #ccc;
    }

    .hakamiq-tech-table tr:hover td {
        background-color: #1e1e1e;
        color: #fff;
    }

    .hakamiq-download-btn {
        background: rgba(9, 132, 227, 0.1);
        border: 1px solid #0984e3;
        color: #0984e3;
        padding: 6px 15px;
        border-radius: 6px;
        text-decoration: none;
        font-weight: bold;
        display: inline-block;
        margin: 3px;
        transition: 0.3s;
    }

    .hakamiq-download-btn:hover {
        background: #0984e3;
        color: #fff;
    }

    .hakamiq-status-ok {
        background: rgba(0, 184, 148, 0.1);
        color: #00b894;
        padding: 4px 12px;
        border-radius: 6px;
        font-weight: bold;
        border: 1px solid rgba(0, 184, 148, 0.3);
    }

    .hakamiq-alert-yellow {
        background: linear-gradient(45deg, #2d2613, #1a170a);
        border-right: 6px solid #f1c40f;
        padding: 20px;
        border-radius: 10px;
        margin: 30px 0;
        color: #fceea7;
        font-size: 0.95em;
    }

    .hakamiq-footer-steps {
        background-color: #f9f9f9;
        color: #222;
        padding: 30px;
        border-radius: 15px;
        margin-top: 50px;
        border-top: 5px solid #00b894;
    }

    .hakamiq-footer-disclaimer {
        text-align: center;
        font-size: 0.85em;
        color: #777;
        margin-top: 40px;
        padding-top: 20px;
        border-top: 1px dashed #333;
    }

    @media (max-width: 768px) {
        .hakamiq-main-wrapper { padding: 15px; }
        
        table.hakamiq-tech-table thead {
            display: none;
        }
        
        table.hakamiq-tech-table, 
        table.hakamiq-tech-table tbody, 
        table.hakamiq-tech-table tr, 
        table.hakamiq-tech-table td {
            display: block;
            width: 100%;
        }
        
        table.hakamiq-tech-table tr {
            margin-bottom: 15px;
            background-color: #161616;
            border-radius: 12px;
            border: 1px solid #333;
            padding: 10px;
        }
        
        table.hakamiq-tech-table td {
            text-align: center;
            border-bottom: 1px solid #222;
            padding: 12px 5px;
            display: flex;
            flex-direction: column;
            gap: 10px;
            align-items: center;
        }

        table.hakamiq-tech-table td:last-child {
            border-bottom: none;
        }

        table.hakamiq-tech-table td:first-child {
            font-size: 1.2rem;
            color: #00ffff;
            font-weight: 700;
        }
        
        .hakamiq-download-btn { width: 100%; }
    }
</style>

<article class="hakamiq-main-wrapper">

    <header>
        <h2 class="hakamiq-header-title">المكتبة الشاملة لملفات BIOS و Firmware - نينتندو (Nintendo)</h2>
        
        <div class="separator" style="clear: both; text-align: center;"><a href="/media/blogger/2b/2b0dfba1bc6d79baaaa4fc8f1f67e78ebd9b1fdd69ecd1b35fd7a05ded20ea79.jpg" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" data-original-height="760" data-original-width="1381" height="176" src="/media/blogger/2b/2b0dfba1bc6d79baaaa4fc8f1f67e78ebd9b1fdd69ecd1b35fd7a05ded20ea79.jpg" width="320" /></a></div><br /><div style="text-align: center;"><br /></div>

        <p>هل قمت بتحميل محاكي لتستعيد ذكريات الطفولة، لكنك فوجئت بشاشة سوداء أو رسالة خطأ "Missing BIOS"؟ المحاكي هو مجرد "جسد" للجهاز، ولكي يعمل، يحتاج إلى "الروح" وهي ملفات النظام الأصلية. بدون هذه الملفات، لن تتمكن المحاكيات من تشغيل الألعاب بدقة، أو حفظ التقدم، أو حتى الإقلاع في الأجهزة الحديثة مثل Switch و Wii U.</p>
    </header>

    <div class="hakamiq-info-box">
        <strong>🎯 في هذا المقال:</strong> وفرت لكم المكتبة الكاملة والمرجعية لملفات تشغيل كافة أجهزة <strong>Nintendo</strong>، مرتبة زمنياً من العائلة (NES) وصولاً إلى السويتش (Switch)، مع روابط مباشرة وتوضيح للملفات النادرة.
    </div>

    <div class="hakamiq-legend-box">
        <h3 data-darkreader-inline-color="" style="--darkreader-inline-color: var(--darkreader-text-0984e3, #61a2d2); color: #0984e3; margin-top: 0px;">💡 مفاهيم ودلالات الرموز</h3>
        <p><strong>ماذا نقصد بعمود "Backup"؟</strong> مصطلح تقني (Dumping) يعني سحب ملف النظام من جهازك الأصلي. يوضح هذا العمود ما إذا كانت هناك طريقة برمجية لاستخراج الملف من جهازك بشكل قانوني.</p>
        <ul style="list-style: none; padding: 0px;">
            <li style="margin-bottom: 8px;"><span class="hakamiq-status-ok">✓</span> قابل للاستخراج (Dumping)</li>
            <li><span data-darkreader-inline-color="" style="--darkreader-inline-color: var(--darkreader-text-888888, #979189); color: #888888; font-weight: bold; margin-left: 10px;"> - </span> اختياري / لا توجد طريقة مباشرة</li>
        </ul>
    </div>

    <h3 class="hakamiq-section-title" data-darkreader-inline-color="" style="--darkreader-inline-color: var(--darkreader-text-00ffff, #50e2e2); color: cyan;">🌐 Multi-system / PC Emulators</h3>
    <div class="hakamiq-table-container">
        <table class="hakamiq-tech-table">
            <thead>
                <tr>
                    <th>المحاكي (Emulator)</th>
                    <th>الملف المطلوب (اضغط للتحميل)</th>
                    <th>Backup</th>
                </tr>
            </thead>
            <tbody>
                <tr><td>RetroArch</td><td><a class="hakamiq-download-btn" href="https://github.com/Abdess/retroarch_system/releases/download/v20220308/RetroArch_v1.10.1.zip">BIOS files Pack</a></td><td><span class="hakamiq-status-ok">✓</span></td></tr>
                <tr><td>Lemuroid</td><td><a class="hakamiq-download-btn" href="https://archive.org/details/lemuroid-bios">BIOS files</a></td><td><span data-darkreader-inline-color="" style="--darkreader-inline-color: var(--darkreader-text-888888, #979189); color: #888888;">-</span></td></tr>
                <tr><td>Mednafen (standalone)</td><td><a class="hakamiq-download-btn" href="https://www.mediafire.com/file/ii9numjq0o3juek/Mednafen_BIOS.zip/file">BIOS files</a></td><td><span class="hakamiq-status-ok">✓</span></td></tr>
                <tr><td>OpenEmu</td><td><a class="hakamiq-download-btn" href="https://archive.org/details/OpenEmuBIOSPack">BIOS files</a></td><td><span class="hakamiq-status-ok">✓</span></td></tr>
                <tr><td>Mesen2</td><td><a class="hakamiq-download-btn" href="https://mega.nz/file/sbpAETaK#Zlgd0uWdRVey-BgBCJ3Hi2XgkomB2UVbeuluR1iA9Ao">ROMs Pack</a></td><td><span data-darkreader-inline-color="" style="--darkreader-inline-color: var(--darkreader-text-888888, #979189); color: #888888;">-</span></td></tr>
                <tr><td>MAME</td><td><a class="hakamiq-download-btn" href="https://archive.org/download/mame-merged/BIOS/">BIOS files (0.265)</a></td><td><span data-darkreader-inline-color="" style="--darkreader-inline-color: var(--darkreader-text-888888, #979189); color: #888888;">-</span></td></tr>
                <tr><td>MESS</td><td><a class="hakamiq-download-btn" href="https://archive.org/details/MESS-0.151.BIOS.ROMs">ROMs Pack (0.151)</a></td><td><span class="hakamiq-status-ok">✓</span></td></tr>
                <tr><td>PCem</td><td><a class="hakamiq-download-btn" href="https://www.mediafire.com/file/6vc518bg37a0ngw/PCem+v16+ROMs.zip/file">Pack v16</a> <a class="hakamiq-download-btn" href="https://www.mediafire.com/file/zn7wpqat2d6zej0/PCem+v17+ROMs.zip/file">Pack v17</a></td><td><span class="hakamiq-status-ok">✓</span></td></tr>
                <tr><td>86Box</td><td><a class="hakamiq-download-btn" href="https://github.com/86Box/roms/releases">ROMs Pack</a></td><td><span class="hakamiq-status-ok">✓</span></td></tr>
            </tbody>
        </table>
    </div>

    <h3 class="hakamiq-section-title" data-darkreader-inline-color="" style="--darkreader-inline-color: var(--darkreader-text-ff0015, #c6343f); color: #ff0015;">🍄 Nintendo Classics (NES / SNES)</h3>
    <div class="hakamiq-table-container">
        <table class="hakamiq-tech-table">
            <thead>
                <tr>
                    <th>النظام / المحاكي</th>
                    <th>الملف المطلوب (اضغط للتحميل)</th>
                    <th>Backup</th>
                </tr>
            </thead>
            <tbody>
                <tr><td>NES (FDS)</td><td><a class="hakamiq-download-btn" href="http://www.mediafire.com/download/35cpj3ghyxeq34o/FamicomDiskSystemBIOS.rar">Famicom Disk System BIOS</a></td><td><span class="hakamiq-status-ok">✓</span></td></tr>
                <tr><td>SNES (Satellaview)</td><td><a class="hakamiq-download-btn" href="https://mega.nz/#!4E0RFQhb!Lh2CzxVeYahueRk-60JfjxBnrbEUvFhGzyJnrM_pQS4">BS-X ROMs</a></td><td><span class="hakamiq-status-ok">✓</span></td></tr>
                <tr><td>SNES (Sufami Turbo)</td><td><a class="hakamiq-download-btn" href="https://mega.nz/#!sUNzQSzB!LQ9toDbnJoVDLLCm4k8OjjmOnY-aqZbfSJ0SQ5GfOzg">Sufami Turbo BIOS</a></td><td><span class="hakamiq-status-ok">✓</span></td></tr>
                <tr><td>SNES (SNES-CD)</td><td><a class="hakamiq-download-btn" href="http://bsxproj.superfamicom.org/snes/SDBR_v0.95.zip">SuperDisc BIOS</a></td><td><span class="hakamiq-status-ok">✓</span></td></tr>
                <tr><td>SNES (Super Game Boy)</td><td><a class="hakamiq-download-btn" href="https://mega.nz/#!tA01kCiI!Bp8p5BoaWzOKdF_m_V_stVcjT1TZVM-1gqaYU5uGqro">SGB boot ROM</a></td><td><span class="hakamiq-status-ok">✓</span></td></tr>
                <tr><td>SNES (Special Chips)</td><td><a class="hakamiq-download-btn" href="http://www.mediafire.com/download.php?a36869kjvj4iavs">Coprocessor firmwares (DSP1/2/3/4, CX4...)</a></td><td><span class="hakamiq-status-ok">✓</span></td></tr>
            </tbody>
        </table>
    </div>

    <h3 class="hakamiq-section-title" data-darkreader-inline-color="" style="--darkreader-inline-color: var(--darkreader-text-6c5ce7, #7268be); color: #6c5ce7;">🧊 Nintendo 64 (N64 / 64DD)</h3>
    <div class="hakamiq-table-container">
        <table class="hakamiq-tech-table">
            <thead>
                <tr>
                    <th>النظام / المحاكي</th>
                    <th>الملف المطلوب (اضغط للتحميل)</th>
                    <th>Backup</th>
                </tr>
            </thead>
            <tbody>
                <tr><td>Project64 (Graphics)</td><td><a class="hakamiq-download-btn" href="http://www.emucr.com/search/label/RSP_Plugin">LLE RSP plugin</a></td><td><span class="hakamiq-status-ok">✓</span></td></tr>
                <tr><td>64DD (JPN Retail)</td><td><a class="hakamiq-download-btn" href="http://www.mediafire.com/download/zqoa2ld2ovtzg5o/N64_BIOS.zip">64DD IPL &amp; PIF ROM</a></td><td><span class="hakamiq-status-ok">✓</span></td></tr>
                <tr><td>64DD (US Region)</td><td><a class="hakamiq-download-btn" href="https://64dd.org/dumps/64DD_IPL_US_MJR.n64">64DD IPL (US Retail)</a></td><td><span class="hakamiq-status-ok">✓</span></td></tr>
                <tr><td>64DD (Development)</td><td><a class="hakamiq-download-btn" href="https://64dd.org/dumps/64DD_IPL_DEV_H4G.n64">64DD IPL (JPN Dev)</a></td><td><span class="hakamiq-status-ok">✓</span></td></tr>
            </tbody>
        </table>
    </div>

    <h3 class="hakamiq-section-title" data-darkreader-inline-color="" style="--darkreader-inline-color: var(--darkreader-text-0984e3, #61a2d2); color: #0984e3;">💿 GameCube &amp; Wii (Dolphin)</h3>
    <div class="hakamiq-table-container">
        <table class="hakamiq-tech-table">
            <thead>
                <tr>
                    <th>النظام / الغرض</th>
                    <th>الملف المطلوب (اضغط للتحميل)</th>
                    <th>Backup</th>
                </tr>
            </thead>
            <tbody>
                <tr><td>GameCube (BIOS)</td><td><a class="hakamiq-download-btn" href="http://www.mediafire.com/download/2ajx3xr7v1ahqtf/GCN_BIOS.zip">GameCube IPL BIOS</a></td><td><span class="hakamiq-status-ok">✓</span></td></tr>
                <tr><td>Audio / GBA Link</td><td><a class="hakamiq-download-btn" href="http://www.mediafire.com/file/66hh53x9nczaun6/LLE+DSP.rar">DSP-LLE plugin</a></td><td><span class="hakamiq-status-ok">✓</span></td></tr>
                <tr><td>Wii (Wi-Fi/Network)</td><td><a class="hakamiq-download-btn" href="http://www.mediafire.com/file/rb81q0lr66o6s67/dolphin+network+files.7z">Wii WC24 SSL certs</a></td><td><span class="hakamiq-status-ok">✓</span></td></tr>
                <tr><td>Wii (Online Servers)</td><td><a class="hakamiq-download-btn" href="https://dolphin-emu.org/docs/guides/nand-usage-guide/">Device credentials (شرح الاستخراج)</a></td><td><span data-darkreader-inline-color="" style="--darkreader-inline-color: var(--darkreader-text-888888, #979189); color: #888888;">-</span></td></tr>
            </tbody>
        </table>
    </div>

    <h3 class="hakamiq-section-title" data-darkreader-inline-color="" style="--darkreader-inline-color: var(--darkreader-text-2ecc71, #66c18c); color: #2ecc71;">👾 Game Boy &amp; Game Boy Color</h3>
    <div class="hakamiq-table-container">
        <table class="hakamiq-tech-table">
            <thead>
                <tr>
                    <th>النسخة / الموديل</th>
                    <th>ملف البوت (Boot ROM)</th>
                    <th>Backup</th>
                </tr>
            </thead>
            <tbody>
                <tr><td>Game Boy (Early DMG)</td><td><a class="hakamiq-download-btn" href="https://archive.org/details/dmg0_rom">DMG early boot ROM</a></td><td><span class="hakamiq-status-ok">✓</span></td></tr>
                <tr><td>Game Boy (Standard)</td><td><a class="hakamiq-download-btn" href="https://archive.org/details/dmg_rom">DMG standard boot ROM</a></td><td><span class="hakamiq-status-ok">✓</span></td></tr>
                <tr><td>Game Boy Pocket (MGB)</td><td><a class="hakamiq-download-btn" href="https://archive.org/details/mgb_boot">MGB boot ROM</a></td><td><span class="hakamiq-status-ok">✓</span></td></tr>
                <tr><td>Game Boy Color (Early)</td><td><a class="hakamiq-download-btn" href="https://archive.org/details/cgb0_boot">CGB early boot ROM</a></td><td><span class="hakamiq-status-ok">✓</span></td></tr>
                <tr><td>Game Boy Color (Standard)</td><td><a class="hakamiq-download-btn" href="https://archive.org/details/cgb_boot">CGB standard boot ROM</a></td><td><span class="hakamiq-status-ok">✓</span></td></tr>
            </tbody>
        </table>
    </div>

    <h3 class="hakamiq-section-title" data-darkreader-inline-color="" style="--darkreader-inline-color: var(--darkreader-text-2ecc71, #66c18c); color: #2ecc71;">👾 Pokémon mini</h3>
    <div class="hakamiq-table-container">
        <table class="hakamiq-tech-table">
            <thead>
                <tr>
                    <th>نوع الملف</th>
                    <th>الرابط / ملاحظات</th>
                    <th>Backup</th>
                </tr>
            </thead>
            <tbody>
                <tr><td>BIOS</td><td><a class="hakamiq-download-btn" href="http://www.mediafire.com/file/iaeix6am0efnpa7/bios.min/file">تحميل BIOS file</a></td><td><span class="hakamiq-status-ok">✓</span></td></tr>
            </tbody>
        </table>
    </div>

    <h3 class="hakamiq-section-title" data-darkreader-inline-color="" style="--darkreader-inline-color: var(--darkreader-text-e67e22, #c78b56); color: #e67e22;">📱 Game Boy Advance &amp; e-Reader</h3>
    <div class="hakamiq-table-container">
        <table class="hakamiq-tech-table">
            <thead>
                <tr>
                    <th>النظام / الغرض</th>
                    <th>الملف المطلوب (اضغط للتحميل)</th>
                    <th>Backup</th>
                </tr>
            </thead>
            <tbody>
                <tr><td>Game Boy Advance (BIOS)</td><td><a class="hakamiq-download-btn" href="http://www.mediafire.com/download/uijj3i3349h8j2j/gba_bios.zip">GBA Boot ROM (BIOS)</a></td><td><span class="hakamiq-status-ok">✓</span></td></tr>
                <tr><td>e-Reader (Cards)</td><td><a class="hakamiq-download-btn" href="https://mega.nz/#!YAsSzSCI!Oqd6Nz8BzNKbQyT08RETX1f7mS2rj59LnLVf3IIyNZo">e-Reader BIOS (JPN/USA)</a></td><td><span class="hakamiq-status-ok">✓</span></td></tr>
            </tbody>
        </table>
    </div>

    <h3 class="hakamiq-section-title" data-darkreader-inline-color="" style="--darkreader-inline-color: var(--darkreader-text-e67e22, #c78b56); color: #e67e22;">📟 Nintendo DS &amp; DSi</h3>
    <div class="hakamiq-table-container">
        <table class="hakamiq-tech-table">
            <thead>
                <tr>
                    <th>النظام / الغرض</th>
                    <th>الملف المطلوب</th>
                    <th>Backup</th>
                </tr>
            </thead>
            <tbody>
                <tr><td>Nintendo DS (Global)</td><td><a class="hakamiq-download-btn" href="https://mega.nz/#!KPwUHYCZ!mCzMRg3UN8UGJ2WKxAbCMaWVLUdAX0KCYHb0egCbrUk">DS BIOS &amp; Firmware</a></td><td><span class="hakamiq-status-ok">✓</span></td></tr>
                <tr><td>Nintendo DS (iQue China)</td><td><a class="hakamiq-download-btn" href="https://archive.org/details/ique-ds-firmware">iQue BIOS &amp; Firmware</a></td><td><span class="hakamiq-status-ok">✓</span></td></tr>
                <tr><td>Nintendo DSi (System)</td><td><a class="hakamiq-download-btn" href="https://archive.org/details/DSiFirmwareFiles">DSi BIOS</a> <a class="hakamiq-download-btn" href="https://archive.org/details/DSiEmulationSetup">DSi NAND dump</a></td><td><span class="hakamiq-status-ok">✓</span></td></tr>
                <tr><td>DSi (USA Region)</td><td><a class="hakamiq-download-btn" href="https://archive.org/details/dsi-nand-firmware-pwc">DSi BIOS &amp; NAND (USA)</a></td><td><span class="hakamiq-status-ok">✓</span></td></tr>
                <tr><td>DSi (Other Regions)</td><td><a class="hakamiq-download-btn" href="https://archive.org/details/ds-firmware-european-dsi-nand-and-firmware">EUR</a> <a class="hakamiq-download-btn" href="https://archive.org/details/i-que-ds-firmware-i-que-dsi-nand-firmware-chinese">China</a></td><td><span class="hakamiq-status-ok">✓</span></td></tr>
            </tbody>
        </table>
    </div>

    <div class="hakamiq-alert-yellow">
        <strong>⚠️ تعليمات هامة لمحاكي No$GBA:</strong> يجب إعادة تسمية الملفات كالتالي:<br />
        • nand.bin ➔ <b>DSi-1.mmc</b> | • biosdsi7.bin ➔ <b>BIOSDSI7.ROM</b> | • biosdsi9.bin ➔ <b>BIOSDSI9.ROM</b>
    </div>

    <h3 class="hakamiq-section-title" data-darkreader-inline-color="" style="--darkreader-inline-color: var(--darkreader-text-ff0015, #c6343f); color: #ff0015;">👓 Nintendo 3DS (Citra)</h3>
    <div class="hakamiq-table-container">
        <table class="hakamiq-tech-table">
            <thead>
                <tr>
                    <th>نوع الملف / الغرض</th>
                    <th>الملف المطلوب للتحميل</th>
                    <th>Backup</th>
                </tr>
            </thead>
            <tbody>
                <tr><td>Decryption Keys</td><td><a class="hakamiq-download-btn" href="https://archive.org/details/5422_20240206">aes_keys.txt + seeddb.bin</a></td><td><span data-darkreader-inline-color="" style="--darkreader-inline-color: var(--darkreader-text-888888, #979189); color: #888888;">-</span></td></tr>
                <tr><td>System Data (Shared)</td><td><a class="hakamiq-download-btn" href="http://www.mediafire.com/file/xf0i4pwijnsz3wo/3DS%20Shared%20Data.zip">3DS Extra Data</a></td><td><span class="hakamiq-status-ok">✓</span></td></tr>
                <tr><td>Bootroms</td><td><a class="hakamiq-download-btn" href="https://mega.nz/#!qUkWXISL!ivytO3ZgcBtUM1FqGR_0WKZBdrXDM_2_suJng4OJYno">3DS Bootroms</a></td><td><span class="hakamiq-status-ok">✓</span></td></tr>
                <tr><td>Sound (Homebrew)</td><td><a class="hakamiq-download-btn" href="https://drive.google.com/uc?id=1LeetYqN9rik9uj25nRL97yai6KqgH15A&amp;export=download">dspfirm.cdc</a></td><td><span data-darkreader-inline-color="" style="--darkreader-inline-color: var(--darkreader-text-888888, #979189); color: #888888;">-</span></td></tr>
            </tbody>
        </table>
    </div>

    <h3 class="hakamiq-section-title" data-darkreader-inline-color="" style="--darkreader-inline-color: var(--darkreader-text-00ffff, #50e2e2); color: cyan;">📟 Wii U (Cemu / Decaf)</h3>
    <div class="hakamiq-table-container">
        <table class="hakamiq-tech-table">
            <thead>
                <tr>
                    <th>نوع الملف / الغرض</th>
                    <th>الملف المطلوب للتحميل</th>
                    <th>Backup</th>
                </tr>
            </thead>
            <tbody>
                <tr><td>Keys (المفاتيح)</td><td><a class="hakamiq-download-btn" href="https://pastebin.com/w6GxMMNX">Wii U Common Keys</a></td><td><span data-darkreader-inline-color="" style="--darkreader-inline-color: var(--darkreader-text-888888, #979189); color: #888888;">-</span></td></tr>
                <tr><td>Online Play</td><td><a class="hakamiq-download-btn" href="https://mega.nz/file/8M9WxAzZ#-AUqbBj3V68TV7uhrZc_t9nwwkvRlyaSEcAUS__2fFo">Online files (Cemu/Decaf)</a></td><td><span class="hakamiq-status-ok">✓</span></td></tr>
                <tr><td>System Menu (EU)</td><td><a class="hakamiq-download-btn" href="https://www.mediafire.com/file/5n50l8fpsoqfcnq/mlc01_WiiUMenu_5.5.5EU.zip">EU v5.5.5</a></td><td><span class="hakamiq-status-ok">✓</span></td></tr>
                <tr><td>System Menu (US)</td><td><a class="hakamiq-download-btn" href="https://www.mediafire.com/file/ajp0b1lb7jmsqjl/mlc01_WiiUMenu_5.5.5US.zip">USA v5.5.5</a></td><td><span class="hakamiq-status-ok">✓</span></td></tr>
                <tr><td>System Menu (JP)</td><td><a class="hakamiq-download-btn" href="https://www.mediafire.com/file/mym7heo3ry56d1a/mlc01_WiiUMenu_5.5.5JP.zip">JPN v5.5.5</a></td><td><span class="hakamiq-status-ok">✓</span></td></tr>
            </tbody>
        </table>
    </div>

    <h3 class="hakamiq-section-title" data-darkreader-inline-color="" style="--darkreader-inline-color: var(--darkreader-text-ff0015, #c6343f); color: #ff0015;">🎮 Nintendo Switch (Ryujinx / Yuzu / Skyline)</h3>
    <div class="hakamiq-table-container">
        <table class="hakamiq-tech-table">
            <thead>
                <tr>
                    <th>الأداة / الملف</th>
                    <th>الرابط / ملاحظات</th>
                    <th>Backup</th>
                </tr>
            </thead>
            <tbody>
                <tr><td>RyuSAK (Tool)</td><td><a class="hakamiq-download-btn" href="https://github.com/FennyFatal/RyuSAK/releases">تحميل RyuSAK</a></td><td><span data-darkreader-inline-color="" style="--darkreader-inline-color: var(--darkreader-text-888888, #979189); color: #888888;">-</span></td></tr>
                <tr><td>Production Keys</td><td><a class="hakamiq-download-btn" href="https://prodkeys.net/ryujinx-prod-keys-v3/">Prod Keys</a> <a class="hakamiq-download-btn" href="https://archive.org/download/keys-16.0.3-by-prodkeys.net/Keys%2016.0.3%20By%20Prodkeys.net.zip">Mirror</a></td><td><span class="hakamiq-status-ok">✓</span></td></tr>
                <tr><td>System Firmware</td><td><a class="hakamiq-download-btn" href="https://prodkeys.net/latest-switch-firmwares-v/">Switch Firmware</a></td><td><span class="hakamiq-status-ok">✓</span></td></tr>
            </tbody>
        </table>
    </div>

    <div class="hakamiq-footer-steps">
        <h3 data-darkreader-inline-color="" style="--darkreader-inline-color: var(--darkreader-text-111111, #ceccca); color: #111111; margin-top: 0px;">🛠️ خطوات ما بعد التحميل</h3>
        <ul style="line-height: 1.8;">
            <li><strong>فك الضغط:</strong> أغلب الملفات تأتي مضغوطة (.zip)، يجب فكها قبل الاستخدام.</li>
            <li><strong>المسار الصحيح:</strong> لكل محاكي مجلد خاص يسمى عادة <code>BIOS</code> أو <code>System</code>.</li>
            <li><strong>تحديث المفاتيح:</strong> لملاك Switch، يجب تحديث <code>prod.keys</code> بشكل دوري لتشغيل الألعاب الجديدة.</li>
        </ul>
    </div>

    <footer class="hakamiq-footer-disclaimer">
        إخلاء مسؤولية: هذا المحتوى للأغراض التعليمية والشخصية فقط. يجب عليك امتلاك الأجهزة الأصلية لاستخدام هذه الملفات بشكل قانوني.<br />
        <strong>// HAKAMIQ TECH ARCHIVES // 2026 // NINTENDO_COMPLETE_BIOS</strong>
    </footer>

</article>

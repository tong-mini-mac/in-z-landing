# คู่มือ Score Board Live

สกอร์บอร์ด overlay สำหรับกีฬาคลับ — ลูกค้าผสมกล้องกับ Overlay ในแอปไลฟ์ของตัวเอง วิดีโอไม่ผ่านเซิร์ฟเวอร์ IN Z

## หลักการ

1. เปิด Score Board จากบัญชี IN Z (SSO)
2. คัดลอก **Overlay URL** ไปใส่เป็น Browser Source / Web Widget
3. ใส่คะแนนจากมือถืออีกเครื่อง
4. ไลฟ์ออก Facebook หรือ YouTube จากแอป encoder (สตรีมคีย์) — ไม่ใช้กล้องในแอป Facebook/YouTube โดยตรง

## ขั้นตอนใช้งาน

### 1. เปิดจากบัญชี IN Z แล้วตั้งแมตช์

เลือกชนิดกีฬา ชื่อผู้เล่น/ทีม (2–4) กติกาคลับ และโหมด **Day / Night** ของสกอร์บาร์ แล้วบันทึกแมตช์

ชนิดกีฬา: สนุ๊กเกอร์ · ฟุตบอล · วอลเลย์ · แบดมินตัน · เทนนิส · กีฬาทั่วไป · ทีมต่อทีม · หมากรุก · TCG · ไพ่

### 2. คัดลอก Overlay URL

คัดลอกจากหน้าหลัก ใส่เฉพาะในโปรแกรมไลฟ์ **อย่าโพสต์สาธารณะ** — URL นี้เท่ากับรหัสผ่านของสกอร์บอร์ด

### 3. เปิดแผงใส่คะแนนบนมือถือ

ใช้อีกเครื่องเปิดแผงสกอร์ กดคะแนน ชื่อ สปอนเซอร์ และแต้มต่อ Overlay อัปเดตทันที

### 4. ใส่ Overlay ในแอป encoder

**คอม (แนะนำ)**

| แอป | วิธีใส่ Overlay |
| --- | --- |
| OBS Studio | Sources → Browser → วาง Overlay URL · ขนาดเท่าฉาก (1920×1080 หรือ 1080×1920) · พื้นโปร่งใส |
| Streamlabs Desktop | Browser Source แบบเดียวกัน |
| PRISM Live Studio | Webpage / Browser source |

**มือถือ**

| แอป | วิธีใส่ Overlay |
| --- | --- |
| Larix Broadcaster | Web Widget (ต้อง **HTTPS**) |
| PRISM Live Studio | Webpage source |
| Streamlabs Mobile | Add URL / web overlay (ต้อง **HTTPS**) |

### 5. ไลฟ์ออกเพจหรือช่องด้วยสตรีมคีย์

1. เปิดแอป encoder ใส่กล้องเป็นชั้นหลัก วาง Overlay ทับด้านบน
2. ตั้งปลายทางเป็น **Facebook Live Producer** หรือ **YouTube Studio → Streaming software**
3. กดเริ่มสตรีมในแอป encoder
4. **ห้าม**ไลฟ์จากกล้องในแอป Facebook/YouTube โดยตรง — ใส่ Overlay ไม่ได้

### 6. อัปเดตสกอร์ระหว่างไลฟ์

กดคะแนนบนมือถือระหว่างแข่ง Overlay ใน Browser Source เปลี่ยนตาม จบไลฟ์ที่แอป encoder

## เคล็ดลับ

- **Day** = บาร์อ่อนตัวเข้ม (ห้องสว่าง) · **Night** = บาร์เข้มตัวสว่าง (ห้องมืด)
- ช่องสปอนเซอร์ว่างจะโปร่งใสบน Overlay ไม่บังภาพ
- มือถือต้องใช้ HTTPS เพื่อโหลด Overlay ใน Web Widget

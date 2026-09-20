# คู่มือ Score Board Live

ผสมกล้องกับ Overlay ในแอปไลฟ์ของคุณ — วิดีโอไม่ผ่านเซิร์ฟเวอร์ IN Z

## ขั้นตอน

### 1. เปิดจากบัญชี IN Z แล้วตั้งแมตช์

เลือกชนิดกีฬา ชื่อผู้เล่น/ทีม (2–4) กติกา และโหมด **Day / Night** แล้วบันทึกแมตช์

### 2. คัดลอก Overlay URL

ใส่เฉพาะในโปรแกรมไลฟ์ — อย่าโพสต์สาธารณะ

### 3. เปิดแผงใส่คะแนนบนมือถือ

กดคะแนน ชื่อ สปอนเซอร์ และแต้มต่อ — Overlay อัปเดตทันที

### 4. ใส่ Overlay ในแอป encoder

**คอม**

| แอป | วิธี |
| --- | --- |
| OBS Studio | Sources → Browser → วาง Overlay URL · ขนาดเท่าฉาก · พื้นโปร่งใส |
| Streamlabs Desktop | Browser Source แบบเดียวกัน |
| PRISM Live Studio | Webpage / Browser source |

**มือถือ** (ต้อง **HTTPS**)

| แอป | วิธี |
| --- | --- |
| Larix Broadcaster | Web Widget |
| PRISM Live Studio | Webpage source |
| Streamlabs Mobile | Add URL / web overlay |

### 5. ไลฟ์ด้วยสตรีมคีย์

1. ใส่กล้องเป็นชั้นหลัก วาง Overlay ทับด้านบน
2. ตั้งปลายทาง **Facebook Live Producer** หรือ **YouTube Studio → Streaming software**
3. กดเริ่มสตรีมในแอป encoder
4. ห้ามไลฟ์จากกล้องในแอป Facebook/YouTube โดยตรง

### 6. อัปเดตสกอร์ระหว่างไลฟ์

กดคะแนนบนมือถือ · จบไลฟ์ที่แอป encoder

## เคล็ดลับ

- Day = บาร์อ่อนตัวเข้ม · Night = บาร์เข้มตัวสว่าง
- ช่องสปอนเซอร์ว่างโปร่งใสบน Overlay

# คู่มือ PRISM

PRISM = Property Retrieval & Intent Subset Matching ขับเคลื่อนด้วย SRAG (Subset Retrieval Augmented Generation)

แพลตฟอร์มดูแลลูกค้าด้วย AI สำหรับการตลาดอสังหาริมทรัพย์: แบ่งกลุ่ม จับคู่โครงการ และดูแลลีดตั้งแต่ลงทะเบียนถึงปิดการขาย

## ระบบอ้างอิงที่เปิดใช้

แอดมินเว็บ: https://prism-web-production-e0c6.up.railway.app
สุขภาพ API: https://prism-api-production-b232.up.railway.app/health

## ลำดับงาน

ลงทะเบียนลูกค้า → จำแนกเจตนา + SRAG → High / Medium / Low

- High: จับคู่โครงการที่มี → คำเชิญด้วย AI → นัดชม → ติดตาม 1 สัปดาห์
- Medium: โครงการที่จะเปิด → นำเสนอ + วันเปิดตัว → นัด → เตือน
- Low: ไม่จับคู่ได้ → วิเคราะห์กลุ่ม → รายงานช่องว่างตลาด
- ทุกกลุ่ม: เช็กอินรายเดือน (2 ครั้ง/เดือน) → วิเคราะห์ → แคมเปญโฆษณา

## แกนหลัก

- เจตนา: zone_focused / transit_focused / premium / first_jobber
- ค้น SRAG: Keyword Bot → 4 Code Bots → Subset Calculator → Vector Refiner
- SubsetGuard: ผู้ใช้ค้นได้เฉพาะชุดข้อมูลที่ได้รับสิทธิ์ (โซน ราคา ประเภท ฯลฯ)
- ข้อเสนอ นัดชม ติดตาม และแท็กอ้างอิงบุคคล

แพ็กเกจ White Label: ติดต่อฝ่ายขาย IN Z สำหรับซอร์ส รีแบรนด์ และกรรมสิทธิ์
ไลเซนส์: ติดตั้งแบบไบนารี ร่วมแบรนด์ โดยยังไม่ใช่สิทธิ์รีแบรนด์เต็ม — ติดต่อฝ่ายขายเรื่องเงื่อนไข

# QA LAB — คู่มือผู้ใช้

QA LAB ของ IN Z จำลองพฤติกรรมผู้ใช้และทดสอบระบบเว็บ/API ที่ติดตั้งแล้ว รวม API/แบ็กเอนด์ของแอปมือถือ และการทดสอบ E2E บนแอป native ผ่าน Appium

## เริ่มต้นใช้งาน

1. เข้าสู่ระบบที่ [inz.lol](https://www.inz.lol/auth?mode=signin)
2. เปิด QA LAB จาก **แพ็กเกจของคุณ** ในบัญชี
3. ชี้การทดสอบไปที่ URL HTTPS สาธารณะของระบบที่รันอยู่

## สิ่งที่ทดสอบได้

- เว็บแอป API พอร์ทัล SaaS ERP
- ความพร้อมของ API / แบ็กเอนด์แอปมือถือ
- E2E native ผ่าน Appium (License/เครื่องตัวเอง หรือ BrowserStack BYOK)

## สิ่งที่ทดสอบจาก Cloud ไม่ได้

- คลังโค้ดบน Git ที่ยังไม่ได้ติดตั้ง
- IP ใน LAN / NAS ส่วนตัว (ใช้ License / White Label)
- VPN ของลูกค้าจาก Cloud SaaS

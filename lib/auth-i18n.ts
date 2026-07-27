export type AuthLang = "th" | "en";

export const AUTH_LANG_KEY = "inz_auth_lang";

export function normalizeAuthLang(value: string | null | undefined): AuthLang {
  return String(value || "").toLowerCase().startsWith("en") ? "en" : "th";
}

export function getStoredAuthLang(): AuthLang {
  if (typeof window === "undefined") return "th";
  return normalizeAuthLang(localStorage.getItem(AUTH_LANG_KEY));
}

export function setStoredAuthLang(lang: AuthLang): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(AUTH_LANG_KEY, lang);
}

type AuthCopy = {
  eyebrow: string;
  signInTitle: string;
  signUpTitle: string;
  signInLead: string;
  signUpLead: string;
  tabSignIn: string;
  tabSignUp: string;
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  showPassword: string;
  needVat: string;
  companyName: string;
  taxId: string;
  billingAddress: string;
  branch: string;
  branchHq: string;
  branchOther: string;
  acceptTerms: string;
  acceptPdpa: string;
  termsLink: string;
  pdpaLink: string;
  submitSignIn: string;
  submitSignUp: string;
  submitting: string;
  switchToSignUp: string;
  switchToSignIn: string;
  accountEyebrow: string;
  accountTitle: string;
  accountLead: string;
  signedInAs: string;
  yourProducts: string;
  openProduct: string;
  subscribeProduct: string;
  signOut: string;
  demoNote: string;
  checkEmailTitle: string;
  checkEmailBody: string;
  activating: string;
  activateSuccess: string;
  errActivate: string;
  errEmailSend: string;
  errEmail: string;
  errPhone: string;
  errPassword: string;
  errConfirm: string;
  errTerms: string;
  errPdpa: string;
  errTaxId: string;
  errGeneric: string;
};

export const AUTH_COPY: Record<AuthLang, AuthCopy> = {
  th: {
    eyebrow: "บัญชี IN Z",
    signInTitle: "Sign In",
    signUpTitle: "Sign Up",
    signInLead: "เข้าสู่บัญชี IN Z เพื่อเปิดผลิตภัณฑ์ที่คุณมีสิทธิ์ใช้งาน",
    signUpLead: "สร้างบัญชี IN Z เพื่อเริ่มใช้งานและจัดการผลิตภัณฑ์",
    tabSignIn: "Sign In",
    tabSignUp: "Sign Up",
    fullName: "ชื่อ-นามสกุล",
    email: "อีเมล",
    phone: "เบอร์โทร",
    password: "รหัสผ่าน",
    confirmPassword: "ยืนยันรหัสผ่าน",
    showPassword: "แสดง",
    needVat: "ต้องการใบกำกับภาษี (VAT)",
    companyName: "ชื่อบริษัท",
    taxId: "เลขผู้เสียภาษี (13 หลัก)",
    billingAddress: "ที่อยู่ในใบกำกับภาษี",
    branch: "สาขา",
    branchHq: "สำนักงานใหญ่",
    branchOther: "สาขาที่",
    acceptTerms: "ยอมรับ",
    acceptPdpa: "ยอมรับ",
    termsLink: "ข้อกำหนดการให้บริการ",
    pdpaLink: "นโยบายความเป็นส่วนตัว (PDPA)",
    submitSignIn: "Sign In",
    submitSignUp: "Sign Up",
    submitting: "กำลังดำเนินการ…",
    switchToSignUp: "ยังไม่มีบัญชี? Sign Up",
    switchToSignIn: "มีบัญชีแล้ว? Sign In",
    accountEyebrow: "บัญชีของคุณ",
    accountTitle: "ผลิตภัณฑ์ของคุณ",
    accountLead: "เลือกผลิตภัณฑ์เพื่อเปิดใช้งานต่อ",
    signedInAs: "เข้าสู่ระบบในชื่อ",
    yourProducts: "ผลิตภัณฑ์",
    openProduct: "เปิด",
    subscribeProduct: "สมัครใช้งาน",
    signOut: "Sign Out",
    demoNote:
      "หลัง Sign Up ระบบจะส่งอีเมล Activate จาก no-reply@inz.lol",
    checkEmailTitle: "ตรวจสอบอีเมลของคุณ",
    checkEmailBody:
      "เราได้ส่งลิงก์ Activate จาก no-reply@inz.lol ไปที่อีเมลของคุณแล้ว กรุณาคลิกลิงก์เพื่อเปิดใช้งานบัญชี",
    activating: "กำลัง Activate บัญชี…",
    activateSuccess: "Activate สำเร็จ กำลังพาไปหน้าผลิตภัณฑ์…",
    errActivate: "ลิงก์ Activate ไม่ถูกต้องหรือหมดอายุแล้ว",
    errEmailSend: "ส่งอีเมลไม่สำเร็จ กรุณาลองใหม่",
    errEmail: "กรุณากรอกอีเมลที่ถูกต้อง",
    errPhone: "กรุณากรอกเบอร์โทรที่ถูกต้อง",
    errPassword: "รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร",
    errConfirm: "รหัสผ่านไม่ตรงกัน",
    errTerms: "กรุณายอมรับข้อกำหนดการให้บริการ",
    errPdpa: "กรุณายอมรับนโยบายความเป็นส่วนตัว (PDPA)",
    errTaxId: "เลขผู้เสียภาษีต้องมี 13 หลัก",
    errGeneric: "เกิดข้อผิดพลาด กรุณาลองใหม่",
  },
  en: {
    eyebrow: "IN Z Account",
    signInTitle: "Sign In",
    signUpTitle: "Sign Up",
    signInLead: "Sign in to your IN Z account to open your products.",
    signUpLead: "Create an IN Z account to get started and manage products.",
    tabSignIn: "Sign In",
    tabSignUp: "Sign Up",
    fullName: "Full name",
    email: "Email",
    phone: "Phone",
    password: "Password",
    confirmPassword: "Confirm password",
    showPassword: "Show",
    needVat: "Need VAT invoice",
    companyName: "Company name",
    taxId: "Tax ID (13 digits)",
    billingAddress: "Billing address",
    branch: "Branch",
    branchHq: "Head office",
    branchOther: "Branch no.",
    acceptTerms: "I accept the",
    acceptPdpa: "I accept the",
    termsLink: "Terms of Service",
    pdpaLink: "Privacy Policy (PDPA)",
    submitSignIn: "Sign In",
    submitSignUp: "Sign Up",
    submitting: "Please wait…",
    switchToSignUp: "No account yet? Sign Up",
    switchToSignIn: "Already have an account? Sign In",
    accountEyebrow: "Your account",
    accountTitle: "Your products",
    accountLead: "Choose a product to continue",
    signedInAs: "Signed in as",
    yourProducts: "Products",
    openProduct: "Open",
    subscribeProduct: "Subscribe",
    signOut: "Sign Out",
    demoNote:
      "After Sign Up, we email an activation link from no-reply@inz.lol.",
    checkEmailTitle: "Check your email",
    checkEmailBody:
      "We sent an activation link from no-reply@inz.lol. Click the link to activate your account.",
    activating: "Activating your account…",
    activateSuccess: "Account activated. Taking you to your products…",
    errActivate: "This activation link is invalid or has expired.",
    errEmailSend: "Could not send the email. Please try again.",
    errEmail: "Please enter a valid email",
    errPhone: "Please enter a valid phone number",
    errPassword: "Password must be at least 8 characters",
    errConfirm: "Passwords do not match",
    errTerms: "Please accept the Terms of Service",
    errPdpa: "Please accept the Privacy Policy (PDPA)",
    errTaxId: "Tax ID must be 13 digits",
    errGeneric: "Something went wrong. Please try again.",
  },
};

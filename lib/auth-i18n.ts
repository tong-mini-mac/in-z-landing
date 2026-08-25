export type AuthLang = "th" | "en";

export const AUTH_LANG_KEY = "inz_auth_lang";
export const AUTH_LANG_CHANGE_EVENT = "inz-auth-lang-change";

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
  window.dispatchEvent(
    new CustomEvent(AUTH_LANG_CHANGE_EVENT, { detail: { lang } }),
  );
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
  country: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  showPassword: string;
  rememberCredentials: string;
  needVat: string;
  vatUnavailable: string;
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
  alreadySignedInNote: string;
  continueToAccount: string;
  demoNote: string;
  adminBadge: string;
  adminUnlimitedNote: string;
  errAdminPassword: string;
  errAdminSignup: string;
  errCredentials: string;
  forgotPassword: string;
  forgotTitle: string;
  forgotLead: string;
  forgotSubmit: string;
  forgotSentTitle: string;
  forgotSentBody: string;
  resetTitle: string;
  resetLead: string;
  resetSubmit: string;
  resetSuccess: string;
  errResetToken: string;
  backToSignIn: string;
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
    country: "ประเทศ",
    phoneNumber: "เบอร์โทร",
    password: "รหัสผ่าน",
    confirmPassword: "ยืนยันรหัสผ่าน",
    showPassword: "แสดง",
    rememberCredentials: "จำอีเมลในอุปกรณ์นี้",
    needVat: "ต้องการใบกำกับภาษี (VAT)",
    vatUnavailable: "ยังไม่พร้อมใช้งาน เนื่องจากบริษัทยังไม่ได้จด VAT",
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
    alreadySignedInNote: "คุณเข้าสู่ระบบอยู่แล้ว — กดไปหน้าผลิตภัณฑ์ หรือ Sign Out เพื่อเข้าด้วยบัญชีอื่น",
    continueToAccount: "ไปที่ผลิตภัณฑ์ของฉัน",
    demoNote: "",
    adminBadge: "Admin · Unlimited trial",
    adminUnlimitedNote: "",
    errAdminPassword: "รหัสผ่าน Admin ไม่ถูกต้อง",
    errAdminSignup: "บัญชีนี้ใช้ได้ที่ Sign In เท่านั้น",
    errCredentials: "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง",
    forgotPassword: "ลืมรหัสผ่าน?",
    forgotTitle: "ลืมรหัสผ่าน",
    forgotLead: "กรอกอีเมลที่ใช้สมัคร — เราจะส่งลิงก์รีเซ็ตรหัสผ่านให้",
    forgotSubmit: "ส่งลิงก์รีเซ็ต",
    forgotSentTitle: "ตรวจสอบอีเมลของคุณ",
    forgotSentBody:
      "หากมีบัญชีที่ใช้อีเมลนี้ เราได้ส่งลิงก์รีเซ็ตรหัสผ่านจาก no-reply@inz.lol แล้ว ลิงก์หมดอายุใน 1 ชั่วโมง หากไม่เจอใน Inbox ให้ตรวจ Junk / Spam",
    resetTitle: "ตั้งรหัสผ่านใหม่",
    resetLead: "กรอกรหัสผ่านใหม่สำหรับบัญชี IN Z ของคุณ",
    resetSubmit: "บันทึกรหัสผ่านใหม่",
    resetSuccess: "ตั้งรหัสผ่านใหม่แล้ว — กำลังพาไป Sign In…",
    errResetToken: "ลิงก์รีเซ็ตไม่ถูกต้องหรือหมดอายุแล้ว",
    backToSignIn: "กลับไป Sign In",
    checkEmailTitle: "ตรวจสอบอีเมลของคุณ",
    checkEmailBody:
      "เราได้ส่งลิงก์ Activate จาก no-reply@inz.lol ไปที่อีเมลของคุณแล้ว กรุณาคลิกลิงก์เพื่อเปิดใช้งานบัญชี หากไม่เจอใน Inbox ให้ตรวจโฟลเดอร์ Junk / Spam แล้วกด It's not junk ก่อนเปิดลิงก์",
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
    country: "Country",
    phoneNumber: "Phone number",
    password: "Password",
    confirmPassword: "Confirm password",
    showPassword: "Show",
    rememberCredentials: "Remember email on this device",
    needVat: "Need VAT invoice",
    vatUnavailable: "Unavailable for now because the company is not VAT registered yet.",
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
    alreadySignedInNote:
      "You’re already signed in — continue to your products, or Sign Out to use another account.",
    continueToAccount: "Go to your products",
    demoNote: "",
    adminBadge: "Admin · Unlimited trial",
    adminUnlimitedNote: "",
    errAdminPassword: "Incorrect admin password",
    errAdminSignup: "This account uses Sign In only",
    errCredentials: "Incorrect email or password",
    forgotPassword: "Forgot password?",
    forgotTitle: "Forgot password",
    forgotLead: "Enter the email you used to sign up — we will send a reset link.",
    forgotSubmit: "Send reset link",
    forgotSentTitle: "Check your email",
    forgotSentBody:
      "If an account exists for this email, we sent a reset link from no-reply@inz.lol. The link expires in 1 hour. If you do not see it in Inbox, check Junk / Spam.",
    resetTitle: "Set a new password",
    resetLead: "Choose a new password for your IN Z account.",
    resetSubmit: "Save new password",
    resetSuccess: "Password updated — taking you to Sign In…",
    errResetToken: "This reset link is invalid or has expired.",
    backToSignIn: "Back to Sign In",
    checkEmailTitle: "Check your email",
    checkEmailBody:
      "We sent an activation link from no-reply@inz.lol. Click the link to activate your account. If you do not see it in Inbox, check Junk / Spam and mark it as not junk before opening the link.",
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

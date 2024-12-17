export interface signupData {
  email: string;
  phone: string;
  password: string;
  full_name: string;
  device_id: string;
  device_type: string;
  role: string;
}

export interface validateEmail {
  email_or_phone: string | null;
}

export interface ValidationErrors {
  full_name?: string;
  email?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
  role?: string;
}

export interface loginData {
  email_or_phone: string;
  password?: string;  // Make password optional
  otp?: string;       // Add optional OTP field
  device_id: string;
  device_type: string;
  role: string;
  login_type: 'PASSWORD' | 'OTP';  // Add login type to distinguish between methods
}

export interface changePassData {
  old_password: string;
  new_password: string;
}

export interface forgotPasswordData {
  password: string;
  cnfPassword: string;
}

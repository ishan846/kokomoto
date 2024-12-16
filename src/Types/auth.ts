export interface signupData {
  email: string;
  phone: string;
  password: string;
  full_name: string;
  device_id: string;
  device_type: string;
  role: string;
}

export interface loginData {
  email_or_phone: string;
  password: string;
  device_id: string;
  device_type: string;
  role: string;
}

export interface changePassData {
  old_password: string;
  new_password: string;
}

export interface forgotPasswordData {
  password: string;
  cnfPassword: string;
}

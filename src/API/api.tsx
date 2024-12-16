const base_api = "http://3.109.56.149:8080"

export const LOGIN = `${base_api}/api/v1/auth/login`
export const SIGNUP = `${base_api}/api/v1/auth/signup`
export const CHECK_USER = `${base_api}/api/v1/auth/is-registered`
export const SET_PASSWORD = `${base_api}/api/v1/auth/set-password`
export const CHANGE_PASS = `${base_api}/api/v1/auth/change-password`
export const SEND_OTP = `${base_api}/api/v1/auth/send-otp`
export const VERIFY_OTP = `${base_api}/api/v1/auth/verify-otp`

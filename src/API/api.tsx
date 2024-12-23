const base_api = "http://13.232.212.95:8080"

export const LOGIN = `${base_api}/api/v1/auth/login`
export const LOGIN_WITH_OTP = `${base_api}/api/v1/auth/login-via-otp`
export const SIGNUP = `${base_api}/api/v1/auth/signup`
export const CHECK_USER = `${base_api}/api/v1/auth/is-registered`
export const SET_PASSWORD = `${base_api}/api/v1/auth/set-password`
export const CHANGE_PASS = `${base_api}/api/v1/auth/change-password`
export const SEND_OTP = `${base_api}/api/v1/auth/send-otp`
export const VERIFY_OTP = `${base_api}/api/v1/auth/verify-otp`
export const FORGET_PASSWORD = `${base_api}/api/v1/auth/forgot-password`

export const SA_LOGIN = `${base_api}/api/v1/admin-auth/login`
export const SA_LOGIN_WITH_OTP = `${base_api}/api/v1/admin-auth/login-via-otp`
export const SA_SIGNUP = `${base_api}/api/v1/admin-auth/signup`
export const SA_CHECK_USER = `${base_api}/api/v1/admin-auth/is-registered`
export const SA_SET_PASSWORD = `${base_api}/api/v1/admin-auth/set-password`
export const SA_CHANGE_PASS = `${base_api}/api/v1/admin-auth/change-password`
export const SA_SEND_OTP = `${base_api}/api/v1/admin-auth/send-otp`
export const SA_VERIFY_OTP = `${base_api}/api/v1/admin-auth/verify-otp`
export const SA_FORGET_PASSWORD = `${base_api}/api/v1/admin-auth/forgot-password`


export const ADMIN_CATEGORIES = `${base_api}/api/v1/admin/categories`
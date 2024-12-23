/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-useless-catch */
import axios from "axios";
import {
  CHANGE_PASS,
  CHECK_USER,
  LOGIN,
  SEND_OTP,
  SET_PASSWORD,
  SIGNUP,
  VERIFY_OTP,
  LOGIN_WITH_OTP,
  FORGET_PASSWORD
} from "../api";
import { changePassData, loginData, signupData } from "../../Types/auth";
import Cookies from "js-cookie";

export const login = async (data: loginData) => {
  try {
    const response = await axios.post(`${LOGIN}`, data);

    return response;
  } catch (error: any) {
    throw error;
  }
};

export const loginwithOTP = async (data: loginData) => {
  try {
    const formData = data.login_type === 'OTP' ? {
      device_id: data.device_id,
      device_type: data.device_type,
      email_or_phone: data.email_or_phone,
      otp: data.otp,
      role: data.role
    } : {
      device_id: data.device_id,
      device_type: data.device_type,
      email_or_phone: data.email_or_phone,
      password: data.password,
      role: data.role
    };
    const response = await axios.post(`${LOGIN_WITH_OTP}`, formData);

    return response;
  } catch (error: any) {
    throw error;
  }
};

export const signup = async (data: signupData) => {
  try {
    const response = await axios.post(`${SIGNUP}`, data);

    return response;
  } catch (error: any) {
    throw error;
  }
};

export const checkUser = async (email: string) => {
  try {
    const query = `?email_or_phone=${email}`;
    const response = await axios.get(`${CHECK_USER}${query}`);

    return response;
  } catch (error: any) {
    throw error;
  }
};

export const setPassword = async (pass: string) => {
  try {
    const response = await axios.post(`${SET_PASSWORD}`, { password: pass });

    return response;
  } catch (error: any) {
    throw error;
  }
};

export const changePassword = async (data: changePassData) => {
  try {
    const response = await axios.post(`${CHANGE_PASS}`, data);

    return response;
  } catch (error: any) {
    throw error;
  }
};

export const sendOTP = async (email: string, query?: string) => {
  try {
    const body: any = { email_or_phone: email };
    const response = await axios.post(query ? `${SEND_OTP}?${query}`:`${SEND_OTP}`, body);

    return response;
  } catch (error: any) {
    throw error;
  }
};

export const verifyOTP = async (email: string, OTP: string) => {
  try {
    const token = Cookies.get("token");
    const body = { email_or_phone: email, otp: OTP };
    
    const response = await axios.post(`${VERIFY_OTP}`, body, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return response;
  } catch (error: any) {
    throw error;
  }
};

export const forgetPassword = async (email: string, OTP: string, password: string) => {
  try {
  const body = { email_or_phone: email, otp: OTP, password };
  const response = await axios.put(`${FORGET_PASSWORD}`, body);
  return response;
}
catch(error: any) {
  throw error;
}
}

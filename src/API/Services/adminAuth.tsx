/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-useless-catch */
import axios from "axios";
import {
  SA_LOGIN_WITH_OTP,
  SA_SET_PASSWORD,
  SA_CHANGE_PASS,
  SA_SEND_OTP,
  SA_VERIFY_OTP,
  SA_FORGET_PASSWORD,
  SA_LOGIN,
} from "../api";
import { changePassData, loginData } from "../../Types/auth";
import Cookies from "js-cookie";

export const admin_login = async (data: loginData) => {
  try {
    const response = await axios.post(`${SA_LOGIN}`, data);

    return response;
  } catch (error: any) {
    throw error;
  }
};

export const admin_loginwithOTP = async (data: loginData) => {
  try {
    const formData =
      data.login_type === "OTP"
        ? {
            device_id: data.device_id,
            device_type: data.device_type,
            email_or_phone: data.email_or_phone,
            otp: data.otp,
            role: data.role,
          }
        : {
            device_id: data.device_id,
            device_type: data.device_type,
            email_or_phone: data.email_or_phone,
            password: data.password,
            role: data.role,
          };
    const response = await axios.post(`${SA_LOGIN_WITH_OTP}`, formData);

    return response;
  } catch (error: any) {
    throw error;
  }
};

export const admin_setPassword = async (pass: string) => {
  try {
    const response = await axios.post(`${SA_SET_PASSWORD}`, { password: pass });

    return response;
  } catch (error: any) {
    throw error;
  }
};

export const admin_changePassword = async (data: changePassData) => {
  try {
    const response = await axios.post(`${SA_CHANGE_PASS}`, data);

    return response;
  } catch (error: any) {
    throw error;
  }
};

export const admin_sendOTP = async (email: string, query?: string) => {
  try {
    const body: any = { email_or_phone: email };
    const response = await axios.post(
      query ? `${SA_SEND_OTP}?${query}` : `${SA_SEND_OTP}`,
      body
    );

    return response;
  } catch (error: any) {
    throw error;
  }
};

export const admin_verifyOTP = async (email: string, OTP: string) => {
  try {
    const token = Cookies.get("token");
    const body = { email_or_phone: email, otp: OTP };

    const response = await axios.post(`${SA_VERIFY_OTP}`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error: any) {
    throw error;
  }
};

export const admin_forgetPassword = async (
  email: string,
  OTP: string,
  password: string
) => {
  try {
    const body = { email_or_phone: email, otp: OTP, password };
    const response = await axios.put(`${SA_FORGET_PASSWORD}`, body);
    return response;
  } catch (error: any) {
    throw error;
  }
};

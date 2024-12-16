import axios from "axios";
import {
  CHANGE_PASS,
  CHECK_USER,
  LOGIN,
  SEND_OTP,
  SET_PASSWORD,
  SIGNUP,
  VERIFY_OTP,
} from "../api";
import { changePassData, loginData, signupData } from "../../Types/auth";

export const login = async (data: loginData) => {
  try {
    const response = await axios.post(`${LOGIN}`, data);

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
    let query = `?email_or_phone=${email}`;
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

export const sendOTP = async (email: string) => {
  try {
    const body: any = { email_or_phone: email };
    const response = await axios.post(`${SEND_OTP}`, body);

    return response;
  } catch (error: any) {
    throw error;
  }
};

export const verifyOTP = async (email: string, OTP: string) => {
  try {
    const body: any = { email_or_phone: email, otp: OTP };
    const response = await axios.post(`${VERIFY_OTP}`, body);

    return response;
  } catch (error: any) {
    throw error;
  }
};

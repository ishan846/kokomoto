import axios from "axios";
import { CHANGE_PASS, CHECK_USER, LOGIN, SET_PASSWORD, SIGNUP } from "../api";
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
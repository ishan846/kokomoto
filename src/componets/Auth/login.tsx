/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  FormControl,
  MenuItem,
  Select,
  Tab,
  Tabs,
} from "@mui/material";
import google from "../../assets/google.svg";
import { useLocation, useNavigate } from "react-router-dom";
import PasswordInput from "../../common/textFeilds/passwordInput";
import { useState } from "react";
import { loginData } from "../../Types/auth";
import toast from "react-hot-toast";
import { login, loginwithOTP, sendOTP } from "../../API/Services/auth";
import Cookies from "js-cookie";
import { roles } from "../../utils/helperData";
import {
  admin_login,
  admin_loginwithOTP,
  admin_sendOTP,
} from "../../API/Services/adminAuth";

const Login = () => {
  const location = useLocation();
  const isSuperAdmin: boolean = location.pathname.includes("super-admin");
  const navigate = useNavigate();
  const [loginMethod, setLoginMethod] = useState<"PASSWORD" | "OTP">(
    "PASSWORD"
  );
  const [otpSent, setOtpSent] = useState(false);
  const [formData, setFormData] = useState<loginData>({
    email_or_phone: "",
    password: "",
    otp: "",
    device_id: "Qw21g75-123esd",
    device_type: "WEB",
    login_type: "PASSWORD",
  });

  const handlePassChange = (value: string) => {
    setFormData({
      ...formData,
      password: value,
    });
  };

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      otp: e.target.value,
    });
  };

  const OTP = () => {
    isSuperAdmin ? recieveSaOTP() : recieveOTP();
  };

  const userLogin = () => {
    isSuperAdmin ? loginSaUser() : loginUser();
  };

  const recieveOTP = async () => {
    if (!formData.email_or_phone) {
      toast.error("Please enter email or phone number");
      return;
    }
    try {
      const response = await sendOTP(formData.email_or_phone);
      if (response.status === 200) toast.success("OTP sent successfully");
      setOtpSent(true);
    } catch (error: any) {
      toast.error(error.response?.data?.detail || "Failed to send OTP");
    }
  };

  const recieveSaOTP = async () => {
    if (!formData.email_or_phone) {
      toast.error("Please enter email or phone number");
      return;
    }
    try {
      const response = await admin_sendOTP(formData.email_or_phone);
      if (response.status === 200) toast.success("OTP sent successfully");
      setOtpSent(true);
    } catch (error: any) {
      toast.error(error.response?.data?.detail || "Failed to send OTP");
    }
  };

  const loginUser = async () => {
    if (!formData.role) {
      toast.error("Please select a role");
      return;
    }
    if (!formData.email_or_phone) {
      toast.error("Please enter email or phone number");
      return;
    }

    const updatedFormData = {
      ...formData,
      login_type: loginMethod,
    };

    if (loginMethod === "OTP") {
      if (!formData.otp) {
        toast.error("Please enter OTP");
        return;
      }
      try {
        const response = await loginwithOTP(updatedFormData);
        if (response.status === 200) {
          toast.success(response?.data?.message);
          const token = response.data?.data?.token;
          Cookies.set("token", token);
          navigate("/home/dashboard");
        }
      } catch (error: any) {
        console.log(error);
        toast.error(error.response.data?.detail);
      }
    } else {
      if (!formData.password) {
        toast.error("Please enter Password");
        return;
      }
      try {
        const response = await login(updatedFormData);
        if (response.status === 200) {
          toast.success(response?.data?.message);
          const token = response.data?.data?.token;
          Cookies.set("token", token);
          navigate("/home/dashboard");
        }
      } catch (error: any) {
        toast.error(error.response.data?.detail);
      }
    }
  };

  const loginSaUser = async () => {
    if (!formData.email_or_phone) {
      toast.error("Please enter email or phone number");
      return;
    }

    const updatedFormData = {
      ...formData,
      login_type: loginMethod,
    };

    if (loginMethod === "OTP") {
      if (!formData.otp) {
        toast.error("Please enter OTP");
        return;
      }
      try {
        const response = await admin_loginwithOTP(updatedFormData);
        if (response.status === 200) {
          toast.success(response?.data?.message);
          const token = response.data?.data?.token;
          Cookies.set("token", token);
          navigate("/home/dashboard");
        }
      } catch (error: any) {
        console.log(error);
        toast.error(error.response.data?.detail);
      }
    } else {
      if (!formData.password) {
        toast.error("Please enter Password");
        return;
      }
      try {
        const response = await admin_login(updatedFormData);
        if (response.status === 200) {
          toast.success(response?.data?.message);
          const token = response.data?.data?.token;
          Cookies.set("token", token);
          navigate("/home/dashboard");
        }
      } catch (error: any) {
        toast.error(error.response.data?.detail);
      }
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="flex flex-col gap-9 justify-center">
        <div className="p-8 rounded-2xl bg-white shadow-custom">
          <div className="flex flex-col gap-7 font-[Inter]">
            <div className="flex flex-col">
              <p className="font-[900] text-3xl">Welcome to Kokomatto</p>
              {isSuperAdmin ? (
                <></>
              ) : (
                <p
                  className="font-semibold text-sm text-[#2D313E] cursor-pointer"
                  onClick={() => navigate("/auth/signup")}
                >
                  <span className="text-[#A7A8BB]">New Here?</span> Create an
                  Account
                </p>
              )}
            </div>

            <Tabs
              value={loginMethod}
              onChange={(_, newValue) => {
                setLoginMethod(newValue);
                setOtpSent(false);
                setFormData((prev) => ({
                  ...prev,
                  otp: "",
                  password: "",
                  login_type: newValue,
                }));
              }}
              className="mb-4"
            >
              <Tab value="PASSWORD" label="Password" />
              <Tab value="OTP" label="OTP" />
            </Tabs>

            <div className="flex flex-col gap-5 w-full">
              {isSuperAdmin ? (
                <></>
              ) : (
                <div className="flex flex-col gap-2">
                  <p className="font-semibold text-xs text-[#181C32] w-full">
                    Role
                  </p>
                  <FormControl fullWidth>
                    <Select
                      value={formData?.role}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          role: e.target?.value,
                        })
                      }
                      className="h-14 !outline-none bg-[#EEF1F5] !rounded-[9.6px] w-full p-2 !text-base !font-semibold !border-none"
                    >
                      {roles?.map((option) => (
                        <MenuItem key={option?.id} value={option?.key}>
                          {option?.value}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              )}

              <div className="flex flex-col gap-2">
                <p className="font-semibold text-xs text-[#181C32] w-full">
                  Email or Phone
                </p>
                <input
                  type="text"
                  className="h-14 outline-none bg-[#EEF1F5] rounded-[9.6px] w-full p-2 text-base font-semibold"
                  value={formData?.email_or_phone}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      email_or_phone: e.target.value,
                    })
                  }
                />
              </div>

              {loginMethod === "PASSWORD" ? (
                <PasswordInput forgot={true} onChange={handlePassChange} />
              ) : (
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center whitespace-nowrap">
                    <p className="font-semibold text-xs text-[#181C32] w-full">
                      OTP
                    </p>
                    <Button
                      onClick={OTP}
                      className="!normal-case !text-[#2D313E] !font-semibold !font-[Poppins]"
                    >
                      {otpSent ? "Resend OTP" : "Send OTP"}
                    </Button>
                  </div>
                  <input
                    type="text"
                    className="h-14 outline-none bg-[#EEF1F5] rounded-[9.6px] w-full p-2 text-base font-semibold"
                    value={formData?.otp}
                    onChange={handleOtpChange}
                    maxLength={6}
                  />
                </div>
              )}

              <div className="flex flex-col gap-4">
                <Button
                  className="!normal-case !bg-[#2D313E] !text-white !font-semibold !font-[Poppins]"
                  onClick={userLogin}
                >
                  Sign In
                </Button>
                <Button className="!normal-case !bg-[#E1F0FF] !text-[#2D313E] !font-semibold !font-[Poppins]">
                  <div className="flex gap-2 items-center">
                    <img src={google} alt="google" />
                    <p>Sign in with Google</p>
                  </div>
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-evenly">
          <p className="font-[Poppins] font-semibold text-base text-[#607B88]">
            Terms
          </p>
          <p className="font-[Poppins] font-semibold text-base text-[#607B88]">
            Plans
          </p>
          <p className="font-[Poppins] font-semibold text-base text-[#607B88]">
            Contact Us
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

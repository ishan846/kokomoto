import { Button } from "@mui/material";
import logo from "../../../public/kokomattoLogo.svg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAppDispatch } from "../../store/store";
import { setEmail } from "../../store/emailSlice";
import { checkUser, sendOTP } from "../../API/Services/auth";
import toast from "react-hot-toast";
import { ValidationErrors } from "../../Types/auth";
import Cookies from "js-cookie";

const EnterEmail = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [emailId, setEmailId] = useState<string>("");
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case "email":
        if (!value) return "Email is required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          return "Invalid email format";
        return "";
      default:
        return "";
    }
  };

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};
    let isValid = true;

    const error = validateField("email", emailId);
    if (error) {
      newErrors["email"] = error;
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleBlur = (field: string) => {
    setTouched({ ...touched, [field]: true });
    const error = validateField(field, emailId);
    setErrors({ ...errors, [field]: error });
  };

  const handleChange = (field: string, value: string) => {
    setEmailId(value);
    if (touched[field]) {
      const error = validateField(field, value);
      setErrors({ ...errors, [field]: error });
    }
  };

  const existingUser = async () => {
    if (!validateForm()) {
      toast.dismiss();
      toast.error("Please enter a email");
      return;
    }
    try {
      const response = await checkUser(emailId);
      if (response.status === 200) {
        if (response.data?.data?.is_registered === false)
          toast.error("Email does not exist");
        else handleSendOTP();
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message);
    }
  };

  const handleSendOTP = async () => {
    try {
      const response = await sendOTP(emailId);
      if (response.status === 200) {
        toast.dismiss();
        toast.success("OTP sent, please check your email");
        const token = response.data?.data?.token;
        Cookies.set("token", token);
        dispatch(setEmail(emailId));
        navigate("/auth/forgotPassword");
      }
    } catch (error: any) {
      toast.error(error.response.data.detail ?? "Something went wrong");
    }
  };

  const renderError = (field: string) => {
    if (touched[field] && errors[field as keyof ValidationErrors]) {
      return (
        <p className="text-red-500 text-xs mt-1">
          {errors[field as keyof ValidationErrors]}
        </p>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="flex flex-col gap-9 justify-center">
        <div className="p-8 rounded-2xl bg-[#FDFDFD] border-[0.66px] border-[#DCDCDC] shadow-custom2">
          <div className="flex flex-col gap-9 font-[Inter]">
            <img src={logo} alt="logo" className="h-14 px-20" />
            <div className="flex flex-col gap-6 w-full">
              <div className="flex flex-col gap-3 font-[Inter]">
                <p className="font-[700] text-2xl text-[#262626]">
                  Enter your email
                </p>
                <p className="font-[400] text-xs text-black">
                  We will send a 6 digit OTP on this email
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <p className="font-semibold text-xs text-[#181C32] w-full">
                  Email
                </p>
                <input
                  type="email"
                  className={`h-12 md:h-14 outline-none bg-[#EEF1F5] rounded-[9.6px] w-full p-2 text-base font-semibold ${
                    touched.email && errors.email
                      ? "border-2 border-red-500"
                      : ""
                  }`}
                  value={emailId}
                  onChange={(e) => handleChange("email", e.target.value)}
                  onBlur={() => handleBlur("email")}
                />
                {renderError("email")}
              </div>
              <div className="flex flex-col gap-4">
                <Button
                  className="!normal-case !bg-[#2D313E] !text-white !font-semibold !font-[Poppins]"
                  onClick={existingUser}
                >
                  Send OTP
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

export default EnterEmail;

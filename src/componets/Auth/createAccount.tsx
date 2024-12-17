/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, FormControl, MenuItem, Select } from "@mui/material";
// import google from "../../assets/google.svg";
import { useNavigate } from "react-router-dom";
import PasswordInput from "../../common/textFeilds/passwordInput";
import { useState } from "react";
import { signupData, ValidationErrors } from "../../Types/auth";
import toast from "react-hot-toast";
import { sendOTP, verifyOTP, signup } from "../../API/Services/auth";
import Cookies from "js-cookie";
import { roles } from "../../utils/helperData";

const CreateAccount = () => {
  const navigate = useNavigate();
  const [cnfPass, setCnfPass] = useState("");
  const [emailOtp, setEmailOtp] = useState("");
  const [phoneOtp, setPhoneOtp] = useState("");
  const [emailVerified, setEmailVerified] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [emailOtpSent, setEmailOtpSent] = useState(false);
  const [phoneOtpSent, setPhoneOtpSent] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});


  const [formData, setFormData] = useState<signupData>({
    email: "",
    phone: "",
    password: "",
    full_name: "",
    device_id: "Qw21g75-123esd",
    device_type: "WEB",
    role: "",
  });

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'full_name':
        if (!value) return 'Name is required';
        if (value.length < 2) return 'Name must be at least 2 characters';
        if (!/^[a-zA-Z\s]*$/.test(value)) return 'Name can only contain letters and spaces';
        return '';

      case 'email':
        if (!value) return 'Email is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Invalid email format';
        return '';

      case 'phone':
        if (!value) return 'Phone number is required';
        if (!/^\d{10}$/.test(value)) return 'Phone number must be 10 digits';
        return '';

      case 'password':
        if (!value) return 'Password is required';
        if (value.length < 8) return 'Password must be at least 8 characters';
        if (!/(?=.*[a-z])/.test(value)) return 'Password must include lowercase letter';
        if (!/(?=.*[A-Z])/.test(value)) return 'Password must include uppercase letter';
        if (!/(?=.*\d)/.test(value)) return 'Password must include number';
        if (!/(?=.*[@$!%*?&])/.test(value)) return 'Password must include special character';
        return '';

      case 'confirmPassword':
        if (!value) return 'Confirm Password is required';
        if (value !== formData.password) return 'Passwords do not match';
        return '';

      case 'role':
        if (!value) return 'Role is required';
        return '';

      default:
        return '';
    }
  };

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};
    let isValid = true;

    // Validate all fields
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key as keyof signupData]);
      if (error) {
        newErrors[key as keyof ValidationErrors] = error;
        isValid = false;
      }
    });

    // Validate confirm password
    const confirmPasswordError = validateField('confirmPassword', cnfPass);
    if (confirmPasswordError) {
      newErrors.confirmPassword = confirmPasswordError;
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleBlur = (field: string) => {
    setTouched({ ...touched, [field]: true });
    const error = validateField(field,
      field === 'confirmPassword' ? cnfPass : formData[field as keyof signupData]
    );
    setErrors({ ...errors, [field]: error });
  };

  const handleChange = (field: keyof signupData, value: string) => {
    setFormData({ ...formData, [field]: value });
    if (touched[field]) {
      const error = validateField(field, value);
      setErrors({ ...errors, [field]: error });
    }
  };

  const handlePasswordChange = (value: string) => {
    handleChange('password', value);
  };

  const handleCnfPasswordChange = (value: string) => {
    setCnfPass(value);
    if (touched.confirmPassword) {
      const error = validateField('confirmPassword', value);
      setErrors({ ...errors, confirmPassword: error });
    }
  };

  const sendEmailOTP = async () => {
    const emailError = validateField('email', formData.email);
    if (emailError) {
      setErrors({ ...errors, email: emailError });
      toast.error(emailError);
      return;
    }

    try {
      const response = await sendOTP(formData.email);
      if (response.status === 200) {
        toast.success("OTP sent to your email");
        setEmailOtpSent(true);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.detail || "Failed to send OTP");
    }
  };

  const sendPhoneOTP = async () => {
    const phoneError = validateField('phone', formData.phone);
    if (phoneError) {
      setErrors({ ...errors, phone: phoneError });
      toast.error(phoneError);
      return;
    }

    try {
      const response = await sendOTP(formData.phone);
      if (response.status === 200) {
        toast.success("OTP sent to your phone");
        setPhoneOtpSent(true);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.detail || "Failed to send OTP");
    }
  };

  const verifyEmailOTP = async () => {
    try {
      const response = await verifyOTP(formData.email, emailOtp);
      if (response.status === 200) {
        toast.success("Email verified successfully");
        setEmailVerified(true);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.detail || "Invalid OTP");
    }
  };

  const verifyPhoneOTP = async () => {
    try {
      const response = await verifyOTP(formData.phone, phoneOtp);
      if (response.status === 200) {
        toast.success("Phone verified successfully");
        setPhoneVerified(true);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.detail || "Invalid OTP");
    }
  };

  const createAccount = async () => {
    // Mark all fields as touched
    const allTouched: Record<string, boolean> = {};
    Object.keys(formData).forEach(key => allTouched[key] = true);
    allTouched.confirmPassword = true;
    setTouched(allTouched);

    if (!validateForm()) {
      toast.dismiss()
      toast.error("Please fix all validation errors");
      return;
    }

    if (!emailVerified || !phoneVerified) {
      toast.error("Please verify both email and phone");
      return;
    }

    try {
      const response = await signup(formData);
      if (response.status === 201) {
        toast.success(response.data?.message);
        const token = response.data?.data?.token;
        Cookies.set("token", token);
        navigate("/afterSignup");
      }
    } catch (error: any) {
      toast.error(error.response.data.detail);
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
    <div className="h-screen flex justify-center p-4">
      <div className="flex flex-col gap-6 md:gap-9  w-full max-w-[500px]">
        <div className="p-4 md:p-8 rounded-2xl bg-white shadow-custom">
          <div className="flex flex-col gap-5 md:gap-7 font-[Inter]">
            <div className="flex flex-col">
              <p className="font-[900] text-2xl md:text-3xl">Create an Account</p>
              <p
                className="font-semibold text-sm text-[#2D313E] cursor-pointer"
                onClick={() => navigate("/auth")}
              >
                <span className="text-[#A7A8BB]">Already have an Account?</span>{" "}
                Login
              </p>
            </div>
            <div className="flex flex-col gap-4 md:gap-5 w-full">
              <div className="flex flex-col gap-1">
                <p className="font-semibold text-xs text-[#181C32] w-full">
                  Name
                </p>
                <input
                  type="text"
                  className={`h-12 md:h-14 outline-none bg-[#EEF1F5] rounded-[9.6px] w-full p-2 text-base font-semibold ${touched.full_name && errors.full_name ? 'border-2 border-red-500' : ''
                    }`}
                  value={formData?.full_name}
                  onChange={(e) => handleChange('full_name', e.target.value)}
                  onBlur={() => handleBlur('full_name')}
                />
                {renderError('full_name')}
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex justify-between items-center">
                  <p className="font-semibold text-xs text-[#181C32]">Email</p>
                  {!emailVerified && (
                    <Button
                      onClick={sendEmailOTP}
                      disabled={!formData.email || emailVerified || !!errors.email}
                      className="!normal-case !text-[#2D313E] !font-semibold !font-[Poppins] !min-w-[100px] !px-2"
                    >
                      {emailOtpSent ? "Resend OTP" : "Send OTP"}
                    </Button>
                  )}
                  {emailVerified && (
                    <span className="text-green-600 text-sm">Verified ✓</span>
                  )}
                </div>
                <input
                  type="email"
                  className={`h-12 md:h-14 outline-none bg-[#EEF1F5] rounded-[9.6px] w-full p-2 text-base font-semibold ${touched.email && errors.email ? 'border-2 border-red-500' : ''
                    }`}
                  value={formData?.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  onBlur={() => handleBlur('email')}
                  disabled={emailVerified}
                />
                {renderError('email')}
                {emailOtpSent && !emailVerified && (
                  <div className="mt-2 flex gap-2">
                    <input
                      type="text"
                      className="h-12 md:h-14 outline-none bg-[#EEF1F5] rounded-[9.6px] w-full p-2 text-base font-semibold"
                      value={emailOtp}
                      onChange={(e) => setEmailOtp(e.target.value)}
                      placeholder="Enter Email OTP"
                      maxLength={6}
                    />
                    <Button
                      onClick={verifyEmailOTP}
                      disabled={!emailOtp || emailOtp.length !== 6}
                      className="!normal-case !bg-[#2D313E] !text-white !font-semibold !font-[Poppins]"
                    >
                      Verify
                    </Button>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <p className="font-semibold text-xs text-[#181C32] w-full">
                  Role
                </p>
                <FormControl fullWidth>
                  <Select
                    value={formData?.role}
                    onChange={(e) => handleChange('role', e.target.value)}
                    onBlur={() => handleBlur('role')}
                    className={`h-12 md:h-14 !outline-none bg-[#EEF1F5] !rounded-[9.6px] w-full p-2 !text-base !font-semibold !border-none ${touched.role && errors.role ? '!border-2 !border-red-500' : ''
                      }`}                  >
                    {roles?.map((option) => (
                      <MenuItem key={option?.id} value={option?.key}>
                        {option?.value}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {renderError('role')}
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex justify-between items-center">
                  <p className="font-semibold text-xs text-[#181C32]">Phone</p>
                  {!phoneVerified && (
                    <Button
                      onClick={sendPhoneOTP}
                      disabled={!formData.phone || phoneVerified || !!errors.phone}
                      className="!normal-case !text-[#2D313E] !font-semibold !font-[Poppins] !min-w-[100px] !px-2"
                    >
                      {phoneOtpSent ? "Resend OTP" : "Send OTP"}
                    </Button>
                  )}
                  {phoneVerified && (
                    <span className="text-green-600 text-sm">Verified ✓</span>
                  )}
                </div>
                <input
                  type="tel"
                  className={`h-12 md:h-14 outline-none bg-[#EEF1F5] rounded-[9.6px] w-full p-2 text-base font-semibold ${touched.phone && errors.phone ? 'border-2 border-red-500' : ''
                    }`}
                  value={formData?.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  onBlur={() => handleBlur('phone')}
                  disabled={phoneVerified}
                  maxLength={10}
                />
                {renderError('phone')}
                {phoneOtpSent && !phoneVerified && (
                  <div className="mt-2 flex gap-2">
                    <input
                      type="text"
                      className="h-12 md:h-14 outline-none bg-[#EEF1F5] rounded-[9.6px] w-full p-2 text-base font-semibold"
                      value={phoneOtp}
                      onChange={(e) => setPhoneOtp(e.target.value)}
                      placeholder="Enter Phone OTP"
                      maxLength={6}
                    />
                    <Button
                      onClick={verifyPhoneOTP}
                      disabled={!phoneOtp || phoneOtp.length !== 6}
                      className="!normal-case !bg-[#2D313E] !text-white !font-semibold !font-[Poppins]"
                    >
                      Verify
                    </Button>
                  </div>
                )}
              </div>

              <div className="flex gap-2 flex-col md:flex-row">
                <PasswordInput
                  onChange={handlePasswordChange}
                  onBlur={() => handleBlur('password')}
                  error={touched.password && errors.password}
                  helperText={touched.password && errors.password}
                />
                <PasswordInput
                  label="Confirm Password"
                  onChange={handleCnfPasswordChange}
                  onBlur={() => handleBlur('confirmPassword')}
                  error={touched.confirmPassword && errors.confirmPassword}
                  helperText={touched.confirmPassword && errors.confirmPassword}
                />
              </div>

              <div className="flex flex-col gap-3">
                <Button
                  className={`!normal-case !bg-[#2D313E] !text-white !font-semibold !font-[Poppins] !py-3 md:!py-4 ${(!emailVerified || !phoneVerified) ? '!opacity-50 !cursor-not-allowed' : ''
                    }`}
                  onClick={createAccount}
                // disabled={!emailVerified || !phoneVerified}
                >
                  Sign Up
                </Button>
              </div>
              <div className="text-xs text-gray-500">
                * Password must contain at least:
                <ul className="list-disc pl-4 mt-1">
                  <li>8 characters</li>
                  <li>One uppercase letter</li>
                  <li>One lowercase letter</li>
                  <li>One number</li>
                  <li>One special character (@$!%*?&) 
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-evenly text-sm md:text-base">
          <p className="font-[Poppins] font-semibold text-[#607B88]">Terms</p>
          <p className="font-[Poppins] font-semibold text-[#607B88]">Plans</p>
          <p className="font-[Poppins] font-semibold text-[#607B88]">Contact Us</p>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
import { Button } from "@mui/material";
import logo from "../../../public/kokomattoLogo.svg";
import { useState } from "react";
import SuccessScreen from "./successScreen";
import PasswordInput from "../../common/textFeilds/passwordInput";
import { forgotPasswordData, ValidationErrors } from "../../Types/auth";
import toast from "react-hot-toast";
import { setPassword } from "../../API/Services/auth";
import { useLocation } from "react-router-dom";
import { admin_setPassword } from "../../API/Services/adminAuth";

const ChangePassword = () => {
  const location = useLocation();
  const isSuperAdmin: boolean = location.pathname.includes("super-admin");
  const [success, setSuccess] = useState(false);
  const [passData, setPassData] = useState<forgotPasswordData>({
    password: "",
    cnfPassword: "",
  });
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case "password":
        if (!value) return "Password is required";
        if (value.length < 8) return "Password must be at least 8 characters";
        if (!/(?=.*[a-z])/.test(value))
          return "Password must include lowercase letter";
        if (!/(?=.*[A-Z])/.test(value))
          return "Password must include uppercase letter";
        if (!/(?=.*\d)/.test(value)) return "Password must include number";
        if (!/(?=.*[@$!%*?&])/.test(value))
          return "Password must include special character";
        return "";

      case "confirmPassword":
        if (!value) return "Confirm Password is required";
        if (value !== passData.password) return "Passwords do not match";
        return "";

      default:
        return "";
    }
  };

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};
    let isValid = true;

    // Validate all fields
    Object.keys(passData).forEach((key) => {
      const error = validateField(
        key,
        passData[key as keyof forgotPasswordData]
      );
      if (error) {
        newErrors[key as keyof ValidationErrors] = error;
        isValid = false;
      }
    });

    // Validate confirm password
    const confirmPasswordError = validateField(
      "confirmPassword",
      passData?.cnfPassword
    );
    if (confirmPasswordError) {
      newErrors.confirmPassword = confirmPasswordError;
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleBlur = (field: string) => {
    setTouched({ ...touched, [field]: true });
    const error = validateField(
      field,
      field === "confirmPassword"
        ? passData?.cnfPassword
        : passData[field as keyof forgotPasswordData]
    );
    setErrors({ ...errors, [field]: error });
  };

  const handleChange = (field: keyof forgotPasswordData, value: string) => {
    setPassData({ ...passData, [field]: value });
    if (touched[field]) {
      const error = validateField(field, value);
      setErrors({ ...errors, [field]: error });
    }
  };

  const handlePasswordChange = (value: string) => {
    handleChange("password", value);
  };

  const handleCnfPasswordChange = (value: string) => {
    handleChange("cnfPassword", value);
    if (touched.confirmPassword) {
      const error = validateField("confirmPassword", value);
      setErrors({ ...errors, confirmPassword: error });
    }
  };

  const handeSubmit = () => {
    isSuperAdmin ? setSaPass() : setPass();
  };

  const setPass = async () => {
    const allTouched: Record<string, boolean> = {};
    Object.keys(passData).forEach((key) => (allTouched[key] = true));
    allTouched.confirmPassword = true;
    setTouched(allTouched);

    if (!validateForm()) {
      toast.dismiss();
      toast.error("Please enter password(s)");
      return;
    }

    try {
      await setPassword(passData?.password);
      setSuccess(true);
    } catch (error: any) {
      toast.error(error.response.data?.detail);
    }
  };

  const setSaPass = async () => {
    const allTouched: Record<string, boolean> = {};
    Object.keys(passData).forEach((key) => (allTouched[key] = true));
    allTouched.confirmPassword = true;
    setTouched(allTouched);

    if (!validateForm()) {
      toast.dismiss();
      toast.error("Please enter password(s)");
      return;
    }

    try {
      await admin_setPassword(passData?.password);
      setSuccess(true);
    } catch (error: any) {
      toast.error(error.response.data?.detail);
    }
  };

  return (
    <>
      {success === true ? (
        <SuccessScreen />
      ) : (
        <div className="w-full h-screen flex justify-center items-center">
          <div className="flex flex-col gap-9 justify-center">
            <div className="p-8 rounded-2xl bg-white shadow-custom">
              <div className="flex flex-col gap-7 font-[Inter]">
                <img src={logo} alt="logo" className="h-14 px-20" />
                <div className="flex flex-col gap-5 w-full">
                  <div className="flex flex-col gap-3 font-[Inter]">
                    <p className="font-[700] text-2xl text-[#262626]">
                      Change Password
                    </p>
                    <p className="font-[400] text-xs text-black">
                      Enter new password
                    </p>
                  </div>
                  <PasswordInput
                    onChange={handlePasswordChange}
                    onBlur={() => handleBlur("password")}
                    error={touched.password && errors.password}
                    helperText={touched.password && errors.password}
                  />
                  <PasswordInput
                    label="Confirm Password"
                    onChange={handleCnfPasswordChange}
                    onBlur={() => handleBlur("confirmPassword")}
                    error={touched.confirmPassword && errors.confirmPassword}
                    helperText={
                      touched.confirmPassword && errors.confirmPassword
                    }
                  />
                  <div className="flex flex-col gap-4">
                    <Button
                      className="!normal-case !bg-[#2D313E] !text-white !font-semibold !font-[Poppins]"
                      onClick={handeSubmit}
                    >
                      Reset
                    </Button>
                  </div>
                </div>
              </div>
              <div className="text-xs text-gray-500 pt-6">
                * Password must contain at least:
                <ul className="list-disc pl-4 mt-1">
                  <li>8 characters</li>
                  <li>One uppercase letter</li>
                  <li>One lowercase letter</li>
                  <li>One number</li>
                  <li>One special character (@$!%*?&)</li>
                </ul>
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
      )}
    </>
  );
};

export default ChangePassword;

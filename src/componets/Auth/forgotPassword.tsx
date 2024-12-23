/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../../public/kokomattoLogo.svg";
import { OTP } from "../../common/OTP";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import toast from "react-hot-toast";
import { clearEmail } from "../../store/emailSlice";
import { forgetPassword } from "../../API/Services/auth";
import { admin_forgetPassword } from "../../API/Services/adminAuth";

const ForgotPassword = () => {
  const location = useLocation();
  const isSuperAdmin: boolean = location.pathname.includes("super-admin");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const email = useAppSelector((state) => state.email.email);
  const [otp, setOtp] = useState("");
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = () => {
    isSuperAdmin ? handleSaOTP() : handleOTP();
  };

  const handleOTP = async () => {
    if (!showPasswordFields) {
      setShowPasswordFields(true);
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const response = await forgetPassword(email, otp, newPassword);
      if (response.status === 200) {
        toast.dismiss();
        toast.success("Password updated successfully");
        navigate("/auth/login");
        dispatch(clearEmail());
      }
    } catch (error: any) {
      toast.error(error.response.data?.detail ?? "Something went wrong");
    }
  };

  const handleSaOTP = async () => {
    if (!showPasswordFields) {
      setShowPasswordFields(true);
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const response = await admin_forgetPassword(email, otp, newPassword);
      if (response.status === 200) {
        toast.dismiss();
        toast.success("Password updated successfully");
        navigate("super-admin/auth/login");
        dispatch(clearEmail());
      }
    } catch (error: any) {
      toast.error(error.response.data?.detail ?? "Something went wrong");
    }
  };

  const isButtonEnabled = () => {
    if (!showPasswordFields) {
      return otp.length === 6;
    }
    return (
      otp.length === 6 &&
      newPassword.length >= 6 &&
      confirmPassword.length >= 6 &&
      newPassword === confirmPassword
    );
  };

  const handleBack = () => {
    isSuperAdmin ? navigate("/super-admin/auth") : navigate("/auth");
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="flex flex-col gap-9 justify-center">
        <div className="p-8 rounded-2xl bg-[#FDFDFD] border-[0.66px] border-[#DCDCDC] shadow-custom2">
          <div className="flex flex-col gap-6">
            <img src={logo} alt="logo" className="h-14" />
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-3 font-[Inter]">
                <p className="font-[700] text-2xl text-[#262626]">
                  Forgot Password
                </p>
                <p className="font-[400] text-xs text-black">
                  Please enter 6 digit code we just sent to
                  <br />
                  <span className="font-[700]">{email}</span>
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-8">
              <div className="px-3">
                <OTP separator={" "} value={otp} onChange={setOtp} length={6} />
              </div>

              {showPasswordFields && (
                <div className="flex flex-col gap-4">
                  <p className="font-semibold text-xs text-[#181C32] w-full">
                    New Password
                  </p>
                  <TextField
                    type="password"
                    variant="outlined"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    fullWidth
                    size="small"
                  />
                  <p className="font-semibold text-xs text-[#181C32] w-full">
                    Confirm Password
                  </p>
                  <TextField
                    type="password"
                    variant="outlined"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    fullWidth
                    size="small"
                    error={
                      newPassword !== confirmPassword && confirmPassword !== ""
                    }
                    helperText={
                      newPassword !== confirmPassword && confirmPassword !== ""
                        ? "Passwords do not match"
                        : ""
                    }
                  />
                </div>
              )}

              <div className="flex flex-col gap-3">
                <Button
                  className="!normal-case !bg-[#2D313E] !text-white !font-semibold !font-[Poppins]"
                  onClick={handleSubmit}
                  disabled={!isButtonEnabled()}
                >
                  {showPasswordFields ? "Update Password" : "Next"}
                </Button>
                <Button
                  className="!normal-case !text-[#040308] !font-semibold !font-[Poppins] !text-xs"
                  onClick={handleBack}
                >
                  Back to Login
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

export default ForgotPassword;

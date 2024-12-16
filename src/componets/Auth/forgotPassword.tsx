import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import logo from "../../../public/kokomattoLogo.svg";
import { OTP } from "../../common/OTP";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import toast from "react-hot-toast";
import { clearEmail } from "../../store/emailSlice";
import { verifyOTP } from "../../API/Services/auth";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const email = useAppSelector((state) => state.email.email);
  const [otp, setOtp] = useState("");

  const handleOTP = async () => {
    if (otp !== "123456") {
      toast.dismiss();
      toast.error("Incorrect OTP");
      return;
    }
    toast.dismiss();
    toast.success("OTP verified successfully");
    navigate("/auth/changePass");
    dispatch(clearEmail());

    // try {
    //   const response = await verifyOTP(email, otp);
    //   if (response.status === 200) {
    //     toast.dismiss();
    //     toast.success("OTP verified successfully");
    //     navigate("/auth/changePass");
    //     dispatch(clearEmail());
    //   }
    // } catch (error: any) {
    //   toast.error(error.response.data?.detail ?? "Something went wrong");
    // }
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
              <div className="flex flex-col gap-3">
                <Button
                  className="!normal-case !bg-[#2D313E] !text-white !font-semibold !font-[Poppins]"
                  onClick={handleOTP}
                >
                  Verify
                </Button>
                <Button
                  className="!normal-case !text-[#040308] !font-semibold !font-[Poppins] !text-xs"
                  onClick={() => navigate("/auth")}
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

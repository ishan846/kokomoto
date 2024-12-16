import { Button } from "@mui/material";
import logo from "../../../public/kokomattoLogo.svg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAppDispatch } from "../../store/store";
import { setEmail } from "../../store/emailSlice";
import { checkUser, sendOTP } from "../../API/Services/auth";
import toast from "react-hot-toast";

const EnterEmail = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [emailId, setEmailId] = useState<string>("");

  const existingUser = async () => {
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
    toast.dismiss();
    toast.success("OTP sent, please check your email");
    dispatch(setEmail(emailId));
    navigate("/auth/forgotPassword");
    // try {
    //   const response = await sendOTP(emailId);
    //   if (response.status === 200) {
    //     toast.dismiss();
    //     toast.success("OTP sent, please check your email");
    //     dispatch(setEmail(emailId));
    //     navigate("/auth/forgotPassword");
    //   }
    // } catch (error: any) {
    //   toast.error(error.response.data.detail ?? "Something went wrong");
    // }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="flex flex-col gap-9 justify-center">
        <div className="p-8 rounded-2xl bg-white shadow-custom">
          <div className="flex flex-col gap-7 font-[Inter]">
            <img src={logo} alt="logo" className="h-14" />
            <div className="flex flex-col gap-5 w-full">
              <div className="flex flex-col gap-2">
                <p className="font-semibold text-xs text-[#181C32] w-full">
                  Email
                </p>
                <input
                  type="email"
                  className="h-14 outline-none bg-[#EEF1F5] rounded-[9.6px] w-full p-2 text-base font-semibold"
                  value={emailId}
                  onChange={(e) => setEmailId(e.target?.value)}
                />
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

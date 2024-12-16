import { Button } from "@mui/material";
import logo from "../../../public/kokomattoLogo.svg";
import { useState } from "react";
import SuccessScreen from "./successScreen";
import PasswordInput from "../../common/textFeilds/passwordInput";
import { forgotPasswordData } from "../../Types/auth";
import toast from "react-hot-toast";

const ChangePassword = () => {
  const [success, setSuccess] = useState(false);
  const [passData, setPassData] = useState<forgotPasswordData>({
    password: "",
    cnfPassword: "",
  });

  const setPassword = async () => {
    if(passData?.password !== passData?.cnfPassword) {
      toast.dismiss();
      toast.error("Passwords must match")
      return
    }
    setSuccess(true)
  }

  return (
    <>
      {success === true ? (
        <SuccessScreen />
      ) : (
        <div className="w-full h-screen flex justify-center items-center">
          <div className="flex flex-col gap-9 justify-center">
            <div className="p-8 rounded-2xl bg-white shadow-custom">
              <div className="flex flex-col gap-7 font-[Inter]">
                <img src={logo} alt="logo" className="h-14" />
                <div className="flex flex-col gap-5 w-full">
                  <PasswordInput
                    onChange={(val) =>
                      setPassData({
                        ...passData,
                        password: val,
                      })
                    }
                  />
                  <PasswordInput
                    label="Confirm Password"
                    onChange={(val) =>
                      setPassData({
                        ...passData,
                        cnfPassword: val,
                      })
                    }
                  />
                  <div className="flex flex-col gap-4">
                    <Button
                      className="!normal-case !bg-[#2D313E] !text-white !font-semibold !font-[Poppins]"
                      onClick={setPassword}
                    >
                      Reset
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
      )}
    </>
  );
};

export default ChangePassword;

import React from "react";
import checkScreen from "../../assets/checkbox.svg";
import greenCheck from "../../assets/greenCheck.svg";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface SuccessProps {}

const SuccessScreen: React.FC<SuccessProps> = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full h-screen bg-cover bg-center flex justify-center items-center">
      <img src={checkScreen} alt="" className="object-cover h-screen" />
      <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-1/3">
        <div className="flex justify-center items-center p-12 bg-white border border-[#BDBDBD] shadow-custom3 rounded-3xl w-full">
          <div className="flex flex-col gap-7 w-full justify-center items-center">
            <div className="flex flex-col gap-5 justify-center items-center">
              <img src={greenCheck} alt="" className="w-[120px]" />
              <p className="font-semibold text-xl text-[#040308]">
                Password reset successfully
              </p>
            </div>
            <Button
              className="!normal-case !bg-[#2D313E] !text-white !font-semibold !font-[Poppins] w-full"
              onClick={() => navigate("/")}
            >
              Sign In
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessScreen;

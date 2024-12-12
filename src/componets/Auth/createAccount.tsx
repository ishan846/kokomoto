import { Button } from "@mui/material";
import google from "../../assets/google.svg";
import authCoverImage from "../../assets/authCoverPage.svg";
import { useNavigate } from "react-router-dom";
import PasswordInput from "../../common/textFeilds/passwordInput";

const CreateAccount = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full h-screen bg-[#F8F9F3]">
      <div className="flex justify-between items-center">
        <img src={authCoverImage} alt="image" className="h-screen" />
        <div className="w-full h-screen flex justify-center items-center">
          <div className="flex flex-col gap-5 justify-center">
            <div className="p-8 rounded-2xl bg-white shadow-custom">
              <div className="flex flex-col gap-5 font-[Inter]">
                <div className="flex flex-col">
                  <p className="font-[900] text-3xl">Create an Account</p>
                  <p
                    className="font-semibold text-sm text-[#2D313E] cursor-pointer"
                    onClick={() => navigate("/")}
                  >
                    <span className="text-[#A7A8BB]">
                      Already have an Account?
                    </span>{" "}
                    Login
                  </p>
                </div>
                <div className="flex flex-col gap-5 w-full">
                  <div className="flex flex-col gap-1">
                    <p className="font-semibold text-xs text-[#181C32] w-full">
                      Name
                    </p>
                    <input
                      type="text"
                      className="h-14 outline-none bg-[#EEF1F5] rounded-[9.6px] w-full p-2 text-base font-semibold"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="font-semibold text-xs text-[#181C32] w-full">
                      Email
                    </p>
                    <input
                      type="email"
                      className="h-14 outline-none bg-[#EEF1F5] rounded-[9.6px] w-full p-2 text-base font-semibold"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="font-semibold text-xs text-[#181C32] w-full">
                      Phone
                    </p>
                    <input
                      type="number"
                      className="h-14 outline-none bg-[#EEF1F5] rounded-[9.6px] w-full p-2 text-base font-semibold"
                    />
                  </div>
                  <PasswordInput />
                  <PasswordInput label="Confirm Password" />
                  <div className="flex flex-col gap-3">
                    <Button
                      className="!normal-case !bg-[#2D313E] !text-white !font-semibold !font-[Poppins]"
                      onClick={() => navigate("/verify")}
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
      </div>
    </div>
  );
};

export default CreateAccount;

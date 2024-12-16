import {
  Button,
  FormControl,
  MenuItem,
  Select,
} from "@mui/material";
import google from "../../assets/google.svg";
import { useNavigate } from "react-router-dom";
import PasswordInput from "../../common/textFeilds/passwordInput";
import { useState } from "react";
import { loginData } from "../../Types/auth";
import toast from "react-hot-toast";
import { login } from "../../API/Services/auth";
import Cookies from "js-cookie";
import { roles } from "../../utils/helperData";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<loginData>({
    email_or_phone: "",
    password: "",
    device_id: "Qw21g75-123esd",
    device_type: "WEB",
    role: "",
  });

  const handlePassChange = (value: string) => {
    setFormData({
      ...formData,
      password: value,
    });
  };

  const loginUser = async () => {
    try {
      const response = await login(formData);
      if (response.status === 200) {
        toast.success(response?.data?.message);
        const token = response.data?.data?.token;
        Cookies.set("token", token);
        navigate("/afterLogin");
      }
    } catch (error: any) {
      toast.error(error.response.data?.detail);
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="flex flex-col gap-9 justify-center">
        <div className="p-8 rounded-2xl bg-white shadow-custom">
          <div className="flex flex-col gap-7 font-[Inter]">
            <div className="flex flex-col">
              <p className="font-[900] text-3xl">Welcome to Kokomatto</p>
              <p
                className="font-semibold text-sm text-[#2D313E] cursor-pointer"
                onClick={() => navigate("/auth/signup")}
              >
                <span className="text-[#A7A8BB]">New Here?</span> Create an
                Account
              </p>
            </div>
            <div className="flex flex-col gap-5 w-full">
              <div className="flex flex-col gap-2">
                <p className="font-semibold text-xs text-[#181C32] w-full">
                  Role
                </p>
                <FormControl fullWidth>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
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
                      <MenuItem key={option?.id} value={option?.value}>
                        {option?.value}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div className="flex flex-col gap-2">
                <p className="font-semibold text-xs text-[#181C32] w-full">
                  Email
                </p>
                <input
                  type="email"
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
              <PasswordInput forgot={true} onChange={handlePassChange} />
              <div className="flex flex-col gap-4">
                <Button
                  className="!normal-case !bg-[#2D313E] !text-white !font-semibold !font-[Poppins]"
                  onClick={loginUser}
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

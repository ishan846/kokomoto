import { Button, FormControl, MenuItem, Select } from "@mui/material";
import google from "../../assets/google.svg";
import { useNavigate } from "react-router-dom";
import PasswordInput from "../../common/textFeilds/passwordInput";
import { useState } from "react";
import { signupData } from "../../Types/auth";
import toast from "react-hot-toast";
import { checkUser, sendOTP, signup } from "../../API/Services/auth";
import Cookies from "js-cookie";
import { roles } from "../../utils/helperData";
import { useAppDispatch } from "../../store/store";
import { setEmail } from "../../store/emailSlice";

const CreateAccount = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [cnfPass, setCnfPass] = useState("");
  const [formData, setFormData] = useState<signupData>({
    email: "",
    phone: "",
    password: "",
    full_name: "",
    device_id: "Qw21g75-123esd",
    device_type: "WEB",
    role: "",
  });

  const handlePasswordChange = (value: string) => {
    setFormData({
      ...formData,
      password: value,
    });
  };

  const handleCnfPasswordChange = (value: string) => {
    setCnfPass(value);
  };

  const existingUser = async () => {
    try {
      const response = await checkUser(formData?.email);
      if (response.status === 200) {
        if (response.data?.data?.is_registered === true)
          toast.error("User already exist");
        else createAccount();
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message);
    }
  };

  const handleSendOTP = async () => {
    if (formData?.password !== cnfPass) {
      toast.error("Passwords must match");
      return;
    }
    toast.dismiss();
    toast.success("OTP sent, please check your email");
    dispatch(setEmail(formData?.email));
    navigate("/auth/verify");
    // try {
    //   const response = await sendOTP(formData?.email);
    //   if (response.status === 200) {
    //     toast.dismiss();
    //     toast.success("OTP sent, please check your email");
    //     dispatch(setEmail(formData?.email));
    //     navigate("/auth/verify");
    //   }
    // } catch (error: any) {
    //   toast.error(error.response.data.detail ?? "Something went wrong");
    // }
  };

  const createAccount = async () => {
    try {
      const response = await signup(formData);
      if (response.status === 201) {
        toast.success(response.data?.message);
        const token = response.data?.data?.token;
        Cookies.set("token", token);
        dispatch(setEmail(formData?.email));
        navigate("/auth/verify");
      }
    } catch (error: any) {
      toast.error(error.response.data.detail);
    }
  };

  return (
    <div className="px-4">
      <div className="h-screen flex justify-center items-center">
        <div className="flex flex-col gap-5 justify-center">
          <div className="p-8 rounded-2xl bg-white shadow-custom">
            <div className="flex flex-col gap-5 font-[Inter]">
              <div className="flex flex-col">
                <p className="font-[900] text-3xl">Create an Account</p>
                <p
                  className="font-semibold text-sm text-[#2D313E] cursor-pointer"
                  onClick={() => navigate("/auth")}
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
                    value={formData?.full_name}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        full_name: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <p className="font-semibold text-xs text-[#181C32] w-full">
                    Email
                  </p>
                  <input
                    type="email"
                    className="h-14 outline-none bg-[#EEF1F5] rounded-[9.6px] w-full p-2 text-base font-semibold"
                    value={formData?.email}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        email: e.target.value,
                      })
                    }
                  />
                </div>
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
                <div className="flex flex-col gap-1">
                  <p className="font-semibold text-xs text-[#181C32] w-full">
                    Phone
                  </p>
                  <input
                    type="number"
                    className="h-14 outline-none bg-[#EEF1F5] rounded-[9.6px] w-full p-2 text-base font-semibold"
                    value={formData?.phone}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        phone: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="flex gap-2">
                  <PasswordInput onChange={handlePasswordChange} />
                  <PasswordInput
                    label="Confirm Password"
                    onChange={handleCnfPasswordChange}
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <Button
                    className="!normal-case !bg-[#2D313E] !text-white !font-semibold !font-[Poppins]"
                    onClick={existingUser}
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
  );
};

export default CreateAccount;

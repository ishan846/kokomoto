import React, { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";

interface PasswordInputProps {
  label?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  forgot?: boolean;
  error?: boolean | string;
  helperText?: string | boolean;
  value?: string;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  label = "Password",
  onChange,
  onBlur,
  forgot,
  error,
  helperText,
  value,
}) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event.target.value);
    }
  };
  const handleBlur = () => {
    if (onBlur) {
      onBlur();
    }
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex justiy-between items-center w-full gap-[170px]">
        <p className="font-semibold text-xs text-[#181C32]">{label}</p>
        {forgot === true ? (
          <p
            className="font-semibold text-xs text-[#181C32] cursor-pointer hover:text-[#2D313E]"
            onClick={() => navigate("/auth/enterEmail")}
          >
            Forgot Password?
          </p>
        ) : null
        }
      </div>
      <div className="relative w-full">
        <input
          type={showPassword ? "text" : "password"}
          className={`h-14 outline-none bg-[#EEF1F5] rounded-[9.6px] w-full p-2 text-base font-semibold 
            ${error ? 'border-2 border-red-500' : ''}
          `}
          onChange={handleChange}
          onBlur={handleBlur}
          value={value}
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-[#181C32] font-medium"
        >
          {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
        </button>
      </div>
      {error && helperText && (
        <p className="text-red-500 text-xs mt-1">{helperText}</p>
      )}
    </div>
  );
};

export default PasswordInput;

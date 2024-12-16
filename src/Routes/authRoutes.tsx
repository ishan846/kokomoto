import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../componets/Auth/login";
import CreateAccount from "../componets/Auth/createAccount";
import VerifyEmail from "../componets/Auth/verifyEmail";
import ForgotPassword from "../componets/Auth/forgotPassword";
import ChangePassword from "../componets/Auth/changePassword";
import AfterLogin from "../componets/Auth/afterLogin";
import EnterEmail from "../componets/Auth/enterEmail";

const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<CreateAccount />} />
      <Route path="verify" element={<VerifyEmail />} />
      <Route path="enterEmail" element={<EnterEmail />} />
      <Route path="forgotPassword" element={<ForgotPassword />} />
      <Route path="changePass" element={<ChangePassword />} />
      <Route path="afterLogin" element={<AfterLogin />} />
      <Route path="/" element={<Navigate to="login" replace />} />
    </Routes>
  );
};

export default AuthRoutes;
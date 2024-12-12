import { Routes, Route } from "react-router-dom";
import Login from "./componets/Auth/login";
import CreateAccount from "./componets/Auth/createAccount";
import VerifyEmail from "./componets/Auth/verifyEmail";
import ForgotPassword from "./componets/Auth/forgotPassword";
import ChangePassword from "./componets/Auth/changePassword";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<CreateAccount />} />
      <Route path="/verify" element={<VerifyEmail />} />
      <Route path="/forgotPassword" element={<ForgotPassword />} />
      <Route path="/changePass" element={<ChangePassword />} />
    </Routes>
  );
};

export default AppRoutes;
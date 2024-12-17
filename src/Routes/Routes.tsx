import { Routes, Route, Navigate } from "react-router-dom";
import AuthLayout from "../common/Layouts/authLayout";
import AfterLogin from "../componets/Auth/afterLogin";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/auth/*" element={<AuthLayout />} />
      <Route path="/" element={<Navigate to="auth" replace />} />
      <Route path="/afterLogin" element={<AfterLogin />} />
    </Routes>
  );
};

export default AppRoutes;
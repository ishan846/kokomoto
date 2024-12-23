import { Routes, Route, Navigate } from "react-router-dom";
import AuthLayout from "../common/Layouts/authLayout";
import MainLayout from "../common/Layouts/mainLayout";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/auth/*" element={<AuthLayout />} />
      <Route path="/super-admin/auth/*" element={<AuthLayout />} />
      <Route path="/super-admin" element={<Navigate to="/super-admin/auth" replace />} />
      <Route path="/" element={<Navigate to="auth" replace />} />
      {/* <Route path="/home/*" element={<MainLayout />} /> */}
      <Route path="/home/*" element={<MainLayout />} />

    </Routes>
  );
};

export default AppRoutes;
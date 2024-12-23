import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "../componets/Dashboard/dashboard";
import Category from "../componets/Category/category";

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="/categories" element={<Category />} />
    </Routes>
  );
};

export default MainRoutes;
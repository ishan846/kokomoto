import gif from "../../assets/coverGif.gif"
import AuthRoutes from "../../Routes/authRoutes";

const AuthLayout = () => {
  return (
    <div className="w-full h-screen bg-[#F8F9F3]">
      <div className="flex justify-between items-center">
        <img src={gif} alt="image" className="h-screen" />
        <AuthRoutes />
      </div>
    </div>
  );
};

export default AuthLayout;
import gif from "../../assets/coverGif.gif"
import AuthRoutes from "../../Routes/authRoutes";

const AuthLayout = () => {
  return (
    <div className="w-full min-h-screen bg-[#F8F9F3]">
      <div className="flex justify-between items-center">
        <img src={gif} alt="image" className="h-screen min-w-[60%] max-w-[60%]" />
        <div className="overflow-auto min-w-[40%] max-w-[40%]">
        <AuthRoutes />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
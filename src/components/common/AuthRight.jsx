import { Link } from "react-router-dom";
import authRightImage from "../../assets/images/auth-img.png";
import PrimaryButton from "./PrimaryButton";

const AuthRight = () => {
  return (
    <div className="min-h-screen max-h-screen overflow-hidden relative">
      <img className="w-full h-full" src={authRightImage} alt="" />
      <Link to={"/"} className="absolute top-[56px] right-[200px]">
        <PrimaryButton
          text="Back to Home"
          className="py-4 px-8 rounded-[40px] border-[2px] border-white text-white font-bold duration-200 ease-in-out hover:bg-white hover:text-primaryGreen"
        />
      </Link>
    </div>
  );
};

export default AuthRight;

import { useContext } from "react";
import { IoMenu } from "react-icons/io5";
import defaultAvatar from "../../assets/images/user-profile.png";
import { AuthContext } from "../../context/index";

const Navbar = () => {
  const { user, setIsSidebarOpen } = useContext(AuthContext);
  const userAvatar =
    user?.avatar !== null
      ? `${import.meta.env.VITE_SERVER_URL}/${user?.avatar}`
      : defaultAvatar;
  

  return (
    <header className="py-8 px-10 max-md:px-5 max-md:py-3 bg-white fixed top-0 left-[345px] w-[calc(100%-345px)] max-md:w-full max-md:left-0 z-[10]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <p className="hidden max-md:block max-md:text-[22px]" onClick={() => setIsSidebarOpen(true)}>
            <IoMenu />
          </p>
          <h1 className="text-[40px] font-bold text-heading max-md:text-[24px] custom-xs:!text-[20px]">
            Dashboard
          </h1>
        </div>
        <div className="flex items-center gap-3 cursor-pointer">
          <img
            className="w-[60px] h-[60px] max-md:w-10 max-md:h-10 object-cover rounded-full"
            src={userAvatar}
            alt="userProfile"
          />
          <div>
            <h2 className="text-[20px] font-bold text-heading mb-0 max-md:text-base">
              {user?.first_name} {user?.last_name}
            </h2>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

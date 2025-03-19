import { useContext } from "react";
import defaultAvatar from "../../assets/images/user-profile.png"
import { AuthContext } from "../../context/index";

const Navbar = () => {
  const {user} = useContext(AuthContext);
  const userAvatar = user?.avatar !== null ? `${import.meta.env.VITE_SERVER_URL}/${user?.avatar}`: defaultAvatar;
  return (
    <header className="py-8 px-10 bg-white fixed top-0 left-[345px] w-[calc(100%-345px)] z-[50]">
        <div className="flex items-center justify-between">
            <h1 className="text-[40px] font-bold text-heading">Dashboard</h1>
            <div className="flex items-center gap-3 cursor-pointer">
                <img className="w-[60px] h-[60px] object-cover rounded-full" src={userAvatar} alt="userProfile" />
                <div>
                    <h2 className="text-[20px] font-bold text-heading mb-0">{user?.first_name} {user?.last_name}</h2>
                </div>
            </div>
        </div>
    </header>
  )
};

export default Navbar;

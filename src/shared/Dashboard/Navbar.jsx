import userProfile from "../../assets/images/user-profile.png"
const Navbar = () => {
  return (
    <header className="py-8 px-10 bg-white fixed top-0 left-[345px] w-[calc(100%-345px)] z-[50]">
        <div className="flex items-center justify-between">
            <h1 className="text-[40px] font-bold text-heading">Dashboard</h1>
            <div className="flex items-center gap-3 cursor-pointer">
                <img className="w-[60px] h-[60px] object-cover rounded-full" src={userProfile} alt="userProfile" />
                <div>
                    <h2 className="text-[20px] font-bold text-heading mb-0">Robert Fox</h2>
                    <p className="text-base text-paragraph">Customer</p>
                </div>
            </div>
        </div>
    </header>
  )
};

export default Navbar;

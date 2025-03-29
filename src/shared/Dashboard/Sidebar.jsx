import { BiLogOut } from "react-icons/bi";
import { BsBoxSeam } from "react-icons/bs";
import { FaRegAddressBook, FaRegUser } from "react-icons/fa";
import { TbUsersPlus } from "react-icons/tb";
import { Link, NavLink, useLocation } from "react-router-dom";
import Logo from "../../assets/logo/footer-logo.svg";
import useLogout from "../../hooks/useLogout";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/index";
import { IoCloseOutline } from "react-icons/io5";

const Sidebar = () => {
  const menuItems = [
    {
      id: 1,
      name: "My Account",
      path: "/dashboard/my-account",
      icon: <FaRegUser />,
    },
    {
      id: 2,
      name: "Shipments",
      path: "/dashboard/shipment-history",
      icon: <BsBoxSeam />,
    },
    {
      id: 3,
      name: "address book",
      path: "/dashboard/address-book",
      icon: <FaRegAddressBook />,
    },
    {
      id: 4,
      name: "refer friends",
      path: "/dashboard/refer-friends",
      icon: <TbUsersPlus />,
    },
  ];

  const { pathname } = useLocation();
  const {logout} = useLogout();
  const {isSidebarOpen, setIsSidebarOpen} = useContext(AuthContext)

  return (
    <div className={`p-[46px] pt-[67px] bg-white fixed top-0 left-0 h-screen w-[345px] max-md:w-[260px] z-[20] max-md:fixed max-md:p-[20px] max-md:pt-10 max-md:z-[100] duration-200 ease-in-out ${isSidebarOpen ? 'max-md:left-0 max-md:visible' : 'max-md:left-[-260px]'}`}>
      <Link to={"/"} className="inline-block mb-5">
        <img className="max-md:w-[170px]" src={Logo} alt="Logo" />
      </Link>
      <ul>
        {menuItems?.map((item) => (
          <li key={item?.id}>
            <NavLink
              to={`${item?.path}`}
              className={`flex items-center gap-4 py-5 px-7 rounded-[16px] text-[18px] text-paragraph font-semibold mt-5 capitalize duration-200 ease-in-out hover:bg-primaryGreen hover:text-white max-md:py-[10px] max-md:px-4 max-md:gap-2 max-md:rounded-[10px] max-md:mt-3 ${
                item.path === pathname ? "active-menu-link" : ""
              }`} onClick={() => setIsSidebarOpen(false)}
            >
              {" "}
              <span className="text-[20px]">{item?.icon}</span> {item?.name}
            </NavLink>
          </li>
        ))}
        <li className="flex items-center gap-4 py-5 px-7 rounded-[16px] text-[18px] text-paragraph font-semibold mt-5 capitalize duration-200 ease-in-out hover:bg-red-400 hover:text-white cursor-pointer max-md:py-[10px] max-md:px-4 max-md:mt-2" onClick={() => logout()}>
          <span className="text-[20px]">
            <BiLogOut />
          </span>
          Logout
        </li>
      </ul>
      {/* close menu  */}
      <p className="h-8 w-8 rounded-full bg-[#f6f6f6] hidden max-md:flex items-center justify-center absolute top-4 right-4 text-[20px] cursor-pointer" onClick={() => setIsSidebarOpen(false)}><IoCloseOutline /></p>
    </div>
  );
};

export default Sidebar;

import { Link, NavLink, useLocation } from "react-router-dom";
import Logo from "../../assets/logo/footer-logo.svg";
import { FaRegUser } from "react-icons/fa";
import { BsBoxSeam } from "react-icons/bs";
import { FaRegAddressBook } from "react-icons/fa";
import { TbUsersPlus } from "react-icons/tb";

const Sidebar = () => {
    const menuItems = [
        {id:1, name:"My Account", path:"/dashboard/my-account", icon:<FaRegUser />},
        {id:2, name:"Shipments", path:"/dashboard/shipment", icon:<BsBoxSeam />},
        {id:3, name:"address book", path:"/dashboard/address", icon:<FaRegAddressBook />},
        {id:4, name:"refer friends", path:"/dashboard/refer", icon:<TbUsersPlus />},
    ]

    const {pathname} = useLocation();

console.log(pathname);

  return (
    <div className="p-[46px] pt-[67px] bg-white fixed top-0 left-0 h-screen w-[345px] z-[20]">
      <Link to={"/"}>
        <img src={Logo} alt="Logo" />
      </Link>
      <ul>
        {
            menuItems?.map((item) => (
                <li key={item?.id}>
                    <NavLink to={`${item?.path}`} className={`flex items-center gap-4 py-5 px-7 rounded-[16px] text-[18px] text-paragraph font-semibold mt-12 capitalize duration-200 ease-in-out hover:bg-primaryGreen hover:text-white ${item.path === pathname ? 'active-menu-link' : 'hh'}`}> <span className="text-[20px]">
                        {item?.icon}</span> {item?.name}</NavLink>
                </li>
            ))
        }
      </ul>
    </div>
  );
};

export default Sidebar;

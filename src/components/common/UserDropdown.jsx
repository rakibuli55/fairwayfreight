import { useEffect, useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { NavLink, useLocation } from "react-router-dom";
import defaultAvatar from "../../assets/images/user-profile.png";
import useLogout from "../../hooks/useLogout";
const menuItems = [
  {
    id: 1,
    name: "My Account",
    path: "/dashboard/my-account",
  },
  {
    id: 2,
    name: "Shipments",
    path: "/dashboard/shipment-history",
  },
  {
    id: 3,
    name: "address book",
    path: "/dashboard/address-book",
  },
  {
    id: 4,
    name: "refer friends",
    path: "/dashboard/refer-friends",
  },
];
const UserDropdown = () => {
  const [isdropdownOpen, setIsDropdownOpen] = useState(false);
  const buttonRef = useRef(null);
  const dropdownRef = useRef(null);
  const {logout} = useLogout();
  const location = useLocation()

  useEffect(() => {
    const handleOutsideClick = (e) => {
        const target = e.target;
        if(buttonRef.current && 
            !buttonRef.current.contains(target) && 
            dropdownRef.current && 
            !dropdownRef.current.contains(target)){
            setIsDropdownOpen(false)
        }
    }

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
        document.removeEventListener('mousedown', handleOutsideClick)    }

  }, [])

  return (
    <div className="relative">
      <div
        className={`flex items-center gap-2 cursor-pointer ${location.pathname === '/' ? 'text-white' : 'text-heading'}`}
        onClick={() => setIsDropdownOpen(!isdropdownOpen)}
        ref={buttonRef}
      >
        <img
          className="w-[40px] h-[40px] rounded-full object-cover"
          src={defaultAvatar}
          alt="defaultAvatar"
        />
        <p className="text-[20px]">
          <IoIosArrowDown />
        </p>
      </div>
      <ul
        className={`pt-3 pb-6 px-5 bg-primaryGreen rounded-[6px] w-[158px] absolute right-0 duration-200 ease-in-out ${
          isdropdownOpen
            ? "opacity-100 visible top-[50px]"
            : "opacity-0 invisible top-[60px]"
        }`}
        ref={dropdownRef}
      >
        {menuItems.map((item) => (
          <li key={item?.id}>
            <NavLink
              to={`${item.path}`}
              className="block capitalize font-bold text-white py-3 border-b border-white hover:opacity-50 duration-200 ease-in-out"
              onClick={() => setIsDropdownOpen(false)}
            >
              {item?.name}
            </NavLink>
          </li>
        ))}
        <li
          className="text-white font-bold pt-3 cursor-pointer hover:opacity-50 duration-200 ease-in-out"
          onClick={logout}
        >
          Logout
        </li>
      </ul>
    </div>
  );
};

export default UserDropdown;

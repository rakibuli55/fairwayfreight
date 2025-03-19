import { useContext, useEffect, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";
import { Link, NavLink, useLocation } from "react-router-dom";
import UserDropdown from "../components/common/UserDropdown";
import Container from "../container/Container";
import { AuthContext } from "../context/index";

const Navbar = () => {
  const menuItems = [
    { name: "ship", url: "/ship" },
    { name: "track", url: "/track" },
    { name: "how it works", url: "/how-it-works" },
    { name: "blog", url: "/blog" },
    { name: "help", url: "/help" },
  ];
  const location = useLocation();

  const [scrolled, setScrolled] = useState(false);
  const { user, siteSettingsData } = useContext(AuthContext);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const activeHeaderColor =
    location.pathname === "/" ? "bg-heading" : "bg-white";

  return (
    <header
      className={`fixed top-0 left-0 w-full z-[50] duration-200 ease-in-out ${
        scrolled ? activeHeaderColor : ""
      }`}
    >
      <Container>
        <div
          className={`pb-5 border-b ${
            location.pathname === "/" ? "border-[#F6F6F6]" : "border-[#4d4d4d]"
          } flex items-center justify-between duration-200 ease-in-out ${
            scrolled ? "pt-5 border-none" : "pt-10"
          }`}
        >
          <Link to={"/"}>
            <img
              className="w-[223px] h-[48px]"
              src={`${location.pathname === "/" ? `${import.meta.env.VITE_SERVER_URL}/${siteSettingsData?.white_logo}` : `${import.meta.env.VITE_SERVER_URL}/${siteSettingsData?.footer_logo}`}`}
              alt="logo"
            />
          </Link>
          <div className="flex items-center gap-[280px]">
            {/* menu  */}
            <ul className="flex items-center gap-[64px]">
              {menuItems.map((item) => (
                <li key={item?.name}>
                  <NavLink
                    to={`${item?.url}`}
                    className={`inline-block text-[20px] ${
                      location.pathname === "/" ? "text-white" : "text-heading"
                    } capitalize duration-200 ease-in-out hover:opacity-60 ${
                      location.pathname === item.url ? "navlink-active" : ""
                    }`}
                  >
                    {item.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
          {/* auth buttons  */}
          <div className="flex items-center gap-5 w-[200px] justify-end">
            {user !== null ? (
              <UserDropdown />
            ) : (
              <>
                <Link
                  to={"/auth/login"}
                  className={`flex items-center gap-2 text-base font-semibold duration-200 ease-in-out hover:opacity-70 ${
                    location.pathname === "/" ? "text-white" : "text-heading"
                  }`}
                >
                  <span className="text-[18px]">
                    <FaRegUser />
                  </span>
                  Log in
                </Link>
                <Link
                  to={"auth/signup"}
                  className={`flex items-center gap-2 text-base text-white font-semibold py-[10px] px-5 bg-primaryGreen rounded-[40px] duration-200 ease-in-out  ${
                    location.pathname === "/"
                      ? "hover:bg-white hover:text-primaryGreen border border-primaryGreen"
                      : "hover:text-primaryGreen hover:bg-transparent border border-primaryGreen"
                  }`}
                >
                  Sign up
                  <span className="text-[18px] rotate-[-40deg]">
                    <FaArrowRight />
                  </span>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Navbar;

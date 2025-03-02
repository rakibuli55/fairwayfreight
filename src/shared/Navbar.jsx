import React, { useEffect, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";
import { Link, NavLink } from "react-router-dom";
import Logo from "../assets/logo/Logo.svg";
import Container from "../container/Container";

const Navbar = () => {
  const menuItems = [
    { name: "ship", url: "/ship" },
    { name: "track", url: "/track" },
    { name: "how it works", url: "/how-it-works" },
    { name: "blog", url: "/blog" },
    { name: "help", url: "/help" },
  ];

    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
      const handleScroll = () => {
        if(window.scrollY > 50) {
          setScrolled(true);
        }else{
          setScrolled(false)
        }
      }

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll)

    }, [])

  return (
    <header className={`fixed top-0 left-0 w-full z-[50] duration-200 ease-in-out ${scrolled ? 'bg-heading' : ''}`}>
      <Container>
        <div className={`pb-5 border-b border-[#F6F6F6] flex items-center justify-between duration-200 ease-in-out ${scrolled ? 'pt-5 border-none' : 'pt-10'}`}>
          <Link to={"/"}>
            <img className="w-[223px] h-[48px]" src={Logo} alt="logo" />
          </Link>
          <div className="flex items-center gap-[280px]">
            {/* menu  */}
            <ul className="flex items-center gap-[64px]">
              {menuItems.map((item) => (
                <li key={item?.name}>
                  <NavLink
                    to={`${item?.url}`}
                    className="inline-block text-[20px] text-white capitalize duration-200 ease-in-out hover:opacity-60"
                  >
                    {item.name}
                  </NavLink>
                </li>
              ))}
            </ul>
            {/* auth buttons  */}
            <div className="flex items-center gap-5">
              <Link
                to={"/login"}
                className="flex items-center gap-2 text-base text-white font-semibold duration-200 ease-in-out hover:opacity-70"
              >
                <span className="text-[18px]">
                  <FaRegUser />
                </span>
                Log in
              </Link>
              <Link
                to={"/sign-up"}
                className="flex items-center gap-2 text-base text-white font-semibold py-[10px] px-5 bg-primaryGreen rounded-[40px] duration-200 ease-in-out hover:bg-white hover:text-primaryGreen"
              >
                Sign up
                <span className="text-[18px] rotate-[-40deg]">
                  <FaArrowRight />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Navbar;

import { api } from "@/api";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link, NavLink } from "react-router-dom";
import Container from "../container/Container";
import { AuthContext } from "../context/index";

const Footer = () => {
  const { siteSettingsData } = useContext(AuthContext);

  const { data: socialData, isLoading: socialDataLoading } = useQuery({
    queryKey: ["socialData"],
    queryFn: async () => {
      const res = await api.get("/social-links");
      return res?.data?.data;
    },
  });

  return (
    <footer className="pt-[60px] custom-sm:pt-10 custom-xs:pt-10">
      <Container>
        <div className="flex flex-wrap items-start justify-between pb-[22px] border-b border-[#B3BAC5]">
          {/* footer box  */}
          <div className="mt-5">
            <Link to={"/"}>
              <img
                className="w-[223px] h-[48px]"
                src={`${import.meta.env.VITE_SERVER_URL}/${
                  siteSettingsData?.footer_logo
                }`}
                alt="footerLogo"
              />
            </Link>
            <p className="w-[500px] custom-sm:w-[90%] custom-xs:w-[100%] custom-sm:text-[17px] custom-sm:leading-normal custom-xs:text-[17px] custom-xs:leading-normal text-[20px] text-paragraph leading-[34px] mt-6 custom-xs:mt-4">
              {siteSettingsData?.description}
            </p>
          </div>
          {/* footer box  */}
          <div className="mt-5">
            <h4 className="text-[24px] custom-xs:text-[22px] custom-sm:text-[22px] font-bold text-heading leading-normal">
              Quick Links
            </h4>
            <ul>
              <li>
                <NavLink to={"/"} className="footer-link">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to={"/contact"} className="footer-link">
                  Contact Us
                </NavLink>
              </li>
              <li>
                <NavLink to={"/ship"} className="footer-link">
                  Ship Now
                </NavLink>
              </li>
              <li>
                <NavLink to={"/privacy-policy"} className="footer-link">
                  Privacy Policy
                </NavLink>
              </li>
            </ul>
          </div>
          {/* footer box  */}
          <div className="mt-5">
            <h4 className="text-[24px] custom-xs:text-[22px] custom-sm:text-[22px] font-bold text-heading leading-normal">
              Contact Us
            </h4>
            <p className="mt-6 custom-sm:mt-2 custom-xs:mt-2 text-[18px] w-[270px] text-paragraph">
              {siteSettingsData?.address}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between py-6 custom-xs:flex-col custom-xs:gap-3 custom-sm:flex-col custom-sm:gap-3">
          <p className="text-paragraph">{siteSettingsData?.copyright_text}</p>
          <ul className="flex items-center gap-3">
            {socialData?.map((item) => (
              <li key={item?.id}>
                <Link
                  to={`${item?.profile_link}`}
                  className="footer-social-link"
                >
                  {item?.social_media === "facebook" ? (
                    <FaFacebook />
                  ) : item?.social_media === "twitter" ? (
                    <FaXTwitter />
                  ) : item?.social_media === "linkedin" ? (
                    <FaLinkedin />
                  ) : item?.social_media === "instagram" ? (
                    <FaInstagram />
                  ) : item?.social_media === "youtube" ? (
                    <FaYoutube />
                  ) : null}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;

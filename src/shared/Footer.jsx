import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link, NavLink } from "react-router-dom";
import footerLogo from "../assets/logo/footer-logo.svg";
import Container from "../container/Container";

const Footer = () => {
  return (
    <footer className="pt-[60px]">
      <Container>
        <div className="flex items-start justify-between pb-[22px] border-b border-[#B3BAC5]">
          {/* footer box  */}
          <div className="mt-5">
            <Link to={"/"}>
              <img
                className="w-[223px] h-[48px]"
                src={footerLogo}
                alt="footerLogo"
              />
            </Link>
            <p className="w-[500px] text-[20px] text-paragraph leading-[34px] mt-6">
              Fairway Freight makes golf club shipping simple and stress-free.
              We offer reliable, cost-effective solutions to ensure your clubs
              arrive safely—so you can focus on the game.
            </p>
          </div>
          {/* footer box  */}
          <div className="mt-5">
            <h4 className="text-[24px] font-bold text-heading leading-normal">
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
            </ul>
          </div>
          {/* footer box  */}
          <div className="mt-5">
            <h4 className="text-[24px] font-bold text-heading leading-normal">
              Contact Us
            </h4>
            <p className="mt-6 text-[18px] w-[270px] text-paragraph">
              125 Park Avenue 35th Floor, New York, NY 10017.
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between py-6">
          <p className="text-paragraph">
            © 2025 Fairway Freight. All Right Reserved
          </p>
          <ul className="flex items-center gap-3">
            <li>
              <Link to={"/"} className="footer-social-link">
                <FaFacebook />
              </Link>
            </li>
            <li>
              <Link to={"/"} className="footer-social-link">
                <FaInstagram />
              </Link>
            </li>
            <li>
              <Link to={"/"} className="footer-social-link">
                <FaXTwitter />
              </Link>
            </li>
            <li>
              <Link to={"/"} className="footer-social-link">
                <FaLinkedin />
              </Link>
            </li>
            <li>
              <Link to={"/"} className="footer-social-link">
                <FaYoutube />
              </Link>
            </li>
          </ul>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;

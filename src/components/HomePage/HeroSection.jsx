import { Link } from "react-router-dom";
import HeroVideo from "../../assets/videos/hero-video.mp4";
import PrimaryButton from "../common/PrimaryButton";
import HeroSearchBar from "./HeroSearchBar";

const HeroSection = () => {
  return (
    <div className="relative overlay-section h-[700px] z-[1] pt-[220px] pb-[250px]">
      <video
        autoPlay
        muted
        loop
        className="h-full object-cover w-full absolute top-0 left-0 z-[-1]"
      >
        <source src={HeroVideo} />
      </video>
      <div className="relative z-[1] text-center">
        <h1 className="text-[96px] font-tungsten font-bold text-wrap leading-normal text-white">
          Hassle-Free Golf Club Shipping
        </h1>
        <p className="text-[32px] font-semibold text-white">Ship. Arrive. Tee Off .</p>
        <Link to={'/'} className="text-center inline-block mt-12">
            <PrimaryButton text="Ship Now" className="text-heading py-4 px-8 rounded-[60px] bg-white font-semibold hover:bg-primaryGreen hover:text-white hover:scale-[1.05]"/>
        </Link>
      </div>
      <div className="w-[1207px] mx-auto absolute z-[1] left-1/2 translate-x-[-50%] bottom-[-75px]">
        <HeroSearchBar />
      </div>
    </div>
  );
};

export default HeroSection;

import { Link } from "react-router-dom";
import PrimaryButton from "../common/PrimaryButton";
import HeroSearchBar from "./HeroSearchBar";

const HeroSection = ({data}) => {

  return (
    <div className="relative overlay-section h-[700px] z-[1] pt-[220px] custom-2xl:pt-[200px] custom-2xl:pb-[150px] custom-2xl:h-[640px] custom-xl:pt-[200px] custom-xl:pb-[150px] custom-xl:h-[640px] custom-lg:pb-[150px] custom-lg:h-[620px] pb-[250px] max-md:pt-[160px] max-md:h-[780px] custom-md:pb-[100px] custom-sm:!h-auto custom-xs:!h-auto custom-xs:!pt-[112px] custom-sm:pb-[70px] custom-xs:pb-[62px]">
      <video
        autoPlay
        muted
        loop
        className="h-full object-cover w-full absolute top-0 left-0 z-[-1]"
      >
        <source src={`${import.meta.env.VITE_SERVER_URL}/${data?.image_url}`} />
      </video>
      <div className="relative z-[1] text-center max-md:px-6">
        <h1 className="text-[96px] font-tungsten font-bold leading-normal text-white custom-2xl:text-[80px] custom-xl:text-[75px] custom-lg:text-[70px] custom-md:text-[54px] custom-sm:text-[42px] custom-xs:text-[34px] custom-xs:leading-normal break-words">
         {data?.title}
        </h1>
        <p className="text-[32px] custom-lg:text-[26px] custom-md:text-[26px] font-semibold text-white custom-sm:text-[22px] custom-xs:text-[20px] custom-xs:mt-3">{data?.sub_title}</p>
        <Link to={'/ship'} className="text-center inline-block mt-12 custom-xs:mt-[24px]">
            <PrimaryButton text="Ship Now" className="text-heading py-4 px-8 rounded-[60px] bg-white font-semibold hover:bg-primaryGreen hover:text-white hover:scale-[1.05] custom-xs:py-3 custom-xs:px-5 custom-xs:text-[15px]"/>
        </Link>
      </div>
      <div className="w-[1207px] custom-xl:w-[1100px] custom-lg:w-[90%] mx-auto relative z-[1] bottom-[-105px] max-md:w-[90%] custom-sm:bottom-0 custom-sm:mt-10 custom-xs:bottom-0 custom-xs:mt-10">
        <HeroSearchBar />
      </div>
    </div>
  );
};

export default HeroSection;

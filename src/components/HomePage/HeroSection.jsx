import { Link } from "react-router-dom";
import PrimaryButton from "../common/PrimaryButton";
import HeroSearchBar from "./HeroSearchBar";

const HeroSection = ({data}) => {

  return (
    <div className="relative overlay-section h-[700px] z-[1] pt-[220px] custom-2xl:pt-[200px] custom-2xl:pb-[150px] custom-2xl:h-[640px] custom-xl:pt-[200px] custom-xl:pb-[150px] custom-xl:h-[640px] custom-lg:pb-[150px] custom-lg:h-[620px] pb-[250px] max-md:pt-[160px] max-md:h-[780px] max-md:pb-[100px]">
      <video
        autoPlay
        muted
        loop
        className="h-full object-cover w-full absolute top-0 left-0 z-[-1]"
      >
        <source src={`${import.meta.env.VITE_SERVER_URL}/${data?.image_url}`} />
      </video>
      <div className="relative z-[1] text-center max-md:px-6">
        <h1 className="text-[96px] font-tungsten font-bold leading-normal text-white custom-2xl:text-[80px] custom-xl:text-[75px] custom-lg:text-[70px] custom-md:text-[60px] break-words">
         {data?.title}
        </h1>
        <p className="text-[32px] custom-lg:text-[26px] font-semibold text-white">{data?.sub_title}</p>
        <Link to={'/ship'} className="text-center inline-block mt-12">
            <PrimaryButton text="Ship Now" className="text-heading py-4 px-8 rounded-[60px] bg-white font-semibold hover:bg-primaryGreen hover:text-white hover:scale-[1.05]"/>
        </Link>
      </div>
      <div className="w-[1207px] custom-xl:w-[1100px] custom-lg:w-[90%] mx-auto absolute z-[1] left-1/2 translate-x-[-50%] bottom-[-75px] max-md:w-[90%]">
        <HeroSearchBar />
      </div>
    </div>
  );
};

export default HeroSection;

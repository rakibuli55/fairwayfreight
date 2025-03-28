import { useContext } from "react";
import HeroSection from "../components/HomePage/HeroSection";
import HowItWorks from "../components/HomePage/HowItWorks";
import OurServicesSection from "../components/HomePage/OurServicesSection";
import ReferSection from "../components/HomePage/ReferSection";
import ReviewPartnerSection from "../components/HomePage/ReviewPartnerSection";
import NewsLatterSection from "../components/common/NewsLatterSection";
import Preloader from "../components/common/Preloader";
import { AuthContext } from "../context/index";

const HomePage = () => {
  const { homePagedata, homeDataLoading } = useContext(AuthContext);

  if (homeDataLoading) {
    return <Preloader />;
  }
  return (
    <div>
      <HeroSection data={homePagedata?.hero_section} />
      <ReviewPartnerSection reviewData={homePagedata?.review_section} />
      <div className="bg-sectionLight py-[120px] custom-2xl:py-[100px] custom-xl:py-[100px] custom-lg:py-[100px] custom-md:py-20 custom-sm:!py-[60px] custom-xs:!py-[60px]">
        <HowItWorks worksData={homePagedata?.working_process} />
      </div>
      <OurServicesSection servicesData={homePagedata?.services} />
      <ReferSection referData={homePagedata?.refer_section} />
      <NewsLatterSection newsLatterData={homePagedata?.subscription_section} />
    </div>
  );
};

export default HomePage;

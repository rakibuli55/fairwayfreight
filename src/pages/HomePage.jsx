import React from "react";
import HeroSection from "../components/HomePage/HeroSection";
import HowItWorks from "../components/HomePage/HowItWorks";
import OurServicesSection from "../components/HomePage/OurServicesSection";
import ReferSection from "../components/HomePage/ReferSection";
import ReviewPartnerSection from "../components/HomePage/ReviewPartnerSection";
import NewsLatterSection from "../components/common/NewsLatterSection";

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <ReviewPartnerSection />
      <div className="bg-sectionLight py-[120px]">
        <HowItWorks />
      </div>
      <OurServicesSection />
      <ReferSection />
      <NewsLatterSection />
    </>
  );
};

export default HomePage;

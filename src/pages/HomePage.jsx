import React from "react";
import HeroSection from "../components/HomePage/HeroSection";
import HowItWorks from "../components/HomePage/HowItWorks";
import OurServicesSection from "../components/HomePage/OurServicesSection";
import ReferSection from "../components/HomePage/ReferSection";
import ReviewPartnerSection from "../components/HomePage/ReviewPartnerSection";
import NewsLatterSection from "../components/common/NewsLatterSection";
import { useQuery } from "@tanstack/react-query";
import { api } from "../api/index";
import Preloader from "../components/common/Preloader";

const HomePage = () => {
  const {data:homePagedata, isLoading:homeDataLoading} = useQuery({
    queryKey:['homepageData'],
    queryFn: async () => {
      const res = await api.get('/get-home');
      return res?.data?.data;
    }
  });
  console.log(homePagedata);

  if(homeDataLoading){
    return <Preloader />
  }
  return (
    <>
      <HeroSection data={homePagedata?.hero_section} />
      <ReviewPartnerSection data={homePagedata?.review_section} />
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

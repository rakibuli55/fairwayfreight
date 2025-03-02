import React from 'react';
import HeroSection from '../components/HomePage/HeroSection';
import ReviewPartnerSection from '../components/HomePage/ReviewPartnerSection';
import HowItWorks from '../components/HomePage/HowItWorks';
import OurServicesSection from '../components/HomePage/OurServicesSection';
import ReferSection from '../components/HomePage/ReferSection';
import NewsLatterSection from '../components/common/NewsLatterSection';

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <ReviewPartnerSection />
      <HowItWorks />
      <OurServicesSection />
      <ReferSection />
      <NewsLatterSection />
    </>
  );
};

export default HomePage;
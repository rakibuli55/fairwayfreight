import ClaimSection from '@/components/HelpPage/ClaimSection';
import FaqSection from '../components/HelpPage/FaqSection';
import HelpSection from '../components/HelpPage/HelpSection';
import React from 'react';
import NewsLatterSection from '@/components/common/NewsLatterSection';

const HelpPage = () => {
  return (
    <>
      <HelpSection />
      <FaqSection />
      <ClaimSection />
      <NewsLatterSection />
    </>
  );
};

export default HelpPage;
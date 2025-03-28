import ClaimSection from '../components/HelpPage/ClaimSection';
import FaqSection from '../components/HelpPage/FaqSection';
import HelpSection from '../components/HelpPage/HelpSection';
import React, { useContext } from 'react';
import NewsLatterSection from '../components/common/NewsLatterSection';
import { AuthContext } from '../context/index';

const HelpPage = () => {
  const {homePagedata, homeDataLoading} = useContext(AuthContext)
  return (
    <>
      <HelpSection />
      <FaqSection />
      <ClaimSection />
      <NewsLatterSection newsLatterData={homePagedata?.subscription_section} />
    </>
  );
};

export default HelpPage;
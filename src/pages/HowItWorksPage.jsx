import { useContext } from "react";
import NewsLatterSection from "../components/common/NewsLatterSection";
import HowItWorks from "../components/HomePage/HowItWorks";
import { AuthContext } from "../context/index";

const HowItWorksPage = () => {
  const { homePagedata, homeDataLoading } = useContext(AuthContext);
  return (
    <>
      <div className="pt-[225px] pb-[10px] custom-md:pt-[150px] custom-sm:pt-[130px] custom-xs:pt-[120px]">
        <HowItWorks worksData={homePagedata?.working_process} />
      </div>
      <NewsLatterSection newsLatterData={homePagedata?.subscription_section} />
    </>
  );
};

export default HowItWorksPage;

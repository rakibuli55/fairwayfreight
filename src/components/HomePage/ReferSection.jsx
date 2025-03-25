import Container from "../../container/Container"
import PrimaryButton from "../common/PrimaryButton";
import { Link } from "react-router-dom";
import DOMPurify from "dompurify";

const ReferSection = ({referData}) => {
  return (
    <section className='pt-[120px] pb-[135px] custom-xl:pt-[90px] custom-xl:pb-[110px] relative overlay-section bg-no-repeat bg-cover max-md:py-20 custom-xs:!py-[60px]' style={{ backgroundImage:`url(${import.meta.env.VITE_SERVER_URL}/${referData.background_image})` }}>
      <Container>
        <div className="relative z-[1]">
          <h3 className='text-[64px] custom-xl:text-[60px] max-md:text-[38px] font-bold font-tungsten leading-normal text-white w-[622px] mx-auto text-center max-md:w-[70%] max-md:mb-8 custom-sm:!w-full custom-xs:!w-full custom-xs:!text-[34px]' dangerouslySetInnerHTML={{__html:DOMPurify.sanitize(referData?.title)}}></h3> 
          <Link to={'/'}>
            <PrimaryButton text="Ship Now" className="py-4 px-12 rounded-[40px] bg-white border border-white font-semibold duration-200 ease-in-out hover:scale-[1.05] hover:bg-transparent w-fit mx-auto hover:text-white mt-5 max-md:py-3 max-md:px-5" />
          </Link>
        </div>
      </Container>
    </section>
  );
};

export default ReferSection;
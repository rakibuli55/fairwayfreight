import React from 'react';
import Container from '../../container/Container';
import Title from '../common/Title';
import HowItWorksCard from './HowItWorksCard';

const HowItWorks = ({worksData}) => {
  return (
    <section>
      <Container>
        <div>
            {/* title  */}
            <Title title="The Fairway Freight Process" subTitle="HOW IT WORKS" btnText="Ship Now"/>
            {/* works step  */}
            <div className='grid grid-cols-4 custom-lg:grid-cols-2 bg-white py-[56px] custom-xl:py-10 rounded-[16px] works-step-wrapper mt-12 max-md:mt-8 custom-lg:pt-7 max-md:grid-cols-2  custom-sm:!grid-cols-1 custom-xs:!grid-cols-1 max-md:pt-5 max-md:pb-10 custom-xs:!pt-1 custom-xs:!pb-8'>
                {
                    worksData?.steps?.map((item) => (
                        <HowItWorksCard key={item?.id} item={item} />
                    ))
                }
            </div>
            <div className='mt-12 custom-sm:mt-6 custom-xs:mt-6 h-[660px] custom-2xl:h-[550px] custom-xl:h-[550px] custom-lg:h-[550px] custom-md:h-[400px] overflow-hidden rounded-[16px] custom-sm:h-[320px] custom-xs:h-[280px]'>
                <img className='w-full h-full object-cover rounded-[16px] hover:scale-[1.1] duration-200 ease-in-out' src={`${import.meta.env.VITE_SERVER_URL}/${worksData?.background_image}`} alt="img" />
            </div>
        </div>
      </Container>
    </section>
  );
};

export default HowItWorks;
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
            <div className='grid grid-cols-4 custom-lg:grid-cols-2 bg-white py-[56px] custom-xl:py-10 rounded-[16px] works-step-wrapper mt-12 custom-lg:pt-7'>
                {
                    worksData?.steps?.map((item) => (
                        <HowItWorksCard key={item?.id} item={item} />
                    ))
                }
            </div>
            <div className='mt-12 h-[660px] custom-2xl:h-[550px] custom-xl:h-[550px] custom-lg:h-[550px] overflow-hidden rounded-[16px]'>
                <img className='w-full h-full object-cover rounded-[16px] hover:scale-[1.1] duration-200 ease-in-out' src={`${import.meta.env.VITE_SERVER_URL}/${worksData?.background_image}`} alt="img" />
            </div>
        </div>
      </Container>
    </section>
  );
};

export default HowItWorks;
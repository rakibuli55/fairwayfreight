import React from 'react';
import Container from '../../container/Container';
import Title from '../common/Title';
import HowItWorksCard from './HowItWorksCard';
import bannerImg from "../../assets/images/how-it-works.png"

const HowItWorks = ({worksData}) => {
  return (
    <section>
      <Container>
        <div>
            {/* title  */}
            <Title title="The Fairway Freight Process" subTitle="HOW IT WORKS" btnText="Ship Now"/>
            {/* works step  */}
            <div className='flex bg-white py-[56px] rounded-[16px] works-step-wrapper mt-12'>
                {
                    worksData?.steps?.map((item) => (
                        <HowItWorksCard key={item?.id} item={item} />
                    ))
                }
            </div>
            <div className='mt-12 h-[660px] overflow-hidden rounded-[16px]'>
                <img className='w-full h-full object-cover rounded-[16px] hover:scale-[1.1] duration-200 ease-in-out' src={`${import.meta.env.VITE_SERVER_URL}/${worksData?.background_image}`} alt="img" />
            </div>
        </div>
      </Container>
    </section>
  );
};

export default HowItWorks;
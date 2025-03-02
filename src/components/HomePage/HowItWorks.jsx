import React from 'react';
import Container from '../../container/Container';
import Title from '../common/Title';
import step1 from "../../assets/icons/order.svg"
import step2 from "../../assets/icons/print.svg"
import step3 from "../../assets/icons/travel.svg"
import step4 from "../../assets/icons/get-ready.svg"
import HowItWorksCard from './HowItWorksCard';
import bannerImg from "../../assets/images/how-it-works.png"

const cardsData = [
    {
        id:1,
        icon:step1,
        title:'1. Order',
        description:'Easily ship your golf clubs with Fairway Freight—pick your trip dates and set up your shipment.'
    },
    {
        id:2,
        icon:step2,
        title:'2. Print & Stick the Label',
        description:'You’ll receive the shipping label via email. Just print it and securely attach it to your golf clubs.'
    },
    {
        id:3,
        icon:step3,
        title:'3. Enjoy Smooth Travel',
        description:'We’ll handle your golf clubs, or you can drop them off. Breeze through your journey and avoid baggage claim!'
    },
    {
        id:4,
        icon:step4,
        title:'4. Get Ready & Tee-Off',
        description:'Your golf clubs will be delivered ahead of time to your golf course or hotel. It’s time to hit the green!'
    },
]

const HowItWorks = () => {
  return (
    <section className='py-[120px] bg-sectionLight'>
      <Container>
        <div>
            {/* title  */}
            <Title title="The Fairway Freight Process" subTitle="HOW IT WORKS" btnText="Ship Now"/>
            {/* works step  */}
            <div className='flex bg-white py-[56px] rounded-[16px] works-step-wrapper mt-12'>
                {
                    cardsData?.map((item) => (
                        <HowItWorksCard key={item?.id} item={item} />
                    ))
                }
            </div>
            <div className='mt-12 h-[660px] overflow-hidden rounded-[16px]'>
                <img className='w-full h-full object-cover rounded-[16px] hover:scale-[1.1] duration-200 ease-in-out' src={bannerImg} alt="img" />
            </div>
        </div>
      </Container>
    </section>
  );
};

export default HowItWorks;
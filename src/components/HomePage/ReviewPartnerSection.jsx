import React from 'react';
import Container from '../../container/Container';
import ClientReview from './ClientReview';
import Partner from './Partner';

const ReviewPartnerSection = ({reviewData}) => {
  return (
    <section className='pt-[193px] pb-[120px] custom-md:pt-[150px] custom-md:pb-[65px] custom-sm:pb-[60px] custom-sm:pt-[130px] custom-xs:pb-[50px] custom-xs:pt-[60px]'>
      <Container>
        {/* review  */}
        <div className='flex items-center justify-center'>
            <ClientReview data={reviewData} />
        </div>
        <p className='text-[24px] font-bold text-paragraph pt-[26px] custom-xs:pt-4 pb-4 text-center custom-sm:text-[20px] custom-sm:w-[90%] custom-sm:mx-auto custom-xs:w-[90%] custom-xs:mx-auto custom-xs:text-[18px]'>{reviewData?.title}</p>
        <Partner data={reviewData} />
      </Container>
    </section>
  );
};

export default ReviewPartnerSection;
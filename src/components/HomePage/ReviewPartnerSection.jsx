import React from 'react';
import Container from '../../container/Container';
import ClientReview from './ClientReview';
import Partner from './Partner';

const ReviewPartnerSection = ({data}) => {
  return (
    <section className='pt-[193px] pb-[120px]'>
      <Container>
        {/* review  */}
        <div className='flex items-center justify-center'>
            <ClientReview />
        </div>
        <p className='text-[24px] font-bold text-paragraph pt-[26px] pb-4 text-center'>Fairway Freight is trusted by 500+ brands worldwide</p>
        <Partner />
      </Container>
    </section>
  );
};

export default ReviewPartnerSection;
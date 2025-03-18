import React from 'react';
import Container from '../../container/Container';
import ClientReview from './ClientReview';
import Partner from './Partner';

const ReviewPartnerSection = ({reviewData}) => {
  return (
    <section className='pt-[193px] pb-[120px]'>
      <Container>
        {/* review  */}
        <div className='flex items-center justify-center'>
            <ClientReview data={reviewData} />
        </div>
        <p className='text-[24px] font-bold text-paragraph pt-[26px] pb-4 text-center'>{reviewData?.title}</p>
        <Partner data={reviewData} />
      </Container>
    </section>
  );
};

export default ReviewPartnerSection;
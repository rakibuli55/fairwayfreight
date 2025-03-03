import React from 'react';
import quote from "../../assets/icons/quote.svg"

const TestimonialCard = ({message, client}) => {
  return (
    <div className='my-12 py-[45px] px-[145px] bg-white shadow-[0px_10px_29px_2px_rgba(0,0,0,0.10)] border-l-[4px] border-primaryGreen text-center'>
      <img className='w-[82px] h-[82px] rounded-full mx-auto mb-6' src={quote} alt="quote" />
      <div>
        <h3 className='text-[32px] font-bold text-heading leading-normal'>{message}</h3>
        <p className='text-[18px] capitalize text-primaryGreen font-bold mt-6'>{client}</p>
      </div>
    </div>
  );
};

export default TestimonialCard;
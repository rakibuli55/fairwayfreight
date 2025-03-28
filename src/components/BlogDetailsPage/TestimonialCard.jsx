import React from 'react';
import quote from "../../assets/icons/quote.svg"

const TestimonialCard = ({message, client}) => {
  return (
    <div className='my-12 custom-xs:my-8 py-[45px] px-[145px] bg-white shadow-[0px_10px_29px_2px_rgba(0,0,0,0.10)] border-l-[4px] border-primaryGreen text-center custom-xl:px-[60px] custom-lg:px-[60px] max-md:p-10 custom-sm:!p-5 custom-xs:!p-5'>
      <img className='w-[82px] h-[82px] custom-md:w-[55px] custom-md:h-[55px] custom-md:mb-3 custom-sm:w-[55px] custom-sm:h-[55px] custom-sm:mb-3 custom-xs:w-[55px] custom-xs:h-[55px] custom-xs:mb-3 rounded-full mx-auto mb-6' src={quote} alt="quote" />
      <div>
        <h3 className='text-[32px] font-bold text-heading leading-normal custom-xl:text-[26px] custom-lg:text-[24px] custom-md:text-[22px] custom-sm:text-[20px] custom-xs:text-[18px]'>{message}</h3>
        <p className='text-[18px] capitalize text-primaryGreen font-bold mt-6'>{client}</p>
      </div>
    </div>
  );
};

export default TestimonialCard;
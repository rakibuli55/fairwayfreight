import DOMPurify from 'dompurify';

const ServiceCard = ({item}) => {
  return (
    <div className={`flex max-md:!flex-col items-center gap-[150px] max-md:gap-8 custom-2xl:gap-20 custom-xl:gap-[60px] custom-lg:gap-10 service-card custom-xs:!gap-6 ${item?.isReversed ? 'flex-row-reverse' : ''}`}>
     <div className="h-[525px] custom-xl:h-[480px] max-md:h-[400px] rounded-[20px] overflow-hidden img w-[50%] max-md:w-full custom-xs:!h-[290px]">
        <img className="w-full h-full object-cover duration-200 ease-in-out" src={`${import.meta.env.VITE_SERVER_URL}/${item?.image}`} alt="img" />
     </div>
     <div className="w-[50%] max-md:w-full">
        <h3 className="text-[32px] max-md:text-[26px] font-bold leading-normal text-heading custom-xs:!text-[22px]">{item?.title}</h3>
        <p className="text-[18px] leading-[28px] text-heading mt-2" dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(item?.description)}}></p>
        <p className="w-[91px] h-[3px] bg-primaryGreen mt-7 custom-xs:w-[50px]"></p>
     </div>
    </div>
  );
};

export default ServiceCard;
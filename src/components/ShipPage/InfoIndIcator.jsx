import { BiSolidLeftArrow } from "react-icons/bi";

const InfoIndIcator = ({text}) => {
  return (
    <div className='py-6 px-5 max-md:py-[11px] max-md:px-4 bg-heading rounded-[12px] text-[18px] text-white shipment-info-indicator relative w-fit custom-xs:text-sm custom-sm:text-sm'>
      {text}
      <p className="absolute top-1/2 translate-y-[-50%] left-[-26px] max-md:left-[-18px] text-heading text-[35px] max-md:text-[24px] custom-xs:!left-2 custom-sm:!left-2 custom-sm:top-[-3px] custom-sm:rotate-[90deg] custom-xs:top-[-3px] custom-xs:rotate-[90deg]">
      <BiSolidLeftArrow />
      </p>
    </div>
  );
};

export default InfoIndIcator;
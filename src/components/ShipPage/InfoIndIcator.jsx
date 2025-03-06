import { BiSolidLeftArrow } from "react-icons/bi";

const InfoIndIcator = ({text}) => {
  return (
    <div className='py-6 px-5 bg-heading rounded-[12px] text-[18px] text-white shipment-info-indicator relative w-fit'>
      {text}
      <p className="absolute top-1/2 translate-y-[-50%] left-[-26px] text-heading text-[35px]">
      <BiSolidLeftArrow />
      </p>
    </div>
  );
};

export default InfoIndIcator;
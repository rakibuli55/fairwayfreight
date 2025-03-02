

const ServiceCard = ({item}) => {
  return (
    <div className={`flex items-center gap-[150px] service-card ${item?.isReversed ? 'flex-row-reverse' : ''}`}>
     <div className="h-[525px] rounded-[20px] overflow-hidden img w-[50%]">
        <img className="w-full h-full object-cover duration-200 ease-in-out" src={item?.image} alt="img" />
     </div>
     <div className="w-[50%]">
        <h3 className="text-[32px] font-bold leading-normal text-heading">{item?.title}</h3>
        <p className="text-[18px] leading-[28px] text-heading mt-2">{item?.description}</p>
        <p className="w-[91px] h-[3px] bg-primaryGreen mt-7"></p>
     </div>
    </div>
  );
};

export default ServiceCard;
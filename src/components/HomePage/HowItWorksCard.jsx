const HowItWorksCard = ({item}) => {
  return (
    <div className="px-[56px] text-center works-step">
        <div className="w-[64px] h-[64px] bg-primaryGreen rounded-full mx-auto flex items-center justify-center">
            <img className="max-w-[36px] max-h-[36px]" src={item?.icon} alt="" />
        </div>
        <h3 className="text-[24px] font-bold text-primaryGreen mt-[14px] leading-normal">{item?.title}</h3>
        <p className="text-[18px] text-paragraph leading-[28px] mt-2">{item?.description}</p>
    </div>
  )
};

export default HowItWorksCard;

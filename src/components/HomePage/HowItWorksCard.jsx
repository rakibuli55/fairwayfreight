const HowItWorksCard = ({item}) => {
  return (
    <div className="px-[56px] extra-large:px-10 custom-2xl:px-7 custom-xl:px-5 text-center works-step">
        <div className="w-[64px] h-[64px] bg-primaryGreen rounded-full mx-auto flex items-center justify-center">
            <img className="max-w-[36px] max-h-[36px]" src={`${import.meta.env.VITE_SERVER_URL}/${item?.icon}`} alt="" />
        </div>
        <h3 className="text-[24px] custom-xl:text-[22px] font-bold text-primaryGreen mt-[14px] leading-normal">{`${item?.id}`}. {item?.title}</h3>
        <p className="text-[18px] text-paragraph leading-[28px] mt-2">{item?.description}</p>
    </div>
  )
};

export default HowItWorksCard;



const ClaimCard = ({item}) => {
  return (
    <div className="py-[30px] max-md:py-5 border-b border-[#B3BAC5] claim-card">
      <h4 className="text-[32px] font-bold text-heading max-md:text-[24px] custom-xs:!text-[22px]">{item?.title}</h4>
      <p className="mt-5 text-[20px] text-paragraph leading-[32px] max-md:text-[18px] max-md:mt-1 custom-xs:leading-normal custom-xs:!text-[17px]">{item?.description}</p>
    </div>
  );
};

export default ClaimCard;
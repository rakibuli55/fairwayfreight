

const ClaimCard = ({item}) => {
  return (
    <div className="py-[30px] border-b border-[#B3BAC5] claim-card">
      <h4 className="text-[32px] font-bold text-heading">{item?.title}</h4>
      <p className="mt-5 text-[20px] text-paragraph leading-[32px]">{item?.description}</p>
    </div>
  );
};

export default ClaimCard;
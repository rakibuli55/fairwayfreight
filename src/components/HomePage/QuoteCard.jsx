

const QuoteCard = ({item}) => {
  return (
    <div className="flex items-center gap-3">
      <img className="w-[70px] h-[70px] object-cover rounded-full" src={item?.provider_image_200} alt="" />
      <div>
        <h4 className="text-[20px] font-semibold text-heading mb-2">{item?.provider}</h4>
        <p className="text-sm font-semibold text-heading">${item?.amount} each way</p>
        <p>{item?.estimated_days}</p>
      </div>
    </div>
  );
};

export default QuoteCard;
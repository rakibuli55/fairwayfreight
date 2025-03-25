import logo from "../../assets/logo/fairway-logo-circle.png"
const QuoteCard = ({ rate }) => {
  return (
    <div className="py-3 px-4 border rounded-[8px] relative">
      <div className="flex items-start gap-4">
        <img
          className="min-w-[60px] max-w-[60px] h-[60px] object-cover rounded-full"
          src={logo}
          alt=""
        />
        <div>
          <h4 className="text-[20px] font-semibold text-heading mb-1">
            {rate?.servicelevel?.display_name}
          </h4>
          <p className="text-base text-heading font-semibold">
            <span className="font-bold">${rate?.amount}</span> each way
          </p>
          <p>{rate?.estimated_days} business day</p>
          {rate?.duration_terms && <p className="mt-2">{rate.duration_terms}</p>}
        </div>
        {rate?.attributes && rate?.attributes.length > 0 && (
          <p className="absolute top-2 right-2 text-[10px] bg-primaryGreen text-white py-[2px] px-2 rounded-[3px]">
            {rate?.attributes?.join(",")}
          </p>
        )}
      </div>
    </div>
  );
};

export default QuoteCard;

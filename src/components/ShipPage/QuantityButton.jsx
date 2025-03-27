
import { FiPlus } from "react-icons/fi";
import { FiMinus } from "react-icons/fi";

const QuantityButton = ({quantity, onIncrease, onDecrease, type}) => {
  return (
    <div className='py-5 px-10 max-md:py-[6px] max-md:px-5 border border-[#B3BAC5] rounded-[12px] w-fit flex items-center gap-5 custom-xs:!py-1 custom-xs:!px-3 custom-xs:rounded-[8px] custom-sm:!py-1 custom-sm:!px-3 custom-sm:rounded-[8px]'>
      <button type="button" className="text-[20px]" onClick={() => onDecrease(event, type)}><FiMinus /></button>
      <p className="text-[24px] font-semibold custom-xs:text-[20px] custom-sm:text-[20px]">{quantity}</p>
      <button type="button" className="text-[20px]" onClick={() => onIncrease(event, type)}><FiPlus /></button>
    </div>
  );
};

export default QuantityButton;
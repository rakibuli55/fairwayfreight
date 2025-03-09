
import { FiPlus } from "react-icons/fi";
import { FiMinus } from "react-icons/fi";

const QuantityButton = ({quantity, onIncrease, onDecrease, type}) => {
  return (
    <div className='py-5 px-10 border border-[#B3BAC5] rounded-[12px] w-fit flex items-center gap-5'>
      <button type="button" className="text-[20px]" onClick={() => onDecrease(event, type)}><FiMinus /></button>
      <p className="text-[24px] font-semibold">{quantity}</p>
      <button type="button" className="text-[20px]" onClick={() => onIncrease(event, type)}><FiPlus /></button>
    </div>
  );
};

export default QuantityButton;
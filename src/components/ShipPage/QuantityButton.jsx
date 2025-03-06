
import { FiPlus } from "react-icons/fi";
import { FiMinus } from "react-icons/fi";

const QuantityButton = () => {
  return (
    <div className='py-5 px-10 border border-[#B3BAC5] rounded-[12px] w-fit flex items-center gap-5'>
      <button className="text-[20px]"><FiPlus /></button>
      <p className="text-[24px] font-semibold">1</p>
      <button className="text-[20px]"><FiMinus /></button>
    </div>
  );
};

export default QuantityButton;
import { FaArrowRight } from "react-icons/fa6";

const PrimaryButton = ({ text, className }) => {
  return (
    <div className={`${className} flex items-center gap-2 custom-xs:gap-1 duration-200 ease-in-out`}>
      {text}
      <span className="text-[18px] rotate-[-40deg] custom-xs:text-sm">
        <FaArrowRight />
      </span>
    </div>
  );
};

export default PrimaryButton;

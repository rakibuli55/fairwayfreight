import { FaArrowRight } from "react-icons/fa6";

const PrimaryButton = ({ text, className }) => {
  return (
    <div className={`${className} flex items-center gap-2 duration-200 ease-in-out`}>
      {text}
      <span className="text-[18px] rotate-[-40deg]">
        <FaArrowRight />
      </span>
    </div>
  );
};

export default PrimaryButton;

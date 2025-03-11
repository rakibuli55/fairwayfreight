import { FaArrowLeft } from "react-icons/fa6";

const BackButton = () => {
  return (
    <div className="w-10 h-10 flex items-center justify-center rounded-full border border-primaryGreen text-primaryGreen duration-200 ease-in-out hover:bg-primaryGreen hover:text-white cursor-pointer">
      <FaArrowLeft />
    </div>
  );
};

export default BackButton;
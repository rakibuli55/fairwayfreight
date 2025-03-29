import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const BackButton = () => {

  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);  
  };

  return (
    <div className="w-10 h-10 custom-xs:w-8 custom-xs:h-8 flex items-center justify-center rounded-full border border-primaryGreen text-primaryGreen duration-200 ease-in-out hover:bg-primaryGreen hover:text-white cursor-pointer" onClick={handleBack}>
      <FaArrowLeft />
    </div>
  );
};

export default BackButton;
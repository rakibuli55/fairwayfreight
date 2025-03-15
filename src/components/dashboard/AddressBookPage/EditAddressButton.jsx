import { Link } from "react-router-dom";

const EditAddressButton = ({ text, icon, type }) => {
  return (
    <button type="button" className="py-[10px] px-5 border boder-[#B3BAC5] rounded-[12px] w-full flex items-center justify-between">
      <p className="flex items-center gap-2 text-[22px] font-semibold">
        <span>{icon}</span>
        <span>{text}</span>
      </p>
      <Link to={"/"} className="flex items-center text-primaryGreen font-bold">+ Edit Address</Link>
    </button>
  );
};

export default EditAddressButton;

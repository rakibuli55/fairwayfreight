const EditAddressButton = ({ text, icon }) => {
  return (
    <button
      type="button"
      className="py-[10px] custom-xs:py-[6px] custom-xs:px-4 px-5 border boder-[#B3BAC5] rounded-[12px] w-full flex items-center justify-between"
    >
      <p className="flex items-center gap-2 text-[22px] custom-xs:text-[18px] font-semibold">
        <span>{icon}</span>
        <span>{text}</span>
      </p>
    </button>
  );
};

export default EditAddressButton;

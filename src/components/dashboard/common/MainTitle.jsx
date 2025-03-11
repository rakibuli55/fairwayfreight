

const MainTitle = ({text}) => {
  return (
    <div className="relative">
      <p className="text-[20px] font-bold text-heading pr-6 bg-white absolute top-1/2 translate-y-[-50%]">{text}</p>
      <p className="w-full h-[1px] bg-[#616161]"></p>
    </div>
  );
};

export default MainTitle;
const TitleV2 = ({ subTitle, title, description }) => {
  return (
    <div className="text-center">
      <p className="text-sm uppercase font-bold text-primaryGreen">
        {subTitle}
      </p>
      <h2 className="text-[64px] font-bold text-heading font-tungsten leading-normal mt-[5px] mb-2">
        {title}
      </h2>
      <p className="text-[18px] leading-[28px] text-heading w-[842px] mx-auto">
        {description}
      </p>
    </div>
  );
};

export default TitleV2;

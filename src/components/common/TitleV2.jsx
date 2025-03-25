const TitleV2 = ({ subTitle, title, description }) => {
  return (
    <div className="text-center">
      <p className="text-sm uppercase font-bold text-primaryGreen">
        {subTitle}
      </p>
      <h2 className="text-[64px] custom-xl:text-[54px] custom-lg:text-[54px] font-bold text-heading font-tungsten leading-normal mt-[5px] mb-2 max-md:text-[34px]">
        {title}
      </h2>
      <p className="text-[18px] leading-[28px] text-heading w-[842px] mx-auto max-md:w-[90%] custom-xs:!w-full">
        {description}
      </p>
    </div>
  );
};

export default TitleV2;

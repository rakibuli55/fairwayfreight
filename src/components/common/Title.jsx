import PrimaryButton from "./PrimaryButton";

const Title = ({ title, subTitle, btnText }) => {
  return (
    <div className="flex items-center justify-between custom-sm:block custom-xs:block">
        <div>
            <p className="text-sm font-bold text-primaryGreen uppercase mb-1">{subTitle}</p>
            <h2 className="text-[64px] custom-xl:text-[54px] custom-lg:text-[54px] font-bold text-heading font-tungsten max-md:text-[34px] custom-xs:!text-[30px]">{title}</h2>
        </div>
        <div>
            <PrimaryButton text={btnText} className="py-4 px-8 rounded-[40px] bg-primaryGreen border border-primaryGreen text-white hover:text-primaryGreen hover:bg-white hover:scale-[1.05] capitalize font-semibold max-md:py-3 max-md:px-5 custom-xs:w-fit custom-sm:!py-2 custom-sm:px-5 custom-sm:text-[15px] custom-sm:mt-5 custom-xs:!py-2 custom-xs:px-5 custom-xs:text-[15px] custom-xs:mt-5" />
        </div>
    </div>
  )
};

export default Title;

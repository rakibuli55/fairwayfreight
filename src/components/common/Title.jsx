import PrimaryButton from "./PrimaryButton";

const Title = ({ title, subTitle, btnText }) => {
  return (
    <div className="flex items-center justify-between">
        <div>
            <p className="text-sm font-bold text-primaryGreen uppercase mb-1">{subTitle}</p>
            <h2 className="text-[64px] custom-xl:text-[54px] custom-lg:text-[54px] font-bold text-heading font-tungsten">{title}</h2>
        </div>
        <div>
            <PrimaryButton text={btnText} className="py-4 px-8 rounded-[40px] bg-primaryGreen border border-primaryGreen text-white hover:text-primaryGreen hover:bg-white hover:scale-[1.05] capitalize font-semibold" />
        </div>
    </div>
  )
};

export default Title;


import newsLatterBanner from "../../assets/images/how-it-works.png"
import newsLatterShapeRight from "../../assets/images/shape-newslatter-right.png"
import PrimaryButton from "./PrimaryButton";

const NewsLatterSection = () => {
  return (
    <section className="mt-[110px]">
     <div className='flex justify-start items-start gap-[34px] relative'>
        <div className='w-[1009px] h-[697px] overflow-hidden rounded-image newslatter-image'>
            <img className='w-full h-full object-cover banner-img' src={newsLatterBanner} alt="newsLatterBanner" />
        </div>
        <div className='absolute right-0 top-0 bottom-0 w-[987px]'>
            <img className="w-full h-[740px] right-0 absolute top-0 bottom-0" src={newsLatterShapeRight} alt="" />
            <div className="z-[1] absolute right-[200px] top-1/2 translate-y-[-50%]">
                <h4 className="text-[48px] font-tungsten font-bold text-heading">Stay Updated</h4>
                <p className="text-[18px] text-paragraph mt-1">Sign up today for golf news, promotions, and special discounts.</p>
                <form className="w-[484px]">
                    <input type="email" placeholder="Enter your email" className="py-4 px-[30px] w-full bg-white text-heading border border-[#B3BAC5] rounded-[100px] mt-9 mb-6" />
                    <button type="submit">
                        <PrimaryButton text="Subscribe" className="py-4 px-[42px] text-white font-semibold rounded-[40px] bg-primaryGreen border border-primaryGreen duration-200 ease-in-out hover:bg-transparent hover:text-primaryGreen text-base hover:scale-[1.05]" />
                    </button>
                </form>
            </div>
        </div>
     </div>
    </section>
  );
};

export default NewsLatterSection;
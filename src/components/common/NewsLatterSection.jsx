import { useState } from "react";
import newsLatterShapeRight from "../../assets/images/shape-newslatter-right.png";
import PrimaryButton from "./PrimaryButton";
import { api } from "@/api";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const NewsLatterSection = ({ newsLatterData }) => {
    const [isLoading, setIsLoading] = useState(false);
    const {register, handleSubmit, formState:{errors}} = useForm();

    const onSubmitForm = async (data) => {
        console.log(data);
        setIsLoading(true)
        try{
            const res = await api.post('/subscriptions', data);
            if(res.status === 200){
                toast.success(res.data.message)
            }
        }catch(error){
            toast.error(error.response.data.message)
        }finally{
            setIsLoading(false)
        }
    }

  return (
    <section className="mt-[110px] custom-2xl:mt-[100px] custom-xl:mt-[100px] custom-lg:mt-[100px] max-md:mt-20 custom-xs:!mt-[50px] custom-sm:!mt-[50px] relative z-[1] newslatter-section">
      <div className="flex custom-xs:block custom-sm:block justify-start items-start gap-[34px] relative custom-xs:py-10 custom-xs:px-6">
        <div className="w-[1009px] max-md:w-[100%] h-[697px] max-md:h-auto max-md:ml-[-17px] custom-sm:!ml-[0] custom-xs:!h-full newslatter-image">
          <img
            className="w-full h-full object-cover banner-img custom-xs:absolute custom-xs:top-0 custom-xs:left-0"
            src={`${import.meta.env.VITE_SERVER_URL}/${
              newsLatterData?.image_url
            }`}
            alt="newsLatterBanner"
          />
        </div>
        <div className="absolute right-0 top-0 bottom-0 w-[987px] extra-large:w-[890px] h-[740px] custom-2xl:w-[823px] custom-xl:w-[823px] custom-lg:w-[650px] max-md:h-full max-md:w-full custom-xs:!h-full custom-xs:relative">
          <img
            className="w-full h-full right-0 absolute top-0 bottom-0 max-md:hidden"
            src={newsLatterShapeRight}
            alt=""
          />
          <div className="z-[1] absolute right-[200px] custom-2xl:right-[100px] custom-xl:right-[100px] top-1/2 translate-y-[-50%] custom-lg:right-[70px] max-md:right-auto max-md:left-10 custom-xs:translate-y-0 custom-xs:relative custom-sm:!left-7 custom-xs:!left-0">
            <h4 className="text-[48px] font-tungsten font-bold text-heading custom-sm:text-[30px] custom-xs:text-white custom-sm:text-white custom-xs:text-[38px]">
              {/* {newsLatterData?.title} */}Subscription
            </h4>
            <p className="text-[18px] text-paragraph mt-1 custom-sm:w-[300px] custom-xs:text-white custom-sm:text-white ">
              {newsLatterData?.sub_title}
            </p>
            <form className="w-[484px] custom-lg:w-[400px] custom-md:w-[350px] custom-sm:w-[300px] custom-xs:w-full" onSubmit={handleSubmit(onSubmitForm)}>
              <input
                type="email"
                placeholder="Enter your email"
                className="py-4 px-[30px] w-full bg-white text-heading border border-[#B3BAC5] rounded-[100px] mt-9 custom-sm:mt-5 focus:outline-none custom-sm:px-5 custom-sm:py-3  custom-xs:px-5 custom-xs:py-3 custom-xs:mt-5"
                name="email"
                {...register('email', {required:'Please enter your email'})}
              />
              {
                errors.email && (<p className="error-message">{errors.email.message}</p>)
              }
              <button type="submit" className={`mt-6 ${isLoading ? 'opacity-50 pointer-events-none' : 'opacity-100 pointer-events-auto'}`}>
                <PrimaryButton
                  text={isLoading ? 'Subscribing..' : 'Subscribe'}
                  className="py-4 px-[42px] text-white font-semibold rounded-[40px] bg-primaryGreen border border-primaryGreen duration-200 ease-in-out hover:bg-transparent hover:text-primaryGreen text-base hover:scale-[1.05] custom-xs:py-3 custom-xs:px-5 custom-sm:py-3 custom-sm:px-5"
                />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsLatterSection;

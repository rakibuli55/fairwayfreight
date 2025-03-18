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
    <section className="mt-[110px]">
      <div className="flex justify-start items-start gap-[34px] relative">
        <div className="w-[1009px] h-[697px] overflow-hidden rounded-image newslatter-image">
          <img
            className="w-full h-full object-cover banner-img"
            src={`${import.meta.env.VITE_SERVER_URL}/${
              newsLatterData?.image_url
            }`}
            alt="newsLatterBanner"
          />
        </div>
        <div className="absolute right-0 top-0 bottom-0 w-[987px]">
          <img
            className="w-full h-[740px] right-0 absolute top-0 bottom-0"
            src={newsLatterShapeRight}
            alt=""
          />
          <div className="z-[1] absolute right-[200px] top-1/2 translate-y-[-50%]">
            <h4 className="text-[48px] font-tungsten font-bold text-heading">
              {newsLatterData?.title}
            </h4>
            <p className="text-[18px] text-paragraph mt-1">
              {newsLatterData?.sub_title}
            </p>
            <form className="w-[484px]" onSubmit={handleSubmit(onSubmitForm)}>
              <input
                type="email"
                placeholder="Enter your email"
                className="py-4 px-[30px] w-full bg-white text-heading border border-[#B3BAC5] rounded-[100px] mt-9 focus:outline-none"
                name="email"
                {...register('email', {required:'Please enter your email'})}
              />
              {
                errors.email && (<p className="error-message">{errors.email.message}</p>)
              }
              <button type="submit" className={`mt-6 ${isLoading ? 'opacity-50 pointer-events-none' : 'opacity-100 pointer-events-auto'}`}>
                <PrimaryButton
                  text={isLoading ? 'Subscribing..' : 'Subscribe'}
                  className="py-4 px-[42px] text-white font-semibold rounded-[40px] bg-primaryGreen border border-primaryGreen duration-200 ease-in-out hover:bg-transparent hover:text-primaryGreen text-base hover:scale-[1.05]"
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

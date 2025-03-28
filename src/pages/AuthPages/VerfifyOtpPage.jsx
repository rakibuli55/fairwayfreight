import PrimaryButton from "@/components/common/PrimaryButton";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import OTPInput from "react-otp-input";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo/footer-logo.svg";
import useVerifyOtp from "../../hooks/useVerifyOtp";

const VerifyOtpPage = () => {
  const userEmail = localStorage.getItem('userEmail');
  const {verifyOtp, isLoading} = useVerifyOtp();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues:{
      email:userEmail,
    }
  });
  const [otp, setOtp] = useState("");

  const onSubmit = (data) => {
    console.log(data);
    verifyOtp(data)
  };

  return (
    <section className="py-[56px] custom-xs:py-7 px-[200px] extra-large:px-[100px] custom-2xl:px-[100px] custom-xl:px-20 custom-lg:px-10 max-md:px-10 custom-xs:!px-6">
      <div>
        <Link to={"/"}>
          <img className="w-[409px] h-[90px] custom-2xl:w-[300px] custom-xl:w-[290px] custom-lg:w-[250px] max-md:w-[240px] custom-xs:!w-[200px] mx-auto" src={Logo} alt="" />
        </Link>
        <div className="pt-[125px] custom-2xl:pt-20 custom-xl:pt-[60px] custom-lg:pt-[60px] max-md:pt-[60px] custom-xs:!pt-[30px]">
          <h1 className="auth-title text-center !mb-[10px]">Enter Otp</h1>
          <p className="text-center">
            Enter the code just sent your email to reset your password.
          </p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input type="email" defaultValue={userEmail} {...register('email')} className="hidden" />
            <Controller
              name="otp"
              control={control}
              defaultValue=""
              rules={{
                required: "OTP is required",
                minLength: { value: 4, message: "OTP must be 4 digits" },
              }}
              render={({ field }) => (
                <div className="mt-[64px] custom-xs:mt-[30px]">
                  <OTPInput
                    value={otp}
                    onChange={(val) => {
                        setOtp(val);
                        field.onChange(val)
                    }}
                    numInputs={4}
                    containerStyle={{
                      display: "flex",
                      justifyContent: "center",
                      gap: "24px",
                    }}
                    renderInput={(props) => (
                      <input
                        {...props}
                        className="!w-[120px] h-[80px] custom-xl:!w-[100px] custom-md:!w-[100px] custom-lg:!w-[100px] text-[24px] custom-sm:!w-[80px] custom-xs:!w-[60px] custom-xs:h-[60px] font-bold text-center border-2 border-gray-300 rounded-md focus:border-primaryGreen focus:outline-none text-heading"
                      />
                    )}
                  />
                </div>
              )}
            />
            {
                errors.otp && (<p className="text-sm text-red-500 mt-2">{errors.otp.message}</p>)
            }

            {/* submit btn  */}
            <div className="mt-10 custom-xs:mt-6">
              <button className={`w-full ${isLoading ? 'opacity-50 pointer-events-none' : 'opacity-100 pointer-events-auto'}`}>
                <PrimaryButton
                  text={isLoading ? 'Submitting OTP...' : 'Submit OTP'}
                  className="p-4 w-full bg-primaryGreen text-white font-bold border-[2px] border-primaryGreen duration-200 ease-in-out hover:bg-transparent hover:text-primaryGreen rounded-[40px] justify-center custom-xs:py-3"
                />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default VerifyOtpPage;

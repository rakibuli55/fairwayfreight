import PrimaryButton from "@/components/common/PrimaryButton";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import OTPInput from "react-otp-input";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo/footer-logo.svg";

const VerifyOtpPage = () => {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm();
  const [otp, setOtp] = useState("");

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <section className="py-[56px] px-[200px]">
      <div>
        <Link to={"/"}>
          <img className="w-[409px] h-[90px] mx-auto" src={Logo} alt="" />
        </Link>
        <div className="pt-[125px]">
          <h1 className="auth-title text-center !mb-[10px]">Enter Otp</h1>
          <p className="text-center">
            Enter the code just sent your email to reset your password.
          </p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="otp"
              control={control}
              defaultValue=""
              rules={{
                required: "OTP is required",
                minLength: { value: 4, message: "OTP must be 4 digits" },
              }}
              render={({ field }) => (
                <div className="mt-[64px]">
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
                        className="!w-[120px] h-[80px] text-[24px] font-bold text-center border-2 border-gray-300 rounded-md focus:border-primaryGreen focus:outline-none text-heading"
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
            <div className="mt-10">
              <button className="w-full">
                <PrimaryButton
                  text="Submit OTP"
                  className="p-4 w-full bg-primaryGreen text-white font-bold border-[2px] border-primaryGreen duration-200 ease-in-out hover:bg-transparent hover:text-primaryGreen rounded-[40px] justify-center"
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

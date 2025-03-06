import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo/footer-logo.svg";
import PrimaryButton from "@/components/common/PrimaryButton";

const ForgotPasswordPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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
          <h1 className="auth-title text-center !mb-[10px]">Forgot Password?</h1>
          <p className="text-center mb-[64px]">Enter your email to get a verification code.</p>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* auth-input-box  */}
            <div className="auth-input-box">
              <div>
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className={`${
                    errors.email ? "border-red-500" : "border-[#B3BAC5]"
                  }`}
                  placeholder="Enter Email Address"
                  {...register("email", {
                    required: "Please enter your email address",
                  })}
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>
            
            {/* submit btn  */}
            <div className="mt-10">
              <button className="w-full">
                <PrimaryButton text="Submit" className="p-4 w-full bg-primaryGreen text-white font-bold border-[2px] border-primaryGreen duration-200 ease-in-out hover:bg-transparent hover:text-primaryGreen rounded-[40px] justify-center" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ForgotPasswordPage;

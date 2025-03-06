import PrimaryButton from "@/components/common/PrimaryButton";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo/footer-logo.svg";

const ResetPasswordPage = () => {
  const {
    register,
    handleSubmit,
    watch,
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
          <h1 className="auth-title text-center !mb-[10px]">Reset Password</h1>
          <p className="text-center mb-[64px]">Enter your new password</p>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* auth-input-box  */}
            <div className="auth-input-box">
              <div>
                <label htmlFor="password">New Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className={`${
                    errors.password ? "border-red-500" : "border-[#B3BAC5]"
                  }`}
                  placeholder="Enter Email Address"
                  {...register("password", {
                    required: "Please enter new password",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                    pattern: {
                      value: /^(?=.*[A-Z])(?=.*\d)/,
                      message:
                        "Password must contain at least one uppercase letter and one number",
                    },
                  })}
                />
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.password.message} 
                </p>
              )}
            </div>
            {/* auth-input-box  */}
            <div className="auth-input-box mt-7">
              <div>
                <label htmlFor="confirm_password">Confirm Password</label>
                <input
                  type="confirm_password"
                  id="confirm_password"
                  name="confirm_password"
                  className={`${
                    errors.confirm_password
                      ? "border-red-500"
                      : "border-[#B3BAC5]"
                  }`}
                  placeholder="Enter confirm_password"
                  {...register("confirm_password", {
                    required: "Please enter confirm password",
                    validate: (value) => value === watch('password') || "Passwords do not match",
                  })}
                />
              </div>
              {errors.confirm_password && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.confirm_password.message}
                </p>
              )}
            </div>
            {/* submit btn  */}
            <div className="mt-10">
              <button className="w-full">
                <PrimaryButton
                  text="Reset"
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

export default ResetPasswordPage;

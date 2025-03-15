import PrimaryButton from "@/components/common/PrimaryButton";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo/footer-logo.svg";
import useResetPassword from "../../hooks/useResetPassword";

const ResetPasswordPage = () => {
  const userEmail = localStorage.getItem('userEmail')
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues:{
      email:userEmail,
    }
  });
  const {resetPassword, isLoading} = useResetPassword()

  const onSubmit = (data) => {
    resetPassword(data)
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
              <input type="email" defaultValue={userEmail} {...register('email')} className="hidden" />
              <div>
                <label htmlFor="password">New Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className={`${
                    errors.password ? "border-red-500" : "border-[#B3BAC5]"
                  }`}
                  placeholder="Enter new password"
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
                  type="password"
                  id="password_confirmation"
                  name="password_confirmation"
                  className={`${
                    errors.password_confirmation
                      ? "border-red-500"
                      : "border-[#B3BAC5]"
                  }`}
                  placeholder="Enter confirm password"
                  {...register("password_confirmation", {
                    required: "Please enter confirm password",
                    validate: (value) => value === watch('password') || "Passwords do not match",
                  })}
                />
              </div>
              {errors.confirm_password && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.password_confirmation.message}
                </p>
              )}
            </div>
            {/* submit btn  */}
            <div className="mt-10">
              <button className={`w-full ${isLoading ? 'opacity-50 pointer-events-none' : 'opacity-100 pointer-events-auto'}`}>
                <PrimaryButton
                  text={isLoading ? 'Resting' : 'Reset'}
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

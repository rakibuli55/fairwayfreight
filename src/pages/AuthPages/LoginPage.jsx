import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo/footer-logo.svg";
import PrimaryButton from "../../components/common/PrimaryButton";
import useLogin from "../../hooks/useLogin";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { userLogin, isLoading } = useLogin();

  const onSubmit = (data) => {
    userLogin(data);
  };

  return (
    <section className="py-[56px] custom-xs:py-7 px-[200px] extra-large:px-[100px] custom-2xl:px-[100px] custom-xl:px-20 custom-lg:px-10 max-md:px-10 custom-xs:!px-6">
      <div>
        <Link to={"/"}>
          <img className="w-[409px] h-[90px] custom-2xl:w-[300px] custom-xl:w-[290px] custom-lg:w-[250px] max-md:w-[240px] custom-xs:!w-[200px] mx-auto" src={Logo} alt="" />
        </Link>
        <div className="pt-[125px] custom-2xl:pt-20 custom-xl:pt-[60px] custom-lg:pt-[60px] max-md:pt-[60px] custom-xs:!pt-[30px]">
          <h1 className="auth-title text-center">Log In</h1>
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
            {/* auth-input-box  */}
            <div className="auth-input-box mt-7 custom-xs:mt-4">
              <div>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className={`${
                    errors.password ? "border-red-500" : "border-[#B3BAC5]"
                  }`}
                  placeholder="Enter Password"
                  {...register("password", {
                    required: "Please enter password",
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
            {/* forgot pass  */}
            <div className="text-[18px] text-paragraph pt-8 pb-10 custom-xs:pt-6 custom-xs:pb-7 text-center">
              Forgot your Password?{" "}
              <Link
                to={"/auth/forgot-password"}
                className="font-bold text-primaryGreen hover:underline"
              >
                Click Here
              </Link>
            </div>
            {/* submit btn  */}
            <div>
              <button
                className={`w-full ${
                  isLoading
                    ? "opacity-50 pointer-events-none"
                    : "opacity-100 pointer-events-auto"
                }`}
              >
                <PrimaryButton
                  text={isLoading ? "Logging in" : "Log in"}
                  className="p-4 w-full bg-primaryGreen text-white font-bold border-[2px] border-primaryGreen duration-200 ease-in-out hover:bg-transparent hover:text-primaryGreen rounded-[40px] justify-center custom-xs:py-3"
                />
              </button>
            </div>
            {/* new user  */}
            <div className="text-[18px] text-paragraph pt-14 custom-xs:pt-10 pb-10 text-center">
              New User?{" "}
              <Link
                to={"/auth/signup"}
                className="font-bold text-primaryGreen hover:underline"
              >
                Create Account
              </Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;

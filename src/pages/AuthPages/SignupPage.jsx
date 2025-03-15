import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { IoCameraOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo/footer-logo.svg";
import PrimaryButton from "../../components/common/PrimaryButton";
import useUserRegister from "../../hooks/useUserRegister";

const SignupPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();
  const [uploadedAvatar, setUploadedAvatar] = useState(null);
  const { userRegister, isLoading } = useUserRegister();

  const handleUplod = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Only image files are allowed!");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      toast.error("File size must be less than 2MB!");
      return;
    }
    setUploadedAvatar(URL.createObjectURL(file));
    setValue("avatar", file);
  };

  const onSubmit = (data) => {
    const formData = new FormData();
    if (data.avatar) {
      formData.append("avatar", data.avatar);
    }
    formData.append("first_name", data.first_name);
    formData.append("last_name", data.last_name);
    formData.append("phone", data.phone);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("password_confirmation", data.password_confirmation);
    userRegister(formData)
    console.log();
  };

  return (
    <section className="py-[56px] px-[200px]">
      <div>
        <Link to={"/"}>
          <img className="w-[409px] h-[90px] mx-auto" src={Logo} alt="" />
        </Link>
        <div className="pt-[125px]">
          <h1 className="auth-title text-center">Sign Up</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* photo uploader  */}
            <div className="mb-[64px]">
              <input
                type="file"
                id="photoUploder"
                className="hidden"
                onChange={handleUplod}
              />
              <div className="flex items-center gap-5">
                <label
                  htmlFor="photoUploder"
                  className={`w-[93px] h-[93px] flex items-center justify-center border-[2px]  border-heading rounded-[12px] text-[40px] cursor-pointer overflow-hidden ${
                    uploadedAvatar
                      ? "border-solid border-white"
                      : "border-dashed"
                  }`}
                >
                  {uploadedAvatar ? (
                    <img
                      className="w-full h-full object-cover"
                      src={uploadedAvatar}
                      alt="uploadedAvatar"
                    />
                  ) : (
                    <IoCameraOutline />
                  )}
                </label>
                <p className="text-[24px] font-bold text-heading">
                  Add your photo{" "}
                  <span className="font-normal text-[18px]">
                    (Less than 2MB)
                  </span>
                </p>
              </div>
            </div>
            {/* auth-input-box  */}
            <div className="auth-input-box">
              <div>
                <label htmlFor="first_name">First Name</label>
                <input
                  type="text"
                  id="first_name"
                  name="first_name"
                  className={`${
                    errors.first_name ? "border-red-500" : "border-[#B3BAC5]"
                  }`}
                  placeholder="Enter Your First Name"
                  {...register("first_name", {
                    required: "Please enter your first name",
                  })}
                />
              </div>
              {errors.first_name && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.first_name.message}
                </p>
              )}
            </div>
            {/* auth-input-box  */}
            <div className="auth-input-box mt-7">
              <div>
                <label htmlFor="first_name">Last Name</label>
                <input
                  type="text"
                  id="last_name"
                  name="last_name"
                  className={`${
                    errors.last_name ? "border-red-500" : "border-[#B3BAC5]"
                  }`}
                  placeholder="Enter Your Last Name"
                  {...register("last_name", {
                    required: "Please enter your last name",
                  })}
                />
              </div>
              {errors.last_name && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.last_name.message}
                </p>
              )}
            </div>
            {/* auth-input-box  */}
            <div className="auth-input-box mt-7">
              <div>
                <label htmlFor="phone">Phone</label>
                <input
                  type="number"
                  id="phone"
                  name="phone"
                  className={`${
                    errors.last_name ? "border-red-500" : "border-[#B3BAC5]"
                  }`}
                  placeholder="Enter Your Phone Number"
                  {...register("phone", {
                    required: "Please enter your phone number",
                  })}
                />
              </div>
              {errors.phone && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.phone.message}
                </p>
              )}
            </div>
            {/* auth-input-box  */}
            <div className="auth-input-box mt-7">
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
            <div className="auth-input-box mt-7">
              <div>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className={`${
                    errors.password ? "border-red-500" : "border-[#B3BAC5]"
                  }`}
                  placeholder="Enter Email Address"
                  {...register("password", {
                    required: "Please enter your password",
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
                <label htmlFor="password_confirmation">Confirm Password</label>
                <input
                  type="password"
                  id="password_confirmation"
                  name="password_confirmation"
                  className={`${
                    errors.password_confirmation
                      ? "border-red-500"
                      : "border-[#B3BAC5]"
                  }`}
                  placeholder="Enter password_confirmation"
                  {...register("password_confirmation", {
                    required: "Please enter your confirm password",
                    validate: (value) =>
                      value === watch("password") || "Passwords do not match",
                  })}
                />
              </div>
              {errors.password_confirmation && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.password_confirmation.message}
                </p>
              )}
            </div>
            {/* submit btn  */}
            <div className="mt-10">
              <button className="w-full">
                <PrimaryButton
                  text={isLoading ? "Signing Up..." : "Sign Up"}
                  className={`p-4 w-full bg-primaryGreen text-white font-bold border-[2px] border-primaryGreen duration-200 ease-in-out hover:bg-transparent hover:text-primaryGreen rounded-[40px] justify-center ${
                    isLoading
                      ? "opacity-30 pointer-events-none"
                      : "pointer-events-auto opacity-100"
                  }`}
                />
              </button>
            </div>
            {/* new user  */}
            <div className="text-[18px] text-paragraph pt-14 pb-10 text-center">
              Already have an account?{" "}
              <Link
                to={"/auth/login"}
                className="font-bold text-primaryGreen hover:underline"
              >
                Log In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignupPage;

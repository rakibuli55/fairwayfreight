import PrimaryButton from "@/components/common/PrimaryButton";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo/footer-logo.svg";
import { IoCameraOutline } from "react-icons/io5";
import { useState } from "react";
import toast from "react-hot-toast";

const SignupPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();
  const [uploadedAvatar, setUploadedAvatar] = useState(null);

  const handleUplod = (e) => {
    const file = e.target.files[0];
    if(!file.type.startsWith("image/")){
        toast.error('Only image files are allowed!');
        return;
    }
    if(file.size > 2 * 1024 * 1024){
        toast.error('File size must be less than 2MB!');
        return;
    }
    setUploadedAvatar(URL.createObjectURL(file));
    setValue("profileAvatar", file)
  }

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
          <h1 className="auth-title text-center">Sign Up</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* photo uploader  */}
            <div className="mb-[64px]">
              <input type="file" id="photoUploder" className="hidden" onChange={handleUplod} />
              <div className="flex items-center gap-5">
                <label htmlFor="photoUploder" className={`w-[93px] h-[93px] flex items-center justify-center border-[2px]  border-heading rounded-[12px] text-[40px] cursor-pointer overflow-hidden ${uploadedAvatar ? 'border-solid border-white' : 'border-dashed'}`}>
                
                {
                    uploadedAvatar ? <img className="w-full h-full object-cover" src={uploadedAvatar} alt="uploadedAvatar" /> : <IoCameraOutline />
                }
                </label>
                <p className="text-[24px] font-bold text-heading">Add your photo <span className="font-normal text-[18px]">(Less than 2MB)</span></p>
              </div>
            </div>
            {/* auth-input-box  */}
            <div className="auth-input-box">
              <div>
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  className={`${
                    errors.firstName ? "border-red-500" : "border-[#B3BAC5]"
                  }`}
                  placeholder="Enter Your First Name"
                  {...register("firstName", {
                    required: "Please enter your first name",
                  })}
                />
              </div>
              {errors.firstName && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.firstName.message}
                </p>
              )}
            </div>
            {/* auth-input-box  */}
            <div className="auth-input-box mt-7">
              <div>
                <label htmlFor="firstName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  className={`${
                    errors.lastName ? "border-red-500" : "border-[#B3BAC5]"
                  }`}
                  placeholder="Enter Your Last Name"
                  {...register("lastName", {
                    required: "Please enter your last name",
                  })}
                />
              </div>
              {errors.lastName && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.lastName.message}
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
                    errors.lastName ? "border-red-500" : "border-[#B3BAC5]"
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
                <label htmlFor="confirm_password">Confirm Password</label>
                <input
                  type="password"
                  id="confirm_password"
                  name="confirm_password"
                  className={`${
                    errors.confirm_password
                      ? "border-red-500"
                      : "border-[#B3BAC5]"
                  }`}
                  placeholder="Enter confirm_password"
                  {...register("confirm_password", {
                    required: "Please enter your confirm password",
                    validate: (value) =>
                      value === watch("password") || "Passwords do not match",
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
                  text="Sign Up"
                  className="p-4 w-full bg-primaryGreen text-white font-bold border-[2px] border-primaryGreen duration-200 ease-in-out hover:bg-transparent hover:text-primaryGreen rounded-[40px] justify-center"
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

import { useState } from "react";
import { useForm } from "react-hook-form";
import PrimaryButton from "../../components/common/PrimaryButton";
import BackButton from "../../components/dashboard/common/BackButton";
import MainTitle from "../../components/dashboard/common/MainTitle";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const ChangePasswordPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [isLoading, setisLoading] = useState(false);
  const axiosSecure = useAxiosSecure();

  const onSubmit = async (data) => {
    try {
      setisLoading(true);
      const response = await axiosSecure.post("/users/password/change", data);
      if(response.status === 200){
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message)
    } finally {
      setisLoading(false)
    }
  };

  return (
    <section className="bg-white p-9 rounded-[16px]">
      <div>
        <MainTitle text="Robert Fox’s Profile" />
        <div className="mt-10 p-10 border border-[#F0F0F0] rounded-[12px]">
          <div>
            <BackButton />
          </div>
          <div>
            <h3 className="text-[32px] text-center font-bold text-heading mb-12">
              Edit Your Password
            </h3>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-[560px] mx-auto"
            >
              {/* auth-input-box  */}
              <div className="auth-input-box">
                <label htmlFor="current_password">Current Password</label>
                <input
                  type="password"
                  placeholder="Enter Current Password"
                  name="current_password"
                  id="current_password"
                  {...register("current_password", {
                    required: "Please enter current password",
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
                {errors.current_password && (
                  <p className="error-message">
                    {errors.current_password.message}
                  </p>
                )}
              </div>
              {/* auth-input-box  */}
              <div className="auth-input-box mt-10">
                <label htmlFor="current-password">New Password</label>
                <input
                  type="password"
                  placeholder="Enter New Password"
                  name="password"
                  id="password"
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
                {errors.password && (
                  <p className="error-message">{errors.password.message}</p>
                )}
              </div>
              {/* auth-input-box  */}
              <div className="auth-input-box mt-10">
                <label htmlFor="current-password">Confirm Password</label>
                <input
                  type="password"
                  placeholder="Enter Confirm Password"
                  name="password_confirmation"
                  id="password_confirmation"
                  {...register("password_confirmation", {
                    required: "Please enter confirm password",
                    validate: (value) =>
                      value === watch("password") ||
                      "Passwords do not match",
                  })}
                />
                {errors.password_confirmation && (
                  <p className="error-message">
                    {errors.password_confirmation.message}
                  </p>
                )}
              </div>
              <button type="submit" className={`w-full text-center mt-10 ${isLoading ? 'opacity-50 pointer-events-none' : 'opacity-100 pointer-events-auto'}`}>
                <PrimaryButton
                  text={isLoading ? 'Trying to save' : 'Save'}
                  className="py-4 px-8 w-full bg-primaryGreen rounded-[50px] text-[18px] justify-center text-white hover:bg-transparent border-[2px] border-primaryGreen hover:text-primaryGreen"
                />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChangePasswordPage;

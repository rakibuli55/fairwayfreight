import { useForm } from "react-hook-form";
import BackButton from "../../components/dashboard/common/BackButton";
import MainTitle from "../../components/dashboard/common/MainTitle";
import PrimaryButton from "../../components/common/PrimaryButton";

const ChangePasswordPage = () => {
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
                <label htmlFor="current-password">Current Password</label>
                <input
                  type="password"
                  placeholder="Enter New Password"
                  name="currentPassword"
                  id="currentPassword"
                  {...register("currentPassword", {
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
                {errors.currentPassword && (
                  <p className="error-message">
                    {errors.currentPassword.message}
                  </p>
                )}
              </div>
              {/* auth-input-box  */}
              <div className="auth-input-box mt-10">
                <label htmlFor="current-password">New Password</label>
                <input
                  type="password"
                  placeholder="Enter New Password"
                  name="newPassword"
                  id="newPassword"
                  {...register("newPassword", {
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
                {errors.newPassword && (
                  <p className="error-message">
                    {errors.newPassword.message}
                  </p>
                )}
              </div>
              {/* auth-input-box  */}
              <div className="auth-input-box mt-10">
                <label htmlFor="current-password">Confirm Password</label>
                <input
                  type="password"
                  placeholder="Enter New Password"
                  name="confirmPassword"
                  id="confirmPassword"
                  {...register("confirmPassword", {
                    required: "Please enter confirm password",
                    validate: (value) => value === watch('newPassword') || "Passwords do not match",
                  })}
                />
                {errors.confirmPassword && (
                  <p className="error-message">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
              <button type="submit" className="w-full text-center mt-10">
                <PrimaryButton text="Save" className="py-4 px-8 w-full bg-primaryGreen rounded-[50px] text-[18px] justify-center text-white hover:bg-transparent border-[2px] border-primaryGreen hover:text-primaryGreen" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChangePasswordPage;

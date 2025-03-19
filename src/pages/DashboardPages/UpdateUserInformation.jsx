import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import PrimaryButton from "../../components/common/PrimaryButton";
import BackButton from "../../components/dashboard/common/BackButton";
import MainTitle from "../../components/dashboard/common/MainTitle";
import UserProfileUploader from "../../components/dashboard/myAccountPage/UserProfileUploader";
import { AuthContext } from "../../context/index";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const UpdateUserInformation = () => {
  const { user } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (user) {
      reset({
        first_name: user.first_name,
        last_name: user.last_name,
        phone: user.phone,
        email: user.email,
        zipcode: user.zipcode,
        country: user.country,
        state: user.state,
        default_address: user.default_address,
        avatar:'',
      });
    }
  }, [user, reset, setValue]);
  const [isLoading, setIsLoading] = useState(false);
  const axiosSecure = useAxiosSecure();
  const { setUser } = useContext(AuthContext);

  const onSubmit = async (data) => {
      const formData = new FormData();
      formData.append("avatar", data.avatar);

      // Append other form data
      formData.append("first_name", data.first_name);
      formData.append("last_name", data.last_name);
      formData.append("phone", data.phone);
      formData.append("email", data.email);
      formData.append("country", data.country);
      formData.append("state", data.state);
      formData.append("zipcode", data.zipcode);
      formData.append("default_address", data.default_address);

      setIsLoading(true);
      try {
        const response = await axiosSecure.post("/users/data/update", formData);
        if (response.status) {
          toast.success(response.data.message);
          setUser(response.data.data);
        }
      } catch (error) {
        toast.error(error.response.data.message);
      } finally {
        setIsLoading(false);
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mt-10">
              <UserProfileUploader
                setValue={setValue}
                name="avatar"
                user={user}
              />
            </div>
            <div>
              {/* input row  */}
              <div className="grid grid-cols-2 gap-6 mt-10">
                <div className="auth-input-box">
                  <label htmlFor="fname">First Name</label>
                  <input
                    type="text"
                    id="first_name"
                    defaultValue={user?.first_name}
                    name="first_name"
                    {...register("first_name", {
                      required: "Please enter your first name.",
                    })}
                  />
                  {errors.first_name && (
                    <p className="error-message">{errors.first_name.message}</p>
                  )}
                </div>
                <div className="auth-input-box">
                  <label htmlFor="last_name">Last Name</label>
                  <input
                    type="text"
                    id="last_name"
                    defaultValue={user?.last_name}
                    name="last_name"
                    {...register("last_name", {
                      required: "Please enter your last name.",
                    })}
                  />
                  {errors.last_name && (
                    <p className="error-message">{errors.last_name.message}</p>
                  )}
                </div>
              </div>
              {/* input row  */}
              <div className="grid grid-cols-2 gap-6 mt-6">
                <div className="auth-input-box">
                  <label htmlFor="phone">Phone</label>
                  <input
                    type="tel"
                    id="phone"
                    defaultValue={user?.phone}
                    name="phone"
                    {...register("phone", {
                      required: "Please enter your phone number.",
                    })}
                  />
                  {errors.phone && (
                    <p className="error-message">{errors.phone.message}</p>
                  )}
                </div>
                <div className="auth-input-box">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    defaultValue={user?.email}
                    name="email"
                    {...register("email", {
                      required: "Please enter your email address.",
                    })}
                  />
                  {errors.email && (
                    <p className="error-message">{errors.email.message}</p>
                  )}
                </div>
              </div>
              {/* input row  */}
              <div className="grid grid-cols-3 gap-6 mt-6">
                <div className="auth-input-box">
                  <label htmlFor="country">Country/Region</label>
                  <input
                    type="text"
                    name="country"
                    id="country"
                    defaultValue={user?.country}
                    placeholder="Country"
                    {...register("country", {
                      required: "Please enter your country",
                    })}
                  />
                  {errors.country && (
                    <p className="error-message">{errors.country.message}</p>
                  )}
                </div>
                <div className="auth-input-box">
                  <label htmlFor="state">State</label>
                  <input
                    type="text"
                    name="state"
                    id="state"
                    defaultValue={user?.state}
                    placeholder="State"
                    {...register("state", {
                      required: "Please enter your state",
                    })}
                  />

                  {errors.state && (
                    <p className="error-message">{errors.state.message}</p>
                  )}
                </div>
                <div className="auth-input-box">
                  <label htmlFor="zipcode">Postal Code</label>
                  <input
                    type="tel"
                    id="zipcode"
                    defaultValue={user?.zipcode}
                    placeholder="Zip code"
                    name="zipcode"
                    {...register("zipcode", {
                      required: "Please enter your postal code.",
                    })}
                  />
                  {errors.zipcode && (
                    <p className="error-message">{errors.zipcode.message}</p>
                  )}
                </div>
              </div>
              <div className="auth-input-box mt-6">
                <label htmlFor="default_address">Address</label>
                <textarea
                  placeholder="Enter your address"
                  className="resize-none"
                  name="default_address"
                  id="default_address"
                  {...register("default_address", {
                    required: "Please enter your address",
                  })}
                ></textarea>
                {errors.default_address && (
                  <p className="error-message">
                    {errors.default_address.message}
                  </p>
                )}
              </div>
            </div>
            <div
              className={`mt-8 ${
                isLoading
                  ? "opacity-50 pointer-events-none"
                  : "opacity-100 pointer-events-auto"
              }`}
            >
              <button type="submit">
                <PrimaryButton
                  text={isLoading ? "Saving Chnages" : "Save Changes"}
                  className="text-base font-bold text-white py-4 px-8 bg-primaryGreen rounded-[50px] border-[2px] border-primaryGreen hover:text-primaryGreen hover:bg-transparent"
                />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default UpdateUserInformation;

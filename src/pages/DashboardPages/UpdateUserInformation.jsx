import PrimaryButton from "@/components/common/PrimaryButton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Controller, useForm } from "react-hook-form";
import BackButton from "../../components/dashboard/common/BackButton";
import MainTitle from "../../components/dashboard/common/MainTitle";
import UserProfileUploader from "../../components/dashboard/myAccountPage/UserProfileUploader";

const UpdateUserInformation = () => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fname: "Robert",
      lname: "Fox",
      phone: "+1-202-555-0118",
      email: "example@gmail.com",
      country: "United States",
      state: "United States",
      postalCode: "75640",
      userAvatar: null,
    },
  });

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
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mt-10">
              <UserProfileUploader
                control={control}
                setValue={setValue}
                name="userAvatar"
              />
            </div>
            <div>
              {/* input row  */}
              <div className="grid grid-cols-2 gap-6 mt-10">
                <div className="auth-input-box">
                  <label htmlFor="fname">First Name</label>
                  <input
                    type="text"
                    id="fname"
                    name="fname"
                    {...register("fname", {
                      required: "Please enter your first name.",
                    })}
                  />
                  {errors.fname && (
                    <p className="error-message">{errors.fname.message}</p>
                  )}
                </div>
                <div className="auth-input-box">
                  <label htmlFor="lname">Last Name</label>
                  <input
                    type="text"
                    id="lname"
                    name="lname"
                    {...register("lname", {
                      required: "Please enter your last name.",
                    })}
                  />
                  {errors.lname && (
                    <p className="error-message">{errors.lname.message}</p>
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
                  <Controller
                    name="country"
                    control={control}
                    defaultValue="United States"
                    rules={{ required: "Please enter your country" }}
                    render={({ field }) => (
                      <Select {...field} onValueChange={field.onChange}>
                        <SelectTrigger className="focus:ring-0 h-[72px] rounded-[12px] px-5 text-[18px]">
                          <SelectValue placeholder="Select Country" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="United States">
                            United States
                          </SelectItem>
                          <SelectItem value="Canada">Canada</SelectItem>
                          <SelectItem value="Australia">Australia</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.country && (
                    <p className="error-message">{errors.country.message}</p>
                  )}
                </div>
                <div className="auth-input-box">
                  <label htmlFor="state">State</label>
                  <Controller
                    name="state"
                    control={control}
                    defaultValue="United States"
                    rules={{ required: "Please enter your state" }}
                    render={({ field }) => (
                      <Select {...field} onValueChange={field.onChange}>
                        <SelectTrigger className="focus:ring-0 h-[72px] rounded-[12px] px-5 text-[18px]">
                          <SelectValue placeholder="Select State" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="United States">
                            United States
                          </SelectItem>
                          <SelectItem value="Canada">Canada</SelectItem>
                          <SelectItem value="Australia">Australia</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.state && (
                    <p className="error-message">{errors.state.message}</p>
                  )}
                </div>
                <div className="auth-input-box">
                  <label htmlFor="postalCode">Postal Code</label>
                  <input
                    type="tel"
                    id="postalCode"
                    name="postalCode"
                    {...register("postalCode", {
                      required: "Please enter your postal code.",
                    })}
                  />
                  {errors.postalCode && (
                    <p className="error-message">{errors.postalCode.message}</p>
                  )}
                </div>
              </div>
            </div>
            <div className="mt-8">
              <button type="submit">
                <PrimaryButton
                  text="Save Changes"
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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Controller, useForm } from "react-hook-form";
import dhlStore from "../../assets/icons/dhl.svg";
import fedExStore from "../../assets/icons/fedex.svg";
import upsStore from "../../assets/icons/ups.svg";
import Container from "../../container/Container";
import PrimaryButton from "../common/PrimaryButton";
import TitleV2 from "../common/TitleV2";

const HelpSection = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  }

  return (
    <section className="pt-[210px] pb-[120px]">
      <Container>
        <div>
          {/* title  */}
          <div className="mb-[60px]">
            <TitleV2 subTitle="HELP" title="Help" description="" />
          </div>
          <div className="flex items-start">
            <div className="w-[50%] pr-[30px]">
              <h4 className="text-[32px] font-bold text-primaryGreen pb-3 border-b border-[#B3BAC5]">
                Search for a drop-off location near you
              </h4>
              <form onSubmit={handleSubmit(onSubmit)}>
                {/* help-input-feild  */}
                <div className="help-input-feild">
                  {/* input-inner  */}
                  <div className="input-inner">
                    <label htmlFor="zipCode">
                      <span>*</span> Zip Code
                    </label>
                    <input
                      type="number"
                      className="help-input"
                      placeholder="Zip Code"
                      name="zipCode"
                      id="zipCode"
                      {...register("zipCode", {
                        required: "Please enter zip code",
                      })}
                    />
                  </div>
                  {errors.zipCode && (
                    <p className="text-sm mt-1 text-red-500">
                      {errors.zipCode.message}
                    </p>
                  )}
                </div>
                {/* help-input-feild  */}
                <div className="help-input-feild">
                  {/* input-inner  */}
                  <div className="input-inner">
                    <label htmlFor="trackingId">
                      <span>*</span> Tracking ID
                    </label>
                    <input
                      type="text"
                      className="help-input"
                      placeholder="Tracking ID"
                      name="trackingId"
                      id="trackingId"
                      {...register("trackingId", {
                        required: "Please enter tracking id",
                      })}
                    />
                  </div>
                  {errors.trackingId && (
                    <p className="text-sm mt-1 text-red-500">
                      {errors.trackingId.message}
                    </p>
                  )}
                </div>
                {/* help-input-feild  */}
                <div className="help-input-feild">
                  {/* input-inner  */}
                  <div className="input-inner">
                    <label htmlFor="country">
                      <span>*</span> Country
                    </label>
                    <Controller
                      name="country"
                      control={control}
                      rules={{ required: "Please select a country" }}
                      render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger className="w-[203px] h-[70px] rounded-[12px] text-[18px] px-5 text-paragraph focus:ring-0">
                            <SelectValue placeholder="Select a country" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="usa">USA</SelectItem>
                            <SelectItem value="canada">Canada</SelectItem>
                            <SelectItem value="australia">Australia</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                  {errors.country && (
                    <p className="text-sm mt-1 text-red-500">
                      {errors.country.message}
                    </p>
                  )}
                </div>
                {/* help-input-feild  */}
                <div className="help-input-feild store-type">
                  {/* input-inner  */}
                  <div className="input-inner !w-full">
                    <label htmlFor="#">
                      <span>*</span> Store Type
                    </label>
                    <div className="stores grid grid-cols-2 gap-6">
                      {/* store type */}
                      <div>
                        <input
                          type="radio"
                          className="help-input"
                          name="store-input"
                          value="ups"
                          id="storeType"
                          {...register("storeType", {
                            required: "Please select a store type",
                          })}
                        />
                        <label htmlFor="storeType">
                          <img src={upsStore} alt="upsStore" />
                        </label>
                      </div>
                      {/* store type */}
                      <div>
                        <input
                          type="radio"
                          className="help-input"
                          name="store-input"
                          value="fedex"
                          id="fedEx"
                          {...register("storeType", {
                            required: "Please select a store type",
                          })}
                        />
                        <label htmlFor="fedEx">
                          <img src={fedExStore} alt="fedExStore" />
                        </label>
                      </div>
                      {/* store type */}
                      <div>
                        <input
                          type="radio"
                          className="help-input"
                          name="store-input"
                          value="dhl"
                          id="dhl"
                          {...register("storeType", {
                            required: "Please select a store type",
                          })}
                        />
                        <label htmlFor="dhl">
                          <img src={dhlStore} alt="dhlStore" />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                {/* help-input-feild  */}
                <div className="help-input-feild flex items-center justify-center">
                  <button className="w-[440px]">
                    <PrimaryButton
                      text="Search Stores"
                      className="p-4 bg-primaryGreen text-white rounded-[40px] font-bold justify-center duration-200 ease-in-out hover:bg-primaryGreen"
                    />
                  </button>
                </div>
                <p className="text-[18px] text-primaryGreen pt-10 font-semibold">
                    Please match the carrier on your shipping label with the
                    corresponding carrier drop off location.
                  </p>
              </form>
            </div>
            <div className="w-[50%] pl-[30px]">
              <div className="map-area">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d8933203.645616453!2d-101.62925491903955!3d39.37117420208103!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sbd!4v1741055447813!5m2!1sen!2sbd"
                  loading="lazy"
                  className="w-full h-[1060px] border-[5px] border-heading rounded-[16px]"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default HelpSection;

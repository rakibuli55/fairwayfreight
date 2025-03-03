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
  return (
    <section className="pt-[210px] pb-[120px]">
      <Container>
        <div>
          {/* title  */}
          <div className="mb-[60px]">
            <TitleV2 subTitle="HELP" title="Help" description="" />
          </div>
          <div>
            <div className="w-[50%] pr-[30px]">
              <h4 className="text-[32px] font-bold text-primaryGreen pb-3 border-b border-[#B3BAC5]">
                Search for a drop-off location near you
              </h4>
              <form>
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
                        required: "Please enter zip code",
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
                    <label htmlFor="trackingId">
                      <span>*</span> Country
                    </label>
                    <Controller
                      name="country"
                      control={control}
                      rules={{ required: "Please select a country" }}
                      render={({ field }) => (
                        <Select {...field}>
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
                  {errors.trackingId && (
                    <p className="text-sm mt-1 text-red-500">
                      {errors.trackingId.message}
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
                          name="storeType"
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
                          name="storeType"
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
                          name="storeType"
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
              </form>
            </div>
            <div className="w-[50%] pl-[30px]"></div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default HelpSection;

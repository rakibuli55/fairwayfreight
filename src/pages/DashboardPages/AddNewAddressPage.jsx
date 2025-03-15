import PrimaryButton from "@/components/common/PrimaryButton";
import ShipTab from "@/components/ShipPage/ShipTab";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import BackButton from "../../components/dashboard/common/BackButton";
import MainTitle from "../../components/dashboard/common/MainTitle";

const AddressBookPage = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const [selectedAddress, setSelectedAddress] = useState("home");

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <section className="bg-white p-9 rounded-[16px]">
      <div>
        <MainTitle text="Add New Address " />
        <div className="mt-10 p-10 border border-[#F0F0F0] rounded-[12px]">
          <div>
            <BackButton />
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="w-fit mx-auto mt-10">
              <ShipTab
                selectedTab={selectedAddress}
                onSelect={setSelectedAddress}
              />
            </div>
            <div className="w-[50%]">
              {/* country  */}
              <div className="shipment-input-box mt-5">
                <div>
                  <label htmlFor="country" className="shipment-label">
                    Country <span>*</span>
                  </label>
                  <Controller
                    name="originCountry"
                    control={control}
                    rules={{ required: "Please select a country" }}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-full h-[77px] text-[18px] rounded-[12px] border border-[#B3BAC5] px-5 focus:ring-0">
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem
                            value="united_states"
                            className="text-[18px]"
                          >
                            United States
                          </SelectItem>
                          <SelectItem value="canada" className="text-[18px]">
                            Canada
                          </SelectItem>
                          <SelectItem value="australia" className="text-[18px]">
                            Australia
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
                {errors.originCountry && (
                  <p className="error-message">
                    {errors.originCountry.message}
                  </p>
                )}
              </div>
              {/* sender name  */}
              <div className="shipment-input-box mt-5">
                <div>
                  <label htmlFor="senderName" className="shipment-label">
                    Sender Name <span>*</span>
                  </label>
                  <input
                    type="text"
                    name="senderName"
                    id="senderName"
                    placeholder="Enter Your Full Name"
                    className="shipment-input"
                    {...register("senderName", {
                      required: "Please enter a sender name",
                    })}
                  />
                </div>
                {errors.senderName && (
                  <p className="error-message">{errors.senderName.message}</p>
                )}
              </div>
              {/* company name  */}
              <div className="shipment-input-box mt-5">
                <div>
                  <label htmlFor="company" className="shipment-label">
                    Company
                  </label>
                  <input
                    type="text"
                    name="company"
                    id="company"
                    placeholder="Company Name"
                    className="shipment-input"
                    {...register("company", {required:'Please enter your company name.'})}
                  />
                </div>
                {errors.company && (
                  <p className="error-message">{errors.company.message}</p>
                )}
              </div>
              {/* address  */}
              <div className="shipment-input-box mt-5">
                <div>
                  <label
                    htmlFor="streetAddress"
                    className="shipment-label"
                  >
                    Address <span>*</span>
                  </label>
                  <input
                    type="text"
                    name="streetAddress"
                    id="streetAddress"
                    placeholder="Street Address"
                    className="shipment-input"
                    {...register("streetAddress", {
                      required: "Please enter a street address",
                    })}
                  />
                  <input
                    type="text"
                    name="addresApartment"
                    id="addresApartment"
                    placeholder="Apartment suite, unit, building, floor, etc."
                    className="shipment-input mt-6"
                    {...register("addresApartment", {
                      required:
                        "Please enter apartment suite, unit, building, floor, etc",
                    })}
                  />
                </div>
                {errors.streetAddress && (
                  <p className="error-message">
                    {errors.streetAddress.message}
                  </p>
                )}
                {errors.addresApartment && (
                  <p className="error-message">
                    {errors.addresApartment.message}
                  </p>
                )}
              </div>
              {/* zip city state  */}
              <div className="shipment-input-box mt-5 grid grid-cols-3 gap-6">
                <div className="overflow-hidden">
                  <div>
                    <label htmlFor="originZip" className="shipment-label">
                      Zip <span>*</span>
                    </label>
                    <input
                      type="number"
                      placeholder="Zip"
                      name="originZip"
                      id="originZip"
                      className="shipment-input"
                      {...register("originZip", {
                        required: "Enter zip code",
                      })}
                    />
                  </div>
                  {errors.originZip && (
                    <p className="error-message">{errors.originZip.message}</p>
                  )}
                </div>
                <div className="overflow-hidden">
                  <div>
                    <label htmlFor="originCity" className="shipment-label">
                      City <span>*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="City"
                      name="originCity"
                      id="originCity"
                      className="shipment-input"
                      {...register("originCity", {
                        required: "Enter city",
                      })}
                    />
                  </div>
                  {errors.originCity && (
                    <p className="error-message">{errors.originCity.message}</p>
                  )}
                </div>
                <div className="overflow-hidden">
                  <div>
                    <label htmlFor="originState" className="shipment-label">
                      State <span>*</span>
                    </label>
                    <Controller
                      name="originState"
                      control={control}
                      rules={{ required: "Please select a state" }}
                      render={({ field }) => (
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className="w-full h-[77px] text-[18px] rounded-[12px] border border-[#B3BAC5] px-5 focus:ring-0">
                            <SelectValue placeholder="Select State" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem
                              value="united_states"
                              className="text-[18px]"
                            >
                              United States
                            </SelectItem>
                            <SelectItem value="canada" className="text-[18px]">
                              Canada
                            </SelectItem>
                            <SelectItem
                              value="australia"
                              className="text-[18px]"
                            >
                              Australia
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                  {errors.originState && (
                    <p className="error-message">
                      {errors.originState.message}
                    </p>
                  )}
                </div>
              </div>
              {/* phone */}
              <div className="shipment-input-box mt-5">
                <div>
                  <label htmlFor="originPhone" className="shipment-label">
                    Phone <span>*</span>
                  </label>
                  <input
                    type="text"
                    name="originPhone"
                    id="originPhone"
                    placeholder="Enter Your Phone Number"
                    className="shipment-input"
                    {...register("originPhone", {
                      required: "Please enter your phone",
                    })}
                  />
                </div>
                {errors.originPhone && (
                  <p className="error-message">{errors.originPhone.message}</p>
                )}
              </div>
            </div>
            <div>
              <button type="submit" className="mt-10">
                <PrimaryButton
                  text="Save"
                  className="py-[14px] px-10 rounded-[40px] bg-primaryGreen border-[2px] border-primaryGreen text-white text-[18px] font-bold duration-200 ease-in-out hover:bg-transparent hover:text-primaryGreen"
                />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AddressBookPage;

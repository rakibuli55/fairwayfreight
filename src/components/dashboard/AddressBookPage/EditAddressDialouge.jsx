import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import PrimaryButton from "../../../components/common/PrimaryButton";

const EditAddressDialouge = ({ address, onClose }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      sender_name: address?.sender_name || "",
      company_name: address?.company_name || "",
      phone: address?.phone || "",
      country: address?.country || "",
      city: address?.city || "",
      zip: address?.zip || "",
      address: address?.address || "",
      state:address.state || ""
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Dialog open={!!address} onOpenChange={onClose}>
      <DialogContent className="max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              {/* country  */}
              <div className="shipment-input-box mt-5">
                <div>
                  <label htmlFor="country" className="shipment-label">
                    Country <span>*</span>
                  </label>
                  <Controller
                    name="country"
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
                {errors.country && (
                  <p className="error-message">{errors.country.message}</p>
                )}
              </div>
              {/* sender name  */}
              <div className="shipment-input-box mt-5">
                <div>
                  <label htmlFor="sender_name" className="shipment-label">
                    Sender Name <span>*</span>
                  </label>
                  <input
                    type="text"
                    name="sender_name"
                    id="sender_name"
                    placeholder="Enter Your Full Name"
                    className="shipment-input"
                    {...register("sender_name", {
                      required: "Please enter a sender name",
                    })}
                  />
                </div>
                {errors.sender_name && (
                  <p className="error-message">{errors.sender_name.message}</p>
                )}
              </div>
              {/* company_name name  */}
              <div className="shipment-input-box mt-5">
                <div>
                  <label htmlFor="company_name" className="shipment-label">
                    Company Name
                  </label>
                  <input
                    type="text"
                    name="company_name"
                    id="company_name"
                    placeholder="company_name Name"
                    className="shipment-input"
                    {...register("company_name", {
                      required: "Please enter your company_name name.",
                    })}
                  />
                </div>
                {errors.company_name && (
                  <p className="error-message">{errors.company_name.message}</p>
                )}
              </div>
              {/* address  */}
              <div className="shipment-input-box mt-5">
                <div>
                  <label htmlFor="streetAddress" className="shipment-label">
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
                    <label htmlFor="zip" className="shipment-label">
                      Zip <span>*</span>
                    </label>
                    <input
                      type="number"
                      placeholder="Zip"
                      name="zip"
                      id="zip"
                      className="shipment-input"
                      {...register("zip", {
                        required: "Enter zip code",
                      })}
                    />
                  </div>
                  {errors.zip && (
                    <p className="error-message">{errors.zip.message}</p>
                  )}
                </div>
                <div className="overflow-hidden">
                  <div>
                    <label htmlFor="city" className="shipment-label">
                      City <span>*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="City"
                      name="city"
                      id="city"
                      className="shipment-input"
                      {...register("city", {
                        required: "Enter city",
                      })}
                    />
                  </div>
                  {errors.city && (
                    <p className="error-message">{errors.city.message}</p>
                  )}
                </div>
                <div className="overflow-hidden">
                  <div>
                    <label htmlFor="state" className="shipment-label">
                      State <span>*</span>
                    </label>
                    <Controller
                      name="state"
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
                  {errors.state && (
                    <p className="error-message">{errors.state.message}</p>
                  )}
                </div>
              </div>
              {/* phone */}
              <div className="shipment-input-box mt-5">
                <div>
                  <label htmlFor="phone" className="shipment-label">
                    Phone <span>*</span>
                  </label>
                  <input
                    type="text"
                    name="phone"
                    id="phone"
                    placeholder="Enter Your Phone Number"
                    className="shipment-input"
                    {...register("phone", {
                      required: "Please enter your phone",
                    })}
                  />
                </div>
                {errors.phone && (
                  <p className="error-message">{errors.phone.message}</p>
                )}
              </div>
            </div>
            <div>
              <button
                type="submit"
                className={`mt-10 ${
                  isLoading
                    ? "opacity-50 pointer-events-none"
                    : "opacity-100 pointer-events-auto"
                }`}
              >
                <PrimaryButton
                  text={isLoading ? "Saving Address" : "Save Address"}
                  className="py-[14px] px-10 rounded-[40px] bg-primaryGreen border-[2px] border-primaryGreen text-white text-[18px] font-bold duration-200 ease-in-out hover:bg-transparent hover:text-primaryGreen"
                />
              </button>
            </div>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default EditAddressDialouge;

import { api } from "@/api";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import PrimaryButton from "../../../components/common/PrimaryButton";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const EditAddressDialouge = ({ address, onClose }) => {
  const queryClient = useQueryClient();
  const [states, setStates] = useState(null);
  const [allCountries, setAllCountries] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    control,
    watch,
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
      state: address.state || "",
    },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    data.type = address?.type;
    try {
      const response = await axiosSecure.post(
        `/update-address/${address?.id}`,
        data
      );
      queryClient.invalidateQueries(["addressbook-data"]);
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  // fetch all country
  const { data: allCountry, isLoading: countryDataLoading } = useQuery({
    queryKey: ["country-data-newAddress"],
    queryFn: async () => {
      const response = await api.get(
        "https://countriesnow.space/api/v0.1/countries/states"
      );
      setAllCountries(response.data.data);
      return response.data.data;
    },
    retry: 1,
  });

  const filteredCountry = allCountry?.filter(
    (country, index, self) =>
      index === self.findIndex((t) => t.name === country.name)
  );

  // fetchStates
  const fetchStates = async (country, setStates) => {
    if (!country) return;
    const response = await api.post(
      "https://countriesnow.space/api/v0.1/countries/states",
      {
        country: country,
      }
    );
    if (response.status === 200) {
      setStates(response.data.data.states);
    }
  };


  // call originCountry states
  const countryName = watch("country");
  useEffect(() => {
    if (countryName) {
      fetchStates(countryName, setStates);
    }
  }, [countryName, allCountries]);

  return (
    <Dialog open={!!address} onOpenChange={onClose}>
      <DialogContent className="max-w-[800px] max-h-[90vh] max-md:max-w-[95%] overflow-y-auto max-md:rounded-[10px] custom-xs:p-4">
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
                        <SelectTrigger className="w-full h-[77px] max-md:h-[50px] text-[18px] rounded-[12px] border border-[#B3BAC5] px-5 focus:ring-0">
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                        <SelectContent>
                          {filteredCountry?.map((country) => (
                            <SelectItem
                              value={country?.name}
                              className="text-[18px]"
                            >
                              {country?.name}
                            </SelectItem>
                          ))}
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
                  <label htmlFor="address" className="shipment-label">
                    Address <span>*</span>
                  </label>
                  <input
                    type="text"
                    name="address"
                    id="address"
                    placeholder="Street Address"
                    className="shipment-input"
                    {...register("address", {
                      required: "Please enter a street address",
                    })}
                  />
                </div>
                {errors.address && (
                  <p className="error-message">{errors.address.message}</p>
                )}
                {errors.addresApartment && (
                  <p className="error-message">
                    {errors.addresApartment.message}
                  </p>
                )}
              </div>
              {/* zip city state  */}
              <div className="shipment-input-box mt-5 grid grid-cols-3 gap-6 max-md:grid-cols-1">
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
                          <SelectTrigger className="w-full h-[77px] max-md:h-[50px] text-[18px] rounded-[12px] border border-[#B3BAC5] px-5 focus:ring-0">
                            <SelectValue placeholder="Select State" />
                          </SelectTrigger>
                          <SelectContent>
                            {states?.map((state, index) => (
                              <SelectItem
                                key={index}
                                value={state?.name}
                                className="text-[18px]"
                              >
                                {state?.name}
                              </SelectItem>
                            ))}
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
                className={`mt-10 custom-xs:mt-6 ${
                  isLoading
                    ? "opacity-50 pointer-events-none"
                    : "opacity-100 pointer-events-auto"
                }`}
              >
                <PrimaryButton
                  text={isLoading ? "Saving Address" : "Save Address"}
                  className="py-[14px] px-10 rounded-[40px] bg-primaryGreen border-[2px] border-primaryGreen text-white text-[18px] font-bold duration-200 ease-in-out hover:bg-transparent hover:text-primaryGreen custom-xs:py-2 custom-xs:px-5"
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

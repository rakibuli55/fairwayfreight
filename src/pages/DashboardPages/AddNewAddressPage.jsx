import PrimaryButton from "@/components/common/PrimaryButton";
import ShipTab from "@/components/ShipPage/ShipTab";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { api } from "../../api/index";
import BackButton from "../../components/dashboard/common/BackButton";
import MainTitle from "../../components/dashboard/common/MainTitle";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AddressBookPage = () => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm();
  const [selectedAddress, setSelectedAddress] = useState("home");
  const axiosSecure = useAxiosSecure();
  const [isLoading, setIsLoading] = useState(false);
  const [states, setStates] = useState(null);
  const [allCountries, setAllCountries] = useState(null);

  const getCountryByShortName = (countryCode) => {
    const matchedCountry = allCountries?.find(
      (country) => country.iso2 === countryCode
    );
    return matchedCountry?.name;
  };

  const onSubmit = async (data) => {
    data.type = selectedAddress;
    data.address = data.streetAddress + data.addresApartment;
    delete data.streetAddress;
    delete data.addresApartment;
    setIsLoading(true);
    try {
      const response = await axiosSecure.post("add-address", data);
      if (response.status === 200) {
        toast.success(response.data.message);
      }
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
      const fullCountry = getCountryByShortName(countryName);
      fetchStates(fullCountry, setStates);
    }
  }, [countryName, allCountries]);


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
                          {allCountry?.map((country, index) => (
                            <SelectItem
                              key={index}
                              value={country?.iso2}
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
                    company_name
                  </label>
                  <input
                    type="text"
                    name="company_name"
                    id="company_name"
                    placeholder="Company Name"
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
                </div>
                {errors.streetAddress && (
                  <p className="error-message">
                    {errors.streetAddress.message}
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
        </div>
      </div>
    </section>
  );
};

export default AddressBookPage;

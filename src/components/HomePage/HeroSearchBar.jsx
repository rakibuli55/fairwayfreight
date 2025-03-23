import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import DOMPurify from "dompurify";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { api } from "../../api/index";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import PrimaryButton from "../common/PrimaryButton";
import GetQuoteDialouge from "./GetQuoteDialouge";

const HeroSearchBar = () => {
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm();

  const [isLoading, setIsLoading] = useState(false);
  const [isDialougeOpen, setIsDialougeOpen] = useState(false);
  const [quoteData, setQuoteData] = useState(null);
  const [error, setError] = useState(null);
  const [fromValue, setFromValue] = useState("");
  const [fromSuggestions, setFromSuggestions] = useState([]);
  const [selectedFromValue, setSelectedFromValue] = useState(null);
  const [toValue, setToValue] = useState("");
  const [toSuggestions, setToSuggestions] = useState([]);
  const [selectedToValue, setSelectedToValue] = useState(null);

  const { data: bagSizeData, isLoading: bagSizeDataLoading } = useQuery({
    queryKey: ["bag-size"],
    queryFn: async () => {
      const response = await axiosSecure.get("/bag-sizes");
      return response?.data?.data;
    },
  });
  // fetchSuggestions
  const fetchSuggestions = async (term, setSuggestions) => {
    if (term.length > 2) {
      try {
        const response = await api.get(
          `https://www.shipsticks.com/api/v5.2/auto-complete/all?term=${term}&brand=shipsticks&result_type=all`
        );
        setSuggestions(response?.data);
      } catch (error) {
        console.log(error);
      }
    } else {
      setFromSuggestions([]);
    }
  };

  useEffect(() => {
    if (fromValue.trim().length > 2 && selectedFromValue === null) {
      const debounceTimer = setTimeout(() => {
        fetchSuggestions(fromValue, setFromSuggestions);
      }, 1000);

      return () => clearTimeout(debounceTimer);
    } else {
      setFromSuggestions([]);
    }
  }, [fromValue, selectedFromValue]);

  useEffect(() => {
    if (toValue.trim().length > 2 && selectedToValue === null) {
      const debounceTimer = setTimeout(() => {
        fetchSuggestions(toValue, setToSuggestions);
      }, 1000);

      return () => clearTimeout(debounceTimer);
    } else {
      setFromSuggestions([]);
    }
  }, [toValue, selectedToValue]);
  // onSubmit
  const onSubmit = async (data) => {
    setIsDialougeOpen(true);
    const bagTypeObj = bagSizeData.filter(
      (bag) => bag.bag_size === data.bagSize
    );
    
    if (bagTypeObj) {
      setIsLoading(true);
      if(selectedFromValue)

        const getAddressData = (selectedValue) => {
          if (selectedValue?.address) {
            return {
              street1: selectedValue?.address?.address_1 || '',
              city: selectedValue?.address?.city || '',
              state: selectedValue?.address?.state || '',
              zip: selectedValue?.address?.zip || '',
              country: selectedValue?.address?.country || '',
              place_id: selectedValue?.address?.place_id || ''
            };
          } else {
            return {
              street1: selectedValue?.formatted_address || '',
              city: selectedValue?.address?.city || '',
              state: selectedValue?.address?.state || '',
              zip: selectedValue?.address?.zip || '',
              country: selectedValue?.address?.country || '',
              place_id: selectedValue?.place_id || ''
            };
          }
        };}

      try {
        const response = await axiosSecure.post("/get-quote", {
          address_from: {
            street1: selectedFromValue?.address?.address_1 || '',
            city: selectedFromValue?.address?.city || '',
            state: selectedFromValue?.address?.state || '',
            zip: selectedFromValue?.address?.zip || '',
            country: selectedFromValue?.address?.country || '',
            place_id:selectedFromValue?.address?.place_id || ''
          },
          address_to: {
            street1: selectedToValue?.address?.address_1 || '',
            city: selectedToValue?.address?.city || '',
            state: selectedToValue?.address?.state || '',
            zip: selectedToValue?.address?.zip || '',
            country: selectedToValue?.address?.country || '',
            place_id:selectedToValue?.address?.place_id || ''
          },
          bag_type: {
            mass_unit: bagTypeObj[0].mass_unit,
            weight: bagTypeObj[0].weight,
            distance_unit: bagTypeObj[0].distance_unit,
            height: bagTypeObj[0].height,
            length: bagTypeObj[0].length,
            width: bagTypeObj[0].width,
          },
        });
        console.log(response);
        if (response.status === 200) {
          setQuoteData(response.data);
        }
      } catch (error) {
        // toast.error(error.response.data.message);
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      <form
        className="px-[85px] extra-large:px-[60px] custom-2xl:px-10 custom-xl:px-10 py-9 custom-2xl:py-7 custom-xl:py-7 custom-lg:py-6 custom-lg:px-8 bg-white shadow-[0px_5px_16px_0px_rgba(0,0,0,0.05)] w-full rounded-[30px] flex items-center justify-between hero-searchbar custom-lg:rounded-[20px] max-md:p-6 max-md:rounded-[12px] max-md:flex-col"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="searchbar-column relative">
          <label htmlFor="from" className="search-label">
            From
          </label>
          <input
            type="text"
            id="from"
            name="from"
            placeholder="Your Location, Your Convenience"
            value={fromValue}
            className={`search-bar-input ${
              errors.from ? "border-red-500" : ""
            }`}
            {...register("from", { required: true })}
            onChange={(e) => {
              setFromValue(e.target.value);
              setValue("from", e.target.value);
              setSelectedFromValue(null);
            }}
          />
          {fromSuggestions?.length > 0 && (
            <ul className="suggestions-dropdown max-h-[300px] overflow-y-auto absolute py-5 right-0 top-[76px] bg-white z-[4] w-[270px] border">
              {fromSuggestions?.map((suggestion, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 border-b py-2 px-4 hover:bg-primaryGreen duration-200 ease-in-out cursor-pointer hover:text-white"
                  onClick={() => {
                    setFromValue(suggestion?.formatted_address);
                    setValue("from", suggestion?.formatted_address);
                    setFromSuggestions([]);
                    setSelectedFromValue(suggestion);
                  }}
                >
                  <img className="w-[25px]" src={suggestion?.icon_url} alt="" />
                  <p
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(suggestion?.formatted_address),
                    }}
                  ></p>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="searchbar-column relative">
          <label htmlFor="to" className="search-label">
            To
          </label>
          <input
            type="text"
            id="to"
            name="to"
            placeholder="Your Location, Your Convenience"
            value={toValue}
            className={`search-bar-input ${errors.to ? "border-red-500" : ""}`}
            {...register("to", { required: true })}
            onChange={(e) => {
              setToValue(e.target.value);
              setValue("to", e.target.value);
              setSelectedToValue(null);
            }}
          />
          {toSuggestions?.length > 0 && (
            <ul className="suggestions-dropdown max-h-[300px] overflow-y-auto absolute py-5 left-0 top-[76px] bg-white z-[4] w-[270px] border">
              {toSuggestions?.map((suggestion, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 border-b py-2 px-4 hover:bg-primaryGreen duration-200 ease-in-out cursor-pointer hover:text-white"
                  onClick={() => {
                    setToValue(suggestion?.formatted_address);
                    setValue("to", suggestion?.formatted_address);
                    setToSuggestions([]);
                    setSelectedToValue(suggestion);
                  }}
                >
                  <img className="w-[25px]" src={suggestion?.icon_url} alt="" />
                  <p
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(suggestion?.formatted_address),
                    }}
                  ></p>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="searchbar-column last relative">
          <label htmlFor="from" className="search-label">
            Bag Type
          </label>
          <Controller
            name="bagSize"
            control={control}
            rules={{
              required: true,
            }}
            render={({ field }) => (
              <Select {...field} onValueChange={field.onChange}>
                <SelectTrigger
                  className={`w-full border-t-0 border-l-0 border-r-0 !rounded-[0] shadow-none border-b border-[rgba(0,0,0,0.0.1)] text-[20px] custom-lg:text-[18px] focus:ring-0 pl-0 ${
                    errors.bagSize ? "border-red-500" : ""
                  }`}
                >
                  <SelectValue placeholder="Choose Size" />
                </SelectTrigger>
                <SelectContent>
                  {bagSizeData?.map((bagItem) => (
                    <SelectItem
                      key={bagItem?.id}
                      className="text-[18px] custom-lg:text-base"
                      value={bagItem?.bag_size}
                    >
                      {bagItem?.bag_size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>
        <div>
          <button type="submit">
            <PrimaryButton
              text="Get Quote"
              className="text-base font-bold text-white bg-primaryGreen rounded-[40px] py-4 px-6 custom-lg:py-3 custom-lg:px-4 hover:bg-white hover:text-primaryGreen border border-primaryGreen"
            />
          </button>
        </div>
      </form>
      <GetQuoteDialouge
        isDialougeOpen={isDialougeOpen}
        onClose={setIsDialougeOpen}
        isLoading={isLoading}
        quoteData={quoteData}
        error={error}
      />
    </>
  );
};

export default HeroSearchBar;

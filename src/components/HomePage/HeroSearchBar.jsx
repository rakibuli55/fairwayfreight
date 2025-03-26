import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import DOMPurify from "dompurify";
import { useContext, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { api } from "../../api/index";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import PrimaryButton from "../common/PrimaryButton";
import GetQuoteDialouge from "./GetQuoteDialouge";
import puffLoader from "../../assets/icons/ripples.svg"
import { AuthContext } from "../../context/index";

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
  const [isFromLoading, setIsFromLoading] = useState(false);
  const [isToLoading, setIsToLoading] = useState(false);
  const [isDialougeOpen, setIsDialougeOpen] = useState(false);
  const [quoteData, setQuoteData] = useState(null);
  const [error, setError] = useState(null);
  const [fromValue, setFromValue] = useState("");
  const [fromSuggestions, setFromSuggestions] = useState([]);
  const [selectedFromValue, setSelectedFromValue] = useState(null);
  const [toValue, setToValue] = useState("");
  const [toSuggestions, setToSuggestions] = useState([]);
  const [selectedToValue, setSelectedToValue] = useState(null);
  const {bagSizeData} = useContext(AuthContext)
  // fetchSuggestions
  const fetchSuggestions = async (term, setSuggestions, setLoading) => {
    setLoading(true)
    if (term.length > 2) {
      try {
        const response = await api.get(
          `https://www.shipsticks.com/api/v5.2/auto-complete/all?term=${term}&brand=shipsticks&result_type=all`
        );
        setSuggestions(response?.data);
      } catch (error) {
        console.log(error);
      }finally{
        setLoading(false)
      }
    } else {
      setFromSuggestions([]);
    }
  };

  useEffect(() => {
    if (fromValue.trim().length > 2 && selectedFromValue === null) {
      const debounceTimer = setTimeout(() => {
        fetchSuggestions(fromValue, setFromSuggestions, setIsFromLoading);
      }, 1000);

      return () => clearTimeout(debounceTimer);
    } else {
      setFromSuggestions([]);
    }
  }, [fromValue, selectedFromValue]);

  useEffect(() => {
    if (toValue.trim().length > 2 && selectedToValue === null) {
      const debounceTimer = setTimeout(() => {
        fetchSuggestions(toValue, setToSuggestions, setIsToLoading);
      }, 1000);

      return () => clearTimeout(debounceTimer);
    } else {
      setToSuggestions([]);
    }
  }, [toValue, selectedToValue]);
  useEffect(() => {
    if(isDialougeOpen === 'false'){
      setQuoteData(null)
    }
  }, [isDialougeOpen])
  // onSubmit
  const onSubmit = async (data) => {
    setIsDialougeOpen(true);
    const bagTypeObj = bagSizeData.filter(
      (bag) => bag.bag_size === data.bagSize
    );

    if (bagTypeObj) {
      setIsLoading(true);

      const getAddressData = (selectedValue) => {
        if (selectedValue?.address) {
          return {
            street1: selectedValue?.address?.address_1 || "",
            city: selectedValue?.address?.city || "",
            state: selectedValue?.address?.state || "",
            zip: selectedValue?.address?.zip || "",
            country: selectedValue?.address?.country || "",
            place_id: selectedValue?.address?.place_id || "",
            formated_address:selectedValue?.formatted_address.replace(/<br\s*\/?>/gi, ' ') || "",
            type:selectedValue?.type,
          };
        } else {
          return {
            street1: selectedValue?.formatted_address || "",
            city: selectedValue?.city || "",
            state: selectedValue?.state || "",
            zip: selectedValue?.zip || "",
            country: selectedValue?.structured_formatting?.secondary_text
              ?.split(", ")
              .pop(),
            place_id: selectedValue?.place_id || "",
            formated_address:selectedValue?.formatted_address.replace(/<br\s*\/?>/gi, ' ') || "",
            type:selectedValue?.type,
          };
        }
      };

      try {
        const response = await axiosSecure.post("/get-quote", {
          address_from: getAddressData(selectedFromValue),
          address_to: getAddressData(selectedToValue),
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
          setError(null);
          localStorage.setItem('shipmentData', JSON.stringify(response.data))
        }
      } catch (error) {
        setError(error.response.data.message)
        setQuoteData(null);
        console.log('quote error',error);
      } finally {
        setIsLoading(false);
      }
    }
  };
  

  return (
    <>
      <form
        className="px-[85px] extra-large:px-[60px] custom-2xl:px-10 custom-xl:px-10 py-9 custom-2xl:py-7 custom-xl:py-7 custom-lg:py-6 custom-lg:px-8 bg-white shadow-[0px_5px_16px_0px_rgba(0,0,0,0.05)] w-full rounded-[30px] flex items-center justify-between hero-searchbar custom-lg:rounded-[20px] max-md:p-6 max-md:rounded-[12px] max-md:flex-col custom-xs:!p-5"
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
            <ul className="suggestions-dropdown max-h-[300px] overflow-y-auto absolute py-5 right-0 top-[76px] max-md:left-0 bg-white z-[4] w-[270px] border custom-sm:w-full custom-xs:w-full custom-sm:max-h-[250px] custom-xs:max-h-[250px]">
              {fromSuggestions?.map((suggestion, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 border-b py-2 px-4 hover:bg-primaryGreen duration-200 ease-in-out cursor-pointer hover:text-white"
                  onClick={() => {
                    const cleanedValue = suggestion?.formatted_address.replace(/<br\s*\/?>/gi, '');
                    setFromValue(cleanedValue);
                    setValue("from", cleanedValue);
                    setFromSuggestions([]);
                    setSelectedFromValue(suggestion);
                  }}
                >
                  <img className="w-[25px]" src={suggestion?.address ? suggestion?.icon_url : suggestion?.icon_url} alt="" />
                  <p
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(suggestion?.formatted_address),
                    }}
                  ></p>
                </li>
              ))}
            </ul>
          )}
          {
            isFromLoading && (
              <img className="absolute top-7 right-0 w-6 h-6" src={puffLoader} alt="" />
            )
          }
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
            <ul className="suggestions-dropdown max-h-[300px] overflow-y-auto absolute py-5 left-0 top-[76px] bg-white z-[4] w-[270px] custom-sm:w-full custom-xs:w-full custom-sm:max-h-[250px] custom-xs:max-h-[250px] border">
              {toSuggestions?.map((suggestion, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 border-b py-2 px-4 hover:bg-primaryGreen duration-200 ease-in-out cursor-pointer hover:text-white"
                  onClick={() => {
                    const cleanedValue = suggestion?.formatted_address.replace(/<br\s*\/?>/gi, '');
                    setToValue(cleanedValue);
                    setValue("to", cleanedValue);
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
          {
            isToLoading && (
              <img className="absolute top-7 right-0 w-6 h-6" src={puffLoader} alt="" />
            )
          }
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
                  className={`w-full border-t-0 border-l-0 border-r-0 !rounded-[0] shadow-none border-b border-[rgba(0,0,0,0.0.1)] text-[20px] custom-xs:text-[17px] text-paragraph custom-lg:text-[18px] focus:ring-0 pl-0 ${
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
              className="text-base font-bold text-white bg-primaryGreen rounded-[40px] py-4 px-6 custom-lg:py-3 custom-lg:px-4 hover:bg-white hover:text-primaryGreen border border-primaryGreen custom-sm:py-3 custom-sm:px-5 custom-xs:py-3 custom-xs:px-5"
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

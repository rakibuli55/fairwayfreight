import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import PrimaryButton from "../common/PrimaryButton";
import GetQuoteDialouge from "./GetQuoteDialouge";

const HeroSearchBar = () => {
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const [isLoading, setIsLoading] = useState(false);
  const [isDialougeOpen, setIsDialougeOpen] = useState(false);
  const [quoteData, setQuoteData] = useState(null);

  const { data: bagSizeData, isLoading: bagSizeDataLoading } = useQuery({
    queryKey: ["bag-size"],
    queryFn: async () => {
      const response = await axiosSecure.get("/bag-sizes");
      return response?.data?.data;
    },
  });

  const onSubmit = async (data) => {
    setIsDialougeOpen(true);
    const bagTypeObj = bagSizeData.filter(
      (bag) => bag.bag_size === data.bagSize
    );

    if (bagTypeObj) {
      setIsLoading(true);
      try {
        const response = await axiosSecure.post("/get-quote", {
          address_from: {
            street1: "215 Clayton St.",
            city: "San Francisco",
            state: "CA",
            zip: "94117",
            country: "US",
          },
          address_to: {
            street1: "123 Gulshan Avenue",
            city: "Dhaka",
            state: "Dhaka",
            zip: "1212",
            country: "Bangladesh",
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
        if (response.status === 200) {
          setQuoteData(response.data);
        }
      } catch (error) {
        toast.error(error.response.data.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      <form
        className="px-[85px] py-9 bg-white shadow-[0px_5px_16px_0px_rgba(0,0,0,0.05)] w-full rounded-[30px] flex items-center justify-between hero-searchbar"
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
            className={`search-bar-input ${
              errors.from ? "border-red-500" : ""
            }`}
            {...register("from", { required: true })}
          />
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
            className={`search-bar-input ${errors.to ? "border-red-500" : ""}`}
            {...register("to", { required: true })}
          />
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
                  className={`w-full border-t-0 border-l-0 border-r-0 !rounded-[0] shadow-none border-b border-[rgba(0,0,0,0.0.1)] text-[20px] focus:ring-0 pl-0 ${
                    errors.bagSize ? "border-red-500" : ""
                  }`}
                >
                  <SelectValue placeholder="Choose Size" />
                </SelectTrigger>
                <SelectContent>
                  {bagSizeData?.map((bagItem) => (
                    <SelectItem
                      key={bagItem?.id}
                      className="text-[18px]"
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
              className="text-base font-bold text-white bg-primaryGreen rounded-[40px] py-4 px-6 hover:bg-white hover:text-primaryGreen border border-primaryGreen"
            />
          </button>
        </div>
      </form>
      <GetQuoteDialouge
        isDialougeOpen={isDialougeOpen}
        onClose={setIsDialougeOpen}
        isLoading={isLoading}
        quoteData={quoteData}
      />
    </>
  );
};

export default HeroSearchBar;

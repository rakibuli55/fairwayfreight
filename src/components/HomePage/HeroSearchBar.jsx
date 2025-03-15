import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import PrimaryButton from "../common/PrimaryButton";

const HeroSearchBar = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
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
          className="search-bar-input"
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
          className="search-bar-input"
          {...register("to", { required: true })}
        />
      </div>
      <div className="searchbar-column last relative">
        <label htmlFor="from" className="search-label">
          Bag Type
        </label>
        <Controller
          name="bag-type"
          control={control}
          rules={{
            required: true,
          }}
          render={({ field }) => (
            <Select {...field}>
              <SelectTrigger className="w-full border-t-0 border-l-0 border-r-0 !rounded-[0] shadow-none border-b border-[rgba(0,0,0,0.0.1)] text-[20px] focus:ring-0 pl-0">
                <SelectValue placeholder="Choose Size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem className="text-[18px]" value="Standard golf bag">Standard golf bag(up to 42Ibs)</SelectItem>
                <SelectItem className="text-[18px]" value="Xl golf bag">Xl golf bag(up to 56Ibs)</SelectItem>
                <SelectItem className="text-[18px]" value="Carry on luggage">Carry on luggage(up to 25Ibs)</SelectItem>
                <SelectItem className="text-[18px]" value="Checked luggage">Checked luggage(up to 5Ibs)</SelectItem>
                <SelectItem className="text-[18px]" value="Oversize luggage">Oversize luggage(up to 65Ibs)</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
      </div>
      <div>
        <button type="submit">
            <PrimaryButton text="Get Quote" className="text-base font-bold text-white bg-primaryGreen rounded-[40px] py-4 px-6 hover:bg-white hover:text-primaryGreen border border-primaryGreen" />
        </button>
      </div>
    </form>
  );
};

export default HeroSearchBar;

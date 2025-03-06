import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FaUserAlt } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import Container from "../../container/Container";
import TitleV2 from "../common/TitleV2";
import ShipTab from "./ShipTab";
import golfBag from "../../assets/icons/golf-bags.svg"
import luggageBag from "../../assets/icons/luggage-bag.svg"
import QuantityButton from "./QuantityButton";
import InfoIndIcator from "./InfoIndIcator";

const ScheduleShipment = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm();

  const [origin, setOrigin] = useState("home");
  const [destination, setDestination] = useState("home");

  return (
    <section className="pt-[225px] pb-[10px]">
      <Container>
        <div className="mb-[45px]">
          <TitleV2
            subTitle="SHIP"
            title="Schedule your shipment"
            description="Seamless Shipping, Stress-Free Travel."
          />
        </div>
        {/* shipment forms area */}
        <div>
          {/* portion one || origin-destination  */}
          <div className="shipment-form-layout grid grid-cols-2 gap-[108px]">
            {/* origin  */}
            <div>
              <p className="flex items-center justify-center gap-[6px] text-[32px] font-bold text-primaryGreen">
                <span className="text-[28px] mb-[3px]">
                  <IoLocationSharp />
                </span>
                Origin
              </p>
              {/* tab  */}
              <div className="mt-12">
                <ShipTab selectedTab={origin} onSelect={setOrigin} />
              </div>
              {/* inputs */}
              <div>
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
                    <label htmlFor="originCompany" className="shipment-label">
                      Company
                    </label>
                    <input
                      type="text"
                      name="originCompany"
                      id="originCompany"
                      placeholder="Company Name"
                      className="shipment-input"
                      {...register("originCompany")}
                    />
                  </div>
                </div>
                {/* address  */}
                <div className="shipment-input-box mt-5">
                  <div>
                    <label
                      htmlFor="originAddresStreet"
                      className="shipment-label"
                    >
                      Address <span>*</span>
                    </label>
                    <input
                      type="text"
                      name="originAddresStreet"
                      id="originAddresStreet"
                      placeholder="Street Address"
                      className="shipment-input"
                      {...register("originAddresStreet", {
                        required: "Please enter a street address",
                      })}
                    />
                    <input
                      type="text"
                      name="originAddresApartment"
                      id="originAddresApartment"
                      placeholder="Apartment suite, unit, building, floor, etc."
                      className="shipment-input mt-6"
                      {...register("originAddresApartment", {
                        required:
                          "Please enter apartment suite, unit, building, floor, etc",
                      })}
                    />
                  </div>
                  {errors.originAddresStreet && (
                    <p className="error-message">
                      {errors.originAddresStreet.message}
                    </p>
                  )}
                  {errors.originAddresApartment && (
                    <p className="error-message">
                      {errors.originAddresStreet.message}
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
                      <p className="error-message">
                        {errors.originZip.message}
                      </p>
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
                        {...register("originCity", { required: "Enter city" })}
                      />
                    </div>
                    {errors.originCity && (
                      <p className="error-message">
                        {errors.originCity.message}
                      </p>
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
                              <SelectItem
                                value="canada"
                                className="text-[18px]"
                              >
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
                    <label htmlFor="originCompany" className="shipment-label">
                      Phone <span>*</span>
                    </label>
                    <input
                      type="text"
                      name="originPhone"
                      id="originPhone"
                      placeholder="Enter Your Phone Number"
                      className="shipment-input"
                      {...register("originPhone")}
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-12">
                  <input type="checkbox" id="defaultOriginAddress" />
                  <label
                    htmlFor="defaultOriginAddress"
                    className="cursor-pointer mt-[2px]"
                  >
                    Make this my default origin address.
                  </label>
                </div>
              </div>
            </div>
            {/* Destination  */}
            <div>
              <p className="flex items-center justify-center gap-[6px] text-[32px] font-bold text-primaryGreen">
                <span className="text-[28px] mb-[3px]">
                  <IoLocationSharp />
                </span>
                Destination
              </p>
              {/* tab  */}
              <div className="mt-12">
                <ShipTab selectedTab={destination} onSelect={setDestination} />
              </div>
              {/* inputs */}
              <div>
                {/* country  */}
                <div className="shipment-input-box mt-5">
                  <div>
                    <label htmlFor="country" className="shipment-label">
                      Country <span>*</span>
                    </label>
                    <Controller
                      name="destinationCountry"
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
                  {errors.originCountry && (
                    <p className="error-message">
                      {errors.originCountry.message}
                    </p>
                  )}
                </div>
                {/* recipient name  */}
                <div className="shipment-input-box mt-5">
                  <div>
                    <label htmlFor="recipientName" className="shipment-label">
                      Recipient Name <span>*</span>
                    </label>
                    <input
                      type="text"
                      name="recipientName"
                      id="recipientName"
                      placeholder="Enter Your Full Name"
                      className="shipment-input"
                      {...register("recipientName", {
                        required: "Please enter a sender name",
                      })}
                    />
                  </div>
                  {errors.recipientName && (
                    <p className="error-message">
                      {errors.recipientName.message}
                    </p>
                  )}
                </div>
                {/* company name  */}
                <div className="shipment-input-box mt-5">
                  <div>
                    <label
                      htmlFor="destinationCompany"
                      className="shipment-label"
                    >
                      Company
                    </label>
                    <input
                      type="text"
                      name="destinationCompany"
                      id="destinationCompany"
                      placeholder="Company Name"
                      className="shipment-input"
                      {...register("destinationCompany")}
                    />
                  </div>
                </div>
                {/* address  */}
                <div className="shipment-input-box mt-5">
                  <div>
                    <label
                      htmlFor="destinationAddresStreet"
                      className="shipment-label"
                    >
                      Address <span>*</span>
                    </label>
                    <input
                      type="text"
                      name="destinationAddresStreet"
                      id="destinationAddresStreet"
                      placeholder="Street Address"
                      className="shipment-input"
                      {...register("destinationAddresStreet", {
                        required: "Please enter a street address",
                      })}
                    />
                    <input
                      type="text"
                      name="destinationAddresApartment"
                      id="destinationAddresApartment"
                      placeholder="Apartment suite, unit, building, floor, etc."
                      className="shipment-input mt-6"
                      {...register("destinationAddresApartment", {
                        required:
                          "Please enter apartment suite, unit, building, floor, etc",
                      })}
                    />
                  </div>
                  {errors.destinationAddresStreet && (
                    <p className="error-message">
                      {errors.destinationAddresStreet.message}
                    </p>
                  )}
                  {errors.destinationAddresApartment && (
                    <p className="error-message">
                      {errors.destinationAddresApartment.message}
                    </p>
                  )}
                </div>
                {/* zip city state  */}
                <div className="shipment-input-box mt-5 grid grid-cols-3 gap-6">
                  <div className="overflow-hidden">
                    <div>
                      <label
                        htmlFor="destinationZip"
                        className="shipment-label"
                      >
                        Zip <span>*</span>
                      </label>
                      <input
                        type="number"
                        placeholder="Zip"
                        name="destinationZip"
                        id="destinationZip"
                        className="shipment-input"
                        {...register("destinationZip", {
                          required: "Enter zip code",
                        })}
                      />
                    </div>
                    {errors.destinationZip && (
                      <p className="error-message">
                        {errors.destinationZip.message}
                      </p>
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
                        name="destinationCity"
                        id="destinationCity"
                        className="shipment-input"
                        {...register("destinationCity", {
                          required: "Enter city",
                        })}
                      />
                    </div>
                    {errors.destinationCity && (
                      <p className="error-message">
                        {errors.destinationCity.message}
                      </p>
                    )}
                  </div>
                  <div className="overflow-hidden">
                    <div>
                      <label
                        htmlFor="destinationState"
                        className="shipment-label"
                      >
                        State <span>*</span>
                      </label>
                      <Controller
                        name="destinationState"
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
                              <SelectItem
                                value="canada"
                                className="text-[18px]"
                              >
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
                    {errors.destinationState && (
                      <p className="error-message">
                        {errors.destinationState.message}
                      </p>
                    )}
                  </div>
                </div>
                {/* phone */}
                <div className="shipment-input-box mt-5">
                  <div>
                    <label
                      htmlFor="destinationPhone"
                      className="shipment-label"
                    >
                      Phone <span>*</span>
                    </label>
                    <input
                      type="text"
                      name="destinationPhone"
                      id="destinationPhone"
                      placeholder="Enter Your Phone Number"
                      className="shipment-input"
                      {...register("destinationPhone")}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* portion two || about yourself  */}
          <div className="shipment-form-layout mt-12">
            {/* title  */}
            <div className="py-6 px-5 w-full border border-[#B3BAC5] rounded-[12px] flex items-center gap-2 text-[22px] font-semibold">
              <span>
                <FaUserAlt />
              </span>
              Tell us about yourself
            </div>
            {/* name email phone  */}
            <div className="grid grid-cols-3 gap-6 pt-6 pb-12 border-b border-[#B3BAC5]">
              {/* name  */}
              <div className="shipment-input-box">
                <div>
                  <label htmlFor="name" className="shipment-label">
                    Name <span>*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    name="name"
                    id="name"
                    {...register("name", {
                      required: "Please enter your name",
                    })}
                    className="shipment-input"
                  />
                </div>
                {
                  errors.name && (<p className="error-message">{errors.name.message}</p>)
                }
              </div>
              {/* email  */}
              <div className="shipment-input-box">
                <div>
                  <label htmlFor="senderEmail" className="shipment-label">
                    Email <span>*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    name="senderEmail"
                    id="senderEmail"
                    {...register("senderEmail", {
                      required: "Please enter your email",
                    })}
                    className="shipment-input"
                  />
                </div>
                {
                  errors.senderEmail && (<p className="error-message">{errors.senderEmail.message}</p>)
                }
              </div>
              {/* email  */}
              <div className="shipment-input-box">
                <div>
                  <label htmlFor="senderPhone" className="shipment-label">
                    Phone <span>*</span>
                  </label>
                  <input
                    type="number"
                    placeholder="Enter your phone"
                    name="senderPhone"
                    id="senderPhone"
                    {...register("senderPhone", {
                      required: "Please enter your email",
                    })}
                    className="shipment-input"
                  />
                </div>
                {
                  errors.senderPhone && (<p className="error-message">{errors.senderPhone.message}</p>)
                }
              </div>
            </div>
            {/* golf bags area  */}
            <div className="golf-bags py-12 border-b border-[#B3BAC5]">
                <p className="flex items-center gap-2 text-[32px] font-bold text-primaryGreen">
                  <img className="w-8 h-8" src={golfBag} alt="golfBag" />
                  Golf Bags
                </p>
                <div className="py-6 flex items-center gap-12">
                  <QuantityButton />
                  <InfoIndIcator text="Select the number of golf bags you wish to ship" />
                </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ScheduleShipment;

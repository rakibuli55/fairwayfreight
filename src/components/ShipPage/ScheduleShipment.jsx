import { api } from "@/api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { FaUserAlt } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import golfBag from "../../assets/icons/golf-bags.svg";
import luggageBag from "../../assets/icons/luggage-bag.svg";
import Container from "../../container/Container";
import PrimaryButton from "../common/PrimaryButton";
import TitleV2 from "../common/TitleV2";
import InfoIndIcator from "./InfoIndIcator";
import QuantityButton from "./QuantityButton";
import ShipTab from "./ShipTab";
import { useLocation } from "react-router-dom";

const ScheduleShipment = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [allCountries, setAllCountries] = useState(null)

  const addressFrom = queryParams.get("address_from");
  const addressTo = queryParams.get("address_to");

  // Parse the JSON string back into an object
  const addressFromObj = addressFrom ? JSON.parse(decodeURIComponent(addressFrom)) : null;
  const addressToObj = addressTo ? JSON.parse(decodeURIComponent(addressTo)) : null;

  const { register, handleSubmit, control, watch, setValue, formState: { errors } } = useForm({
    // Set initial empty values first
    defaultValues: {
      golfBags: [
        { id: 1, size: "", packaging: "", insurance: "", otherInfo: "" },
      ],
      luggageBags: [
        { id: 1, size: "", packaging: "", insurance: "", otherInfo: "" },
      ],
      originCountry:'United States',
      originStreetAddress:addressFromObj?.formated_address || '',
    }
  });

  console.log(addressFromObj);

  const [origin, setOrigin] = useState("home");
  const [destination, setDestination] = useState("home");
  const [golfQuantity, setGolfQuantity] = useState(1);
  const [luggageQuantity, setLuggageQuantity] = useState(1);
  const [date, setDate] = useState(new Date());
  const [isCalenderOpen, setIsCalenderOpen] = useState(false);
  const [originStates, setOriginStates] = useState([]);
  const [destinationStates, setDestinationStates] = useState([]);
  const selectedDate = watch("date");
  const {
    fields: golfBagsFields,
    append: golfBagsAppend,
    remove: golfBagsRemove,
  } = useFieldArray({
    control,
    name: "golfBags",
  });
  const {
    fields: luggageBagsFields,
    append: luggageBagsAppend,
    remove: luggageBagsRemove,
  } = useFieldArray({
    control,
    name: "luggageBags",
  });
  // increaseQuantity
  const increaseQuantity = (event, type) => {
    event.preventDefault();
    if (type === "golf") {
      setGolfQuantity((prev) => prev + 1);
      golfBagsAppend({
        id: golfBagsFields.length + 1,
        size: "",
        packaging: "",
        insurance: "",
        otherInfo: "",
      });
    } else if (type === "luggage") {
      setLuggageQuantity((prev) => prev + 1);
      luggageBagsAppend({
        id: luggageBagsFields.length + 1,
        size: "",
        packaging: "",
        insurance: "",
        otherInfo: "",
      });
    }
  };
  // decreaseQuantity
  const decreaseQuantity = (event, type) => {
    event.preventDefault();
    if (type === "golf") {
      if (golfQuantity > 1) {
        setGolfQuantity((prev) => prev - 1);
        golfBagsRemove(golfQuantity - 1);
      }
    } else if (type === "luggage") {
      if (luggageQuantity > 1) {
        setLuggageQuantity((prev) => prev - 1);
        luggageBagsRemove(luggageQuantity - 1);
      }
    }
  };
  // formatedDate
  const formatedDate = (selectedDate) => {
    return selectedDate.toLocaleDateString();
  };
  // fetch all country
  const { data: allCountry, isLoading: countryDataLoading } = useQuery({
    queryKey: ["country-data"],
    queryFn: async () => {
      const response = await api.get(
        "https://countriesnow.space/api/v0.1/countries/states"
      );
      setAllCountries(response.data.data)
      return response.data.data;
    },
  });

  const filteredCountry = allCountry?.filter((country, index, self) => index === self.findIndex((t) => t.name === country.name));

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
  // originCountry
  const originCountry = watch("originCountry");
  useEffect(() => {
    if (originCountry) {
      fetchStates(originCountry, setOriginStates);
    }
  }, [originCountry]);
  const destinationCountry = watch("destinationCountry");
  useEffect(() => {
    if (destinationCountry) {
      fetchStates(destinationCountry, setDestinationStates);
    }
  }, [destinationCountry]);

  // onSubmit
  const onSubmit = (data) => {
    console.log(data);
  };




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
        <form onSubmit={handleSubmit(onSubmit)}>
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
                              {filteredCountry?.map((country, index) => (
                                <SelectItem
                                  key={index}
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
                      <p className="error-message">
                        {errors.senderName.message}
                      </p>
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
                        htmlFor="originStreetAddress"
                        className="shipment-label"
                      >
                        Address <span>*</span>
                      </label>
                      <input
                        type="text"
                        name="originStreetAddress"
                        id="originStreetAddress"
                        placeholder="Street Address"
                        className="shipment-input"
                        {...register("originStreetAddress", {
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
                    {errors.originStreetAddress && (
                      <p className="error-message">
                        {errors.originStreetAddress.message}
                      </p>
                    )}
                    {errors.originAddresApartment && (
                      <p className="error-message">
                        {errors.originAddresApartment.message}
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
                          {...register("originCity", {
                            required: "Enter city",
                          })}
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
                                {originStates?.map((state, index) => (
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
                      <p className="error-message">
                        {errors.originPhone.message}
                      </p>
                    )}
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
                  <ShipTab
                    selectedTab={destination}
                    onSelect={setDestination}
                  />
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
                              {filteredCountry?.map((country, index) => (
                                <SelectItem
                                  key={index}
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
                                {destinationStates?.map((state, index) => (
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
                        {...register("destinationPhone", {
                          required: "Please enter your phone",
                        })}
                      />
                    </div>
                    {errors.destinationPhone && (
                      <p className="error-message">
                        {errors.destinationPhone.message}
                      </p>
                    )}
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
                  {errors.name && (
                    <p className="error-message">{errors.name.message}</p>
                  )}
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
                  {errors.senderEmail && (
                    <p className="error-message">
                      {errors.senderEmail.message}
                    </p>
                  )}
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
                        required: "Please enter your phone",
                      })}
                      className="shipment-input"
                    />
                  </div>
                  {errors.senderPhone && (
                    <p className="error-message">
                      {errors.senderPhone.message}
                    </p>
                  )}
                </div>
              </div>
              {/* golf bags area  */}
              <div className="golf-bags py-12 border-b border-[#B3BAC5]">
                <p className="flex items-center gap-2 text-[32px] font-bold text-primaryGreen">
                  <img className="w-8 h-8" src={golfBag} alt="golfBag" />
                  Golf Bags
                </p>
                <div className="pt-6 flex items-center gap-12">
                  {/* quantity  */}
                  <QuantityButton
                    quantity={golfQuantity}
                    onIncrease={increaseQuantity}
                    onDecrease={decreaseQuantity}
                    type="golf"
                  />
                  <InfoIndIcator text="Select the number of golf bags you wish to ship" />
                </div>
                <div>
                  {golfBagsFields.map((bag, index) => (
                    <div key={bag.id} className="grid grid-cols-4 gap-6 pt-6">
                      {/* bag size  */}
                      <div>
                        <label htmlFor="#" className="shipment-label">
                          Bag Size <span>*</span>
                        </label>
                        <Controller
                          name={`golfBags.${index}.size`}
                          control={control}
                          rules={{ required: "Please select a bag size" }}
                          render={({ field }) => (
                            <Select
                              value={field.value}
                              onValueChange={(value) => field.onChange(value)}
                            >
                              <SelectTrigger className="mt-2 w-full shipment-select">
                                {field.value || "Select Bag Size"}
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="small">Small</SelectItem>
                                <SelectItem value="medium">Medium</SelectItem>
                                <SelectItem value="large">Large</SelectItem>
                              </SelectContent>
                            </Select>
                          )}
                        />
                        {errors.golfBags?.[index]?.size && (
                          <p className="error-message">
                            {errors.golfBags[index].size.message}
                          </p>
                        )}
                      </div>
                      {/* Packaging  */}
                      <div>
                        <label htmlFor="#" className="shipment-label">
                          Packaging <span>*</span>
                        </label>
                        <Controller
                          name={`golfBags.${index}.packaging`}
                          control={control}
                          rules={{ required: "Please select your package " }}
                          render={({ field }) => (
                            <Select
                              value={field.value}
                              onValueChange={(value) => field.onChange(value)}
                            >
                              <SelectTrigger className="mt-2 w-full shipment-select">
                                {field.value || "Select Packaging"}
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="small">Small</SelectItem>
                                <SelectItem value="medium">Medium</SelectItem>
                                <SelectItem value="large">Large</SelectItem>
                              </SelectContent>
                            </Select>
                          )}
                        />
                        {errors.golfBags?.[index]?.packaging && (
                          <p className="error-message">
                            {errors.golfBags?.[index]?.packaging.message}
                          </p>
                        )}
                      </div>
                      {/* Insurance  */}
                      <div>
                        <label htmlFor="#" className="shipment-label">
                          Insurance <span>*</span>
                        </label>
                        <div className="relative">
                          <Controller
                            name={`golfBags.${index}.insurance`}
                            control={control}
                            rules={{
                              required: "Please select your insurance.",
                            }}
                            render={({ field }) => (
                              <Select
                                value={field.value}
                                onValueChange={(value) => field.onChange(value)}
                              >
                                <SelectTrigger className="mt-2 w-full !pl-[25px] shipment-select">
                                  {field.value || "Select insurance"}
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="2000">
                                    $2,000 ($7.99)
                                  </SelectItem>
                                  <SelectItem value="5000">
                                    $5,000 ($14.99)
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            )}
                          />
                          {errors.golfBags?.[index]?.insurance && (
                            <p className="text-red-500">
                              {errors.golfBags[index].insurance.message}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Other Info Input */}
                      <div>
                        <label htmlFor="#" className="shipment-label">
                          Other info <span>*</span>
                        </label>
                        <Controller
                          name={`golfBags.${index}.otherInfo`}
                          control={control}
                          render={({ field }) => (
                            <input
                              {...field}
                              type="text"
                              className="shipment-input"
                              placeholder="Reservation info, Tee time, etc."
                            />
                          )}
                        />
                        {errors.golfBags?.[index]?.otherInfo && (
                          <p className="error-message">
                            {errors.golfBags[index].otherInfo.message}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* luggage bags area  */}
              <div className="luggage-bags py-12 border-b border-[#B3BAC5]">
                <p className="flex items-center gap-2 text-[32px] font-bold text-primaryGreen">
                  <img className="w-8 h-8" src={luggageBag} alt="golfBag" />
                  Luggage Bags
                </p>
                <div className="pt-6 flex items-center gap-12">
                  <QuantityButton
                    quantity={luggageQuantity}
                    onIncrease={increaseQuantity}
                    onDecrease={decreaseQuantity}
                    type="luggage"
                  />
                  <InfoIndIcator text="Select the number of luggage bags you wish to ship" />
                </div>
                <div>
                  {luggageBagsFields.map((bag, index) => (
                    <div key={index} className="grid grid-cols-4 gap-6 pt-6">
                      {/* bag size  */}
                      <div>
                        <label htmlFor="#" className="shipment-label">
                          Bag Size <span>*</span>
                        </label>
                        <Controller
                          name={`luggageBags.${index}.size`}
                          control={control}
                          rules={{ required: "Please select your bag size." }}
                          render={({ field }) => (
                            <Select
                              value={field.value}
                              onValueChange={(value) => field.onChange(value)}
                            >
                              <SelectTrigger className="mt-2 w-full shipment-select">
                                {field.value || "Select Bag Size"}
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="small">Small</SelectItem>
                                <SelectItem value="medium">Medium</SelectItem>
                                <SelectItem value="large">Large</SelectItem>
                              </SelectContent>
                            </Select>
                          )}
                        />
                        {errors.luggageBags?.[index]?.size && (
                          <p className="error-message">
                            {errors.luggageBags[index].size.message}
                          </p>
                        )}
                      </div>
                      {/* Packaging  */}
                      <div>
                        <label htmlFor="#" className="shipment-label">
                          Packaging <span>*</span>
                        </label>
                        <Controller
                          name={`luggageBags.${index}.packaging`}
                          control={control}
                          rules={{ required: "Please select your packaging." }}
                          render={({ field }) => (
                            <Select
                              value={field.value}
                              onValueChange={(value) => field.onChange(value)}
                            >
                              <SelectTrigger className="mt-2 w-full shipment-select">
                                {field.value || "Select Packaging"}
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="small">Small</SelectItem>
                                <SelectItem value="medium">Medium</SelectItem>
                                <SelectItem value="large">Large</SelectItem>
                              </SelectContent>
                            </Select>
                          )}
                        />
                        {errors.luggageBags?.[index]?.packaging && (
                          <p className="error-message">
                            {errors.luggageBags[index].packaging.message}
                          </p>
                        )}
                      </div>
                      {/* insurance  */}
                      <div>
                        <label htmlFor="#" className="shipment-label">
                          Insurance <span>*</span>
                        </label>
                        <div className="relative">
                          <Controller
                            name={`luggageBags.${index}.insurance`}
                            control={control}
                            rules={{
                              required: "Please select your insurance.",
                            }}
                            render={({ field }) => (
                              <Select
                                value={field.value}
                                onValueChange={(value) => field.onChange(value)}
                              >
                                <SelectTrigger className="mt-2 w-full !pl-[25px] shipment-select">
                                  {field.value || "Select insurance"}
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="2000">
                                    $2,000 ($7.99)
                                  </SelectItem>
                                  <SelectItem value="5000">
                                    $5,000 ($14.99)
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            )}
                          />
                          {errors.luggageBags?.[index]?.insurance && (
                            <p className="error-message">
                              {errors.luggageBags[index].insurance.message}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Other Info Input */}
                      <div>
                        <label htmlFor="#" className="shipment-label">
                          Other info <span>*</span>
                        </label>
                        <Controller
                          name={`luggageBags.${index}.otherInfo`}
                          control={control}
                          render={({ field }) => (
                            <input
                              {...field}
                              type="text"
                              className="shipment-input"
                              placeholder="Reservation info, Tee time, etc."
                            />
                          )}
                        />
                        {errors.luggageBags?.[index]?.otherInfo && (
                          <p className="error-message">
                            {errors.luggageBags[index].otherInfo.message}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* portion three || trip category  */}
            <div className="shipment-form-layout mt-12">
              {/* trip type  */}
              <div className="flex items-center gap-[60px] pl-8 pb-10">
                <div className="trip-type-radio">
                  <input
                    type="radio"
                    id="roundTrip"
                    name="roundTrip"
                    value="roundTrip"
                    defaultChecked
                    {...register("tripType")}
                    className="hidden"
                  />
                  <label htmlFor="roundTrip">Round-trip</label>
                </div>
                <div className="trip-type-radio">
                  <input
                    type="radio"
                    id="oneWayTrip"
                    name="oneWayTrip"
                    value="oneWayTrip"
                    {...register("tripType")}
                    className="hidden"
                  />
                  <label htmlFor="oneWayTrip">One-way</label>
                </div>
              </div>
              {/* pickup and handling method  */}
              <div className="grid grid-cols-2 gap-6 w-[750px]">
                {/* date  */}
                <div className="relative">
                  <label htmlFor="pickupdate" className="shipment-label">
                    Pickup date <span>*</span>
                  </label>
                  <input
                    type="text"
                    id="pickupdate"
                    value={formatedDate(selectedDate || date)}
                    className="shipment-input cursor-pointer"
                    placeholder="Select pickup date"
                    onClick={() => setIsCalenderOpen(!isCalenderOpen)}
                    readOnly
                  />
                  {isCalenderOpen && (
                    <div className="relative top-3">
                      <Controller
                        name="pickupDate"
                        control={control}
                        defaultValue={date}
                        render={({ field }) => (
                          <Calendar
                            {...field}
                            onChange={(newDate) => {
                              setDate(newDate);
                              setValue("pickupDate", newDate);
                            }}
                          />
                        )}
                      />
                    </div>
                  )}
                </div>
                {/* handling method  */}
                <div className="relative">
                  <label htmlFor="handlingMethod" className="shipment-label">
                    Handling method <span>*</span>
                  </label>
                  <Select>
                    <SelectTrigger className="shipment-select !h-[77px]">
                      <SelectValue placeholder="Select pickup location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="myLocation !text-[18px]">
                        Pickup from my location{" "}
                        <span className="font-bold">+$4.99</span>
                      </SelectItem>
                      <SelectItem value="localCarrier !text-[18px]">
                        Drop off at local carrier store
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center mt-12">
            <button type="submit">
              <PrimaryButton
                text="Place order"
                className="py-4 px-[60px] bg-primaryGreen gap-2 rounded-[40px] text-[18px] font-bold text-white border border-primaryGreen hover:bg-transparent hover:text-primaryGreen"
              />
            </button>
          </div>
        </form>
      </Container>
    </section>
  );
};

export default ScheduleShipment;

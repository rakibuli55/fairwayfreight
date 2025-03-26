import { api } from "@/api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useGetParcel from "@/hooks/useGetParcel";
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { FaUserAlt } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { MdErrorOutline } from "react-icons/md";
import { useLocation } from "react-router-dom";
import golfBag from "../../assets/icons/golf-bags.svg";
import luggageBag from "../../assets/icons/luggage-bag.svg";
import PaypalImage from "../../assets/icons/paypal.png";
import loaderSvg from "../../assets/icons/preloader.svg";
import StripeImage from "../../assets/icons/stripe.png";
import Container from "../../container/Container";
import { AuthContext } from "../../context/index";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import PrimaryButton from "../common/PrimaryButton";
import TitleV2 from "../common/TitleV2";
import InfoIndIcator from "./InfoIndIcator";
import QuantityButton from "./QuantityButton";
import ShipTab from "./ShipTab";

const ScheduleShipment = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const addressFrom = queryParams.get("address_from");
  const addressTo = queryParams.get("address_to");
  const [date, setDate] = useState(new Date());

  // Parse the JSON string back into an object
  const addressFromObj = addressFrom
    ? JSON.parse(decodeURIComponent(addressFrom))
    : null;
  const addressToObj = addressTo
    ? JSON.parse(decodeURIComponent(addressTo))
    : null;

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    // Set initial empty values first
    defaultValues: {
      golfBags: [
        { id: 1, size: "", packaging: "", insurance: "", otherInfo: "" },
      ],
      luggageBags: [],
      originCountry: addressFromObj?.country || "US",
      originStreetAddress: addressFromObj?.formated_address || "",
      originAddresApartment: addressFromObj?.street1 || "",
      originZip: addressFromObj?.zip || "",
      originCity: addressFromObj?.city || "",
      destinationCountry: addressToObj?.country || "US",
      destinationStreetAddress: addressToObj?.formated_address || "",
      destinationAddresApartment: addressToObj?.street1 || "",
      destinationZip: addressToObj?.zip || "",
      destinationCity: addressToObj?.city || "",
      pickupDate: date,
    },
  });

  const [origin, setOrigin] = useState(
    addressFromObj?.type.toLowerCase() || "home"
  );
  const [destination, setDestination] = useState(
    addressToObj?.type.toLowerCase() || "home"
  );
  const [golfQuantity, setGolfQuantity] = useState(1);
  const [luggageQuantity, setLuggageQuantity] = useState(0);
  const [isCalenderOpen, setIsCalenderOpen] = useState(false);
  const [originStates, setOriginStates] = useState([]);
  const [destinationStates, setDestinationStates] = useState([]);
  const [parcelRateLoading, setParcelRateLoading] = useState(false);
  const [parcelData, setParcelData] = useState(null);
  const { bagSizeData } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
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

  const [allCountries, setAllCountries] = useState(null);
  const getCountryByShortName = (countryCode) => {
    const matchedCountry = allCountries?.find(
      (country) => country.iso2 === countryCode
    );
    return matchedCountry?.name;
  };

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
      if (luggageQuantity > 0) {
        setLuggageQuantity((prev) => prev - 1);
        luggageBagsRemove(luggageQuantity - 1);
      }
    }
  };
  // formatedDate
  const formatedDate = (selectedDate) => {
    return selectedDate
      .toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
      })
      .replace(/\//g, "/");
  };
  // fetch all country
  const { data: allCountry, isLoading: countryDataLoading } = useQuery({
    queryKey: ["country-data"],
    queryFn: async () => {
      const response = await api.get(
        "https://countriesnow.space/api/v0.1/countries/states"
      );
      setAllCountries(response.data.data);
      return response.data.data;
    },
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
  const originCountry = watch("originCountry");
  useEffect(() => {
    if (originCountry) {
      const fullCountry = getCountryByShortName(originCountry);
      fetchStates(fullCountry, setOriginStates);
    }
  }, [originCountry, allCountries]);
  // call destinationCountry states
  const destinationCountry = watch("destinationCountry");
  useEffect(() => {
    if (destinationCountry) {
      const fullCountry = getCountryByShortName(destinationCountry);
      fetchStates(fullCountry, setDestinationStates);
    }
  }, [destinationCountry, allCountries]);

  // onSubmit
  const onSubmit = (data) => {
    console.log(data);
    const formValues = watch();
    const { parcels } = useGetParcel(formValues, bagSizeData);

    const selectedRate = parcelData?.rates?.find(
      (rate) => rate.object_id === data.selectedRate
    );
    // access the selected rate's amount
    const selectedAmount = selectedRate ? selectedRate.amount : null;
    data.selectedRate = selectedAmount;

    const fetchPercelRates = async () => {
      setParcelRateLoading(true);
      try {
        const response = await axiosSecure.post("/shipment", {
          address_from: {
            name: formValues.senderName,
            company: formValues.originCompany,
            street1: formValues.originStreetAddress,
            city: formValues.originCity,
            state: formValues.originState,
            zip: formValues.originZip,
            country: formValues.originCountry,
            phone: formValues.originPhone,
          },
          address_to: {
            name: formValues.recipientName,
            company: formValues.destinationCompany,
            street1: formValues.destinationStreetAddress,
            city: formValues.destinationCity,
            state: formValues.destinationState,
            zip: formValues.destinationZip,
            country: formValues.destinationCountry,
            phone: formValues.destinationZip,
          },
          parcels,
          shipment_date: formValues.pickupDate,
        });
        if (response.status === 200) {
          setParcelData(response.data);
        }
        console.log(response);
      } catch (error) {
        console.log(error);
      } finally {
        setParcelRateLoading(false);
      }
    };
    if (!data.selectedRate && data.selectedRate === null) {
      fetchPercelRates();
    }

    // call stripe payment 
    const stripePay = async () => {
      try{
        const response = await axiosSecure.post('/stripe/checkout', {
          total:100,
          rate_id:"a0ec84987e714135b6b19092e00dd0a8",
          success_url:"https://pngtree.com/freepng/flat-style-payment-success-icon-with-check-mark-vector_12869531.html",
          cancel_url:"https://pngtree.com/freepng/cancel-stamp-template-solid-color_7820002.html",
        });
        console.log(response);
        if(response.status === 201){
          window.open(response.data.data.payment_link, '_blank',);
        }
      }catch(error){
        console.log(error);
      }
    }

    if(data.paymentOption === 'stripe'){
      stripePay()
    }
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
                        type="tel"
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
                    {errors.destinationCountry && (
                      <p className="error-message">
                        {errors.destinationCountry.message}
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
                        htmlFor="destinationStreetAddress"
                        className="shipment-label"
                      >
                        Address <span>*</span>
                      </label>
                      <input
                        type="text"
                        name="destinationStreetAddress"
                        id="destinationStreetAddress"
                        placeholder="Street Address"
                        className="shipment-input"
                        {...register("destinationStreetAddress", {
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
                    {errors.destinationStreetAddress && (
                      <p className="error-message">
                        {errors.destinationStreetAddress.message}
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
                        type="tel"
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
                      type="tel"
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
                    <div key={index} className="grid grid-cols-4 gap-6 pt-6">
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
                                {bagSizeData?.map((item, index) => (
                                  <SelectItem
                                    key={index}
                                    value={item?.bag_size}
                                  >
                                    {item?.bag_size}
                                  </SelectItem>
                                ))}
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
                                  <SelectItem value="1000">
                                    $1,000 ($0.00)
                                  </SelectItem>
                                  <SelectItem value="1500">
                                    $1,500 ($5.99)
                                  </SelectItem>
                                  <SelectItem value="2500">
                                    $2,500 ($8.99)
                                  </SelectItem>
                                  <SelectItem value="3000">
                                    $3,000 ($9.99)
                                  </SelectItem>
                                  <SelectItem value="3500">
                                    $3,500 ($19.99)
                                  </SelectItem>
                                  <SelectItem value="5000">
                                    $5,000 ($29.99)
                                  </SelectItem>
                                  <SelectItem value="7500">
                                    $7,500 ($39.99)
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
                                {bagSizeData?.map((item, index) => (
                                  <SelectItem
                                    key={index}
                                    value={item?.bag_size}
                                  >
                                    {item?.bag_size}
                                  </SelectItem>
                                ))}
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
                                  <SelectItem value="1000">
                                    $1,000 ($0.00)
                                  </SelectItem>
                                  <SelectItem value="1500">
                                    $1,500 ($5.99)
                                  </SelectItem>
                                  <SelectItem value="2500">
                                    $2,500 ($8.99)
                                  </SelectItem>
                                  <SelectItem value="3000">
                                    $3,000 ($9.99)
                                  </SelectItem>
                                  <SelectItem value="3500">
                                    $3,500 ($19.99)
                                  </SelectItem>
                                  <SelectItem value="5000">
                                    $5,000 ($29.99)
                                  </SelectItem>
                                  <SelectItem value="7500">
                                    $7,500 ($39.99)
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
              {/* parcels rate if have  */}
              <div>
                {parcelRateLoading ? (
                  <p>
                    <img className="w-[80px]" src={loaderSvg} alt="" />
                  </p>
                ) : parcelData?.rates?.length > 0 ? (
                  <div className="mb-10">
                    <h3 className="text-[24px] font-semibold text-heading mb-5">
                      Deliver by
                    </h3>
                    <Controller
                      name="selectedRate"
                      control={control}
                      rules={{ required: "Please select a shipping option" }}
                      render={({ field }) => (
                        <div className="grid grid-cols-5 gap-5">
                          {parcelData?.rates?.map((rate) => (
                            <div key={rate.object_id}>
                              <input
                                type="radio"
                                id={`rate-${rate.object_id}`}
                                {...field}
                                value={rate.object_id}
                                checked={field.value === rate.object_id}
                                className="h-5 w-5 text-primaryGreen focus:ring-primaryGreen rate-custom-input"
                              />
                              <label
                                htmlFor={`rate-${rate.object_id}`}
                                className="flex-1 cursor-pointer rate-custom-label inline-block overflow-hidden border rounded-[8px] w-full"
                              >
                                <div>
                                  <p className="font-semibold text-[20px] bg-primaryGreen text-white provider_name text-center py-1">
                                    {rate.servicelevel.display_name !== null
                                      ? rate.servicelevel.display_name
                                      : rate.provider}
                                  </p>
                                  <p className="font-bold text-[26px] text-center py-4 px-2">
                                    ${rate.amount}
                                  </p>
                                </div>
                              </label>
                            </div>
                          ))}
                        </div>
                      )}
                    />
                    {errors.selectedRate && (
                      <p className="error-message">
                        {errors.selectedRate.message}
                      </p>
                    )}
                  </div>
                ) : (
                  ""
                )}
                {parcelData?.rates?.length === 0 && !parcelRateLoading && (
                  <p className="py-3 px-4 border text-red-500 rounded-[8px] font-medium w-fit text-[18px] mb-5 flex items-center gap-2">
                    <span className="text-[20px]">
                      <MdErrorOutline />
                    </span>
                    We were unable to retrieve the rates for the parcel at the
                    provided address. Please try again with a valid address.
                  </p>
                )}
              </div>
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
                  <Controller
                    name="handlingMethod"
                    id="handlingMethod"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        onValueChange={(value) => field.onChange(value)}
                        defaultValue="localCarrier"
                      >
                        <SelectTrigger className="shipment-select !h-[77px]">
                          <SelectValue placeholder="Select pickup location" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="myLocation" className="text-[18px]">
                            Pickup from my location{" "}
                            <span className="font-bold">+$4.99</span>
                          </SelectItem>
                          <SelectItem value="localCarrier" className="text-[18px]">
                            Drop off at local carrier store
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
              </div>
              {/* payment option  */}
              <div className="mt-10">
                <h3 className="text-[22px] font-semibold mb-6">Choose a payment options</h3>
                <div className="flex items-center gap-5">
                  {/* stripe  */}
                  <div>
                    <input
                      type="radio"
                      name="paymentOption"
                      id="stripe"
                      value="stripe"
                      {...register("paymentOption", {
                        required: parcelData?.rates.length > 0,
                      })}
                      className="payment-input"
                    />
                    <label htmlFor="stripe" className="payment-label">
                      <img
                        className="w-10 h-10 rounded-[2px]"
                        src={StripeImage}
                        alt=""
                      />
                    </label>
                  </div>
                  {/* paypal  */}
                  <div>
                    <input
                      type="radio"
                      name="paymentOption"
                      id="paypal"
                      value="paypal"
                      {...register("paymentOption", {
                        required: parcelData?.rates.length > 0,
                      })}
                      className="payment-input"
                    />
                    <label htmlFor="paypal" className="payment-label">
                      <img
                        className="w-10 h-10 rounded-[2px]"
                        src={PaypalImage}
                        alt=""
                      />
                    </label>
                  </div>
                </div>
              </div>
              {errors.paymentOption && (
                <span className="error-message">
                  Please select a payment option.
                </span>
              )}
            </div>
          </div>
          <div className="text-center mt-12">
            <button type="submit">
              <PrimaryButton
                text={
                  parcelData?.rates.length > 0 ? "Place Order" : "Get a Price"
                }
                className={`py-4 px-[60px] bg-primaryGreen gap-2 rounded-[40px] text-[18px] font-bold text-white border border-primaryGreen hover:bg-transparent hover:text-primaryGreen`}
              />
            </button>
          </div>
        </form>
      </Container>
    </section>
  );
};

export default ScheduleShipment;

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
import dhlStore from "../../assets/icons/dhl.svg";
import fedExStore from "../../assets/icons/fedex.svg";
import upsStore from "../../assets/icons/ups.svg";
import dhlCircle from "../../assets/images/dhl-circle.png";
import fedExCircle from "../../assets/images/fedex-circle.png";
import upsCircle from "../../assets/images/ups-circle.png";
import Container from "../../container/Container";
import PrimaryButton from "../common/PrimaryButton";
import TitleV2 from "../common/TitleV2";

const HelpSection = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const [map, setMap] = useState(null);
  const [service, setService] = useState(null);
  const [markers, setMarkers] = useState([]);

  // fetch all country
  const { data: allCountry, isLoading: countryDataLoading } = useQuery({
    queryKey: ["help-country-data"],
    queryFn: async () => {
      const response = await api.get(
        "https://countriesnow.space/api/v0.1/countries/states"
      );
      return response.data.data;
    },
  });

  useEffect(() => {
    // Load Google Maps API script dynamically
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyA_G_EhWhTWpRYaE6_kR8txUKUkmZkvNiQ&libraries=places`;
    script.async = true;
    script.onload = () => {
      initMap();
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Initialize the map and set Google Places service
  const initMap = () => {
    const mapInstance = new window.google.maps.Map(
      document.getElementById("map"),
      {
        center: { lat: 37.7749, lng: -122.4194 }, // Default to San Francisco
        zoom: 13,
      }
    );

    const serviceInstance = new window.google.maps.places.PlacesService(
      mapInstance
    );
    setMap(mapInstance);
    setService(serviceInstance);
  };

  const onSubmit = async (data) => {
    markers?.forEach((marker) => marker.setMap(null));
    setMarkers([]);
    // Get the address input from the form
    const address = data.address;
    const geocodeRequest = {
      address: address,
    };

    // Geocode the address to get latitude and longitude
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode(geocodeRequest, (results, status) => {
      if (status === window.google.maps.GeocoderStatus.OK) {
        const { lat, lng } = results[0].geometry.location;

        // Center the map to the entered address
        map.setCenter(new window.google.maps.LatLng(lat(), lng()));

        // Perform a nearby search for the selected store type (FedEx, UPS, DHL)
        const keyword =
          data.provider === "ups"
            ? "UPS"
            : data.provider === "fedex"
            ? "FedEx"
            : "DHL";
        const request = {
          location: new window.google.maps.LatLng(lat(), lng()),
          radius: 5000, // 5 km radius
          keyword: keyword, // Search for selected store type
          types: ["courier_service"],
        };

        service.nearbySearch(request, (results, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            const newMarkers = results.map((place) => {
              const marker = new window.google.maps.Marker({
                map: map,
                position: place.geometry.location,
                title: place.name,
                icon: {
                  url:
                    keyword === "DHL"
                      ? dhlCircle
                      : keyword === "FedEx"
                      ? fedExCircle
                      : upsCircle,
                  scaledSize: new window.google.maps.Size(24, 24), 
                },
              });

              const infowindow = new window.google.maps.InfoWindow({
                content: place.name,
              });

              marker.addListener("click", () => {
                infowindow.open(map, marker);
              });
              return marker;
            });
            setMarkers(newMarkers);
          }
        });
      } else {
        toast.error(
          "Could not get the location. Please try again with valid address."
        );
      }
    });
  };

  return (
    <section className="pt-[210px] pb-[120px] custom-md:pt-[150px] custom-md:pb-[100px] custom-sm:pt-[150px] custom-sm:pb-[80px] custom-xs:pt-[130px] custom-xs:!pb-[60px]">
      <Container>
        <div>
          {/* title  */}
          <div className="mb-[60px] custom-md:mb-10 custom-sm:mb-8 custom-xs:mb-8">
            <TitleV2 subTitle="HELP" title="Help" description="" />
          </div>
          <div className="flex items-start custom-lg:block max-md:block">
            <div className="w-[50%] pr-[30px] custom-lg:pr-0 max-md:pr-0 custom-lg:w-full max-md:w-full">
              <h4 className="text-[32px] font-bold text-primaryGreen pb-3 border-b border-[#B3BAC5] custom-md:text-[24px] max-md:pb-6 custom-sm:text-[20px] custom-xs:text-[20px]">
                Search for a drop-off location near you
              </h4>
              <form onSubmit={handleSubmit(onSubmit)}>
                {/* help-input-feild  */}
                <div className="help-input-feild">
                  {/* input-inner  */}
                  <div className="input-inner">
                    <label htmlFor="zipCode">
                      <span>*</span> Address
                    </label>
                    <input
                      type="text"
                      className="help-input"
                      placeholder="Enter address"
                      name="address"
                      id="address"
                      {...register("address", {
                        required: "Please enter a valid address",
                      })}
                    />
                  </div>
                  {errors.address && (
                    <p className="text-sm mt-1 text-red-500">
                      {errors.address.message}
                    </p>
                  )}
                </div>
                {/* help-input-feild  */}
                <div className="help-input-feild">
                  {/* input-inner  */}
                  <div className="input-inner">
                    <label htmlFor="country">
                      <span>*</span> Country
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
                          <SelectTrigger className="w-[203px] max-md:w-[80%] custom-xs:!w-full custom-xs:!h-[55px] h-[70px] max-md:h-[60px] rounded-[12px] text-[18px] px-5 text-paragraph focus:ring-0">
                            <SelectValue placeholder="Select a country" />
                          </SelectTrigger>
                          <SelectContent>
                            {allCountry?.map((country) => (
                              <SelectItem value={country?.name}>
                                {country?.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                  {errors.country && (
                    <p className="text-sm mt-1 text-red-500">
                      {errors.country.message}
                    </p>
                  )}
                </div>
                {/* help-input-feild  */}
                <div className="help-input-feild store-type">
                  {/* input-inner  */}
                  <div className="input-inner !w-full max-md:!block">
                    <label htmlFor="#" className="max-md:mb-5 max-md:block">
                      <span>*</span> Store Type
                    </label>
                    <div className="stores grid grid-cols-2 gap-6 custom-xs:grid-cols-1 custom-xs:gap-2">
                      {/* store type */}
                      <div>
                        <input
                          type="radio"
                          className="help-input max-md:!w-full"
                          name="store-input"
                          value="ups"
                          id="ups"
                          {...register("provider", {
                            required: "Please select a store type",
                          })}
                        />
                        <label htmlFor="ups">
                          <img src={upsStore} alt="upsStore" />
                        </label>
                      </div>
                      {/* store type */}
                      <div>
                        <input
                          type="radio"
                          className="help-input max-md:!w-full"
                          name="store-input"
                          value="fedex"
                          id="fedEx"
                          {...register("provider", {
                            required: "Please select a store type",
                          })}
                        />
                        <label htmlFor="fedEx">
                          <img src={fedExStore} alt="fedExStore" />
                        </label>
                      </div>
                      {/* store type */}
                      <div>
                        <input
                          type="radio"
                          className="help-input max-md:!w-full"
                          name="store-input"
                          value="dhl"
                          id="dhl"
                          {...register("provider", {
                            required: "Please select a store type",
                          })}
                        />
                        <label htmlFor="dhl">
                          <img src={dhlStore} alt="dhlStore" />
                        </label>
                      </div>
                    </div>
                  </div>
                  {errors.provider && (
                    <p className="error-message">{errors.provider.message}</p>
                  )}
                </div>
                {/* help-input-feild  */}
                <div className="help-input-feild flex items-center justify-center">
                  <button className="w-[440px]">
                    <PrimaryButton
                      text="Search Stores"
                      className="p-4 bg-primaryGreen text-white rounded-[40px] font-bold justify-center duration-200 ease-in-out hover:bg-primaryGreen custom-xs:p-3"
                    />
                  </button>
                </div>
                <p className="text-[18px] text-primaryGreen pt-10 font-semibold">
                  Please match the carrier on your shipping label with the
                  corresponding carrier drop off location.
                </p>
              </form>
            </div>
            <div className="w-[50%] pl-[30px] custom-lg:w-full custom-lg:pl-0 custom-lg:mt-10 max-md:w-full max-md:pl-0 max-md:mt-10 custom-xs:!mt-5">
              <div
                id="map"
                className="h-[850px] custom-md:h-[600px] custom-sm:h-[400px] custom-xs:h-[340px] rounded-[16px] border-[5px] border-heading"
              ></div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default HelpSection;

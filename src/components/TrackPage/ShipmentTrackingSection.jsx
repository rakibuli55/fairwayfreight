import React from "react";
import { useForm } from "react-hook-form";
import Container from "../../container/Container";
import TitleV2 from "../common/TitleV2";
import PrimaryButton from "../common/PrimaryButton";

const SshipmentTrackingSection = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <section className="pt-[225px] pb-[10px] custom-md:pt-[160px] custom-sm:pt-[150px] custom-xs:pt-[120px]">
      <Container>
        <div>
          {/* title  */}
          <div className="mb-[45px] custom-md:mb-7 custom-xs:mb-5">
            <TitleV2
              subTitle="Track"
              title="Shipment Tracking"
              description="Track your shipments easily—enter your tracking number below to get real-time updates."
            />
          </div>
          <form className="w-[850px] max-md:w-[90%] custom-xs:!w-full mx-auto text-center" onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="trackingNumber" className="block text-[18px] font-bold text-heading mb-2 capitalize text-left">
              tracking number <span className="text-red-500">*</span>{" "}
            </label>
            <input
              type="text"
              placeholder="Enter Fairway Freight tracking number"
              name="trackingNumber"
              id="trackingNumber"
              {...register('trackingNumber', {required:'Please enter a tracking number'})}
              className="py-[25px] px-5 custom-md:py-4 custom-sm:py-4 custom-xs:py-3 custom-xs:px-4 custom-xs:text-base bg-white w-full border border-[#B3BAC5] rounded-[12px] text-[18px] text-heading focus:outline-none"
            />
            <button type="submit" className="mt-[50px] max-md:mt-8">
              <PrimaryButton text="Track" className="text-bold text-white py-4 px-[81px] rounded-[40px] bg-primaryGreen border border-primaryGreen duration-200 ease-in-out hover:bg-transparent hover:text-primaryGreen hover:scale-[1.05] w-fit max-md:py-3 max-md:px-8" />
            </button>
          </form>
        </div>
      </Container>
    </section>
  );
};

export default SshipmentTrackingSection;

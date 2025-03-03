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
    <section className="pt-[225px] pb-[10px]">
      <Container>
        <div>
          {/* title  */}
          <div className="mb-[45px]">
            <TitleV2
              subTitle="Track"
              title="Shipment Tracking"
              description="Track your shipments easily—enter your tracking number below to get real-time updates."
            />
          </div>
          <form className="w-[850px] mx-auto text-center" onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="trackingNumber" className="block text-[18px] font-bold text-heading mb-2 capitalize text-left">
              tracking number <span className="text-red-500">*</span>{" "}
            </label>
            <input
              type="text"
              placeholder="Enter Fairway Freight tracking number"
              name="trackingNumber"
              id="trackingNumber"
              {...register('trackingNumber', {required:'Please enter a tracking number'})}
              className="py-[25px] px-5 bg-white w-full border border-[#B3BAC5] rounded-[12px] text-[18px] text-heading focus:outline-none"
            />
            <button type="submit" className="mt-[50px]">
              <PrimaryButton text="Track" className="text-bold text-white py-4 px-[81px] rounded-[40px] bg-primaryGreen border border-primaryGreen duration-200 ease-in-out hover:bg-transparent hover:text-primaryGreen hover:scale-[1.05] w-fit" />
            </button>
          </form>
        </div>
      </Container>
    </section>
  );
};

export default SshipmentTrackingSection;

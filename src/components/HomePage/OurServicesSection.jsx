import React from "react";
import Container from "../../container/Container";
import TitleV2 from "../common/TitleV2";
import ServiceCard from "./OurServices/ServiceCard";
import PrimaryButton from "../common/PrimaryButton";
import { Link } from "react-router-dom";


const OurServicesSection = ({servicesData}) => {
  return (
    <section className="py-[120px] custom-2xl:py-[100px] custom-xl:py-[100px] custom-lg:py-[100px]">
      <Container>
        <div>
          {/* title  */}
          <div className="mb-[14px]">
            <TitleV2
              subTitle="WHAT WE DO"
              title="Our Services"
              description="At Fairway Freight, we understand that golf is more than just a sport-it's a lifestyle. Whether you're traveling to a new course, sending clubs to a golf resort, or shipping equipment from your country club, we provide seamless, reliable, and affordable shipping solutions that ensure your clubs are in perfect condition when they reach their destination."
            />
          </div>
          <div className="service-cards-wrapper">
            {servicesData?.map((item) => (
              <div key={item?.id} className="mt-[64px] card-inner">
                <ServiceCard item={item} />
              </div>
            ))}
          </div>
          {/* ship button  */}
          <Link to={'/'}>
            <PrimaryButton text="Ship now" className="py-4 px-[68px] bg-primaryGreen border border-primaryGreen rounded-[40px] text-white duration-200 ease-in-out hover:bg-transparent hover:text-primaryGreen font-semibold mt-[64px] w-fit mx-auto hover:scale-[1.05]" />
          </Link>
        </div>
      </Container>
    </section>
  );
};

export default OurServicesSection;

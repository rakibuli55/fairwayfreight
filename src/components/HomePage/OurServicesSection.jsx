import React from "react";
import service1 from "../../assets/images/service1.png";
import service2 from "../../assets/images/service2.png";
import service3 from "../../assets/images/service3.png";
import Container from "../../container/Container";
import TitleV2 from "../common/TitleV2";
import ServiceCard from "./OurServices/ServiceCard";
import PrimaryButton from "../common/PrimaryButton";
import { Link } from "react-router-dom";

const servicesData = [
  {
    id: 1,
    image: service1,
    title: "Golf Club Shipping Made Easy",
    description:
      "We specialize in shipping golf clubs from residential addresses, businesses, or country clubs directly to country clubs, golf courses, and golf resorts. Our goal is to simplify the process, taking the hassle out of transporting your valuable golf equipment.From the moment we pick up your golf clubs to the moment they arrive safely at their destination, we prioritize care, timeliness, and convenience. Our team works meticulously to ensure your equipment is handled with the utmost attention to detail.",
    isReversed: true,
  },
  {
    id: 2,
    image: service2,
    title: "White Glove Service for Every Shipment",
    description:
      "We specialize in shipping golf clubs from residential addresses, businesses, or country clubs directly to country clubs, golf courses, and golf resorts. Our goal is to simplify the process, taking the hassle out of transporting your valuable golf equipment.From the moment we pick up your golf clubs to the moment they arrive safely at their destination, we prioritize care, timeliness, and convenience. Our team works meticulously to ensure your equipment is handled with the utmost attention to detail.",
    isReversed: false,
  },
  {
    id: 3,
    image: service3,
    title: "Affordable and Competitive Pricing",
    description:
      "We specialize in shipping golf clubs from residential addresses, businesses, or country clubs directly to country clubs, golf courses, and golf resorts. Our goal is to simplify the process, taking the hassle out of transporting your valuable golf equipment.From the moment we pick up your golf clubs to the moment they arrive safely at their destination, we prioritize care, timeliness, and convenience. Our team works meticulously to ensure your equipment is handled with the utmost attention to detail.",
    isReversed: true,
  },
];

const OurServicesSection = () => {
  return (
    <section className="py-[120px]">
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
          <div>
            {servicesData?.map((item) => (
              <div key={item?.id} className="mt-[64px]">
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

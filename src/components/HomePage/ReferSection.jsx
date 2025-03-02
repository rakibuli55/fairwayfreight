import Container from "../../container/Container"
import React from 'react';
import Banner from "../../assets/images/refer-banner.png"
import PrimaryButton from "../common/PrimaryButton";
import { Link } from "react-router-dom";

const ReferSection = () => {
  return (
    <section className='pt-[120px] pb-[135px] relative overlay-section bg-no-repeat bg-cover' style={{ backgroundImage:`url(${Banner})` }}>
      <Container>
        <div className="relative z-[1]">
          <h3 className='text-[64px] font-bold font-tungsten leading-normal text-white w-[622px] mx-auto text-center'>Refer your friends and get <span className="text-[#faca42]">$10</span> off your next shipment.</h3> 
          <Link to={'/'}>
            <PrimaryButton text="Ship Now" className="py-4 px-12 rounded-[40px] bg-white border border-white font-semibold duration-200 ease-in-out hover:scale-[1.05] hover:bg-transparent w-fit mx-auto hover:text-white mt-5" />
          </Link>
        </div>
      </Container>
    </section>
  );
};

export default ReferSection;
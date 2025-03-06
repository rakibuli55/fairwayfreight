import Container from "../../container/Container";
import TitleV2 from "../common/TitleV2";
import {
    Accordion
  } from "@/components/ui/accordion"
import Faq from "./FaqSection/Faq";

const faqData = [
    {
        id:1,
        question:'Can I have my golf clubs picked up?',
        answer:'The cost of shipping your golf clubs depends on the destination, shipment size, and speed of delivery. Rates typically start at around $39 for domestic shipments, with international shipping varying based on location.'
    },
    {
        id:2,
        question:'How much does it cost?',
        answer:'The cost of shipping your golf clubs depends on the destination, shipment size, and speed of delivery. Rates typically start at around $39 for domestic shipments, with international shipping varying based on location.'
    },
    {
        id:3,
        question:'Should I contact the hotel or resort that my golf clubs are being shipped to?',
        answer:'The cost of shipping your golf clubs depends on the destination, shipment size, and speed of delivery. Rates typically start at around $39 for domestic shipments, with international shipping varying based on location.'
    },
    {
        id:4,
        question:'How long does shipping take?',
        answer:'The cost of shipping your golf clubs depends on the destination, shipment size, and speed of delivery. Rates typically start at around $39 for domestic shipments, with international shipping varying based on location.'
    },
    {
        id:5,
        question:'What happens if my golf clubs are delayed?',
        answer:'The cost of shipping your golf clubs depends on the destination, shipment size, and speed of delivery. Rates typically start at around $39 for domestic shipments, with international shipping varying based on location.'
    },
]

const FaqSection = () => {
  return (
    <section className="pt-[106px] pb-[124px]">
      <Container>
        <div className="mb-10">
            <TitleV2 subTitle="FAQ" title="Frequently Asked Questions" />
        </div>
        <div>
        <Accordion type="single" collapsible className="w-full px-[77px] py-10 bg-white shadow-[0px_5px_16px_0px_rgba(0,0,0,0.10)] rounded-[20px] faq-accordion">
            {
                faqData?.map((item) => (
                    <Faq key={item?.id} item={item} />
                ))
            }
        </Accordion>
        </div>
      </Container>
    </section>
  );
};

export default FaqSection;
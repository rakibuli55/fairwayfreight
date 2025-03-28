import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Faq = ({item}) => {
  return (
    <AccordionItem value={`item-${item?.id}`}>
      <AccordionTrigger className="text-[32px] font-bold text-heading py-[26px] custom-md:py-[20px] custom-lg:text-[26px] custom-md:text-[22px] custom-sm:text-[18px] custom-sm:text-left custom-sm:py-5 custom-xs:text-left custom-xs:text-[17px] custom-xs:py-4">{item?.question}</AccordionTrigger>
      <AccordionContent className="text-[20px] text-paragraph leading-[32px] w-[80%] max-md:w-full custom-sm:text-base custom-xs:text-base">
        {item?.answer}
      </AccordionContent>
    </AccordionItem>
  );
};

export default Faq;

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Faq = ({item}) => {
  return (
    <AccordionItem value={`item-${item?.id}`}>
      <AccordionTrigger className="text-[32px] font-bold text-heading py-[26px]">{item?.question}</AccordionTrigger>
      <AccordionContent className="text-[20px] text-paragraph leading-[32px] w-[80%]">
        {item?.answer}
      </AccordionContent>
    </AccordionItem>
  );
};

export default Faq;

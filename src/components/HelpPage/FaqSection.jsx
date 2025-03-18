import { Accordion } from "@/components/ui/accordion";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../api/index";
import Container from "../../container/Container";
import TitleV2 from "../common/TitleV2";
import Faq from "./FaqSection/Faq";

const FaqSection = () => {
  const { data: faqData, isLoading: faqDataLoading } = useQuery({
    queryKey: ["faqData"],
    queryFn: async () => {
      const res = await api.get("/faq/all");
      return res?.data?.data;
    },
  });

  return (
    <section className="pt-[106px] pb-[124px]">
      <Container>
        <div className="mb-10">
          <TitleV2 subTitle="FAQ" title="Frequently Asked Questions" />
        </div>
        <div>
          <Accordion
            type="single"
            collapsible
            className="w-full px-[77px] py-10 bg-white shadow-[0px_5px_16px_0px_rgba(0,0,0,0.10)] rounded-[20px] faq-accordion"
          >
            {faqData?.map((item) => (
              <Faq key={item?.id} item={item} />
            ))}
          </Accordion>
        </div>
      </Container>
    </section>
  );
};

export default FaqSection;

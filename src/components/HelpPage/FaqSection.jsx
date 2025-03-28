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
    <section className="pt-[106px] pb-[124px] custom-lg:py-0 max-md:pt-0 max-md:pb-20">
      <Container>
        <div className="mb-10 custom-sm:mb-7 custom-xs:mb-6">
          <TitleV2 subTitle="FAQ" title="Frequently Asked Questions" />
        </div>
        <div>
          <Accordion
            type="single"
            collapsible
            className="w-full px-[77px] max-md:p-6 py-10 bg-white shadow-[0px_5px_16px_0px_rgba(0,0,0,0.10)] rounded-[20px] faq-accordion custom-xs:!p-5"
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

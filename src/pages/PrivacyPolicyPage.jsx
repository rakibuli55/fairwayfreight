import { api } from "@/api";
import Container from "@/container/Container";
import { useQuery } from "@tanstack/react-query";
import DOMPurify from 'dompurify';

const PrivacyPolicyPage = () => {

  const { data: privacyData, isLoading: privacydataLoading } = useQuery({
    queryKey: ["privacyData"],
    queryFn: async () => {
      const response = await api.get("/dynamic-pages");
      console.log(response?.data?.data[0]);
      return response?.data?.data[0];
    },
  });

  return (
    <section className="pt-[180px] pb-[100px] custom-xs:pt-[110px] custom-xs:pb-[50px]">
      <Container>
        <div>
            <h1 className="text-[34px] font-bold text-center mb-10 custom-xs:text-[26px]">{privacyData?.page_title}</h1>
            <div className="content-box" dangerouslySetInnerHTML={{__html:DOMPurify.sanitize(privacyData?.page_content)}}>
            </div>
        </div>
      </Container>
    </section>
  );
};

export default PrivacyPolicyPage;

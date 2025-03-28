import { useQuery } from "@tanstack/react-query";
import { api } from "../../api/index";
import Container from "../../container/Container";
import TitleV2 from "../common/TitleV2";
import ClaimCard from "./ClaimSection/ClaimCard";

const ClaimSection = () => {
  const { data: claimData, isLoading: claimDataLoading } = useQuery({
    queryKey: ["claimData"],
    queryFn: async () => {
      const res = await api.get("/claims");
      return res?.data?.data;
    },
  });

  return (
    <section className="pt-[100px] max-md:pt-0">
      <Container>
        <div className="mb-6">
          <TitleV2 subTitle="Claim" title="Claim" />
        </div>
        <div>
          {claimData?.map((item) => (
            <ClaimCard key={item?.id} item={item} />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default ClaimSection;

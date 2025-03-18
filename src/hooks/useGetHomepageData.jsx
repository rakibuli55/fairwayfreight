import { useQuery } from "@tanstack/react-query";
import { api } from "../api/index";

const useGetHomepageData = () => {
  const { data: homePagedata, isLoading: homeDataLoading } = useQuery({
    queryKey: ["homepageData"],
    queryFn: async () => {
      const res = await api.get("/get-home");
      return res?.data?.data;
    },
  });

  return {homePagedata, homeDataLoading}
};

export default useGetHomepageData;

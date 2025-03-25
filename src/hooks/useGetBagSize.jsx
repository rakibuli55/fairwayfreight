import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useGetBagSize = () => {
  const axiosSecure = useAxiosSecure();

  const { data: bagSizeData, isLoading: bagSizeDataLoading } = useQuery({
    queryKey: ["bag-size"],
    queryFn: async () => {
      const response = await axiosSecure.get("/bag-sizes");
      return response?.data?.data;
    },
  });

  return { bagSizeData, bagSizeDataLoading };
};

export default useGetBagSize;

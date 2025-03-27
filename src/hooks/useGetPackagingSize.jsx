import { api } from "../api/index";
import { useQuery } from "@tanstack/react-query";


const useGetPackagingSize = () => {
  const {data:packageingSize, isLoading:packagingDataLoading} = useQuery({
    queryKey:['packagingData'],
    queryFn: async () => {
        const response = await api.get('/packaging-types');
        return response.data.data;
    }
  });

  return {packageingSize, packagingDataLoading}
};

export default useGetPackagingSize;
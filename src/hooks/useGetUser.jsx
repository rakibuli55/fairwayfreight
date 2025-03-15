import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useGetUser = (token) => {
  const axiosSecure = useAxiosSecure();

  const authToken = localStorage.getItem("authToken") || token;

  const { data: userData, isLoading: userLoading } = useQuery({
    queryKey: ["user-data", authToken],
    queryFn: async () => {
      if (token) {
        const res = await axiosSecure.get("/users/data");
        return res.data?.data;
      } else {
        return null;
      }
    },
    enabled: !!authToken,
    retry:1,
  });

  return { userData, userLoading };
};

export default useGetUser;

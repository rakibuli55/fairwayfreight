import axios from "axios";
import { useEffect } from "react";

const useAxiosSecure = () => {
  const token = localStorage.getItem("authToken");

  const axiosSecure = axios.create({
    baseURL: "https://fairwayfreight.softvencefsd.xyz/api",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  useEffect(() => {
    const interceptor = axiosSecure.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          localStorage.removeItem("token");
        }
        return Promise.reject(error);
      }
    );
    return () => {
      axiosSecure.interceptors.response.eject(interceptor);
    };
  }, [axiosSecure]);

  return axiosSecure;
};

export default useAxiosSecure;

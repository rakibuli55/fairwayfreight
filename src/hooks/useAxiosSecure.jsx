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

    const handleStorageChange = (e) => {
      if(e.key === "authToken" && e.newValue !== token){
        localStorage.removeItem("authToken");
        if (window.location.pathname !== "/") {
          window.location.href = "/";
        }
      }
    }

    window.addEventListener("storage", handleStorageChange);


    const interceptor = axiosSecure.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          localStorage.removeItem("authToken");
          if (window.location.pathname !== "/") {
            window.location.href = "/";
          }
        }
        return Promise.reject(error);
      }
    );
    return () => {
      axiosSecure.interceptors.response.eject(interceptor);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [axiosSecure, token]);

  return axiosSecure;
};

export default useAxiosSecure;

import { api } from "../api/index";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


const useVerifyOtp = () => {
  const [isLoading, setIsLoading] = useState(false);
const navigate = useNavigate()
  const verifyOtp = async (credentials) => {
    setIsLoading(true);
    try{
        const response = await api.post('/users/login/otp-verify', credentials);
        console.log(response);
        if(response.status === 200){
            toast.success(response.data.message);
            navigate('/auth/reset-password');
        }
    }catch(error){
        toast.error(error.response?.data?.message);
        console.log(error);
    }finally{
        setIsLoading(false)
    }
  }

  return {verifyOtp, isLoading}
};

export default useVerifyOtp;
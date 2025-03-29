import toast from "react-hot-toast";
import { api } from "../api/index";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/index";

const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const {setAuthToken, setUser, setReferralCode} = useContext(AuthContext);

  const userLogin = async (credentials) => {
    setIsLoading(true);
    try {
      const response = await api.post("/users/login", credentials);
      if (response.status === 200) {
        const userData = response?.data?.data;
        localStorage.setItem('authToken', userData?.token)
        localStorage.setItem('referral_code', userData?.referral_code)
        setAuthToken(userData?.token);
        setUser(userData);
        setReferralCode(userData?.referral_code);
        toast.success(response?.data?.message);
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { userLogin, isLoading };
};

export default useLogin;

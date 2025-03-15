import toast from "react-hot-toast";
import { api } from "../api/index";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/index";

const useUserRegister = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const {setUser} = useContext(AuthContext)

  const userRegister = async (credentials) => {
    setIsLoading(true);
    try {
      const response = await api.post("/users/register", credentials);
      
      if (response.status === 201) {
        const userData = response?.data?.data;
        setUser(userData);
        toast.success(response?.data?.message);
        navigate("/auth/login");
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { userRegister, isLoading };
};

export default useUserRegister;

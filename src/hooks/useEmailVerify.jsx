import { api } from "../api/index";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


const useEmailVerify = () => {

    const [isLoading, setisLoading] = useState(false);
    const navigate = useNavigate();

    const verifyEmail = async (credentials) => {
        setisLoading(true);
        try{
            const response = await api.post('/users/login/email-verify', credentials);
            if(response.status === 200){
                localStorage.setItem('userEmail', response.data.data.email);
                toast.success(response.data.message);
                navigate('/auth/verify-otp');
            }
        }catch(error){
            toast.error(error.response?.data?.message);
            console.log(error);
        }finally{
            setisLoading(false);
        }
    }

    return {verifyEmail, isLoading}
};

export default useEmailVerify;
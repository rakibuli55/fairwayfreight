import { api } from "../api/index";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


const useResetPassword = () => {

    const [isLoading, setisLoading] = useState(false);
    const navigate = useNavigate();

    const resetPassword = async (credentials) => {
        setisLoading(true);
        try{
            const response = await api.post('/users/login/reset-password', credentials);
            if(response.status === 200){
                toast.success(response.data.message);
                navigate('/auth/login');
            }
        }catch(error){
            toast.error(error.response.data.message);
            console.log(error);
        }finally{
            setisLoading(false);
        }
    }

    return {resetPassword, isLoading}
};

export default useResetPassword;
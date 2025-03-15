import { useContext, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { AuthContext } from "../context/index";


const useLogout = () => {

    const [loading, setLoading] = useState(false);
    const axiosSecure = useAxiosSecure()
    const {setUser} = useContext(AuthContext)
  
    const logout = async () => {
        setLoading(true);
        const loadingToast = toast.loading("Logging Out...");
        try{
            const response = await axiosSecure.post('/users/logout');
            if(response.status === 200){
                toast.success(`${response?.data?.message}`, { id: loadingToast });
                setUser(null);
                localStorage.removeItem('authToken');
            }
            console.log(response);
        }catch(error){
            console.log(error);
            toast.error(`${error?.response?.data?.message}`, { id: loadingToast });
        }
    }

    return {logout}
};

export default useLogout;
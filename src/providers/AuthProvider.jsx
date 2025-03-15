import { useEffect, useState } from "react";
import { AuthContext } from "../context/index";
import useGetUser from "../hooks/useGetUser";
import Preloader from "../components/common/Preloader";

const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(
    localStorage.getItem("authToken") || null
  );
  const [user, setUser] = useState(null);
  const { userData, userLoading } = useGetUser(authToken);

  useEffect(() => {
    if (userData) {
      setUser(userData);
    } else {
      setUser(null);
    }
  }, [userData]);

  if(userLoading){
    return <Preloader />
  }

  return (
    <AuthContext.Provider value={{ authToken, setAuthToken, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

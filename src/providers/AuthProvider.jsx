import { useEffect, useState } from "react";
import Preloader from "../components/common/Preloader";
import { AuthContext } from "../context/index";
import useGetSiteSettings from "../hooks/useGetSiteSettings";
import useGetUser from "../hooks/useGetUser";
import useGetHomepageData from "../hooks/useGetHomepageData";

const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(
    localStorage.getItem("authToken") || null
  );
  const [user, setUser] = useState(null);
  const { userData, userLoading } = useGetUser(authToken);
  const { siteSettingsData, siteSettingLoading } = useGetSiteSettings();
  const {homePagedata, homeDataLoading} = useGetHomepageData()
  const [favicon, setFavicon] = useState(null);

  useEffect(() => {
    if (userData) {
      setUser(userData);
    } else {
      setUser(null);
    }
  }, [userData]);

  useEffect(() => {
    if (siteSettingsData) {
      setFavicon(`${import.meta.env.VITE_SERVER_URL}/${siteSettingsData?.favicon}`);
    }
    if (favicon) {
      const link =
        document.querySelector("link[rel*='icon']") ||
        document.createElement("link");
      link.type = "image/svg+xml";
      link.rel = "icon";
      link.href = favicon;
      document.head.appendChild(link);
    }
  }, [siteSettingsData, favicon]);

  if (userLoading && siteSettingsData) {
    return <Preloader />;
  }

  return (
    <AuthContext.Provider
      value={{ authToken, setAuthToken, user, setUser, siteSettingsData, homePagedata, homeDataLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

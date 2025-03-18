import { api } from "../api/index";
import { useQuery } from "@tanstack/react-query";


const useGetSiteSettings = () => {
  const {data:siteSettingsData, isLoading:siteSettingLoading} = useQuery({
    queryKey:['siteSettingsData'],
    queryFn: async () => {
        const res = await api.get('/site-settings');
        return res?.data?.data
    }
  });

  return {siteSettingsData, siteSettingLoading}
};

export default useGetSiteSettings;
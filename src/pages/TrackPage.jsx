import { useContext } from 'react';
import ShipmentTrackingSection from '../components/TrackPage/ShipmentTrackingSection';
import NewsLatterSection from '../components/common/NewsLatterSection';
import { AuthContext } from '../context/index';

const TrackPage = () => {
  const {homePagedata, homeDataLoading} = useContext(AuthContext)
  return (
    <>
      <ShipmentTrackingSection />
      <NewsLatterSection newsLatterData={homePagedata?.subscription_section} />
    </>
  );
};

export default TrackPage;
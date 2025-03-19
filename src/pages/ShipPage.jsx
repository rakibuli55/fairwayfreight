import { useContext } from 'react';
import NewsLatterSection from '../components/common/NewsLatterSection';
import ScheduleShipment from '../components/ShipPage/ScheduleShipment';
import { AuthContext } from '../context/index';


const ShipPage = () => {
  const { homePagedata, homeDataLoading } = useContext(AuthContext);
  return (
    <>
      <ScheduleShipment />
      <NewsLatterSection newsLatterData={homePagedata?.subscription_section} />
    </>
  );
};

export default ShipPage;
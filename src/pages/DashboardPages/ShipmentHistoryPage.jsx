import { useQuery } from "@tanstack/react-query";
import OrderTable from "../../components/dashboard/ShipmentPage/OrderTable";
import BackButton from "../../components/dashboard/common/BackButton";
import MainTitle from "../../components/dashboard/common/MainTitle";
import useAxiosSecure from "../../hooks/useAxiosSecure";



const ShipmentHistory = () => {
  const axiosSecure = useAxiosSecure()

  const {data:shipmentsData, isLoading:shipmentDataLoading} = useQuery({
    queryKey: ['dash-shipment-data'],
    queryFn: async () => {
      const response = await axiosSecure.get('/shipments-history');
      return response?.data?.data;
    }
  });

  console.log('shipmentsData',shipmentsData);

  return (
    <section className="bg-white p-9 rounded-[16px]">
      <div>
        <MainTitle text="Shipment History" />
        <div className="mt-10 p-10 border border-[#F0F0F0] rounded-[12px]">
          <div>
            <BackButton />
          </div>
          <div>
            <OrderTable orders={shipmentsData} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShipmentHistory;

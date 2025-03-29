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


  return (
    <section className="bg-white p-9 rounded-[16px] max-md:p-6 max-md:pt-8 custom-xs:!p-4 custom-xs:!pt-6">
      <div>
        <MainTitle text="Shipment History" />
        <div className="mt-10 custom-xs:mt-8 p-10 max-md:p-5 border border-[#F0F0F0] rounded-[12px]">
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

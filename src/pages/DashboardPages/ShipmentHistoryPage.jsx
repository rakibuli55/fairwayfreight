import OrderTable from "../../components/dashboard/ShipmentPage/OrderTable";
import BackButton from "../../components/dashboard/common/BackButton";
import MainTitle from "../../components/dashboard/common/MainTitle";

const orders = [
  {
    created: "#DHGA18",
    orderId: "Robert Fox",
    trackingId: "Jenny Wilson",
    from: "#DHGA18",
    to: "02/02/2015",
    pickupDate: "05/02/2015",
    receipt: "link1", 
  },
  {
    created: "#DHGA18",
    orderId: "Robert Fox",
    trackingId: "Jenny Wilson",
    from: "#DHGA18",
    to: "02/02/2015",
    pickupDate: "05/02/2015",
    receipt: "link2",
  },
];

const ShipmentHistory = () => {
  return (
    <section className="bg-white p-9 rounded-[16px]">
      <div>
        <MainTitle text="Shipment History" />
        <div className="mt-10 p-10 border border-[#F0F0F0] rounded-[12px]">
          <div>
            <BackButton />
          </div>
          <div>
            <OrderTable orders={orders} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShipmentHistory;

import { BsFilePdf } from "react-icons/bs";

const OrderTable = ({ orders }) => {
  return (
    <div className="order-table-container mt-10 custom-xs:mt-6 custom-2xl:overflow-hidden">
      <div className="custom-2xl:overflow-x-auto custom-xl:overflow-x-auto custom-lg:overflow-x-auto max-md:overflow-x-auto">
        <table className="order-table w-full custom-2xl:w-[1000px] custom-xl:w-[1000px] custom-lg:w-[1000px] max-md:w-[1000px]">
          <thead>
            <tr>
              <th>Created</th>
              <th>Tracking ID</th>
              <th>Tracking Link</th>
              <th>Status</th>
              <th>Receipt</th>
            </tr>
          </thead>
          <tbody>
            {orders?.length > 0 ? (
              orders?.map((order, index) => (
                <tr key={index}>
                  <td>
                    {new Date(order?.created_at).toLocaleString("en-us", {
                      weekday: "short",
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </td>
                  <td>{order?.tracking_number}</td>
                  <td>
                    <a
                      href={order?.tracking_url_provider}
                      className="text-[#22a779] block whitespace-nowrap w-[300px] overflow-hidden"
                    >
                      {order?.tracking_url_provider}
                    </a>
                  </td>
                  <td className="capitalize">{order?.status}</td>
                  <td>
                    <a
                      href={`${order?.label_url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[30px]"
                    >
                      <BsFilePdf />
                    </a>
                  </td>
                </tr>
              ))
            ) : (
              <div className="text-[24px] font-bold w-full mt-6">
                No shipment history found
              </div>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderTable;

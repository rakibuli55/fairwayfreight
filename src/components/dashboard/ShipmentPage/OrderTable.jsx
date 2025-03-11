import { BsFilePdf } from "react-icons/bs";

const OrderTable = ({ orders }) => {
  return (
    <div className="order-table-container mt-10">
      <table className="order-table w-full">
        <thead>
          <tr>
            <th>Created</th>
            <th>Order ID</th>
            <th>Tracking ID</th>
            <th>From</th>
            <th>To</th>
            <th>Pickup Date</th>
            <th>Receipt</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={index}>
              <td>{order.created}</td>
              <td>{order.orderId}</td>
              <td>{order.trackingId}</td>
              <td>{order.from}</td>
              <td>{order.to}</td>
              <td>{order.pickupDate}</td>
              <td>
                <a
                  href={`#${order.receipt}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[30px]"
                >
                  <BsFilePdf />
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;

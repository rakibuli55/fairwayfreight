import { CiEdit } from "react-icons/ci";
import EditAddressDialouge from "./EditAddressDialouge";
import { useState } from "react";

const AddedAddressBook = ({ address }) => {
  const [selectedAddress, setSelectedAddress] = useState(null)
  return (
    <div className="mt-10 max-md:mt-6 p-6 custom-xs:p-4 custom-xs:pt-10 bg-[#f6f6f6] rounded-[8px] relative">
      <div className="user-profile-pair">
        <p className="key flex items-center justify-between">
          <span>Sender Name</span> <span>:</span>
        </p>
        <p className="font-bold capitalize">{address?.sender_name}</p>
      </div>
      <div className="user-profile-pair">
        <p className="key flex items-center justify-between">
          <span>Company Name</span> <span>:</span>
        </p>
        <p className="font-bold capitalize">{address?.company_name}</p>
      </div>
      <div className="user-profile-pair">
        <p className="key flex items-center justify-between">
          <span>Mobile Phone</span> <span>:</span>
        </p>
        <p className="font-bold capitalize">{address?.phone}</p>
      </div>
      <div className="user-profile-pair">
        <p className="key flex items-center justify-between">
          <span>Country of Residence</span> <span>:</span>
        </p>
        <p className="font-bold capitalize">
          {address?.country !== null ? address?.country : "Not set yet"}
        </p>
      </div>
      <div className="user-profile-pair">
        <p className="key flex items-center justify-between">
          <span>City</span> <span>:</span>
        </p>
        <p className="font-bold capitalize">{address?.city}</p>
      </div>
      <div className="user-profile-pair">
        <p className="key flex items-center justify-between">
          <span>Zip Code</span> <span>:</span>
        </p>
        <p className="font-bold capitalize">{address?.zip}</p>
      </div>
      <div className="user-profile-pair">
        <p className="key flex items-center justify-between">
          <span>Address</span> <span>:</span>
        </p>
        <p className="font-bold capitalize">{address?.address}</p>
      </div>
      <p className="h-8 w-8 bg-white flex items-center justify-center absolute top-5 right-5 rounded-[30px] cursor-pointer custom-xs:top-3 custom-xs:right-3" onClick={() => setSelectedAddress(address)}>
        <CiEdit />
      </p>

      {selectedAddress && <EditAddressDialouge address={selectedAddress} onClose={() => setSelectedAddress(null)} />}
    </div>
  );
};

export default AddedAddressBook;

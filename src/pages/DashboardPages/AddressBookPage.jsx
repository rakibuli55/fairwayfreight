import { LuCirclePlus } from "react-icons/lu";
import { Link } from "react-router-dom";
import BackButton from "../../components/dashboard/common/BackButton";
import MainTitle from "../../components/dashboard/common/MainTitle";
import EditAddressButton from "../../components/dashboard/AddressBookPage/EditAddressButton";
import { IoHome } from "react-icons/io5";
import { HiBuildingLibrary } from "react-icons/hi2";
import AddedAddressBook from "../../components/dashboard/AddressBookPage/AddedAddressBook";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useState } from "react";

const AddressBookPage = () => {
  const axiosSecure = useAxiosSecure();
  const [isEdit, setIsEdit] = useState(false);

  const {data:addressList,isLoading:addressListLoading} = useQuery({
    queryKey:['address-data'],
    queryFn: async () => {
      const response = await axiosSecure.get('/address-list');
      return response?.data?.data;
    },
    retry:1,
  });

  const home_address = addressList?.filter(address => address.type === 'home');
  const golf_club_Address = addressList?.filter(address => address.type === 'club');

  return (
    <section className="bg-white p-9 rounded-[16px]">
      <div>
        <MainTitle text=" Address Book" />
        <div className="mt-10 p-10 border border-[#F0F0F0] rounded-[12px]">
          <div className="flex items-center justify-between">
            <BackButton />
            <Link to={"/dashboard/add-new-address"} className="flex items-center gap-2 py-[14px] px-7 font-bold text-white rounded-[40px] bg-primaryGreen duration-200 ease-in-out border-[2px] border-primaryGreen hover:bg-transparent hover:text-primaryGreen">
              <LuCirclePlus />
              Add New Address
            </Link>
          </div>
          <div className="flex items-start justify-between gap-[158px] mt-[70px]">
            {/* home/business address  */}
            <div className="flex-1">
              <EditAddressButton text="Home/Business" icon={<IoHome />} type="home/business" />
              {
                home_address?.length > 0 ? (home_address?.map((address) => (
                  <AddedAddressBook key={address.id} address={address} />
                ))) : (<p className="text-[18px] font-semibold mt-5 text-center">No address added</p>)
                
              }
              
            </div>
            {/* Golf Club/Resort address  */}
            <div className="flex-1">
              <EditAddressButton text="Golf Club/Resort" icon={<HiBuildingLibrary />} type="golf/club" />
              {
                golf_club_Address?.length > 0 ? (golf_club_Address?.map((address) => (
                  <AddedAddressBook key={address.id} address={address} />
                ))) : (<p className="text-[18px] font-semibold mt-5 text-center">No address added</p>)
                
              }
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddressBookPage;

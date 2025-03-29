import { useQuery } from "@tanstack/react-query";
import { HiBuildingLibrary } from "react-icons/hi2";
import { IoHome } from "react-icons/io5";
import { LuCirclePlus } from "react-icons/lu";
import { Link } from "react-router-dom";
import AddedAddressBook from "../../components/dashboard/AddressBookPage/AddedAddressBook";
import EditAddressButton from "../../components/dashboard/AddressBookPage/EditAddressButton";
import BackButton from "../../components/dashboard/common/BackButton";
import MainTitle from "../../components/dashboard/common/MainTitle";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AddressBookPage = () => {
  const axiosSecure = useAxiosSecure();

  const { data: addressList, isLoading: addressListLoading } = useQuery({
    queryKey: ["addressbook-data"],
    queryFn: async () => {
      const response = await axiosSecure.get("/address-list");
      return response?.data?.data;
    },
    retry: 1,
  });


  const home_address = addressList?.filter(
    (address) => address.type === "home"
  );
  const golf_club_Address = addressList?.filter(
    (address) => address.type === "club"
  );

  return (
    <section className="bg-white p-9 custom-xs:!p-4 custom-xs:!pt-7 max-md:p-6 max-md:pt-8 rounded-[16px]">
      <div>
        <MainTitle text=" Address Book" />
        <div className="mt-10 p-10 custom-xs:!p-4 max-md:p-6 border border-[#F0F0F0] rounded-[12px]">
          <div className="flex items-center justify-between custom-xs:block">
            <BackButton />
            <Link
              to={"/dashboard/add-new-address"}
              className="flex items-center gap-2 py-[14px] px-7 font-bold text-white rounded-[40px] bg-primaryGreen duration-200 ease-in-out border-[2px] border-primaryGreen hover:bg-transparent hover:text-primaryGreen custom-xs:mt-4 custom-xs:py-[10px] custom-xs:px-4"
            >
              <LuCirclePlus />
              Add New Address
            </Link>
          </div>
          <div className="flex items-start justify-between gap-[158px] extra-large:gap-10 custom-2xl:gap-10 custom-xl:gap-8 custom-xl:block custom-lg:block max-md:block mt-[70px] custom-xs:!mt-7 max-md:mt-10">
            {/* home/business address  */}
            <div className="flex-1">
              <EditAddressButton
                text="Home/Business"
                icon={<IoHome />}
                type="home/business"
              />
              {home_address?.length > 0 ? (
                home_address?.map((address) => (
                  <AddedAddressBook key={address.id} address={address} />
                ))
              ) : (
                <p className="text-[18px] font-semibold mt-5 text-center">
                  No address added
                </p>
              )}
            </div>
            {/* Golf Club/Resort address  */}
            <div className="flex-1 custom-xl:mt-10 custom-lg:mt-10 max-md:mt-10 custom-xs:!mt-7">
              <EditAddressButton
                text="Golf Club/Resort"
                icon={<HiBuildingLibrary />}
                type="golf/club"
              />
              {golf_club_Address?.length > 0 ? (
                golf_club_Address?.map((address) => (
                  <AddedAddressBook key={address.id} address={address} />
                ))
              ) : (
                <p className="text-[18px] custom-xs:text-base font-semibold mt-5 text-center">
                  No address added
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddressBookPage;

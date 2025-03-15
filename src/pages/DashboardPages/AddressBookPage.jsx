import { LuCirclePlus } from "react-icons/lu";
import { Link } from "react-router-dom";
import BackButton from "../../components/dashboard/common/BackButton";
import MainTitle from "../../components/dashboard/common/MainTitle";
import EditAddressButton from "@/components/dashboard/AddressBookPage/EditAddressButton";
import { IoHome } from "react-icons/io5";
import { HiBuildingLibrary } from "react-icons/hi2";
import UserProfileDetails from "@/components/dashboard/myAccountPage/UserProfileDetails";

const AddressBookPage = () => {
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
              <UserProfileDetails />
            </div>
            {/* Golf Club/Resort address  */}
            <div className="flex-1">
              <EditAddressButton text="Golf Club/Resort" icon={<HiBuildingLibrary />} type="golf/club" />
              <UserProfileDetails />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddressBookPage;

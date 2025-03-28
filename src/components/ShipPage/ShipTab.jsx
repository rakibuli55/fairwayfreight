import { IoHome } from "react-icons/io5";
import { HiBuildingLibrary } from "react-icons/hi2";

const ShipTab = ({ selectedTab, onSelect }) => {
  return (
    <div className="flex rounded-[12px] overflow-hidden border border-[#B3BAC5] custom-xs:block">
      <button type="button" className={`py-6 px-5 w-[280px] font-semibold duration-200 ease-in-out text-[22px] custom-lg:text-[18px] max-md:text-base max-md:px-3 max-md:py-4 flex items-center gap-2 custom-xs:!py-3 ${selectedTab === 'home' ? 'bg-primaryGreen text-white' : 'bg-white text-heading'} custom-sm:w-full custom-xs:justify-center custom-sm:justify-center custom-xs:w-full`} onClick={() => onSelect('home')}>
        <span className="inline-block mb-[6px]">
          <IoHome />
        </span>
        Home/Business
      </button>
      <button type="button" className={`py-6 px-5 w-[280px] font-semibold duration-200 ease-in-out text-[22px] custom-lg:text-[18px] max-md:text-base max-md:px-3 max-md:py-4 flex items-center gap-2 custom-xs:!py-3 ${selectedTab === 'club' ? 'bg-primaryGreen text-white' : 'bg-white text-heading'} custom-sm:w-full custom-xs:justify-center custom-sm:justify-center custom-xs:w-full`} onClick={() => onSelect('club')}>
        <span className="inline-block mb-[6px]">
        <HiBuildingLibrary />
        </span>
        Golf Club/Resort
      </button>
    </div>
  );
};

export default ShipTab;

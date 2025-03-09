import { IoHome } from "react-icons/io5";
import { HiBuildingLibrary } from "react-icons/hi2";

const ShipTab = ({ selectedTab, onSelect }) => {
  return (
    <div className="flex rounded-[12px] overflow-hidden border border-[#B3BAC5]">
      <button type="button" className={`py-6 px-5 w-[280px] font-semibold duration-200 ease-in-out text-[22px] flex items-center gap-2 ${selectedTab === 'home' ? 'bg-primaryGreen text-white' : 'bg-white text-heading'}`} onClick={() => onSelect('home')}>
        <span className="inline-block mb-[6px]">
          <IoHome />
        </span>
        Home/Business
      </button>
      <button type="button" className={`py-6 px-5 w-[280px] font-semibold duration-200 ease-in-out text-[22px] flex items-center gap-2 ${selectedTab === 'golf' ? 'bg-primaryGreen text-white' : 'bg-white text-heading'}`} onClick={() => onSelect('golf')}>
        <span className="inline-block mb-[6px]">
        <HiBuildingLibrary />
        </span>
        Golf Club/Resort
      </button>
    </div>
  );
};

export default ShipTab;

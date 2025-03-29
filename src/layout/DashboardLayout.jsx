import { Outlet } from "react-router-dom";
import Navbar from "../shared/Dashboard/Navbar";
import Sidebar from "../shared/Dashboard/Sidebar";

const DashboardLayout = () => {
  return (
    <>
      <Navbar />
      <Sidebar />
      <main>
        <div className="bg-sectionLight min-h-screen relative z-[1] pl-[370px] max-md:px-5 pt-[152px] custom-md:pt-[85px] custom-sm:pt-[85px] custom-xs:pt-[85px] pb-[30px] pr-[35px] custom-xs:!px-4">
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default DashboardLayout;

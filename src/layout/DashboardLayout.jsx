import { Outlet } from "react-router-dom";
import Navbar from "../shared/Dashboard/Navbar";
import Sidebar from "../shared/Dashboard/Sidebar";

const DashboardLayout = () => {
  return (
    <>
      <Navbar />
      <main>
        <div className="bg-sectionLight min-h-screen relative z-[1] pl-[370px] pt-[152px] pb-[30px] pr-[35px]">
          <Sidebar />
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default DashboardLayout;

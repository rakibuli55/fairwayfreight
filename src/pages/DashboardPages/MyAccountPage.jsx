import UserProfile from "../../components/dashboard/myAccountPage/UserProfile";
import MainTitle from "../../components/dashboard/common/MainTitle";
import QuickLinks from "../../components/dashboard/myAccountPage/QuickLinks";
import { useContext } from "react";
import { AuthContext } from "../../context/index";


const MyAccountPage = () => {
  const {user} = useContext(AuthContext);
  return (
    <section className="bg-white p-9 rounded-[16px]">
      <div>
        <MainTitle text="Robert Fox’s Profile" />
        <div className="mt-10 p-10 border border-[#F0F0F0] rounded-[12px] flex items-center gap-[290px]">
          <UserProfile user={user} />
          <QuickLinks />
        </div>
      </div>
    </section>
  );
};

export default MyAccountPage;
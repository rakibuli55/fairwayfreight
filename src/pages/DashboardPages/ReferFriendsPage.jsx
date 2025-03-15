import PrimaryButton from "../../components/common/PrimaryButton";
import BackButton from "../../components/dashboard/common/BackButton";
import MainTitle from "../../components/dashboard/common/MainTitle";

const ReferFriendsPage = () => {
  return (
    <section className="bg-white p-9 rounded-[16px]">
      <div>
        <MainTitle text="Refer Friends" />
        <div className="mt-10 p-10 border border-[#F0F0F0] rounded-[12px]">
          <div>
            <BackButton />
          </div>
          <div className="text-center">
            <h3 className="text-[40px] font-bold text-heading mb-3">Share with Friends & Family!</h3>
            <p className="text-[32px] font-semibold text-[#05D9A8]">Share with Friends & Family And Get $10 Off!</p>
            <div className="mt-9">
                <p className="text-[24px] font-bold text-primaryGreen mb-2">Your share link:</p>
                <p className="text-[24px] font-semibold text-primaryGreen">https://share.Fairway Freight.com/93bZGb</p>
            </div>
            <div className="text-center w-fit mx-auto mt-12">
                <PrimaryButton text="Share now" className="py-[14px] px-20 border-[2px] bg-primaryGreen border-primaryGreen rounded-[40px] font-bold text-white duration-200 ease-in-out hover:bg-transparent hover:text-primaryGreen" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReferFriendsPage;

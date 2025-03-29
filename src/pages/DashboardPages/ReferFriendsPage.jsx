import { useContext } from "react";
import PrimaryButton from "../../components/common/PrimaryButton";
import BackButton from "../../components/dashboard/common/BackButton";
import MainTitle from "../../components/dashboard/common/MainTitle";
import { AuthContext } from "../../context/index";
import toast from "react-hot-toast";

const ReferFriendsPage = () => {
  const baseURL = window.location.origin;
  const {referralCode} = useContext(AuthContext);

  const copyLinkToClipboard = () => {
    const link = `${baseURL}/auth/signup?referral_code=${referralCode}`;
    navigator.clipboard.writeText(link).then(() => {
      toast.success("Referral link copied to clipboard!")
    }).catch((error) => {
      toast.error("Failed to copy text: ", error)
    })
  }

  return (
    <section className="bg-white p-9 max-md:p-6 max-md:pt-7 custom-xs:!p-4 custom-xs:!pt-7 rounded-[16px]">
      <div>
        <MainTitle text="Refer Friends" />
        <div className="mt-10 custom-xs:mt-7 p-10 max-md:p-5 custom-xs:!p-4 border border-[#F0F0F0] rounded-[12px]">
          <div>
            <BackButton />
          </div>
          <div className="text-center">
            <h3 className="text-[40px] font-bold text-heading custom-lg:text-[28px] max-md:text-[26px] custom-xs:!text-[22px] mb-3 custom-xs:mt-5">Share with Friends & Family!</h3>
            <p className="text-[32px] font-semibold text-[#05D9A8] custom-lg:text-[24px] max-md:text-[20px] custom-xs:!text-[18px]">Share with Friends & Family And Get $10 Off!</p>
            <div className="mt-9 custom-xs:mt-4">
                <p className="text-[24px] font-bold text-primaryGreen mb-2 custom-lg:text-[20px] max-md:text-[20px]">Your share link:</p>
                <p className="text-[24px] font-semibold text-primaryGreen custom-lg:text-[20px] max-md:text-[18px]">{baseURL}auth/signup?referral_code={referralCode}</p>
            </div>
            <div className="text-center w-fit mx-auto mt-12 max-md:mt-6 cursor-pointer" onClick={copyLinkToClipboard}>
                <PrimaryButton text="Copy Link" className="py-[14px] px-20 border-[2px] bg-primaryGreen border-primaryGreen rounded-[40px] font-bold text-white duration-200 ease-in-out hover:bg-transparent hover:text-primaryGreen custom-lg:px-7 custom-lg:py-2 max-md:py-2 max-md:px-5 custom-xs:text-sm" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReferFriendsPage;

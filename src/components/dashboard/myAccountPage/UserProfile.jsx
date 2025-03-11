import profileImage from "../../../assets/images/user-profile.png";
import UserProfileDetails from "./UserProfileDetails";

const UserProfile = () => {
  return (
    <div className="">
        {/* profile  */}
      <div className="flex items-center gap-6">
        <img
          className="h-[130px] w-[130px] rounded-full object-cover"
          src={profileImage}
          alt="profileImage"
        />
        <div>
          <h2 className="text-[28px] font-bold text-heading">Robert Fox</h2>
          <p className="text-paragraph">President of Sales</p>
        </div>
      </div>
      <div>
        <UserProfileDetails />
      </div>
    </div>
  );
};

export default UserProfile;

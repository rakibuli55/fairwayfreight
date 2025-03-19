import profileImage from "../../../assets/images/user-profile.png";
import UserProfileDetails from "./UserProfileDetails";
import defaultAvatar from "../../../assets/images/user-profile.png"

const UserProfile = ({user}) => {

  const userAvatar = user?.avatar !== null ? `${import.meta.env.VITE_SERVER_URL}/${user?.avatar}`: defaultAvatar;

  return (
    <div className="">
        {/* profile  */}
      <div className="flex items-center gap-6">
        <img
          className="h-[130px] w-[130px] rounded-full object-cover"
          src={userAvatar}
          alt="profileImage"
        />
        <div>
          <h2 className="text-[28px] font-bold text-heading">{user?.first_name} {user?.last_name}</h2>
        </div>
      </div>
      <div>
        <UserProfileDetails user={user} />
      </div>
    </div>
  );
};

export default UserProfile;

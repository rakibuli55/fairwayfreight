import { useState } from "react";
import { MdOutlineCameraAlt } from "react-icons/md";
import defaultAvatar from "../../../assets/images/user-profile.png";

const UserProfileUploader = ({ setValue, name, user }) => {
  const [userAvatar, setUserAvatar] = useState(defaultAvatar);

  const handleProfileImageUpdate = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUserAvatar(imageUrl);
      setValue(name, file);
    }
  };

  const userAvatarImage = userAvatar !== defaultAvatar
  ? userAvatar
  : user?.avatar
  ? `${import.meta.env.VITE_SERVER_URL}/${user.avatar}`
  : defaultAvatar;

  return (
    <div className="flex items-center gap-6">
      <input
        type="file"
        id="userAvatarUploader"
        className="hidden"
        onChange={handleProfileImageUpdate}
      />
      <label
        htmlFor="userAvatarUploader"
        className="inline-block w-[130px] h-[130px] rounded-full overflow-hidden relative cursor-pointer"
      >
        <img
          className="w-full h-full object-cover"
          src={userAvatarImage}
          alt="UserImg"
        />
        <p className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] text-[30px] text-white">
          <MdOutlineCameraAlt />
        </p>
      </label>
      <div>
        <h3 className="text-[24px] font-bold text-heading">
          {user?.first_name} {user?.last_name}
        </h3>
      </div>
    </div>
  );
};

export default UserProfileUploader;

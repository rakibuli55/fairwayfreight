import { MdOutlineCameraAlt } from "react-icons/md";
import UserImg from "../../../assets/images/user-profile.png";
import { useState } from "react";
import { Controller } from "react-hook-form";

const UserProfileUploader = ({setValue, name}) => {

    const [userAvatar, setUserAvatar] = useState(UserImg);

    const handleProfileImageUpdate = (e) => {
        const file = e.target.files[0];

        if(file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setUserAvatar(reader.result);
                setValue(name, file);
            }
            reader.readAsDataURL(file);
        }
    }
 

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
          src={userAvatar}
          alt="UserImg"
        />
        <p className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] text-[30px] text-white">
          <MdOutlineCameraAlt />
        </p>
      </label>
      <div>
        <h3 className="text-[24px] font-bold text-heading">Robert Fox</h3>
        <p className="text-base text-paragraph">President of Sales</p>
      </div>
    </div>
  );
};

export default UserProfileUploader;



const UserProfileDetails = ({user}) => {
  return (
    <div className='mt-10 max-md:mt-5'>
      <div className='user-profile-pair'>
        <p className='key flex items-center justify-between'><span>First Name</span> <span>:</span></p>
        <p className='font-bold'>{user?.first_name}</p>
      </div>
      <div className='user-profile-pair'>
        <p className='key flex items-center justify-between'><span>Last Name</span> <span>:</span></p>
        <p className='font-bold'>{user?.last_name}</p>
      </div>
      <div className='user-profile-pair'>
        <p className='key flex items-center justify-between'><span>Country of Residence</span> <span>:</span></p>
        <p className='font-bold'>{user?.country !== null ? user?.country : 'Not set yet'}</p>
      </div>
      <div className='user-profile-pair'>
        <p className='key flex items-center justify-between'><span>Mobile Phone</span> <span>:</span></p>
        <p className='font-bold'>{user?.phone}</p>
      </div>
      <div className='user-profile-pair'>
        <p className='key flex items-center justify-between'><span>Email</span> <span>:</span></p>
        <p className='font-bold'>{user?.email}</p>
      </div>
      <div className='user-profile-pair'>
        <p className='key flex items-center justify-between'><span>Default address</span> <span>:</span></p>
        <p className='font-bold'>{user?.default_address !== null ? user?.default_address : 'Not set yet'}</p>
      </div>
    </div>
  );
};

export default UserProfileDetails;
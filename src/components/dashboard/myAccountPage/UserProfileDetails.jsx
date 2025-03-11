import React from 'react';

const UserProfileDetails = () => {
  return (
    <div className='mt-10'>
      <div className='user-profile-pair'>
        <p className='key flex items-center justify-between'><span>First Name</span> <span>:</span></p>
        <p className='font-bold'>Robert</p>
      </div>
      <div className='user-profile-pair'>
        <p className='key flex items-center justify-between'><span>Last Name</span> <span>:</span></p>
        <p className='font-bold'>Fox</p>
      </div>
      <div className='user-profile-pair'>
        <p className='key flex items-center justify-between'><span>Country of Residence</span> <span>:</span></p>
        <p className='font-bold'>United States</p>
      </div>
      <div className='user-profile-pair'>
        <p className='key flex items-center justify-between'><span>Mobile Phone</span> <span>:</span></p>
        <p className='font-bold'>+1 502-640-2067</p>
      </div>
      <div className='user-profile-pair'>
        <p className='key flex items-center justify-between'><span>Email</span> <span>:</span></p>
        <p className='font-bold'> robertfox@gmail.com</p>
      </div>
      <div className='user-profile-pair'>
        <p className='key flex items-center justify-between'><span>Registration date</span> <span>:</span></p>
        <p className='font-bold'>02/08/2025</p>
      </div>
      <div className='user-profile-pair'>
        <p className='key flex items-center justify-between'><span>Packages shipped</span> <span>:</span></p>
        <p className='font-bold'>0</p>
      </div>
      <div className='user-profile-pair'>
        <p className='key flex items-center justify-between'><span>Default address</span> <span>:</span></p>
        <p className='font-bold'>1901 Thornridge Cir. Shiloh, Hawaii 81063</p>
      </div>
      <div className='user-profile-pair'>
        <p className='key flex items-center justify-between'><span>Default currency</span> <span>:</span></p>
        <p className='font-bold'>USD - United States Dollar</p>
      </div>
    </div>
  );
};

export default UserProfileDetails;
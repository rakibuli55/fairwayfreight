import AuthRight from '../components/common/AuthRight';
import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div className='flex flex-wrap'>
      <div className='w-[50%] max-h-screen overflow-y-auto no-scrollbar'>
        <Outlet />
      </div>
      <div className='w-[50%]'>
        <AuthRight />
      </div>
    </div>
  );
};

export default AuthLayout;
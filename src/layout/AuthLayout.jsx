import AuthRight from '../components/common/AuthRight';
import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div className='flex flex-wrap max-md:block'>
      <div className='w-[50%] max-md:w-full max-h-screen overflow-y-auto no-scrollbar'>
        <Outlet />
      </div>
      <div className='w-[50%] max-md:hidden'>
        <AuthRight />
      </div>
    </div>
  );
};

export default AuthLayout;
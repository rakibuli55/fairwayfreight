import React, { useContext } from 'react';
import AllBlogsSection from '../components/BlogPage/AllBlogsSection';
import NewsLatterSection from '../components/common/NewsLatterSection';
import { AuthContext } from '../context/index';

const BlogPage = () => {
  const { homePagedata, homeDataLoading } = useContext(AuthContext);
  return (
    <>
      <AllBlogsSection />
      <NewsLatterSection newsLatterData={homePagedata?.subscription_section} />
    </>
  );
};

export default BlogPage;
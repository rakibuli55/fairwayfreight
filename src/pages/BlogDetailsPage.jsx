import { useContext } from "react";
import BlogDetailsSection from "../components/BlogDetailsPage/BlogDetailsSection";
import NewsLatterSection from "../components/common/NewsLatterSection";
import { AuthContext } from "../context/index";


const BlogDetailsPage = () => {
  const { homePagedata, homeDataLoading } = useContext(AuthContext);
  return (
    <>
      <BlogDetailsSection />
      <NewsLatterSection newsLatterData={homePagedata?.subscription_section} />
    </>
  );
};

export default BlogDetailsPage;
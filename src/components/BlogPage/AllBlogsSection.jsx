import Container from "../../container/Container";
import TitleV2 from "../common/TitleV2";
import BlogCard from "./BlogCard";
import PaginationCommon from "../common/PaginationCommon";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../api/index";
import { useState } from "react";


const AllBlogsSection = () => {

  const [currentPage, setCurrentPage] = useState(1)

  const {data:blogData, isLoading:blogLoading} = useQuery({
    queryKey:['blog-data', currentPage],
    queryFn: async () => {
      const res = await api.get(`/blogs?page=${currentPage}`);
      return res?.data?.data;
    }
  });

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <section className="pt-[225px] pb-[10px]">
      <Container>
      {/* title  */}
      <div className="mb-[62px]">
        <TitleV2 subTitle="Blogs" title="Golf Updates & Insights" description="Stay updated with golf tips, news, and resort reviews on the Fairway Freight’s blog." />
      </div>
        <div className="grid grid-cols-2 gap-x-[30px] gap-y-12">
            {
                blogData?.data?.map((item) => (
                    <BlogCard key={item?.id} item={item} />
                ))
            }
        </div>
        <div className="mt-[60px]">
            <PaginationCommon currentPage={currentPage} lastPage={blogData?.last_page} onPerChnage={handlePageChange} />
        </div>
      </Container>
    </section>
  );
};

export default AllBlogsSection;
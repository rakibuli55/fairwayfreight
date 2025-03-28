import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { api } from "../../api/index";
import Container from "../../container/Container";
import PaginationCommon from "../common/PaginationCommon";
import TitleV2 from "../common/TitleV2";
import BlogCard from "./BlogCard";
import BlogSkeleton from "../BlogPage/BlogSkeleton"

const AllBlogsSection = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { data: blogData, isLoading: blogLoading } = useQuery({
    queryKey: ["blog-data", currentPage],
    queryFn: async () => {
      const res = await api.get(`/blogs?page=${currentPage}`);
      return res?.data?.data;
    },
  });

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  return (
    <section className="pt-[225px] pb-[10px] custom-xs:pb-0 custom-md:pt-[165px] custom-sm:pt-[155px] custom-xs:pt-[120px]">
      <Container>
        {/* title  */}
        <div className="mb-[62px] max-md:mb-10">
          <TitleV2
            subTitle="Blogs"
            title="Golf Updates & Insights"
            description="Stay updated with golf tips, news, and resort reviews on the Fairway Freight’s blog."
          />
        </div>
        {blogLoading ? (
          <div className="grid grid-cols-2 gap-x-[30px] gap-y-12 custom-xs:gap-y-8 max-md:grid-cols-1">
            {Array.from({ length: 4 }, (_, index) => (
              <BlogSkeleton key={index} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-x-[30px] gap-y-12 custom-xs:gap-y-8 max-md:grid-cols-1">
            {blogData?.data?.map((item) => (
              <BlogCard key={item?.id} item={item} />
            ))}
          </div>
        )}

        <div className="mt-[60px] custom-xs:mt-10">
          <PaginationCommon
            currentPage={currentPage}
            lastPage={blogData?.last_page}
            onPerChnage={handlePageChange}
          />
        </div>
      </Container>
    </section>
  );
};

export default AllBlogsSection;

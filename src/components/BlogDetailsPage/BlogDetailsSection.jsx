import { api } from "@/api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import Container from "../../container/Container";
import AuthorArea from "./AuthorArea";
import BlogDetails from "./BlogDetails";
import RecentNewsCard from "./RecentNewsCard";

const BlogDetailsSection = () => {
  const { slug } = useParams();

  const { data: singleBlogPostData, isLoading: signleBlogPostLoading } =
    useQuery({
      queryKey: ["singleBlogPostData", slug],
      queryFn: async () => {
        const response = await api.get(`/blogs/single/${slug}`);
        return response?.data?.data;
      },
    });

  const { data: recentBlogData, isLoading: recentBlogDataLoading } = useQuery({
    queryKey: ["recent-blogs"],
    queryFn: async () => {
      const res = await api.get("/recent-blogs");
      return res?.data?.data;
    },
  });

  return (
    <section className="pt-[228px] pb-[20px] max-md:pb-0 extra-large:pt-[190px] custom-lg:pt-[160px] custom-sm:pt-[135px] custom-xs:pt-[105px]">
      <Container>
        <div className="flex items-start flex-wrap max-md:block">
          <div className="w-[65%] max-md:w-full">
            <div className="h-[596px] custom-xl:h-[430px] custom-lg:h-[400px] custom-md:h-[340px] custom-sm:h-[280px] custom-xs:h-[240px] rounded-[16px] overflow-hidden">
              <img
                className="h-full w-full object-cover duration-200 ease-in-out hover:scale-[1.1]"
                src={`${import.meta.env.VITE_SERVER_URL}/${
                  singleBlogPostData?.image
                }`}
                alt="img"
              />
            </div>
            <AuthorArea data={singleBlogPostData} />
            <BlogDetails data={singleBlogPostData} />
          </div>
          <div className="w-[35%] max-md:w-full max-md:pl-0 pl-[125px] extra-large:pl-[50px] custom-2xl:pl-[50px] custom-xl:pl-[50px] custom-lg:pl-[50px] sticky top-[120px] custom-xs:pt-3">
            <h4 className="text-[24px] font-bold text-heading">Recent News</h4>
            <div className="recent-news-cards">
              {recentBlogData?.map((item) => (
                <RecentNewsCard key={item?.id} item={item} />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default BlogDetailsSection;

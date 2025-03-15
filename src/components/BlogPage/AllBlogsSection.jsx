import Container from "../../container/Container";
import TitleV2 from "../common/TitleV2";
import imageOne from "../../assets/images/blog1.png"
import imageTwo from "../../assets/images/blog2.png"
import imageThree from "../../assets/images/blog3.png"
import imageFour from "../../assets/images/blog4.png"
import BlogCard from "./BlogCard";
import PrimaryButton from "../common/PrimaryButton";
import PaginationCommon from "../common/PaginationCommon";

const blogData = [
    {
        id:1,
        image:imageOne,
        title:'The Best Golf Destinations for Winter Getaways',
        url:'/blog-details'
    },
    {
        id:2,
        image:imageTwo,
        title:'The Best Golf Destinations for Winter Getaways',
        url:'/blog-details'
    },
    {
        id:3,
        image:imageThree,
        title:'The Best Golf Destinations for Winter Getaways',
        url:''
    },
    {
        id:4,
        image:imageFour,
        title:'The Best Golf Destinations for Winter Getaways',
        url:'/blog-details'
    },
]

const AllBlogsSection = () => {
  return (
    <section className="pt-[225px] pb-[10px]">
      <Container>
      {/* title  */}
      <div className="mb-[62px]">
        <TitleV2 subTitle="Blogs" title="Golf Updates & Insights" description="Stay updated with golf tips, news, and resort reviews on the Fairway Freight’s blog." />
      </div>
        <div className="grid grid-cols-2 gap-x-[30px] gap-y-12">
            {
                blogData.map((item) => (
                    <BlogCard key={item?.id} item={item} />
                ))
            }
        </div>
        <div className="mt-[60px]">
            <PaginationCommon />
        </div>
      </Container>
    </section>
  );
};

export default AllBlogsSection;
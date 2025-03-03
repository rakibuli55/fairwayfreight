import React from "react";
import blogImage from "../../assets/images/blog1.png";
import recentNewsOne from "../../assets/images/blog2.png";
import recentNewsTwo from "../../assets/images/blog3.png";
import recentNewsThree from "../../assets/images/blog4.png";
import Container from "../../container/Container";
import AuthorArea from "./AuthorArea";
import BlogDetails from "./BlogDetails";
import RecentNewsCard from "./RecentNewsCard";

const recentNews = [
  {
    id: 1,
    image: recentNewsOne,
    publishDate: "March 01, 2024",
    title: "The Best Golf Destinations for Winter Getaways",
  },
  {
    id: 2,
    image: recentNewsTwo,
    publishDate: "March 01, 2024",
    title: "The Best Golf Destinations for Winter Getaways",
  },
  {
    id: 3,
    image: recentNewsThree,
    publishDate: "March 01, 2024",
    title: "The Best Golf Destinations for Winter Getaways",
  },
];

const BlogDetailsSection = () => {
  return (
    <section className="pt-[228px] pb-[20px]">
      <Container>
        <div className="flex items-start flex-wrap">
          <div className="w-[65%]">
            <div className="h-[596px] rounded-[16px] overflow-hidden">
              <img
                className="h-full w-full object-cover duration-200 ease-in-out hover:scale-[1.1]"
                src={blogImage}
                alt="img"
              />
            </div>
            <AuthorArea />
            <BlogDetails />
          </div>
          <div className="w-[35%] pl-[125px] sticky top-[120px]">
            <h4 className="text-[24px] font-bold text-heading">Recent News</h4>
            <div className="recent-news-cards">
              {recentNews?.map((item) => (
                <RecentNewsCard item={item} />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default BlogDetailsSection;

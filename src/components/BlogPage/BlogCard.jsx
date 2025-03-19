import { FaArrowRight } from "react-icons/fa6";
import { Link } from "react-router-dom";

const BlogCard = ({ item }) => {
  return (
    <div className="blog-card">
      <div className="h-[361px] w-full rounded-[16px] relative overflow-hidden">
        <img
          className="w-full h-full object-cover duration-200 ease-in-out"
          src={`${import.meta.env.VITE_SERVER_URL}/${item?.image}`}
          alt="image"
        />
        <h1 className="py-2 px-[13px] text-sm text-heading bg-white rounded-[30px] absolute top-[14px] left-[14px]">
          {item?.created_date}
        </h1>
      </div>
      <div className="flex items-center justify-between mt-5">
        <h3 className="text-[24px] font-bold  text-heading w-[526px] overflow-hidden">{item?.title}</h3>
        <Link to={`/blog/${item?.slug}`} className="flex items-center text-base font-bold gap-2 text-primaryGreen">
          Read More
          <span className="text-[18px] rotate-[-40deg]">
            <FaArrowRight />
          </span>
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;

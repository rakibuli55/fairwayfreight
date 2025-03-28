import { Link } from "react-router-dom";

const RecentNewsCard = ({ item }) => {
  return (
    <Link to={`/blog/${item?.slug}`} className="py-[30px] custom-xs:py-5 border-t border-b border-[#9FA4B2] flex items-center gap-5 recent-news-card custom-xs:block">
      <div className="overflow-hidden min-w-[208px] max-w-[208px] h-[149px] custom-xl:min-w-[180px] custom-xl:max-w-[180px] rounded-[16px] custom-lg:min-w-[140px] custom-lg:max-w-[140px] custom-lg:h-[100px] custom-xs:min-w-full custom-xs:max-w-full">
        <img
          className="w-full h-full object-cover duration-200 ease-in-out"
          src={`${import.meta.env.VITE_SERVER_URL}/${item?.image}`}
          alt="image"
        />
      </div>
      <div className="custom-xs:mt-4">
        <p className="text-sm text-primaryGreen">{item?.created_date}</p>
        <h4 className="text-[18px] font-bold text-heading mt-[2px] custom-lg:text-base">
          {item?.title}
        </h4>
      </div>
    </Link>
  );
};

export default RecentNewsCard;

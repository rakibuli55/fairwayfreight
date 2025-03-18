import { Link } from "react-router-dom";

const RecentNewsCard = ({ item }) => {
  return (
    <Link to={`/blog/${item?.slug}`} className="py-[30px] border-t border-b border-[#9FA4B2] flex items-center gap-5 recent-news-card">
      <div className="overflow-hidden min-w-[208px] max-w-[208px] h-[149px] rounded-[16px]">
        <img
          className="w-full h-full object-cover duration-200 ease-in-out"
          src={`${import.meta.env.VITE_SERVER_URL}/${item?.image}`}
          alt="image"
        />
      </div>
      <div>
        <p className="text-sm text-primaryGreen">{item?.created_date}</p>
        <h4 className="text-[18px] font-bold text-heading mt-[2px]">
          {item?.title}
        </h4>
      </div>
    </Link>
  );
};

export default RecentNewsCard;

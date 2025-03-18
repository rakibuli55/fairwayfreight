import TestimonialCard from "./TestimonialCard";
import DOMPurify from "dompurify";

const BlogDetails = ({data}) => {
  return (
    <>
      <div className="blog-details sanitize-box pt-10" dangerouslySetInnerHTML={{__html:DOMPurify.sanitize(data?.description)}}>
        
      </div>
      <TestimonialCard
        message={data?.quote}
        client={data?.quote_user_name}
      />
    </>
  );
};

export default BlogDetails;

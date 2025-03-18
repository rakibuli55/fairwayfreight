

import stars from '../../assets/images/stars.png'

const ClientReview = ({data}) => {
  return (
    <div className='flex items-center gap-3'>
      <div className='flex items-end'>
        <img className='w-[50px] h-[50px] rounded-full object-cover' src={`${import.meta.env.VITE_SERVER_URL}/${data?.images?.image_1}`} alt="img" />
        <img className='w-[50px] h-[50px] rounded-full object-cover' src={`${import.meta.env.VITE_SERVER_URL}/${data?.images?.image_2}`} alt="img" />
        <img className='w-[50px] h-[50px] rounded-full object-cover' src={`${import.meta.env.VITE_SERVER_URL}/${data?.images?.image_3}`} alt="img" />
        <img className='w-[50px] h-[50px] rounded-full object-cover' src={`${import.meta.env.VITE_SERVER_URL}/${data?.images?.image_4}`} alt="img" />
        <img className='w-[50px] h-[50px] rounded-full object-cover' src={`${import.meta.env.VITE_SERVER_URL}/${data?.images?.image_5}`} alt="img" />
      </div>
      <div>
        <img className='w-[122px] h-5' src={stars} alt="star" />
        <p className='text-base font-semibold text-paragraph mt-2'>From {data?.total_reviews}+ reviews</p>
      </div>
    </div>
  );
};

export default ClientReview;
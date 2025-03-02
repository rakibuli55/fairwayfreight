
import clientOne from '../../assets/images/c1.png'
import clientTwo from '../../assets/images/c2.png'
import clientThree from '../../assets/images/c3.png'
import clientFour from '../../assets/images/c4.png'
import clientFive from '../../assets/images/c5.png'
import stars from '../../assets/images/stars.png'

const ClientReview = () => {
  return (
    <div className='flex items-center gap-3'>
      <div className='flex items-end'>
        <img className='w-[50px] h-[50px] rounded-full object-cover' src={clientOne} alt="img" />
        <img className='w-[50px] h-[50px] rounded-full object-cover ml-[-12px]' src={clientTwo} alt="img" />
        <img className='w-[50px] h-[50px] rounded-full object-cover ml-[-12px]' src={clientThree} alt="img" />
        <img className='w-[50px] h-[50px] rounded-full object-cover ml-[-12px]' src={clientFour} alt="img" />
        <img className='w-[50px] h-[50px] rounded-full object-cover ml-[-12px]' src={clientFive} alt="img" />
      </div>
      <div>
        <img className='w-[122px] h-5' src={stars} alt="star" />
        <p className='text-base font-semibold text-paragraph mt-2'>From 120+ reviews</p>
      </div>
    </div>
  );
};

export default ClientReview;
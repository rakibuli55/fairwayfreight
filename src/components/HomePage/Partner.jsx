import partner1  from "../../assets/images/partner1.png";
import partner2  from "../../assets/images/partner2.png";
import partner3  from "../../assets/images/partner3.png";
import partner4  from "../../assets/images/partner4.png";
import partner5  from "../../assets/images/partner5.png";
import partner6  from "../../assets/images/partner6.png";
import partner7  from "../../assets/images/partner7.png";
import partner8  from "../../assets/images/partner8.png";
import partner9  from "../../assets/images/partner9.png";
import partner10  from "../../assets/images/partner10.png";

const Partner = () => {
  return (
    <div className="flex flex-wrap gap-x-[60px] gap-y-[20px] items-center justify-center partner w-[80%] mx-auto">
      <img src={partner1} alt="partner" />
      <img src={partner2} alt="partner" />
      <img src={partner3} alt="partner" />
      <img src={partner4} alt="partner" />
      <img src={partner5} alt="partner" />
      <img src={partner6} alt="partner" />
      <img src={partner7} alt="partner" />
      <img src={partner8} alt="partner" />
      <img src={partner9} alt="partner" />
      <img src={partner10} alt="partner" />
    </div>
  );
};

export default Partner;
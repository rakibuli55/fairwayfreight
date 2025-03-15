import icon from "../../assets/icons/preloader.svg"

const Preloader = () => {
  return (
    <div className="bg-white w-full h-screen flex items-center justify-center z-[100] fixed top-0 left-0">
     <img className="w-[180px]" src={icon} alt="Preloader" />
    </div>
  );
};

export default Preloader;
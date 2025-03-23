
const Container = ({children}) => {
  return (
    <div className="w-[1530px] extra-large:w-full custom-xl:w-full custom-2xl:w-full extra-large:px-12 custom-2xl:px-12 mx-auto px-6 custom-xl:px-[50px] max-xl:w-full custom-lg:px-10">
      {children}
    </div>
  );
};

export default Container;
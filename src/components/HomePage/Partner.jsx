const Partner = ({ data }) => {
  return (
    <div>
      <div className="flex flex-wrap gap-x-[60px] gap-y-[20px] items-center justify-center partner w-[80%] max-md:w-full mx-auto custom-md:mt-3 custom-sm:w-[600px] custom-sm:flex-nowrap custom-sm:overflow-y-auto custom-sm:gap-x-[30px] custom-sm:justify-start custom-xs:w-[600px] custom-xs:flex-nowrap custom-xs:overflow-y-auto custom-xs:gap-x-[30px] custom-xs:justify-start">
        {data?.brands?.map((item) => (
          <img
            key={item.id}
            src={`${import.meta.env.VITE_SERVER_URL}/${item?.image}`}
            alt={item?.name}
          />
        ))}
      </div>
    </div>
  );
};

export default Partner;

const Partner = ({ data }) => {
  return (
    <div className="flex flex-wrap gap-x-[60px] gap-y-[20px] items-center justify-center partner w-[80%] mx-auto">
      {data?.brands?.map((item) => (
        <img
          key={item.id}
          src={`${import.meta.env.VITE_SERVER_URL}/${item?.image}`}
          alt={item?.name}
        />
      ))}
    </div>
  );
};

export default Partner;

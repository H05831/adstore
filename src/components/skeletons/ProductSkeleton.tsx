export const ProductSkeleton = () => {
  return (
    <div className="w-[20.5rem] h-[28rem] p-3 animate-pulse">
      <div className="w-[19.5rem] h-[19.5rem] bg-zinc-200 rounded-xl" />
      <div className="flex flex-col gap-y-3 mt-3">
        <div className="w-full flex justify-between gap-x-8">
          <span className="bg-zinc-200 w-[12rem] h-5 rounded-md" />
          <span className="bg-zinc-200 w-[5rem] h-5 rounded-md -mr-2" />
        </div>
        <div className="bg-zinc-200 w-[15rem] h-5 rounded-md" />
        <div className="bg-zinc-200 h-5 w-[10rem] rounded-md" />
      </div>
      <div className="w-full h-10 bg-zinc-200 my-3 rounded-md" />
    </div>
  );
};

export default ProductSkeleton;

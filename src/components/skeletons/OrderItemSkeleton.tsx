const OrderItemSkeleton = () => (
  <div className="flex flex-col gap-y-4 animate-pulse">
    <div className="flex justify-between">
      <div className="flex gap-x-4">
        <div className="w-24 h-24 bg-zinc-200 p-2 rounded-md flex items-center justify-center" />
        <div className="flex flex-col gap-y-2">
          <span className="w-[14rem] h-6 font-medium bg-zinc-200 rounded-md" />
          <div className="w-4 h-4 rounded-full bg-zinc-200" />
          <span className="w-[14rem] h-6 text-sm font-medium bg-zinc-200 rounded-md" />
        </div>
      </div>
      <span className="w-[6rem] h-6 font-semibold bg-zinc-200 rounded-md" />
    </div>
    <hr className="w-full h-px" />
  </div>
);

export default OrderItemSkeleton;

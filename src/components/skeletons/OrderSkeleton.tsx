const OrderSkeleton = () => {
  return (
    <div className="bg-white animate-pulse shadow-sm rounded-lg p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-y-3">
          <div className="w-[22rem] h-9 rounded-lg bg-zinc-200" />
          <div className="w-[9rem] h-5 rounded-md bg-zinc-200" />
        </div>
        <div className="flex items-center space-x-4">
          <div className="w-[6rem] h-11 rounded-full bg-zinc-200" />
          <div className="w-[10rem] h-11 rounded-full bg-zinc-200" />
          <div className="w-16 h-11 rounded-lg bg-zinc-200" />
        </div>
      </div>

      <div className="space-y-4">
        <div className="bg-zinc-200 rounded-md w-[6rem] h-7" />
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-zinc-200 rounded-md" />
              <div className="flex flex-col gap-y-3">
                <div className="bg-zinc-200 w-[11rem] h-6 rounded-md" />
                <div className="bg-zinc-200 w-[6rem] h-5 rounded-md" />
              </div>
            </div>
            <div className="bg-zinc-200 w-[5rem] h-6 rounded-md" />
          </div>
          <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-zinc-200 rounded-md" />
              <div className="flex flex-col gap-y-3">
                <div className="bg-zinc-200 w-[11rem] h-6 rounded-md" />
                <div className="bg-zinc-200 w-[6rem] h-5 rounded-md" />
              </div>
            </div>
            <div className="bg-zinc-200 w-[5rem] h-6 rounded-md" />
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center pt-4 border-t">
        <div className="bg-zinc-200 w-[5rem] h-7 rounded-md" />
        <div className="bg-zinc-200 w-[6rem] h-7 rounded-md" />
      </div>
    </div>
  );
};

export default OrderSkeleton;

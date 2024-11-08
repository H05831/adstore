const CartProductSkeleton = () => {
  return (
    <section>
      <div className="flex gap-6 my-2">
        <div className="w-[200px] h-[180px] bg-zinc-200 relative rounded-md" />
        <div className="w-[80%] flex flex-col gap-y-4">
          <div className="flex items-center justify-between">
            <div className="bg-zinc-200 w-[14rem] h-8 rounded-md" />
            <div className="bg-zinc-200 w-[5rem] h-8 rounded-md" />
          </div>
          <div className="flex flex-col gap-y-2.5">
            <div className="bg-zinc-200 w-[8rem] h-5 rounded-md" />
            <div className="bg-zinc-200 w-[5rem] h-5 rounded-md" />
            <div className="bg-zinc-200 w-[5rem] h-5 rounded-md" />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-x-4">
              <div className="bg-zinc-200 w-9 h-9 rounded-full" />
              <div className="bg-zinc-200 w-9 h-9 rounded-full" />
            </div>
            <div className="bg-zinc-200 w-[8rem] h-9 rounded-md" />
          </div>
        </div>
      </div>
      <hr className="mt-7" />
    </section>
  );
};

const CartPageSkeleton = () => {
  return (
    <div className="flex justify-between w-full h-full animate-pulse">
      <div className="w-[60%] flex flex-col">
        <div className="w-full flex items-center justify-between mb-4">
          <div className="bg-zinc-200 w-[9.5rem] h-14 rounded-md" />
          <div className="bg-zinc-200 w-[7rem] h-6 rounded-md" />
        </div>

        <div className="w-full flex flex-col gap-y-4">
          <CartProductSkeleton />
          <CartProductSkeleton />
        </div>
      </div>

      <div className="w-px min-h-full bg-gray-400" />

      <section className="w-[30%]">
        <div className="bg-zinc-200 w-[9.5rem] h-14 rounded-md" />
        <div className="my-5 flex flex-col gap-y-10">
          <div className="flex flex-col gap-y-6">
            <div className="flex items-center justify-between">
              <div className="bg-zinc-200 w-[7rem] h-7 rounded-md" />
              <div className="bg-zinc-200 w-[7rem] h-7 rounded-md" />
            </div>
            <div className="flex items-center justify-between">
              <div className="bg-zinc-200 w-[7rem] h-7 rounded-md" />
              <div className="bg-zinc-200 w-[7rem] h-7 rounded-md" />
            </div>
          </div>
          <div className="flex flex-col gap-y-8">
            <hr className="border-zinc-200" />
            <div className="flex items-center justify-between">
              <div className="bg-zinc-200 w-[8rem] h-7 rounded-md" />
              <div className="bg-zinc-200 w-[8rem] h-7 rounded-md" />
            </div>
            <div className="bg-zinc-200 h-12 rounded-md" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default CartPageSkeleton;

const AddressSkeleton = () => {
  return (
    <div className="w-full border rounded-lg p-5 flex flex-col gap-y-3 cursor-pointer">
      <div className="flex items-start justify-between">
        <div className="flex gap-x-4">
          <div className="w-6 h-6 bg-zinc-200 rounded-full flex items-center justify-center -mt-0.5" />
          <div className="flex flex-col gap-y-3">
            <span className="w-[9rem] h-4 bg-zinc-200 rounded-md" />
            <p className="w-[20rem] h-4 bg-zinc-200 rounded-md" />
            <span className="w-[8rem] h-4 font-medium bg-zinc-200 rounded-md" />
            <span className="w-[15rem] h-4 font-medium bg-zinc-200 rounded-md" />
          </div>
        </div>
        <div className="w-[7rem] h-9 bg-zinc-200 rounded-md -mt-0.5" />
      </div>
    </div>
  );
};

export default AddressSkeleton;

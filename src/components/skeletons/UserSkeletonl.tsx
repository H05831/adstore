const UserSkeleton = () => (
  <div className="animate-pulse grid grid-cols-5 items-center gap-x-6 py-4 px-6 rounded-lg text-sm font-medium">
    {/* User Info Placeholder */}
    <div className="flex items-center gap-x-4">
      <div className="w-12 h-12 bg-gray-200 rounded-full" />
      <div className="flex flex-col">
        <div className="bg-gray-200 h-4 w-32 rounded-md mb-2" />
        <div className="bg-gray-200 h-3 w-24 rounded-md" />
      </div>
    </div>

    {/* User Email Placeholder */}
    <div className="bg-gray-200 h-4 w-48 rounded-md" />

    {/* Orders Placeholder */}
    <div className="bg-gray-200 h-6 w-5 rounded-md text-center mx-auto" />

    {/* Role Placeholder */}
    <div className="bg-gray-200 h-10 w-28 rounded-md text-center mx-auto" />

    {/* Actions Placeholder */}
    <div className="bg-gray-200 h-7 w-20 rounded-md text-center mx-auto" />
  </div>
);

export default UserSkeleton;

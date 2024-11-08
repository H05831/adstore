"use client";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BiLogOut } from "react-icons/bi";
import { RiAdminLine } from "react-icons/ri";

const UserInfo = () => {
  const [open, setOpen] = useState(false);
  const { data } = useSession();
  const router = useRouter();

  if (!data) return null;
  const { user } = data;

  return (
    <div className="relative">
      <div
        onClick={() => setOpen((prev) => !prev)}
        className="bg-black text-white text-xl font-semibold w-12 h-12 rounded-full flex items-center justify-center cursor-pointer"
      >
        {user.name?.slice(0, 1)}
      </div>
      {open && (
        <div className="w-[250px] h-auto flex flex-col gap-4 bg-white shadow-lg rounded-md absolute -right-10 top-14 z-50 py-4 px-5 border border-gray-300 transition-transform duration-200">
          <div className="flex items-center gap-3">
            <div className="bg-black text-white text-2xl font-semibold w-10 h-10 rounded-full flex items-center justify-center">
              {user.name?.slice(0, 1)}
            </div>
            <span className="text-lg font-medium">{user.name}</span>
          </div>
          <div
            onClick={() => signOut()}
            className="flex items-center gap-2.5 font-medium text-gray-700 hover:text-black cursor-pointer transition-colors duration-200"
          >
            <BiLogOut size={22} className="mt-0.5" />
            <span>Logout</span>
          </div>
          {user.role === "ADMIN" && (
            <div
              onClick={() => router.push("/admin/dashboard")}
              className="flex items-center gap-2.5 pl-0.5 font-medium text-gray-700 hover:text-black cursor-pointer transition-colors duration-200"
            >
              <RiAdminLine size={20} />
              <span>Admin</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UserInfo;

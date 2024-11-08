"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BsBox,
  BsBoxFill,
  BsCreditCard,
  BsFillCreditCardFill,
} from "react-icons/bs";

import { IoSettingsOutline, IoSettingsSharp } from "react-icons/io5";
import { LuLayoutDashboard, LuPieChart, LuUsers } from "react-icons/lu";

const TopBar = () => {
  const pathname = usePathname();
  const { data } = useSession();

  const links = [
    {
      label: "Dashboard",
      icon: (
        <LuLayoutDashboard
          size={20}
          fill={pathname === "/dashboard" ? "black" : "white"}
        />
      ),
      path: "/admin/dashboard",
    },
    {
      label: "Products",
      icon:
        pathname === "/adminProducts" ? (
          <BsBoxFill size={20} />
        ) : (
          <BsBox size={20} />
        ),
      path: "/admin/adminProducts",
    },
    {
      label: "Orders",
      icon:
        pathname === "/orders" ? (
          <BsFillCreditCardFill size={20} />
        ) : (
          <BsCreditCard size={20} />
        ),
      path: "/admin/orders",
    },
    {
      label: "Users",
      icon: (
        <LuUsers size={20} fill={pathname === "/users" ? "black" : "white"} />
      ),
      path: "/admin/users",
    },
    {
      label: "Anyalitics",
      icon: (
        <LuPieChart
          size={20}
          fill={pathname === "/anyalitics" ? "black" : "white"}
        />
      ),
      path: "/admin/anyalitics",
    },
    {
      label: "Settings",
      icon:
        pathname === "/settings" ? (
          <IoSettingsSharp size={20} />
        ) : (
          <IoSettingsOutline size={20} />
        ),
      path: "/admin/settings",
    },
  ];

  return (
    <div className="bg-white h-20 rounded-md flex items-center justify-between px-5">
      <Link
        href={"/"}
        className="flex-1 font-semibold text-2xl tracking-wide cursor-pointer"
      >
        ADSTORE
      </Link>
      <div className="flex-1 flex items-center gap-12 h-full">
        {links.map((link) => (
          <Link
            href={link.path}
            className={`flex items-center gap-2 h-full border-b-2 ${
              pathname === link.path ? "border-black" : "border-transparent"
            }`}
            key={link.path}
          >
            {link.icon}
            <span className="font-medium">{link.label}</span>
          </Link>
        ))}
      </div>
      <div className="flex-1 flex items-center justify-end gap-3">
        <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center">
          <span className="text-white text-2xl font-semibold">
            {data?.user.name?.slice(0, 1)}
          </span>
        </div>
        <span className="font-semibold text-sm cursor-pointer">
          {data?.user.name}
        </span>
      </div>
    </div>
  );
};

export default TopBar;

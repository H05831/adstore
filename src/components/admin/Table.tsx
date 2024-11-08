import Image from "next/image";
import React from "react";

interface TableProps {
  thLabel: string;
  tdLable: string;
}

const Table = () => {
  return (
    <table>
      <tr className="flex items-center">
        <th className="w-[240px] flex ml-0.5">User Image</th>
        <th className="w-[240px] flex justify-start">UserId</th>
        <th className="w-[240px] flex justify-start">Email</th>
        <th className="w-[240px] flex justify-start">Role</th>
        <th className="w-[240px] flex justify-start">Orders</th>
        <th className="w-[240px] flex justify-center">Actions</th>
      </tr>
      <tr className="flex items-center my-5">
        <td className="w-[240px] ml-0.5">
          <Image
            src={"/images/men.jpg"}
            alt="image"
            width={75}
            height={75}
            className="w-[75px] h-[75px] rounded-full object-cover"
          />
        </td>
        <td className="w-[240px]">
          <span>98909488499404949</span>
        </td>
        <td className="w-[240px]">
          <span>JasonWatson@gmail.com</span>
        </td>
        <td className="w-[240px]">
          <span>user</span>
        </td>
        <td className="w-[240px]">
          <span>30</span>
        </td>
        <td className="w-[240px] ml-5">
          <div className="flex items-center gap-4">
            <button className="text-sm bg-green-500 text-white px-4 py-1.5">
              UPDATE
            </button>
            <button className="text-sm bg-red-500 text-white px-4 py-1.5">
              REMOVE
            </button>
          </div>
        </td>
      </tr>
    </table>
  );
};

export default Table;

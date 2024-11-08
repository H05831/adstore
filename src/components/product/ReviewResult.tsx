import React from "react";
import { BsStarFill } from "react-icons/bs";

const ReviewResult = ({ index }: { index: number }) => {
  return (
    <div className="flex items-center gap-2 p-2 bg-white shadow-sm rounded-md border border-gray-200">
      <BsStarFill color="gold" className="text-sm md:text-base" />
      <span className="font-semibold text-sm md:text-base">{index + 1}</span>
      <div className="flex-1 h-2 rounded-full bg-gray-200 relative">
        <div
          className="bg-green-600 h-full rounded-full"
          style={{ width: "70%" }}
        ></div>
      </div>
      <span className="text-xs md:text-sm text-gray-500">90%</span>
    </div>
  );
};

export default ReviewResult;

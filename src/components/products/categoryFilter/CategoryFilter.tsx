"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { LuChevronDown } from "react-icons/lu";

const CATEGORIES = [
  {
    label: "ALL",
    value: "all",
  },
  {
    label: "WOMEN",
    value: "women",
  },
  {
    label: "MEN",
    value: "men",
  },
  {
    label: "CHILDREN",
    value: "children",
  },
];

const CategoryFilter = () => {
  const [open, setOpen] = useState(false);
  const searchParams = useSearchParams();
  const categoryValue = searchParams.get("cat");
  const searchQuery = searchParams.get("q");

  return (
    <div>
      <div
        className="border-2 w-fit py-2.5 px-6 flex items-center gap-2 rounded-md cursor-pointer"
        onClick={() => setOpen((prev) => !prev)}
      >
        <span className="text-sm font-semibold capitalize">
          {categoryValue}
        </span>
        <LuChevronDown
          size={16}
          className={open ? "rotate-180 transition" : "rotate-0 transition"}
        />
      </div>
      {open && (
        <div className="w-[150px] h-fit bg-white flex flex-col gap-1.5 border-2 p-3 mt-4 rounded-md absolute z-50">
          {CATEGORIES.map((category) => (
            <Link
              key={category.value}
              href={
                searchQuery
                  ? `/products?cat=${category.value.toUpperCase()}&q=${searchQuery}`
                  : `/products?cat=${category.value.toUpperCase()}`
              }
              className={` p-2 text-sm rounded-md cursor-pointer hover:bg-zinc-100 ${
                category.value.toUpperCase() === categoryValue && "bg-zinc-200"
              }`}
              onClick={() => setOpen(false)}
            >
              {category.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryFilter;

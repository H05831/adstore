"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiChevronRight } from "react-icons/fi";

const PATHS = [
  {
    label: "Cart",
    value: "cart",
  },
  {
    label: "Checkout",
    value: "checkout",
  },
  {
    label: "Payment",
    value: "payment",
  },
];

const Breadcrumb = () => {
  const pathname = usePathname();
  const elementAtLastIndex = PATHS[PATHS.length - 1];

  return (
    <div className="flex items-center gap-x-4 ml-4">
      {PATHS.map((path) => (
        <div key={path.value} className="flex items-center gap-x-2.5">
          <Link
            href={path.value}
            className={`text-sm font-medium ${
              pathname.split("/")[1] === path.value
                ? "text-black"
                : "text-gray-400"
            }`}
          >
            {path.label}
          </Link>
          {path.value !== elementAtLastIndex.value && (
            <FiChevronRight className="text-gray-400 mt-0.5" size={18} />
          )}
        </div>
      ))}
    </div>
  );
};

export default Breadcrumb;

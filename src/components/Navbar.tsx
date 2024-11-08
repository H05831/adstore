"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import SearchBar from "./SearchBar";
import { useState } from "react";

const LINKS = [
  {
    label: "Home",
    value: "/",
  },
  {
    label: "Wishlist",
    value: "/wishlist",
  },
  {
    label: "Collections",
    value: `/products?cat=ALL`,
  },
  {
    label: "Orders",
    value: "/orders",
  },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="w-full h-[6rem] px-5 lg:px-20 flex items-center justify-between sticky top-0 bg-white z-[99999] shadow-md">
      {/* Left Section (Links) */}
      <div className="w-1/3 hidden lg:flex gap-5 text-sm font-semibold">
        {LINKS.map((link) => (
          <Link
            key={link.value}
            href={link.value}
            className={`px-6 py-2 ${
              link.value === pathname || link.value === pathname + "?cat=ALL"
                ? "bg-black text-white rounded-md"
                : ""
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>

      {/* Mobile Hamburger Menu */}
      <div className="lg:hidden">
        <button className="text-2xl" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? "✖" : "☰"}
        </button>
      </div>

      {/* Mobile Menu Links */}
      {isMenuOpen && (
        <div className="absolute top-[6rem] left-0 w-full bg-white flex flex-col items-center lg:hidden z-50 shadow-lg">
          {LINKS.map((link) => (
            <Link
              key={link.value}
              href={link.value}
              className={`px-6 py-4 w-full text-center ${
                link.value === pathname || link.value === pathname + "?cat=ALL"
                  ? "bg-black text-white rounded-md"
                  : ""
              }`}
              onClick={() => setIsMenuOpen(false)} // Close menu after selection
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}

      {/* Center Section (Logo) */}
      <div className="w-1/3 flex items-center justify-center -ml-2">
        <Link
          href={"/"}
          className="text-xl lg:text-3xl tracking-wider font-semibold"
        >
          AD<span className="">STORE</span>
        </Link>
      </div>

      {/* Right Section (Search Bar) */}
      <div className="w-1/3 flex justify-end">
        <SearchBar />
      </div>
    </div>
  );
};

export default Navbar;

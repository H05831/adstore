import Link from "next/link";
import React from "react";
import { BiPhone } from "react-icons/bi";
import { FiMail } from "react-icons/fi";
import { LuMoveRight } from "react-icons/lu";

const Footer = () => {
  return (
    <div className="flex flex-col gap-8 py-10 px-4 sm:px-8 md:px-16 lg:px-20 bg-gray-800 text-white">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="flex flex-col gap-6">
          <Link
            href={"/"}
            className="font-semibold text-xl text-white tracking-wider"
          >
            ADSTORE
          </Link>
          <p className="text-sm text-gray-400">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quam
            laudantium optio atque,
          </p>
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <BiPhone />
            <span>+9189290409</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <FiMail />
            <span>adstore@gmail.com</span>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <h3 className="mb-4 font-bold text-lg">Product Links</h3>
          <Link
            className="text-sm text-gray-400 hover:text-white"
            href={"/categories"}
          >
            Categories
          </Link>
          <Link
            className="text-sm text-gray-400 hover:text-white"
            href={"/new-arrivals"}
          >
            New Arrivals
          </Link>
          <Link
            className="text-sm text-gray-400 hover:text-white"
            href={"/featured"}
          >
            Featured
          </Link>
          <Link
            className="text-sm text-gray-400 hover:text-white"
            href={"/collections"}
          >
            Collections
          </Link>
        </div>
        <div className="flex flex-col gap-3">
          <h3 className="mb-4 font-bold text-lg">Company</h3>
          <Link
            className="text-sm text-gray-400 hover:text-white"
            href={"/about"}
          >
            About
          </Link>
          <Link
            className="text-sm text-gray-400 hover:text-white"
            href={"/blog"}
          >
            Blog
          </Link>
          <Link
            className="text-sm text-gray-400 hover:text-white"
            href={"/careers"}
          >
            Careers
          </Link>
          <Link
            className="text-sm text-gray-400 hover:text-white"
            href={"/services"}
          >
            Services
          </Link>
          <Link
            className="text-sm text-gray-400 hover:text-white"
            href={"/privacy-policy"}
          >
            Privacy Policy
          </Link>
          <Link
            className="text-sm text-gray-400 hover:text-white"
            href={"/terms-of-services"}
          >
            Terms of Services
          </Link>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="mb-4 font-bold text-lg">Join Our Newsletter</h3>
          <p className="text-sm text-gray-400">
            Drop your email to get updates, <br /> promotions, coupons, and
            more!
          </p>
          <div className="flex items-center border-2 border-gray-400 rounded-md overflow-hidden">
            <input
              type="text"
              placeholder="Enter your email"
              className="h-10 bg-transparent pl-4 text-sm border-none outline-none flex-1"
            />
            <div className="w-10 h-10 bg-white flex items-center justify-center cursor-pointer">
              <LuMoveRight color="black" />
            </div>
          </div>
        </div>
      </div>
      <span className="text-center text-sm text-gray-400">
        Copyright &copy; 2024 ADSTORE, All Rights Reserved
      </span>
    </div>
  );
};

export default Footer;

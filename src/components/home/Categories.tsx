"use client";

import Image from "next/image";
import React from "react";
import Heading from "../Heading";
import Description from "../Description";
import Link from "next/link";

const Category = ({
  src,
  url,
  className1,
  className2,
}: {
  src: string;
  url: string;
  className1?: string;
  className2?: string;
}) => {
  return (
    <Link href={url} className={`relative ${className1}`}>
      <Image src={src} alt="image" fill className="object-cover" />
      <div
        className={`bg-black text-white py-2.5 px-8 rounded-md absolute top-[45%] left-[40%] uppercase ${className2}`}
      >
        {url}
      </div>
    </Link>
  );
};

const Categories = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-5">
      <Heading title="Categories" />
      <Description description="Trending sustainable chic for women, durable essentials for men, and eco-friendly fun for children, reflecting a shift towards conscious consumption in fashion." />
      <div className="w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 my-5">
        <Category
          src="/images/man.jpg"
          url="men"
          className1="w-full h-[18.5rem] md:h-[40.5rem] lg:h-[40.5rem] xl:h-[40.5rem] 2xl:h-[40.5rem]"
          className2="left-[34%] top-[40%] md:left-[37%] md:top-[50%] lg:left-[37%] lg:top-[50%] xl:left-[37%] xl:top-[50%] 2xl:left-[37%] 2xl:top-[50%]"
        />
        <div className="w-full grid grid-cols-1 grid-rows-2">
          <Category
            src="/images/childrens.jpg"
            url="children"
            className1="w-full h-[18.5rem] md:h-[20.5rem] lg:h-[20.5rem] xl:h-[20.5rem] 2xl:h-[20.5rem]"
            className2="left-[34%] top-[40%] md:left-[37%] md:top-[50%] lg:left-[37%] lg:top-[50%] xl:left-[37%] xl:top-[50%] 2xl:left-[37%] 2xl:top-[50%]"
          />
          <Category
            src="/images/casual.jpg"
            url="casuals"
            className1="w-full h-[18.5rem] md:h-[20.5rem] lg:h-[20.5rem] xl:h-[20.5rem] 2xl:h-[20.5rem]"
            className2="left-[34%] top-[40%] md:left-[37%] md:top-[50%] lg:left-[37%] lg:top-[50%] xl:left-[37%] xl:top-[50%] 2xl:left-[37%] 2xl:top-[50%]"
          />
        </div>
        <Category
          src="/images/women.jpg"
          url="women"
          className1="w-full h-[18.5rem] md:h-[40.5rem] lg:h-[40.5rem] xl:h-[40.5rem] 2xl:h-[40.5rem]"
          className2="left-[34%] top-[40%] md:left-[37%] md:top-[50%] lg:left-[37%] lg:top-[50%] xl:left-[37%] xl:top-[50%] 2xl:left-[37%] 2xl:top-[50%]"
        />
      </div>
    </div>
  );
};

export default Categories;

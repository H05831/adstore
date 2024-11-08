"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const BANNERS = [
  {
    id: 1,
    src: "/images/banner.jpg",
    description: "Sale! Up to 50% off!",
    title: "Summer Sale Collection",
    bg: "bg-zinc-100",
  },
  {
    id: 2,
    src: "/images/banner2.jpg",
    description: "Sale! Up to 50% off!",
    title: "Monsoon Sale Collection",
    bg: "bg-gray-100",
  },
  {
    id: 3,
    src: "/images/banner3.jpg",
    description: "Sale! Up to 50% off!",
    title: "Winter Sale Collection",
    bg: "bg-pink-50",
  },
];

const Banner = () => {
  const [current, setCurrent] = useState(0);
  const totalBanners = BANNERS.length;

  useEffect(() => {
    const autoSlide = setInterval(() => {
      setCurrent((prev) => (prev + 1) % totalBanners);
    }, 5000);

    return () => clearInterval(autoSlide);
  }, [totalBanners]);

  return (
    <div className="w-screen h-[calc(100vh-6rem)] overflow-hidden relative">
      <div
        className="w-max h-full flex transition-all ease-in-out duration-1000"
        style={{ transform: `translateX(-${current * 100}vw)` }}
      >
        {BANNERS.map((banner) => (
          <div
            key={banner.id}
            className={`${banner.bg} w-screen h-full flex flex-col gap-6 xl:flex-row pt-11 md:pt-0 lg:pt-0 xl:pt-0 2xl:pt-0`}
          >
            <div className="h-1/2 xl:w-1/2 xl:h-full flex flex-col items-center justify-center gap-5 2xl:gap-12 text-center px-20 pb-10">
              <h2 className="text-xl md:text-3xl lg:text-3xl ">
                {banner.description}
              </h2>
              <h1 className="text-5xl md:text-6xl lg:text-6xl font-semibold tracking-wide">
                {banner.title}
              </h1>
              <Link href={"/products?cat=ALL"}>
                <button className="rounded-md bg-black text-white py-2.5 px-6 my-3">
                  SHOP NOW
                </button>
              </Link>
            </div>
            <div className="relative h-1/2 xl:h-full xl:w-1/2">
              <Image
                src={banner.src}
                alt="image"
                fill
                sizes="100%"
                className="object-cover"
              />
            </div>
          </div>
        ))}
      </div>
      <div className="absolute mx-auto left-[45%] md:left-[49%] lg:left-[49%] xl:left-[49%] 2xl:left-[49%] bottom-8 gap-4 flex">
        {BANNERS.map((banner, index) => (
          <div
            className={`w-2 h-2 rounded-full ring-1 ring-black cursor-pointer flex items-center justify-center ${
              current === index ? "scale-150" : ""
            }`}
            key={banner.id}
            onClick={() => setCurrent(index)}
          >
            {current === index && (
              <div className="w-[0.4rem] h-[0.4rem] bg-black rounded-full" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Banner;

"use client";

import { useToggleWishlist } from "@/hooks/useToggleWishlist";
import type { Product } from "@prisma/client";
import Link from "next/link";
import { FiShoppingBag } from "react-icons/fi";
import { GoStarFill } from "react-icons/go";
import { RiHeart3Fill, RiHeart3Line } from "react-icons/ri";
import ImageSlider from "./admin/ImageSlider";

const Card = ({ product }: { product: Product }) => {
  const { toggleProduct, wishlist } = useToggleWishlist();
  if (!product) return null;

  const isInWishlist = wishlist.includes(product?.id);

  return (
    <div className="w-[20.5rem] h-[28rem] relative p-3 rounded-md cursor-pointer">
      <Link href={`/product/${product.id}`}>
        <ImageSlider isProductCard images={product.images && product.images} />
      </Link>
      <div
        className="w-10 h-10 z-50 bg-white rounded-full absolute top-6 right-5 flex items-center justify-center"
        onClick={() => toggleProduct(product.id)}
      >
        {isInWishlist ? (
          <RiHeart3Fill size={22} color="red" />
        ) : (
          <RiHeart3Line size={22} color="black" />
        )}
      </div>
      <div className="flex flex-col gap-y-2 mt-3">
        <Link href={`/product/${product.id}`}>
          <div className="flex justify-between">
            <span className="text-md font-semibold">{product.name}</span>
            <span className="text-md font-bold text-zinc-950">
              ${product.price}
            </span>
          </div>
        </Link>
        <p className="text-[0.8rem] text-gray-500">
          {product.description?.slice(0, 40)}...
        </p>
        <div className="flex items-center gap-x-3">
          <div className="flex items-center gap-x-1">
            {[...Array(5)].map((_, i) => (
              <GoStarFill key={i} size={14} color="green" />
            ))}
          </div>
          <span className="text-sm text-zinc-500 font-semibold">(121)</span>
        </div>
        <button
          type="button"
          className="bg-black text-white py-1.5 mt-2 flex items-center justify-center gap-x-2 rounded-md"
          aria-label="Add to Cart"
        >
          <FiShoppingBag />
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default Card;

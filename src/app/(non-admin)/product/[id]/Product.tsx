"use client";

import ImageSlider from "@/components/admin/ImageSlider";
import Colors from "@/components/product/Colors";
import ProductDetails from "@/components/product/ProductDetails";
// import RelatedProducts from "@/components/product/RelatedProducts";
import Reviews from "@/components/product/Reviews";
import Sizes from "@/components/product/Sizes";
import Quantity from "@/components/Quantity";
import { useCartStore } from "@/hooks/useCart";
import { useToggleWishlist } from "@/hooks/useToggleWishlist";
import type { Product } from "@prisma/client";
import Image from "next/image";
import { useMemo, useState } from "react";
import { FiHeart } from "react-icons/fi";
import { GoStarFill } from "react-icons/go";
import { RiHeart3Fill, RiHeart3Line, RiLoader4Fill } from "react-icons/ri";
import { toast } from "sonner";

interface ProductProps {
  product: Product;
}

const Product = ({ product }: ProductProps) => {
  const [selectedSize, setSelectedSize] = useState<string | null>(
    product.sizes[0] || null
  );
  const [selectedColor, setSelectedColor] = useState<string | null>(
    product.colors[0] || null
  );
  const [quantity, setQuantity] = useState<number>(1);

  const { id, name, description, price, sizes, colors, images } = product;

  const image = useMemo(() => {
    return images[colors.indexOf(selectedColor as string)] || images[0];
  }, [selectedColor, images, colors]);

  const { addToCart, isLoading } = useCartStore((state) => state);

  const { toggleProduct, wishlist } = useToggleWishlist();
  const isInWishlist = wishlist.includes(product.id);

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      toast.error("Please select size and color.");
      return;
    }

    addToCart({
      id,
      name,
      image,
      size: selectedSize,
      color: selectedColor,
      quantity: quantity,
      price,
    });

    toast.success("Product added to cart.");
  };

  return (
    <div className="w-full px-4 md:px-10 lg:px-20 xl:px-30">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-24 my-5">
        <ImageSlider images={images} isSingleProductPage />

        <div className="flex flex-col gap-y-4 mt-8">
          <h1 className="text-3xl md:text-4xl font-bold">{name}</h1>
          <div className="flex items-center gap-x-2 md:gap-x-4 text-zinc-400 text-xs md:text-sm">
            <div className="flex items-center gap-x-1">
              {[...Array(5)].map((_, index) => (
                <GoStarFill key={index} color="gold" />
              ))}
            </div>
            <span>42 reviews</span>
          </div>
          <div className="flex items-center gap-2 md:gap-4">
            <span className="text-xl md:text-2xl font-semibold">${price}</span>
            <span className="text-sm md:text-xl text-zinc-400 font-semibold line-through">
              $30
            </span>
          </div>
          <p className="text-xs md:text-sm">{description?.slice(0, 300)}</p>
          <Sizes
            sizes={sizes}
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
          />
          <Colors
            colors={colors}
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
          />
          <Quantity quantity={quantity} setQuantity={setQuantity} />
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 my-4">
            <button
              onClick={handleAddToCart}
              className="bg-black rounded-md text-white text-sm py-2 px-4 sm:py-2.5 sm:px-6"
            >
              {isLoading ? (
                <RiLoader4Fill
                  size={20}
                  className="text-zinc-400 animate-spin"
                />
              ) : (
                "ADD TO CART"
              )}
            </button>
            <div
              onClick={() => toggleProduct(product.id)}
              className="flex items-center justify-center gap-3 py-2 px-2 rounded-md border-2 border-black cursor-pointer"
            >
              <span className="text-xs sm:text-sm uppercase font-semibold text-black">
                Add to Wishlist
              </span>
              {isInWishlist ? (
                <RiHeart3Fill color="red" size={20} />
              ) : (
                <RiHeart3Line color="black" size={20} />
              )}
            </div>
          </div>
        </div>
      </div>
      <hr className="border-zinc-300 my-10" />
      <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12">
        <ProductDetails />
        <div className="relative w-full md:w-[450px] h-[300px]">
          <Image
            src="/images/women.jpg"
            fill
            alt="Sale"
            className="absolute object-cover"
          />
          <div className="absolute top-4 md:top-16 left-4 md:left-10 flex flex-col gap-4 text-white">
            <span className="bg-orange-500 py-2 px-4 md:py-2.5 md:px-6 w-fit">
              30% Off
            </span>
            <h3 className="text-2xl md:text-3xl font-bold">
              Explore New <br /> Arrivals
            </h3>
            <span className="text-xs md:text-sm">
              Shop The Latest From Top Brands
            </span>
          </div>
        </div>
      </div>
      <hr className="border-zinc-300 my-10" />
      {/* <RelatedProducts /> */}
      <hr className="border-zinc-300 my-10" />
      <Reviews productId={product.id} />
    </div>
  );
};

export default Product;

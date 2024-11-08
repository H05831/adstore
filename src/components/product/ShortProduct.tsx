import Image from "next/image";
import React from "react";

interface ShortProductProps {
  product: string;
  setSelectedProduct: (product: string) => void;
}

const ShortProduct = ({ setSelectedProduct, product }: ShortProductProps) => {
  return (
    <div
      className="bg-zinc-200 w-[120px] h-[120px] flex justify-center cursor-pointer"
      onClick={() => setSelectedProduct(product)}
    >
      <Image
        src={product}
        alt="product-image"
        width={100}
        height={100}
        className="w-[108px] h-[108px] object-contain"
      />
    </div>
  );
};

export default ShortProduct;

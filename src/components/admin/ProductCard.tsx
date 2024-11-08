import type { Product } from "@prisma/client";
import Link from "next/link";
import ImageSlider from "./ImageSlider";

interface ProductCardProps {
  setTitle: (title: string) => void;
  setOpen: (value: any) => void;
  product: Product;
}

const ProductCard = ({ setTitle, setOpen, product }: ProductCardProps) => {
  return (
    <Link
      href={`/admin/adminProducts?productId=${product.id}`}
      className="w-[20.5rem] h-[28rem] p-3 rounded-md cursor-pointer"
      onClick={() => {
        setTitle("Edit Product");
        setOpen(true);
      }}
    >
      <ImageSlider isProductCard={true} images={product.images} />
      <div className="flex flex-col gap-y-2 mt-3">
        <div className="flex gap-x-2.5">
          <span className="text-sm font-semibold">{product.name}</span>
          <span className="text-md font-bold text-zinc-950">
            ${product.price}
          </span>
        </div>
        <p className="text-[0.8rem] text-gray-500">
          {product.description?.slice(0, 60)}
        </p>
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1.5">
            <span className="font-semibold">Stocks: </span>
            <span>300</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="font-semibold">Sold: </span>
            <span>130</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;

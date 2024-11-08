import { useCartStore } from "@/hooks/useCart";
import Link from "next/link";
import React from "react";
import { RiQuestionLine } from "react-icons/ri";

const SummaryRow = ({ value, label }: { value: number; label: string }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="text-lg font-semibold text-gray-700">{label}</span>
        <RiQuestionLine />
      </div>
      <span className="text-lg font-semibold text-gray-800">
        $ {value.toFixed(2)}
      </span>
    </div>
  );
};

const ProductsSummary = () => {
  const { cartProducts } = useCartStore((state) => state);

  const subTotal = cartProducts.reduce((acc, product) => {
    const productTotal = (product.price || 0) * (product.quantity || 0);
    return acc + productTotal;
  }, 0);

  return (
    <div className="my-5 flex flex-col gap-y-10">
      <div className="flex flex-col gap-4">
        <SummaryRow label="Subtotal" value={subTotal} />
        <SummaryRow label="Discount" value={0} />
      </div>
      <div className="flex flex-col gap-6">
        <hr className="border-zinc-200" />
        <SummaryRow label="Grand total" value={subTotal} />
        <Link
          href={"/checkout"}
          className="w-full flex items-center justify-center bg-black text-white text-sm tracking-wider h-10 uppercase rounded-md"
        >
          Chekout Now
        </Link>
      </div>
    </div>
  );
};

export default ProductsSummary;

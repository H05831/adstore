"use client";

import { useCartStore } from "@/hooks/useCart";
import { usePathname, useRouter } from "next/navigation";
import React, { useMemo, useState } from "react";
import { BsFillTagFill } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import OrderItem from "./OrderItem";
import OrderItemSkeleton from "./skeletons/OrderItemSkeleton";
import { useAddressStore } from "@/hooks/useAddress";

const SummaryRow = ({
  value,
  label,
}: {
  value: number | string;
  label: string;
}) => (
  <div className="flex items-center justify-between py-1">
    <h4 className="font-medium text-gray-600">{label}</h4>
    <span className="font-semibold text-sm">${value}</span>
  </div>
);

interface OrderDetailsProps {
  isThisThankYouPage?: boolean;
}

const OrderDetails = ({ isThisThankYouPage }: OrderDetailsProps) => {
  const [discountCode, setDiscountCode] = useState<string | null>(null);
  const [isCodeApplied, setIsCodeApplied] = useState<boolean>(false);

  const { cartProducts } = useCartStore((state) => state);

  const pathname = usePathname();
  const router = useRouter();

  const totalPrice = useMemo(() => {
    return cartProducts.reduce(
      (total, product) =>
        total + (product.price || 0) * (product.quantity || 0),
      0
    );
  }, [cartProducts]);

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDiscountCode(e.target.value);
  };

  const handleApplyCode = () => {
    if (discountCode && discountCode.trim() !== "") {
      setIsCodeApplied(true);
    }
  };

  const handleRemoveCode = () => {
    setDiscountCode(null);
    setIsCodeApplied(false);
  };

  return (
    <div
      className={`w-full flex flex-col gap-y-6 rounded-lg px-6 py-5 bg-white shadow-md ${
        isThisThankYouPage ? "border-none" : "border"
      }`}
    >
      <h4 className="text-lg font-semibold text-gray-800">Your Order</h4>

      {cartProducts.length > 0 ? (
        cartProducts.map((cartProduct) => (
          <OrderItem
            key={`${cartProduct.id}-${cartProduct.size}-${cartProduct.color}`}
            cartProduct={cartProduct}
          />
        ))
      ) : (
        <div className="flex flex-col gap-y-3">
          <OrderItemSkeleton />
          <OrderItemSkeleton />
          <OrderItemSkeleton />
        </div>
      )}

      {/* Discount Code Section */}
      {isCodeApplied ? (
        <div className="flex items-center justify-between bg-gray-100 p-3 rounded-md">
          <span className="flex items-center gap-2 text-gray-700 font-medium">
            <BsFillTagFill size={18} />
            Applied discount code: {discountCode}
          </span>
          <IoMdClose
            size={20}
            className="cursor-pointer text-red-500 hover:text-red-700"
            onClick={handleRemoveCode}
          />
        </div>
      ) : (
        !isThisThankYouPage && (
          <div className="flex flex-col gap-y-3">
            <h4 className="text-md font-semibold text-gray-700">
              Discount Code
            </h4>
            <div className="flex gap-2">
              <input
                type="text"
                className="w-full border rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                placeholder="Enter discount code"
                value={discountCode || ""}
                onChange={handleCodeChange}
              />
              <button
                className="px-5 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors"
                onClick={handleApplyCode}
              >
                Apply
              </button>
            </div>
          </div>
        )
      )}

      <div className="flex flex-col gap-y-3">
        <SummaryRow label="Subtotal" value={totalPrice.toFixed(2)} />
        <SummaryRow label="Discount" value={isCodeApplied ? "80.00" : "0.00"} />
        <SummaryRow label="Shipping Cost" value="14.00" />
      </div>

      <hr className="border-t mt-4" />

      {/* Grand Total and Button */}
      <div className="flex flex-col gap-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-medium text-lg text-gray-900">Grand Total</h4>
          <span className="font-semibold text-lg text-gray-800">
            ${(totalPrice - (isCodeApplied ? 80 : 0) + 14).toFixed(2)}
          </span>
        </div>

        {pathname !== "/payment" && (
          <button
            className="w-full h-12 bg-black text-white rounded-md font-medium hover:bg-black/90 transition-colors"
            onClick={() => {
              isThisThankYouPage
                ? router.push("/products?cat=ALL")
                : router.push("/payment");
            }}
          >
            {isThisThankYouPage ? "Continue Shopping" : "Proceed to Payment"}
          </button>
        )}
      </div>
    </div>
  );
};

export default OrderDetails;

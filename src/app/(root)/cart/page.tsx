"use client";

import Heading from "@/components/Heading";
import CartProduct from "@/components/cart/CartProduct";
import ProductsSummary from "@/components/cart/ProductsSummary";
import CartPageSkeleton from "@/components/skeletons/CartPageSkeleton";
import { useCartStore } from "@/hooks/useCart";
import Link from "next/link";
import { FiShoppingCart } from "react-icons/fi";
import { MdDelete } from "react-icons/md";

const CartPage = () => {
  const { cartProducts, isLoading, clearCart } = useCartStore((state) => state);

  return (
    <div className="h-full flex flex-col py-6 px-4 md:px-8 lg:px-20">
      {isLoading ? (
        <CartPageSkeleton />
      ) : cartProducts.length > 0 ? (
        <div className="flex flex-col md:flex-row justify-between w-full h-full">
          {/* Cart Products Section */}
          <section className="w-full md:w-[60%] mb-8 md:mb-0 space-y-6">
            <div className="flex items-center justify-between mb-6">
              <Heading
                title="Your Cart"
                start
                className="text-xl md:text-2xl lg:text-3xl"
              />
              <button
                className="text-zinc-700 flex items-center gap-x-1 text-sm md:text-base font-medium"
                onClick={clearCart}
              >
                <MdDelete size={20} className="mt-0.5" />
                Remove
              </button>
            </div>
            {cartProducts.map((cartProduct, index) => (
              <div
                key={`${cartProduct.id}-${cartProduct.size}-${cartProduct.color}-${index}`}
                className="border-b border-zinc-200 pb-4 mb-4"
              >
                <CartProduct cartProduct={cartProduct} />
              </div>
            ))}
          </section>

          {/* Divider for larger screens */}
          <div className="hidden md:block w-px min-h-full bg-gray-400 mx-8" />

          {/* Summary Section */}
          <section className="w-full md:w-[40%] space-y-6">
            <Heading
              title="Summary"
              start
              className="text-xl md:text-2xl lg:text-3xl"
            />
            <ProductsSummary />
          </section>
        </div>
      ) : (
        <div className="h-full flex flex-col items-center my-24 gap-y-6">
          <FiShoppingCart
            size={60}
            className="text-5xl md:text-6xl lg:text-7xl"
          />
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-semibold">
            YOUR CART
          </h3>
          <span className="text-base md:text-lg lg:text-xl text-gray-600 text-center">
            Your Cart is Empty, Add Products to your Cart.
          </span>
          <Link
            href="/products?cat=ALL"
            className="bg-zinc-800 text-white px-6 py-3 text-sm md:text-base"
          >
            ADD PRODUCTS
          </Link>
        </div>
      )}
    </div>
  );
};

export default CartPage;

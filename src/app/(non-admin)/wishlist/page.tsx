"use client";

import { fetchWishlistProducts } from "@/actions/users";
import Card from "@/components/Card";
import CategoryFilter from "@/components/products/categoryFilter/CategoryFilter";
import ProductSkeleton from "@/components/skeletons/ProductSkeleton";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

const WishListPage = () => {
  const { data } = useSession();

  const { data: products, isLoading } = useQuery({
    queryKey: ["wishlist"],
    queryFn: async () => await fetchWishlistProducts(data?.user?.id),
  });

  return (
    <div className="w-screen md:px-20 py-5 pb-28 flex flex-col items-center md:items-start lg:items-start xl:items-start 2xl:items-start">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 py-5 gap-x-[1.5rem] gap-y-[3rem]">
        {isLoading ? (
          Array.from({ length: 8 }).map((_, index) => (
            <ProductSkeleton key={index} />
          ))
        ) : products && products.WishlistItems.length > 0 ? (
          products.WishlistItems.map((wishlistItem) => (
            <Card key={wishlistItem.id} product={wishlistItem.product} />
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default WishListPage;

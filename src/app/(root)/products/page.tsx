"use client";

import { fetchAllProducts } from "@/actions/products";
import Card from "@/components/Card";
import CategoryFilter from "@/components/products/categoryFilter/CategoryFilter";
import ProductSkeleton from "@/components/skeletons/ProductSkeleton";
import type { Category } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

interface PageProps {
  searchParams: {
    cat?: string;
    q?: string;
  };
}

const isValidCategory = (cat: string): cat is Category => {
  return ["CHILDREN", "MEN", "WOMEN"].includes(cat);
};

const ProductsPage = ({ searchParams }: PageProps) => {
  const { cat, q } = searchParams;

  const whereClause: {
    category?: Category;
    name?: { contains: string; mode: "insensitive" };
  } = {};

  if (cat && isValidCategory(cat)) {
    whereClause.category = cat;
  }
  if (q) {
    whereClause.name = { contains: q, mode: "insensitive" };
  }

  const { data: products, isLoading } = useQuery({
    queryKey: ["products", cat, q],
    queryFn: () => fetchAllProducts({ whereClause }),
  });

  return (
    <div className="w-screen md:px-20 py-5 pb-28 flex flex-col items-center md:items-start lg:items-start xl:items-start 2xl:items-start">
      <div className="flex items-center justify-between">
        <CategoryFilter />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 py-5 gap-x-[1.5rem] gap-y-[3rem]">
        {isLoading ? (
          Array.from({ length: 8 }).map((_, index) => (
            <ProductSkeleton key={index} />
          ))
        ) : products && products.length > 0 ? (
          products.map((product) => <Card key={product.id} product={product} />)
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;

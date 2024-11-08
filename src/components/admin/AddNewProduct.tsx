"use client";

import { fetchSingleProduct } from "@/actions/products";
import type { Product } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";
import { BsArrowRight } from "react-icons/bs";
import ImageSlider from "./ImageSlider";
import ImageUploader from "./ImageUploader";
import ProductFields from "./ProductFields";

interface AddNewProductProps {
  openFullView: boolean;
  setOpenFullView: (value: boolean) => void;
  title: string;
  productId?: string;
}

const AddNewProduct = ({
  openFullView,
  setOpenFullView,
  title,
  productId,
}: AddNewProductProps) => {
  const {
    data: product,
    isLoading,
    error,
  } = useQuery<Product | null>({
    queryKey: ["productId", productId],
    queryFn: () => {
      if (!productId) return null;
      return fetchSingleProduct({ productId });
    },
  });

  const toggleFullView = useCallback(() => {
    setOpenFullView(!openFullView);
  }, [setOpenFullView, openFullView]);

  const actionText = useMemo(() => {
    return title === "Edit Product" || productId
      ? "UPDATE PRODUCT"
      : "ADD PRODUCT";
  }, [title, productId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-2xl">
          {productId ? "Update Product" : title}
        </h2>
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={toggleFullView}
        >
          <span className="text-sm font-medium">
            {openFullView ? "See original view" : "See full view"}
          </span>
          <BsArrowRight />
        </div>
      </div>
      <div
        className={`flex ${
          openFullView ? "flex-row justify-between" : "flex-col gap-6"
        }`}
      >
        {product ? (
          <ImageSlider
            images={product.images}
            productId={productId}
            openFullView={openFullView}
          />
        ) : (
          <ImageUploader openFullView={openFullView} productId={productId} />
        )}

        <ProductFields
          productId={productId}
          openFullView={openFullView}
          action={actionText}
        />
      </div>
    </div>
  );
};

export default AddNewProduct;

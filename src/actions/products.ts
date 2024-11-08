"use server";

import { db } from "@/lib/db";
import type { Category } from "@prisma/client";

export interface AddProductProps {
  productId: string | undefined;
  name: string | null;
  description: string | null;
  price: number | null;
  sizes: string[];
  colors: string[];
  category: Category | null;
}

export const addProduct = async ({
  productId,
  name,
  description,
  price,
  category,
  sizes,
  colors,
}: AddProductProps) => {
  await db.product.update({
    where: { id: productId },
    data: {
      name,
      description,
      price,
      category,
      sizes,
      colors,
    },
  });

  return { success: "Product Added Successfully!" };
};

export interface updateProductProps {
  productId: string | undefined;
  data: {
    name: string | null;
    description: string | null;
    price: number | null;
    sizes: string[];
    colors: string[];
    category: Category | null;
  };
}

export const updateProduct = async ({
  productId,
  data,
}: updateProductProps) => {
  await db.product.update({
    where: { id: productId },
    data: {
      ...data,
    },
  });

  return { success: "Product updated successfully!" };
};

export const fetchSingleProduct = async ({
  productId,
}: {
  productId: string | undefined;
}) => {
  const product = await db.product.findUnique({
    where: { id: productId },
  });

  return product;
};

export const fetchAllProducts = async ({
  whereClause = {},
}: {
  whereClause?: {
    category?: Category;
    name?: { contains: string; mode: "insensitive" };
  };
} = {}) => {
  const products = await db.product.findMany({
    where: whereClause,
  });

  return products;
};

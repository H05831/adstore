"use server";

import { db } from "@/lib/db";
import type { Product, UserRole } from "@prisma/client";

export const fetchAllUsers = async () => {
  const users = await db.user.findMany({
    include: {
      orders: true,
    },
  });

  return users;
};

export const fetchSingleUser = async ({
  userId,
}: {
  userId: string | undefined;
}) => {
  const user = await db.user.findUnique({
    where: { id: userId },
  });

  return user;
};

export const deleteUser = async ({ userId }: { userId: string | null }) => {
  await db.user.delete({
    where: {
      id: userId!,
    },
  });
};

export const updateUser = async ({
  userId,
  role,
}: {
  userId: string | undefined;
  role: UserRole;
}) => {
  await db.user.update({
    where: { id: userId },
    data: {
      role,
    },
  });
};

export const createWishlist = async ({
  userId,
  productId,
}: {
  userId: string | undefined;
  productId: string | undefined;
}) => {
  if (!userId || !productId)
    throw new Error("userId and productId are required");

  let wishlist = await db.wishlist.findFirst({
    where: { userId },
  });

  if (!wishlist) {
    await db.wishlist.create({
      data: {
        user: { connect: { id: userId } },
      },
    });

    wishlist = await db.wishlist.findFirst({
      where: { userId },
    });
  }

  if (!wishlist || !wishlist.id) {
    throw new Error("Failed to retrieve or create a wishlist");
  }

  const existingProduct = await db.wishlistItems.findFirst({
    where: {
      wishlistId: wishlist.id,
      productId,
    },
  });

  if (existingProduct) {
    await db.wishlistItems.delete({
      where: {
        id: existingProduct.id,
      },
    });
  } else {
    await db.wishlistItems.create({
      data: {
        wishlist: { connect: { id: wishlist.id } },
        product: { connect: { id: productId } },
      },
    });

    return { added: true };
  }
};

export const fetchWishlistProducts = async (userId: string | undefined) => {
  const products = await db.wishlist.findFirst({
    where: {
      userId,
    },
    include: {
      WishlistItems: {
        include: {
          product: true,
        },
      },
    },
  });

  return products;
};

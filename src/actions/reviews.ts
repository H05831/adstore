"use server";

import { db } from "@/lib/db";

interface AddReviewProps {
  userId: string | undefined;
  productId: string | undefined;
  rating: string;
  reviewText: string;
}

export const addReview = async ({
  userId,
  productId,
  reviewText,
  rating,
}: AddReviewProps) => {
  await db.review.create({
    data: {
      rating,
      reviewText,
      creator: { connect: { id: userId } },
      product: { connect: { id: productId } },
    },
  });
};

export const fetchReviews = async ({
  productId,
}: {
  productId: string | undefined;
}) => {
  const reviews = await db.review.findMany({
    where: {
      productId,
    },
  });

  return reviews;
};

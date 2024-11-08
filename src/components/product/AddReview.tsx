"use client";

import { addReview } from "@/actions/reviews";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { toast } from "sonner";
import RatingDisplay from "./RatingDisplay";
import { RiLoader4Line } from "react-icons/ri";

const AddReview = ({ productId }: { productId: string | undefined }) => {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState<string>("");
  const { data } = useSession();

  const queryClient = useQueryClient();

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
  };

  const { mutate: addNewReview, isPending } = useMutation({
    mutationFn: async () =>
      await addReview({
        rating: String(rating),
        productId,
        reviewText,
        userId: data?.user.id,
      }),

    onSuccess: () => {
      toast.success("Review added successfully");
      setReviewText("");
      setRating(0);
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
    },

    onError: () => {
      toast.error("Failed to add Review");
    },
  });

  const handleRating = () => {
    if (rating <= 0) {
      toast.error("Please add a rating");
      return;
    } else if (!reviewText) {
      toast.error("Please add a review");
      return;
    }

    addNewReview();
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <span className="font-semibold text-lg">Add Your Review Here: </span>
        <RatingDisplay
          rating={rating}
          handleRatingChange={handleRatingChange}
        />
      </div>
      <div>
        <textarea
          value={reviewText}
          cols={60}
          rows={10}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setReviewText(e.target.value)
          }
          placeholder="Write your review here"
          className="outline-none border-2 p-4"
        ></textarea>
      </div>
      <button
        disabled={isPending}
        onClick={handleRating}
        className="bg-black/95 text-white h-12 rounded-md"
      >
        {isPending ? (
          <RiLoader4Line size={18} className="text-gray-500 animate-spin" />
        ) : (
          "PUBLISH"
        )}
      </button>
    </div>
  );
};

export default AddReview;

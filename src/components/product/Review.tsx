import { fetchSingleUser } from "@/actions/users";
import type { Review } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { BsFillStarFill } from "react-icons/bs";

const Review = ({ review }: { review: Review }) => {
  const [showFullReview, setShowFullReview] = useState<boolean>(false);

  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: async () => await fetchSingleUser({ userId: review.userId }),
  });

  return (
    <div className="w-full flex flex-col gap-5">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="h-12 w-12 rounded-full bg-black flex items-center justify-center">
            <span className="font-semibold text-xl text-white">
              {user?.name?.slice(0, 1)}
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-lg sm:text-2xl font-bold">{user?.name}</span>
            <span className="text-xs sm:text-sm text-zinc-500">
              {new Date(review.createdAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-4 mt-2 sm:mt-0">
          <div className="flex items-center gap-1 sm:gap-2">
            {[...Array(Number(review.rating))].map((_, index) => (
              <BsFillStarFill
                key={index}
                color="gold"
                className="text-sm sm:text-base"
              />
            ))}
          </div>
          <span className="text-sm sm:text-lg font-semibold">
            {review.rating}
          </span>
        </div>
      </div>
      <p className="text-sm sm:text-md leading-relaxed text-zinc-600">
        {showFullReview || review.reviewText.length <= 200
          ? review.reviewText
          : review.reviewText.slice(0, 200)}
        {review.reviewText.length > 200 && (
          <span
            onClick={() => setShowFullReview((prev) => !prev)}
            className="text-red-500 font-semibold cursor-pointer mx-1"
          >
            {showFullReview ? "Read less..." : " Read More..."}
          </span>
        )}
      </p>
    </div>
  );
};

export default Review;

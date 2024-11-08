import React, { useState } from "react";
import Heading from "../Heading";
import Review from "./Review";
import { BsStarFill } from "react-icons/bs";
import ReviewResult from "./ReviewResult";
import AddReview from "./AddReview";
import { useQuery } from "@tanstack/react-query";
import { fetchReviews } from "@/actions/reviews";

const Reviews = ({ productId }: { productId: string | undefined }) => {
  const [rating, setRating] = useState<number>(0);

  const { data: reviews } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => fetchReviews({ productId }),
  });

  return (
    <div className="px-4 md:px-8 lg:px-14 my-8 md:my-16">
      <Heading title="Reviews" start />
      <div className="flex flex-col md:flex-row lg:flex-row xl:flex-row 2xl:flex-row md:gap-44 lg:gap-44 xl:gap-44 2xl:gap-44 gap-8 my-7">
        <div className="flex-1 flex flex-col gap-5">
          {reviews && reviews?.length > 0 ? (
            reviews?.map((review) => (
              <div key={review.id}>
                <Review review={review} />
                <hr className="border-zinc-300 my-5" />
              </div>
            ))
          ) : (
            <p>No Reviews.</p>
          )}
        </div>
        <div className="w-full md:w-[40%] flex flex-col gap-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
            <h3 className="text-md font-semibold">{reviews?.length} Reviews</h3>
            <div className="flex items-center gap-2 mt-2 md:mt-0">
              <BsStarFill color="gold" />
              <span className="text-md font-semibold">4.5</span>
            </div>
          </div>
          <div className="flex flex-col gap-8 md:gap-12">
            <div className="flex flex-col gap-4">
              {[...Array(5)].map((_, index) => (
                <ReviewResult key={index} index={index} />
              ))}
            </div>
            <AddReview productId={productId} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;

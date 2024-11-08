import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

interface StarRatingProps {
  rating: number;
  onRatingChange: (rating: number) => void;
}

const StarRating = ({ rating, onRatingChange }: StarRatingProps) => {
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);

  return (
    <div className="flex items-center space-x-1">
      {[...Array(5)].map((_, index) => {
        const starRating = index + 1;
        return (
          <FaStar
            key={starRating}
            size={25}
            className={`cursor-pointer transition-transform duration-200 ${
              starRating <= (hoveredRating || rating)
                ? "text-yellow-500 transform scale-110"
                : "text-gray-300"
            }`}
            onMouseEnter={() => setHoveredRating(starRating)}
            onMouseLeave={() => setHoveredRating(null)}
            onClick={() => onRatingChange(starRating)}
          />
        );
      })}
    </div>
  );
};

export default StarRating;

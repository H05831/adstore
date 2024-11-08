import StarRating from "./RatingStars";

interface RatingDisplayProps {
  rating: number;
  handleRatingChange: (rating: number) => void;
}

const RatingDisplay = ({ rating, handleRatingChange }: RatingDisplayProps) => {
  return (
    <div className="p-6 border rounded-lg bg-white shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        Rate This Product
      </h2>
      <div className="flex justify-center mb-4">
        <StarRating rating={rating} onRatingChange={handleRatingChange} />
      </div>
      <p className="text-lg font-semibold mb-4 text-gray-700">
        Your Rating: <span className="text-black">{rating}</span> / 5
      </p>
    </div>
  );
};

export default RatingDisplay;

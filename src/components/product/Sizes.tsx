"use client";

interface SizesProps {
  sizes: string[];
  selectedSize: string | null;
  setSelectedSize: (size: string) => void;
}

const Sizes = ({ sizes, selectedSize, setSelectedSize }: SizesProps) => {
  return (
    <div>
      <span className="text-lg font-semibold">Sizes :</span>
      <div className="flex items-center gap-4 my-2">
        {sizes.map((size) => (
          <div
            key={size}
            className={`w-10 h-10 text-sm font-semibold border border-black rounded-md flex items-center justify-center cursor-pointer ${
              size === selectedSize ? "bg-black text-white" : "text-black"
            }`}
            onClick={() => setSelectedSize(size)}
          >
            <span className="text-sm">{size}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sizes;

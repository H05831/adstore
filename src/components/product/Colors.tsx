"use client";

interface ColorsProps {
  colors: string[];
  selectedColor: string | null;
  setSelectedColor: (color: string) => void;
}

const Colors = ({ colors, selectedColor, setSelectedColor }: ColorsProps) => {
  return (
    <div>
      <span className="text-lg font-semibold">Colors :</span>
      <div className="flex items-center gap-4 my-2">
        {colors.map((color) => (
          <div
            className={`h-7 w-7 flex items-center justify-center ${
              selectedColor === color
                ? "border-2 border-black rounded-full"
                : "border-2 border-transparent rounded-full"
            }`}
            key={color}
          >
            <div
              className={`border rounded-full cursor-pointer ${
                selectedColor === color ? "w-5 h-5" : "w-6 h-6 "
              }`}
              style={{ backgroundColor: color }}
              onClick={() => setSelectedColor(color)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Colors;

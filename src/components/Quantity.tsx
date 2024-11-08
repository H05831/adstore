"use client";

import { FiMinus, FiPlus } from "react-icons/fi";

interface QuantityProps {
  cart?: boolean;
  quantity: number | null;
  setQuantity: (quantity: number) => void;
}

const Quantity = ({ cart, quantity, setQuantity }: QuantityProps) => {
  const handleDecrement = () => {
    if (quantity && quantity > 1) {
      setQuantity && setQuantity(quantity - 1);
    }
  };

  const handleIncrement = () => {
    quantity && setQuantity(quantity + 1);
  };

  return (
    <div>
      {!cart && <span className="text-lg font-semibold">Quantity :</span>}
      <div className="flex items-center gap-4 my-2">
        <div
          className="flex items-center justify-center w-6 h-6 border-2 border-black rounded-md cursor-pointer"
          onClick={() =>
            quantity && setQuantity && setQuantity(Math.max(1, quantity - 1))
          }
        >
          <FiMinus size={16} color="black" onClick={handleDecrement} />
        </div>
        <span className="font-semibold">{quantity}</span>
        <div
          className="flex items-center justify-center w-6 h-6 border-2 border-black rounded-md cursor-pointer"
          onClick={() => quantity && setQuantity && setQuantity(quantity + 1)}
        >
          <FiPlus size={16} color="black" onClick={handleIncrement} />
        </div>
      </div>
    </div>
  );
};

export default Quantity;

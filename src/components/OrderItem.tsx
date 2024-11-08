import { CartProductProps } from "@/hooks/useCart";
import Image from "next/image";

interface OrderItemProps {
  cartProduct: CartProductProps;
}

const OrderItem = ({ cartProduct }: OrderItemProps) => {
  const itemPrice = (cartProduct.price || 0) * (cartProduct.quantity || 0);

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex justify-between">
        <div className="flex gap-x-4">
          <div className="w-24 h-24 bg-zinc-200 p-2 rounded-md flex items-center justify-center">
            <div className="w-20 h-20 relative">
              <Image
                src={`${cartProduct.image}`}
                fill
                alt={`${cartProduct.name}`}
                className="absolute object-contain"
              />
            </div>
          </div>
          <div className="flex flex-col gap-y-2">
            <span className="font-medium">{cartProduct.name}</span>
            <div
              style={{ backgroundColor: `${cartProduct.color}` }}
              className="w-4 h-4 rounded-full"
            />
            <span className="text-sm font-medium">x{cartProduct.quantity}</span>
          </div>
        </div>
        <span className="font-semibold">${itemPrice.toFixed(2)}</span>
      </div>
      <hr className="w-full h-px" />
    </div>
  );
};

export default OrderItem;

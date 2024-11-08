import { CartProductProps, useCartStore } from "@/hooks/useCart";
import Image from "next/image";
import { FiHeart } from "react-icons/fi";
import { MdOutlineDelete } from "react-icons/md";
import Quantity from "../Quantity";
import { useToggleWishlist } from "@/hooks/useToggleWishlist";
import { RiHeart3Fill, RiHeart3Line } from "react-icons/ri";

const CartProduct = ({ cartProduct }: { cartProduct: CartProductProps }) => {
  const { removeFromCart, updateQuantity } = useCartStore((state) => state);
  const { toggleProduct, wishlist } = useToggleWishlist();
  const isInWishlist = wishlist.includes(cartProduct.id!);

  if (!cartProduct) return null;
  const { id, image, name, price, size, color, quantity } = cartProduct;

  const handleQuantityChange = (newQuantity: number) => {
    updateQuantity(id, newQuantity, size, color);
  };

  const totalPrice = (price || 0) * (quantity || 0);

  return (
    <div className="flex flex-col md:flex-row gap-4 my-4 p-4 bg-white shadow-md rounded-lg">
      {/* Image Section */}
      <div className="w-full md:w-1/3 h-[300px] md:h-[250px] relative rounded-md overflow-hidden flex items-center justify-center">
        <Image
          src={image as string}
          layout="fill"
          objectFit="contain"
          alt={name as string}
          className="absolute"
        />
      </div>

      {/* Details Section */}
      <div className="flex-1 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg md:text-xl font-semibold">{name}</h3>
          <span className="text-lg md:text-xl font-semibold">
            ${totalPrice.toFixed(2)}
          </span>
        </div>
        <div className="text-sm text-zinc-500">
          <div className="flex items-center gap-1">
            <span>Variant:</span>
            <span>Fabricated</span>
          </div>
          <div className="flex items-center gap-1">
            <span>Size:</span>
            <span>{size}</span>
          </div>
          <div className="flex items-center gap-1">
            <span>Color:</span>
            <div
              className="w-5 h-5 rounded-full ml-1"
              style={{ backgroundColor: color as string }}
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <div
              onClick={() => toggleProduct(cartProduct.id!)}
              className="flex items-center justify-center w-10 h-10 rounded-full border-2 cursor-pointer"
            >
              {isInWishlist ? (
                <RiHeart3Fill size={20} color="red" />
              ) : (
                <RiHeart3Line size={20} color="gray" />
              )}
            </div>
            <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 cursor-pointer">
              <MdOutlineDelete
                size={22}
                color="red"
                onClick={() => removeFromCart(id, size, color)}
              />
            </div>
          </div>
          <Quantity
            cart={true}
            quantity={quantity}
            setQuantity={handleQuantityChange}
          />
        </div>
      </div>
    </div>
  );
};

export default CartProduct;

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartProductProps {
  id: string | undefined;
  name: string | null;
  image: string | null;
  size: string | null;
  color: string | null;
  quantity: number | null;
  price: number | null;
}

interface UseCartStoreProps {
  cartProducts: CartProductProps[];
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  addToCart: (product: CartProductProps) => void;
  removeFromCart: (
    productId: string | undefined,
    size: string | null,
    color: string | null
  ) => void;
  clearCart: () => void;
  updateQuantity: (
    productId: string | undefined,
    quantity: number,
    size: string | null,
    color: string | null
  ) => void;
}

export const useCartStore = create<UseCartStoreProps>()(
  persist(
    (set) => ({
      cartProducts: [],
      isLoading: true,

      setIsLoading: (loading) => set({ isLoading: loading }),

      addToCart: (product) => {
        set((state) => {
          const existingProduct = state.cartProducts.find(
            (item) =>
              item.id === product.id &&
              item.size === product.size &&
              item.color === product.color
          );

          if (existingProduct) {
            return {
              cartProducts: state.cartProducts.map((item) =>
                item.id === product.id &&
                item.size === product.size &&
                item.color === product.color
                  ? {
                      ...item,
                      quantity: (item.quantity || 0) + (product.quantity || 0),
                    }
                  : item
              ),
            };
          }

          return {
            cartProducts: [...state.cartProducts, product],
          };
        });
      },

      removeFromCart: (productId, size, color) =>
        set((state) => ({
          cartProducts: state.cartProducts.filter(
            (item) =>
              item.id !== productId ||
              item.size !== size ||
              item.color !== color
          ),
        })),

      clearCart: () => set({ cartProducts: [] }),

      updateQuantity: (productId, quantity, size, color) =>
        set((state) => ({
          cartProducts: state.cartProducts.map((product) =>
            product.id === productId &&
            product.size === size &&
            product.color === color
              ? { ...product, quantity: quantity }
              : product
          ),
        })),
    }),
    {
      name: "cart-products",
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.setIsLoading(false);
        }
      },
    }
  )
);

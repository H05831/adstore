import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UseWishlistStoreProps {
  wishlist: string[];
  addAndRemoveFromWishlist: (productId: string) => void;
}

export const useWishlistStore = create<UseWishlistStoreProps>()(
  persist(
    (set) => ({
      wishlist: [],

      addAndRemoveFromWishlist: (productId: string) => {
        set((state) => {
          const updatedWishlist = state.wishlist.includes(productId)
            ? state.wishlist.filter((id) => id !== productId)
            : [...state.wishlist, productId];
          return { wishlist: updatedWishlist };
        });
      },
    }),
    {
      name: "wishlist",
    }
  )
);

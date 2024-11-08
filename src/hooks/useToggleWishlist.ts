// hooks/useToggleWishlist.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createWishlist } from "@/actions/users";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { useCallback } from "react";
import { useWishlistStore } from "@/hooks/useWishlist";

export const useToggleWishlist = () => {
  const { data } = useSession();
  const queryClient = useQueryClient();
  const { addAndRemoveFromWishlist, wishlist } = useWishlistStore();

  const { mutateAsync } = useMutation({
    mutationFn: async ({
      productId,
      userId,
    }: {
      productId: string | undefined;
      userId: string | undefined;
    }) => await createWishlist({ productId, userId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
    },
    onError: (error) => {
      toast.error(`Failed to update wishlist: ${error.message}`);
    },
  });

  const toggleProduct = useCallback(
    async (productId: string) => {
      const userId = data?.user.id;
      if (!userId) {
        toast.error("You must be logged in to modify your wishlist.");
        return;
      }

      const isInWishlist = wishlist.includes(productId);
      const actionMessage = isInWishlist
        ? "Removed from wishlist"
        : "Added to wishlist";

      await mutateAsync({ productId, userId });
      addAndRemoveFromWishlist(productId);

      toast.success(actionMessage);
    },
    [data?.user.id, mutateAsync, wishlist, addAndRemoveFromWishlist]
  );

  return { toggleProduct, wishlist };
};

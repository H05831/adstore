import type { BillingAddress, ShippingAddress } from "@prisma/client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AddressStoreProps {
  shippingAddress: ShippingAddress | null;
  billingAddress: BillingAddress | null;
  setShippingAddress: (shippingAddress: ShippingAddress) => void;
  setBillingAddress: (billingAddress: BillingAddress) => void;
  sameAsShippingAddress: boolean;
  setSameAsShippingAddress: (sameAsShippingAddress: boolean) => void;
  shippingMethod: string | null;
  setShippingMethod: (shippingMethod: string | null) => void;
}

export const useAddressStore = create<AddressStoreProps>()(
  persist(
    (set) => ({
      shippingAddress: null,
      billingAddress: null,
      shippingMethod: null,
      sameAsShippingAddress: false,
      setShippingAddress: (shippingAddress: ShippingAddress) =>
        set({ shippingAddress }),
      setBillingAddress: (billingAddress: BillingAddress) =>
        set({ billingAddress }),
      setSameAsShippingAddress: (sameAsShippingAddress: boolean) =>
        set({ sameAsShippingAddress }),
      setShippingMethod: (shippingMethod: string | null) =>
        set({ shippingMethod }),
    }),

    { name: "address" }
  )
);

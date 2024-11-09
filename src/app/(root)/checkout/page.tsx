"use client";

import { fetchShippingAddress } from "@/actions/order";
import Breadcrumb from "@/components/Breadcrumb";
import CheckoutAndPaymentForm from "@/components/checkout/CheckoutAndPaymentForm";
import Method from "@/components/checkout/Method";
import OrderDetails from "@/components/OrderDetails";
import AddressComponent from "@/components/AddressComponent";
import AddressSkeleton from "@/components/skeletons/AddressSkeleton";
import type { ShippingAddress } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useCallback, useMemo, useState } from "react";
import { BsPlus } from "react-icons/bs";
import { useAddressStore } from "@/hooks/useAddress";

const CheckoutPage = () => {
  const [showCheckoutForm, setShowCheckoutForm] = useState<boolean>(false);
  const [actionType, setActionType] = useState<string>("add-shipping-address");
  const [defaultAddress, setDefaultAddress] = useState<ShippingAddress | null>(
    null
  );
  const [shippingAddressId, setShippingAddressId] = useState<
    string | undefined
  >("");

  const { setShippingMethod, shippingMethod } = useAddressStore(
    (state) => state
  );

  const handleShipping = useCallback(
    (shippingMethod: string) => {
      setShippingMethod(shippingMethod);
    },
    [setShippingMethod]
  );

  const { data: session } = useSession();

  const handleShowCheckoutForm = useCallback(
    (address: ShippingAddress | null) => {
      setShowCheckoutForm(true);
      setActionType("add-shipping-address");
      setDefaultAddress(address);
      setShippingAddressId(address?.id);
    },
    []
  );

  const {
    data: shippingAddress,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["shipping-address"],
    queryFn: async () =>
      await fetchShippingAddress({ userId: session?.user.id }),
    enabled: !!session?.user.id,
  });

  const shippingMethods = useMemo(
    () => [
      { type: "Free shipping", time: "7-9 business days", price: "0" },
      { type: "Regular shipping", time: "3-5 business days", price: "7.50" },
      {
        type: "Express shipping (Recommended)",
        time: "1-2 business days",
        price: "14",
      },
    ],
    []
  );

  return (
    <div className="flex flex-col gap-y-8 px-6 md:px-12 lg:px-20 pt-6 pb-12 bg-gray-50">
      <Breadcrumb />

      <div className="flex flex-col lg:flex-row gap-x-6 lg:gap-x-8">
        {/* Left Section: Addresses & Shipping Method */}
        <section className="w-full lg:w-[60%] h-full flex flex-col gap-y-6 bg-white shadow-md rounded-lg p-6">
          {isLoading ? (
            <div className="flex flex-col gap-y-4">
              <AddressSkeleton />
              <AddressSkeleton />
              <AddressSkeleton />
            </div>
          ) : isError ? (
            <div className="text-red-500">Error loading shipping address.</div>
          ) : showCheckoutForm || !shippingAddress?.length ? (
            <CheckoutAndPaymentForm
              formType="checkout-form"
              actionType={actionType}
              handleShowCheckoutForm={() => setShowCheckoutForm(false)}
              defaultAddress={defaultAddress}
              addressId={shippingAddressId}
            />
          ) : (
            <div className="flex flex-col gap-y-6">
              {shippingAddress.map((address) => (
                <AddressComponent
                  key={address.id}
                  address={address}
                  handleShowCheckoutForm={() => handleShowCheckoutForm(address)}
                  setActionType={setActionType}
                  addressType="shipping-address"
                />
              ))}
            </div>
          )}

          {/* Add New Address Button */}
          {!showCheckoutForm && (
            <div
              className="border border-gray-300 bg-white px-6 py-3 rounded-md w-fit flex items-center gap-x-3 cursor-pointer hover:bg-gray-100 transition"
              onClick={() => handleShowCheckoutForm(null)}
            >
              <button className="text-sm font-medium text-gray-800">
                Add New Address
              </button>
              <BsPlus size={24} className="text-gray-600" />
            </div>
          )}

          {/* Shipping Method Section */}
          <div className="w-full border-t border-gray-300 pt-6 mt-6">
            <h4 className="font-semibold text-xl text-gray-800 mb-4">
              Shipping Method
            </h4>
            <div className="flex flex-col gap-y-4">
              {shippingMethods.map((method) => (
                <Method
                  key={method.type}
                  shippingType={method.type}
                  shippingTime={method.time}
                  shippingPrice={method.price}
                  shippingMethod={shippingMethod}
                  onHandleShipping={handleShipping}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Right Section: Order Details */}
        <section className="w-full lg:w-[40%] h-full bg-white shadow-md rounded-lg p-6">
          <OrderDetails />
        </section>
      </div>
    </div>
  );
};

export default CheckoutPage;

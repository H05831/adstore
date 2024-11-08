"use client";

import { fetchBillingAllBillingAddress } from "@/actions/order";
import AddressComponent from "@/components/AddressComponent";
import Breadcrumb from "@/components/Breadcrumb";
import CheckoutAndPaymentForm from "@/components/checkout/CheckoutAndPaymentForm";
import OrderDetails from "@/components/OrderDetails";
import PaymentMethod from "@/components/payment/PaymentMethod";
import AddressSkeleton from "@/components/skeletons/AddressSkeleton";
import { useAddressStore } from "@/hooks/useAddress";
import { BillingAddress } from "@prisma/client";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { TiTick } from "react-icons/ti";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

const PaymentPage = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState("Credit card");
  const [rememberMyInformation, setRememberMyInformation] =
    useState<boolean>(false);
  const [defaultBillingAddress, setDefaultBillingAddress] =
    useState<BillingAddress | null>(null);
  const [showCheckoutForm, setShowCheckoutForm] = useState<boolean>(false);
  const [actionType, setActionType] = useState<string>("add-billing-address");
  const [billingAddressId, setBillingAddressId] = useState<string | undefined>(
    ""
  );

  const handlePaymentMethod = (paymentMethod: string) => {
    setSelectedPaymentMethod(paymentMethod);
  };

  const { data: session } = useSession();
  const { sameAsShippingAddress, setSameAsShippingAddress } = useAddressStore(
    (state) => state
  );

  const {
    data: billingAddresses,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["billing-address"],
    queryFn: async () => await fetchBillingAllBillingAddress(session?.user.id),
  });

  const handleShowCheckoutForm = (address: BillingAddress) => {
    setShowCheckoutForm(true);
    setActionType("update-billing-address");
    setDefaultBillingAddress(address);
    setBillingAddressId(address.id);
  };

  const handleAddressToggle = () => {
    setSameAsShippingAddress(!sameAsShippingAddress);
    setActionType("add-billing-address");
  };

  return (
    <div className="flex flex-col gap-y-6 px-4 md:px-8 lg:px-20 pt-4 pb-10 bg-gray-50">
      <Breadcrumb />

      <div className="flex flex-col lg:flex-row gap-y-6 lg:gap-x-8">
        <section className="w-full lg:w-[60%] flex flex-col gap-y-6">
          {/* Payment Method Selection */}
          <div className="w-full border rounded-lg p-6 shadow-md bg-white flex flex-col gap-y-4">
            <h4 className="font-semibold text-gray-700">
              Select payment method
            </h4>
            <Elements stripe={stripePromise}>
              <div className="flex flex-col gap-y-3">
                <PaymentMethod
                  methodName="Credit card"
                  selectedPaymentMethod={selectedPaymentMethod}
                  handleSelectPaymentMethod={handlePaymentMethod}
                />
                <PaymentMethod
                  methodName="Paypal"
                  selectedPaymentMethod={selectedPaymentMethod}
                  handleSelectPaymentMethod={handlePaymentMethod}
                />
                <PaymentMethod
                  methodName="Netseller"
                  selectedPaymentMethod={selectedPaymentMethod}
                  handleSelectPaymentMethod={handlePaymentMethod}
                />
              </div>
            </Elements>
          </div>

          {/* Address Toggle */}
          <div className="flex items-center gap-x-3 ml-5">
            <div
              className="w-5 h-5 border-2 border-gray-700 rounded-sm cursor-pointer flex items-center justify-center transition-all duration-150"
              onClick={handleAddressToggle}
            >
              {sameAsShippingAddress && <TiTick className="text-gray-700" />}
            </div>
            <span className="font-medium text-gray-700">
              Same as my shipping address
            </span>
          </div>

          {/* Checkout Form */}
          {!sameAsShippingAddress && (
            <CheckoutAndPaymentForm
              formType="payment-form"
              handleShowCheckoutForm={handleAddressToggle}
              actionType={actionType}
            />
          )}

          {/* Billing Address */}
          {isLoading ? (
            <div className="flex flex-col gap-y-3">
              <AddressSkeleton />
              <AddressSkeleton />
              <AddressSkeleton />
            </div>
          ) : isError ? (
            <div className="text-red-500">Error loading billing address.</div>
          ) : showCheckoutForm || !billingAddresses?.length ? (
            <CheckoutAndPaymentForm
              formType="payment-form"
              defaultAddress={defaultBillingAddress}
              handleShowCheckoutForm={() => setShowCheckoutForm(false)}
              actionType={actionType}
              addressId={billingAddressId}
            />
          ) : (
            <div className="flex flex-col gap-y-4">
              {billingAddresses?.map((billingAddress) => (
                <AddressComponent
                  addressType="billing-address"
                  setActionType={setActionType}
                  address={billingAddress}
                  key={billingAddress.id}
                  handleShowCheckoutForm={() =>
                    handleShowCheckoutForm(billingAddress)
                  }
                />
              ))}
            </div>
          )}

          {/* Remember Information */}
          <div className="border rounded-lg flex flex-col gap-y-4 px-5 py-4 shadow-md bg-white">
            <h4 className="font-semibold text-gray-700">
              Remember my information
            </h4>
            <div className="flex items-center gap-x-3 ml-5">
              <div
                className="w-5 h-5 border-2 border-gray-700 rounded-sm cursor-pointer flex items-center justify-center transition-all duration-150"
                onClick={() => setRememberMyInformation((prev) => !prev)}
              >
                {rememberMyInformation && <TiTick className="text-gray-700" />}
              </div>
              <span className="font-medium text-gray-600">
                Save my information for future checkout
              </span>
            </div>
          </div>
        </section>

        {/* Order Details */}
        <section className="w-full lg:w-[40%] bg-white p-6 shadow-md rounded-lg">
          <OrderDetails />
        </section>
      </div>
    </div>
  );
};

export default PaymentPage;

"use client";

import { useAddressStore } from "@/hooks/useAddress";
import { useCartStore } from "@/hooks/useCart";
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";
import CardCvcField from "./CardCvcField";
import CardExpiryField from "./CardExpiryField";
import CardNumberField from "./CardNumberField";

interface PaymentMethodProps {
  methodName: string;
  selectedPaymentMethod: string;
  handleSelectPaymentMethod: (method: string) => void;
}

const PaymentMethod = ({
  methodName,
  selectedPaymentMethod,
  handleSelectPaymentMethod,
}: PaymentMethodProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [cardholderName, setCardHolderName] = useState<string>("");
  const [orderId, setOrderId] = useState<string | null>(null);

  const { cartProducts } = useCartStore((state) => state);
  const {
    sameAsShippingAddress,
    billingAddress,
    shippingAddress,
    shippingMethod,
  } = useAddressStore((state) => state);

  const shippingAddressId = shippingAddress?.id;
  const billingAddressId = billingAddress?.id;

  const router = useRouter();

  const handlePayment = async () => {
    if (!stripe || !elements) return;

    const cardNumberElement = elements.getElement(CardNumberElement);
    if (!cardNumberElement) {
      throw new Error("Complete the card details.");
    }

    try {
      const res = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cartProducts,
          shippingAddressId,
          shippingMethod,
          billingAddressId,
          sameAsShippingAddress,
        }),
      });

      const { clientSecret, orderId: newOrderId } = await res.json();
      setOrderId(newOrderId);

      const { error: stripeError, paymentIntent } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: cardNumberElement,
            billing_details: {
              name: cardholderName,
            },
          },
        });

      if (stripeError) {
        throw new Error(
          stripeError.message || "Payment failed. Please try again."
        );
      }

      if (paymentIntent && paymentIntent.status !== "succeeded") {
        throw new Error("Payment did not succeed. Please try again.");
      }
    } catch (error) {
      throw error;
    }
  };

  const { mutate: paymentCreation, isPending } = useMutation({
    mutationFn: async () => handlePayment(),
    onSuccess: () => {
      toast.success("Payment successful.");
      if (orderId) {
        router.push(`/thank-you?orderId=${orderId}`);
      }
    },
    onError: (error: any) => {
      console.error("Payment error:", error);
      toast.error("Payment failed. Please try again.");
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    paymentCreation();
  };

  const Loader = () => (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-400 bg-opacity-50 z-50">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 border-4 border-t-transparent border-black border-solid rounded-full animate-spin"></div>
        <div className="mt-4 text-white text-lg font-medium">Processing...</div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col">
      {isPending && <Loader />}
      <div
        className={`border p-4 cursor-pointer transition-all duration-150 ${
          methodName === selectedPaymentMethod
            ? "rounded-t-md bg-gray-100 shadow-md"
            : "rounded-md hover:bg-gray-50"
        }`}
        onClick={() => handleSelectPaymentMethod(methodName)}
      >
        <div className="flex items-center gap-x-3">
          <div className="w-4 h-4 ring-1 ring-gray-300 rounded-full flex items-center justify-center">
            {methodName === selectedPaymentMethod && (
              <div className="w-2.5 h-2.5 bg-black rounded-full" />
            )}
          </div>
          <span className="font-semibold text-gray-700">{methodName}</span>
        </div>
      </div>
      {methodName === selectedPaymentMethod && (
        <form
          onSubmit={handleSubmit}
          className="border-t-0 rounded-b-md bg-white shadow-lg p-6 flex flex-col gap-y-4 transition-all duration-150 ease-in-out"
        >
          <CardNumberField />
          <input
            type="text"
            placeholder="Card holder name"
            className="border w-full h-10 rounded-md px-4 placeholder:text-sm placeholder:text-gray-500 bg-gray-50 focus:ring-2 focus:ring-gray-400 focus:border-gray-400 transition"
            onChange={(e) => setCardHolderName(e.target.value)}
          />
          <div className="flex items-center gap-x-4">
            <CardExpiryField />
            <CardCvcField />
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white py-2 px-6 rounded-md my-2 font-semibold hover:bg-gray-800 transition duration-150 ease-in-out"
          >
            {isPending ? "Processing..." : "Pay"}
          </button>
        </form>
      )}
    </div>
  );
};

export default PaymentMethod;

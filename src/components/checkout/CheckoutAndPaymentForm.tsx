import {
  createbilllingAddress,
  createShippingAddress,
  ShippingAddressProps,
  updateBillingAddress,
  updateShippingAddress,
} from "@/actions/order";
import { checkoutAndPaymentSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { RiCloseLine, RiLoader4Fill } from "react-icons/ri";
import { toast } from "sonner";
import { z } from "zod";
import CountryDropdown from "./CountryDropdown";
import CheckoutFormField from "./checkoutFormField";

interface CheckoutAndPaymentFormProps {
  formType?: "checkout-form" | "payment-form";
  handleShowCheckoutForm?: () => void;
  defaultAddress?: ShippingAddressProps | null;
  actionType?: string;
  addressId?: string | undefined;
}

const CheckoutAndPaymentForm = ({
  formType,
  handleShowCheckoutForm,
  defaultAddress,
  actionType,
  addressId,
}: CheckoutAndPaymentFormProps) => {
  const [selectedCountry, setSelectedCountry] = useState<string>(
    defaultAddress?.shippingCountry || ""
  );
  const [open, setOpen] = useState<boolean>(false);

  const queryClient = useQueryClient();
  const { data: session } = useSession();

  const form = useForm<z.infer<typeof checkoutAndPaymentSchema>>({
    resolver: zodResolver(checkoutAndPaymentSchema),
    defaultValues: defaultAddress || {},
  });

  const {
    handleSubmit,
    formState: { errors },
  } = form;

  const handleSelectCountry = (value: string) => {
    setSelectedCountry(value);
    setOpen(false);
  };

  const { mutate: createShippingOrBillingAddress, isPending } = useMutation({
    mutationFn: async (data: ShippingAddressProps) => {
      if (formType === "checkout-form") {
        return actionType === "add-shipping-address"
          ? await createShippingAddress(data)
          : await updateShippingAddress({ addressId, data });
      } else {
        return actionType === "add-billing-address"
          ? await createbilllingAddress(data)
          : await updateBillingAddress({ addressId, data });
      }
    },
    onSuccess: () => {
      const successMessage =
        formType === "checkout-form"
          ? actionType === "add-shipping-address"
            ? "Shipping address added successfully."
            : "Shipping address updated successfully."
          : actionType === "add-billing-address"
          ? "Billing address added successfully."
          : "Billing address updated successfully.";

      toast.success(successMessage);
      queryClient.invalidateQueries({ queryKey: ["shipping-address"] });
      queryClient.invalidateQueries({ queryKey: ["billing-address"] });
      handleShowCheckoutForm?.();
      form.reset();
    },
    onError: (error) => {
      toast.error(
        `Failed to ${
          actionType?.includes("add") ? "add" : "update"
        } the address: ${
          error instanceof Error ? error.message : "An error occurred"
        }`
      );
    },
  });

  const onSubmit = (values: z.infer<typeof checkoutAndPaymentSchema>) => {
    if (!selectedCountry) {
      toast.error("Please select a country.");
      return;
    }
    createShippingOrBillingAddress({
      ...values,
      shippingCountry: selectedCountry,
      userId: session?.user?.id || "",
    });
  };

  const buttonTitle = useMemo(() => {
    return actionType?.includes("add") ? "Add" : "Update" + " address";
  }, [actionType]);

  return (
    <div className="flex flex-col border w-full p-6 rounded-lg shadow-lg bg-white">
      <div className="flex flex-col gap-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-lg font-semibold text-gray-800">
            {formType === "checkout-form"
              ? "Shipping Address"
              : "Billing Address"}
          </h4>
          <button
            aria-label="close"
            className="rounded-full p-2 transition-transform transform hover:scale-105"
            onClick={handleShowCheckoutForm}
          >
            <RiCloseLine size={24} className="text-gray-500" />
          </button>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-y-5"
        >
          <CheckoutFormField
            type="text"
            name="fullName"
            label="Full name"
            placeholder="Enter your full name"
            form={form}
            error={errors.fullName}
          />
          <div className="flex gap-x-4">
            <CheckoutFormField
              type="email"
              name="emailAddress"
              label="Email address"
              placeholder="Enter your email"
              form={form}
              error={errors.emailAddress}
            />
            <CheckoutFormField
              type="email"
              name="confirmationEmail"
              label="Confirm email"
              placeholder="Confirm your email"
              form={form}
              error={errors.confirmationEmail}
            />
          </div>
          <CheckoutFormField
            type="number"
            name="phoneNumber"
            label="Phone number"
            placeholder="Enter your phone number"
            form={form}
            error={errors.phoneNumber}
          />
          <div className="flex gap-x-4">
            <CheckoutFormField
              type="text"
              name="streetName"
              label="Street name"
              placeholder="Street name"
              form={form}
              error={errors.streetName}
            />
            <CheckoutFormField
              type="number"
              name="houseNumber"
              label="House number"
              placeholder="House number"
              form={form}
              error={errors.houseNumber}
            />
          </div>
          <div className="flex gap-x-4">
            <CheckoutFormField
              type="text"
              name="city"
              label="City"
              placeholder="Enter your city"
              form={form}
              error={errors.city}
            />
            <CheckoutFormField
              type="number"
              name="postalCode"
              label="Postal code"
              placeholder="Enter postal code"
              form={form}
              error={errors.postalCode}
            />
          </div>
          <div className="flex flex-col">
            <label className="font-medium text-gray-700 mb-1">Country</label>
            <CountryDropdown
              selectedCountry={selectedCountry}
              onSelectCountry={handleSelectCountry}
              open={open}
              onOpen={() => setOpen(!open)}
            />
          </div>
          <button
            type="submit"
            className={`flex items-center justify-center gap-x-2 px-5 py-2 rounded-md font-medium text-white transition-all duration-300 ${
              isPending
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-black hover:bg-gray-800"
            }`}
            disabled={isPending}
          >
            {isPending ? (
              <RiLoader4Fill size={20} className="animate-spin" />
            ) : (
              buttonTitle
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutAndPaymentForm;

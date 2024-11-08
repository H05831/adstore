import { useAddressStore } from "@/hooks/useAddress";
import { ShippingAddress } from "@prisma/client";
import React, { useCallback, useMemo } from "react";
import { FaCheckCircle } from "react-icons/fa";

interface AddressProps {
  address: ShippingAddress;
  handleShowCheckoutForm?: (address: ShippingAddress) => void;
  setActionType: (actionType: string) => void;
  addressType: string;
}

const AddressComponent = ({
  address,
  handleShowCheckoutForm,
  setActionType,
  addressType,
}: AddressProps) => {
  const {
    fullName,
    phoneNumber,
    emailAddress,
    city,
    shippingCountry,
    houseNumber,
    streetName,
    postalCode,
  } = address;

  const {
    setShippingAddress,
    shippingAddress: selectedShippingAddress,
    billingAddress,
    setBillingAddress,
  } = useAddressStore((state) => state);

  const isSelected = useMemo(
    () =>
      addressType === "shipping-address"
        ? address.id === selectedShippingAddress?.id
        : address.id === billingAddress?.id,
    [selectedShippingAddress, address.id, billingAddress, addressType]
  );

  const handleSelectAddress = useCallback(() => {
    if (addressType === "shipping-address") {
      setShippingAddress(address);
    } else {
      setBillingAddress(address);
    }
  }, [address, setShippingAddress, setBillingAddress, addressType]);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      handleShowCheckoutForm && handleShowCheckoutForm(address);
      setActionType(
        addressType === "shipping-address"
          ? "update-shipping-address"
          : "update-billing-address"
      );
    },
    [handleShowCheckoutForm, setActionType, address, addressType]
  );

  return (
    <div
      className={`w-full border ${
        isSelected ? "border-black shadow-lg" : "border-gray-200"
      } rounded-lg px-6 py-5 flex flex-col gap-y-4 cursor-pointer hover:bg-gray-50 transition-all duration-200 ease-in-out`}
      onClick={handleSelectAddress}
    >
      <div className="flex items-start justify-between">
        <div className="flex gap-x-4">
          <div
            className={`${
              isSelected ? "text-green-500" : "text-gray-400"
            } flex items-center justify-center text-lg`}
          >
            {isSelected ? (
              <FaCheckCircle />
            ) : (
              <div className="w-4 h-4 border-2 rounded-full" />
            )}
          </div>
          <div className="flex flex-col gap-y-1">
            <span className="font-semibold text-lg text-gray-800">
              {fullName}
            </span>
            <p className="font-medium text-gray-500 text-sm">
              {houseNumber} {streetName}, {city} {postalCode}, {shippingCountry}
            </p>
            <span className="font-medium text-gray-500 text-sm">
              {phoneNumber}
            </span>
            <span className="font-medium text-gray-500 text-sm">
              {emailAddress}
            </span>
          </div>
        </div>
        <button
          className="bg-black text-white px-5 py-2 rounded-md hover:bg-gray-800 transition duration-150"
          onClick={handleClick}
        >
          Change
        </button>
      </div>
    </div>
  );
};

export default AddressComponent;

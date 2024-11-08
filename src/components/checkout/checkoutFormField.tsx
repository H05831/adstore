import { HTMLInputTypeAttribute } from "react";
import { FieldError, UseFormReturn } from "react-hook-form";

interface CheckoutFormFieldProps {
  label: string;
  type: HTMLInputTypeAttribute | undefined;
  placeholder: string;
  error: FieldError | undefined;
  name:
    | "fullName"
    | "emailAddress"
    | "confirmationEmail"
    | "phoneNumber"
    | "streetName"
    | "houseNumber"
    | "city"
    | "postalCode";
  form: UseFormReturn<
    {
      emailAddress: string;
      confirmationEmail: string;
      fullName: string;
      phoneNumber: string;
      streetName: string;
      houseNumber: string;
      city: string;
      postalCode: string;
    },
    any,
    undefined
  >;
}

const CheckoutFormField = ({
  label,
  type,
  placeholder,
  name,
  error,
  form: { register },
}: CheckoutFormFieldProps) => {
  return (
    <div className="flex flex-col gap-y-2 w-full">
      <label className="text-lg font-semibold text-gray-800">
        {label}
        <span className="text-red-500 ml-1">*</span>
      </label>
      <input
        type={type}
        {...register(name)}
        placeholder={placeholder}
        className={`placeholder:text-sm text-sm text-gray-700 font-medium border border-gray-300 rounded-md py-2 px-4  transition duration-300 ease-in-out ${
          error ? "border-red-500" : "hover:border-gray-400"
        }`}
      />
      {error && (
        <span className="text-sm text-red-500 mt-1">{error.message}</span>
      )}
    </div>
  );
};

export default CheckoutFormField;

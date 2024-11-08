import { CardElement } from "@stripe/react-stripe-js";

interface PaymentInputFieldProps {
  type: string;
  placeholder: string;
}

const PaymentInputField = ({ type, placeholder }: PaymentInputFieldProps) => {
  return (
    <CardElement
      options={{
        style: {
          base: {
            backgroundColor: "gray",
          },
        },
      }}
    />
  );
};

export default PaymentInputField;

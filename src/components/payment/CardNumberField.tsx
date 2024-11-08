import { CardNumberElement } from "@stripe/react-stripe-js";

const CardNumberField = () => {
  return (
    <CardNumberElement
      className="border w-full h-10 rounded-md px-4 py-3 placeholder:text-sm bg-gray-50"
      options={{
        style: {
          complete: {
            color: "#4CAF50",
          },
          empty: {
            color: "#FF9800",
          },
          invalid: {
            color: "#D32F2F",
          },
        },
      }}
    />
  );
};

export default CardNumberField;

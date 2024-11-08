import { CardExpiryElement } from "@stripe/react-stripe-js";

const CardExpiryField = () => {
  return (
    <CardExpiryElement
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

export default CardExpiryField;

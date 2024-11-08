interface ShippingMethodProps {
  shippingType: string;
  shippingTime: string;
  shippingPrice: string;
  shippingMethod: string | null;
  onHandleShipping: (shipping: string) => void;
}

const Method = ({
  shippingType,
  shippingTime,
  shippingPrice,
  shippingMethod,
  onHandleShipping,
}: ShippingMethodProps) => {
  return (
    <div
      className="w-full h-20 border rounded-lg px-4 py-3 flex items-center justify-between cursor-pointer hover:bg-gray-100 transition-colors"
      onClick={() => onHandleShipping(shippingType)}
    >
      <div className="flex gap-x-4 items-center">
        {/* Shipping Method Indicator */}
        <div
          className={`ring-2 ${
            shippingMethod === shippingType ? "ring-green-500" : "ring-gray-300"
          } w-5 h-5 rounded-full flex items-center justify-center transition-colors`}
        >
          {shippingMethod === shippingType && (
            <div className="bg-green-500 w-2.5 h-2.5 rounded-full transition-all" />
          )}
        </div>

        {/* Shipping Info */}
        <div className="flex flex-col gap-y-1">
          <span className="text-lg font-semibold text-gray-900">
            {shippingType}
          </span>
          <p className="text-sm text-gray-500 font-medium">{shippingTime}</p>
        </div>
      </div>

      {/* Shipping Price */}
      <span className="text-lg font-semibold text-gray-900">
        ${shippingPrice}
      </span>
    </div>
  );
};

export default Method;

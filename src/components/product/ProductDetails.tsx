import React from "react";
import Heading from "../Heading";
import Description from "../Description";

const ProductDetails = () => {
  return (
    <div className="p-4 md:p-6 lg:p-8">
      <Heading title="Product Details" start />
      <div className="space-y-6 my-8">
        <DetailRow label="Material" description="cotton/polyester blend" />
        <DetailRow
          label="Shipping"
          description="Standard shipping arrives in 4 to 6 days with one business day for processing."
        />
        <DetailRow
          label="Return"
          description="Return accepted within 30 days of delivery"
        />
        <DetailRow label="Info" description="Soft interior" />
      </div>
    </div>
  );
};

const DetailRow = ({
  label,
  description,
}: {
  label: string;
  description: string;
}) => (
  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
    <span className="text-base md:text-lg font-semibold w-32">{label}:</span>
    <Description description={description} className="text-base md:text-lg" />
  </div>
);

export default ProductDetails;

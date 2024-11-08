import { ProductInputFieldProps } from "./ProducrtNameField";

const ProductPriceField = ({ form }: ProductInputFieldProps) => {
  const {
    formState: { errors },
  } = form;

  return (
    <>
      <div className="flex flex-col gap-2">
        <span className="text-md font-semibold">Price: </span>
        <input
          {...form.register("price")}
          type="number"
          placeholder="Price"
          className="outline-none text-sm border-2 h-12 pl-3"
        />
      </div>
      {errors.price && (
        <p className="text-red-600 text-sm -my-2">{errors.price.message}</p>
      )}
    </>
  );
};

export default ProductPriceField;

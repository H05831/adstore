import { ProductInputFieldProps } from "./ProducrtNameField";

const ProductDescriptionField = ({ form }: ProductInputFieldProps) => {
  const {
    formState: { errors },
  } = form;

  return (
    <>
      <div className="flex flex-col gap-2">
        <span className="text-md font-semibold">Description: </span>
        <input
          {...form.register("description")}
          type="text"
          placeholder="Description"
          className="outline-none text-sm border-2 h-12 pl-3"
        />
      </div>
      {errors.description && (
        <p className="text-red-600 text-sm -my-2">
          {errors.description.message}
        </p>
      )}
    </>
  );
};

export default ProductDescriptionField;

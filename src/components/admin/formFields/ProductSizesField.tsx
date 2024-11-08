import { Controller, useFieldArray } from "react-hook-form";
import { RxCross2 } from "react-icons/rx";
import { ProductInputFieldProps } from "./ProducrtNameField";

const ProductSizesField = ({
  form: {
    control,
    formState: { errors },
  },
}: ProductInputFieldProps) => {
  const {
    append: appendSize,
    fields: sizeFields,
    remove: removeSize,
  } = useFieldArray({
    control,
    name: "sizes",
  });

  return (
    <div className="flex flex-col gap-2">
      <span className="text-md font-semibold">Sizes: </span>
      {sizeFields.map((field, index) => (
        <div key={field.id} className="flex items-center justify-between">
          <Controller
            control={control}
            name={`sizes.${index}.size`}
            render={({ field }) => (
              <input
                {...field}
                className="outline-none text-sm border-2 h-12 pl-3"
                placeholder="Sizes"
              />
            )}
          />

          <button
            type="button"
            onClick={() => removeSize(index)}
            className="text-sm px-7 py-2 rounded-md flex items-center gap-x-1"
          >
            Remove size
            <RxCross2 />
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={() => appendSize({ size: "" })}
        className="text-sm bg-zinc-950 text-white px-7 py-2"
      >
        Add size
      </button>

      {errors.sizes && (
        <p className="text-red-600 text-sm -my-2">{errors.sizes.message}</p>
      )}
    </div>
  );
};

export default ProductSizesField;

import { Controller, useFieldArray } from "react-hook-form";
import { RxCross2 } from "react-icons/rx";
import { ProductInputFieldProps } from "./ProducrtNameField";

const ProductColorsField = ({
  form: {
    control,
    formState: { errors },
  },
}: ProductInputFieldProps) => {
  const {
    append: appendColor,
    fields: colorFields,
    remove: removeColor,
  } = useFieldArray({
    control,
    name: "colors",
  });

  return (
    <div className="flex flex-col gap-2">
      <span className="text-md font-semibold">Colors: </span>
      {colorFields.map((field, index) => (
        <div key={field.id} className="flex items-center justify-between">
          <Controller
            control={control}
            name={`colors.${index}.color`}
            render={({ field }) => (
              <input
                {...field}
                className="outline-none text-sm border-2 h-12 pl-3"
                placeholder="Colors"
              />
            )}
          />

          <button
            type="button"
            onClick={() => removeColor(index)}
            className="text-sm px-7 py-2 rounded-md flex items-center gap-x-1"
          >
            Remove color
            <RxCross2 />
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={() => appendColor({ color: "" })}
        className="text-sm bg-zinc-950 text-white px-7 py-2"
      >
        Add color
      </button>
      {errors.colors && (
        <p className="text-red-600 text-sm -my-2">{errors.colors.message}</p>
      )}
    </div>
  );
};

export default ProductColorsField;

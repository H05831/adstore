import { UseFormReturn } from "react-hook-form";

export interface ProductInputFieldProps {
  form: UseFormReturn<
    {
      description: string | null;
      name: string | null;
      price: number | null;
      category: "WOMEN" | "MEN" | "CHILDREN" | null;
      sizes: [
        {
          size: string;
        },
        ...{
          size: string;
        }[]
      ];
      colors: [
        {
          color: string;
        },
        ...{
          color: string;
        }[]
      ];
    },
    any,
    undefined
  >;
}

const ProductNameField = ({ form }: ProductInputFieldProps) => {
  const {
    formState: { errors },
  } = form;

  return (
    <>
      <div className="flex flex-col gap-2">
        <span className="text-md font-semibold">Name: </span>
        <input
          {...form.register("name")}
          type="text"
          placeholder="Name"
          className="outline-none text-sm border-2 h-12 pl-3"
        />
      </div>
      {errors.name && (
        <p className="text-red-600 text-sm -my-2">{errors.name.message}</p>
      )}
    </>
  );
};

export default ProductNameField;

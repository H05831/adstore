import type { Category } from "@prisma/client";
import { useState } from "react";
import { Controller } from "react-hook-form";
import { BiChevronDown } from "react-icons/bi";
import { ProductInputFieldProps } from "./ProducrtNameField";

const CATEGORIES: Category[] = ["WOMEN", "MEN", "CHILDREN"];

const ProductCategoriesField = ({
  form: { control },
}: ProductInputFieldProps) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className="flex gap-x-4">
      <span className="text-sm font-semibold">Category:</span>
      <Controller
        control={control}
        name="category"
        render={({ field }) => (
          <div className="flex flex-col justify-center items-center -mt-1">
            <div
              className="text-sm font-semibold border w-fit border-gray-300 px-4 py-1.5 rounded-md flex items-center gap-x-1 cursor-pointer"
              onClick={() => setOpen((prev) => !prev)}
            >
              {field.value}
              <BiChevronDown
                size={18}
                className={
                  open ? "rotate-180 transition-all" : "rotate-0 transition-all"
                }
              />
            </div>
            {open && (
              <div className="border bg-white flex flex-col gap-y-1.5 rounded-md w-fit px-2.5 py-2 mt-2">
                {CATEGORIES.map((cat) => (
                  <span
                    key={cat}
                    className={`text-sm font-semibold px-4 py-2 cursor-pointer hover:bg-gray-100 rounded-md ${
                      cat === field.value && "bg-gray-200"
                    }`}
                    onClick={() => {
                      field.onChange(cat);
                      setOpen(false);
                    }}
                  >
                    {cat}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}
      />
    </div>
  );
};

export default ProductCategoriesField;

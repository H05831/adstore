import { useForm } from "react-hook-form";

import {
  addProduct,
  AddProductProps,
  fetchSingleProduct,
  updateProduct,
  updateProductProps,
} from "@/actions/products";
import { productSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect } from "react";
import { RiLoader4Fill } from "react-icons/ri";
import { toast } from "sonner";
import { z } from "zod";
import ProductNameField from "./formFields/ProducrtNameField";
import ProductCategoriesField from "./formFields/ProductCategoriesField";
import ProductColorsField from "./formFields/ProductColorsField";
import ProductDescriptionField from "./formFields/ProductDescriptionField";
import ProductPriceField from "./formFields/ProductPriceField";
import ProductSizesField from "./formFields/ProductSizesField";

interface UpdateFieldsProps {
  openFullView: boolean;
  action: string;
  productId: string | undefined;
}

const ProductFields = ({
  openFullView,
  action,
  productId,
}: UpdateFieldsProps) => {
  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      sizes: [{ size: "" }],
      colors: [{ color: "" }],
      category: "WOMEN",
    },
  });

  const { handleSubmit, reset } = form;

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (args: AddProductProps | updateProductProps) => {
      if (action === "ADD PRODUCT") {
        return await addProduct(args as AddProductProps);
      }
      return await updateProduct(args as updateProductProps);
    },
    onSuccess: () => {
      toast.success(
        action === "ADD PRODUCT"
          ? "Product added successfully!"
          : "Product updated successfully!"
      );

      queryClient.invalidateQueries({ queryKey: ["products"] });

      if (productId && action !== "ADD PRODUCT") {
        fetchSingleProduct({ productId }).then((fetchedProduct) => {
          if (fetchedProduct) {
            reset({
              name: fetchedProduct.name,
              description: fetchedProduct.description,
              price: fetchedProduct.price,
              category: fetchedProduct.category,
              sizes: fetchedProduct.sizes.map((size) => ({ size: size })),
              colors: fetchedProduct.colors.map((color) => ({ color: color })),
            });
          }
        });
      }
    },
    onError: () => {
      toast.error(
        action === "ADD PRODUCT"
          ? "Error adding product!"
          : "Error updating product!"
      );
    },
  });

  const onSubmit = useCallback(
    async (values: z.infer<typeof productSchema>) => {
      const { description, name, price, category, sizes, colors } = values;

      const args = {
        productId,
        data: {
          name,
          description,
          price,
          category: category,
          sizes: sizes.map((size) => size.size),
          colors: colors.map((color) => color.color),
        },
      };

      try {
        mutation.mutate(args);
        reset();
      } catch (error) {
        console.error("Submission error: ", error);
      }
    },
    [mutation, productId, reset]
  );

  useEffect(() => {
    if (!productId) return;

    const fetchProduct = async () => {
      try {
        const fetchedProduct = await fetchSingleProduct({ productId });

        if (fetchedProduct) {
          reset({
            name: fetchedProduct.name,
            description: fetchedProduct.description,
            price: fetchedProduct.price,
            category: fetchedProduct.category,
            sizes: fetchedProduct.sizes.map((size) => ({ size: size })),
            colors: fetchedProduct.colors.map((color) => ({ color: color })),
          });
        }
      } catch (error) {
        console.error("Failed to fetch product: ", error);
      }
    };

    fetchProduct();
  }, [productId, reset]);

  return (
    <div className={`h-full relative ${openFullView ? "w-[50rem]" : "w-full"}`}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="h-full border-2 flex flex-col gap-4 p-4 rounded-md">
          <ProductNameField form={form} />
          <ProductDescriptionField form={form} />
          <ProductPriceField form={form} />
          <ProductSizesField form={form} />
          <ProductColorsField form={form} />
          <ProductCategoriesField form={form} />
        </div>

        <button
          type="submit"
          className="my-6 ml-1 px-6 py-2 bg-black/90 text-white text-sm"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? (
            <RiLoader4Fill size={22} className="text-gray-400 animate-spin" />
          ) : (
            action
          )}
        </button>
      </form>
    </div>
  );
};

export default ProductFields;

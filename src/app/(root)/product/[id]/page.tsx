import { notFound } from "next/navigation";

import Product from "./Product";
import { fetchSingleProduct } from "@/actions/products";

interface ProductPageParams {
  id: string;
}

interface ProductPageProps {
  params: ProductPageParams;
}

const ProductPage = async ({ params }: ProductPageProps) => {
  const { id } = params;

  if (!id) return notFound();

  const product = await fetchSingleProduct({ productId: id });
  if (!product) return notFound();

  return <Product product={product} />;
};

export default ProductPage;

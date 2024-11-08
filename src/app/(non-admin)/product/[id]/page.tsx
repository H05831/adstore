import { fetchSingleProduct } from "@/actions/products";
import Product from "./Product";
import { notFound } from "next/navigation";

interface pageProps {
  params: {
    id: string | undefined;
  };
}

const ProductPage = async ({ params }: pageProps) => {
  const { id } = params;

  const product = await fetchSingleProduct({ productId: id });
  if (!product) return notFound();

  return <Product product={product} />;
};

export default ProductPage;

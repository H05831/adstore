import AdminProducts from "./AdminProducts";

interface PageProps {
  searchParams: {
    productId?: string;
  };
}

export default function AdminProductsPage({ searchParams }: PageProps) {
  const { productId } = searchParams;

  return <AdminProducts productId={productId} />;
}

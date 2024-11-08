"use client";

import { fetchAllProducts } from "@/actions/products";
import AddNewProduct from "@/components/admin/AddNewProduct";
import ProductCard from "@/components/admin/ProductCard";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FiMinusCircle, FiPlus, FiSearch } from "react-icons/fi";

const AdminProducts = ({ productId }: { productId: string | undefined }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [openFullView, setOpenFullView] = useState<boolean>(false);
  const [title, setTitle] = useState("");

  const { data: products } = useQuery({
    queryKey: ["products"],
    queryFn: async () => await fetchAllProducts(),
  });

  const toggleOpen = () => {
    setTitle("Add New Product");
    setOpen((prev) => !prev);
  };

  return (
    <div className="w-full h-screen my-3 rounded-md flex gap-3">
      <div
        className={`h-[87%] bg-white rounded-md px-5 overflow-hidden ${
          open ? "w-[70%]" : "w-full"
        } ${openFullView && "hidden"}`}
      >
        <div className=" h-16 flex items-center justify-between">
          <h2 className="font-semibold text-2xl">Products</h2>
          <div className="flex items-center gap-2.5 bg-[#F2F4F7] w-[300px] h-10 border border-black rounded-md px-3">
            <FiSearch size={18} />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent h-full outline-none"
            />
          </div>
          <button
            className="text-sm font-semibold py-2 px-5 border border-black flex items-center gap-3"
            onClick={toggleOpen}
          >
            ADD NEW PRODUCT
            {open ? <FiMinusCircle size={18} /> : <FiPlus size={18} />}
          </button>
        </div>
        <div
          className={`w-full h-full grid overflow-y-auto scroll-smooth scrollbar pt-5 pb-20 ${
            open ? "gap-[1.2rem] grid-cols-3" : "gap-[1.2rem] grid-cols-4"
          }`}
        >
          {products?.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              setTitle={setTitle}
              setOpen={setOpen}
            />
          ))}
        </div>
      </div>
      {open && (
        <div
          className={`h-[87%] bg-white rounded-md px-5 overflow-y-scroll scroll-smooth scrollbar py-4 ${
            openFullView ? "w-full" : "w-[30%]"
          }`}
        >
          <AddNewProduct
            title={title}
            openFullView={openFullView}
            setOpenFullView={setOpenFullView}
            productId={productId}
          />
        </div>
      )}
    </div>
  );
};

export default AdminProducts;

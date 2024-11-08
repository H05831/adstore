"use client";

import { useCartStore } from "@/hooks/useCart";
import useLoginModal from "@/hooks/useLoginModal";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { FiSearch, FiShoppingCart } from "react-icons/fi";
import Button from "./Button";
import UserInfo from "./UserInfo";

const SearchBar = () => {
  const { status } = useSession();

  const [searchInput, setSearchInput] = useState({ open: false, query: "" });
  const router = useRouter();
  const searchParams = useSearchParams();
  const category = searchParams.get("cat");
  const loginModal = useLoginModal();

  const { cartProducts } = useCartStore((state) => state);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchInput.query) return;
    router.push(`/products?cat=${category || "all"}&q=${searchInput.query}`);
    setSearchInput({ open: false, query: "" });
  };

  return (
    <div className="relative w-1/3 flex gap-14 items-center justify-end">
      {searchInput.open && (
        <form onSubmit={handleSearch} className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="w-[300px] h-10 border-2 border-zinc-300 rounded-md pl-10 transition-all duration-150 ease-out"
            value={searchInput.query}
            onChange={(e) =>
              setSearchInput({ ...searchInput, query: e.target.value })
            }
            aria-label="Search products"
            autoFocus
          />
          <FiSearch
            size={20}
            className="absolute left-3 top-2.5 text-zinc-400"
            onClick={() => setSearchInput({ ...searchInput, open: true })}
          />
        </form>
      )}
      {!searchInput.open && (
        <FiSearch
          size={20}
          className="cursor-pointer"
          onClick={() => setSearchInput({ ...searchInput, open: true })}
          aria-label="Open search"
        />
      )}
      <div
        className="relative cursor-pointer"
        onClick={() => router.push("/cart")}
        aria-label="View cart"
      >
        <FiShoppingCart size={20} />
        {cartProducts && cartProducts.length > 0 && (
          <div className="w-4 h-4 bg-black rounded-full text-white flex items-center justify-center text-[12px] absolute -top-1 -right-2">
            {cartProducts.length}
          </div>
        )}
      </div>
      {status === "authenticated" ? (
        <UserInfo />
      ) : (
        <Button label="LOGIN" onClick={loginModal.onOpen} />
      )}
    </div>
  );
};

export default SearchBar;

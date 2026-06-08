"use client";

import { ShoppingBag, Zap } from "lucide-react";
import Link from "next/link";
import { Product } from "@/lib/products";
import { useCart } from "@/lib/cart-context";

export function AddToCartActions({ product }: { product: Product }) {
  const { addItem } = useCart();

  return (
    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
      <button
        type="button"
        onClick={() => addItem(product)}
        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-ocean px-6 text-sm font-black text-white shadow-lg shadow-blue-600/25 transition hover:-translate-y-0.5 hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ocean"
      >
        <ShoppingBag className="h-4 w-4" />
        Add to cart
      </button>
      <Link
        href="/cart"
        onClick={() => addItem(product)}
        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-ink px-6 text-sm font-black text-white transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ocean"
      >
        <Zap className="h-4 w-4" />
        Buy now
      </Link>
    </div>
  );
}

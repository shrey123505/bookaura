"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Star } from "lucide-react";
import { motion } from "framer-motion";
import { Product } from "@/lib/products";
import { useCart } from "@/lib/cart-context";
import { formatCurrency } from "@/lib/utils";

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();

  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className="group overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-sm transition hover:shadow-premium"
    >
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
          <Image
            src={product.image}
            alt={product.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
          <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-ocean shadow-sm backdrop-blur">
            {product.badge}
          </span>
        </div>
      </Link>
      <div className="p-5">
        <div className="flex items-center justify-between gap-3">
          <span className="rounded-full bg-mist px-3 py-1 text-xs font-bold text-ocean">
            {product.category}
          </span>
          <span className="flex items-center gap-1 text-sm font-bold text-slate-700">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            {product.rating}
          </span>
        </div>
        <Link href={`/products/${product.slug}`}>
          <h3 className="mt-4 line-clamp-2 text-lg font-black tracking-tight text-ink">
            {product.title}
          </h3>
        </Link>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">
          {product.description}
        </p>
        <div className="mt-5 flex items-center justify-between gap-3">
          <span className="text-xl font-black text-ink">{formatCurrency(product.price)}</span>
          <button
            type="button"
            onClick={() => addItem(product)}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-ink px-4 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-ocean focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ocean"
            aria-label={`Add ${product.title} to cart`}
          >
            <ShoppingBag className="h-4 w-4" />
            Add
          </button>
        </div>
      </div>
    </motion.article>
  );
}

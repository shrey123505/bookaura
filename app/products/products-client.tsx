"use client";

import { Search, SlidersHorizontal } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { MotionWrapper } from "@/components/motion-wrapper";
import { ProductCard } from "@/components/product-card";
import { Product } from "@/lib/products";
import { cn } from "@/lib/utils";

export function ProductsClient({ products }: { products: Product[] }) {
  const searchParams = useSearchParams();
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(products.map((product) => product.category)))],
    [products]
  );
  const requestedCategory = searchParams.get("category") || "All";
  const initialCategory = categories.includes(requestedCategory) ? requestedCategory : "All";
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(initialCategory);

  useEffect(() => {
    setCategory(categories.includes(requestedCategory) ? requestedCategory : "All");
  }, [categories, requestedCategory]);

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return products.filter((product) => {
      const searchableText = [
        product.title,
        product.category,
        product.badge,
        product.description,
        product.features.join(" ")
      ]
        .join(" ")
        .toLowerCase();
      const matchesSearch = searchableText.includes(normalizedQuery);
      const matchesCategory = category === "All" || product.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [category, products, query]);

  return (
    <MotionWrapper>
      <section className="px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.24em] text-ocean">Catalog</p>
              <h1 className="mt-3 text-4xl font-black tracking-tight text-ink sm:text-5xl">
                Shop curated books and everyday upgrades
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
                Search by title or filter by category to find books, desk tools, and calm productivity products that fit your routine.
              </p>
            </div>
            <div className="glass-panel rounded-[1.5rem] p-4">
              <div className="relative">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <input
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  aria-label="Search products"
                  placeholder="Search products or books"
                  className="min-h-12 w-full rounded-full border border-slate-200 bg-white px-12 py-3 text-sm font-semibold text-ink outline-none transition focus:border-ocean focus:ring-4 focus:ring-blue-100"
                />
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="mr-1 inline-flex items-center gap-2 text-sm font-bold text-slate-600">
                  <SlidersHorizontal className="h-4 w-4" />
                  Filter
                </span>
                {categories.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setCategory(item)}
                    className={cn(
                      "rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-600 transition hover:border-blue-200 hover:text-ocean focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ocean",
                      category === item && "border-ocean bg-ocean text-white hover:text-white"
                    )}
                    aria-pressed={category === item}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="mt-12 rounded-[1.5rem] border border-slate-200 bg-white p-10 text-center shadow-sm">
              <h2 className="text-2xl font-black text-ink">No products found</h2>
              <p className="mt-3 text-slate-600">
                Try a different search term or reset the category filter.
              </p>
            </div>
          )}
        </div>
      </section>
    </MotionWrapper>
  );
}

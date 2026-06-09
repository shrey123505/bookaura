"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { AdminShell, useAdminApi } from "@/components/admin/admin-shell";
import { Product } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";

function ProductsContent() {
  const { fetchAdmin } = useAdminApi();
  const [products, setProducts] = useState<Product[]>([]);

  const loadProducts = useCallback(async () => {
    const response = await fetchAdmin("/api/admin/products");
    const result = await response.json();
    setProducts(result.products || []);
  }, [fetchAdmin]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const deleteProduct = async (id: string) => {
    const confirmed = window.confirm("Delete this product?");
    if (!confirmed) return;

    await fetchAdmin(`/api/admin/products/${id}`, { method: "DELETE" });
    loadProducts();
  };

  return (
    <div>
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.24em] text-ocean">Products</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-ink">Manage catalog</h2>
        </div>
        <Link
          href="/admin/products/new"
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-ocean px-5 text-sm font-black text-white"
        >
          <Plus className="h-4 w-4" />
          New product
        </Link>
      </div>
      <div className="mt-8 overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-sm">
        {products.map((product) => (
          <div key={product.id} className="grid gap-4 border-b border-slate-100 p-4 last:border-b-0 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-lg font-black text-ink">{product.title}</h3>
                <span className="rounded-full bg-mist px-3 py-1 text-xs font-black text-ocean">{product.category}</span>
                {!product.active && <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-black text-red-600">Inactive</span>}
                {product.featured && <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-black text-amber-700">Featured</span>}
              </div>
              <p className="mt-2 text-sm text-slate-600">
                {formatCurrency(product.price)} · Stock {product.stock} · {product.slug}
              </p>
            </div>
            <div className="flex gap-2">
              <Link
                href={`/admin/products/${product.id}/edit`}
                className="grid h-10 w-10 place-items-center rounded-full border border-slate-200 text-slate-700 hover:text-ocean"
                aria-label={`Edit ${product.title}`}
              >
                <Pencil className="h-4 w-4" />
              </Link>
              <button
                type="button"
                onClick={() => deleteProduct(product.id)}
                className="grid h-10 w-10 place-items-center rounded-full border border-slate-200 text-slate-700 hover:text-red-600"
                aria-label={`Delete ${product.title}`}
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AdminProductsPage() {
  return (
    <AdminShell>
      <ProductsContent />
    </AdminShell>
  );
}

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AdminShell, useAdminApi } from "@/components/admin/admin-shell";
import { ProductForm } from "@/components/admin/product-form";
import { Product } from "@/lib/types";

function EditProductContent({ id }: { id: string }) {
  const { fetchAdmin } = useAdminApi();
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProduct() {
      const response = await fetchAdmin(`/api/admin/products/${id}`);
      const result = await response.json();

      if (!response.ok) {
        setError(result.error || "Product not found.");
        return;
      }

      setProduct(result.product);
    }

    loadProduct();
  }, [fetchAdmin, id]);

  return (
    <div>
      <Link href="/admin/products" className="text-sm font-bold text-slate-500 hover:text-ocean">
        Back to products
      </Link>
      <h2 className="mt-4 text-3xl font-black tracking-tight text-ink">Edit product</h2>
      <div className="mt-8">
        {error && <p className="rounded-2xl bg-red-50 p-4 text-sm font-bold text-red-600">{error}</p>}
        {!error && !product && <p className="text-sm font-bold text-slate-600">Loading product...</p>}
        {product && <ProductForm product={product} />}
      </div>
    </div>
  );
}

export default function EditProductPage({ params }: { params: { id: string } }) {
  return (
    <AdminShell>
      <EditProductContent id={params.id} />
    </AdminShell>
  );
}

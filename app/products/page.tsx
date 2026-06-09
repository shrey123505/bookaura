import { Suspense } from "react";
import { ProductsClient } from "./products-client";
import { getProducts } from "@/lib/supabase/queries";

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <Suspense fallback={<div className="px-4 py-14 text-center font-semibold text-slate-600">Loading products...</div>}>
      <ProductsClient products={products} />
    </Suspense>
  );
}

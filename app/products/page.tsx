import { Suspense } from "react";
import { ProductsClient } from "./products-client";

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="px-4 py-14 text-center font-semibold text-slate-600">Loading products...</div>}>
      <ProductsClient />
    </Suspense>
  );
}

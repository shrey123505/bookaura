"use client";

import Link from "next/link";
import { AdminShell } from "@/components/admin/admin-shell";
import { ProductForm } from "@/components/admin/product-form";

export default function NewProductPage() {
  return (
    <AdminShell>
      <div>
        <Link href="/admin/products" className="text-sm font-bold text-slate-500 hover:text-ocean">
          Back to products
        </Link>
        <h2 className="mt-4 text-3xl font-black tracking-tight text-ink">Add product</h2>
        <div className="mt-8">
          <ProductForm />
        </div>
      </div>
    </AdminShell>
  );
}

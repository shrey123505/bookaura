"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { Product } from "@/lib/types";
import { useAdminApi } from "@/components/admin/admin-shell";

const categories = ["Books", "Productivity", "Wellness", "Creative Tools"];

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function ProductForm({ product }: { product?: Product }) {
  const router = useRouter();
  const { fetchAdmin } = useAdminApi();
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({
    title: product?.title || "",
    slug: product?.slug || "",
    description: product?.description || "",
    category: product?.category || "Books",
    price: String(product?.price || ""),
    image_url: product?.image_url || "",
    rating: String(product?.rating || 4.5),
    badge: product?.badge || "New",
    stock: String(product?.stock || 0),
    features: product?.features.join("\n") || "",
    featured: product?.featured || false,
    active: product?.active ?? true
  });

  const endpoint = product ? `/api/admin/products/${product.id}` : "/api/admin/products";
  const method = product ? "PUT" : "POST";

  const previewSlug = useMemo(() => form.slug || slugify(form.title), [form.slug, form.title]);

  const updateField = (field: keyof typeof form, value: string | boolean) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const saveProduct = async () => {
    setStatus("loading");
    setMessage("");

    const response = await fetchAdmin(endpoint, {
      method,
      body: JSON.stringify({
        ...form,
        slug: previewSlug,
        price: Number(form.price),
        rating: Number(form.rating),
        stock: Number(form.stock)
      })
    });

    const result = await response.json().catch(() => ({ error: "Product save failed." }));

    if (!response.ok) {
      setStatus("error");
      setMessage(result.error || "Product save failed.");
      return;
    }

    router.push("/admin/products");
    router.refresh();
  };

  return (
    <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm">
      <div className="grid gap-5 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-bold text-slate-700">
          Title
          <input
            value={form.title}
            onChange={(event) => updateField("title", event.target.value)}
            className="min-h-12 rounded-2xl border border-slate-200 px-4 outline-none focus:border-ocean focus:ring-4 focus:ring-blue-100"
          />
        </label>
        <label className="grid gap-2 text-sm font-bold text-slate-700">
          Slug
          <input
            value={previewSlug}
            onChange={(event) => updateField("slug", event.target.value)}
            className="min-h-12 rounded-2xl border border-slate-200 px-4 outline-none focus:border-ocean focus:ring-4 focus:ring-blue-100"
          />
        </label>
        <label className="grid gap-2 text-sm font-bold text-slate-700">
          Category
          <select
            value={form.category}
            onChange={(event) => updateField("category", event.target.value)}
            className="min-h-12 rounded-2xl border border-slate-200 px-4 outline-none focus:border-ocean focus:ring-4 focus:ring-blue-100"
          >
            {categories.map((category) => (
              <option key={category}>{category}</option>
            ))}
          </select>
        </label>
        <label className="grid gap-2 text-sm font-bold text-slate-700">
          Badge
          <input
            value={form.badge}
            onChange={(event) => updateField("badge", event.target.value)}
            className="min-h-12 rounded-2xl border border-slate-200 px-4 outline-none focus:border-ocean focus:ring-4 focus:ring-blue-100"
          />
        </label>
        <label className="grid gap-2 text-sm font-bold text-slate-700">
          Price
          <input
            type="number"
            min="0"
            value={form.price}
            onChange={(event) => updateField("price", event.target.value)}
            className="min-h-12 rounded-2xl border border-slate-200 px-4 outline-none focus:border-ocean focus:ring-4 focus:ring-blue-100"
          />
        </label>
        <label className="grid gap-2 text-sm font-bold text-slate-700">
          Stock
          <input
            type="number"
            min="0"
            value={form.stock}
            onChange={(event) => updateField("stock", event.target.value)}
            className="min-h-12 rounded-2xl border border-slate-200 px-4 outline-none focus:border-ocean focus:ring-4 focus:ring-blue-100"
          />
        </label>
        <label className="grid gap-2 text-sm font-bold text-slate-700">
          Rating
          <input
            type="number"
            min="0"
            max="5"
            step="0.1"
            value={form.rating}
            onChange={(event) => updateField("rating", event.target.value)}
            className="min-h-12 rounded-2xl border border-slate-200 px-4 outline-none focus:border-ocean focus:ring-4 focus:ring-blue-100"
          />
        </label>
        <label className="grid gap-2 text-sm font-bold text-slate-700 md:col-span-2">
          Image URL
          <input
            value={form.image_url}
            onChange={(event) => updateField("image_url", event.target.value)}
            className="min-h-12 rounded-2xl border border-slate-200 px-4 outline-none focus:border-ocean focus:ring-4 focus:ring-blue-100"
          />
        </label>
        <label className="grid gap-2 text-sm font-bold text-slate-700 md:col-span-2">
          Description
          <textarea
            rows={4}
            value={form.description}
            onChange={(event) => updateField("description", event.target.value)}
            className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-ocean focus:ring-4 focus:ring-blue-100"
          />
        </label>
        <label className="grid gap-2 text-sm font-bold text-slate-700 md:col-span-2">
          Features
          <textarea
            rows={5}
            value={form.features}
            onChange={(event) => updateField("features", event.target.value)}
            className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-ocean focus:ring-4 focus:ring-blue-100"
            placeholder="One feature per line"
          />
        </label>
        <label className="flex items-center gap-3 text-sm font-bold text-slate-700">
          <input
            type="checkbox"
            checked={form.featured}
            onChange={(event) => updateField("featured", event.target.checked)}
            className="h-5 w-5 rounded border-slate-300 text-ocean"
          />
          Featured product
        </label>
        <label className="flex items-center gap-3 text-sm font-bold text-slate-700">
          <input
            type="checkbox"
            checked={form.active}
            onChange={(event) => updateField("active", event.target.checked)}
            className="h-5 w-5 rounded border-slate-300 text-ocean"
          />
          Active in store
        </label>
      </div>
      <button
        type="button"
        onClick={saveProduct}
        disabled={status === "loading"}
        className="mt-6 inline-flex min-h-12 items-center justify-center rounded-full bg-ocean px-6 text-sm font-black text-white shadow-lg shadow-blue-600/25 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "loading" ? "Saving..." : "Save product"}
      </button>
      {message && <p className="mt-4 text-sm font-semibold text-red-600">{message}</p>}
    </div>
  );
}

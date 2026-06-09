import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import { normalizeProduct } from "@/lib/products";

function productPayload(body: Record<string, unknown>) {
  return {
    title: String(body.title || "").trim(),
    slug: String(body.slug || "").trim(),
    description: String(body.description || "").trim(),
    category: String(body.category || "Books").trim(),
    price: Number(body.price || 0),
    image_url: String(body.image_url || body.image || "").trim(),
    rating: Number(body.rating || 0),
    badge: String(body.badge || "New").trim(),
    stock: Number(body.stock || 0),
    features: Array.isArray(body.features)
      ? body.features.map(String)
      : String(body.features || "")
          .split("\n")
          .map((feature) => feature.trim())
          .filter(Boolean),
    featured: Boolean(body.featured),
    active: body.active === undefined ? true : Boolean(body.active)
  };
}

export async function GET(request: NextRequest) {
  const admin = await requireAdmin(request);
  if (!admin.ok) return admin.response;

  const supabase = createAdminSupabaseClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ products: (data || []).map((row) => normalizeProduct(row)) });
}

export async function POST(request: NextRequest) {
  const admin = await requireAdmin(request);
  if (!admin.ok) return admin.response;

  const payload = productPayload(await request.json());

  if (!payload.title || !payload.slug || !payload.description || !payload.image_url) {
    return NextResponse.json(
      { error: "Title, slug, description, and image URL are required." },
      { status: 400 }
    );
  }

  const supabase = createAdminSupabaseClient();
  const { data, error } = await supabase.from("products").insert(payload).select("*").single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ product: normalizeProduct(data) });
}

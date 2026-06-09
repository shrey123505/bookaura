import { fallbackProducts, normalizeProduct } from "@/lib/products";
import { Product } from "@/lib/types";
import { createPublicSupabaseClient, hasSupabasePublicEnv } from "@/lib/supabase/server";

export async function getProducts(options: { includeInactive?: boolean } = {}): Promise<Product[]> {
  if (!hasSupabasePublicEnv()) {
    return options.includeInactive ? fallbackProducts : fallbackProducts.filter((product) => product.active);
  }

  const supabase = createPublicSupabaseClient();
  let query = supabase.from("products").select("*").order("created_at", { ascending: false });

  if (!options.includeInactive) {
    query = query.eq("active", true);
  }

  const { data, error } = await query;

  if (error || !data) {
    return options.includeInactive ? fallbackProducts : fallbackProducts.filter((product) => product.active);
  }

  return data.map((row) => normalizeProduct(row));
}

export async function getFeaturedProducts(limit = 3): Promise<Product[]> {
  const products = await getProducts();
  const featured = products.filter((product) => product.featured);
  return (featured.length ? featured : products).slice(0, limit);
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  if (!hasSupabasePublicEnv()) {
    return fallbackProducts.find((product) => product.slug === slug || product.id === slug);
  }

  const supabase = createPublicSupabaseClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .or(`slug.eq.${slug},id.eq.${slug}`)
    .eq("active", true)
    .maybeSingle();

  if (error || !data) {
    return fallbackProducts.find((product) => product.slug === slug || product.id === slug);
  }

  return normalizeProduct(data);
}

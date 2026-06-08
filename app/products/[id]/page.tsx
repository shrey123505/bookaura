import Image from "next/image";
import { notFound } from "next/navigation";
import { CheckCircle2, ShieldCheck, Star, Truck } from "lucide-react";
import { AddToCartActions } from "./product-actions";
import { MotionWrapper } from "@/components/motion-wrapper";
import { getProductById, products } from "@/lib/products";
import { formatCurrency } from "@/lib/utils";

export function generateStaticParams() {
  return products.map((product) => ({ id: product.id }));
}

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = getProductById(params.id);
  if (!product) notFound();

  return (
    <MotionWrapper>
      <section className="px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div className="glass-panel overflow-hidden rounded-[2rem] p-4">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-slate-100">
              <Image
                src={product.image}
                alt={product.title}
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>

          <div>
            <span className="inline-flex rounded-full bg-mist px-4 py-2 text-sm font-black text-ocean">
              {product.category} - {product.badge}
            </span>
            <h1 className="mt-5 text-4xl font-black tracking-tight text-ink sm:text-5xl">
              {product.title}
            </h1>
            <div className="mt-4 flex flex-wrap items-center gap-4">
              <span className="text-3xl font-black text-ink">{formatCurrency(product.price)}</span>
              <span className="inline-flex items-center gap-1 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-sm font-bold text-amber-700">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                {product.rating} customer rating
              </span>
            </div>
            <p className="mt-6 text-lg leading-8 text-slate-600">{product.description}</p>

            <div className="mt-8 grid gap-3">
              {product.features.map((feature) => (
                <div key={feature} className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-ocean" />
                  <span className="text-sm font-semibold leading-6 text-slate-700">{feature}</span>
                </div>
              ))}
            </div>

            <AddToCartActions product={product} />

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <Truck className="h-6 w-6 text-ocean" />
                <h2 className="mt-3 font-black text-ink">Fast dispatch</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Orders are packed within one business day with simple tracking updates.
                </p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <ShieldCheck className="h-6 w-6 text-ocean" />
                <h2 className="mt-3 font-black text-ink">Quality promise</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Every item is selected for real-world usefulness, finish, and lasting value.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MotionWrapper>
  );
}

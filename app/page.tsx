import Image from "next/image";
import { ArrowUpRight, CheckCircle2, PackageCheck, Sparkles, Truck } from "lucide-react";
import { Button } from "@/components/button";
import { MotionWrapper } from "@/components/motion-wrapper";
import { ProductCard } from "@/components/product-card";
import { SectionHeading } from "@/components/section-heading";
import { getFeaturedProducts, getProducts } from "@/lib/supabase/queries";

const benefits = [
  {
    icon: Sparkles,
    title: "Curated with intention",
    text: "Every book and product is selected for usefulness, quality, and daily impact."
  },
  {
    icon: Truck,
    title: "Fast, careful delivery",
    text: "Orders are packed cleanly with simple updates from cart to doorstep."
  },
  {
    icon: PackageCheck,
    title: "Bundles that make sense",
    text: "Shop reading, study, desk, and wellness essentials without decision fatigue."
  }
];

const testimonials = [
  {
    quote:
      "BookAura feels like a smart friend curated my reading desk. I found books and tools I actually use every week.",
    name: "Maya Chen",
    role: "Design student"
  },
  {
    quote:
      "The product mix is focused and premium without being overwhelming. Perfect for gifts and personal upgrades.",
    name: "Arjun Patel",
    role: "Founder"
  },
  {
    quote:
      "I bought the clarity journal and focus timer together. My study blocks are calmer and far easier to start.",
    name: "Nora Williams",
    role: "Graduate reader"
  }
];

export default async function HomePage() {
  const [products, featuredProducts] = await Promise.all([
    getProducts(),
    getFeaturedProducts(3)
  ]);
  const heroProducts = products.length >= 3 ? products : featuredProducts;

  return (
    <MotionWrapper>
      <section className="relative overflow-hidden px-4 pb-16 pt-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <span className="inline-flex rounded-full border border-blue-100 bg-white/80 px-4 py-2 text-sm font-bold text-ocean shadow-sm">
              Discover books and products that upgrade your everyday life.
            </span>
            <h1 className="mt-6 max-w-4xl text-5xl font-black tracking-tight text-ink sm:text-6xl lg:text-7xl">
              BookAura
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              Premium books, desk tools, and mindful essentials for students, readers, creators, and online shoppers who want their everyday routines to feel sharper.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/products">Shop collection</Button>
              <Button href="/about" variant="secondary">
                Our story
              </Button>
            </div>
            <div className="mt-10 grid max-w-xl grid-cols-1 gap-4 min-[420px]:grid-cols-3">
              {[
                ["12k+", "happy readers"],
                ["4.8", "avg rating"],
                ["24h", "order support"]
              ].map(([value, label]) => (
                <div key={value} className="rounded-3xl border border-white/70 bg-white/70 p-4 shadow-sm backdrop-blur">
                  <div className="text-2xl font-black text-ink">{value}</div>
                  <div className="mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-panel relative rounded-[2rem] p-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="relative min-h-80 overflow-hidden rounded-[1.5rem]">
                <Image
                  src={heroProducts[0]?.image || featuredProducts[0]?.image}
                  alt="Featured BookAura book"
                  fill
                  priority
                  sizes="(min-width: 1024px) 25vw, 80vw"
                  className="object-cover"
                />
              </div>
              <div className="grid gap-4">
                <div className="rounded-[1.5rem] bg-ink p-6 text-white">
                  <p className="text-sm font-semibold text-blue-200">Today&apos;s edit</p>
                  <h2 className="mt-3 text-2xl font-black">Focus, read, create.</h2>
                  <p className="mt-3 text-sm leading-6 text-slate-300">
                    Thoughtful picks for your next study session, reading ritual, or creator workspace.
                  </p>
                </div>
                <div className="relative min-h-52 overflow-hidden rounded-[1.5rem]">
                  <Image
                    src={heroProducts[2]?.image || heroProducts[0]?.image || featuredProducts[0]?.image}
                    alt="BookAura desk essentials"
                    fill
                    sizes="(min-width: 1024px) 25vw, 80vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.24em] text-ocean">Featured</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-ink sm:text-4xl">
                Loved by readers and makers
              </h2>
            </div>
            <Button href="/products" variant="secondary">
              View all
            </Button>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white/70 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Why BookAura"
            title="Premium choices without the noisy marketplace feeling"
            description="We make online shopping feel intentional by curating products that are useful, beautiful, and easy to recommend."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm">
                <benefit.icon className="h-8 w-8 text-ocean" />
                <h3 className="mt-5 text-xl font-black text-ink">{benefit.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{benefit.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Testimonials"
            title="A store people return to when they want better routines"
            description="From campus rooms to founder desks, BookAura is built for people who love thoughtful tools."
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {testimonials.map((item) => (
              <figure key={item.name} className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex gap-1 text-amber-400">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <CheckCircle2 key={index} className="h-4 w-4 fill-amber-400" />
                  ))}
                </div>
                <blockquote className="mt-5 text-sm leading-7 text-slate-700">&quot;{item.quote}&quot;</blockquote>
                <figcaption className="mt-6">
                  <div className="font-black text-ink">{item.name}</div>
                  <div className="text-sm text-slate-500">{item.role}</div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 rounded-[2rem] bg-ink p-8 text-white shadow-premium md:grid-cols-[1.1fr_0.9fr] md:p-10">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.24em] text-blue-200">Newsletter</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
              Get new drops, reading lists, and smarter routine ideas.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300">
              Join the BookAura list for curated launches, gift guides, and practical product notes.
            </p>
          </div>
          <form className="flex flex-col gap-3 self-end sm:flex-row">
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              name="email"
              type="email"
              placeholder="you@example.com"
              className="min-h-12 flex-1 rounded-full border border-white/10 bg-white/10 px-5 text-white outline-none placeholder:text-slate-400 focus:border-blue-300 focus:ring-4 focus:ring-white/10"
            />
            <button
              type="button"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-black text-ink transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-200"
            >
              Join list
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </form>
        </div>
      </section>
    </MotionWrapper>
  );
}

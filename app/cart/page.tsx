"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { CheckoutButton } from "@/components/checkout-button";
import { MotionWrapper } from "@/components/motion-wrapper";
import { useCart } from "@/lib/cart-context";
import { formatCurrency } from "@/lib/utils";

export default function CartPage() {
  const { clearCart, isLoaded, items, removeItem, totalPrice, updateQuantity } = useCart();
  const [orderConfirmation, setOrderConfirmation] = useState<{
    orderId: string;
    itemCount: number;
    total: number;
  } | null>(null);

  const handleCheckoutSuccess = (orderId: string) => {
    setOrderConfirmation({
      orderId,
      itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
      total: totalPrice
    });
    clearCart();
  };

  return (
    <MotionWrapper>
      <section className="px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.24em] text-ocean">Cart</p>
            <h1 className="mt-3 text-4xl font-black tracking-tight text-ink sm:text-5xl">
              Your BookAura bag
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
              Review your picks, adjust quantities, and continue to checkout when everything feels right.
            </p>
          </div>

          {orderConfirmation && (
            <div className="mt-10 rounded-[1.5rem] border border-blue-100 bg-white p-6 shadow-sm">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                <span className="grid h-12 w-12 flex-none place-items-center rounded-full bg-mist text-ocean">
                  <CheckCircle2 className="h-6 w-6" />
                </span>
                <div>
                  <h2 className="text-2xl font-black text-ink">Order placed successfully!</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Your demo order has been saved to Supabase. Order ID:{" "}
                    <span className="font-bold text-ink">{orderConfirmation.orderId}</span>
                  </p>
                  <p className="mt-2 text-sm font-semibold text-slate-700">
                    {orderConfirmation.itemCount} item{orderConfirmation.itemCount === 1 ? "" : "s"} · {formatCurrency(orderConfirmation.total)}
                  </p>
                </div>
              </div>
            </div>
          )}

          {!isLoaded ? (
            <div className="mt-12 rounded-[2rem] border border-slate-200 bg-white p-10 text-center shadow-sm">
              <ShoppingBag className="mx-auto h-12 w-12 text-ocean" />
              <h2 className="mt-5 text-2xl font-black text-ink">Loading your cart</h2>
              <p className="mt-3 text-slate-600">Checking saved BookAura items on this device.</p>
            </div>
          ) : items.length === 0 ? (
            <div className="mt-12 rounded-[2rem] border border-slate-200 bg-white p-10 text-center shadow-sm">
              <ShoppingBag className="mx-auto h-12 w-12 text-ocean" />
              <h2 className="mt-5 text-2xl font-black text-ink">Your cart is empty</h2>
              <p className="mt-3 text-slate-600">
                Add a book, tool, or daily upgrade from the catalog to begin.
              </p>
              <Link
                href="/products"
                className="mt-6 inline-flex min-h-12 items-center justify-center rounded-full bg-ocean px-6 text-sm font-black text-white transition hover:-translate-y-0.5"
              >
                Browse products
              </Link>
            </div>
          ) : (
            <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_380px]">
              <div className="grid gap-4">
                {items.map((item) => (
                  <div
                    key={item.product.id}
                    className="grid gap-4 rounded-[1.5rem] border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-[120px_1fr_auto]"
                  >
                    <div className="relative aspect-square overflow-hidden rounded-2xl bg-slate-100">
                      <Image
                        src={item.product.image}
                        alt={item.product.title}
                        fill
                        sizes="120px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-xs font-black uppercase tracking-wide text-ocean">
                        {item.product.category}
                      </p>
                      <h2 className="mt-2 text-xl font-black text-ink">{item.product.title}</h2>
                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        {item.product.description}
                      </p>
                      <button
                        type="button"
                        onClick={() => removeItem(item.product.id)}
                        className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-slate-500 transition hover:text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                        Remove
                      </button>
                    </div>
                    <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
                      <div className="text-xl font-black text-ink">
                        {formatCurrency(item.product.price * item.quantity)}
                      </div>
                      <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 p-1">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          disabled={item.quantity === 1}
                          className="grid h-9 w-9 place-items-center rounded-full bg-white text-ink shadow-sm transition disabled:cursor-not-allowed disabled:opacity-40"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="min-w-8 text-center text-sm font-black">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="grid h-9 w-9 place-items-center rounded-full bg-white text-ink shadow-sm"
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <aside className="h-fit rounded-[1.5rem] bg-ink p-6 text-white shadow-premium">
                <h2 className="text-2xl font-black">Order summary</h2>
                <div className="mt-6 grid gap-3 border-b border-white/10 pb-6 text-sm text-slate-300">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{formatCurrency(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Support</span>
                    <span>Included</span>
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-between text-xl font-black">
                  <span>Total</span>
                  <span>{formatCurrency(totalPrice)}</span>
                </div>
                <CheckoutButton items={items} onSuccess={handleCheckoutSuccess} />
                <button
                  type="button"
                  onClick={clearCart}
                  className="mt-3 inline-flex min-h-11 w-full items-center justify-center rounded-full border border-white/15 px-6 text-sm font-black text-white transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-200"
                >
                  Clear cart
                </button>
                <p className="mt-4 text-xs leading-5 text-slate-400">
                  Demo checkout only. Connect Stripe, Razorpay, or your preferred payment provider when the backend is ready.
                </p>
              </aside>
            </div>
          )}
        </div>
      </section>
    </MotionWrapper>
  );
}

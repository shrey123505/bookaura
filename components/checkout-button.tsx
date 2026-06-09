"use client";

import { useState } from "react";
import { CartItem } from "@/lib/cart-context";

export function CheckoutButton({
  items,
  onSuccess
}: {
  items: CartItem[];
  onSuccess: (orderId: string) => void;
}) {
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [message, setMessage] = useState("");

  const createDemoOrder = async () => {
    setStatus("loading");
    setMessage("");

    const response = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customerName: "BookAura Demo Customer",
        customerEmail: "demo@bookaura.store",
        items
      })
    });

    const result = await response.json().catch(() => ({ error: "Checkout failed." }));

    if (!response.ok) {
      setStatus("error");
      setMessage(result.error || "Checkout failed.");
      return;
    }

    onSuccess(result.orderId);
  };

  return (
    <div>
      <button
        type="button"
        onClick={createDemoOrder}
        disabled={status === "loading"}
        className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-white px-6 text-sm font-black text-ink transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-200"
      >
        {status === "loading" ? "Creating order..." : "Checkout"}
      </button>
      {message && (
        <p className="mt-3 text-xs font-semibold leading-5 text-red-200">
          {message}
        </p>
      )}
    </div>
  );
}

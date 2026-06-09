"use client";

import { useState } from "react";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  topic: "Product recommendation",
  message: ""
};

export function ContactForm() {
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const updateField = (field: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async () => {
    setStatus("loading");
    setMessage("");

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    if (!response.ok) {
      const result = await response.json().catch(() => ({ error: "Message failed." }));
      setStatus("error");
      setMessage(result.error || "Message failed.");
      return;
    }

    setStatus("success");
    setMessage("Thanks. Your message has been saved for the BookAura team.");
    setForm(initialState);
  };

  return (
    <form className="glass-panel rounded-[2rem] p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-bold text-slate-700">
          First name
          <input
            name="firstName"
            autoComplete="given-name"
            value={form.firstName}
            onChange={(event) => updateField("firstName", event.target.value)}
            className="min-h-12 rounded-2xl border border-slate-200 bg-white px-4 outline-none transition focus:border-ocean focus:ring-4 focus:ring-blue-100"
          />
        </label>
        <label className="grid gap-2 text-sm font-bold text-slate-700">
          Last name
          <input
            name="lastName"
            autoComplete="family-name"
            value={form.lastName}
            onChange={(event) => updateField("lastName", event.target.value)}
            className="min-h-12 rounded-2xl border border-slate-200 bg-white px-4 outline-none transition focus:border-ocean focus:ring-4 focus:ring-blue-100"
          />
        </label>
        <label className="grid gap-2 text-sm font-bold text-slate-700 sm:col-span-2">
          Email
          <input
            name="email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={(event) => updateField("email", event.target.value)}
            className="min-h-12 rounded-2xl border border-slate-200 bg-white px-4 outline-none transition focus:border-ocean focus:ring-4 focus:ring-blue-100"
          />
        </label>
        <label className="grid gap-2 text-sm font-bold text-slate-700 sm:col-span-2">
          What can we help with?
          <select
            name="topic"
            value={form.topic}
            onChange={(event) => updateField("topic", event.target.value)}
            className="min-h-12 rounded-2xl border border-slate-200 bg-white px-4 outline-none transition focus:border-ocean focus:ring-4 focus:ring-blue-100"
          >
            <option>Product recommendation</option>
            <option>Order support</option>
            <option>Bulk or gift order</option>
            <option>Partnership inquiry</option>
          </select>
        </label>
        <label className="grid gap-2 text-sm font-bold text-slate-700 sm:col-span-2">
          Message
          <textarea
            name="message"
            rows={6}
            value={form.message}
            onChange={(event) => updateField("message", event.target.value)}
            className="rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-ocean focus:ring-4 focus:ring-blue-100"
            placeholder="Share your goal, budget, or the kind of books and products you enjoy."
          />
        </label>
      </div>
      <button
        type="button"
        onClick={handleSubmit}
        disabled={status === "loading"}
        className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-ocean px-6 text-sm font-black text-white shadow-lg shadow-blue-600/25 transition hover:-translate-y-0.5 hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {status === "loading" ? "Sending..." : "Send message"}
      </button>
      {message && (
        <p className={`mt-4 text-sm font-semibold ${status === "success" ? "text-emerald-700" : "text-red-600"}`}>
          {message}
        </p>
      )}
    </form>
  );
}

"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LockKeyhole } from "lucide-react";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [message, setMessage] = useState("");

  const login = async () => {
    setStatus("loading");
    setMessage("");

    try {
      const supabase = createBrowserSupabaseClient();
      const { error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        setStatus("error");
        setMessage(error.message);
        return;
      }

      router.push("/admin/dashboard");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Supabase is not configured.");
    }
  };

  return (
    <section className="grid min-h-[80vh] place-items-center px-4 py-16">
      <div className="w-full max-w-md rounded-[2rem] border border-slate-200 bg-white p-8 shadow-premium">
        <div className="grid h-12 w-12 place-items-center rounded-2xl bg-ink text-white">
          <LockKeyhole className="h-6 w-6" />
        </div>
        <p className="mt-6 text-sm font-black uppercase tracking-[0.24em] text-ocean">Admin login</p>
        <h1 className="mt-2 text-3xl font-black tracking-tight text-ink">Manage BookAura</h1>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          Sign in with a Supabase Auth user whose email is approved in `ADMIN_EMAILS` or `admin_users`.
        </p>
        <div className="mt-6 grid gap-4">
          <label className="grid gap-2 text-sm font-bold text-slate-700">
            Email
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="min-h-12 rounded-2xl border border-slate-200 px-4 outline-none focus:border-ocean focus:ring-4 focus:ring-blue-100"
            />
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-700">
            Password
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="min-h-12 rounded-2xl border border-slate-200 px-4 outline-none focus:border-ocean focus:ring-4 focus:ring-blue-100"
            />
          </label>
        </div>
        <button
          type="button"
          onClick={login}
          disabled={status === "loading"}
          className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-ocean px-6 text-sm font-black text-white shadow-lg shadow-blue-600/25 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "loading" ? "Signing in..." : "Sign in"}
        </button>
        {message && <p className="mt-4 text-sm font-semibold text-red-600">{message}</p>}
        <Link href="/" className="mt-6 inline-flex text-sm font-bold text-slate-500 hover:text-ocean">
          Back to store
        </Link>
      </div>
    </section>
  );
}

"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { BarChart3, Boxes, LogOut, Mail, Package, ShoppingBag } from "lucide-react";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

type AdminContextValue = {
  token: string;
  fetchAdmin: (path: string, init?: RequestInit) => Promise<Response>;
};

const AdminContext = createContext<AdminContextValue | undefined>(undefined);

const adminLinks = [
  { href: "/admin/dashboard", label: "Dashboard", icon: BarChart3 },
  { href: "/admin/products", label: "Products", icon: Boxes },
  { href: "/admin/orders", label: "Orders", icon: ShoppingBag },
  { href: "/admin/messages", label: "Messages", icon: Mail }
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"loading" | "ready" | "denied">("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function verifyAdmin() {
      try {
        const supabase = createBrowserSupabaseClient();
        const { data } = await supabase.auth.getSession();
        const accessToken = data.session?.access_token;

        if (!accessToken) {
          router.replace("/admin/login");
          return;
        }

        const response = await fetch("/api/admin/me", {
          headers: { Authorization: `Bearer ${accessToken}` }
        });

        if (!response.ok) {
          setStatus("denied");
          setMessage(response.status === 403 ? "Access denied for this email." : "Admin access could not be verified.");
          return;
        }

        const result = await response.json();
        setToken(accessToken);
        setEmail(result.email);
        setStatus("ready");
      } catch (error) {
        setStatus("denied");
        setMessage(error instanceof Error ? error.message : "Admin setup is not configured.");
      }
    }

    verifyAdmin();
  }, [router]);

  const value = useMemo<AdminContextValue>(
    () => ({
      token,
      fetchAdmin: (path, init) =>
        fetch(path, {
          ...init,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            ...(init?.headers || {})
          }
        })
    }),
    [token]
  );

  const signOut = async () => {
    const supabase = createBrowserSupabaseClient();
    await supabase.auth.signOut();
    router.replace("/admin/login");
  };

  if (status === "loading") {
    return (
      <section className="grid min-h-[70vh] place-items-center px-4">
        <div className="rounded-[1.5rem] border border-slate-200 bg-white p-8 text-center shadow-sm">
          <Package className="mx-auto h-10 w-10 text-ocean" />
          <p className="mt-4 font-bold text-slate-700">Checking admin access...</p>
        </div>
      </section>
    );
  }

  if (status === "denied") {
    return (
      <section className="grid min-h-[70vh] place-items-center px-4">
        <div className="max-w-md rounded-[1.5rem] border border-slate-200 bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-black text-ink">Access denied</h1>
          <p className="mt-3 text-sm leading-6 text-slate-600">{message}</p>
          <Link
            href="/admin/login"
            className="mt-6 inline-flex min-h-11 items-center justify-center rounded-full bg-ocean px-5 text-sm font-black text-white"
          >
            Back to login
          </Link>
        </div>
      </section>
    );
  }

  return (
    <AdminContext.Provider value={value}>
      <section className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[260px_1fr]">
          <aside className="h-fit rounded-[1.5rem] border border-slate-200 bg-white p-4 shadow-sm">
            <div className="px-2 py-3">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-ocean">Admin</p>
              <h1 className="mt-2 text-xl font-black text-ink">BookAura</h1>
              <p className="mt-1 truncate text-xs font-semibold text-slate-500">{email}</p>
            </div>
            <nav className="mt-3 grid gap-2">
              {adminLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-bold text-slate-600 transition hover:bg-mist hover:text-ocean",
                    pathname === link.href && "bg-ink text-white hover:bg-ink hover:text-white"
                  )}
                >
                  <link.icon className="h-4 w-4" />
                  {link.label}
                </Link>
              ))}
            </nav>
            <button
              type="button"
              onClick={signOut}
              className="mt-4 flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-sm font-bold text-slate-600 transition hover:bg-red-50 hover:text-red-600"
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </button>
          </aside>
          <div>{children}</div>
        </div>
      </section>
    </AdminContext.Provider>
  );
}

export function useAdminApi() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdminApi must be used inside AdminShell");
  }
  return context;
}

"use client";

import { useEffect, useState } from "react";
import { Boxes, Mail, ShoppingBag, Star } from "lucide-react";
import { AdminShell, useAdminApi } from "@/components/admin/admin-shell";
import { AdminStatCard } from "@/components/admin/admin-stat-card";

function DashboardContent() {
  const { fetchAdmin } = useAdminApi();
  const [stats, setStats] = useState({ products: 0, active: 0, orders: 0, messages: 0 });

  useEffect(() => {
    async function loadStats() {
      const [productsResponse, ordersResponse, messagesResponse] = await Promise.all([
        fetchAdmin("/api/admin/products"),
        fetchAdmin("/api/admin/orders"),
        fetchAdmin("/api/admin/messages")
      ]);
      const [productsData, ordersData, messagesData] = await Promise.all([
        productsResponse.json(),
        ordersResponse.json(),
        messagesResponse.json()
      ]);

      setStats({
        products: productsData.products?.length || 0,
        active: productsData.products?.filter((product: { active: boolean }) => product.active).length || 0,
        orders: ordersData.orders?.length || 0,
        messages: messagesData.messages?.length || 0
      });
    }

    loadStats();
  }, [fetchAdmin]);

  return (
    <div>
      <p className="text-sm font-black uppercase tracking-[0.24em] text-ocean">Dashboard</p>
      <h2 className="mt-3 text-3xl font-black tracking-tight text-ink">Store overview</h2>
      <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <AdminStatCard icon={Boxes} label="Total products" value={stats.products} />
        <AdminStatCard icon={Star} label="Active products" value={stats.active} />
        <AdminStatCard icon={ShoppingBag} label="Demo orders" value={stats.orders} />
        <AdminStatCard icon={Mail} label="Messages" value={stats.messages} />
      </div>
    </div>
  );
}

export default function AdminDashboardPage() {
  return (
    <AdminShell>
      <DashboardContent />
    </AdminShell>
  );
}

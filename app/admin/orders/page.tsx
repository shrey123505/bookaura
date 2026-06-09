"use client";

import { useEffect, useState } from "react";
import { AdminShell, useAdminApi } from "@/components/admin/admin-shell";
import { formatCurrency } from "@/lib/utils";

type AdminOrder = {
  id: string;
  customer_name: string;
  customer_email: string;
  status: string;
  total: number;
  created_at: string;
  order_items?: Array<{ id: string; product_title: string; quantity: number; total: number }>;
};

function OrdersContent() {
  const { fetchAdmin } = useAdminApi();
  const [orders, setOrders] = useState<AdminOrder[]>([]);

  useEffect(() => {
    async function loadOrders() {
      const response = await fetchAdmin("/api/admin/orders");
      const result = await response.json();
      setOrders(result.orders || []);
    }

    loadOrders();
  }, [fetchAdmin]);

  return (
    <div>
      <p className="text-sm font-black uppercase tracking-[0.24em] text-ocean">Orders</p>
      <h2 className="mt-3 text-3xl font-black tracking-tight text-ink">Demo orders</h2>
      <div className="mt-8 grid gap-4">
        {orders.map((order) => (
          <div key={order.id} className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex flex-col justify-between gap-3 sm:flex-row">
              <div>
                <h3 className="font-black text-ink">{order.customer_name}</h3>
                <p className="mt-1 text-sm text-slate-600">{order.customer_email}</p>
              </div>
              <div className="text-left sm:text-right">
                <p className="text-lg font-black text-ink">{formatCurrency(Number(order.total))}</p>
                <p className="text-xs font-bold uppercase tracking-wide text-slate-500">{order.status}</p>
              </div>
            </div>
            <div className="mt-4 grid gap-2 text-sm text-slate-600">
              {(order.order_items || []).map((item) => (
                <div key={item.id} className="flex justify-between gap-3 rounded-2xl bg-slate-50 px-4 py-3">
                  <span>{item.product_title} × {item.quantity}</span>
                  <span>{formatCurrency(Number(item.total))}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
        {!orders.length && <p className="rounded-[1.5rem] bg-white p-6 text-sm font-bold text-slate-600 shadow-sm">No orders yet.</p>}
      </div>
    </div>
  );
}

export default function AdminOrdersPage() {
  return (
    <AdminShell>
      <OrdersContent />
    </AdminShell>
  );
}

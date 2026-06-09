import { NextRequest, NextResponse } from "next/server";
import { createAdminSupabaseClient, hasSupabaseAdminEnv } from "@/lib/supabase/admin";

type CheckoutItem = {
  product: {
    id: string;
    title: string;
    price: number;
  };
  quantity: number;
};

export async function POST(request: NextRequest) {
  if (!hasSupabaseAdminEnv()) {
    return NextResponse.json(
      { error: "Supabase is not configured. Add env vars before creating demo orders." },
      { status: 503 }
    );
  }

  const body = await request.json();
  const items = (body.items || []) as CheckoutItem[];

  if (!items.length) {
    return NextResponse.json({ error: "Cart is empty." }, { status: 400 });
  }

  const customerName = String(body.customerName || "BookAura Demo Customer").trim();
  const customerEmail = String(body.customerEmail || "demo@bookaura.store").trim();
  const customerPhone = body.customerPhone ? String(body.customerPhone).trim() : null;
  const total = items.reduce(
    (sum, item) => sum + Number(item.product.price) * Number(item.quantity),
    0
  );

  const supabase = createAdminSupabaseClient();
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert({
      customer_name: customerName,
      customer_email: customerEmail,
      customer_phone: customerPhone,
      total,
      status: "demo"
    })
    .select("id")
    .single();

  if (orderError || !order) {
    return NextResponse.json({ error: orderError?.message || "Order failed." }, { status: 500 });
  }

  const orderItems = items.map((item) => ({
    order_id: order.id,
    product_id: item.product.id,
    product_title: item.product.title,
    quantity: Number(item.quantity),
    unit_price: Number(item.product.price),
    total: Number(item.product.price) * Number(item.quantity)
  }));

  const { error: itemsError } = await supabase.from("order_items").insert(orderItems);

  if (itemsError) {
    return NextResponse.json({ error: itemsError.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, orderId: order.id });
}

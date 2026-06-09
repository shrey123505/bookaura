import { NextRequest, NextResponse } from "next/server";
import { createAdminSupabaseClient, hasSupabaseAdminEnv } from "@/lib/supabase/admin";

export async function POST(request: NextRequest) {
  if (!hasSupabaseAdminEnv()) {
    return NextResponse.json(
      { error: "Supabase is not configured. Add env vars before saving contact messages." },
      { status: 503 }
    );
  }

  const body = await request.json();
  const payload = {
    first_name: String(body.firstName || "").trim(),
    last_name: String(body.lastName || "").trim(),
    email: String(body.email || "").trim(),
    topic: String(body.topic || "Product recommendation").trim(),
    message: String(body.message || "").trim()
  };

  if (!payload.first_name || !payload.email || !payload.message) {
    return NextResponse.json(
      { error: "First name, email, and message are required." },
      { status: 400 }
    );
  }

  const supabase = createAdminSupabaseClient();
  const { error } = await supabase.from("contact_messages").insert(payload);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

import { NextRequest, NextResponse } from "next/server";
import { createAdminSupabaseClient, hasSupabaseAdminEnv } from "@/lib/supabase/admin";

export type AdminAuthResult =
  | { ok: true; email: string }
  | { ok: false; response: NextResponse };

function getAllowedAdminEmails() {
  return (process.env.ADMIN_EMAILS || "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

export async function isApprovedAdminEmail(email: string) {
  const normalizedEmail = email.toLowerCase();
  const allowedEmails = getAllowedAdminEmails();

  if (allowedEmails.includes(normalizedEmail)) {
    return true;
  }

  if (!hasSupabaseAdminEnv()) {
    return false;
  }

  const supabase = createAdminSupabaseClient();
  const { data, error } = await supabase
    .from("admin_users")
    .select("email")
    .eq("email", normalizedEmail)
    .maybeSingle();

  return !error && Boolean(data);
}

export async function requireAdmin(request: NextRequest): Promise<AdminAuthResult> {
  if (!hasSupabaseAdminEnv()) {
    return {
      ok: false,
      response: NextResponse.json(
        { error: "Supabase admin environment variables are not configured." },
        { status: 500 }
      )
    };
  }

  const authorization = request.headers.get("authorization");
  const token = authorization?.startsWith("Bearer ") ? authorization.slice("Bearer ".length) : "";

  if (!token) {
    return {
      ok: false,
      response: NextResponse.json({ error: "Missing admin session." }, { status: 401 })
    };
  }

  const supabase = createAdminSupabaseClient();
  const { data, error } = await supabase.auth.getUser(token);
  const email = data.user?.email;

  if (error || !email) {
    return {
      ok: false,
      response: NextResponse.json({ error: "Invalid admin session." }, { status: 401 })
    };
  }

  const isAdmin = await isApprovedAdminEmail(email);

  if (!isAdmin) {
    return {
      ok: false,
      response: NextResponse.json({ error: "Access denied." }, { status: 403 })
    };
  }

  return { ok: true, email };
}

export function adminNotConfiguredResponse() {
  return NextResponse.json(
    { error: "Supabase service role key is required for this operation." },
    { status: 500 }
  );
}

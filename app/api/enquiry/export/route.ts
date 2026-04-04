import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Converts an array of objects to a CSV string
function toCSV(rows: Record<string, any>[]): string {
  if (rows.length === 0) return "";

  const headers = ["id", "name", "phone", "email", "course_name", "message", "created_at"];
  const escape = (val: any) => {
    const str = val == null ? "" : String(val);
    // Wrap in quotes if it contains commas, newlines or quotes
    return str.includes(",") || str.includes("\n") || str.includes('"')
      ? `"${str.replace(/"/g, '""')}"`
      : str;
  };

  const headerRow = headers.join(",");
  const dataRows = rows.map((row) => headers.map((h) => escape(row[h])).join(","));
  return [headerRow, ...dataRows].join("\n");
}

export async function GET(req: NextRequest) {
  // --- Auth check ---
  const authHeader = req.headers.get("authorization") ?? "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;
  const expectedKey = process.env.ADMIN_EXPORT_KEY;

  if (!expectedKey) {
    console.error("[export] ADMIN_EXPORT_KEY is not set.");
    return NextResponse.json({ ok: false, message: "Server misconfiguration." }, { status: 500 });
  }

  if (!token || token !== expectedKey) {
    return NextResponse.json({ ok: false, message: "Unauthorized." }, { status: 401 });
  }

  // --- Fetch enquiries ---
  const { data, error } = await supabaseAdmin
    .from("enquiries")
    .select("id, name, phone, email, course_name, message, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[export] Supabase fetch error:", error);
    return NextResponse.json({ ok: false, message: "Failed to fetch enquiries." }, { status: 500 });
  }

  const csv = toCSV(data ?? []);
  const filename = `enquiries-${new Date().toISOString().split("T")[0]}.csv`;

  return new NextResponse(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}

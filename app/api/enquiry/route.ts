import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Use service role key — bypasses RLS for server-side writes only.
// NEVER expose this key to the client.
const supabaseAdmin = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);


export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, email, courseName, message } = body;

    // Validate required fields
    if (!name || !phone || !email || !courseName) {
      return NextResponse.json(
        { ok: false, message: "Name, phone, email and course are required." },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { ok: false, message: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    const { error } = await supabaseAdmin.from("enquiries").insert([
      {
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim().toLowerCase(),
        course_name: courseName.trim(),
        message: message?.trim() ?? "",
      },
    ]);

    if (error) {
      console.error("[enquiry] Supabase insert error:", error);
      return NextResponse.json(
        { ok: false, message: "Failed to submit enquiry. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true, message: "Enquiry submitted successfully." });
  } catch (err) {
    console.error("[enquiry] Unexpected error:", err);
    return NextResponse.json(
      { ok: false, message: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}

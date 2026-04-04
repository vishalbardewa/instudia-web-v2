import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import { buildEnquiryEmailHtml } from "@/app/_utils/emailTemplates";

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// Use service role key — bypasses RLS for server-side writes only.
const supabaseAdmin = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, leadSource } = body;

    // Validate required fields
    if (!name || !email || !phone) {
      return NextResponse.json(
        { ok: false, message: "Name, email, and phone are required to unlock access." },
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

    // Phone validation
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
      return NextResponse.json(
        { ok: false, message: "Please provide a valid 10-digit phone number." },
        { status: 400 }
      );
    }

    const courseStr = leadSource ? `LEAD MAGNET: ${leadSource}` : "LEAD MAGNET: Free Masterclass";

    // 1. Insert into Supabase
    const { error: dbError } = await supabaseAdmin.from("enquiries").insert([
      {
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim().toLowerCase(),
        course_name: courseStr,
        message: "Opted-in via Free Masterclass funnel.",
      },
    ]);

    if (dbError) {
      console.error("[lead] Supabase insert error:", dbError);
      return NextResponse.json(
        { ok: false, message: "Failed to unlock class. Please try again." },
        { status: 500 }
      );
    }

    // 2. Send Email Notification via Resend
    try {
      const emailHtml = buildEnquiryEmailHtml({
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim().toLowerCase(),
        courseName: courseStr,
        message: "User just unlocked the free masterclass!",
        submittedAt: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
      });

      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || "notifications@instudianagaland.com",
        to: "instudia.nagaland@gmail.com",
        subject: `🔥 New Lead Unlocked Masterclass: ${name.trim()}`,
        html: emailHtml,
      });
    } catch (emailErr) {
      console.error("[lead] Email notification failed:", emailErr);
    }

    return NextResponse.json({ ok: true, message: "Masterclass unlocked successfully." });
  } catch (err) {
    console.error("[lead] Unexpected error:", err);
    return NextResponse.json(
      { ok: false, message: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}

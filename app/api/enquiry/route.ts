import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import { buildEnquiryEmailHtml } from "@/app/_utils/emailTemplates";

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

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

    // 1. Insert into Supabase
    const { error: dbError } = await supabaseAdmin.from("enquiries").insert([
      {
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim().toLowerCase(),
        course_name: courseName.trim(),
        message: message?.trim() ?? "",
      },
    ]);

    if (dbError) {
      console.error("[enquiry] Supabase insert error:", dbError);
      return NextResponse.json(
        { ok: false, message: "Failed to submit enquiry. Please try again." },
        { status: 500 }
      );
    }

    // 2. Send Email Notification via Resend (async, don't block response)
    try {
      const emailHtml = buildEnquiryEmailHtml({
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim().toLowerCase(),
        courseName: courseName.trim(),
        message: message?.trim() ?? "",
        submittedAt: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
      });

      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || "notifications@instudianagaland.com",
        to: "instudia.nagaland@gmail.com",
        subject: `New Enquiry: ${name.trim()} - ${courseName.trim()}`,
        html: emailHtml,
      });
    } catch (emailErr) {
      // Log email error but don't fail the request (the data is already in DB)
      console.error("[enquiry] Email notification failed:", emailErr);
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

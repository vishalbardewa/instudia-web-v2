import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { buildReviewEmailHtml } from "@/app/_utils/emailTemplates";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      name,
      role = "student",
      course,
      rating,
      smartTags = [],
      feedback = "",
      phone = "",
      email = "",
      honeypot = "",
      website = "",
    } = body;

    // 1. Silent discard for bots triggering the hidden honeypot
    if (honeypot || website) {
      return NextResponse.json({
        ok: true,
        message: "Thank you for your submission.",
      });
    }

    // 2. Validate essential fields
    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json(
        { ok: false, message: "Please provide your name." },
        { status: 400 }
      );
    }

    if (!course || typeof course !== "string" || !course.trim()) {
      return NextResponse.json(
        { ok: false, message: "Please select or specify a course." },
        { status: 400 }
      );
    }

    const numericRating = Number(rating);
    if (!numericRating || numericRating < 1 || numericRating > 5) {
      return NextResponse.json(
        { ok: false, message: "Please provide a valid star rating (1–5)." },
        { status: 400 }
      );
    }

    // 3. Format timestamp in Indian Standard Time (Asia/Kolkata)
    const submittedAt = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
      timeStyle: "short",
    });

    const roleTitle = role === "parent" ? "Parent" : "Student";
    const subject = `⭐ [${numericRating}★ Google Review] ${name.trim()} (${roleTitle}) — ${course.trim()}`;

    const emailHtml = buildReviewEmailHtml({
      type: "positive_review",
      name: name.trim(),
      role: role === "parent" ? "parent" : "student",
      course: course.trim(),
      rating: numericRating,
      smartTags: Array.isArray(smartTags) ? smartTags : [],
      feedback: feedback.trim(),
      phone: phone.trim() || undefined,
      email: email.trim() || undefined,
      submittedAt,
    });

    // 4. Dispatch Email via Resend
    const adminEmail = process.env.ADMIN_EMAIL || "instudia.nagaland@gmail.com";
    const fromEmail =
      process.env.RESEND_FROM_EMAIL || "notifications@instudianagaland.com";

    const emailResult = await resend.emails.send({
      from: fromEmail,
      to: adminEmail,
      subject,
      html: emailHtml,
    });

    if (emailResult.error) {
      console.error("[review-api] Resend email dispatch error:", emailResult.error);
      // Still return success to user so the client-side Google Review flow isn't blocked by email failure
      return NextResponse.json({
        ok: true,
        message: "Your review was processed successfully.",
        emailDispatched: false,
      });
    }

    return NextResponse.json({
      ok: true,
      message: "Thank you! Your feedback has been recorded.",
      emailDispatched: true,
    });
  } catch (err) {
    console.error("[review-api] Internal server error:", err);
    return NextResponse.json(
      { ok: false, message: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}


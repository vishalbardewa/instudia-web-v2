import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { buildHostSeminarEmailHtml } from "@/app/_utils/emailTemplates";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      institutionName,
      contactPerson,
      designation,
      email,
      phone,
      institutionType,
      preferredTrack,
      deliveryFormat,
      estimatedAudience,
      preferredDate,
      message,
    } = body;

    // Validate essential required fields
    if (!institutionName || !contactPerson || !email || !phone) {
      return NextResponse.json(
        { ok: false, message: "Please provide Institution Name, Contact Person, Email, and Phone number." },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json(
        { ok: false, message: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    // Phone validation
    const cleanPhone = phone.replace(/\D/g, "");
    if (cleanPhone.length < 10) {
      return NextResponse.json(
        { ok: false, message: "Please provide a valid 10-digit contact number." },
        { status: 400 }
      );
    }

    // Dispatch Email via Resend directly to Gmail
    const submittedAt = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
    const emailHtml = buildHostSeminarEmailHtml({
      institutionName: institutionName.trim(),
      contactPerson: contactPerson.trim(),
      designation: designation?.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      institutionType: institutionType || "Educational Institution",
      preferredTrack: preferredTrack || "AI & Digital Productivity",
      deliveryFormat: deliveryFormat || "Half-Day Keynote",
      estimatedAudience: estimatedAudience || "100+ Participants",
      preferredDate: preferredDate?.trim(),
      message: message?.trim(),
      submittedAt,
    });

    const emailResult = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "notifications@instudianagaland.com",
      to: "instudia.nagaland@gmail.com",
      subject: `Institutional Host Request: ${institutionName.trim()} (${preferredTrack || "Seminar"})`,
      html: emailHtml,
    });

    if (emailResult.error) {
      console.error("[host-seminar] Resend error:", emailResult.error);
      return NextResponse.json(
        { ok: false, message: "Failed to dispatch notification email. Please try WhatsApp directly." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ok: true,
      message: "Your seminar hosting request has been received. Our team will contact you within 24 hours.",
    });
  } catch (err) {
    console.error("[host-seminar] Server error:", err);
    return NextResponse.json(
      { ok: false, message: "An error occurred while submitting your request. Please try again." },
      { status: 500 }
    );
  }
}

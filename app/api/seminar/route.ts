import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, phone, question, answer } = body;

    // Validate required fields
    if (!email || !phone) {
      return NextResponse.json(
        { ok: false, message: "Email and phone are required." },
        { status: 400 }
      );
    }

    // Email Notification via Resend
    const emailHtml = `
      <div style="font-family: sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #6366f1;">New Seminar Material Access Request</h2>
        <p>A student has just unlocked the seminar material.</p>
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold; width: 30%;">Email:</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${email}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Phone:</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${phone}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Security Question:</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${question}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Their Answer:</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${answer}</td>
          </tr>
        </table>
        <p style="margin-top: 30px; font-size: 12px; color: #888;">
          Submitted at: ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}
        </p>
      </div>
    `;

    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "notifications@instudianagaland.com",
      to: "instudia.nagaland@gmail.com",
      subject: `New Seminar Material Downloaded: ${email}`,
      html: emailHtml,
    });

    return NextResponse.json({ ok: true, message: "Submitted successfully." });
  } catch (err) {
    console.error("[seminar] Unexpected error:", err);
    return NextResponse.json(
      { ok: false, message: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}

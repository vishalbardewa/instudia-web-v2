import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getSupabaseAdmin() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

function generateCertificateId(): string {
  const year = new Date().getFullYear();
  const randomPart = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `INS-${year}-${randomPart}`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      name,
      email,
      phone,
      rating,
      courseInterest = "",
      feedback = "",
      campus,
      campusSlug,
      date,
      topic,
      website = "",
    } = body;

    // Silent discard for bots triggering the hidden honeypot
    if (website) {
      return NextResponse.json({
        ok: true,
        certificateId: generateCertificateId(),
        message: "Thank you for your submission.",
      });
    }

    // Validate required student fields
    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json(
        { ok: false, message: "Please enter your full name for the certificate." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== "string" || !emailRegex.test(email.trim())) {
      return NextResponse.json(
        { ok: false, message: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const cleanPhone = String(phone || "")
      .replace(/[\s\-()+]/g, "")
      .slice(-10);
    if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
      return NextResponse.json(
        { ok: false, message: "Please enter a valid 10-digit mobile number." },
        { status: 400 }
      );
    }

    const numericRating = Number(rating);
    if (!numericRating || numericRating < 1 || numericRating > 5) {
      return NextResponse.json(
        { ok: false, message: "Please select a star rating between 1 and 5." },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanCampus = String(campus || campusSlug || "Campus Seminar").trim();
    const cleanCampusSlug = String(campusSlug || "").trim().toLowerCase();
    const cleanDate = String(date || new Date().toISOString().split("T")[0]).trim();
    const cleanTopic = String(topic || "Career & Tech Seminar").trim();

    const supabaseAdmin = getSupabaseAdmin();

    // 1. Check for existing submission (same email OR phone for this seminar session)
    if (supabaseAdmin) {
      const { data: existing, error: lookupError } = await supabaseAdmin
        .from("seminar_feedback")
        .select("certificate_id, name, campus, seminar_date, seminar_topic")
        .eq("campus_slug", cleanCampusSlug)
        .eq("seminar_date", cleanDate)
        .eq("seminar_topic", cleanTopic)
        .or(`email.eq.${cleanEmail},phone.eq.${cleanPhone}`)
        .limit(1)
        .maybeSingle();

      if (lookupError) {
        console.error("[seminar-feedback] Duplicate lookup error:", lookupError);
      } else if (existing) {
        return NextResponse.json({
          ok: true,
          alreadySubmitted: true,
          certificateId: existing.certificate_id,
          name: existing.name,
          campus: existing.campus,
          date: existing.seminar_date,
          topic: existing.seminar_topic,
          message:
            "You have already submitted feedback for this seminar. Downloading your original certificate.",
        });
      }
    }

    const certificateId = generateCertificateId();
    const submittedAt = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
      timeStyle: "short",
    });

    const record = {
      certificate_id: certificateId,
      campus: cleanCampus,
      campus_slug: cleanCampusSlug,
      seminar_date: cleanDate,
      seminar_topic: cleanTopic,
      name: name.trim(),
      email: cleanEmail,
      phone: cleanPhone,
      rating: numericRating,
      course_interest: String(courseInterest || "").trim(),
      feedback: String(feedback || "").trim(),
    };

    const tasks: Promise<{ target: string; ok: boolean; error?: unknown }>[] = [];

    // 2. Write to Supabase
    if (supabaseAdmin) {
      tasks.push(
        (async () => {
          const { error } = await supabaseAdmin
            .from("seminar_feedback")
            .insert([record]);
          if (error) {
            console.error("[seminar-feedback] Supabase insert error:", error);
            return { target: "supabase", ok: false, error };
          }
          return { target: "supabase", ok: true };
        })()
      );
    }

    // 2. Sync to Google Sheet via Apps Script Webhook
    const sheetWebhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL;
    if (sheetWebhookUrl) {
      tasks.push(
        (async () => {
          try {
            const res = await fetch(sheetWebhookUrl, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                submittedAt,
                certificateId: record.certificate_id,
                campus: record.campus,
                date: record.seminar_date,
                topic: record.seminar_topic,
                name: record.name,
                email: record.email,
                phone: record.phone,
                rating: record.rating,
                courseInterest: record.course_interest,
                feedback: record.feedback,
              }),
            });
            if (!res.ok) {
              const text = await res.text();
              console.error("[seminar-feedback] Sheet webhook error:", res.status, text);
              return { target: "sheets", ok: false, error: text };
            }
            return { target: "sheets", ok: true };
          } catch (err) {
            console.error("[seminar-feedback] Sheet webhook fetch failed:", err);
            return { target: "sheets", ok: false, error: err };
          }
        })()
      );
    }

    const results = await Promise.all(tasks);
    const anySucceeded = results.length === 0 || results.some((r) => r.ok);

    if (!anySucceeded) {
      return NextResponse.json(
        {
          ok: false,
          message: "Could not save your feedback right now. Please try again.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ok: true,
      certificateId,
      campus: record.campus,
      date: record.seminar_date,
      topic: record.seminar_topic,
      name: record.name,
      synced: {
        supabase: results.find((r) => r.target === "supabase")?.ok ?? false,
        sheets: results.find((r) => r.target === "sheets")?.ok ?? false,
      },
    });
  } catch (err) {
    console.error("[seminar-feedback] Unexpected error:", err);
    return NextResponse.json(
      { ok: false, message: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}


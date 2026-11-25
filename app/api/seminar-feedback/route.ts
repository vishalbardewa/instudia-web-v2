import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { google } from "googleapis";

const SPREADSHEET_ID =
  process.env.GOOGLE_SHEET_ID || "1CGcvOhNduvkwOYAtcG5v3lzJUnxUu8XbtGULdylDhiI";

const SHEET_HEADERS = [
  "Submitted At",
  "Certificate ID",
  "Campus",
  "Seminar Date",
  "Topic",
  "Student Name",
  "Email",
  "Phone",
  "Rating (1-5)",
  "Course Interest",
  "Feedback",
];

function getSupabaseAdmin() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

function getGoogleSheetsClient() {
  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY;
  if (!clientEmail || !privateKey) return null;
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: clientEmail,
        // .env files turn \n into literal newlines; handle both cases
        private_key: privateKey.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });
    return google.sheets({ version: "v4", auth });
  } catch (err) {
    console.error("[seminar-feedback] Failed to init Google Sheets client:", err);
    return null;
  }
}

async function appendToSheet(
  sheets: ReturnType<typeof google.sheets>,
  row: (string | number)[]
): Promise<{ ok: boolean; error?: unknown }> {
  try {
    // Check if sheet already has headers (row 1)
    const headerCheck = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: "Sheet1!A1:K1",
    });

    const firstRow = headerCheck.data.values?.[0];
    if (!firstRow || firstRow.length === 0) {
      // Write headers first
      await sheets.spreadsheets.values.update({
        spreadsheetId: SPREADSHEET_ID,
        range: "Sheet1!A1:K1",
        valueInputOption: "RAW",
        requestBody: { values: [SHEET_HEADERS] },
      });
    }

    // Append the data row
    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: "Sheet1!A:K",
      valueInputOption: "USER_ENTERED",
      insertDataOption: "INSERT_ROWS",
      requestBody: { values: [row] },
    });

    return { ok: true };
  } catch (err) {
    console.error("[seminar-feedback] Google Sheets append error:", err);
    return { ok: false, error: err };
  }
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

    // 3. Write directly to Google Sheets via Service Account
    const sheetsClient = getGoogleSheetsClient();
    if (sheetsClient) {
      tasks.push(
        (async () => {
          const row = [
            submittedAt,
            record.certificate_id,
            record.campus,
            record.seminar_date,
            record.seminar_topic,
            record.name,
            record.email,
            record.phone,
            record.rating,
            record.course_interest,
            record.feedback,
          ];
          const result = await appendToSheet(sheetsClient, row);
          return { target: "sheets", ...result };
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


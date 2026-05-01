import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
// We attempt to use the SERVICE_ROLE_KEY to bypass RLS for server-side operations if it exists,
// otherwise fallback to the standard ANON_KEY.
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

export async function POST(req: Request) {
  try {
    if (!supabaseUrl || !supabaseKey) {
      console.warn("Supabase credentials not configured.");
      return NextResponse.json({ success: false, message: "DB not configured" });
    }

    const supabaseAdmin = createClient(supabaseUrl, supabaseKey);
    const data = await req.json();
    
    if (!data.sessionId) {
      return NextResponse.json({ error: "sessionId is required" }, { status: 400 });
    }

    // Upsert the data based on session_id
    // This allows us to progressively build the profile as they complete different widgets
    const { error } = await supabaseAdmin
      .from('career_profiles')
      .upsert({
        session_id: data.sessionId,
        ...(data.email !== undefined && { email: data.email }),
        ...(data.quizScores !== undefined && { quiz_scores: data.quizScores }),
        ...(data.problemMatch !== undefined && { problem_match: data.problemMatch }),
        ...(data.planA !== undefined && { plan_a: data.planA }),
        ...(data.planB !== undefined && { plan_b: data.planB }),
        ...(data.planZ !== undefined && { plan_z: data.planZ }),
        ...(data.analysis !== undefined && { ai_analysis: data.analysis }),
        updated_at: new Date().toISOString(),
      }, { onConflict: 'session_id' });

    if (error) {
      console.error("Supabase Error saving career profile:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Profile Save API Error:", error);
    return NextResponse.json({ error: "Failed to save profile." }, { status: 500 });
  }
}

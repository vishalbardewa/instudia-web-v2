import { NextResponse } from 'next/server';
import { logError } from '@/app/utils/logger';

export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const { sourceText, targetGrade } = await req.json();

    const apiKey = process.env.NVIDIA_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'NVIDIA_API_KEY is not configured.' }, { status: 500 });
    }

    const systemPrompt = `You are an Assessment Design Specialist. 
    You do NOT output JSON. You output a structured document using specific TAGS.
    This ensures we can stream the response reliably to the user.

    REQUIRED TAGS (Repeat for each of the 10 questions):
    [TITLE] - The overall title of the quiz.
    [Q_START] - Marks the beginning of a question block.
    [TYPE] - Question type (Recall, Application, or Analysis).
    [QUESTION] - The question text.
    [OPTIONS_A] - Text for Option A.
    [OPTIONS_B] - Text for Option B.
    [OPTIONS_C] - Text for Option C.
    [OPTIONS_D] - Text for Option D.
    [CORRECT] - The letter (A, B, C, or D).
    [HINT] - A one-sentence clue.
    [RATIONALE] - Detailed explanation of why the answer is correct.
    [Q_END] - Marks the end of a question block.

    You are an expert in the Indian Education System (CBSE, ICSE, State Boards, and UGC standards).`;

    const userPrompt = `
    Source Material:
    ${sourceText}

    Target Grade/Standard:
    ${targetGrade} (Within the Indian Education System context)

    Task:
    Generate a high-quality, 10-question quiz based strictly on the provided source material.
    Test both literal comprehension and higher-order application of the concepts.

    Question Mix:
    * 4 Recall questions (Basic facts/definitions).
    * 4 Application questions (Applying a concept to a new scenario).
    * 2 Analysis questions (Comparing ideas or identifying cause-effect).

    Tone: Academic, clear, and age-appropriate for ${targetGrade}.
    Ensure the terminology and framing align with Indian pedagogical standards.

    FOLLOW THE TAG FORMAT STRICTLY. GENERATE EXACTLY 10 QUESTIONS.`;

    const response = await fetch("https://integrate.api.nvidia.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "meta/llama-3.1-70b-instruct",
        temperature: 0.3, 
        max_tokens: 4096,
        stream: true,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ]
      }),
    });

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      console.error('NVIDIA API Error in Assessment', data);
      return NextResponse.json({ error: "We encountered an issue generating your assessment. Please try again." }, { status: 500 });
    }

    // Proxy the Server-Sent Events stream directly to the client
    return new Response(response.body, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });

  } catch (error: any) {
    console.error('Assessment Generation Error', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}


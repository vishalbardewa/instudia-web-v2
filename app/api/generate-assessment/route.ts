import { NextResponse } from 'next/server';
import { logError } from '@/app/utils/logger';

export const maxDuration = 180; // 3-minute generation threshold

export async function POST(req: Request) {
  try {
    const { sourceText, targetGrade } = await req.json();

    const apiKey = process.env.NVIDIA_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'NVIDIA_API_KEY is not configured.' }, { status: 500 });
    }

    const systemPrompt = `You are an Assessment Design Specialist perfectly adhering to JSON schemas.
You do not generate conversational text, markdown formatting blocks, or backticks.
Your entire response must parse successfully using JSON.parse().
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

    Structure for Each Question:
    * Question: Clear and concise.
    * Options: Provide 4 plausible options (A, B, C, D). Only one must be correct.
    * Hint: A one-sentence clue that guides the student's thinking without giving away the answer.
    * Rationale: A brief explanation for why the correct answer is right, citing the logic from the text.
    * Tone: Academic, clear, and age-appropriate for ${targetGrade}.

    Ensure the terminology and framing align with Indian pedagogical standards (e.g., using Indian contexts where applicable, Bloom's Taxonomy).

    OUTPUT ONLY THIS EXACT JSON STRUCTURE FILLED WITH CALIBRATED DATA:
    {
      "quizTitle": "Brief descriptive title of the quiz",
      "questions": [
        {
          "type": "Recall",
          "question": "The question text here?",
          "options": {
            "A": "Option A text",
            "B": "Option B text",
            "C": "Option C text",
            "D": "Option D text"
          },
          "correctAnswer": "A",
          "hint": "Guided thinking clue.",
          "rationale": "Detailed explanation of why A is correct based on the text."
        }
      ]
    }
    (Repeat for all 10 questions, maintaining the specified mix).`;

    const response = await fetch("https://integrate.api.nvidia.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "meta/llama-3.1-70b-instruct",
        temperature: 0.3, // Slightly higher for creativity in application scenarios
        max_tokens: 3000,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ]
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      await logError('NVIDIA API Error in Assessment', data);
      throw new Error("We encountered an issue generating your assessment. Please try again.");
    }

    let jsonString = data.choices?.[0]?.message?.content;
    if (!jsonString) throw new Error("Empty response returned from LLM.");
    
    // Clean up potential markdown blocks if LLM failed to follow "JSON only" instruction
    jsonString = jsonString.replace(/```json/gi, '').replace(/```/g, '').trim();

    try {
      const parsedQuiz = JSON.parse(jsonString);
      return NextResponse.json(parsedQuiz);
    } catch (parseError) {
      await logError('JSON Parse Error in Assessment', { parseError, jsonString });
      throw new Error("The AI generated an invalid set of questions. Please try again.");
    }

  } catch (error: any) {
    await logError('Assessment Generation Error', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}

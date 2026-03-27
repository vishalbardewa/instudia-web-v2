import { NextResponse } from 'next/server';

export const maxDuration = 180; // Allow full 3-minute generation threshold for Qwen LLMs

export async function POST(req: Request) {
  try {
    const { cvText, jdText } = await req.json();

    const apiKey = process.env.NVIDIA_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'NVIDIA_API_KEY is not configured.' }, { status: 500 });
    }

    const systemPrompt = `You are a pure JSON API ATS Scanner perfectly adhering to JSON schemas. You do not generate conversational text, markdown formatting blocks, or backticks. Your entire response must parse successfully using JSON.parse().`;
    
    // Explicit instructional prompt for deep technical parsing
    const userPrompt = `You are an expert Senior Technical Recruiter and Applicant Tracking System (ATS) Parser parser machine.
    
    Job Description:
    ${jdText}

    Candidate Resume:
    ${cvText}

    Task: Analyze the Candidate Resume against the Job Description specifically checking for standard ATS filtering algorithms.
    1. Parse-ability: Did they use standard sectioning ('Work Experience', 'Education')? Is the format parsable?
    2. Keyword Density: Find critical missing technical and soft-skill keywords natively present in the JD.
    3. Actionable Feedback: Direct, authoritative instructions on how to improve the score.

    OUTPUT ONLY THIS EXACT JSON STRUCTURE FILLED WITH CALIBRATED DATA:
    {
      "overallScore": 85,
      "parseability": {
        "status": "Pass",
        "feedback": "Standard chronological formatting detected."
      },
      "keywordMatch": {
        "score": 78,
        "missingKeywords": ["Redux", "AWS", "Docker"],
        "foundKeywords": ["React", "TypeScript", "Node.js"]
      },
      "sectioning": {
        "status": "Pass",
        "feedback": "Clear 'Education' and 'Experience' sections successfully mapped."
      },
      "actionableFeedback": [
        "Add explicit mention of AWS deployment experience.",
        "Quantify your impact in the latest role using metrics.",
        "Ensure standard chronological ordering is maintained."
      ]
    }`;

    const response = await fetch("https://integrate.api.nvidia.com/v1/chat/completions", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "qwen/qwen3.5-122b-a10b",
        temperature: 0.1, // Strict precision token locking
        max_tokens: 1500,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ]
      }),
    });

    const data = await response.json();
    if (!response.ok) {
       let msg = data?.error?.message || data?.detail || JSON.stringify(data);
       throw new Error(`NVIDIA API Error: ${msg}`);
    }

    let jsonString = data.choices?.[0]?.message?.content;
    if (!jsonString) throw new Error("Empty response returned from LLM.");
    jsonString = jsonString.replace(/```json/gi, '').replace(/```/g, '').trim();

    return NextResponse.json(JSON.parse(jsonString));
  } catch (error: any) {
    console.error('ATS Analysis Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}

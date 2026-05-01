import { NextResponse } from 'next/server';

export const maxDuration = 180;

export async function POST(req: Request) {
  try {
    const { planA, planB, planZ } = await req.json();

    const apiKey = process.env.NVIDIA_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: 'NVIDIA_API_KEY is not configured.' }, { status: 500 });
    }

    const systemPrompt = "You are an expert career counselor based in Nagaland, India, trained in the 80,000 Hours framework. You must strictly return ONLY raw JSON without any markdown formatting wrappers or backticks.";
    const userPrompt = `A youth from Nagaland has submitted their A/B/Z Career Plan.
    Plan A (Ambitious Goal): ${planA}
    Plan B (Pivot): ${planB}
    Plan Z (Lifeboat): ${planZ}

    Task: Analyze this A/B/Z plan. Evaluate the robustness of their safety nets, the viability of their pivot, and how well they are building "Career Capital". Keep the tone highly encouraging, modern, and constructive.

    Return ONLY a raw JSON object exactly matching this structure:
    {
      "strengths": "[A brief 2-sentence summary of what is strong or well-thought-out in this plan]",
      "weaknesses": "[A brief 2-sentence constructive critique on potential blind spots, risk, or vague assumptions]",
      "actionStep": "[One highly specific, immediate 'cheap test' action step they should take within 48 hours to validate Plan A]"
    }`;

    const response = await fetch("https://integrate.api.nvidia.com/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: "meta/llama-3.1-70b-instruct",
        temperature: 0.3, 
        max_tokens: 1000,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ]
      }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error?.message || 'Failed to fetch from API');

    const jsonString = data.choices[0].message.content.replace(/```json/gi, '').replace(/```/g, '').trim();
    
    let parsedData;
    try {
      parsedData = JSON.parse(jsonString);
    } catch (e) {
      // Attempt to extract object if the model output conversational text around it
      const start = jsonString.indexOf('{');
      const end = jsonString.lastIndexOf('}');
      if (start !== -1 && end !== -1) {
        parsedData = JSON.parse(jsonString.substring(start, end + 1));
      } else {
        throw new Error('Failed to parse JSON from AI response');
      }
    }
    
    return NextResponse.json(parsedData);
  } catch (error: any) {
    console.error('AI Analysis Error:', error);
    return NextResponse.json({ error: "We couldn't analyze your plan at this moment." }, { status: 500 });
  }
}

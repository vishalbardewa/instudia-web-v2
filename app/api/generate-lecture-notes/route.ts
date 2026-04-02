import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const { sourceText, targetGrade } = await req.json();

    const apiKey = process.env.NVIDIA_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'NVIDIA_API_KEY is not configured.' }, { status: 500 });
    }

    const systemPrompt = `You are an expert Pedagogical Assistant. Your task is to transform provided text into high-quality "Guided Lecture Notes".
    Instead of JSON, you will output a structured Markdown document using specific SECTION TAGS. 
    This is to ensure absolute reliability in the presentation format.

    IMPORTANT: DO NOT use decorative separators like "=====" or "-----" between sections. Just follow the tag format strictly.

    REQUIRED TAGS:
    [TITLE] - The title of the lecture.
    [INTRO] - The introductory hook.
    [PILLAR_1_TITLE] - Title of the first core pillar.
    [PILLAR_1_CONTENT] - Content for the first core pillar.
    [PILLAR_2_TITLE] - Title of the second core pillar.
    [PILLAR_2_CONTENT] - Content for the second core pillar.
    [PILLAR_3_TITLE] - Title of the third core pillar.
    [PILLAR_3_CONTENT] - Content for the third core pillar.
    [CHEATSHEET] - Analogies and FAQs for the teacher.
    [DISCUSSION] - Interactive prompts for students.

    You are an expert in the Indian Education System context but prioritize universal pedagogical excellence.`;

    const userPrompt = `
    Input Material:
    ${sourceText}

    Target Grade/Level:
    ${targetGrade}

    Instructions:
    1. Simplify without Diluting: Translate complex academic jargon from the text into clear, conversational explanations.
    2. Use Visual Cues: Suggest where a teacher should draw on the board or point to a diagram (e.g., "[Action: Draw a circle on the board to represent...").
    3. The "Rule of Three": Organize the core content into exactly three main pillars.
    4. Include Analogies: For every technical or complex concept, provide a real-world analogy.
    5. Formatting: Use Markdown with bold headers, bullet points, and LaTeX (using $ for inline and $$ for blocks) for formulas.
    6. NO DECORATIVE LINES: Do not use long lines of "=" or "-" anywhere in your response.

    OUTPUT FORMAT (Follow this exactly):
    [TITLE]
    Title here
    [INTRO]
    Intro content here
    [PILLAR_1_TITLE]
    Title here
    [PILLAR_1_CONTENT]
    Markdown content here
    [PILLAR_2_TITLE]
    Title here
    [PILLAR_2_CONTENT]
    Markdown content here
    [PILLAR_3_TITLE]
    Title here
    [PILLAR_3_CONTENT]
    Markdown content here
    [CHEATSHEET]
    Analogy and FAQ content here
    [DISCUSSION]
    Discussion prompts here`;

    const response = await fetch("https://integrate.api.nvidia.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "meta/llama-3.1-8b-instruct",
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
      console.error('API Error in Lecture Notes', data);
      return NextResponse.json({ error: "We encountered an issue generating your lecture notes. Please try again." }, { status: 500 });
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
    console.error('Lecture Notes Generation Error', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}


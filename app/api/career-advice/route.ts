import { NextResponse } from 'next/server';

export const maxDuration = 180; // Expanded to 3 minutes for generation hooks

export async function POST(req: Request) {
  try {
    const { qualifications, skills, hobbies } = await req.json();

    const apiKey = process.env.NVIDIA_API_KEY;

    // Check if the developer has provided the NVIDIA API key
    if (!apiKey) {
      return NextResponse.json({ error: 'NVIDIA_API_KEY is not configured in environment variables.' }, { status: 500 });
    }

    const systemPrompt = "You are an expert career counselor analyzing market trends. You must strictly return ONLY raw JSON without any markdown formatting wrappers or backticks.";
    const userPrompt = `A student has the following profile:
    - Qualifications/Degree: ${qualifications || 'None provided'}
    - Skills: ${skills.join(', ') || 'None provided'}
    - Hobbies/Interests: ${hobbies.join(', ') || 'None provided'}

    Analyze this profile and provide one primary career recommendation and EXACTLY 5 alternative career recommendations based on current market trends.
    For each role, you MUST include a 'howYouFit' explanation and an array of 'whatToLearn'.
    Return ONLY a raw JSON object exactly matching this structure:
    {
      "topMatch": {
        "role": "[Job Title]",
        "matchScore": "[Percentage e.g. 94%]",
        "reason": "[1-2 sentences explaining market demand]",
        "howYouFit": "[3-4 sentences detailing exactly how their specific skills and hobbies translate to this role's responsibilities]",
        "whatToLearn": ["[Specific skill/tool 1]", "[Specific skill/tool 2]", "[Specific conceptual topic 3]"]
      },
      "alternativeMatches": [
        {
          "role": "[Alternative Job Title 1]",
          "matchScore": "[Score e.g. 85%]",
          "reason": "[1-2 sentences explaining why this alternative is viable]",
          "howYouFit": "[3-4 sentences explaining fit]",
          "whatToLearn": ["[Skill 1]", "[Skill 2]"]
        },
        {
          "role": "[Alternative Job Title 2]",
          "matchScore": "[Score e.g. 85%]",
          "reason": "[1-2 sentences explaining why this alternative is viable]",
          "howYouFit": "[3-4 sentences explaining fit]",
          "whatToLearn": ["[Skill 1]", "[Skill 2]"]
        },
        {
          "role": "[Alternative Job Title 3]",
          "matchScore": "[Score e.g. 85%]",
          "reason": "[1-2 sentences explaining why this alternative is viable]",
          "howYouFit": "[3-4 sentences explaining fit]",
          "whatToLearn": ["[Skill 1]", "[Skill 2]"]
        },
        {
          "role": "[Alternative Job Title 4]",
          "matchScore": "[Score e.g. 85%]",
          "reason": "[1-2 sentences explaining why this alternative is viable]",
          "howYouFit": "[3-4 sentences explaining fit]",
          "whatToLearn": ["[Skill 1]", "[Skill 2]"]
        },
        {
          "role": "[Alternative Job Title 5]",
          "matchScore": "[Score e.g. 85%]",
          "reason": "[1-2 sentences explaining why this alternative is viable]",
          "howYouFit": "[3-4 sentences explaining fit]",
          "whatToLearn": ["[Skill 1]", "[Skill 2]"]
        }
      ]
    }`;

    // Making a REST request to the NVIDIA NIM API for Qwen
    const response = await fetch("https://integrate.api.nvidia.com/v1/chat/completions", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "qwen/qwen3.5-122b-a10b",
        temperature: 0.2, // Low temperature for high precision JSON
        max_tokens: 2000, // Increased max tokens to account for the lengthier array structures
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ]
      }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error?.message || 'Failed to fetch from NVIDIA API');
    }

    let jsonString = data.choices[0].message.content;
    
    // Safety fallback: Strip out markdown block formatting
    jsonString = jsonString.replace(/```json/gi, '').replace(/```/g, '').trim();
    
    const parsedData = JSON.parse(jsonString);

    return NextResponse.json(parsedData);
  } catch (error: any) {
    console.error('Error generating career advice via Nvidia NIM:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}

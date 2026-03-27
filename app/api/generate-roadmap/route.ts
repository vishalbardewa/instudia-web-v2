import { NextResponse } from 'next/server';

export const maxDuration = 180; // Bypass standard Next.js 15-second server termination

export async function POST(req: Request) {
  try {
    const { targetRole, currentSkills } = await req.json();

    const apiKey = process.env.NVIDIA_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: 'NVIDIA_API_KEY is not configured.' }, { status: 500 });
    }

    const systemPrompt = "You are an expert technical curriculum designer. You must strictly return ONLY raw JSON without any markdown formatting wrappers or backticks.";
    const userPrompt = `A student wants to pivot or upskill to become a ${targetRole}. 
    They currently possess the following skills/hobbies: ${currentSkills || 'Nothing specific'}.

    Task 1: Create an optimized, chronological learning roadmap consisting of exactly 5 milestones to take them from their current skillset to becoming a job-ready ${targetRole}. 
    Mark the first milestone as "current" and the remaining 4 milestones as "locked". Avoid vague steps; include specific frameworks, tools, or concepts.

    Task 2: Define exactly 4 to 6 critical skills required for this overarching role. For each skill, intelligently estimate their "current" competence score (0-100) logically based on their input profile, and define the "required" competence score (0-100) for the target role.

    Return ONLY a raw JSON object exactly matching this root structure, paying extremely close attention to ensuring an Object containing these two distinct arrays:
    {
      "milestones": [
        {
          "id": "1",
          "title": "[High-level topic/milestone name]",
          "description": "[Detailed 1-2 sentence description of what they will actively build or learn]",
          "status": "current",
          "estimatedHours": 20
        },
        {
          "id": "2",
          "title": "[Next Sequential Topic]",
          "description": "[...]",
          "status": "locked",
          "estimatedHours": 40
        }
        // Must generate exactly 5 milestone objects in total inside this array
      ],
      "skillGaps": [
        {
          "name": "[Skill Name e.g. System Design]",
          "current": 30,
          "required": 85
        }
        // Must generate exactly 3 to 5 more objects inside this array
      ]
    }`;

    const response = await fetch("https://integrate.api.nvidia.com/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: "qwen/qwen3.5-122b-a10b",
        temperature: 0.2, 
        max_tokens: 2000,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ]
      }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error?.message || 'Failed to fetch from NVIDIA API');

    let jsonString = data.choices[0].message.content;
    jsonString = jsonString.replace(/```json/gi, '').replace(/```/g, '').trim();
    
    return NextResponse.json(JSON.parse(jsonString));
  } catch (error: any) {
    console.error('Error generating roadmap:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}

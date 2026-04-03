import { NextResponse } from 'next/server';
import { logError } from '@/app/utils/logger';

export const maxDuration = 180;

export async function POST(req: Request) {
  try {
    const { content, type } = await req.json();

    const apiKey = process.env.NVIDIA_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'NVIDIA_API_KEY is not configured.' }, { status: 500 });
    }

    const systemPrompt = `You are a professional Resume Expert and Career Coach. Your goal is to refine resume content to be impactful, results-oriented, and professional. 
    Use strong action verbs (e.g., "Led", "Developed", "Optimized"). 
    Quantify achievements wherever possible (e.g., "Improved efficiency by 20%"). 
    Adhere strictly to professional standards for technical resumes. 
    Respond only with the refined text, no preamble or extra conversational fluff.`;

    const userPrompt = type === 'summary' 
      ? `Refine this professional summary to be compelling and highlight core strengths: "${content}"`
      : `Refine this work experience bullet point to be more professional and impact-driven: "${content}"`;

    const response = await fetch("https://integrate.api.nvidia.com/v1/chat/completions", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "meta/llama-3.1-70b-instruct",
        temperature: 0.2, 
        max_tokens: 500,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ]
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      await logError('API Error in Resume Refiner', data);
      throw new Error("Failed to refine content. Please try again.");
    }

    const refinedText = data.choices?.[0]?.message?.content?.trim();
    if (!refinedText) throw new Error("Empty response returned from AI.");

    return NextResponse.json({ refinedText });
  } catch (error: any) {
    await logError('Resume Refinement Error', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}

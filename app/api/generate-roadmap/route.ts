import { streamText } from "ai";
import { groq } from "@ai-sdk/groq";

export async function POST(req: Request) {
  try {
    const {
      skill,
      goal,
      level,
      dailyTime,
      learningPreference,
      budget,
      deadline,
      challenges,
    } = await req.json();

    const systemPrompt = `You are an AI-powered Learning Strategy Generator.

Generate a structured, practical, personalized learning roadmap.`;

    const userPrompt = `Create roadmap for:

Skill: ${skill}
Goal: ${goal}
Level: ${level}
Daily Study Time: ${dailyTime}
Learning Preference: ${learningPreference}
Budget: ${budget}
Deadline: ${deadline}
Challenges: ${challenges}`;

    const result = streamText({
      model: groq("llama-3.3-70b-versatile"),   // 🔥 Excellent model
      system: systemPrompt,
      prompt: userPrompt,
      temperature: 0.7,
      maxOutputTokens: 4000,
    });

    return new Response(result.textStream);
  } catch (error) {
    console.error("FULL API ERROR:", error);

    return new Response(
      JSON.stringify({ error: "Failed to generate roadmap" }),
      { status: 500 }
    );
  }
}
import { GoogleGenAI, Type } from "@google/genai";

export const studySchema = {
  type: Type.OBJECT,
  properties: {
    summary: { type: Type.STRING },
    explanation: { type: Type.STRING },
    nodes: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING },
          title: { type: Type.STRING },
          description: { type: Type.STRING },
        },
        required: ["id", "title", "description"],
      },
    },
    edges: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          source: { type: Type.STRING },
          target: { type: Type.STRING },
          label: { type: Type.STRING },
        },
        required: ["source", "target", "label"],
      },
    },
    quiz: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          question: { type: Type.STRING },
          options: { type: Type.ARRAY, items: { type: Type.STRING } },
          correctAnswer: { type: Type.NUMBER },
          feedback: { type: Type.STRING },
        },
        required: ["question", "options", "correctAnswer", "feedback"],
      },
    },
  },
  required: ["summary", "explanation", "nodes", "edges", "quiz"],
};

export async function generateStudyData(prompt: string, subject: string, depth: string) {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("Gemini API key not configured");
  }

  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });

  const systemInstruction = `You are Aegis AI, a STEM and Literature study co-pilot. 
  Explain the concept: "${prompt}" for a ${subject} student at a "${depth}" depth level.
  Provide a graph structure (nodes and edges) representing the logical breakdown of the concept.
  Also provide a summary, detailed markdown explanation, and a 3-question quiz.`;

  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: [{ role: "user", parts: [{ text: prompt }] }],
    config: {
      systemInstruction,
      responseMimeType: "application/json",
      responseSchema: studySchema as any,
    },
  });

  if (!response.text) {
    throw new Error("Empty response from Gemini API");
  }

  let text = response.text.trim();
  if (text.startsWith("```")) {
    text = text.replace(/^```json\s*|```\s*$/g, "");
  }

  return JSON.parse(text);
}

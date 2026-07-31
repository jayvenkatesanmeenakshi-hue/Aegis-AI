import { GoogleGenAI, Type } from "@google/genai";

const studySchema = {
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

export default async function handler(req: any, res: any) {
  // Ensure we always return JSON
  res.setHeader('Content-Type', 'application/json');

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { prompt, subject, depth } = req.body || {};
    
    if (!prompt) {
      return res.status(400).json({ error: "Missing prompt in request body" });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ error: "GEMINI_API_KEY is not configured in environment" });
    }

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });

    const modelName = "gemini-1.5-flash"; // Using a more stable model
    console.log(`Using model: ${modelName} for study data generation`);

    const systemInstruction = `You are Aegis AI, a STEM and Literature study co-pilot. 
    Explain the concept: "${prompt}" for a ${subject || 'general'} student at a "${depth || 'intermediate'}" depth level.
    Provide a graph structure (nodes and edges) representing the logical breakdown of the concept.
    Also provide a summary, detailed markdown explanation, and a 3-question quiz.`;

    const generateWithRetry = async (retries = 3, delay = 1000): Promise<any> => {
      try {
        return await ai.models.generateContent({
          model: modelName,
          contents: [{ role: "user", parts: [{ text: prompt }] }],
          config: {
            systemInstruction,
            responseMimeType: "application/json",
            responseSchema: studySchema as any,
          },
        });
      } catch (error: any) {
        // Retry on 503 (Service Unavailable) or 429 (Too Many Requests)
        const isRetryable = error.status === 503 || error.status === 429 || error.message?.includes("503") || error.message?.includes("high demand");
        
        if (retries > 0 && isRetryable) {
          console.warn(`Gemini API busy (Status: ${error.status}). Retrying in ${delay}ms... (${retries} attempts remaining)`);
          await new Promise(resolve => setTimeout(resolve, delay));
          return generateWithRetry(retries - 1, delay * 2);
        }
        throw error;
      }
    };

    const response = await generateWithRetry();

    if (!response.text) {
      throw new Error("Empty response from Gemini API");
    }

    let text = response.text.trim();
    if (text.startsWith("```")) {
      text = text.replace(/^```json\s*|```\s*$/g, "");
    }

    const data = JSON.parse(text);
    return res.status(200).json(data);
  } catch (error: any) {
    console.error("API Error:", error);
    
    // Check if it's a service availability issue
    const isUnavailable = error.message?.includes("high demand") || error.message?.includes("503") || error.status === 503;
    
    const friendlyMessage = isUnavailable 
      ? "Our AI study assistant is currently experiencing high demand. Please wait a moment and try your request again."
      : (error.message || "An unexpected error occurred while generating your study materials.");

    return res.status(isUnavailable ? 503 : 500).json({ 
      error: friendlyMessage,
      code: isUnavailable ? "AI_TEMPORARILY_UNAVAILABLE" : "INTERNAL_SERVER_ERROR",
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
}

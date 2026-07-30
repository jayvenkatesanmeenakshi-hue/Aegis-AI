import express from "express";
import path from "path";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Logger middleware
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`${req.method} ${req.url} ${res.statusCode} ${duration}ms`);
  });
  next();
});

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

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

app.post("/api/study", async (req, res) => {
  try {
    const { prompt, depth, subject } = req.body;
    
    if (!process.env.GEMINI_API_KEY) {
      console.error("Missing GEMINI_API_KEY");
      return res.status(500).json({ error: "Gemini API key not configured" });
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
    // Sometimes the model still wraps in markdown blocks even with responseMimeType
    if (text.startsWith("```")) {
      text = text.replace(/^```json\s*|```\s*$/g, "");
    }

    try {
      const responseData = JSON.parse(text);
      res.json(responseData);
    } catch (parseError) {
      console.error("Failed to parse Gemini response:", text);
      res.status(500).json({ 
        error: "Failed to parse study data",
        details: text.substring(0, 200)
      });
    }
  } catch (error: any) {
    console.error("Gemini API error:", error);
    let message = error.message || "An error occurred during generation";
    
    // Attempt to parse nested JSON error if present (common with SDK errors)
    try {
      const parsed = JSON.parse(message);
      if (parsed.error && parsed.error.message) {
        message = parsed.error.message;
      }
    } catch (e) {
      // Not JSON, use raw message
    }

    res.status(500).json({ error: message });
  }
});

// Catch-all for API routes to return JSON 404
app.all("/api/*", (req, res) => {
  res.status(404).json({ error: `API route not found: ${req.method} ${req.url}` });
});

async function startServer() {
  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    try {
      const { createServer: createViteServer } = await import("vite");
      const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: "spa",
      });
      app.use(vite.middlewares);
      console.log("Vite middleware loaded");
    } catch (e) {
      console.error("Failed to load Vite middleware:", e);
    }
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();

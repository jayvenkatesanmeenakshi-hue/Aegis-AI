import { generateStudyData } from "../src/lib/gemini.ts";

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { prompt, subject, depth } = req.body;
    const data = await generateStudyData(prompt, subject, depth);
    res.status(200).json(data);
  } catch (error: any) {
    console.error("API Error:", error);
    res.status(500).json({ error: error.message || "An error occurred" });
  }
}

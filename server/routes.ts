import type { Express } from "express";
import { createServer, type Server } from "http";
import path from "path";
import fs from "fs";
import { storage } from "./storage";
import { z } from "zod";

// Contact form validation schema
const contactFormSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  subject: z.string().min(5).max(200),
  message: z.string().min(10).max(5000),
});

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.get("/api/resume", (req, res) => {
    const resumePath = path.join(process.cwd(), "attached_assets", "Sangam Nirala2_1764390677895.pdf");
    
    if (fs.existsSync(resumePath)) {
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", 'attachment; filename="Sangam_Nirala_Resume.pdf"');
      fs.createReadStream(resumePath).pipe(res);
    } else {
      res.status(404).json({ error: "Resume not found" });
    }
  });

  app.post("/api/contact", async (req, res) => {
    try {
      const parsed = contactFormSchema.safeParse(req.body);
      
      if (!parsed.success) {
        return res.status(400).json({ error: "Invalid form data", details: parsed.error });
      }

      const contactMessage = await storage.createContactMessage(parsed.data);
      
      res.json({ 
        success: true, 
        message: "Your message has been received. I'll get back to you within 24 hours.",
        id: contactMessage.id 
      });
    } catch (error) {
      console.error("Contact form error:", error);
      res.status(500).json({ error: "Failed to submit contact form" });
    }
  });

  app.post("/api/ai-chat", async (req, res) => {
    try {
      const { question, context } = req.body;

      if (!question || !context) {
        return res.status(400).json({ error: "Missing question or context" });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ error: "API key not configured" });
      }

      const prompt = `You are an AI assistant helping visitors learn about Sangam Nirala, an ML Engineer. 
Use the following information about Sangam to answer the user's question accurately and concisely.

SANGAM'S INFORMATION:
${context}

USER QUESTION: ${question}

Please provide a helpful, accurate answer based on the information provided above. Keep your response concise and relevant.`;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: prompt,
                  },
                ],
              },
            ],
          }),
        }
      );

      if (!response.ok) {
        const error = await response.text();
        console.error("Gemini API error:", error);
        return res.status(500).json({ error: "Failed to get response from AI" });
      }

      const data = await response.json();
      const answer =
        data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Sorry, I couldn't generate a response. Please try again.";

      res.json({ answer });
    } catch (error) {
      console.error("AI chat error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  return httpServer;
}

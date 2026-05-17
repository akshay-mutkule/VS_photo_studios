import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import * as admin from "firebase-admin";
import dotenv from "dotenv";

dotenv.config();

// Initialize Firebase Admin
try {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.applicationDefault(),
    });
    console.log("Firebase Admin initialized successfully.");
  }
} catch (error) {
  console.error("Firebase Admin initialization failed. Server will continue without Admin features:", error);
}

const getDb = () => {
  try {
    return admin.firestore();
  } catch (error) {
    console.error("Failed to get Firestore instance:", error);
    return null;
  }
};

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Gemini API setup
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY || "",
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Photo Search AI
  app.post("/api/ai/analyze-photo", async (req, res) => {
    try {
      const { imageUrl, prompt } = req.body;
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
          { text: prompt || "Describe this photo for a photography portfolio. Suggest tags and a cinematic description." },
          { inlineData: { mimeType: "image/jpeg", data: imageUrl.split(',')[1] } }
        ],
      });
      res.json({ result: response.text });
    } catch (error) {
      console.error("AI Analysis Error:", error);
      res.status(500).json({ error: "Failed to analyze photo" });
    }
  });

  // Recommendation AI
  app.post("/api/ai/recommendations", async (req, res) => {
    try {
      const { clientPreferences, galleryData } = req.body;
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Given the client preferences: ${JSON.stringify(clientPreferences)}, and these available photo themes: ${JSON.stringify(galleryData)}, suggest 5 types of photography styles or moments they would love in their upcoming shoot. Return as JSON.`,
        config: {
          responseMimeType: "application/json"
        }
      });
      res.json(JSON.parse(response.text));
    } catch (error) {
      res.status(500).json({ error: "Failed to get recommendations" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

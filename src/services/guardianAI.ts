import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export interface DetectionResult {
  hazardDetected: boolean;
  type?: 'swimmer_distress' | 'rip_current' | 'rogue_wave' | 'vulnerable_person';
  confidence: number;
  description: string;
  recommendation: string;
  coordinates?: { x: number; y: number };
}

export async function verifyHazardWithAI(base64Image: string): Promise<DetectionResult> {
  const model = "gemini-3-flash-preview";
  
  const systemInstruction = `
    You are the Sentinel Cloud Analysis Engine, a high-precision maritime safety expert.
    Analyze the provided image for oceanic hazards and human distress.
    Hazards include:
    - Rip currents (Bathymetry-controlled vs Transient)
    - Rogue waves or large swell anomalies
    - Swimmers in distress (IDR signatures: lateral arm pressing, climbing ladder, backward water milling)
    - Vulnerable persons (unattended children near shore)
    
    Return a JSON response with the following schema:
    {
      "hazardDetected": boolean,
      "type": string (one of the specified types),
      "confidence": number (0-1),
      "description": string,
      "recommendation": string,
      "coordinates": { "x": number, "y": number } (center of hazard, 0-1 range)
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: [
        {
          parts: [
            { text: "Analyze this maritime surveillance snapshot for hazards." },
            { inlineData: { mimeType: "image/jpeg", data: base64Image } }
          ]
        }
      ],
      config: {
        systemInstruction,
        responseMimeType: "application/json",
      }
    });

    return JSON.parse(response.text || '{}') as DetectionResult;
  } catch (error) {
    console.error("AI Verification Error:", error);
    return {
      hazardDetected: false,
      confidence: 0,
      description: "Failed to verify via Cloud Tier.",
      recommendation: "Re-scan or manual override required."
    };
  }
}

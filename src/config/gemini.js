import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

const MODEL_PRIORITY = [
  "gemini-2.5-flash",
  "gemini-2.5-flash-lite",
  "gemini-2.0-flash",
  "gemini-1.5-pro",
  "gemini-1.5-flash",
];

const API_KEY = "AIzaSyBCtyio-zXS4HLNwXfDOrXvPuXPsGFUl-w";
async function runChat(prompt) {
  for (let model of MODEL_PRIORITY) {
    try {
      // AIzaSyBCtyio-zXS4HLNwXfDOrXvPuXPsGFUl-w
      const genAI = new GoogleGenerativeAI(API_KEY);
      const generativeModel = genAI.getGenerativeModel({
        model,
        generationConfig: {
          temperature: 0.9,
          topK: 1,
          topP: 1,
          maxOutputTokens: 2048,
        },
        safetySettings: [
          {
            category: HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
          },
          {
            category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
          },
          {
            category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
          },
          {
            category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
          },
        ],
      });
      const result = await generativeModel.generateContent(prompt);
      const text = result.response.text();
      return text;
    } catch (error) {
      const quotaHit =
        error?.message?.includes("429") || error?.message?.includes("quota");
      if (!quotaHit) {
        return " Something went wrong. Please try again later.";
      }
      console.warn(`[Quota Hit] Model: ${model} | Key: ${API_KEY}`);
    }
  }

  console.error("All models exhausted for today.");
  return "__GEMINI_QUOTA_EXHAUSTED__";
}
export default runChat;


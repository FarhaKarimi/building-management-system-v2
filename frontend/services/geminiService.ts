import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateAnnouncement = async (topic: string, tone: string): Promise<string> => {
  try {
    const prompt = `
      You are an AI assistant for a building manager in Iran.
      Write a formal announcement for the building residents in Persian (Farsi).
      
      Topic: ${topic}
      Tone: ${tone}
      
      Keep it professional, clear, and polite. Do not include placeholders.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "خطا در تولید متن.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "متاسفانه در حال حاضر امکان برقراری ارتباط با هوش مصنوعی وجود ندارد.";
  }
};

export const analyzeFinancialHealth = async (transactionsStr: string): Promise<string> => {
  try {
    const prompt = `
      You are a financial advisor for a residential building.
      Analyze the following JSON list of transactions (incomes and expenses) and provide a short summary in Persian.
      Point out if the building is spending too much compared to income.
      
      Data:
      ${transactionsStr}
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "تحلیل امکان پذیر نیست.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "خطا در تحلیل داده‌ها.";
  }
};

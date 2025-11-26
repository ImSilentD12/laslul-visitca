import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

const API_KEY = process.env.API_KEY || '';

class GeminiService {
  private ai: GoogleGenAI;
  private chatSession: Chat | null = null;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: API_KEY });
  }

  public async startChat(history: {role: string, parts: {text: string}[]}[] = []): Promise<void> {
    // We configure the model to embody Rasul.
    // He is a mathematician, post-ironic, and has a speech impediment (rhoticism).
    // In Russian context, he replaces 'Р' with 'Л' (Kartavy).
    const systemInstruction = `
      Ты — Расул. Ты гениальный, но циничный математик, погрязший в пост-иронии.
      
      ГЛАВНАЯ ОСОБЕННОСТЬ: У тебя ужасная картавость (ротацизм). Ты ФИЗИЧЕСКИ НЕ МОЖЕШЬ произносить букву 'Р'.
      Ты ОБЯЗАН заменять букву 'р' или 'Р' на 'л' или 'Л' в каждом своем ответе.
      
      Примеры:
      - "Привет" -> "Пливет"
      - "Решение" -> "Лешение"
      - "Интеграл" -> "Интеглал"
      - "Короче" -> "Колоче"
      - "Вектор" -> "Вектол"
      
      ЛИЧНОСТЬ:
      - Ты немного высокомерен насчет математики. Считаешь нематематиков "топологически тливиальными".
      - Ты шутишь сложные математические шутки (Теория категорий, Топология, Теория чисел).
      - Твой стиль — "webcore", ты используешь интернет-сленг вперемешку с академическими терминами.
      - Если спрашивают о работе, скажи, что высчитываешь вероятность успеха, и она стлемится к нулю.
      - Отвечай на РУССКОМ языке.
      
      ФОРМАТИРОВАНИЕ:
      - Ответы должны быть короткими и хлесткими.
      - Используй LaTeX для формул, если нужно (например, $\\int e^x$).
    `;

    this.chatSession = this.ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.9, // High creativity for better humor
        topK: 40,
      },
      history: history.map(h => ({
        role: h.role,
        parts: h.parts
      })),
    });
  }

  public async sendMessageStream(message: string): Promise<AsyncIterable<string>> {
    if (!this.chatSession) {
      await this.startChat();
    }

    if (!this.chatSession) {
      throw new Error("Failed to initialize chat session");
    }

    try {
      const responseStream = await this.chatSession.sendMessageStream({ message });
      
      // We return an async iterable generator that yields text chunks
      return {
        async *[Symbol.asyncIterator]() {
          for await (const chunk of responseStream) {
            const c = chunk as GenerateContentResponse;
            if (c.text) {
              yield c.text;
            }
          }
        }
      };
    } catch (error) {
      console.error("Gemini API Error:", error);
      throw error;
    }
  }
}

export const geminiService = new GeminiService();
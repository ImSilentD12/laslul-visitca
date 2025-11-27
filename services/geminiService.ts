import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

// Helper to find the key regardless of the build tool (Vite, Webpack, Next.js, etc.)
const getApiKey = (): string => {
  try {
    // 1. Vite (standard for modern React)
    // Cast import.meta to any to avoid "Property 'env' does not exist on type 'ImportMeta'" error
    if (typeof import.meta !== 'undefined' && (import.meta as any).env && (import.meta as any).env.VITE_API_KEY) {
      return (import.meta as any).env.VITE_API_KEY;
    }
    // 2. Create React App
    if (typeof process !== 'undefined' && process.env && process.env.REACT_APP_API_KEY) {
      return process.env.REACT_APP_API_KEY;
    }
    // 3. Standard Node/Next.js
    if (typeof process !== 'undefined' && process.env && process.env.API_KEY) {
      return process.env.API_KEY;
    }
  } catch (e) {
    console.warn("Error accessing environment variables:", e);
  }
  return '';
};

const API_KEY = getApiKey();

// MOCK RESPONSES FOR DEMO MODE (When no key is present)
const MOCK_RESPONSES = [
  "Слушай, ты забыл добавить API_KEY. Я сейчас лаботаю на чистой хализме и `Math.random()`. Добавь ключ, чтобы я стал умным.",
  "В плоекции твоего запвоса я вижу пустоту. (Нет API ключа, но я все лавно класавчик).",
  "Теолетически я мог бы ответить, но плактически у меня нет токена доступа. Плиходи с ключом.",
  "404: Brain not found. Вставь API_KEY в пелеменные оклужения, и мы поговорим о гомотопиях.",
  "Я бы пошутил пло интеглалы, но без ключа мой юмол огланичен стлоковыми лителалами.",
  "Ты ожидал ИИ, а получил набор захалдпоженных стлок. Жизнь полна лазочалований, как и теолия велоятностей."
];

class GeminiService {
  private ai: GoogleGenAI | null = null;
  private chatSession: Chat | null = null;
  private isDemoMode: boolean = false;

  constructor() {
    if (API_KEY) {
      this.ai = new GoogleGenAI({ apiKey: API_KEY });
    } else {
      console.warn("No API Key found. Switching to Demo Mode.");
      this.isDemoMode = true;
    }
  }

  public async startChat(history: {role: string, parts: {text: string}[]}[] = []): Promise<void> {
    if (this.isDemoMode || !this.ai) {
      // In demo mode, we pretend to start a chat
      return;
    }

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

    try {
      this.chatSession = this.ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.9,
          topK: 40,
        },
        history: history.map(h => ({
          role: h.role,
          parts: h.parts
        })),
      });
    } catch (e) {
      console.error("Failed to create chat session:", e);
      this.isDemoMode = true;
    }
  }

  public async sendMessageStream(message: string): Promise<AsyncIterable<string>> {
    // FALLBACK FOR DEMO MODE
    if (this.isDemoMode || !this.chatSession) {
      const randomResponse = MOCK_RESPONSES[Math.floor(Math.random() * MOCK_RESPONSES.length)];
      
      // Simulate streaming delay
      return {
        async *[Symbol.asyncIterator]() {
          const chunks = randomResponse.split(" ");
          for (const chunk of chunks) {
            await new Promise(resolve => setTimeout(resolve, 100)); // slight delay
            yield chunk + " ";
          }
        }
      };
    }

    try {
      const responseStream = await this.chatSession.sendMessageStream({ message });
      
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
      // Fallback to demo mode on error
      const errorResponse = "API Ewwol: Мой мозг пелеглeлся (или ты забыл заплатить за интеленет).";
       return {
        async *[Symbol.asyncIterator]() {
            yield errorResponse;
        }
      };
    }
  }
}

export const geminiService = new GeminiService();
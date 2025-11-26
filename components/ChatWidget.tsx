import React, { useState, useRef, useEffect } from 'react';
import { geminiService } from '../services/geminiService';
import { ChatMessage, ViewMode } from '../types';
import { Send, Terminal, Calculator } from 'lucide-react';

interface ChatWidgetProps {
    mode: ViewMode;
}

export const ChatWidget: React.FC<ChatWidgetProps> = ({ mode }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Пливетствую. Я цифловая апплоксимация Ласула. Сплашивай пло теолию узлов или почему я одинок." }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      // Create a temporary placeholder for the streaming response
      setMessages(prev => [...prev, { role: 'model', text: '' }]);
      
      const stream = await geminiService.sendMessageStream(userMsg);
      
      let fullText = '';
      
      for await (const chunk of stream) {
        fullText += chunk;
        setMessages(prev => {
            const newHistory = [...prev];
            // Update the last message (which is the model placeholder)
            newHistory[newHistory.length - 1] = { role: 'model', text: fullText };
            return newHistory;
        });
      }

    } catch (err) {
      setMessages(prev => [...prev, { role: 'model', text: "Ошибочка: Переполнение стека в моем модуле эмоций.", isError: true }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[500px] w-full border-4 border-zinc-800 bg-black shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)]">
      {/* Header */}
      <div className="flex items-center justify-between bg-zinc-800 p-2 border-b-2 border-zinc-700">
        <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
            <span className="font-mono font-bold text-green-400 text-sm">RASUL_OS v2.5 (RU)</span>
        </div>
        <div className="flex gap-2">
            <Calculator size={16} className="text-zinc-400" />
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 font-mono text-sm">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div 
                className={`max-w-[85%] p-3 border-2 ${
                    msg.role === 'user' 
                        ? 'border-white bg-white text-black' 
                        : 'border-green-500 bg-black text-green-400'
                } ${msg.isError ? 'border-red-500 text-red-500' : ''}`}
            >
              {msg.role === 'model' ? (
                // Digital Rasul always "speaks" with text that might be processed, 
                // but the prompt instructions handles the Lisp. 
                <span className="whitespace-pre-wrap">{msg.text}</span>
              ) : (
                <span>{msg.text}</span>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
            <div className="flex justify-start">
                <div className="p-2 text-green-500 animate-pulse text-xs">
                    Думаю пво $\infty$...
                </div>
            </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-2 bg-zinc-900 border-t-2 border-zinc-700 flex gap-2">
        <div className="relative flex-1">
            <Terminal className="absolute top-1/2 left-2 -translate-y-1/2 text-zinc-500 w-4 h-4" />
            <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={mode === ViewMode.BURR ? "Поговови с Ласулом..." : "Поговори с Расулом..."}
            className="w-full bg-black border border-zinc-600 text-white pl-8 pr-2 py-2 focus:outline-none focus:border-green-500 font-mono text-sm placeholder-zinc-600"
            />
        </div>
        <button 
            type="submit" 
            disabled={isLoading}
            className="bg-green-600 hover:bg-green-500 text-black font-bold px-4 py-2 border border-green-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Send size={16} />
        </button>
      </form>
    </div>
  );
};
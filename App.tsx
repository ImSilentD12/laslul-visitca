import React, { useState } from 'react';
import { ViewMode } from './types';
import { BurrText } from './components/BurrText';
import { ChatWidget } from './components/ChatWidget';
import { MathChart } from './components/MathChart';
import { ToggleLeft, ToggleRight, Sigma, Pi, Divide, FunctionSquare } from 'lucide-react';

const App: React.FC = () => {
  const [mode, setMode] = useState<ViewMode>(ViewMode.NORMAL);

  const toggleMode = () => {
    setMode(prev => prev === ViewMode.NORMAL ? ViewMode.BURR : ViewMode.NORMAL);
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden selection:bg-pink-500 selection:text-white">
      {/* Background Noise/Grid */}
      <div className="fixed inset-0 z-[-1] opacity-20 pointer-events-none" 
        style={{
            backgroundImage: 'radial-gradient(#333 1px, transparent 1px)',
            backgroundSize: '20px 20px'
        }}>
      </div>
      
      {/* Navigation / Toggle Bar */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-zinc-800 p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
            <div className="bg-white text-black font-bold px-2 py-1 text-xs transform -rotate-2">
                <BurrText text="РАСУЛ.TS" mode={mode} />
            </div>
            <span className="text-zinc-500 text-xs hidden sm:inline">
                // <BurrText text="Определен, но не инициализирован" mode={mode} />
            </span>
        </div>
        
        <button 
            onClick={toggleMode}
            className="flex items-center gap-2 text-sm font-mono hover:text-green-400 transition-colors"
        >
            <span className={mode === ViewMode.NORMAL ? "text-white" : "text-zinc-600"}>НОРМА</span>
            {mode === ViewMode.NORMAL ? <ToggleLeft size={24} /> : <ToggleRight size={24} className="text-green-500" />}
            <span className={mode === ViewMode.BURR ? "text-green-500 font-bold" : "text-zinc-600"}>
                <BurrText text="РЕЖИМ_КАРТАВОСТИ" mode={ViewMode.NORMAL} />
            </span>
        </button>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-12 px-4 md:px-12 max-w-7xl mx-auto flex flex-col md:flex-row gap-12 items-center">
        <div className="flex-1 space-y-6">
            <div className="inline-block border border-pink-500 text-pink-500 px-3 py-1 text-xs font-mono uppercase tracking-widest mb-4">
                <BurrText text="Внимание: Содержит иррациональные числа" mode={mode} />
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black leading-none tracking-tighter mix-blend-difference">
                <span className="block hover:text-green-500 transition-colors cursor-default">
                    <BurrText text="РАСУЛ" mode={mode} />
                </span>
                <span className="block text-stroke-1 text-transparent stroke-white hover:stroke-pink-500 transition-all cursor-default">
                    <BurrText text="ВОЛШЕБНИК" mode={mode} />
                </span>
                <span className="block text-4xl md:text-6xl text-zinc-500 mt-2 font-mono">
                    <BurrText text="ЦИФР" mode={mode} />
                </span>
            </h1>

            <p className="text-xl md:text-2xl font-mono text-zinc-400 max-w-2xl border-l-4 border-green-500 pl-4 py-2">
                <BurrText text="Решаю проблемы, о которых вы не знали, методами, которые вы не поймете. И да, я не выговариваю 'Р'. Это фича, а не баг." mode={mode} />
            </p>

            <div className="flex gap-4 pt-4">
                <a href="#chat" className="bg-white text-black px-6 py-3 font-bold font-mono hover:bg-pink-500 hover:text-white transition-colors border-2 border-white hover:border-pink-500 shadow-[4px_4px_0px_0px_rgba(255,255,255,0.5)] active:shadow-none active:translate-x-1 active:translate-y-1">
                    <BurrText text="ПОСПОРЬ СО МНОЙ" mode={mode} />
                </a>
            </div>
        </div>

        {/* Hero Visual - Brutalist Card */}
        <div className="w-full md:w-1/3 relative group">
            <div className="absolute inset-0 bg-green-500 transform translate-x-4 translate-y-4 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform"></div>
            <div className="relative bg-zinc-900 border-2 border-white p-2 aspect-[3/4] flex flex-col items-center justify-between overflow-hidden">
                {/* 
                   PLACEHOLDER FOR USER IMAGE
                   Ensure you have a file named 'rasul.jpg' in your public folder 
                */}
                <img 
                    src="/rasul.jpg" 
                    alt="Rasul Abstract" 
                    className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                />
                
                {/* Gradient overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-90"></div>

                <div className="z-10 w-full flex justify-between p-2">
                    <Sigma className="text-white w-8 h-8 drop-shadow-md" />
                    <Pi className="text-white w-8 h-8 drop-shadow-md" />
                </div>
                <div className="z-10 text-center space-y-2 bg-black/60 backdrop-blur-md p-4 w-full border-t border-white/20">
                    <h2 className="text-2xl font-bold font-syne text-white drop-shadow-lg">
                        <BurrText text="РАСУЛ" mode={mode} />
                    </h2>
                    <div className="text-xs font-mono text-pink-400 font-bold">
                        <BurrText text="Старший Инженер Абстракций" mode={mode} />
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* Marquee */}
      <div className="bg-yellow-400 text-black py-2 overflow-hidden border-y-2 border-black rotate-1 scale-105 my-12">
        <div className="animate-[marquee_10s_linear_infinite] whitespace-nowrap font-bold font-mono text-xl">
             <BurrText text=" • Ч.Т.Д. • ОБОЖАЮ ТЕНЗОРЫ • ДОКАЗАТЕЛЬСТВО ТРИВИАЛЬНО • ОСТАВЛЕНО ЧИТАТЕЛЮ В КАЧЕСТВЕ УПРАЖНЕНИЯ • Ч.Т.Д. • ОБОЖАЮ ТЕНЗОРЫ •" mode={mode} />
        </div>
      </div>

      {/* About / Stats Grid */}
      <section className="px-4 md:px-12 max-w-7xl mx-auto mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-8">
                <div className="bg-zinc-900/50 p-6 border border-zinc-800">
                    <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                        <Divide className="text-pink-500" />
                        <BurrText text="Моя Философия" mode={mode} />
                    </h3>
                    <p className="font-mono text-sm leading-relaxed text-zinc-300">
                        <BurrText 
                            text="Математика — это искусство называть разные вещи одним именем. Жизнь — искусство усложнять простые вещи. Я существую на пересечении этих двух множеств. Мой код функционально чист, но мои мысли — сплошные сайд-эффекты."
                            mode={mode}
                        />
                    </p>
                </div>
                
                <div className="bg-zinc-900/50 p-6 border border-zinc-800">
                     <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                        <FunctionSquare className="text-green-500" />
                        <BurrText text="Матрица Скиллов" mode={mode} />
                    </h3>
                    <ul className="space-y-2 font-mono text-sm">
                        <li className="flex justify-between items-center">
                            <span>LaTeX</span>
                            <div className="w-32 h-2 bg-zinc-800"><div className="h-full bg-white w-[98%]"></div></div>
                        </li>
                        <li className="flex justify-between items-center">
                            <span>React.js</span>
                            <div className="w-32 h-2 bg-zinc-800"><div className="h-full bg-pink-500 w-[85%]"></div></div>
                        </li>
                        <li className="flex justify-between items-center">
                            <BurrText text="Абстрактная Алгебра" mode={mode} />
                            <div className="w-32 h-2 bg-zinc-800"><div className="h-full bg-green-500 w-[92%]"></div></div>
                        </li>
                         <li className="flex justify-between items-center">
                            <BurrText text="Произношение 'Р'" mode={mode} />
                            <div className="w-32 h-2 bg-zinc-800"><div className="h-full bg-red-600 w-[4%] animate-pulse"></div></div>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Recharts Component */}
            <div className="flex flex-col gap-4">
                 <div className="bg-zinc-900 p-2 border border-zinc-700">
                    <h3 className="text-sm font-bold font-mono text-center mb-2 text-zinc-500">
                        РИС 1.1: <BurrText text="ЧСВ vs Математические Способности" mode={mode} />
                    </h3>
                    <MathChart />
                 </div>
                 
                 <div className="p-6 border-2 border-zinc-800 bg-zinc-950">
                    <h4 className="font-bold text-lg mb-2 text-yellow-400">
                        <BurrText text="Любимая Теорема" mode={mode} />
                    </h4>
                    <div className="font-mono text-xs md:text-sm text-zinc-400 bg-black p-4 border border-zinc-800 overflow-x-auto">
                        {`Пусть X — компактное хаусдорфово пространство.`}
                        <br/>
                        {`Тогда C(X) — коммутативная C*-алгебра.`}
                        <br/><br/>
                        <span className="text-green-600">// Я не знаю, зачем это нужно на практике</span>
                        <br/>
                        <span className="text-green-600">// но звучит круто на вечеринках.</span>
                    </div>
                 </div>
            </div>
        </div>
      </section>

      {/* AI Chat Section */}
      <section id="chat" className="py-24 bg-zinc-900 border-t-2 border-dashed border-zinc-700 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black px-4 py-2 border border-zinc-700 text-pink-500 font-bold font-mono">
            <BurrText text="ПРОТОКОЛ ЦИФРОВОГО ДВОЙНИКА" mode={mode} />
        </div>

        <div className="max-w-4xl mx-auto px-4 md:px-12">
            <div className="flex flex-col items-center mb-12 text-center">
                <h2 className="text-4xl md:text-5xl font-black mb-4">
                    <BurrText text="СПРАШИВАЙ ЧТО УГОДНО" mode={mode} />
                </h2>
                <p className="text-zinc-400 max-w-lg font-mono text-sm">
                    <BurrText 
                        text="Это ИИ-копия моего сознания. Она так же плохо произносит буквы и так же хорошо знает математику. Попроси доказательство или шутку."
                        mode={mode}
                    />
                </p>
            </div>
            
            <ChatWidget mode={mode} />
        </div>
      </section>

      {/* Footer / Contact */}
      <footer id="contact" className="bg-black pt-24 pb-12 px-4 border-t-4 border-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-12">
            <div>
                 <h2 className="text-4xl font-black mb-4">
                    <BurrText text="КОНТАКТЫ?" mode={mode} />
                </h2>
                <p className="font-mono text-zinc-400 max-w-md border-l-2 border-pink-500 pl-4">
                     <BurrText text="Их нет. Я сам тебя найду. Вычисляю твой IP... 127.0.0.1... Ага, попался." mode={mode} />
                </p>
            </div>

            <div className="text-right">
                <p className="font-mono text-zinc-600 text-sm mb-2">
                    <BurrText text="Создано с помощью Хаоса и React" mode={mode} />
                </p>
                <div className="text-5xl font-black text-zinc-900 select-none">
                    2 + 2 = 5
                </div>
            </div>
        </div>
        <div className="mt-12 text-center text-zinc-700 font-mono text-xs">
            © {new Date().getFullYear()} Расул. <BurrText text="Все права защищены теоремой Гёделя." mode={mode} />
        </div>
      </footer>
    </div>
  );
};

export default App;
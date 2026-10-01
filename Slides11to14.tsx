import React, { useState } from 'react';
import { 
  ArrowRight, 
  Volume2, 
  Check, 
  Send, 
  Sparkles, 
  BookOpen, 
  CheckCircle,
  HelpCircle
} from 'lucide-react';
import { playEnglishAudio } from '../../utils/speech';

interface SlideProps {
  onNext: () => void;
  onAddPoints: (pts: number) => void;
}

// ======================== SLIDE 11: THE STORY OF EMMA (A1-A2) ========================
export const Slide11EmmaStory: React.FC<SlideProps> = ({ onNext, onAddPoints }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const textParagraph = "Hello everyone! My name is Emma and I am thirteen years old. I live in London with my family. Last summer, I visited Bulgaria with my school. I was amazed to see words like ресторант, компютър and футбол everywhere! English and Bulgarian may use different alphabets, but our languages share so many international words. Words truly build bridges between cultures!";

  const handlePlay = async (rate: number = 0.85) => {
    setIsPlaying(true);
    await playEnglishAudio(textParagraph, rate);
    setIsPlaying(false);
    onAddPoints(15);
  };

  return (
    <div className="flex flex-col justify-between min-h-[560px] p-6 max-w-5xl mx-auto">
      <div className="text-center space-y-2">
        <span className="px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800 text-cyan-300 text-xs font-bold uppercase tracking-wider">
          Слушане и четене с разбиране · English A1–A2
        </span>
        <h2 className="text-3xl md:text-5xl font-extrabold text-white font-heading">
          THE STORY OF EMMA (LONDON)
        </h2>
        <p className="text-slate-300 text-sm md:text-base">
          Чуй разказа на Emma за нейното пътуване и общите думи между България и света!
        </p>
      </div>

      {/* Main Narrative Card */}
      <div className="my-4 p-6 md:p-8 rounded-3xl bg-slate-900 border-2 border-cyan-500/40 shadow-2xl space-y-5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-2xl">
              👩‍🦰
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Emma (13, London, UK)</h3>
              <p className="text-xs text-cyan-300">Level: A1–A2 · Present & Past Simple</p>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => handlePlay(0.9)}
              disabled={isPlaying}
              className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs md:text-sm flex items-center gap-2 cursor-pointer shadow-md"
            >
              <Volume2 className={`w-4 h-4 ${isPlaying ? 'animate-bounce text-yellow-300' : ''}`} />
              <span>{isPlaying ? 'Слушане на записа...' : '🔊 Пусни аудио'}</span>
            </button>
            <button
              onClick={() => handlePlay(0.7)}
              disabled={isPlaying}
              className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1 cursor-pointer"
            >
              🐢 По-бавно
            </button>
          </div>
        </div>

        {/* Text paragraph with highlighted grammar markers */}
        <p className="text-base md:text-lg text-slate-200 leading-relaxed font-medium">
          “Hello everyone! My name is Emma and I am thirteen years old. I live in London with my family. <span className="bg-purple-900/60 px-1.5 py-0.5 rounded text-purple-300 font-bold">Last summer, I visited</span> Bulgaria with my school. I <span className="bg-purple-900/60 px-1.5 py-0.5 rounded text-purple-300 font-bold">was amazed</span> to see words like <em className="text-cyan-300">ресторант, компютър and футбол</em> everywhere! English and Bulgarian may use different alphabets, <span className="bg-indigo-900/60 px-1.5 py-0.5 rounded text-indigo-300 font-semibold">but our languages share</span> so many international words. Words truly build bridges between cultures!”
        </p>

        {/* Translation & Grammar callout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs pt-2 border-t border-slate-800">
          <div className="p-3 rounded-xl bg-slate-950 text-slate-300">
            <strong>🇧🇬 Превод:</strong> „Миналото лято посетих България... Бях изумена да видя думи като ресторант, компютър и футбол навсякъде! Нашите езици споделят толкова много международни думи.“
          </div>
          <div className="p-3 rounded-xl bg-slate-950 text-purple-300">
            <strong>💡 Граматика A1-A2:</strong> Обърнете внимание на формите за минало време (Past Simple): <em>visited</em> (правилен глагол +ed) и <em>was</em> (минало време на глагола to be).
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-4 border-t border-slate-800">
        <button
          onClick={onNext}
          className="px-6 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
        >
          <span>Към Listen & Comprehend (A1-A2)</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

// ======================== SLIDE 12: LISTEN & COMPREHEND (A1-A2) ========================
export const Slide12ListenComprehend: React.FC<SlideProps> = ({ onNext, onAddPoints }) => {
  const questions = [
    {
      q: '1. Where did Emma travel last summer?',
      options: ['To France', 'To Bulgaria', 'To Spain'],
      correct: 'To Bulgaria',
      expl: 'Emma visited Bulgaria with her school.'
    },
    {
      q: '2. Why was she amazed when she arrived in Bulgaria?',
      options: [
        'She recognized familiar international words like ресторант and футбол.',
        'Nobody understood English.',
        'There were no computers.'
      ],
      correct: 'She recognized familiar international words like ресторант and футбол.',
      expl: 'She saw international loanwords that sounded just like English words!'
    },
    {
      q: '3. What grammatical tense are the verbs "visited" and "was"?',
      options: ['Present Simple', 'Past Simple (минало свършено време)', 'Future Simple'],
      correct: 'Past Simple (минало свършено време)',
      expl: 'visited и was изразяват завършено действие в миналото (last summer).'
    }
  ];

  const [answers, setAnswers] = useState<Record<number, string>>({});

  const handleSelect = (qIdx: number, opt: string) => {
    setAnswers({ ...answers, [qIdx]: opt });
    if (opt === questions[qIdx].correct) {
      onAddPoints(10);
    }
  };

  const isAllAnswered = Object.keys(answers).length === questions.length;

  return (
    <div className="flex flex-col justify-between min-h-[560px] p-6 max-w-5xl mx-auto">
      <div className="text-center space-y-2">
        <span className="px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800 text-cyan-300 text-xs font-bold uppercase tracking-wider">
          Извличане на детайли · Listening Comprehension A1-A2
        </span>
        <h2 className="text-3xl md:text-5xl font-extrabold text-white font-heading">
          LISTEN & COMPREHEND (РАЗБИРАНЕ НА РАЗКАЗА)
        </h2>
        <p className="text-slate-300 text-sm md:text-base">
          Отговори на въпросите по разказа на Emma:
        </p>
      </div>

      <div className="my-4 space-y-4">
        {questions.map((item, qIdx) => {
          const selected = answers[qIdx];
          return (
            <div key={qIdx} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <h3 className="text-sm md:text-base font-bold text-white">{item.q}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {item.options.map((opt) => {
                  const isChosen = selected === opt;
                  const isCorrect = opt === item.correct;
                  return (
                    <button
                      key={opt}
                      onClick={() => handleSelect(qIdx, opt)}
                      className={`p-3 rounded-xl border text-xs md:text-sm font-semibold transition-all text-left cursor-pointer ${
                        isChosen
                          ? isCorrect
                            ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300'
                            : 'bg-red-500/20 border-red-400 text-red-300'
                          : selected && isCorrect
                          ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400'
                          : 'bg-slate-950 border-slate-800 text-slate-200 hover:border-cyan-500'
                      }`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
              {selected && (
                <div className="text-[11px] text-cyan-300/80 pt-1 italic">
                  💡 {item.expl}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-slate-800">
        <span className="text-xs text-slate-400">
          Попълнени въпроси: <strong className="text-cyan-400 font-bold">{Object.keys(answers).length} / {questions.length}</strong>
        </span>
        <button
          onClick={onNext}
          className="px-6 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
        >
          <span>Към Chat with Emma (A1-A2)</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

// ======================== SLIDE 13: INTERACTIVE CHAT WITH EMMA (A1-A2) ========================
export const Slide13ChatWithEmmaA2: React.FC<SlideProps> = ({ onNext, onAddPoints }) => {
  const steps = [
    {
      emma: "Hi! Where are you from and what languages do you study at school?",
      options: [
        { 
          text: "I am from Bulgaria and I study Bulgarian and English.", 
          correct: true, 
          feedback: "Браво! Отличен словеред с глагола to be (I am from...) и Present Simple за редовни учебни предмети." 
        },
        { 
          text: "I from Bulgaria and study English.", 
          correct: false, 
          feedback: "Грешка: Пропуснат е глаголът to be. Казваме 'I am from...'." 
        },
        { 
          text: "My country Bulgaria study languages.", 
          correct: false, 
          feedback: "Неправилна конструкция. Липсва подлог и ясен граматичен глагол." 
        }
      ]
    },
    {
      emma: "Did you know that English also borrowed thousands of words from French, Latin, and Greek?",
      options: [
        { 
          text: "Yes, because history and trade connected languages across Europe!", 
          correct: true, 
          feedback: "Чудесен отговор на ниво A2! Използва съюза 'because' (защото) за логическо обяснение." 
        },
        { 
          text: "No, English never borrowing.", 
          correct: false, 
          feedback: "Грешка: Английският език е заел над 60% от речника си от френски и латински!" 
        },
        { 
          text: "Yes, I knowed that.", 
          correct: false, 
          feedback: "Грешка: Глаголът know е неправилен в минало време (knew, а не knowed)." 
        }
      ]
    },
    {
      emma: "What did you do yesterday in your language class?",
      options: [
        { 
          text: "Yesterday, we explored loanwords and practiced new vocabulary.", 
          correct: true, 
          feedback: "Перфектно Past Simple (минало време): 'we explored' (правилен глагол с -ed)." 
        },
        { 
          text: "Yesterday, we explore loanwords.", 
          correct: false, 
          feedback: "Грешка: С думата yesterday трябва да използваме минало време (explored), а не сегашно." 
        },
        { 
          text: "Yesterday, I did studied.", 
          correct: false, 
          feedback: "Грешка: В положително съобщително изречение не слагаме did + V2. Казваме 'I studied'." 
        }
      ]
    }
  ];

  const [currentStep, setCurrentStep] = useState(0);
  const [chatLog, setChatLog] = useState<Array<{ sender: 'emma' | 'user'; text: string }>>([
    { sender: 'emma', text: steps[0].emma }
  ]);
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleChoose = (opt: { text: string; correct: boolean; feedback: string }) => {
    setChatLog([...chatLog, { sender: 'user', text: opt.text }]);
    setFeedback(opt.feedback);

    if (opt.correct) {
      onAddPoints(15);
      if (currentStep < steps.length - 1) {
        setTimeout(() => {
          const nextStep = currentStep + 1;
          setCurrentStep(nextStep);
          setChatLog(prev => [...prev, { sender: 'emma', text: steps[nextStep].emma }]);
          setFeedback(null);
        }, 1500);
      }
    }
  };

  return (
    <div className="flex flex-col justify-between min-h-[560px] p-6 max-w-4xl mx-auto">
      <div className="text-center space-y-2">
        <span className="px-3 py-1 rounded-full bg-purple-950/80 border border-purple-800 text-purple-300 text-xs font-bold uppercase tracking-wider">
          Интерактивен чат диалог · English A1–A2
        </span>
        <h2 className="text-3xl md:text-5xl font-extrabold text-white font-heading">
          CHAT WITH EMMA (A1–A2)
        </h2>
        <p className="text-slate-300 text-sm md:text-base">
          Отговори на въпросите на Emma, като използваш сложни изречения, съюзи и правилно минало време!
        </p>
      </div>

      {/* Messenger Box */}
      <div className="my-3 p-5 rounded-3xl bg-slate-950 border-2 border-slate-800 shadow-2xl space-y-4 max-w-lg mx-auto w-full">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
          <div className="w-10 h-10 rounded-full bg-cyan-600 flex items-center justify-center font-bold text-white text-base">
            E
          </div>
          <div>
            <div className="font-bold text-sm text-white">Emma (London)</div>
            <div className="text-[11px] text-emerald-400">Online · Conversational Partner</div>
          </div>
        </div>

        {/* Message stream */}
        <div className="space-y-3 min-h-[170px] max-h-[220px] overflow-y-auto p-2">
          {chatLog.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] p-3 rounded-2xl text-xs md:text-sm font-medium ${
                  msg.sender === 'user'
                    ? 'bg-cyan-600 text-white rounded-tr-sm'
                    : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-sm'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Reply choices */}
        <div className="space-y-2 pt-2 border-t border-slate-800">
          <span className="text-[11px] text-slate-400 font-bold uppercase block">
            Избери твоя отговор (A1-A2):
          </span>
          <div className="grid grid-cols-1 gap-1.5">
            {steps[currentStep].options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleChoose(opt)}
                className="w-full text-left p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 hover:border-cyan-400 hover:bg-slate-800 text-xs md:text-sm font-semibold transition-all cursor-pointer flex justify-between items-center"
              >
                <span>“{opt.text}”</span>
                <Send className="w-3.5 h-3.5 text-cyan-400 opacity-60 shrink-0 ml-2" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {feedback && (
        <div className="p-3 rounded-2xl bg-cyan-950/60 border border-cyan-500/40 text-cyan-200 text-xs md:text-sm text-center max-w-lg mx-auto animate-fade-in">
          {feedback}
        </div>
      )}

      <div className="flex justify-end pt-4 border-t border-slate-800">
        <button
          onClick={onNext}
          className="px-6 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
        >
          <span>Към Word Connections & Roots</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

// ======================== SLIDE 14: WORD CONNECTIONS & ROOTS ========================
export const Slide14WordConnections: React.FC<SlideProps> = ({ onNext, onAddPoints }) => {
  const rootGroups = [
    {
      root: 'tele- (гръцки: далеч / at a distance)',
      en: 'telephone, television, telescope',
      bg: 'телефон, телевизия, телескоп',
      meaning: 'Корен, навлязъл и в двата езика за описване на комуникация на далечни разстояния.'
    },
    {
      root: 'auto- (гръцки: сам / self)',
      en: 'automobile, autograph, automatic',
      bg: 'автомобил, автограф, автоматичен',
      meaning: 'Описва машини и действия, извършвани самостоятелно.'
    },
    {
      root: 'bio- (гръцки: живот / life)',
      en: 'biology, biography, biosphere',
      bg: 'биология, биография, биосфера',
      meaning: 'Фундаментален международен научен корен за изучаване на живота.'
    },
    {
      root: 'geo- (гръцки: земя / earth)',
      en: 'geography, geometry, geology',
      bg: 'география, геометрия, геология',
      meaning: 'Общ корен в науките за земята и пространствените форми.'
    }
  ];

  const [activeRoot, setActiveRoot] = useState(0);

  const curr = rootGroups[activeRoot];

  return (
    <div className="flex flex-col justify-between min-h-[560px] p-6 max-w-5xl mx-auto">
      <div className="text-center space-y-2">
        <span className="px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800 text-cyan-300 text-xs font-bold uppercase tracking-wider">
          Международна морфология · Лексика A1-A2
        </span>
        <h2 className="text-3xl md:text-5xl font-extrabold text-white font-heading">
          WORD CONNECTIONS & INTERNATIONAL ROOTS
        </h2>
        <p className="text-slate-300 text-sm md:text-base">
          Как международните латински и гръцки корени изграждат мост между английския и българския език:
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 my-4">
        {rootGroups.map((group, idx) => (
          <button
            key={group.root}
            onClick={() => {
              setActiveRoot(idx);
              onAddPoints(10);
            }}
            className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
              activeRoot === idx
                ? 'bg-cyan-500/20 border-cyan-400 text-white shadow-lg shadow-cyan-500/20'
                : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-600'
            }`}
          >
            <span className="text-xs uppercase font-bold text-slate-400 block mb-1">Корен:</span>
            <strong className="text-lg font-mono text-cyan-300 block mb-1">{group.root.split(' ')[0]}</strong>
            <span className="text-[11px] text-slate-400">{group.root.split('(')[1]?.replace(')', '')}</span>
          </button>
        ))}
      </div>

      {/* Expanded Root Explorer */}
      <div className="p-6 rounded-3xl bg-slate-900 border-2 border-cyan-500/40 shadow-2xl space-y-4 max-w-2xl mx-auto w-full">
        <h3 className="text-xl font-bold text-white font-heading font-mono">
          {curr.root}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs md:text-sm">
          <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
            <span className="text-xs text-purple-400 font-bold block mb-1">🇬🇧 English думи:</span>
            <span className="font-mono text-slate-200">{curr.en}</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
            <span className="text-xs text-emerald-400 font-bold block mb-1">🇧🇬 Български съответствия:</span>
            <span className="text-slate-200">{curr.bg}</span>
          </div>
        </div>

        <p className="text-xs text-slate-300 italic p-3 rounded-xl bg-indigo-950/40 border border-indigo-800/40">
          💡 {curr.meaning}
        </p>
      </div>

      <div className="flex justify-end pt-4 border-t border-slate-800">
        <button
          onClick={onNext}
          className="px-6 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
        >
          <span>Към Listen & Hunt (30s Challenge)</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

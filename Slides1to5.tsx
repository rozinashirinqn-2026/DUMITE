import React, { useState } from 'react';
import { 
  ArrowRight, 
  Play, 
  Pause, 
  Check, 
  HelpCircle, 
  Home, 
  Globe2, 
  Sparkles,
  Volume2,
  Compass,
  Award,
  BookOpen
} from 'lucide-react';
import { playEnglishAudio } from '../../utils/speech';

interface SlideProps {
  onNext: () => void;
  onAddPoints: (pts: number) => void;
}

// ======================== SLIDE 1: КОРИЦА (ДУМИТЕ – МОСТ МЕЖДУ ЕЗИЦИТЕ) ========================
export const SlideCover: React.FC<SlideProps> = ({ onNext, onAddPoints }) => {
  const [selectedPill, setSelectedPill] = useState<string | null>(null);
  const [showPlan, setShowPlan] = useState(false);
  const [isSpeakingWelcome, setIsSpeakingWelcome] = useState(false);

  const bridgeWords = [
    { word: 'кафе ⟷ coffee', en: 'coffee', note: 'Арабски (qahwah) ➔ османотурски ➔ български (кафе) и английски (coffee).' },
    { word: 'футбол ⟷ football', en: 'football', note: 'Английски (foot + ball) ➔ международен спорт и заемка в десетки езици.' },
    { word: 'шоколад ⟷ chocolate', en: 'chocolate', note: 'Ацтекски език нахуатъл (xocolatl) ➔ испански ➔ български и английски.' },
    { word: 'компютър ⟷ computer', en: 'computer', note: 'Латински computare ➔ английски ➔ универсален технологичен термин.' },
    { word: 'интернет ⟷ internet', en: 'internet', note: 'Международен термин (inter + net) за глобалната информационна мрежа.' },
  ];

  const handlePillClick = async (item: typeof bridgeWords[0]) => {
    setSelectedPill(item.word);
    onAddPoints(5);
    await playEnglishAudio(item.en);
  };

  const handleSpeakWelcome = async () => {
    setIsSpeakingWelcome(true);
    await playEnglishAudio("Welcome, language detectives! Today we explore words that build bridges between Bulgarian and English!", 0.85);
    setIsSpeakingWelcome(false);
  };

  const handleStartMission = () => {
    onAddPoints(10);
    onNext();
  };

  return (
    <div className="flex flex-col justify-between min-h-[580px] p-4 sm:p-6 max-w-5xl mx-auto space-y-4">
      {/* Top Banner Badges */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-cyan-950/90 border border-cyan-500/40 text-cyan-300 text-xs font-extrabold uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            Демонстрационен интегриран урок · VII клас
          </span>
          <span className="hidden md:inline-flex px-2.5 py-1 rounded-full bg-purple-950/70 border border-purple-800/60 text-purple-300 text-xs font-semibold">
            БЕЛ × English A1–A2
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleSpeakWelcome}
            disabled={isSpeakingWelcome}
            className={`px-3 py-1 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              isSpeakingWelcome
                ? 'bg-yellow-400 text-slate-950 animate-pulse'
                : 'bg-slate-900 border border-cyan-500/40 hover:bg-cyan-950 text-cyan-300'
            }`}
            title="Чуй аудио поздрав на английски език"
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>{isSpeakingWelcome ? 'Произнася...' : '🔊 ЧУЙ ПОЗДРАВ'}</span>
          </button>
          <button
            onClick={() => setShowPlan(!showPlan)}
            className="px-3 py-1 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-500 text-slate-300 text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors"
          >
            <BookOpen className="w-3.5 h-3.5 text-purple-400" />
            <span>{showPlan ? 'Скрий етапите' : '3-те етапа на урока'}</span>
          </button>
        </div>
      </div>

      {/* Main Title & Hero */}
      <div className="text-center space-y-2 py-2">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight font-heading">
          <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-purple-400 bg-clip-text text-transparent drop-shadow-sm">
            „ДУМИТЕ – МОСТ МЕЖДУ ЕЗИЦИТЕ“
          </span>
        </h1>
        <p className="text-slate-300 text-sm sm:text-base md:text-lg max-w-3xl mx-auto font-medium">
          Интерактивна дигитална мисия за произхода, пътешествията и силата на думите
        </p>
        <div className="flex flex-wrap items-center justify-center gap-2 pt-1 text-xs text-slate-400">
          <span className="px-2.5 py-0.5 rounded-md bg-slate-800/80 text-emerald-300 font-semibold border border-emerald-900">
            🏠 Домашни думи
          </span>
          <span>•</span>
          <span className="px-2.5 py-0.5 rounded-md bg-slate-800/80 text-cyan-300 font-semibold border border-cyan-900">
            🌍 Заемки & Етимология
          </span>
          <span>•</span>
          <span className="px-2.5 py-0.5 rounded-md bg-slate-800/80 text-purple-300 font-semibold border border-purple-900">
            🔎 Чуждици vs Книжовна реч
          </span>
          <span>•</span>
          <span className="px-2.5 py-0.5 rounded-md bg-slate-800/80 text-amber-300 font-semibold border border-amber-900">
            🇬🇧 English A1–A2
          </span>
        </div>
      </div>

      {/* Interactive Visual Bridge Centerpiece */}
      <div className="p-4 sm:p-5 rounded-3xl bg-slate-950/80 border-2 border-cyan-500/40 relative overflow-hidden shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-cyan-500/10 to-purple-500/5 pointer-events-none" />

        {/* Bridge Visual Container */}
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4 py-2">
          {/* Left Anchor: Bulgaria */}
          <div className="w-full md:w-1/4 p-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-center space-y-1">
            <span className="text-2xl">🇧🇬</span>
            <h3 className="font-extrabold text-sm sm:text-base text-emerald-300 font-heading">
              БЪЛГАРСКИ ЕЗИК
            </h3>
            <p className="text-[11px] text-slate-300 leading-tight">
              Родният езиков дом · Домашни думи от общославянско наследство
            </p>
            <div className="text-[10px] font-mono text-emerald-400/80 pt-1">
              вода · земя · майка · ден
            </div>
          </div>

          {/* Central Bridge Span with Interactive Words */}
          <div className="w-full md:w-2/4 flex flex-col items-center justify-center space-y-3 px-2">
            <div className="flex items-center justify-center gap-2 text-cyan-400 font-mono text-xs font-bold uppercase tracking-widest">
              <span className="animate-pulse">━━━</span>
              <span>🌉 ЕЗИКОВИЯТ МОСТ НА ДУМИТЕ 🌉</span>
              <span className="animate-pulse">━━━</span>
            </div>

            <p className="text-[11px] sm:text-xs text-slate-300 text-center">
              Кликни върху пътуваща дума от моста, за да чуеш произношението и нейния етимологичен път:
            </p>

            {/* Clickable Word Bridges */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              {bridgeWords.map((item) => {
                const isSelected = selectedPill === item.word;
                return (
                  <button
                    key={item.word}
                    onClick={() => handlePillClick(item)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer flex items-center gap-1.5 shadow-sm ${
                      isSelected
                        ? 'bg-cyan-500 text-slate-950 border-white scale-105 shadow-cyan-500/40'
                        : 'bg-slate-900 border-slate-700 text-cyan-300 hover:border-cyan-400 hover:bg-slate-800'
                    }`}
                  >
                    <span>{item.word}</span>
                    <Volume2 className="w-3 h-3 text-cyan-200" />
                  </button>
                );
              })}
            </div>

            {/* Dynamic Etymological Note */}
            {selectedPill && (
              <div className="w-full p-2.5 rounded-xl bg-cyan-950/60 border border-cyan-500/40 text-xs text-cyan-200 text-center animate-fade-in">
                💡 <strong>Етимологична следа:</strong> {bridgeWords.find(w => w.word === selectedPill)?.note}
              </div>
            )}
          </div>

          {/* Right Anchor: English & The World */}
          <div className="w-full md:w-1/4 p-3.5 rounded-2xl bg-purple-950/40 border border-purple-500/40 text-center space-y-1">
            <span className="text-2xl">🇬🇧</span>
            <h3 className="font-extrabold text-sm sm:text-base text-purple-300 font-heading">
              ENGLISH A1–A2
            </h3>
            <p className="text-[11px] text-slate-300 leading-tight">
              Световният езиков обмен · Лексика, слушане с разбиране и диалог
            </p>
            <div className="text-[10px] font-mono text-purple-400/80 pt-1">
              water · earth · mother · day
            </div>
          </div>
        </div>
      </div>

      {/* Optional Plan Preview Accordion */}
      {showPlan && (
        <div className="p-4 rounded-2xl bg-slate-900 border border-purple-500/30 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs animate-fade-in">
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="font-bold text-emerald-400 block">1️⃣ Етап I: Етимология & Морфология</span>
            <p className="text-slate-300 text-[11px]">
              Разкриваме корените, домашните думи, паспортите на заемките и граматичната адаптация в българския език.
            </p>
          </div>
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="font-bold text-cyan-400 block">2️⃣ Етап II: English A1–A2 & Чат детектив</span>
            <p className="text-slate-300 text-[11px]">
              „Лъжливи приятели“ (false friends), тийнейджърски жаргон, историята на Emma от Лондон и интерактивно слушане с произношение.
            </p>
          </div>
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="font-bold text-purple-400 block">3️⃣ Етап III: Строеж на моста, Quiz & Сертификат</span>
            <p className="text-slate-300 text-[11px]">
              Escape Room предизвикателство, изграждане на моста за 60s, комбиниран тест, Exit Ticket рефлексия и поименен сертификат.
            </p>
          </div>
        </div>
      )}

      {/* Mission Objective Brief Card */}
      <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs md:text-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-950 border border-cyan-500/40 flex items-center justify-center shrink-0 text-cyan-400">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-white">Роля в мисията: Езикови детективи (Language Detectives)</h4>
            <p className="text-slate-400 text-xs">
              Всяко успешно решено предизвикателство носи детективски точки и възстановява повреден сектор от моста!
            </p>
          </div>
        </div>

        {/* Big Start Button */}
        <button
          onClick={handleStartMission}
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 font-extrabold text-sm md:text-base shadow-lg shadow-cyan-500/30 transition-all transform hover:scale-105 flex items-center justify-center gap-2 cursor-pointer shrink-0"
        >
          <span>🚀 СТАРТИРАЙ ЕЗИКОВАТА МИСИЯ</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

// ======================== SLIDE 2: ПЪТУВАНЕТО НА ДУМИТЕ ========================
export const Slide1WordsTravel: React.FC<SlideProps> = ({ onNext, onAddPoints }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedWord, setSelectedWord] = useState<string | null>('Футбол');

  const facts: Record<string, { en: string; origin: string; journey: string; fact: string }> = {
    'Футбол': {
      en: 'football (foot + ball)',
      origin: 'Англия (19. век)',
      journey: 'Английски ➔ цяла Европа ➔ навлиза в България в края на 19. век с първите учители по гимнастика.',
      fact: 'В началото в България са опитвали да я наричат „ритнитоп“, но международната английска заемка трайно се е наложила.'
    },
    'Кафе': {
      en: 'coffee (Arabic ➔ Ottoman Turkish)',
      origin: 'Етиопия / Арабски полуостров',
      journey: 'Арабски (qahwah) ➔ османотурски (kahve) ➔ български (кафе) и английски (coffee).',
      fact: 'И българският, и английският език са взели думата от един и същи арабски корен през различни търговски пътища!'
    },
    'Шоколад': {
      en: 'chocolate (Nahuatl / Aztec)',
      origin: 'Централна Америка (древни ацтеки)',
      journey: 'Език нахуатъл (xocolatl) ➔ испански конкистадори ➔ френски ➔ български и английски.',
      fact: 'Първоначално напитката била горчива и пикантна с лют червен пипер, преди да бъде подсладена в Европа.'
    }
  };

  return (
    <div className="flex flex-col justify-between min-h-[560px] p-6 max-w-5xl mx-auto">
      <div className="text-center space-y-2">
        <span className="px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800 text-cyan-300 text-xs font-bold uppercase tracking-wider">
          Интегриран старт · Етимологична лаборатория
        </span>
        <h2 className="text-3xl md:text-5xl font-extrabold text-white font-heading">
          КАК ДУМИТЕ ПЪТУВАТ ПРЕЗ ВЕКОВЕТЕ
        </h2>
        <p className="text-slate-300 text-sm md:text-base max-w-2xl mx-auto">
          Думите не стоят изолирани в границите на една държава. Те пътуват с кораби, кервани, книги и дигитални мрежи, превръщайки се в мостове между народите!
        </p>
      </div>

      {/* Interactive Journey Simulator */}
      <div className="my-4 p-5 rounded-3xl bg-slate-900 border border-cyan-500/30 relative overflow-hidden shadow-xl">
        <div className="aspect-video max-h-52 w-full rounded-2xl bg-slate-950 border border-slate-800 flex flex-col items-center justify-center relative p-4 text-center">
          {isPlaying ? (
            <div className="space-y-3 animate-fade-in">
              <div className="flex items-center justify-center gap-3 text-3xl">
                <span>🚢</span>
                <span className="text-cyan-400 text-xl font-mono">➔ ➔ ➔</span>
                <span>🐫</span>
                <span className="text-purple-400 text-xl font-mono">➔ ➔ ➔</span>
                <span>🚂</span>
                <span className="text-emerald-400 text-xl font-mono">➔ ➔ ➔</span>
                <span>✈️</span>
              </div>
              <p className="text-cyan-300 font-bold text-sm md:text-base">
                Гледаш интерактивната симулация: Търговските и културни пътища на света!
              </p>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                Езиковият контакт е природен закон: когато народите общуват, техните езици обменят идеи и понятия.
              </p>
            </div>
          ) : (
            <div className="space-y-2.5">
              <button
                onClick={() => setIsPlaying(true)}
                className="w-14 h-14 rounded-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 flex items-center justify-center shadow-lg shadow-cyan-500/40 transition-transform hover:scale-110 cursor-pointer mx-auto"
              >
                <Play className="w-7 h-7 ml-1 fill-current" />
              </button>
              <span className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                ▶ СТАРТИРАЙ АНИМАЦИЯТА ЗА ПЪТЯ НА ДУМИТЕ
              </span>
            </div>
          )}

          {isPlaying && (
            <button
              onClick={() => setIsPlaying(false)}
              className="absolute bottom-3 right-3 px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 flex items-center gap-1 cursor-pointer"
            >
              <Pause className="w-3.5 h-3.5" /> Пауза
            </button>
          )}
        </div>
      </div>

      {/* Interactive Word Selector */}
      <div className="space-y-3">
        <h3 className="text-center font-bold text-sm md:text-base text-white">
          Избери дума от световните пътешественици за детективска експертиза:
        </h3>
        <div className="flex flex-wrap justify-center gap-3">
          {Object.keys(facts).map((word) => (
            <button
              key={word}
              onClick={() => {
                setSelectedWord(word);
                onAddPoints(10);
              }}
              className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all cursor-pointer border ${
                selectedWord === word
                  ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-md shadow-cyan-500/20 scale-105'
                  : 'bg-slate-900 border-slate-700 text-slate-200 hover:border-slate-500'
              }`}
            >
              {word}
            </button>
          ))}
        </div>

        {selectedWord && facts[selectedWord] && (
          <div className="p-4 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 text-xs md:text-sm text-cyan-200 animate-fade-in space-y-1.5 max-w-2xl mx-auto">
            <div className="flex justify-between items-center text-xs text-purple-300 font-mono">
              <span>🇬🇧 English съответствие: <strong>{facts[selectedWord].en}</strong></span>
              <button
                onClick={() => playEnglishAudio(facts[selectedWord].en.split(' ')[0])}
                className="text-cyan-400 hover:underline flex items-center gap-1 text-[11px]"
              >
                <Volume2 className="w-3.5 h-3.5" /> Чуй
              </button>
            </div>
            <p><strong>🌍 Произход:</strong> {facts[selectedWord].origin}</p>
            <p><strong>🗺️ Исторически път:</strong> {facts[selectedWord].journey}</p>
            <p className="text-amber-300">💡 <strong>Любопитен факт:</strong> {facts[selectedWord].fact}</p>
          </div>
        )}
      </div>

      <div className="flex justify-end pt-4 border-t border-slate-800">
        <button
          onClick={onNext}
          className="px-6 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
        >
          <span>Към Трите свята на думите</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

// ======================== SLIDE 2: ТРИТЕ СВЯТА НА ДУМИТЕ ========================
export const Slide2LabPortals: React.FC<SlideProps> = ({ onNext, onAddPoints }) => {
  const [activePortal, setActivePortal] = useState<'native' | 'borrowed' | 'foreign'>('native');

  const portals = [
    {
      id: 'native' as const,
      icon: '🏠',
      title: 'ДОМАШНИ ДУМИ',
      subtitle: 'Коренът на езика (Славянско наследство)',
      color: 'from-emerald-500/20 to-teal-500/10 border-emerald-500/40 text-emerald-300',
      activeBorder: 'border-emerald-400 shadow-emerald-500/20',
      content: {
        def: 'Думи, съществуващи в езика от най-дълбока древност. В българския език това са общославянски и старобългарски думи от праславянския речников фонд.',
        examples: 'майка, баща, земя, вода, небе, гора, ден, нощ, ръка, око, хляб, огън.',
        criteria: 'Формират основния речников фонд на езика. Назовават фундаментални за човека явления, природа, семейство и тяло.'
      }
    },
    {
      id: 'borrowed' as const,
      icon: '🌍',
      title: 'ЗАЕМКИ',
      subtitle: 'Приетите и адаптирани думи',
      color: 'from-cyan-500/20 to-blue-500/10 border-cyan-500/40 text-cyan-300',
      activeBorder: 'border-cyan-400 shadow-cyan-500/20',
      content: {
        def: 'Думи от чужд произход, навлезли поради исторически, културни, научни или търговски връзки, които са се приспособили напълно към българската система.',
        examples: 'кафе, чай, шоколад, футбол, компютър, балет, гара, телефон, ресторант.',
        criteria: 'Подчиняват се на правилата на българската граматика: членуват се (компютърът), имат множествено число (компютри) и образуват сродни думи (компютърен).'
      }
    },
    {
      id: 'foreign' as const,
      icon: '🔎',
      title: 'ЧУЖДИЦИ',
      subtitle: 'Думите с чужд облик (гостите)',
      color: 'from-purple-500/20 to-pink-500/10 border-purple-500/40 text-purple-300',
      activeBorder: 'border-purple-400 shadow-purple-500/20',
      content: {
        def: 'Думи от чужд произход, които не са напълно усвоени, звучат чуждо или имат точен, ясен и утвърден български книжовен еквивалент.',
        examples: 'лайк (= харесване), фийдбек (= обратна връзка), локация (= местоположение), стори (= история/видео), ъпдейтвам (= актуализирам).',
        criteria: 'Внимание: В официалното писмено и устно общуване е белег на езикова култура да предпочитаме българските съответствия пред ненужните чуждици!'
      }
    }
  ];

  const current = portals.find(p => p.id === activePortal)!;

  return (
    <div className="flex flex-col justify-between min-h-[560px] p-6 max-w-5xl mx-auto">
      <div className="text-center space-y-2">
        <span className="px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800 text-cyan-300 text-xs font-bold uppercase tracking-wider">
          Теория и морфологични критерии · VII клас
        </span>
        <h2 className="text-3xl md:text-5xl font-extrabold text-white font-heading">
          ТРИТЕ СВЯТА НА ДУМИТЕ
        </h2>
        <p className="text-slate-300 text-sm md:text-base">
          Кликни върху всеки от трите портала, за да видиш неговите точни граматични и езикови критерии!
        </p>
      </div>

      {/* 3 Portals */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
        {portals.map((p) => {
          const isActive = activePortal === p.id;
          return (
            <button
              key={p.id}
              onClick={() => {
                setActivePortal(p.id);
                onAddPoints(10);
              }}
              className={`p-5 rounded-3xl text-left transition-all border bg-gradient-to-b ${p.color} cursor-pointer relative overflow-hidden ${
                isActive ? `${p.activeBorder} shadow-2xl scale-[1.02]` : 'hover:border-slate-600 opacity-80 hover:opacity-100'
              }`}
            >
              <div className="text-4xl mb-3">{p.icon}</div>
              <h3 className="text-xl font-bold font-heading text-white">{p.title}</h3>
              <p className="text-xs text-slate-300 mt-1">{p.subtitle}</p>
            </button>
          );
        })}
      </div>

      {/* Definition & Criteria */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-700/80 shadow-xl space-y-3 animate-fade-in">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{current.icon}</span>
          <h4 className="text-lg font-bold text-white font-heading">
            {current.title} — Определение и признаци:
          </h4>
        </div>
        <p className="text-slate-300 text-sm md:text-base leading-relaxed">
          {current.content.def}
        </p>
        <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-xs md:text-sm">
          <strong className="text-cyan-400 block mb-1">Примери:</strong>
          <span className="text-slate-200">{current.content.examples}</span>
        </div>
        <div className="p-3 rounded-xl bg-indigo-950/40 border border-indigo-800/40 text-xs text-indigo-200">
          💡 <strong>Граматичен критерий:</strong> {current.content.criteria}
        </div>
      </div>

      <div className="flex justify-end pt-4 border-t border-slate-800">
        <button
          onClick={onNext}
          className="px-6 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
        >
          <span>Към Езиковия дом & Индоевропейските корени</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

// ======================== SLIDE 3: ЕЗИКОВИЯТ ДОМ & ИНДОЕВРОПЕЙСКИ КОРЕНИ (КОМБИНИРАНА) ========================
export const Slide3LanguageHomeAndRoots: React.FC<SlideProps> = ({ onNext, onAddPoints }) => {
  const cognatePairs = [
    { bg: 'вода', en: 'water', root: 'Индоевропейски корен *wod- / *wed-' },
    { bg: 'майка / мати', en: 'mother', root: 'Индоевропейски корен *méh₂tēr' },
    { bg: 'брат', en: 'brother', root: 'Индоевропейски корен *bʰréh₂tēr' },
    { bg: 'нощ', en: 'night', root: 'Индоевропейски корен *nókʷts' },
    { bg: 'слънце', en: 'sun (solar)', root: 'Индоевропейски корен *sóh₂wl̥' },
    { bg: 'око', en: 'eye (ocular)', root: 'Индоевропейски корен *h₃okʷ-' },
    { bg: 'нос', en: 'nose', root: 'Индоевропейски корен *néh₂s-' },
    { bg: 'ден', en: 'day', root: 'Индоевропейски корен *dʰegʷʰ-' }
  ];

  const [revealed, setRevealed] = useState<number[]>([]);

  const handleReveal = async (idx: number) => {
    if (!revealed.includes(idx)) {
      setRevealed([...revealed, idx]);
      onAddPoints(10);
      await playEnglishAudio(cognatePairs[idx].en);
    }
  };

  const handleRevealAll = () => {
    setRevealed(cognatePairs.map((_, i) => i));
    onAddPoints(40);
  };

  return (
    <div className="flex flex-col justify-between min-h-[560px] p-6 max-w-5xl mx-auto">
      <div className="text-center space-y-2">
        <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-800 text-emerald-300 text-xs font-bold uppercase tracking-wider">
          Комбинирана задача · Български език × English A1-A2
        </span>
        <h2 className="text-3xl md:text-5xl font-extrabold text-white font-heading">
          ЕЗИКОВИЯТ ДОМ И ДРЕВНОТО РОДСТВО
        </h2>
        <p className="text-slate-300 text-sm md:text-base max-w-2xl mx-auto">
          Знаехте ли, че българският и английският език са родственици от общото индоевропейско езиково семейство? Кликни върху всяка домашна дума, за да откриеш нейния сестрински корен в английския език!
        </p>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleRevealAll}
          className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold"
        >
          Разкрий всички връзки наведнъж
        </button>
      </div>

      {/* Grid of Cognates */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 my-4">
        {cognatePairs.map((pair, idx) => {
          const isOpen = revealed.includes(idx);
          return (
            <button
              key={pair.bg}
              onClick={() => handleReveal(idx)}
              className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                isOpen
                  ? 'bg-emerald-950/40 border-emerald-400 text-white shadow-lg shadow-emerald-500/20'
                  : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-cyan-500 hover:bg-slate-850'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs uppercase font-bold text-slate-400">Родна дума</span>
                <span className="text-xs">{isOpen ? '✓ Открит' : '🔍 Клик'}</span>
              </div>
              <div className="text-xl font-extrabold text-emerald-300 mb-1 font-heading">
                🇧🇬 {pair.bg}
              </div>

              {isOpen ? (
                <div className="pt-2 border-t border-slate-800/80 space-y-1 animate-fade-in">
                  <div className="flex items-center justify-between font-mono font-bold text-cyan-300 text-base">
                    <span>🇬🇧 {pair.en}</span>
                    <Volume2 className="w-4 h-4 text-cyan-400" />
                  </div>
                  <span className="text-[10px] text-slate-400 block">{pair.root}</span>
                </div>
              ) : (
                <div className="text-xs text-slate-500 italic mt-2">
                  Кликни за английския близнак...
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Pedagogical takeaway */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-cyan-500/30 text-xs md:text-sm text-slate-300 text-center">
        💡 <strong>Големият извод:</strong> Домашните думи не просто пазят българския ни корен — те ни свързват с милиони говорители по света през хилядолетното общо езиково дърво!
      </div>

      <div className="flex justify-end pt-4 border-t border-slate-800">
        <button
          onClick={onNext}
          className="px-6 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
        >
          <span>Към Заемките (Международният куфар)</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

// ======================== SLIDE 4: ЗАЕМКИТЕ И МЕЖДУНАРОДНИЯТ КУФАР ========================
export const Slide4BorrowingsPassport: React.FC<SlideProps> = ({ onNext, onAddPoints }) => {
  const loanwords = [
    { word: 'кафе', en: 'coffee', origin: 'Арабски ➔ Османотурски', route: 'qahwah ➔ kahve ➔ кафе', adaptation: 'членува се (кафето), мн. ч. (кафета), прилагателно (кафяв/кафен).' },
    { word: 'шоколад', en: 'chocolate', origin: 'Ацтекски ➔ Испански ➔ Френски', route: 'xocolatl ➔ chocolate ➔ шоколад', adaptation: 'членува се (шоколадът), образува шоколадов, шоколади.' },
    { word: 'футбол', en: 'football', origin: 'Английски (foot + ball)', route: 'foot + ball ➔ football ➔ футбол', adaptation: 'членува се (футболът), образува футболен, футболист, футболистка.' },
    { word: 'балет', en: 'ballet', origin: 'Италиански ➔ Френски', route: 'ballo ➔ ballet ➔ балет', adaptation: 'образува балети, балетен, балерина, балетист.' },
    { word: 'компютър', en: 'computer', origin: 'Английски (лат. computare)', route: 'computare ➔ computer ➔ компютър', adaptation: 'образува компютри, компютърът, компютърен, компютъризирам.' },
    { word: 'гара', en: 'station / gare', origin: 'Френски', route: 'gare ➔ гара', adaptation: 'образува гара, гарата, гари, гаров.' },
    { word: 'ресторант', en: 'restaurant', origin: 'Френски (restaurer - възстановявам)', route: 'restaurant ➔ ресторант', adaptation: 'образува ресторантът, ресторанти, ресторантьор.' },
  ];

  const [activeIdx, setActiveIdx] = useState(0);

  const curr = loanwords[activeIdx];

  return (
    <div className="flex flex-col justify-between min-h-[560px] p-6 max-w-5xl mx-auto">
      <div className="text-center space-y-2">
        <span className="px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800 text-cyan-300 text-xs font-bold uppercase tracking-wider">
          Изследване на адаптацията
        </span>
        <h2 className="text-3xl md:text-5xl font-extrabold text-white font-heading">
          ЗАЕМКИТЕ И МЕЖДУНАРОДНИЯТ КУФАР
        </h2>
        <p className="text-slate-300 text-sm md:text-base">
          Как една чужда дума се превръща в пълноправен гражданин на българския език?
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-6 items-center">
        {/* Word Selection List */}
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block px-2">
            Избери дума от куфара:
          </span>
          <div className="flex flex-col gap-1.5">
            {loanwords.map((item, idx) => (
              <button
                key={item.word}
                onClick={() => {
                  setActiveIdx(idx);
                  onAddPoints(5);
                }}
                className={`flex items-center justify-between px-4 py-2.5 rounded-2xl font-bold text-sm transition-all border text-left cursor-pointer ${
                  activeIdx === idx
                    ? 'bg-cyan-600/30 border-cyan-400 text-white shadow-lg shadow-cyan-500/20 translate-x-2'
                    : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <span>{item.word}</span>
                <span className="text-xs font-mono text-purple-300">{item.en}</span>
              </button>
            ))}
          </div>
        </div>

        {/* The Passport Details */}
        <div className="md:col-span-2 p-6 rounded-3xl bg-slate-900 border-2 border-cyan-500/40 shadow-2xl relative space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-3">
              <span className="text-4xl">🧳</span>
              <div>
                <span className="text-xs uppercase tracking-wider text-cyan-400 font-bold">
                  Езиков паспорт на заемката
                </span>
                <h3 className="text-2xl font-extrabold text-white uppercase font-heading">
                  {curr.word} <span className="text-base text-purple-300 font-mono font-normal">/ {curr.en} /</span>
                </h3>
              </div>
            </div>
            <button
              onClick={() => playEnglishAudio(curr.en.split(' ')[0])}
              className="px-3 py-1.5 rounded-xl bg-purple-600/30 border border-purple-500/50 hover:bg-purple-600/50 text-purple-200 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>Чуй на английски</span>
            </button>
          </div>

          <div className="space-y-2.5">
            <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800">
              <span className="text-xs text-slate-400 block mb-0.5">🌍 Произход и изходен език:</span>
              <p className="text-cyan-300 font-semibold text-sm md:text-base">{curr.origin}</p>
            </div>

            <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800">
              <span className="text-xs text-slate-400 block mb-0.5">🗺️ Исторически път:</span>
              <p className="text-purple-300 font-mono text-xs md:text-sm">{curr.route}</p>
            </div>

            <div className="p-3 rounded-2xl bg-emerald-950/30 border border-emerald-800/40 text-xs md:text-sm text-slate-200">
              <strong className="text-emerald-400 block mb-0.5">Как е адаптирана в българската граматика:</strong>
              {curr.adaptation}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-4 border-t border-slate-800">
        <button
          onClick={onNext}
          className="px-6 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
        >
          <span>Към Интерактивния атлас</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

// ======================== SLIDE 5: ИНТЕРАКТИВЕН АТЛАС НА МАРШРУТИТЕ ========================
export const Slide5LanguageAtlas: React.FC<SlideProps> = ({ onNext, onAddPoints }) => {
  const mapHotspots = [
    {
      id: 'uk',
      title: 'Великобритания (Лондон)',
      flag: '🇬🇧',
      x: '25%',
      y: '30%',
      words: ['football', 'sport', 'computer', 'internet', 'tennis', 'sandwich'],
      info: 'С индустриалната революция и спорта английският език става глобален източник на лексика за технологии, медии и спорт.'
    },
    {
      id: 'fr',
      title: 'Франция (Париж)',
      flag: '🇫🇷',
      x: '38%',
      y: '45%',
      words: ['gare (гара)', 'ballet (балет)', 'trottoir (тротоар)', 'restaurant (ресторант)', 'étage (етаж)'],
      info: 'През 19. и 20. век френският език е езикът на дипломацията, модата, изкуството и градоустройството в цяла Европа.'
    },
    {
      id: 'tr',
      title: 'Ориент & Турция',
      flag: '🇹🇷',
      x: '75%',
      y: '65%',
      words: ['pazar (пазар)', 'çeşme (чешма)', 'kahve (кафе)', 'çay (чай)', 'bazar (базар)'],
      info: 'Векове търговия и съвместен живот са оставили богата битова и кулинарна лексика в българския език.'
    },
    {
      id: 'ame',
      title: 'Америка (Древни езици)',
      flag: '🌎',
      x: '10%',
      y: '70%',
      words: ['chocolate (xocolatl)', 'tomato (tomatl)', 'cacao (kakawa)', 'potato (patata)'],
      info: 'След Великите географски открития имената на новите храни преминават през испански към английски, български и света.'
    }
  ];

  const [activePin, setActivePin] = useState<number>(0);
  const curr = mapHotspots[activePin];

  return (
    <div className="flex flex-col justify-between min-h-[560px] p-6 max-w-5xl mx-auto">
      <div className="text-center space-y-2">
        <span className="px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-800 text-indigo-300 text-xs font-bold uppercase tracking-wider">
          Географски езиков атлас
        </span>
        <h2 className="text-3xl md:text-5xl font-extrabold text-white font-heading">
          СВЕТОВНИТЕ МАРШРУТИ НА ДУМИТЕ
        </h2>
        <p className="text-slate-300 text-sm md:text-base">
          Кликни върху светлинните центрове, за да проследиш езиковите маршрути към България и света!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-6 items-center">
        {/* Map Stage */}
        <div className="md:col-span-2 h-[320px] rounded-3xl bg-slate-950 border border-cyan-500/30 relative overflow-hidden shadow-2xl p-4 flex flex-col justify-between">
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]" />

          {/* Bulgaria Center */}
          <div className="absolute left-[62%] top-[55%] -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
            <span className="relative flex h-6 w-6">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-6 w-6 bg-emerald-500 text-[10px] items-center justify-center font-bold text-slate-950">🇧🇬</span>
            </span>
            <span className="text-[11px] font-bold text-emerald-300 mt-1 bg-slate-950/90 px-2 py-0.5 rounded border border-emerald-500/40">
              БЪЛГАРИЯ
            </span>
          </div>

          {/* Hotspots */}
          {mapHotspots.map((pin, idx) => {
            const isActive = activePin === idx;
            return (
              <button
                key={pin.id}
                onClick={() => {
                  setActivePin(idx);
                  onAddPoints(10);
                }}
                style={{ left: pin.x, top: pin.y }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all cursor-pointer ${
                  isActive
                    ? 'bg-cyan-500 text-slate-950 border-white font-bold scale-110 shadow-lg shadow-cyan-500/50'
                    : 'bg-slate-900/90 text-slate-300 border-slate-700 hover:border-cyan-400'
                }`}
              >
                <span>{pin.flag}</span>
                <span className="text-xs font-semibold">{pin.title.split(' ')[0]}</span>
              </button>
            );
          })}

          <div className="z-10 text-[11px] text-slate-400 font-mono mt-auto flex justify-between">
            <span>● ИЗБЕРИ ЕЗИКОВ ЦЕНТЪР</span>
            <span>МАРШРУТИ НА КУЛТУРНИЯ ОБМЕН ➔</span>
          </div>
        </div>

        {/* Selected Hub Card */}
        <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-3.5 shadow-xl">
          <div className="flex items-center gap-2 text-cyan-400 font-bold text-base">
            <span className="text-2xl">{curr.flag}</span>
            <span>{curr.title}</span>
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
              Думи от този маршрут:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {curr.words.map((w, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-200"
                >
                  {w}
                </span>
              ))}
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800 text-xs text-slate-300 leading-relaxed">
            {curr.info}
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-4 border-t border-slate-800">
        <button
          onClick={onNext}
          className="px-6 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
        >
          <span>Към Детектив в чата (Чуждици)</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  RotateCcw, 
  Timer as TimerIcon, 
  CheckCircle, 
  Sparkles, 
  Award, 
  Printer, 
  Download,
  HelpCircle
} from 'lucide-react';
import { triggerConfetti } from '../../utils/confetti';
import { downloadStandaloneHtml } from '../../utils/exportHtml';

interface SlideProps {
  onNext: () => void;
  onAddPoints: (pts: number) => void;
  totalPoints: number;
}

// ======================== SLIDE 19: ПОСТРОЙ МОСТА ========================
export const Slide19BuildBridge: React.FC<SlideProps> = ({ onNext, onAddPoints }) => {
  interface BridgeWord {
    id: number;
    text: string;
    cat: 'home' | 'borrowed' | 'foreign' | 'en';
  }

  const allWords: BridgeWord[] = [
    { id: 1, text: 'майка', cat: 'home' },
    { id: 2, text: 'вода', cat: 'home' },
    { id: 3, text: 'земя', cat: 'home' },
    { id: 4, text: 'кафе', cat: 'borrowed' },
    { id: 5, text: 'футбол', cat: 'borrowed' },
    { id: 6, text: 'компютър', cat: 'borrowed' },
    { id: 7, text: 'лайк', cat: 'foreign' },
    { id: 8, text: 'фийдбек', cat: 'foreign' },
    { id: 9, text: 'стори', cat: 'foreign' },
    { id: 10, text: 'visited (Past Simple)', cat: 'en' },
    { id: 11, text: 'bridge', cat: 'en' },
    { id: 12, text: 'because (съюз)', cat: 'en' },
  ];

  const [placed, setPlaced] = useState<Record<number, string>>({});
  const [timeLeft, setTimeLeft] = useState(60);
  const [timerActive, setTimerActive] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    let t: any;
    if (timerActive && timeLeft > 0) {
      t = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (timeLeft === 0) {
      setTimerActive(false);
    }
    return () => clearInterval(t);
  }, [timerActive, timeLeft]);

  const handlePlace = (wordId: number, targetCat: 'home' | 'borrowed' | 'foreign' | 'en') => {
    const item = allWords.find(w => w.id === wordId);
    if (!item) return;

    if (item.cat === targetCat) {
      setPlaced({ ...placed, [wordId]: targetCat });
      setFeedback(`Вярно поставен мостов елемент: „${item.text}“! 🌉`);
      onAddPoints(10);
    } else {
      setFeedback(`Внимание: „${item.text}“ не принадлежи към тази колона.`);
    }
  };

  const handleSolveAll = () => {
    const solved: Record<number, string> = {};
    allWords.forEach(w => { solved[w.id] = w.cat; });
    setPlaced(solved);
    triggerConfetti();
    onAddPoints(40);
  };

  const remaining = allWords.filter(w => !placed[w.id]);
  const placedCount = Object.keys(placed).length;

  return (
    <div className="flex flex-col justify-between min-h-[560px] p-6 max-w-5xl mx-auto">
      <div className="text-center space-y-2">
        <span className="px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800 text-cyan-300 text-xs font-bold uppercase tracking-wider">
          Строеж на моста · 4 зони · Синтез на знанията
        </span>
        <h2 className="text-3xl md:text-5xl font-extrabold text-white font-heading">
          ПОСТРОЙ МОСТА (СИНТЕЗ)
        </h2>
        <p className="text-slate-300 text-sm md:text-base">
          Постави 12-те комбинирани елемента в 4-те мостови зони преди да изтече таймерът!
        </p>
      </div>

      {/* Timer Bar */}
      <div className="my-2 p-3 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => { setTimeLeft(60); setTimerActive(true); }}
            className="px-4 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer"
          >
            <TimerIcon className="w-3.5 h-3.5" />
            <span>{timerActive ? 'Рестартирай таймера' : 'Стартирай таймер (60 сек)'}</span>
          </button>
          <button
            onClick={handleSolveAll}
            className="text-xs text-cyan-400 hover:text-cyan-300 px-2 py-1 font-semibold cursor-pointer"
          >
            Подреди всички
          </button>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-400 font-mono font-bold">
            Построено: <strong className="text-cyan-400">{placedCount} / 12</strong>
          </span>
          <span className="px-3 py-1 rounded-lg bg-slate-950 border border-slate-800 font-mono font-bold text-amber-300 text-sm">
            ⏱ {timeLeft}s
          </span>
        </div>
      </div>

      {/* Bank of remaining elements */}
      <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800 min-h-[50px] flex flex-wrap gap-2 items-center">
        {remaining.length === 0 ? (
          <span className="text-xs text-emerald-400 font-bold mx-auto">
            🎉 Мостът е напълно построен! Всички 12 елемента са класифицирани отлично!
          </span>
        ) : (
          remaining.map(w => (
            <div
              key={w.id}
              className="px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-200 font-bold text-xs flex items-center gap-1.5"
            >
              <span>{w.text}</span>
            </div>
          ))
        )}
      </div>

      {/* 4 Bridge Zones */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 my-3">
        {/* Zone 1: Домашна */}
        <div className="p-3 rounded-2xl bg-slate-900 border-2 border-emerald-500/30 flex flex-col justify-between min-h-[160px]">
          <div>
            <span className="text-xs font-bold text-emerald-400 block mb-1">🏠 ДОМАШНА</span>
            <div className="flex flex-wrap gap-1 min-h-[60px] p-1.5 rounded-xl bg-slate-950/60">
              {allWords.filter(w => placed[w.id] === 'home').map(w => (
                <span key={w.id} className="text-[11px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-200 font-bold">
                  {w.text}
                </span>
              ))}
            </div>
          </div>
          {remaining.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-1">
              {remaining.slice(0, 2).map(w => (
                <button
                  key={w.id}
                  onClick={() => handlePlace(w.id, 'home')}
                  className="text-[9px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 hover:text-emerald-300"
                >
                  +{w.text.split(' ')[0]}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Zone 2: Заемка */}
        <div className="p-3 rounded-2xl bg-slate-900 border-2 border-cyan-500/30 flex flex-col justify-between min-h-[160px]">
          <div>
            <span className="text-xs font-bold text-cyan-400 block mb-1">🌍 ЗАЕМКА</span>
            <div className="flex flex-wrap gap-1 min-h-[60px] p-1.5 rounded-xl bg-slate-950/60">
              {allWords.filter(w => placed[w.id] === 'borrowed').map(w => (
                <span key={w.id} className="text-[11px] px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-200 font-bold">
                  {w.text}
                </span>
              ))}
            </div>
          </div>
          {remaining.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-1">
              {remaining.slice(0, 2).map(w => (
                <button
                  key={w.id}
                  onClick={() => handlePlace(w.id, 'borrowed')}
                  className="text-[9px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 hover:text-cyan-300"
                >
                  +{w.text.split(' ')[0]}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Zone 3: Чуждица */}
        <div className="p-3 rounded-2xl bg-slate-900 border-2 border-purple-500/30 flex flex-col justify-between min-h-[160px]">
          <div>
            <span className="text-xs font-bold text-purple-400 block mb-1">🔎 ЧУЖДИЦА</span>
            <div className="flex flex-wrap gap-1 min-h-[60px] p-1.5 rounded-xl bg-slate-950/60">
              {allWords.filter(w => placed[w.id] === 'foreign').map(w => (
                <span key={w.id} className="text-[11px] px-2 py-0.5 rounded bg-purple-500/20 text-purple-200 font-bold">
                  {w.text}
                </span>
              ))}
            </div>
          </div>
          {remaining.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-1">
              {remaining.slice(0, 2).map(w => (
                <button
                  key={w.id}
                  onClick={() => handlePlace(w.id, 'foreign')}
                  className="text-[9px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 hover:text-purple-300"
                >
                  +{w.text.split(' ')[0]}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Zone 4: English A1-A2 */}
        <div className="p-3 rounded-2xl bg-slate-900 border-2 border-indigo-500/30 flex flex-col justify-between min-h-[160px]">
          <div>
            <span className="text-xs font-bold text-indigo-400 block mb-1">🇬🇧 ENGLISH A1-A2</span>
            <div className="flex flex-wrap gap-1 min-h-[60px] p-1.5 rounded-xl bg-slate-950/60">
              {allWords.filter(w => placed[w.id] === 'en').map(w => (
                <span key={w.id} className="text-[11px] px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-200 font-bold font-mono">
                  {w.text}
                </span>
              ))}
            </div>
          </div>
          {remaining.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-1">
              {remaining.slice(0, 2).map(w => (
                <button
                  key={w.id}
                  onClick={() => handlePlace(w.id, 'en')}
                  className="text-[9px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 hover:text-indigo-300"
                >
                  +{w.text.split(' ')[0]}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {feedback && (
        <div className="text-center text-xs text-cyan-300 font-semibold">{feedback}</div>
      )}

      <div className="flex justify-end pt-4 border-t border-slate-800">
        <button
          onClick={onNext}
          className="px-6 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
        >
          <span>Към Финален интегриран Quiz</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

// ======================== SLIDE 20: ФИНАЛЕН ИНТЕГРИРАН QUIZ ========================
export const Slide20FinalQuiz: React.FC<SlideProps> = ({ onNext, onAddPoints }) => {
  const questions = [
    {
      q: '1. Каква е съществената разлика между заемка и чуждица в българския език?',
      options: [
        { text: 'Заемката е напълно усвоена граматически и фонетично, докато чуждицата звучи чуждо или има точен български еквивалент.', isCorrect: true },
        { text: 'Заемките са само думи от английски, а чуждиците – от френски.', isCorrect: false },
        { text: 'Няма никаква разлика между тях.', isCorrect: false }
      ],
      expl: 'Заемките са се приспособили (членуват се, образуват мн. ч. и сродни думи), докато за чуждиците е по-добре да използваме българския книжовен синоним.'
    },
    {
      q: '2. Коя английска дума е „лъжлив приятел“ (false friend) и означава „плат“, а не „фабрика“?',
      options: [
        { text: 'fabric', isCorrect: true },
        { text: 'factory', isCorrect: false },
        { text: 'facility', isCorrect: false }
      ],
      expl: 'Fabric = плат / текстил! Фабрика на английски е factory.'
    },
    {
      q: '3. Кое изречение на английски език (A1-A2) е граматически правилно в Past Simple?',
      options: [
        { text: 'Emma visited Bulgaria last summer and learned new words.', isCorrect: true },
        { text: 'Emma visit Bulgaria last summer and learn new words.', isCorrect: false },
        { text: 'Emma was visit Bulgaria last summer.', isCorrect: false }
      ],
      expl: 'Завършено действие в миналото с правилни глаголи с окончание -ed (visited, learned).'
    },
    {
      q: '4. Коя двойка думи доказва древното индоевропейско родство между български и английски?',
      options: [
        { text: 'вода ⟷ water', isCorrect: true },
        { text: 'гара ⟷ station', isCorrect: false },
        { text: 'кафе ⟷ coffee', isCorrect: false }
      ],
      expl: '„вода“ и „water“ произлизат от един и същи праиндоевропейски корен *wod- преди хилядолетия!'
    },
    {
      q: '5. Защо думите навлизат от един език в друг през вековете?',
      options: [
        { text: 'Защото народите общуват, търгуват, пътуват и развиват съвместно наука и технологии.', isCorrect: true },
        { text: 'Защото езиците са абсолютно беззащитни и еднакви.', isCorrect: false },
        { text: 'Защото думите не могат да стоят на едно място повече от 10 години.', isCorrect: false }
      ],
      expl: 'Езиковият контакт е естествено следствие от културния, търговски и научен диалог между народите.'
    }
  ];

  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);

  const calculateScore = () => {
    let score = 0;
    questions.forEach((q, idx) => {
      const chosen = answers[idx];
      if (chosen !== undefined && q.options[chosen].isCorrect) score++;
    });
    return score;
  };

  const handleFinish = () => {
    setShowResults(true);
    const score = calculateScore();
    onAddPoints(score * 15);
    triggerConfetti();
  };

  return (
    <div className="flex flex-col justify-between min-h-[560px] p-6 max-w-4xl mx-auto">
      <div className="text-center space-y-2">
        <span className="px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800 text-cyan-300 text-xs font-bold uppercase tracking-wider">
          Окончателна проверка · БЕЛ × English A1-A2
        </span>
        <h2 className="text-3xl md:text-5xl font-extrabold text-white font-heading">
          ФИНАЛЕН ИНТЕГРИРАН QUIZ
        </h2>
        <p className="text-slate-300 text-sm md:text-base">
          Провери своите детективски знания по български и английски език:
        </p>
      </div>

      <div className="my-4 space-y-3.5 max-h-[320px] overflow-y-auto pr-2">
        {questions.map((q, qIdx) => (
          <div key={qIdx} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <h3 className="font-bold text-sm md:text-base text-white">{q.q}</h3>
            <div className="space-y-1.5">
              {q.options.map((opt, optIdx) => {
                const isChosen = answers[qIdx] === optIdx;
                return (
                  <button
                    key={optIdx}
                    onClick={() => setAnswers({ ...answers, [qIdx]: optIdx })}
                    className={`w-full text-left p-2.5 rounded-xl border text-xs md:text-sm font-medium transition-all cursor-pointer ${
                      isChosen
                        ? showResults
                          ? opt.isCorrect
                            ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300'
                            : 'bg-red-500/20 border-red-400 text-red-300'
                          : 'bg-cyan-500/20 border-cyan-400 text-white'
                        : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-600'
                    }`}
                  >
                    {opt.text}
                  </button>
                );
              })}
            </div>
            {showResults && (
              <div className="text-[11px] text-cyan-300/80 pt-1 italic">
                💡 {q.expl}
              </div>
            )}
          </div>
        ))}
      </div>

      {showResults && (
        <div className="p-3 rounded-2xl bg-emerald-950/50 border border-emerald-500/50 text-center font-bold text-emerald-300 text-base animate-fade-in">
          Твоят резултат: {calculateScore()} / 5 правилни отговора! 🏆
        </div>
      )}

      <div className="flex justify-between items-center pt-4 border-t border-slate-800">
        {!showResults ? (
          <button
            onClick={handleFinish}
            disabled={Object.keys(answers).length < 5}
            className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-sm shadow-md transition-all cursor-pointer"
          >
            Предай отговорите ({Object.keys(answers).length}/5)
          </button>
        ) : (
          <span className="text-xs text-slate-400">Успешно оценен тест!</span>
        )}

        <button
          onClick={onNext}
          className="px-6 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
        >
          <span>Към Exit Ticket</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

// ======================== SLIDE 21: EXIT TICKET ========================
export const Slide21ExitTicket: React.FC<SlideProps> = ({ onNext, onAddPoints }) => {
  const [ref1, setRef1] = useState('че езиците не са изолирани, а споделят хилядолетни общи корени и заемки.');
  const [ref2, setRef2] = useState('да разпознавам лъжливите приятели (като fabric и actual) и да пазя чистотата на българския език.');
  const [ref3, setRef3] = useState('с любопитство към нейния произход и с желание да знам българското й книжовно съответствие.');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    onAddPoints(25);
  };

  return (
    <div className="flex flex-col justify-between min-h-[560px] p-6 max-w-4xl mx-auto">
      <div className="text-center space-y-2">
        <span className="px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800 text-cyan-300 text-xs font-bold uppercase tracking-wider">
          Преди да напуснеш моста · Критическа рефлексия
        </span>
        <h2 className="text-3xl md:text-5xl font-extrabold text-white font-heading">
          EXIT TICKET (БИЛЕТ ЗА ИЗХОД)
        </h2>
        <p className="text-slate-300 text-sm md:text-base">
          Попълни трите рефлексивни карти или въведи свои собствени мисли за урока:
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 my-4">
        <div className="p-4 rounded-3xl bg-slate-900 border border-amber-500/40 space-y-2.5 shadow-xl">
          <div className="flex items-center gap-2 text-amber-300 font-bold text-sm">
            <span className="text-xl">💡</span>
            <span>Днес разбрах, че...</span>
          </div>
          <textarea
            value={ref1}
            onChange={(e) => setRef1(e.target.value)}
            rows={4}
            className="w-full p-2.5 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-amber-400"
          />
        </div>

        <div className="p-4 rounded-3xl bg-slate-900 border border-cyan-500/40 space-y-2.5 shadow-xl">
          <div className="flex items-center gap-2 text-cyan-300 font-bold text-sm">
            <span className="text-xl">🔎</span>
            <span>Важното правило, което ще запомня...</span>
          </div>
          <textarea
            value={ref2}
            onChange={(e) => setRef2(e.target.value)}
            rows={4}
            className="w-full p-2.5 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-cyan-400"
          />
        </div>

        <div className="p-4 rounded-3xl bg-slate-900 border border-purple-500/40 space-y-2.5 shadow-xl">
          <div className="flex items-center gap-2 text-purple-300 font-bold text-sm">
            <span className="text-xl">🌉</span>
            <span>Оттук нататък ще гледам на думите...</span>
          </div>
          <textarea
            value={ref3}
            onChange={(e) => setRef3(e.target.value)}
            rows={4}
            className="w-full p-2.5 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-purple-400"
          />
        </div>
      </div>

      {saved ? (
        <div className="p-3 rounded-2xl bg-emerald-950/60 border border-emerald-500/50 text-emerald-300 font-bold text-center text-sm">
          Твоят Exit Ticket е записан успешно! Готов си за финалния дигитален сертификат! 🎉
        </div>
      ) : (
        <div className="text-center">
          <button
            onClick={handleSave}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white font-bold text-sm shadow-md transition-all cursor-pointer"
          >
            Запази моя Exit Ticket (+25 т.)
          </button>
        </div>
      )}

      <div className="flex justify-end pt-4 border-t border-slate-800">
        <button
          onClick={onNext}
          className="px-6 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
        >
          <span>Към Финала & Дигитален сертификат</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

// ======================== SLIDE 22: ФИНАЛ & СЕРТИФИКАТ ========================
export const Slide22Finale: React.FC<SlideProps> = ({ totalPoints }) => {
  const [studentName, setStudentName] = useState('Ученик от VII клас');
  const [schoolName, setSchoolName] = useState('ОУ „Св. св. Кирил и Методий“');

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex flex-col justify-between min-h-[580px] p-6 max-w-4xl mx-auto text-center space-y-4">
      {/* Poetic synthesis */}
      <div className="space-y-3">
        <div className="inline-block px-4 py-1.5 rounded-full bg-cyan-950 border border-cyan-700 text-cyan-300 text-xs font-extrabold uppercase tracking-widest animate-pulse">
          🎉 МИСИЯТА Е ИЗПЪЛНЕНА · MISSION COMPLETE!
        </div>

        <div className="space-y-1 py-2">
          <p className="text-base md:text-lg text-slate-300 font-medium">„Думите не стоят неподвижно.“</p>
          <p className="text-lg md:text-xl text-cyan-300 font-semibold">„Те пътуват.“</p>
          <p className="text-lg md:text-xl text-indigo-300 font-semibold">„Те се срещат.“</p>
          <p className="text-lg md:text-xl text-purple-300 font-semibold">„Те се променят.“</p>
          <h2 className="text-3xl md:text-5xl font-extrabold font-heading text-white tracking-tight pt-1 drop-shadow-md">
            ТЕ СТРОЯТ МОСТОВЕ.
          </h2>
          <p className="text-lg md:text-xl font-bold font-mono text-cyan-400">
            “Words build bridges.”
          </p>
        </div>
      </div>

      {/* Official Certificate Box */}
      <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-yellow-500/40 shadow-2xl text-center space-y-3 max-w-xl mx-auto w-full relative print:border-black print:text-black">
        <div className="flex justify-center items-center gap-2 text-yellow-400 font-bold uppercase tracking-widest text-xs">
          <Award className="w-5 h-5" />
          <span>ОФИЦИАЛЕН ДИГИТАЛЕН СЕРТИФИКАТ</span>
        </div>

        <h3 className="text-xl md:text-2xl font-extrabold font-heading text-white">
          МАЙСТОР НА ЕЗИКОВИЯ МОСТ
        </h3>

        <p className="text-xs text-slate-400">
          Удостоверява се, че като Езиков детектив в VII клас успешно завърши интегрираната мисия (Български език × English A1–A2):
        </p>

        <div className="flex flex-col sm:flex-row gap-2 justify-center my-2">
          <input
            type="text"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-center font-bold text-white text-xs md:text-sm focus:outline-none focus:border-cyan-400"
            placeholder="Твоето име"
          />
          <input
            type="text"
            value={schoolName}
            onChange={(e) => setSchoolName(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-center text-xs text-slate-300 focus:outline-none focus:border-cyan-400"
            placeholder="Име на училището"
          />
        </div>

        <div className="flex justify-center items-center gap-6 pt-2 border-t border-slate-800 text-xs text-slate-300">
          <div>
            <span className="text-slate-500 block text-[11px]">Точки от урока:</span>
            <strong className="text-yellow-400 font-mono text-sm md:text-base">{totalPoints} точки</strong>
          </div>
          <div>
            <span className="text-slate-500 block text-[11px]">Клас:</span>
            <strong className="text-white font-mono text-sm md:text-base">VII клас</strong>
          </div>
          <div>
            <span className="text-slate-500 block text-[11px]">Ниво английски:</span>
            <strong className="text-cyan-400 font-mono text-sm md:text-base">A1–A2</strong>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap justify-center gap-3 pt-1">
        <button
          onClick={handlePrint}
          className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs md:text-sm flex items-center gap-2 cursor-pointer transition-colors"
        >
          <Printer className="w-4 h-4 text-cyan-400" />
          <span>Принтирай сертификата</span>
        </button>

        <button
          onClick={downloadStandaloneHtml}
          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 via-indigo-600 to-purple-600 hover:from-cyan-500 hover:via-indigo-500 text-white font-bold text-xs md:text-sm flex items-center gap-2 shadow-lg cursor-pointer transition-all"
        >
          <Download className="w-4 h-4 text-yellow-300" />
          <span>Свали урока като офлайн файл (.html)</span>
        </button>
      </div>
    </div>
  );
};

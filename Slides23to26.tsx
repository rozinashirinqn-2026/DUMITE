import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  RotateCcw, 
  Timer as TimerIcon, 
  CheckCircle, 
  Sparkles, 
  Award, 
  Printer, 
  Send, 
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

// ======================== SLIDE 23: ПОСТРОЙ МОСТА ========================
export const Slide23BuildBridge: React.FC<SlideProps> = ({ onNext, onAddPoints }) => {
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
    { id: 10, text: 'music', cat: 'en' },
    { id: 11, text: 'phone', cat: 'en' },
    { id: 12, text: 'school', cat: 'en' },
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
      setFeedback(`Правилно поставена греда: „${item.text}“! 🌉`);
      onAddPoints(10);
    } else {
      setFeedback(`Внимание: „${item.text}“ не е за тази зона!`);
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
          Строеж на моста · 4 зони · Таймер 60 секунди
        </span>
        <h2 className="text-3xl md:text-5xl font-extrabold text-white font-heading">
          ПОСТРОЙ МОСТА
        </h2>
        <p className="text-slate-300 text-sm md:text-base">
          Постави 12-те думи в 4-те мостови зони преди да изтече таймерът!
        </p>
      </div>

      {/* Timer & Controls Bar */}
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
            className="text-xs text-cyan-400 hover:text-cyan-300 px-2 py-1 font-semibold"
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

      {/* Available words bank */}
      <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800 min-h-[50px] flex flex-wrap gap-2 items-center">
        {remaining.length === 0 ? (
          <span className="text-xs text-emerald-400 font-bold mx-auto">
            🎉 Мостът е напълно построен! Всички 12 елемента са на мястото си!
          </span>
        ) : (
          remaining.map(w => (
            <div
              key={w.id}
              draggable
              onDragStart={(e) => e.dataTransfer.setData('text/plain', w.id.toString())}
              className="px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-200 font-bold text-xs flex items-center gap-1.5 cursor-grab hover:border-cyan-400"
            >
              <span>{w.text}</span>
              <span className="text-[10px] text-slate-500">⋮⋮</span>
            </div>
          ))
        )}
      </div>

      {/* 4 Bridge Columns */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 my-4">
        {/* Zone 1: Домашна */}
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            const id = parseInt(e.dataTransfer.getData('text/plain'), 10);
            if (!isNaN(id)) handlePlace(id, 'home');
          }}
          className="p-3 rounded-2xl bg-slate-900 border-2 border-emerald-500/30 flex flex-col justify-between min-h-[170px]"
        >
          <div>
            <span className="text-xs font-bold text-emerald-400 block mb-1">🏠 ДОМАШНА</span>
            <div className="flex flex-wrap gap-1 min-h-[70px] p-1.5 rounded-xl bg-slate-950/60 border border-slate-800">
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
                  +{w.text}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Zone 2: Заемка */}
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            const id = parseInt(e.dataTransfer.getData('text/plain'), 10);
            if (!isNaN(id)) handlePlace(id, 'borrowed');
          }}
          className="p-3 rounded-2xl bg-slate-900 border-2 border-cyan-500/30 flex flex-col justify-between min-h-[170px]"
        >
          <div>
            <span className="text-xs font-bold text-cyan-400 block mb-1">🌍 ЗАЕМКА</span>
            <div className="flex flex-wrap gap-1 min-h-[70px] p-1.5 rounded-xl bg-slate-950/60 border border-slate-800">
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
                  +{w.text}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Zone 3: Чуждица */}
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            const id = parseInt(e.dataTransfer.getData('text/plain'), 10);
            if (!isNaN(id)) handlePlace(id, 'foreign');
          }}
          className="p-3 rounded-2xl bg-slate-900 border-2 border-purple-500/30 flex flex-col justify-between min-h-[170px]"
        >
          <div>
            <span className="text-xs font-bold text-purple-400 block mb-1">🔎 ЧУЖДИЦА</span>
            <div className="flex flex-wrap gap-1 min-h-[70px] p-1.5 rounded-xl bg-slate-950/60 border border-slate-800">
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
                  +{w.text}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Zone 4: English */}
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            const id = parseInt(e.dataTransfer.getData('text/plain'), 10);
            if (!isNaN(id)) handlePlace(id, 'en');
          }}
          className="p-3 rounded-2xl bg-slate-900 border-2 border-indigo-500/30 flex flex-col justify-between min-h-[170px]"
        >
          <div>
            <span className="text-xs font-bold text-indigo-400 block mb-1">🇬🇧 ENGLISH</span>
            <div className="flex flex-wrap gap-1 min-h-[70px] p-1.5 rounded-xl bg-slate-950/60 border border-slate-800">
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
                  +{w.text}
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
          <span>Към Финален Quiz</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

// ======================== SLIDE 24: ФИНАЛЕН QUIZ ========================
export const Slide24FinalQuiz: React.FC<SlideProps> = ({ onNext, onAddPoints }) => {
  const quiz = [
    {
      q: '1. Какво представлява заемката в българския език?',
      options: [
        { text: 'Дума от чужд произход, която е напълно усвоена и се подчинява на българската граматика.', isCorrect: true },
        { text: 'Всяка новоизмислена дума в интернет.', isCorrect: false },
        { text: 'Дума, която никога не се членува и няма множествено число.', isCorrect: false }
      ],
      expl: 'Заемките са преминали през езикова адаптация (фонетична и морфологична) и са част от книжовната норма.'
    },
    {
      q: '2. Коя от изброените думи принадлежи към домашния (праславянски) речников фонд?',
      options: [
        { text: 'балет', isCorrect: false },
        { text: 'земя', isCorrect: true },
        { text: 'гара', isCorrect: false }
      ],
      expl: '„Земя“ е изконна славянска дума, съществуваща в езика ни от самото му зараждане.'
    },
    {
      q: '3. Коя английска реплика е граматически правилна на ниво A1?',
      options: [
        { text: 'I am thirteen years old.', isCorrect: true },
        { text: 'I have thirteen years old.', isCorrect: false },
        { text: 'I thirteen old.', isCorrect: false }
      ],
      expl: 'В английския език за възраст задължително се използва глаголът TO BE (am/is/are).'
    },
    {
      q: '4. На въпроса “What do you like?”, правилният отговор е:',
      options: [
        { text: 'A. I like music.', isCorrect: true },
        { text: 'B. I am music.', isCorrect: false },
        { text: 'C. I music.', isCorrect: false }
      ],
      expl: 'С подлог I глаголът like остава в основна форма без окончание.'
    },
    {
      q: '5. Какво доказва вековното пътуване на думите между езиците?',
      options: [
        { text: 'A. Езиците са напълно изолирани един от друг.', isCorrect: false },
        { text: 'B. Езиците общуват, влияят си и строят културни мостове.', isCorrect: true },
        { text: 'C. Езиците никога не се променят.', isCorrect: false }
      ],
      expl: 'Езиковият контакт е най-красивият мост между народите и цивилизациите.'
    }
  ];

  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);

  const handleSelectAnswer = (qIdx: number, optIdx: number) => {
    setAnswers({ ...answers, [qIdx]: optIdx });
  };

  const calculateScore = () => {
    let score = 0;
    quiz.forEach((q, idx) => {
      const selected = answers[idx];
      if (selected !== undefined && q.options[selected].isCorrect) {
        score++;
      }
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
          Окончателна проверка · 5 въпроса
        </span>
        <h2 className="text-3xl md:text-5xl font-extrabold text-white font-heading">
          ФИНАЛЕН ЕЗИКОВ QUIZ
        </h2>
        <p className="text-slate-300 text-sm md:text-base">
          Провери знанията си по български и английски език за възстановяване на моста!
        </p>
      </div>

      <div className="my-6 space-y-4 max-h-[340px] overflow-y-auto pr-2">
        {quiz.map((q, qIdx) => (
          <div key={qIdx} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <h3 className="font-bold text-sm md:text-base text-white">{q.q}</h3>
            <div className="space-y-1.5">
              {q.options.map((opt, optIdx) => {
                const isChosen = answers[qIdx] === optIdx;
                return (
                  <button
                    key={optIdx}
                    onClick={() => handleSelectAnswer(qIdx, optIdx)}
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
        <div className="p-3.5 rounded-2xl bg-emerald-950/50 border border-emerald-500/50 text-center font-bold text-emerald-300 text-base animate-fade-in">
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
          <span className="text-xs text-slate-400">Тестът е оценен отлично!</span>
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

// ======================== SLIDE 25: EXIT TICKET ========================
export const Slide25ExitTicket: React.FC<SlideProps> = ({ onNext, onAddPoints }) => {
  const [reflection1, setReflection1] = useState('че езиците не са изолирани острови, а пътуват и се обогатяват взаимно.');
  const [reflection2, setReflection2] = useState('произхода на думите „кафе“, „футбол“ и „шоколад“.');
  const [reflection3, setReflection3] = useState('с уважение към родния речников дом и с любопитство към чуждите езици.');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
    onAddPoints(25);
  };

  return (
    <div className="flex flex-col justify-between min-h-[560px] p-6 max-w-4xl mx-auto">
      <div className="text-center space-y-2">
        <span className="px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800 text-cyan-300 text-xs font-bold uppercase tracking-wider">
          Преди да напуснеш моста · Рефлексия
        </span>
        <h2 className="text-3xl md:text-5xl font-extrabold text-white font-heading">
          EXIT TICKET (БИЛЕТ ЗА ИЗХОД)
        </h2>
        <p className="text-slate-300 text-sm md:text-base">
          Попълни трите рефлексивни карти или въведи свои собствени мисли!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
        {/* Card 1 */}
        <div className="p-5 rounded-3xl bg-slate-900 border border-amber-500/40 space-y-3 shadow-xl">
          <div className="flex items-center gap-2 text-amber-300 font-bold text-base">
            <span className="text-2xl">💡</span>
            <span>Днес научих...</span>
          </div>
          <textarea
            value={reflection1}
            onChange={(e) => setReflection1(e.target.value)}
            rows={4}
            className="w-full p-3 rounded-2xl bg-slate-950 border border-slate-800 text-xs md:text-sm text-slate-200 focus:outline-none focus:border-amber-400"
          />
        </div>

        {/* Card 2 */}
        <div className="p-5 rounded-3xl bg-slate-900 border border-cyan-500/40 space-y-3 shadow-xl">
          <div className="flex items-center gap-2 text-cyan-300 font-bold text-base">
            <span className="text-2xl">🔎</span>
            <span>Днес открих...</span>
          </div>
          <textarea
            value={reflection2}
            onChange={(e) => setReflection2(e.target.value)}
            rows={4}
            className="w-full p-3 rounded-2xl bg-slate-950 border border-slate-800 text-xs md:text-sm text-slate-200 focus:outline-none focus:border-cyan-400"
          />
        </div>

        {/* Card 3 */}
        <div className="p-5 rounded-3xl bg-slate-900 border border-purple-500/40 space-y-3 shadow-xl">
          <div className="flex items-center gap-2 text-purple-300 font-bold text-base">
            <span className="text-2xl">🌉</span>
            <span>Оттук нататък ще гледам на думите...</span>
          </div>
          <textarea
            value={reflection3}
            onChange={(e) => setReflection3(e.target.value)}
            rows={4}
            className="w-full p-3 rounded-2xl bg-slate-950 border border-slate-800 text-xs md:text-sm text-slate-200 focus:outline-none focus:border-purple-400"
          />
        </div>
      </div>

      {submitted ? (
        <div className="p-3.5 rounded-2xl bg-emerald-950/60 border border-emerald-500/50 text-emerald-300 font-bold text-center text-sm">
          Твоят Exit Ticket е записан успешно! Готов си за финалния триумф! 🎉
        </div>
      ) : (
        <div className="text-center">
          <button
            onClick={handleSubmit}
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
          <span>Към Големия финал & Сертификат</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

// ======================== SLIDE 26: ФИНАЛ ========================
export const Slide26Finale: React.FC<SlideProps> = ({ totalPoints }) => {
  const [studentName, setStudentName] = useState('Ученик от VII клас');
  const [schoolName, setSchoolName] = useState('ОУ „Св. св. Кирил и Методий“');

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex flex-col justify-between min-h-[580px] p-6 max-w-4xl mx-auto text-center space-y-6">
      {/* Animated Words Moving on the Bridge */}
      <div className="space-y-4">
        <div className="inline-block px-4 py-1.5 rounded-full bg-cyan-950 border border-cyan-700 text-cyan-300 text-xs font-extrabold uppercase tracking-widest animate-pulse">
          🎉 МИСИЯТА Е ИЗПЪЛНЕНА · MISSION COMPLETE!
        </div>

        {/* Sequential Poetic Statements */}
        <div className="space-y-2 py-4">
          <p className="text-lg md:text-xl text-slate-300 font-medium">„Думите не стоят неподвижно.“</p>
          <p className="text-xl md:text-2xl text-cyan-300 font-semibold">„Те пътуват.“</p>
          <p className="text-xl md:text-2xl text-indigo-300 font-semibold">„Те се срещат.“</p>
          <p className="text-xl md:text-2xl text-purple-300 font-semibold">„Те се променят.“</p>
          <h2 className="text-4xl md:text-6xl font-extrabold font-heading text-white tracking-tight pt-2 drop-shadow-md">
            ТЕ СТРОЯТ МОСТОВЕ.
          </h2>
          <p className="text-xl md:text-2xl font-bold font-mono text-cyan-400">
            “Words build bridges.”
          </p>
        </div>
      </div>

      {/* Interactive Certificate */}
      <div className="p-8 rounded-3xl bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-yellow-500/40 shadow-2xl text-center space-y-4 max-w-2xl mx-auto w-full relative overflow-hidden print:border-black print:text-black">
        <div className="flex justify-center items-center gap-2 text-yellow-400 font-bold uppercase tracking-widest text-xs">
          <Award className="w-5 h-5" />
          <span>ОФИЦИАЛЕН ДИГИТАЛЕН СЕРТИФИКАТ</span>
        </div>

        <h3 className="text-2xl md:text-3xl font-extrabold font-heading text-white">
          МАЙСТОР НА ЕЗИКОВИЯ МОСТ
        </h3>

        <p className="text-xs text-slate-400">
          Удостоверява се, че като Езиков детектив в VII клас успешно възстанови моста между българския и английския език:
        </p>

        <div className="flex flex-col sm:flex-row gap-2 justify-center my-2">
          <input
            type="text"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            className="px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-center font-bold text-white text-sm focus:outline-none focus:border-cyan-400"
            placeholder="Твоето име"
          />
          <input
            type="text"
            value={schoolName}
            onChange={(e) => setSchoolName(e.target.value)}
            className="px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-center text-xs text-slate-300 focus:outline-none focus:border-cyan-400"
            placeholder="Име на училището"
          />
        </div>

        <div className="flex justify-center items-center gap-6 pt-2 border-t border-slate-800/80 text-xs text-slate-300">
          <div>
            <span className="text-slate-500 block">Точки от мисията:</span>
            <strong className="text-yellow-400 font-mono text-base">{totalPoints} точки</strong>
          </div>
          <div>
            <span className="text-slate-500 block">Клас:</span>
            <strong className="text-white font-mono text-base">VII клас</strong>
          </div>
          <div>
            <span className="text-slate-500 block">Дата:</span>
            <strong className="text-cyan-400 font-mono text-base">{new Date().toLocaleDateString('bg-BG')}</strong>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-wrap justify-center gap-3 pt-2">
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

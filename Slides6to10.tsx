import React, { useState } from 'react';
import { 
  ArrowRight, 
  Search, 
  AlertTriangle, 
  CheckCircle, 
  HelpCircle, 
  Lock, 
  Unlock, 
  Key, 
  Volume2,
  Sparkles
} from 'lucide-react';
import { playEnglishAudio } from '../../utils/speech';
import { triggerConfetti } from '../../utils/confetti';

interface SlideProps {
  onNext: () => void;
  onAddPoints: (pts: number) => void;
}

// ======================== SLIDE 6: ДЕТЕКТИВ В ЧАТА ========================
export const Slide6TeenChat: React.FC<SlideProps> = ({ onNext, onAddPoints }) => {
  const tableData = [
    { foreign: 'локация', en: 'location', bg: 'местоположение' },
    { foreign: 'лайк', en: 'like', bg: 'харесване / одобрение' },
    { foreign: 'фийдбек', en: 'feedback', bg: 'обратна връзка' },
    { foreign: 'стори', en: 'story', bg: 'кратка история / видео' },
    { foreign: 'ъпдейтвам', en: 'update', bg: 'актуализирам / обновявам' },
    { foreign: 'пост', en: 'post', bg: 'публикация / съобщение' },
  ];

  const [revealed, setRevealed] = useState<number[]>([]);

  const handleReveal = (idx: number) => {
    if (!revealed.includes(idx)) {
      setRevealed([...revealed, idx]);
      onAddPoints(10);
    }
  };

  const handleRevealAll = () => {
    setRevealed(tableData.map((_, i) => i));
    onAddPoints(30);
  };

  return (
    <div className="flex flex-col justify-between min-h-[560px] p-6 max-w-5xl mx-auto">
      <div className="text-center space-y-2">
        <span className="px-3 py-1 rounded-full bg-purple-950/80 border border-purple-800 text-purple-300 text-xs font-bold uppercase tracking-wider">
          Медийна култура & Езикова хигиена · VII клас
        </span>
        <h2 className="text-3xl md:text-5xl font-extrabold text-white font-heading">
          ДЕТЕКТИВ В ЧАТА: ЧУЖДИЦИ VS. КНИЖОВЕН ЕЗИК
        </h2>
        <p className="text-slate-300 text-sm md:text-base">
          В тийнейджърския чат чуждиците звучат бързо и модерно, но в официално общуване признак на висока култура е да знаем точния български еквивалент!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-4 items-center">
        {/* Smartphone Chat Box */}
        <div className="p-4 rounded-3xl bg-slate-950 border-2 border-slate-800 shadow-2xl space-y-3 max-w-sm mx-auto w-full">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2 text-xs text-slate-400">
            <span className="font-bold text-purple-400">📱 Чат група 7. клас</span>
            <span>14:45</span>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="bg-slate-900 p-3 rounded-2xl rounded-tl-sm border border-slate-800 text-slate-200">
              <strong className="text-cyan-400 block mb-0.5">Виктор:</strong>
              Прати ми <span className="bg-purple-900/60 px-1.5 py-0.5 rounded text-purple-300 font-bold">локацията</span> за читалнята! Пуснах нов <span className="bg-purple-900/60 px-1.5 py-0.5 rounded text-purple-300 font-bold">пост</span> и очаквам <span className="bg-purple-900/60 px-1.5 py-0.5 rounded text-purple-300 font-bold">фийдбек</span>.
            </div>

            <div className="bg-indigo-950/60 p-3 rounded-2xl rounded-tr-sm border border-indigo-800/40 text-slate-200 ml-auto text-right">
              <strong className="text-indigo-400 block mb-0.5">Елена:</strong>
              Супер е, дадох ти <span className="bg-purple-900/60 px-1.5 py-0.5 rounded text-purple-300 font-bold">лайк</span>! Трябва да <span className="bg-purple-900/60 px-1.5 py-0.5 rounded text-purple-300 font-bold">ъпдейтнем</span> и нашето <span className="bg-purple-900/60 px-1.5 py-0.5 rounded text-purple-300 font-bold">стори</span>.
            </div>
          </div>
        </div>

        {/* Interactive Comparison Table */}
        <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-3 shadow-xl">
          <div className="flex justify-between items-center">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              Речник на чистия книжовен език:
            </h3>
            <button
              onClick={handleRevealAll}
              className="text-xs text-cyan-400 hover:underline font-semibold"
            >
              Покажи всички
            </button>
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-800">
            <table className="w-full text-left text-xs md:text-sm">
              <thead className="bg-slate-950 text-slate-400 uppercase text-[11px]">
                <tr>
                  <th className="p-2.5">Чуждица</th>
                  <th className="p-2.5">English</th>
                  <th className="p-2.5">Книжовен български</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {tableData.map((row, idx) => {
                  const isOpen = revealed.includes(idx);
                  return (
                    <tr
                      key={idx}
                      onClick={() => handleReveal(idx)}
                      className="hover:bg-slate-800/60 cursor-pointer transition-colors"
                    >
                      <td className="p-2.5 font-bold text-purple-300">{row.foreign}</td>
                      <td className="p-2.5 font-mono text-cyan-300">{row.en}</td>
                      <td className="p-2.5 font-semibold">
                        {isOpen ? (
                          <span className="text-emerald-400 animate-fade-in">{row.bg}</span>
                        ) : (
                          <span className="text-slate-500 underline text-xs">Кликни</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-4 border-t border-slate-800">
        <button
          onClick={onNext}
          className="px-6 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
        >
          <span>Към False Friends (Лъжливи приятели)</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

// ======================== SLIDE 7: FALSE FRIENDS (ЛЪЖЛИВИ ПРИЯТЕЛИ) ========================
export const Slide7FalseFriends: React.FC<SlideProps> = ({ onNext, onAddPoints }) => {
  const traps = [
    {
      word: 'fabric',
      commonMistake: 'фабрика (завод)',
      realMeaning: 'ПЛАТ / ТЕКСТИЛ',
      correctEnForMistake: 'Фабрика на английски е FACTORY!',
      example: '“Silk is a delicate fabric.” (Коприната е деликатен плат.)'
    },
    {
      word: 'actual',
      commonMistake: 'актуален (модерен)',
      realMeaning: 'ДЕЙСТВИТЕЛЕН / СЪЩИНСКИ',
      correctEnForMistake: 'Актуален на английски е CURRENT или UP-TO-DATE!',
      example: '“What was the actual cost?” (Каква беше действителната цена?)'
    },
    {
      word: 'magazine',
      commonMistake: 'магазин (търговски обект)',
      realMeaning: 'СПИСАНИЕ',
      correctEnForMistake: 'Магазин на английски е SHOP или STORE!',
      example: '“I bought a science magazine.” (Купих научно списание.)'
    },
    {
      word: 'family',
      commonMistake: 'фамилно име (фамилия)',
      realMeaning: 'СЕМЕЙСТВО',
      correctEnForMistake: 'Фамилно име на английски е SURNAME или LAST NAME!',
      example: '“My family lives in Sofia.” (Семейството ми живее в София.)'
    }
  ];

  const [activeTrap, setActiveTrap] = useState(0);

  const curr = traps[activeTrap];

  return (
    <div className="flex flex-col justify-between min-h-[560px] p-6 max-w-5xl mx-auto">
      <div className="text-center space-y-2">
        <span className="px-3 py-1 rounded-full bg-amber-950/80 border border-amber-800 text-amber-300 text-xs font-bold uppercase tracking-wider">
          Комбинирана езикова задача · English A1-A2 × Български
        </span>
        <h2 className="text-3xl md:text-5xl font-extrabold text-white font-heading">
          ЕЗИКОВ КАПАН: FALSE FRIENDS (ЛЪЖЛИВИ ПРИЯТЕЛИ)
        </h2>
        <p className="text-slate-300 text-sm md:text-base max-w-2xl mx-auto">
          Някои английски думи звучат почти еднакво с български думи, но имат напълно различно значение! Избери дума, за да провериш капана:
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 my-4">
        {traps.map((item, idx) => (
          <button
            key={item.word}
            onClick={() => {
              setActiveTrap(idx);
              onAddPoints(10);
            }}
            className={`p-4 rounded-2xl border text-center transition-all cursor-pointer font-bold ${
              activeTrap === idx
                ? 'bg-amber-500/20 border-amber-400 text-amber-300 scale-105 shadow-lg shadow-amber-500/20'
                : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-600'
            }`}
          >
            <span className="text-lg font-mono block">“{item.word}”</span>
            <span className="text-[11px] text-slate-400 font-normal">Кликни за капана</span>
          </button>
        ))}
      </div>

      {/* Trap Details Box */}
      <div className="p-6 rounded-3xl bg-slate-900 border-2 border-amber-500/40 shadow-2xl space-y-4 max-w-2xl mx-auto w-full">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl">⚠️</span>
            <h3 className="text-2xl font-extrabold font-mono text-white">
              {curr.word}
            </h3>
          </div>
          <button
            onClick={() => playEnglishAudio(curr.word)}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
          >
            <Volume2 className="w-3.5 h-3.5" /> Чуй произношение
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs md:text-sm">
          <div className="p-3 rounded-2xl bg-red-950/40 border border-red-800/40 text-red-200">
            <strong className="block text-red-400 mb-1">❌ Честа грешка / Заблуда:</strong>
            Звучи като „{curr.commonMistake}“, но НЕ означава това!
          </div>

          <div className="p-3 rounded-2xl bg-emerald-950/40 border border-emerald-800/40 text-emerald-200">
            <strong className="block text-emerald-400 mb-1">✅ Истинско значение:</strong>
            Означава: <strong className="text-white uppercase">{curr.realMeaning}</strong>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-xs md:text-sm text-cyan-200">
          <strong>💡 Точен превод:</strong> {curr.correctEnForMistake}
        </div>

        <div className="p-3 rounded-xl bg-indigo-950/40 border border-indigo-800/40 text-xs text-indigo-200 italic">
          Пример: {curr.example}
        </div>
      </div>

      <div className="flex justify-end pt-4 border-t border-slate-800">
        <button
          onClick={onNext}
          className="px-6 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
        >
          <span>Към Езиков детектив в текста</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

// ======================== SLIDE 8: ЕЗИКОВ ДЕТЕКТИВ В ТЕКСТА ========================
export const Slide8TextDetective: React.FC<SlideProps> = ({ onNext, onAddPoints }) => {
  const sentence = "Вчера си направих кафе , включих лаптопа , изпратих имейл до учителя и излязох да играя футбол с приятели .";
  const words = sentence.split(" ");
  const targets = ["кафе", "лаптопа", "имейл", "футбол"];

  const [found, setFound] = useState<string[]>([]);
  const [lastMsg, setLastMsg] = useState<{ text: string; correct: boolean } | null>(null);

  const handleClick = (w: string) => {
    const clean = w.toLowerCase().replace(/[,.]/g, '');
    if (targets.includes(clean)) {
      if (!found.includes(clean)) {
        setFound([...found, clean]);
        onAddPoints(15);
      }
      setLastMsg({ text: `Следа открита! 🔎 „${clean}“ е заемка от чужд произход!`, correct: true });
    } else {
      setLastMsg({ text: `„${clean}“ е домашна дума или граматичен съюз. Търси заемките!`, correct: false });
    }
  };

  return (
    <div className="flex flex-col justify-between min-h-[560px] p-6 max-w-4xl mx-auto">
      <div className="text-center space-y-2">
        <span className="px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800 text-cyan-300 text-xs font-bold uppercase tracking-wider">
          Практически контекстуален анализ
        </span>
        <h2 className="text-3xl md:text-5xl font-extrabold text-white font-heading">
          ЕЗИКОВ ДЕТЕКТИВ В ТЕКСТА
        </h2>
        <p className="text-slate-300 text-sm md:text-base">
          Кликни директно върху думите в изречението, за да разпознаеш 4-те думи от чужд произход (заемки)!
        </p>
      </div>

      <div className="my-6 p-6 md:p-8 rounded-3xl bg-slate-900 border-2 border-slate-700 shadow-2xl">
        <div className="flex flex-wrap gap-2 justify-center text-lg md:text-xl font-bold leading-relaxed">
          {words.map((w, idx) => {
            const clean = w.toLowerCase().replace(/[,.]/g, '');
            const isPunct = w === ',' || w === '.';
            if (isPunct) return <span key={idx} className="text-slate-500 self-center">{w}</span>;

            const isDone = found.includes(clean);
            return (
              <button
                key={idx}
                onClick={() => handleClick(w)}
                className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer border ${
                  isDone
                    ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 shadow-md'
                    : 'bg-slate-950/80 border-slate-800 text-slate-200 hover:border-cyan-400 hover:bg-slate-800'
                }`}
              >
                {w}
              </button>
            );
          })}
        </div>
      </div>

      {/* Feedback Alert */}
      <div className="min-h-[80px] p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-center">
        {lastMsg ? (
          <div className={`font-bold text-sm md:text-base animate-fade-in ${lastMsg.correct ? 'text-emerald-400' : 'text-amber-400'}`}>
            {lastMsg.text}
          </div>
        ) : (
          <p className="text-slate-500 text-sm">Кликни върху дума от изречението горе...</p>
        )}
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-slate-800">
        <span className="text-xs text-slate-400">
          Открити заемки: <strong className="text-cyan-400 font-bold">{found.length} / 4</strong>
        </span>
        <button
          onClick={onNext}
          className="px-6 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
        >
          <span>Към Морфологичната лаборатория (12 думи)</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

// ======================== SLIDE 9: МОРФОЛОГИЧНА ЛАБОРАТОРИЯ ========================
export const Slide9MorphologySort: React.FC<SlideProps> = ({ onNext, onAddPoints }) => {
  const initialWords = [
    { id: 1, text: 'майка', category: 'native' },
    { id: 2, text: 'хляб', category: 'native' },
    { id: 3, text: 'земя', category: 'native' },
    { id: 4, text: 'вода', category: 'native' },
    { id: 5, text: 'кафе', category: 'borrowed' },
    { id: 6, text: 'футбол', category: 'borrowed' },
    { id: 7, text: 'компютър', category: 'borrowed' },
    { id: 8, text: 'балет', category: 'borrowed' },
    { id: 9, text: 'лайк', category: 'foreign' },
    { id: 10, text: 'фийдбек', category: 'foreign' },
    { id: 11, text: 'стори', category: 'foreign' },
    { id: 12, text: 'инфлуенсър', category: 'foreign' },
  ];

  const [placed, setPlaced] = useState<Record<number, 'native' | 'borrowed' | 'foreign'>>({});

  const handlePlace = (wordId: number, target: 'native' | 'borrowed' | 'foreign') => {
    const item = initialWords.find(w => w.id === wordId);
    if (!item) return;

    if (item.category === target) {
      setPlaced({ ...placed, [wordId]: target });
      onAddPoints(10);
    }
  };

  const handleAuto = () => {
    const all: Record<number, any> = {};
    initialWords.forEach(w => { all[w.id] = w.category; });
    setPlaced(all);
    onAddPoints(30);
  };

  const remaining = initialWords.filter(w => !placed[w.id]);

  return (
    <div className="flex flex-col justify-between min-h-[560px] p-6 max-w-5xl mx-auto">
      <div className="text-center space-y-2">
        <span className="px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800 text-cyan-300 text-xs font-bold uppercase tracking-wider">
          Морфологична класификация · 12 думи
        </span>
        <h2 className="text-3xl md:text-5xl font-extrabold text-white font-heading">
          МОРФОЛОГИЧНА ЛАБОРАТОРИЯ
        </h2>
        <p className="text-slate-300 text-sm md:text-base">
          Разпредели думите в 3-те колони според граматичните и исторически критерии!
        </p>
      </div>

      {/* Available Bank */}
      <div className="my-2 p-3 rounded-2xl bg-slate-900 border border-slate-800 flex flex-wrap gap-2 items-center justify-between">
        <div className="flex flex-wrap gap-1.5">
          {remaining.length === 0 ? (
            <span className="text-xs text-emerald-400 font-bold">
              Всички 12 думи са морфологично класифицирани! 🎉
            </span>
          ) : (
            remaining.map(w => (
              <span
                key={w.id}
                className="px-2.5 py-1 rounded-xl bg-slate-800 border border-slate-700 text-slate-200 font-bold text-xs"
              >
                {w.text}
              </span>
            ))
          )}
        </div>
        <button
          onClick={handleAuto}
          className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold cursor-pointer"
        >
          Автоматично подреждане
        </button>
      </div>

      {/* 3 Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 my-2">
        {/* Native */}
        <div className="p-4 rounded-3xl bg-slate-900 border-2 border-emerald-500/30 flex flex-col justify-between min-h-[200px]">
          <div>
            <h3 className="font-bold text-emerald-400 text-sm uppercase mb-1">🏠 ДОМАШНИ ДУМИ</h3>
            <span className="text-[10px] text-slate-400 block mb-2">Изконни славянски думи</span>
            <div className="flex flex-wrap gap-1.5 p-2 rounded-xl bg-slate-950/60 min-h-[70px]">
              {initialWords.filter(w => placed[w.id] === 'native').map(w => (
                <span key={w.id} className="text-xs px-2 py-0.5 rounded-lg bg-emerald-500/20 text-emerald-200 font-bold">
                  {w.text}
                </span>
              ))}
            </div>
          </div>
          {remaining.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {remaining.slice(0, 2).map(w => (
                <button
                  key={w.id}
                  onClick={() => handlePlace(w.id, 'native')}
                  className="text-[10px] px-2 py-0.5 rounded bg-slate-800 hover:bg-emerald-950 text-slate-300"
                >
                  +{w.text}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Borrowed */}
        <div className="p-4 rounded-3xl bg-slate-900 border-2 border-cyan-500/30 flex flex-col justify-between min-h-[200px]">
          <div>
            <h3 className="font-bold text-cyan-400 text-sm uppercase mb-1">🌍 ЗАЕМКИ</h3>
            <span className="text-[10px] text-slate-400 block mb-2">Усвоени & членувани</span>
            <div className="flex flex-wrap gap-1.5 p-2 rounded-xl bg-slate-950/60 min-h-[70px]">
              {initialWords.filter(w => placed[w.id] === 'borrowed').map(w => (
                <span key={w.id} className="text-xs px-2 py-0.5 rounded-lg bg-cyan-500/20 text-cyan-200 font-bold">
                  {w.text}
                </span>
              ))}
            </div>
          </div>
          {remaining.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {remaining.slice(0, 2).map(w => (
                <button
                  key={w.id}
                  onClick={() => handlePlace(w.id, 'borrowed')}
                  className="text-[10px] px-2 py-0.5 rounded bg-slate-800 hover:bg-cyan-950 text-slate-300"
                >
                  +{w.text}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Foreign */}
        <div className="p-4 rounded-3xl bg-slate-900 border-2 border-purple-500/30 flex flex-col justify-between min-h-[200px]">
          <div>
            <h3 className="font-bold text-purple-400 text-sm uppercase mb-1">🔎 ЧУЖДИЦИ</h3>
            <span className="text-[10px] text-slate-400 block mb-2">С български книжовен еквивалент</span>
            <div className="flex flex-wrap gap-1.5 p-2 rounded-xl bg-slate-950/60 min-h-[70px]">
              {initialWords.filter(w => placed[w.id] === 'foreign').map(w => (
                <span key={w.id} className="text-xs px-2 py-0.5 rounded-lg bg-purple-500/20 text-purple-200 font-bold">
                  {w.text}
                </span>
              ))}
            </div>
          </div>
          {remaining.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {remaining.slice(0, 2).map(w => (
                <button
                  key={w.id}
                  onClick={() => handlePlace(w.id, 'foreign')}
                  className="text-[10px] px-2 py-0.5 rounded bg-slate-800 hover:bg-purple-950 text-slate-300"
                >
                  +{w.text}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-end pt-4 border-t border-slate-800">
        <button
          onClick={onNext}
          className="px-6 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
        >
          <span>Към Escape Room (BRIDGE)</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

// ======================== SLIDE 10: ESCAPE ROOM (BRIDGE) ========================
export const Slide10EscapeRoom: React.FC<SlideProps> = ({ onNext, onAddPoints }) => {
  const [t1, setT1] = useState(false);
  const [t2, setT2] = useState(false);
  const [t3, setT3] = useState(false);
  const [t4, setT4] = useState(false);
  const [code, setCode] = useState('');
  const [unlocked, setUnlocked] = useState(false);

  const handleUnlock = () => {
    if (code.trim().toUpperCase() === 'BRIDGE') {
      setUnlocked(true);
      triggerConfetti();
      onAddPoints(50);
    }
  };

  return (
    <div className="flex flex-col justify-between min-h-[560px] p-6 max-w-5xl mx-auto">
      <div className="text-center space-y-2">
        <span className="px-3 py-1 rounded-full bg-red-950/80 border border-red-800 text-red-400 text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5">
          <Lock className="w-3.5 h-3.5" /> ДИГИТАЛЕН ESCAPE ROOM · КУЛМИНАЦИЯ
        </span>
        <h2 className="text-3xl md:text-5xl font-extrabold text-white font-heading">
          РАЗКОДИРАЙ ЕЗИКОВИЯ МОСТ
        </h2>
        <p className="text-slate-300 text-sm md:text-base">
          Реши 4-те комбинирани задачи за думите, събери скритите букви и отключи входа към English Bridge (A1-A2)!
        </p>
      </div>

      {/* 4 Mini Puzzles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 my-4">
        <div className={`p-4 rounded-2xl border ${t1 ? 'bg-emerald-950/40 border-emerald-400' : 'bg-slate-900 border-slate-800'}`}>
          <div className="text-xs font-bold text-slate-400 mb-1">1. Домашна дума (BG):</div>
          <button
            onClick={() => { setT1(true); onAddPoints(10); }}
            className="w-full text-xs font-bold py-2 rounded-xl bg-slate-950 border border-slate-800 hover:border-cyan-400 text-slate-200 mt-1"
          >
            {t1 ? '✓ Код: B (око)' : 'Кликни: „око“'}
          </button>
        </div>

        <div className={`p-4 rounded-2xl border ${t2 ? 'bg-emerald-950/40 border-emerald-400' : 'bg-slate-900 border-slate-800'}`}>
          <div className="text-xs font-bold text-slate-400 mb-1">2. Заемка от френски:</div>
          <button
            onClick={() => { setT2(true); onAddPoints(10); }}
            className="w-full text-xs font-bold py-2 rounded-xl bg-slate-950 border border-slate-800 hover:border-cyan-400 text-slate-200 mt-1"
          >
            {t2 ? '✓ Код: R (гара)' : 'Кликни: „гара“'}
          </button>
        </div>

        <div className={`p-4 rounded-2xl border ${t3 ? 'bg-emerald-950/40 border-emerald-400' : 'bg-slate-900 border-slate-800'}`}>
          <div className="text-xs font-bold text-slate-400 mb-1">3. Модерна чуждица:</div>
          <button
            onClick={() => { setT3(true); onAddPoints(10); }}
            className="w-full text-xs font-bold py-2 rounded-xl bg-slate-950 border border-slate-800 hover:border-cyan-400 text-slate-200 mt-1"
          >
            {t3 ? '✓ Код: I (инфлуенсър)' : 'Кликни: „инфлуенсър“'}
          </button>
        </div>

        <div className={`p-4 rounded-2xl border ${t4 ? 'bg-emerald-950/40 border-emerald-400' : 'bg-slate-900 border-slate-800'}`}>
          <div className="text-xs font-bold text-slate-400 mb-1">4. English A1-A2 корен:</div>
          <button
            onClick={() => { setT4(true); onAddPoints(10); }}
            className="w-full text-xs font-bold py-2 rounded-xl bg-slate-950 border border-slate-800 hover:border-cyan-400 text-slate-200 mt-1"
          >
            {t4 ? '✓ Код: D-G-E (bridge)' : 'Кликни: „bridge“'}
          </button>
        </div>
      </div>

      {/* Code Input & Unlock */}
      <div className="p-6 rounded-3xl bg-slate-900 border-2 border-cyan-500/40 text-center space-y-3 max-w-md mx-auto w-full shadow-2xl">
        {unlocked ? (
          <div className="space-y-1 animate-bounce">
            <Unlock className="w-10 h-10 text-emerald-400 mx-auto" />
            <h3 className="text-2xl font-extrabold text-emerald-400 font-heading">
              ВРАТАТА Е ОТКЛЮЧЕНА!
            </h3>
            <p className="text-xs text-slate-300">
              Кодът <strong>BRIDGE</strong> отключи английския бряг на ниво A1–A2!
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="flex gap-2">
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                placeholder="ВЪВЕДИ КОД: BRIDGE"
                className="w-full px-4 py-2 rounded-xl bg-slate-950 border border-slate-700 text-center font-mono font-bold tracking-widest text-white text-base focus:outline-none focus:border-cyan-400"
              />
              <button
                onClick={handleUnlock}
                className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs uppercase cursor-pointer"
              >
                Отключи
              </button>
            </div>
            <button
              onClick={() => { setCode('BRIDGE'); }}
              className="text-[11px] text-slate-500 hover:text-cyan-400 underline"
            >
              Автоматично попълване: BRIDGE
            </button>
          </div>
        )}
      </div>

      <div className="flex justify-end pt-4 border-t border-slate-800">
        <button
          onClick={onNext}
          className="px-6 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
        >
          <span>Към The Story of Emma (London A1-A2)</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

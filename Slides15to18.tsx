import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  Volume2, 
  Timer as TimerIcon, 
  Check, 
  RotateCcw, 
  Sparkles,
  BookOpen
} from 'lucide-react';
import { playEnglishAudio } from '../../utils/speech';

interface SlideProps {
  onNext: () => void;
  onAddPoints: (pts: number) => void;
}

// ======================== SLIDE 15: LISTEN & HUNT (A1-A2 CHALLENGE) ========================
export const Slide15ListenHunt: React.FC<SlideProps> = ({ onNext, onAddPoints }) => {
  const narration = "In our modern world, we use technology every day. I study with my computer, listen to music on my phone, and search the internet for history projects.";
  const targetWords = ['computer', 'music', 'phone', 'internet'];

  const allCards = [
    { word: 'computer', icon: '💻' },
    { word: 'music', icon: '🎵' },
    { word: 'phone', icon: '📱' },
    { word: 'internet', icon: '🌐' },
    { word: 'train', icon: '🚆' },
    { word: 'airport', icon: '✈️' },
    { word: 'pizza', icon: '🍕' },
    { word: 'guitar', icon: '🎸' },
    { word: 'cinema', icon: '🎬' },
    { word: 'hotel', icon: '🏨' },
  ];

  const [timeLeft, setTimeLeft] = useState(30);
  const [running, setRunning] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const [isPlayingNarration, setIsPlayingNarration] = useState(false);
  const [speakingWord, setSpeakingWord] = useState<string | null>(null);

  useEffect(() => {
    let t: any;
    if (running && timeLeft > 0) {
      t = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (timeLeft === 0) {
      setRunning(false);
    }
    return () => clearInterval(t);
  }, [running, timeLeft]);

  const handleStart = async () => {
    setTimeLeft(30);
    setSelected([]);
    setRunning(true);
    setIsPlayingNarration(true);
    await playEnglishAudio(narration, 0.85);
    setIsPlayingNarration(false);
  };

  const handleSpeakSingleWord = async (word: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSpeakingWord(word);
    await playEnglishAudio(word, 0.85);
    setSpeakingWord(null);
  };

  const handleCard = (w: string) => {
    if (selected.includes(w)) {
      setSelected(selected.filter(x => x !== w));
    } else {
      setSelected([...selected, w]);
      if (targetWords.includes(w)) onAddPoints(10);
    }
  };

  const correctFound = selected.filter(w => targetWords.includes(w)).length;

  return (
    <div className="flex flex-col justify-between min-h-[560px] p-6 max-w-5xl mx-auto">
      <div className="text-center space-y-2">
        <span className="px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800 text-cyan-300 text-xs font-bold uppercase tracking-wider">
          Слушане в реален темп · Web Speech API (speechSynthesis)
        </span>
        <h2 className="text-3xl md:text-5xl font-extrabold text-white font-heading">
          LISTEN & HUNT: 30-SECOND CHALLENGE
        </h2>
        <p className="text-slate-300 text-sm md:text-base">
          Кликни <strong className="text-cyan-400">„🔊 ЧУЙ РАЗКАЗА“</strong>, за да стартираш аудиото, или използвай бутона <strong className="text-purple-300">„🔊 ЧУЙ“</strong> върху всяка дума, за да чуеш отделното й произношение!
        </p>
      </div>

      {/* Audio Play & Timer Bar */}
      <div className="my-2 p-3.5 rounded-2xl bg-slate-900 border border-cyan-500/30 flex flex-wrap items-center justify-between gap-4 shadow-xl">
        <button
          onClick={handleStart}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-bold text-xs md:text-sm flex items-center gap-2 cursor-pointer shadow-md"
        >
          <Volume2 className={`w-4 h-4 ${isPlayingNarration ? 'animate-bounce text-yellow-300' : ''}`} />
          <span>{isPlayingNarration ? 'СЛУШАНЕ НА РАЗКАЗА...' : '🔊 ЧУЙ РАЗКАЗА И СТАРТИРАЙ ТАЙМЕРА (30s)'}</span>
        </button>

        <div className="flex items-center gap-2 px-4 py-1.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-base font-bold text-cyan-400">
          <TimerIcon className="w-4 h-4 text-yellow-400" />
          <span>{timeLeft}s</span>
        </div>
      </div>

      {/* 10 Cards Grid with dedicated 🔊 ЧУЙ buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 my-3">
        {allCards.map((c) => {
          const isChosen = selected.includes(c.word);
          const isTarget = targetWords.includes(c.word);
          const isWordSpeaking = speakingWord === c.word;

          return (
            <div
              key={c.word}
              onClick={() => handleCard(c.word)}
              className={`p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col justify-between items-center ${
                isChosen
                  ? isTarget
                    ? 'bg-emerald-950/60 border-emerald-400 text-emerald-300 scale-105 shadow-md'
                    : 'bg-red-950/60 border-red-400 text-red-300'
                  : 'bg-slate-900 border-slate-800 text-slate-200 hover:border-cyan-400'
              }`}
            >
              <div className="text-2xl mb-1">{c.icon}</div>
              <div className="font-bold text-xs uppercase font-mono mb-2">{c.word}</div>

              {/* Dedicated Web Speech API "🔊 ЧУЙ" button for this word */}
              <button
                onClick={(e) => handleSpeakSingleWord(c.word, e)}
                className={`w-full py-1 px-2 rounded-lg text-[11px] font-bold flex items-center justify-center gap-1 transition-all cursor-pointer ${
                  isWordSpeaking
                    ? 'bg-yellow-400 text-slate-950 scale-105'
                    : 'bg-slate-800 hover:bg-cyan-900/60 border border-slate-700 hover:border-cyan-400 text-cyan-300'
                }`}
                title={`Чуй произношението на "${c.word}"`}
              >
                <Volume2 className={`w-3 h-3 ${isWordSpeaking ? 'animate-spin' : ''}`} />
                <span>🔊 ЧУЙ</span>
              </button>
            </div>
          );
        })}
      </div>

      <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 flex justify-between items-center text-xs md:text-sm text-slate-300 max-w-xl mx-auto w-full">
        <span>Открити верни думи: <strong className="text-emerald-400 font-bold">{correctFound} / 4</strong></span>
        {correctFound === 4 && (
          <span className="text-emerald-400 font-bold animate-pulse">
            Перфектно! Откри всички 4 думи! 🌟
          </span>
        )}
      </div>

      <div className="flex justify-end pt-4 border-t border-slate-800">
        <button
          onClick={onNext}
          className="px-6 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
        >
          <span>Към English Memory (Collocations A1-A2)</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

// ======================== SLIDE 16: ENGLISH MEMORY (COLLOCATIONS A1-A2) ========================
export const Slide16MemoryCollocations: React.FC<SlideProps> = ({ onNext, onAddPoints }) => {
  interface Card {
    id: number;
    pairKey: string;
    text: string;
    icon?: string;
  }

  const initialDeck: Card[] = [
    { id: 1, pairKey: 'surf', text: 'surf the internet' },
    { id: 2, pairKey: 'surf', text: 'сърфирам в интернет 🌐' },
    { id: 3, pairKey: 'play', text: 'play football' },
    { id: 4, pairKey: 'play', text: 'играя футбол ⚽' },
    { id: 5, pairKey: 'listen', text: 'listen to music' },
    { id: 6, pairKey: 'listen', text: 'слушам музика 🎧' },
    { id: 7, pairKey: 'book', text: 'read a book' },
    { id: 8, pairKey: 'book', text: 'чета книга 📖' },
    { id: 9, pairKey: 'study', text: 'study at school' },
    { id: 10, pairKey: 'study', text: 'уча в училище 🏫' },
    { id: 11, pairKey: 'talk', text: 'talk on the phone' },
    { id: 12, pairKey: 'talk', text: 'говоря по телефона 📱' },
  ];

  const [cards] = useState<Card[]>(() => [...initialDeck].sort(() => 0.5 - Math.random()));
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<string[]>([]);

  const handleCard = async (card: Card) => {
    if (flipped.length === 2 || flipped.includes(card.id) || matched.includes(card.pairKey)) return;

    const newFlipped = [...flipped, card.id];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      const c1 = cards.find(c => c.id === newFlipped[0])!;
      const c2 = cards.find(c => c.id === newFlipped[1])!;

      if (c1.pairKey === c2.pairKey) {
        setMatched(prev => [...prev, c1.pairKey]);
        setFlipped([]);
        onAddPoints(20);
        // pronounce the English collocation using SpeechSynthesis
        const enCard = [c1, c2].find(c => !c.text.includes('в') && !c.text.includes('уча') && !c.text.includes('играя') && !c.text.includes('слушам') && !c.text.includes('чета') && !c.text.includes('говоря'));
        if (enCard) await playEnglishAudio(enCard.text);
      } else {
        setTimeout(() => setFlipped([]), 900);
      }
    }
  };

  return (
    <div className="flex flex-col justify-between min-h-[560px] p-6 max-w-5xl mx-auto">
      <div className="text-center space-y-2">
        <span className="px-3 py-1 rounded-full bg-purple-950/80 border border-purple-800 text-purple-300 text-xs font-bold uppercase tracking-wider">
          Устойчиви глаголни съчетания (Collocations) · A1-A2
        </span>
        <h2 className="text-3xl md:text-5xl font-extrabold text-white font-heading">
          ENGLISH MEMORY: COLLOCATIONS
        </h2>
        <p className="text-slate-300 text-sm md:text-base">
          Открий съответстващите двойки (английско глаголно съчетание ⟷ български превод)! При отваряне браузърът автоматично произнася английската фраза.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 my-3">
        {cards.map((card) => {
          const isFlipped = flipped.includes(card.id) || matched.includes(card.pairKey);
          const isMatched = matched.includes(card.pairKey);
          return (
            <button
              key={card.id}
              onClick={() => handleCard(card)}
              className={`h-20 sm:h-24 rounded-2xl border text-center transition-all cursor-pointer flex items-center justify-center font-bold text-xs sm:text-sm p-3 ${
                isMatched
                  ? 'bg-emerald-950/40 border-emerald-500/60 text-emerald-300 shadow-md'
                  : isFlipped
                  ? 'bg-slate-900 border-cyan-400 text-white shadow-lg shadow-cyan-500/20'
                  : 'bg-slate-950 border-slate-800 text-cyan-400 hover:border-slate-700'
              }`}
            >
              {isFlipped ? (
                <span className="animate-fade-in">{card.text}</span>
              ) : (
                <span className="text-xl text-slate-600 font-mono">?</span>
              )}
            </button>
          );
        })}
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-slate-800">
        <span className="text-xs text-slate-400 font-mono">
          Открити фрази: <strong className="text-purple-400 font-bold">{matched.length} / 6</strong>
        </span>
        <button
          onClick={onNext}
          className="px-6 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
        >
          <span>Към Grammar Bridge (Past & Questions A1-A2)</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

// ======================== SLIDE 17: GRAMMAR BRIDGE (A1-A2) ========================
export const Slide17GrammarBridge: React.FC<SlideProps> = ({ onNext, onAddPoints }) => {
  const grammarTasks = [
    {
      q: '1. Yesterday, Emma ______ a fascinating presentation about loanwords.',
      speechPhrase: 'Yesterday, Emma prepared a fascinating presentation about loanwords.',
      options: [
        { text: 'prepared (Past Simple)', speech: 'prepared' },
        { text: 'prepares (Present Simple)', speech: 'prepares' },
        { text: 'is prepare', speech: 'is prepare' }
      ],
      correct: 'prepared (Past Simple)',
      expl: 'С думата yesterday използваме минало свършено време (Past Simple): правилен глагол prepare + ed ➔ prepared.'
    },
    {
      q: '2. Which question is grammatically correct in Past Simple?',
      speechPhrase: 'Did you learn new words yesterday?',
      options: [
        { text: 'Did you learn new words yesterday?', speech: 'Did you learn new words yesterday?' },
        { text: 'Did you learned new words yesterday?', speech: 'Did you learned new words yesterday?' },
        { text: 'You learned new words yesterday?', speech: 'You learned new words yesterday?' }
      ],
      correct: 'Did you learn new words yesterday?',
      expl: 'След спомагателния глагол DID основният глагол остава в основна форма (learn, а не learned)!'
    },
    {
      q: '3. Why are English and Bulgarian connected through vocabulary?',
      speechPhrase: 'Because languages borrow words when people trade, travel, and interact.',
      options: [
        { text: 'Because languages borrow words when people trade, travel, and interact.', speech: 'Because languages borrow words when people trade, travel, and interact.' },
        { text: 'Because English copied all words from Bulgarian.', speech: 'Because English copied all words from Bulgarian.' },
        { text: 'Because languages are identical.', speech: 'Because languages are identical.' }
      ],
      correct: 'Because languages borrow words when people trade, travel, and interact.',
      expl: 'Съюзът "because" обяснява логическата причина за езиковите контакти.'
    }
  ];

  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [currentlySpeaking, setCurrentlySpeaking] = useState<string | null>(null);

  const handleSpeak = async (phrase: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentlySpeaking(phrase);
    await playEnglishAudio(phrase, 0.88);
    setCurrentlySpeaking(null);
  };

  const handleChoose = (idx: number, optText: string) => {
    setAnswers({ ...answers, [idx]: optText });
    if (optText === grammarTasks[idx].correct) onAddPoints(15);
  };

  return (
    <div className="flex flex-col justify-between min-h-[560px] p-6 max-w-5xl mx-auto">
      <div className="text-center space-y-2">
        <span className="px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800 text-cyan-300 text-xs font-bold uppercase tracking-wider">
          Граматичен мост · Web Speech API (speechSynthesis)
        </span>
        <h2 className="text-3xl md:text-5xl font-extrabold text-white font-heading">
          GRAMMAR BRIDGE: TENSES & QUESTIONS
        </h2>
        <p className="text-slate-300 text-sm md:text-base">
          Кликни бутона <strong className="text-cyan-400">„🔊 ЧУЙ“</strong> до всяко английско изречение или опция, за да чуеш произношението чрез браузъра!
        </p>
      </div>

      <div className="my-3 space-y-3.5">
        {grammarTasks.map((item, idx) => {
          const selected = answers[idx];
          const isItemSpeaking = currentlySpeaking === item.speechPhrase;

          return (
            <div key={idx} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2.5">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <h3 className="text-sm md:text-base font-bold text-white font-mono">{item.q}</h3>
                
                {/* Dedicated "🔊 ЧУЙ" button for the whole target sentence */}
                <button
                  onClick={(e) => handleSpeak(item.speechPhrase, e)}
                  className={`px-3 py-1 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shrink-0 ${
                    isItemSpeaking
                      ? 'bg-yellow-400 text-slate-950 scale-105'
                      : 'bg-cyan-950 border border-cyan-500/50 hover:bg-cyan-900 text-cyan-300'
                  }`}
                  title="Чуй цялото английско изречение"
                >
                  <Volume2 className={`w-3.5 h-3.5 ${isItemSpeaking ? 'animate-bounce' : ''}`} />
                  <span>🔊 ЧУЙ ИЗРЕЧЕНИЕТО</span>
                </button>
              </div>

              {/* Options with selection + sound buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {item.options.map((opt) => {
                  const isChosen = selected === opt.text;
                  const isCorrect = opt.text === item.correct;
                  const isOptSpeaking = currentlySpeaking === opt.speech;

                  return (
                    <div
                      key={opt.text}
                      onClick={() => handleChoose(idx, opt.text)}
                      className={`p-2.5 rounded-xl border text-xs md:text-sm font-semibold transition-all cursor-pointer flex flex-col justify-between gap-2 ${
                        isChosen
                          ? isCorrect
                            ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300'
                            : 'bg-red-500/20 border-red-400 text-red-300'
                          : selected && isCorrect
                          ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400'
                          : 'bg-slate-950 border-slate-800 text-slate-200 hover:border-cyan-500'
                      }`}
                    >
                      <span>{opt.text}</span>

                      {/* Small individual 🔊 ЧУЙ button for each option */}
                      <button
                        onClick={(e) => handleSpeak(opt.speech, e)}
                        className={`self-end py-0.5 px-2 rounded text-[10px] font-bold flex items-center gap-1 cursor-pointer transition-all ${
                          isOptSpeaking
                            ? 'bg-yellow-400 text-slate-950'
                            : 'bg-slate-800 hover:bg-purple-900/60 text-purple-300 border border-slate-700'
                        }`}
                        title={`Чуй произношението на "${opt.speech}"`}
                      >
                        <Volume2 className="w-2.5 h-2.5" />
                        <span>🔊 ЧУЙ</span>
                      </button>
                    </div>
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

      <div className="flex justify-end pt-4 border-t border-slate-800">
        <button
          onClick={onNext}
          className="px-6 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
        >
          <span>Към Two Languages, One Bridge (Фонетика A1-A2)</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

// ======================== SLIDE 18: COMPARATIVE PHONETICS (A1-A2) ========================
export const Slide18ComparativePhonetics: React.FC<SlideProps> = ({ onNext, onAddPoints }) => {
  const wordPairs = [
    { 
      bg: 'компютър', 
      en: 'computer', 
      ipa: '/kəmˈpjuːtər/', 
      stressNote: 'Български: ком-ПЮ-тър (втора сричка) | English: com-PU-ter',
      sentence: '“I used my computer to write an essay.”' 
    },
    { 
      bg: 'шоколад', 
      en: 'chocolate', 
      ipa: '/ˈtʃɒklət/', 
      stressNote: 'Български: шо-ко-ЛАД (последна сричка) | English: CHO-co-late (първа сричка, 2 срички при изговор!)',
      sentence: '“Dark chocolate was first consumed in Central America.”' 
    },
    { 
      bg: 'музика', 
      en: 'music', 
      ipa: '/ˈmjuːzɪk/', 
      stressNote: 'Български: МУ-зи-ка | English: MU-sic (ударение на първа сричка)',
      sentence: '“Music connects people all over the world.”' 
    },
    { 
      bg: 'хотел', 
      en: 'hotel', 
      ipa: '/hoʊˈtɛl/', 
      stressNote: 'Български: хо-ТЕЛ | English: ho-TEL (ударение на втора сричка)',
      sentence: '“We stayed at a modern hotel near the museum.”' 
    },
    { 
      bg: 'телефон', 
      en: 'telephone / phone', 
      ipa: '/ˈtɛlɪfoʊn/', 
      stressNote: 'Български: те-ле-ФОН | English: TEL-e-phone (ударение на първа сричка!)',
      sentence: '“She called her teacher on the telephone.”' 
    }
  ];

  const [activeIdx, setActiveIdx] = useState(0);
  const [speakingTarget, setSpeakingTarget] = useState<string | null>(null);

  const handleSpeak = async (text: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSpeakingTarget(text);
    await playEnglishAudio(text, 0.85);
    setSpeakingTarget(null);
  };

  const handleSelectPair = async (idx: number) => {
    setActiveIdx(idx);
    await handleSpeak(wordPairs[idx].en);
    onAddPoints(5);
  };

  const curr = wordPairs[activeIdx];

  return (
    <div className="flex flex-col justify-between min-h-[560px] p-6 max-w-5xl mx-auto">
      <div className="text-center space-y-2">
        <span className="px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800 text-cyan-300 text-xs font-bold uppercase tracking-wider">
          Сравнителна фонетика & Web Speech API (speechSynthesis)
        </span>
        <h2 className="text-3xl md:text-5xl font-extrabold text-white font-heading">
          TWO LANGUAGES, ONE BRIDGE: ФОНЕТИКА
        </h2>
        <p className="text-slate-300 text-sm md:text-base">
          Кликни върху бутона <strong className="text-cyan-400">„🔊 ЧУЙ“</strong> до всяка дума или изречение, за да чуеш автентичното английско произношение и ударение!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-4 items-center">
        {/* Left List of word pairs */}
        <div className="space-y-2">
          {wordPairs.map((pair, idx) => {
            const isSelected = activeIdx === idx;
            const isWordSpeaking = speakingTarget === pair.en;

            return (
              <div
                key={idx}
                onClick={() => handleSelectPair(idx)}
                className={`w-full p-3 rounded-2xl border transition-all flex items-center justify-between text-left cursor-pointer ${
                  isSelected
                    ? 'bg-cyan-500/20 border-cyan-400 text-white shadow-lg shadow-cyan-500/20 translate-x-1'
                    : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-3 text-sm md:text-base">
                  <span className="font-bold text-cyan-300">🇧🇬 {pair.bg}</span>
                  <span className="text-slate-500">⟷</span>
                  <span className="font-bold text-purple-300 font-mono">🇬🇧 {pair.en}</span>
                </div>

                {/* Prominent 🔊 ЧУЙ button on each pair */}
                <button
                  onClick={(e) => handleSpeak(pair.en, e)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                    isWordSpeaking
                      ? 'bg-yellow-400 text-slate-950 scale-105'
                      : 'bg-purple-950 border border-purple-500/50 hover:bg-purple-900 text-purple-200'
                  }`}
                  title={`Чуй "${pair.en}"`}
                >
                  <Volume2 className={`w-3.5 h-3.5 ${isWordSpeaking ? 'animate-bounce' : ''}`} />
                  <span>🔊 ЧУЙ</span>
                </button>
              </div>
            );
          })}
        </div>

        {/* Right Details Panel */}
        <div className="p-6 rounded-3xl bg-slate-900 border-2 border-cyan-500/40 shadow-2xl space-y-4 text-center">
          <div>
            <h3 className="text-3xl md:text-4xl font-extrabold text-white font-heading font-mono mb-1">
              {curr.en}
            </h3>
            <p className="text-cyan-400 font-mono text-base">{curr.ipa}</p>
          </div>

          {/* Primary "🔊 ЧУЙ ДУМАТА" button */}
          <div className="flex justify-center gap-2">
            <button
              onClick={() => handleSpeak(curr.en)}
              className={`px-4 py-2 rounded-xl text-xs md:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer shadow-md ${
                speakingTarget === curr.en
                  ? 'bg-yellow-400 text-slate-950 scale-105'
                  : 'bg-cyan-600 hover:bg-cyan-500 text-white'
              }`}
            >
              <Volume2 className="w-4 h-4" />
              <span>🔊 ЧУЙ ДУМАТА: “{curr.en}”</span>
            </button>
          </div>

          <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-800/40 text-xs md:text-sm text-purple-200 text-left">
            <strong>🎯 Разлика в ударението:</strong><br />
            {curr.stressNote}
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-left space-y-1">
            <span className="text-[11px] font-bold uppercase text-slate-400 block">Контекстно изречение (A1-A2):</span>
            <p className="text-xs md:text-sm text-slate-200 italic font-medium">
              {curr.sentence}
            </p>
          </div>

          {/* Secondary "🔊 ЧУЙ ИЗРЕЧЕНИЕТО" button */}
          <button
            onClick={() => handleSpeak(curr.sentence)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 mx-auto cursor-pointer ${
              speakingTarget === curr.sentence
                ? 'bg-yellow-400 text-slate-950 scale-105'
                : 'bg-purple-600 hover:bg-purple-500 text-white shadow-md'
            }`}
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>🔊 ЧУЙ ИЗРЕЧЕНИЕТО НА АНГЛИЙСКИ</span>
          </button>
        </div>
      </div>

      <div className="flex justify-end pt-4 border-t border-slate-800">
        <button
          onClick={onNext}
          className="px-6 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
        >
          <span>Към Построй моста (4 зони)</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

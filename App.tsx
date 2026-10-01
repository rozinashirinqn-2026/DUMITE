import React, { useState, useEffect } from 'react';
import { TopNav } from './components/TopNav';
import { TeacherModal } from './components/TeacherModal';
import { 
  SlideCover,
  Slide1WordsTravel, 
  Slide2LabPortals, 
  Slide3LanguageHomeAndRoots, 
  Slide4BorrowingsPassport, 
  Slide5LanguageAtlas 
} from './components/slides/Slides1to5';
import { 
  Slide6TeenChat, 
  Slide7FalseFriends, 
  Slide8TextDetective, 
  Slide9MorphologySort, 
  Slide10EscapeRoom 
} from './components/slides/Slides6to10';
import { 
  Slide11EmmaStory, 
  Slide12ListenComprehend, 
  Slide13ChatWithEmmaA2, 
  Slide14WordConnections 
} from './components/slides/Slides11to14';
import { 
  Slide15ListenHunt, 
  Slide16MemoryCollocations, 
  Slide17GrammarBridge, 
  Slide18ComparativePhonetics 
} from './components/slides/Slides15to18';
import { 
  Slide19BuildBridge, 
  Slide20FinalQuiz, 
  Slide21ExitTicket, 
  Slide22Finale 
} from './components/slides/Slides19to22';
import { ChevronLeft, ChevronRight, Home } from 'lucide-react';

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(1);
  const [points, setPoints] = useState(50);
  const [teacherModalOpen, setTeacherModalOpen] = useState(false);
  const totalSlides = 23;

  // Keyboard navigation: Left = Prev, Right = Next
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        document.activeElement?.tagName === 'INPUT' ||
        document.activeElement?.tagName === 'TEXTAREA'
      ) {
        return;
      }

      if (e.key === 'ArrowRight') {
        setCurrentSlide((curr) => Math.min(curr + 1, totalSlides));
      } else if (e.key === 'ArrowLeft') {
        setCurrentSlide((curr) => Math.max(curr - 1, 1));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNext = () => {
    setCurrentSlide((curr) => Math.min(curr + 1, totalSlides));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrev = () => {
    setCurrentSlide((curr) => Math.max(curr - 1, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectSlide = (n: number) => {
    setCurrentSlide(n);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddPoints = (pts: number) => {
    setPoints((p) => p + pts);
  };

  const renderSlide = () => {
    switch (currentSlide) {
      case 1:
        return <SlideCover onNext={handleNext} onAddPoints={handleAddPoints} />;
      case 2:
        return <Slide1WordsTravel onNext={handleNext} onAddPoints={handleAddPoints} />;
      case 3:
        return <Slide2LabPortals onNext={handleNext} onAddPoints={handleAddPoints} />;
      case 4:
        return <Slide3LanguageHomeAndRoots onNext={handleNext} onAddPoints={handleAddPoints} />;
      case 5:
        return <Slide4BorrowingsPassport onNext={handleNext} onAddPoints={handleAddPoints} />;
      case 6:
        return <Slide5LanguageAtlas onNext={handleNext} onAddPoints={handleAddPoints} />;
      case 7:
        return <Slide6TeenChat onNext={handleNext} onAddPoints={handleAddPoints} />;
      case 8:
        return <Slide7FalseFriends onNext={handleNext} onAddPoints={handleAddPoints} />;
      case 9:
        return <Slide8TextDetective onNext={handleNext} onAddPoints={handleAddPoints} />;
      case 10:
        return <Slide9MorphologySort onNext={handleNext} onAddPoints={handleAddPoints} />;
      case 11:
        return <Slide10EscapeRoom onNext={handleNext} onAddPoints={handleAddPoints} />;
      case 12:
        return <Slide11EmmaStory onNext={handleNext} onAddPoints={handleAddPoints} />;
      case 13:
        return <Slide12ListenComprehend onNext={handleNext} onAddPoints={handleAddPoints} />;
      case 14:
        return <Slide13ChatWithEmmaA2 onNext={handleNext} onAddPoints={handleAddPoints} />;
      case 15:
        return <Slide14WordConnections onNext={handleNext} onAddPoints={handleAddPoints} />;
      case 16:
        return <Slide15ListenHunt onNext={handleNext} onAddPoints={handleAddPoints} />;
      case 17:
        return <Slide16MemoryCollocations onNext={handleNext} onAddPoints={handleAddPoints} />;
      case 18:
        return <Slide17GrammarBridge onNext={handleNext} onAddPoints={handleAddPoints} />;
      case 19:
        return <Slide18ComparativePhonetics onNext={handleNext} onAddPoints={handleAddPoints} />;
      case 20:
        return <Slide19BuildBridge onNext={handleNext} onAddPoints={handleAddPoints} totalPoints={points} />;
      case 21:
        return <Slide20FinalQuiz onNext={handleNext} onAddPoints={handleAddPoints} totalPoints={points} />;
      case 22:
        return <Slide21ExitTicket onNext={handleNext} onAddPoints={handleAddPoints} totalPoints={points} />;
      case 23:
        return <Slide22Finale onNext={handleNext} onAddPoints={handleAddPoints} totalPoints={points} />;
      default:
        return <SlideCover onNext={handleNext} onAddPoints={handleAddPoints} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Top Navigation Bar */}
      <TopNav
        currentSlide={currentSlide}
        totalSlides={totalSlides}
        points={points}
        onPrev={handlePrev}
        onNext={handleNext}
        onSelectSlide={handleSelectSlide}
        onOpenTeacher={() => setTeacherModalOpen(true)}
      />

      {/* Main Slide Interactive Stage */}
      <main className="flex-1 flex items-center justify-center p-3 sm:p-6 lg:p-8 relative overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-tr from-cyan-600/10 via-indigo-600/10 to-purple-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full max-w-6xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl rounded-3xl p-4 sm:p-8 shadow-2xl relative z-10 transition-all duration-300">
          {renderSlide()}
        </div>
      </main>

      {/* Floating Bottom Navigation */}
      <footer className="py-2.5 px-4 bg-slate-950/80 border-t border-slate-900 flex items-center justify-between text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleSelectSlide(1)}
            className="hover:text-slate-300 flex items-center gap-1 cursor-pointer transition-colors"
            title="Върни се на Слайд 1"
          >
            <Home className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Начало</span>
          </button>
          <span>·</span>
          <span>Клавиатура: <strong>←</strong> Назад · <strong>→</strong> Напред</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrev}
            disabled={currentSlide === 1}
            className="px-2 py-1 rounded bg-slate-900 hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed text-slate-300 flex items-center gap-1 cursor-pointer"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>Назад</span>
          </button>
          <span className="font-mono text-cyan-400 font-bold px-1">
            {currentSlide} / {totalSlides}
          </span>
          <button
            onClick={handleNext}
            disabled={currentSlide === totalSlides}
            className="px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed text-slate-300 flex items-center gap-1 cursor-pointer"
          >
            <span>Напред</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </footer>

      {/* Teacher Guide Modal */}
      <TeacherModal
        isOpen={teacherModalOpen}
        onClose={() => setTeacherModalOpen(false)}
      />
    </div>
  );
}

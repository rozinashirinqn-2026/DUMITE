import React, { useState } from 'react';
import { SLIDES_META } from '../data/lessonData';
import { downloadStandaloneHtml } from '../utils/exportHtml';
import { 
  ChevronLeft, 
  ChevronRight, 
  BookOpen, 
  Download, 
  Maximize2, 
  Minimize2, 
  Sparkles, 
  Grid,
  Volume2
} from 'lucide-react';
import { playEnglishAudio } from '../utils/speech';

interface TopNavProps {
  currentSlide: number;
  totalSlides: number;
  points: number;
  onPrev: () => void;
  onNext: () => void;
  onSelectSlide: (n: number) => void;
  onOpenTeacher: () => void;
}

export const TopNav: React.FC<TopNavProps> = ({
  currentSlide,
  totalSlides,
  points,
  onPrev,
  onNext,
  onSelectSlide,
  onOpenTeacher,
}) => {
  const [showSlideMenu, setShowSlideMenu] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const progressPercent = Math.round((currentSlide / totalSlides) * 100);

  return (
    <>
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 px-4 md:px-8 py-3 flex items-center justify-between shadow-lg">
        {/* Left: Brand & Topic */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-purple-500 flex items-center justify-center shadow-md shadow-cyan-500/20">
            <span className="text-xl">🌉</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base md:text-lg font-bold tracking-tight text-white font-heading">
                ДУМИТЕ – МОСТ МЕЖДУ ЕЗИЦИТЕ
              </h1>
              <span className="hidden sm:inline-block text-xs font-semibold px-2 py-0.5 rounded-full bg-cyan-950/80 text-cyan-400 border border-cyan-800/60">
                VII клас
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden lg:block">
              Български език (домашни, заемки, чуждици) × English A1–A2
            </p>
          </div>
        </div>

        {/* Center: Slide indicator & Quick jump */}
        <div className="relative">
          <button
            onClick={() => setShowSlideMenu(!showSlideMenu)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 hover:border-cyan-500 text-slate-200 transition-all text-xs md:text-sm font-semibold shadow-inner"
            title="Отвори списъка със слайдове"
          >
            <Grid className="w-4 h-4 text-cyan-400" />
            <span>Слайд {currentSlide} / {totalSlides}</span>
            <span className="text-slate-500">· {progressPercent}%</span>
          </button>

          {/* Slide Dropdown */}
          {showSlideMenu && (
            <div className="absolute top-12 left-1/2 -translate-x-1/2 w-80 md:w-96 max-h-96 overflow-y-auto bg-slate-900/95 backdrop-blur-xl border border-cyan-500/30 rounded-2xl p-2 shadow-2xl z-50">
              <div className="p-2 border-b border-slate-800 flex justify-between items-center text-xs font-semibold text-slate-400">
                <span>НАВИГАЦИЯ В УРОКА (26 СЛАЙДА)</span>
                <button
                  onClick={() => setShowSlideMenu(false)}
                  className="text-slate-400 hover:text-white px-2 py-1"
                >
                  ✕
                </button>
              </div>
              <div className="grid grid-cols-1 gap-1 mt-2">
                {SLIDES_META.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => {
                      onSelectSlide(s.id);
                      setShowSlideMenu(false);
                    }}
                    className={`flex items-center justify-between px-3 py-2 rounded-xl text-left text-xs transition-colors ${
                      s.id === currentSlide
                        ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40'
                        : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-5 text-right font-mono text-slate-500">
                        {s.id}.
                      </span>
                      <span className="truncate">{s.title}: {s.subtitle}</span>
                    </div>
                    <span className="text-[10px] text-slate-500 px-1.5 py-0.5 rounded bg-slate-800">
                      {s.tag}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          {/* Detective Score */}
          <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-950/40 border border-purple-800/40 text-purple-300 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-yellow-400 animate-pulse" />
            <span>{points} точки</span>
          </div>

          {/* Test Sound */}
          <button
            onClick={() => playEnglishAudio("Welcome to the Language Bridge!")}
            title="Тествай английското аудио"
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-slate-700 transition-colors"
          >
            <Volume2 className="w-4 h-4" />
          </button>

          {/* Teacher Guide Button */}
          <button
            onClick={onOpenTeacher}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs md:text-sm shadow-md shadow-purple-500/20 transition-all cursor-pointer"
          >
            <BookOpen className="w-4 h-4" />
            <span>ⓘ УЧИТЕЛ</span>
          </button>

          {/* Offline HTML Download */}
          <button
            onClick={downloadStandaloneHtml}
            title="Свали урока като офлайн самостоятелен HTML файл"
            className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white text-xs font-semibold transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-cyan-400" />
            <span>Свали HTML</span>
          </button>

          {/* Fullscreen toggle for projector */}
          <button
            onClick={toggleFullscreen}
            title="Цял екран (за мултимедия и проектор)"
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          {/* Prev / Next controls */}
          <div className="flex items-center gap-1 border-l border-slate-800 pl-2">
            <button
              onClick={onPrev}
              disabled={currentSlide === 1}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              title="Предишен слайд (Стрелка наляво ←)"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={onNext}
              disabled={currentSlide === totalSlides}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs md:text-sm shadow-md shadow-cyan-600/30 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              title="Следващ слайд (Стрелка надясно →)"
            >
              <span>Напред</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Thin glowing progress line */}
      <div className="w-full h-1 bg-slate-900 relative overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-500 transition-all duration-300"
          style={{ width: `${(currentSlide / totalSlides) * 100}%` }}
        />
      </div>
    </>
  );
};

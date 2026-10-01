import React from 'react';
import { TEACHER_GUIDE } from '../data/lessonData';
import { X, CheckCircle2, Compass, Sparkles, BookOpen, Layers } from 'lucide-react';

interface TeacherModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TeacherModal: React.FC<TeacherModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-slate-900 border border-cyan-500/40 rounded-3xl shadow-2xl overflow-hidden flex flex-col text-slate-100">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-600/30 border border-purple-500/40 flex items-center justify-center text-purple-300">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold font-heading text-white">
                {TEACHER_GUIDE.title}
              </h2>
              <p className="text-xs text-slate-400">
                {TEACHER_GUIDE.lessonTheme} · {TEACHER_GUIDE.duration}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
          {/* Top Info Banner */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-950/70 p-4 rounded-2xl border border-slate-800">
              <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider block mb-1">
                Целева група
              </span>
              <p className="text-sm font-medium text-slate-200">{TEACHER_GUIDE.classGrade}</p>
            </div>
            <div className="bg-slate-950/70 p-4 rounded-2xl border border-slate-800">
              <span className="text-xs font-semibold text-purple-400 uppercase tracking-wider block mb-1">
                Тип на урока
              </span>
              <p className="text-sm font-medium text-slate-200">{TEACHER_GUIDE.type}</p>
            </div>
            <div className="bg-slate-950/70 p-4 rounded-2xl border border-slate-800">
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider block mb-1">
                Методическа ос
              </span>
              <p className="text-xs font-medium text-slate-300">Пътуване на думите & Изграждане на мост</p>
            </div>
          </div>

          {/* Section: Educational Goals */}
          <div className="bg-slate-950/50 p-6 rounded-2xl border border-slate-800/80">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle2 className="w-5 h-5 text-cyan-400" />
              <h3 className="text-lg font-bold text-white font-heading">
                Образователни и възпитателни цели:
              </h3>
            </div>
            <ul className="grid grid-cols-1 gap-2.5">
              {TEACHER_GUIDE.goals.map((goal, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-slate-300">
                  <span className="w-5 h-5 rounded-full bg-cyan-950 border border-cyan-800 flex items-center justify-center text-[11px] font-bold text-cyan-400 shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{goal}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Section: Competencies */}
          <div className="bg-slate-950/50 p-6 rounded-2xl border border-slate-800/80">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-purple-400" />
              <h3 className="text-lg font-bold text-white font-heading">
                Ключови компетентности и умения:
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {TEACHER_GUIDE.competencies.map((comp, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-purple-950/20 border border-purple-800/30 text-xs md:text-sm text-purple-200 flex items-center gap-2.5"
                >
                  <span className="w-2 h-2 rounded-full bg-purple-400 shrink-0" />
                  <span>{comp}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Methodological Path */}
          <div className="bg-slate-950/50 p-6 rounded-2xl border border-slate-800/80">
            <div className="flex items-center gap-2 mb-3">
              <Compass className="w-5 h-5 text-indigo-400" />
              <h3 className="text-lg font-bold text-white font-heading">
                Методически подход:
              </h3>
            </div>
            <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-800/40 text-sm font-semibold text-indigo-200 leading-relaxed">
              {TEACHER_GUIDE.methodologicalPath}
            </div>
          </div>

          {/* Section: Pedagogical Recommendations for Demo Lesson */}
          <div className="bg-slate-950/50 p-6 rounded-2xl border border-slate-800/80">
            <div className="flex items-center gap-2 mb-4">
              <Layers className="w-5 h-5 text-yellow-400" />
              <h3 className="text-lg font-bold text-white font-heading">
                Указания за водене пред публика и жури:
              </h3>
            </div>
            <div className="space-y-3">
              {TEACHER_GUIDE.recommendations.map((rec, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs md:text-sm text-slate-300">
                  {rec}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-800 bg-slate-950/70 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-sm transition-colors cursor-pointer"
          >
            Разбрах, обратно към урока
          </button>
        </div>
      </div>
    </div>
  );
};

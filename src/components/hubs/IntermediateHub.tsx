import React, { useState } from 'react';
import { 
  BookMarked, 
  Zap, 
  FlaskConical, 
  Calculator, 
  Dna, 
  Sparkles, 
  CheckCircle2, 
  BookOpen, 
  ArrowRight,
  Target
} from 'lucide-react';
import { StudyMaterial, Subject } from '../../types';

interface IntermediateHubProps {
  materials: StudyMaterial[];
  subjects: Subject[];
  onOpenMaterial: (material: StudyMaterial) => void;
  onAskAIAboutTopic: (topic: string) => void;
}

const STREAMS = [
  { id: 'MPC', name: 'MPC (Maths, Physics, Chem)', color: 'from-amber-500 to-yellow-600' },
  { id: 'BiPC', name: 'BiPC (Biology, Physics, Chem)', color: 'from-emerald-500 to-teal-600' },
  { id: 'MEC', name: 'MEC (Maths, Econ, Commerce)', color: 'from-blue-500 to-indigo-600' },
  { id: 'CEC', name: 'CEC (Civics, Econ, Commerce)', color: 'from-purple-500 to-violet-600' },
];

export const IntermediateHub: React.FC<IntermediateHubProps> = ({
  materials,
  subjects,
  onOpenMaterial,
  onAskAIAboutTopic
}) => {
  const [selectedStream, setSelectedStream] = useState('MPC');
  const [selectedYear, setSelectedYear] = useState<'1st Year' | '2nd Year'>('2nd Year');

  const interSubjects = subjects.filter(s => s.category === 'intermediate');
  const interMaterials = materials.filter(m => m.category === 'intermediate');

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      
      {/* Banner */}
      <div className="relative rounded-3xl bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 text-white p-6 sm:p-8 overflow-hidden shadow-xl">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold uppercase tracking-wider mb-3">
            <BookMarked className="w-3.5 h-3.5" />
            <span>Intermediate 1st & 2nd Year Master Hub</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            Target 99% in Board Exams & Entrances
          </h1>
          <p className="text-sm text-amber-100 mt-2">
            IPE State Board & CBSE 11th-12th syllabus with physics formula sheets, organic reaction mechanisms, math step-by-step solutions, and EAMCET / JEE / NEET foundation.
          </p>

          <div className="flex flex-wrap gap-2 mt-4">
            {STREAMS.map((s) => (
              <button
                key={s.id}
                onClick={() => setSelectedStream(s.id)}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                  selectedStream === s.id
                    ? 'bg-white text-amber-700 shadow-md'
                    : 'bg-white/20 hover:bg-white/30 text-white'
                }`}
              >
                {s.name}
              </button>
            ))}
          </div>
        </div>

        <div className="hidden lg:flex absolute right-8 top-1/2 -translate-y-1/2 p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex-col items-center">
          <Target className="w-12 h-12 text-amber-200" />
          <span className="text-xs font-bold mt-2">IPE & Entrance</span>
        </div>
      </div>

      {/* Year Switcher & Quick Tool Pills */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSelectedYear('1st Year')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              selectedYear === '1st Year'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
            }`}
          >
            Junior Inter (Class 11)
          </button>
          <button
            onClick={() => setSelectedYear('2nd Year')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              selectedYear === '2nd Year'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
            }`}
          >
            Senior Inter (Class 12)
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onAskAIAboutTopic('Explain Reimer-Tiemann and Aldol condensation mechanisms')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-50 dark:bg-purple-950/70 text-purple-700 dark:text-purple-300 text-xs font-bold border border-purple-200 dark:border-purple-800 hover:scale-105 transition-all"
          >
            <FlaskConical className="w-3.5 h-3.5" />
            <span>Named Reactions</span>
          </button>
          <button
            onClick={() => onAskAIAboutTopic('Important Physics derivations in Ray Optics and Electrostatics')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300 text-xs font-bold border border-blue-200 dark:border-blue-800 hover:scale-105 transition-all"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Physics Formulas</span>
          </button>
        </div>
      </div>

      {/* Subjects Grid */}
      <div>
        <h3 className="text-base font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-amber-600" />
          <span>Intermediate Core Subjects</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {interSubjects.map((sub) => (
            <div
              key={sub.id}
              onClick={() => onAskAIAboutTopic(sub.name)}
              className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs hover:border-amber-400 transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-bold text-amber-600 bg-amber-50 dark:bg-amber-950/70 px-2 py-0.5 rounded-md">
                  {sub.branchOrStream}
                </span>
                <span className="text-slate-400">{sub.totalMaterials} materials</span>
              </div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-amber-600 transition-colors">
                {sub.name}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                {sub.description}
              </p>
              <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-between text-[11px]">
                <span className="text-slate-400">Board Weightage</span>
                <span className="font-bold text-amber-600">{sub.progressPercent}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Materials List */}
      <div>
        <h3 className="text-base font-bold text-slate-900 dark:text-white mb-3">
          High-Yield Formula Booklets & Reaction Summaries
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {interMaterials.map((mat) => (
            <div
              key={mat.id}
              onClick={() => onOpenMaterial(mat)}
              className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow-md hover:border-amber-400 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-50 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-900">
                    {mat.materialType.replace('_', ' ')}
                  </span>
                  <span className="text-xs text-slate-400">
                    {mat.readTimeMinutes} min read
                  </span>
                </div>
                <h4 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white group-hover:text-amber-600 transition-colors">
                  {mat.title}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                  {mat.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span className="truncate max-w-[200px]">{mat.authorOrSource}</span>
                <button className="text-amber-600 dark:text-amber-400 font-bold group-hover:translate-x-0.5 transition-transform">
                  Open Booklet →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

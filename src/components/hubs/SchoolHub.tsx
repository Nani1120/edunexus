import React, { useState } from 'react';
import { 
  School, 
  Sparkles, 
  ShieldCheck, 
  Smile, 
  Star, 
  Calculator, 
  Atom, 
  Globe, 
  BookOpen, 
  Lightbulb, 
  HelpCircle,
  FileCheck2,
  CheckCircle2
} from 'lucide-react';
import { StudyMaterial, Subject } from '../../types';

interface SchoolHubProps {
  materials: StudyMaterial[];
  subjects: Subject[];
  onOpenMaterial: (material: StudyMaterial) => void;
  onAskAIAboutTopic: (topic: string) => void;
}

const CLASSES = ['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5', 'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10'];

export const SchoolHub: React.FC<SchoolHubProps> = ({
  materials,
  subjects,
  onOpenMaterial,
  onAskAIAboutTopic
}) => {
  const [selectedClass, setSelectedClass] = useState('Class 10');
  const [selectedBoard, setSelectedBoard] = useState('CBSE');

  const schoolSubjects = subjects.filter(s => s.category === 'school');
  const schoolMaterials = materials.filter(m => m.category === 'school');

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      
      {/* Playful & Safe Banner */}
      <div className="relative rounded-3xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-700 text-white p-6 sm:p-8 overflow-hidden shadow-xl">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold uppercase tracking-wider mb-3">
            <School className="w-3.5 h-3.5" />
            <span>School Learning Ecosystem (Classes 1–10)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            Learn, Discover & Build Confidence!
          </h1>
          <p className="text-sm text-emerald-100 mt-2">
            Fun, colorful and age-appropriate study notes, interactive math worksheets, science experiments, and friendly homework guidance.
          </p>

          {/* Board Selector */}
          <div className="flex items-center gap-2 mt-4">
            {['CBSE', 'ICSE', 'State Board'].map((b) => (
              <button
                key={b}
                onClick={() => setSelectedBoard(b)}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                  selectedBoard === b
                    ? 'bg-white text-emerald-700 shadow-md'
                    : 'bg-white/20 hover:bg-white/30 text-white'
                }`}
              >
                {b}
              </button>
            ))}
          </div>
        </div>

        {/* Child Safe Privacy Badge */}
        <div className="hidden lg:flex absolute right-8 top-1/2 -translate-y-1/2 p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex-col items-center max-w-[180px] text-center">
          <ShieldCheck className="w-10 h-10 text-emerald-200" />
          <span className="text-xs font-bold mt-2">100% Child-Safe</span>
          <span className="text-[10px] text-emerald-100 mt-1">Zero tracking • Kid-friendly AI safeguards</span>
        </div>
      </div>

      {/* Class Selector Carousel */}
      <div className="p-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider pl-2 shrink-0">
            Select Class:
          </span>
          {CLASSES.map((cls) => (
            <button
              key={cls}
              onClick={() => setSelectedClass(cls)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedClass === cls
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              {cls}
            </button>
          ))}
        </div>
      </div>

      {/* Quick Interactive Tool Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div 
          onClick={() => onAskAIAboutTopic('Explain Real Numbers and how to find HCF and LCM simply')}
          className="p-4 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/40 dark:to-indigo-950/40 border border-blue-200 dark:border-blue-800/60 cursor-pointer hover:scale-105 transition-all group"
        >
          <div className="w-9 h-9 rounded-xl bg-blue-500 text-white flex items-center justify-center mb-2 shadow-xs">
            <Calculator className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-sm text-slate-900 dark:text-white">
            Math Step-by-Step
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Solve problems with friendly step-by-step breakdowns.
          </p>
        </div>

        <div 
          onClick={() => onAskAIAboutTopic('Explain Light reflection laws with a fun experiment')}
          className="p-4 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/40 dark:to-teal-950/40 border border-emerald-200 dark:border-emerald-800/60 cursor-pointer hover:scale-105 transition-all group"
        >
          <div className="w-9 h-9 rounded-xl bg-emerald-500 text-white flex items-center justify-center mb-2 shadow-xs">
            <Atom className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-sm text-slate-900 dark:text-white">
            Science Explorer
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Fun diagrams, real-life examples, and simple science experiments.
          </p>
        </div>

        <div 
          onClick={() => onAskAIAboutTopic('Help me learn 5 new vocabulary words with funny memory tricks')}
          className="p-4 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/40 dark:to-pink-950/40 border border-purple-200 dark:border-purple-800/60 cursor-pointer hover:scale-105 transition-all group"
        >
          <div className="w-9 h-9 rounded-xl bg-purple-500 text-white flex items-center justify-center mb-2 shadow-xs">
            <Sparkles className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-sm text-slate-900 dark:text-white">
            Homework Buddy
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Ask any question and get gentle, encouraging explanations.
          </p>
        </div>
      </div>

      {/* School Subjects */}
      <div>
        <h3 className="text-base font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-emerald-600" />
          <span>{selectedClass} Subjects ({schoolSubjects.length})</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {schoolSubjects.map((sub) => (
            <div
              key={sub.id}
              onClick={() => onAskAIAboutTopic(sub.name)}
              className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs hover:border-emerald-400 transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/70 px-2 py-0.5 rounded-md">
                  {sub.semesterOrClass}
                </span>
                <span className="text-slate-400">{sub.totalMaterials} lessons</span>
              </div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-emerald-600 transition-colors">
                {sub.name}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                {sub.description}
              </p>
              <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-between text-[11px]">
                <span className="text-slate-400">Mastery</span>
                <span className="font-bold text-emerald-600">{sub.progressPercent}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Materials List */}
      <div>
        <h3 className="text-base font-bold text-slate-900 dark:text-white mb-3">
          Illustrated Notes & Chapter Worksheets
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {schoolMaterials.map((mat) => (
            <div
              key={mat.id}
              onClick={() => onOpenMaterial(mat)}
              className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow-md hover:border-emerald-400 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900">
                    {mat.materialType.replace('_', ' ')}
                  </span>
                  <span className="text-xs text-slate-400">
                    {mat.readTimeMinutes} min read
                  </span>
                </div>
                <h4 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white group-hover:text-emerald-600 transition-colors">
                  {mat.title}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                  {mat.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span className="truncate max-w-[200px]">{mat.authorOrSource}</span>
                <button className="text-emerald-600 dark:text-emerald-400 font-bold group-hover:translate-x-0.5 transition-transform">
                  Start Reading →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

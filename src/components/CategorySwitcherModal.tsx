import React from 'react';
import { X, GraduationCap, School, BookMarked, Stethoscope, Check, ArrowRight } from 'lucide-react';
import { EducationCategory } from '../types';

interface CategorySwitcherModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentCategory: EducationCategory;
  onSelectCategory: (category: EducationCategory) => void;
}

const CATEGORIES = [
  {
    id: 'school' as EducationCategory,
    title: 'School Education',
    subtitle: 'Classes 1–10 (CBSE, ICSE, State Boards)',
    description: 'Interactive chapter worksheets, easy visual explanations, Class 10 board model papers, and child-safe learning.',
    icon: School,
    badge: 'Classes 1–10',
    color: 'from-emerald-500 to-teal-600',
    border: 'border-emerald-200 dark:border-emerald-800'
  },
  {
    id: 'intermediate' as EducationCategory,
    title: 'Intermediate Hub',
    subtitle: '1st & 2nd Year (Classes 11 & 12)',
    description: 'Streams: MPC, BiPC, MEC, CEC. Complete board syllabus, physics formula sheets, organic reaction charts, and entrance prep.',
    icon: BookMarked,
    badge: 'MPC • BiPC • MEC • CEC',
    color: 'from-amber-500 to-yellow-600',
    border: 'border-amber-200 dark:border-amber-800'
  },
  {
    id: 'btech' as EducationCategory,
    title: 'B.Tech Engineering Hub',
    subtitle: 'CSE, ECE, EEE, MECH, CIVIL, AI & DS',
    description: 'Semester-wise notes (Sem 1–8), previous year question papers, lab manuals, coding interview practice, and viva prep.',
    icon: GraduationCap,
    badge: '8 Engineering Branches',
    color: 'from-blue-600 to-indigo-600',
    border: 'border-blue-200 dark:border-blue-800'
  },
  {
    id: 'nursing' as EducationCategory,
    title: 'Nursing Education Hub',
    subtitle: 'ANM, GNM, B.Sc, Post Basic & M.Sc Nursing',
    description: 'Clinical case studies, NANDA-I nursing care plans, emergency drug studies, Anatomy & Physiology, and practical procedures.',
    icon: Stethoscope,
    badge: 'Clinical & Hospital Practice',
    color: 'from-rose-500 to-red-600',
    border: 'border-rose-200 dark:border-rose-800'
  }
];

export const CategorySwitcherModal: React.FC<CategorySwitcherModalProps> = ({
  isOpen,
  onClose,
  currentCategory,
  onSelectCategory
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Choose Your Education Hub
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              EduNexus personalizes your subjects, PYQs, AI tutor, and practice exams to match your level.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Categories Grid */}
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[70vh] overflow-y-auto">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isSelected = currentCategory === cat.id;

            return (
              <div
                key={cat.id}
                onClick={() => {
                  onSelectCategory(cat.id);
                  onClose();
                }}
                className={`relative group p-4 rounded-xl border text-left cursor-pointer transition-all hover:scale-[1.02] shadow-xs ${
                  isSelected
                    ? 'border-brand-500 dark:border-brand-500 bg-brand-50/50 dark:bg-brand-950/40 ring-2 ring-brand-500/20'
                    : 'border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-tr ${cat.color} flex items-center justify-center text-white shadow-sm`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  {isSelected ? (
                    <span className="flex items-center gap-1 text-[11px] font-bold text-brand-600 dark:text-brand-400 bg-brand-100 dark:bg-brand-900/60 px-2 py-0.5 rounded-full">
                      <Check className="w-3 h-3 stroke-[3]" /> Active
                    </span>
                  ) : (
                    <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 bg-slate-200/70 dark:bg-slate-800 px-2 py-0.5 rounded-full">
                      {cat.badge}
                    </span>
                  )}
                </div>

                <h3 className="font-bold text-slate-900 dark:text-white mt-3 text-base">
                  {cat.title}
                </h3>
                <p className="text-xs font-medium text-brand-600 dark:text-brand-400 mt-0.5">
                  {cat.subtitle}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 line-clamp-2">
                  {cat.description}
                </p>

                <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-slate-700 dark:text-slate-300 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                  <span>Enter Hub</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer info */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/60 border-t border-slate-100 dark:border-slate-800 text-center">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            You can switch hubs anytime without losing your saved bookmarks or notes history.
          </p>
        </div>

      </div>
    </div>
  );
};

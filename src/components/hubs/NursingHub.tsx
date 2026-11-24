import React, { useState } from 'react';
import { 
  Stethoscope, 
  FileText, 
  HeartPulse, 
  Pill, 
  Cross, 
  BookOpen, 
  AlertTriangle, 
  CheckCircle2, 
  Download, 
  Bookmark, 
  Sparkles,
  Search,
  Filter
} from 'lucide-react';
import { StudyMaterial, Subject } from '../../types';

interface NursingHubProps {
  materials: StudyMaterial[];
  subjects: Subject[];
  onOpenMaterial: (material: StudyMaterial) => void;
  onAskAIAboutTopic: (topic: string) => void;
}

export const NursingHub: React.FC<NursingHubProps> = ({
  materials,
  subjects,
  onOpenMaterial,
  onAskAIAboutTopic
}) => {
  const [selectedCourse, setSelectedCourse] = useState('B.Sc Nursing');
  const [selectedTab, setSelectedTab] = useState<'all' | 'care_plans' | 'drug_study' | 'clinical_cases' | 'notes'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const nursingSubjects = subjects.filter(s => s.category === 'nursing');
  const nursingMaterials = materials.filter(m => m.category === 'nursing');

  const filteredMaterials = nursingMaterials.filter(m => {
    const matchSearch = !searchQuery || 
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchSearch) return false;

    if (selectedTab === 'care_plans') return m.materialType === 'care_plan';
    if (selectedTab === 'drug_study') return m.materialType === 'drug_study';
    if (selectedTab === 'clinical_cases') return m.materialType === 'clinical_case';
    if (selectedTab === 'notes') return m.materialType === 'pdf_notes' || m.materialType === 'text_notes';
    return true;
  });

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      
      {/* Hero Banner with Clinical Aesthetics */}
      <div className="relative rounded-3xl bg-gradient-to-r from-rose-600 via-rose-700 to-red-800 text-white p-6 sm:p-8 overflow-hidden shadow-xl">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold uppercase tracking-wider mb-3">
            <Stethoscope className="w-3.5 h-3.5" />
            <span>Dedicated Nursing Education & Clinical Hub</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            Excellence in Nursing & Patient Care
          </h1>
          <p className="text-sm text-rose-100 mt-2">
            Structured study materials for ANM, GNM, B.Sc, Post Basic & M.Sc Nursing. Featuring NANDA Care Plans, Drug Formularies, and Clinical Case Studies.
          </p>

          {/* Quick Course Selector Pills */}
          <div className="flex flex-wrap gap-2 mt-4">
            {['B.Sc Nursing', 'GNM', 'ANM', 'Post Basic B.Sc', 'M.Sc Nursing'].map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCourse(c)}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                  selectedCourse === c
                    ? 'bg-white text-rose-700 shadow-md'
                    : 'bg-white/20 hover:bg-white/30 text-white'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Decorative badge */}
        <div className="hidden lg:flex absolute right-8 top-1/2 -translate-y-1/2 p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex-col items-center">
          <HeartPulse className="w-12 h-12 text-rose-200 animate-pulse" />
          <span className="text-xs font-bold mt-2">INC Aligned</span>
        </div>
      </div>

      {/* Prominent Clinical Disclaimer Notice */}
      <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 flex items-start gap-3 text-xs text-amber-900 dark:text-amber-200">
        <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <strong className="font-bold block text-sm">Educational Notice & Clinical Protocol Adherence:</strong>
          All nursing clinical care plans, pharmacology drug studies, and procedure manuals provided on EduNexus are intended strictly for educational preparation. In clinical and hospital environments, students must strictly adhere to their assigned clinical supervisor directives, physician orders, and institutionally approved protocols.
        </div>
      </div>

      {/* Nursing Core Subjects Carousel */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-rose-600" />
            <span>Essential Nursing Subjects ({nursingSubjects.length})</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {nursingSubjects.map((sub) => (
            <div
              key={sub.id}
              className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs hover:border-rose-400 dark:hover:border-rose-600 transition-all group cursor-pointer"
              onClick={() => onAskAIAboutTopic(sub.name)}
            >
              <div className="flex items-start justify-between">
                <span className="text-[10px] font-bold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/80 px-2 py-0.5 rounded-full">
                  {sub.semesterOrClass}
                </span>
                <span className="text-xs text-slate-400">
                  {sub.totalMaterials} materials
                </span>
              </div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white mt-2 group-hover:text-rose-600 transition-colors">
                {sub.name}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                {sub.description}
              </p>
              <div className="mt-3 flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px]">
                <span className="text-slate-400">Syllabus Progress</span>
                <span className="font-bold text-rose-600">{sub.progressPercent}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Filter Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
          {[
            { id: 'all', label: 'All Resources' },
            { id: 'care_plans', label: 'Care Plans (NANDA)' },
            { id: 'drug_study', label: 'Drug Study & Pharmacology' },
            { id: 'clinical_cases', label: 'Clinical Case Studies' },
            { id: 'notes', label: 'Lecture Notes' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedTab === tab.id
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative max-w-xs w-full">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search nursing resources..."
            className="w-full pl-9 pr-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-500"
          />
        </div>
      </div>

      {/* Materials List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredMaterials.map((mat) => (
          <div
            key={mat.id}
            onClick={() => onOpenMaterial(mat)}
            className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow-md hover:border-rose-400 dark:hover:border-rose-600 transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-rose-50 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-900">
                  {mat.materialType.replace('_', ' ')}
                </span>
                <span className="text-xs text-slate-400">
                  {mat.readTimeMinutes} min read
                </span>
              </div>
              <h4 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white group-hover:text-rose-600 transition-colors">
                {mat.title}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                {mat.description}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span className="truncate max-w-[180px]">{mat.authorOrSource}</span>
              <button className="text-rose-600 dark:text-rose-400 font-bold group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                <span>Open Reader</span>
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

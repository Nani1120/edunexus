import React from 'react';
import { 
  Sparkles, 
  Search, 
  Flame, 
  Clock, 
  BookOpen, 
  CheckCircle2, 
  Calendar, 
  ChevronRight, 
  ArrowRight, 
  Bookmark, 
  TrendingUp, 
  HelpCircle,
  FileText,
  Award,
  Zap,
  Target,
  GraduationCap,
  Stethoscope,
  School,
  BookMarked
} from 'lucide-react';
import { StudentProfile, StudyMaterial, Subject, MCQQuestion, ExamSchedule } from '../../types';

interface HomeViewProps {
  profile: StudentProfile;
  materials: StudyMaterial[];
  subjects: Subject[];
  dailyMCQ: MCQQuestion | null;
  upcomingExam: ExamSchedule | null;
  onOpenMaterial: (material: StudyMaterial) => void;
  onOpenSearch: () => void;
  onNavigateToView: (view: string) => void;
  onStartQuiz: () => void;
  onOpenOnboarding: () => void;
  onSwitchCategory: (category: any) => void;
  bookmarks: string[];
  onToggleBookmark: (id: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  profile,
  materials,
  subjects,
  dailyMCQ,
  upcomingExam,
  onOpenMaterial,
  onOpenSearch,
  onNavigateToView,
  onStartQuiz,
  onOpenOnboarding,
  onSwitchCategory,
  bookmarks,
  onToggleBookmark
}) => {
  // Filter materials relevant to current student category
  const relevantMaterials = materials.filter(m => m.category === profile.category);
  const relevantSubjects = subjects.filter(s => s.category === profile.category);
  
  const continueMaterial = relevantMaterials[0] || materials[0];
  const pyqMaterials = relevantMaterials.filter(m => m.materialType === 'pyq');
  const trendingMaterials = [...relevantMaterials].sort((a, b) => b.viewsCount - a.viewsCount).slice(0, 4);
  const recentMaterials = [...relevantMaterials].slice(0, 4);

  // Daily goal calculation
  const goalPercent = Math.min(100, Math.round(((profile.minutesStudiedToday || 0) / (profile.dailyGoalMinutes || 60)) * 100));

  // Exam Countdown calculation
  let daysToExam = 14;
  if (upcomingExam) {
    const diff = new Date(upcomingExam.examDate).getTime() - new Date().getTime();
    daysToExam = Math.max(1, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  }

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn pb-16">
      
      {/* Top Welcome & Search Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Welcome back, {profile.fullName.split(' ')[0]} 👋
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-2">
            <span className="font-semibold text-brand-600 dark:text-brand-400">
              {profile.category.toUpperCase()} • {profile.courseOrClass}
            </span>
            <span>•</span>
            <span className="truncate max-w-[200px]">{profile.boardOrUniversity}</span>
            <button 
              onClick={onOpenOnboarding}
              className="text-[11px] underline hover:text-brand-600"
            >
              (Edit)
            </button>
          </p>
        </div>

        {/* Global Search Bar (Mobile/Tablet prominent) */}
        <div className="w-full md:max-w-md">
          <button
            onClick={onOpenSearch}
            className="w-full flex items-center justify-between px-4 py-3 text-xs sm:text-sm text-slate-400 dark:text-slate-500 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-brand-500 dark:hover:border-brand-500 shadow-sm transition-all"
          >
            <div className="flex items-center gap-2.5">
              <Search className="w-4 h-4 text-brand-500" />
              <span>Search notes, subjects, PDFs, papers...</span>
            </div>
            <kbd className="px-2 py-0.5 text-[10px] font-mono bg-slate-100 dark:bg-slate-800 text-slate-500 rounded border border-slate-200 dark:border-slate-700">
              Search
            </kbd>
          </button>
        </div>
      </div>

      {/* Hero Widget Row: Daily Study Goal & Exam Countdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Daily Study Goal Card */}
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Target className="w-4 h-4 text-brand-500" /> Daily Target
            </span>
            <span className="text-xs font-bold text-brand-600 dark:text-brand-400">
              {profile.minutesStudiedToday} / {profile.dailyGoalMinutes} min
            </span>
          </div>

          <div className="my-4">
            <div className="flex items-baseline justify-between mb-1.5">
              <span className="text-2xl font-black text-slate-900 dark:text-white">
                {goalPercent}%
              </span>
              <span className="text-xs text-slate-400 font-medium">
                {Math.max(0, profile.dailyGoalMinutes - profile.minutesStudiedToday)} mins left today
              </span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
              <div 
                className="bg-gradient-to-r from-brand-600 to-emerald-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${goalPercent}%` }}
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100 dark:border-slate-800">
            <span className="flex items-center gap-1 font-semibold text-amber-600">
              <Flame className="w-4 h-4 fill-amber-500" /> {profile.streakDays} Day Streak!
            </span>
            <button 
              onClick={() => onNavigateToView('planner')}
              className="font-bold text-brand-600 hover:underline text-[11px]"
            >
              Study Planner →
            </button>
          </div>
        </div>

        {/* Upcoming Exam Countdown Card */}
        <div className="p-5 rounded-3xl bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-950 text-white shadow-lg flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-6 -mt-6 w-32 h-32 bg-brand-500/10 rounded-full blur-xl pointer-events-none" />
          
          <div className="flex items-center justify-between relative z-10">
            <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-brand-400" /> Exam Countdown
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-indigo-800/80 text-indigo-200">
              Official Schedule
            </span>
          </div>

          <div className="my-3 relative z-10">
            <div className="text-3xl font-black tracking-tight text-white flex items-baseline gap-1.5">
              <span>{daysToExam}</span>
              <span className="text-sm font-semibold text-indigo-300">Days Remaining</span>
            </div>
            <p className="text-xs font-bold text-indigo-200 mt-1 truncate">
              {upcomingExam ? upcomingExam.title : 'Semester / Board Examinations'}
            </p>
          </div>

          <div className="pt-2 border-t border-indigo-800/60 flex items-center justify-between relative z-10 text-xs">
            <span className="text-indigo-300">Syllabus Covered: 78%</span>
            <button
              onClick={() => onNavigateToView('practice')}
              className="font-bold text-white hover:text-indigo-200 flex items-center gap-1"
            >
              <span>Take Mock</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* AI Tutor Shortcut Banner */}
        <div 
          onClick={() => onNavigateToView('ai-tutor')}
          className="p-5 rounded-3xl bg-gradient-to-br from-brand-600 via-violet-600 to-brand-accent text-white shadow-lg flex flex-col justify-between cursor-pointer group hover:scale-[1.02] transition-all relative overflow-hidden"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-brand-200 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-yellow-300 animate-pulse" /> 24/7 AI Academic Tutor
            </span>
            <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-bold">
              English • తెలుగు • हिंदी
            </span>
          </div>

          <div className="my-3">
            <h3 className="font-extrabold text-lg text-white">
              Stuck on a problem or formula?
            </h3>
            <p className="text-xs text-brand-100 mt-1 line-clamp-2">
              Ask for 10-mark exam answers, step-by-step math derivations, or upload question photos.
            </p>
          </div>

          <div className="pt-2 border-t border-white/20 flex items-center justify-between text-xs font-bold text-white">
            <span>Ask AI Tutor Now</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

      </div>

      {/* Continue Studying Active Card */}
      {continueMaterial && (
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-brand-50 dark:bg-brand-950/80 text-brand-600 dark:text-brand-300 flex items-center justify-center shrink-0 shadow-inner">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-brand-100 dark:bg-brand-900/60 text-brand-700 dark:text-brand-300">
                  Resume Studying
                </span>
                <span className="text-xs text-slate-400">
                  {continueMaterial.subjectName}
                </span>
              </div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                {continueMaterial.title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
                {continueMaterial.description}
              </p>
            </div>
          </div>

          <button
            onClick={() => onOpenMaterial(continueMaterial)}
            className="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1.5 shrink-0"
          >
            <span>Continue Reading</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Sector Hub Quick Switcher Pills */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-brand-600" />
            <span>Explore Education Hubs</span>
          </h2>
          <span className="text-xs text-slate-400">Instant Switch</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { id: 'btech', name: 'B.Tech Hub', sub: '8 Branches • Sem 1–8', icon: GraduationCap, color: 'from-blue-600 to-indigo-600' },
            { id: 'nursing', name: 'Nursing Hub', sub: 'ANM, GNM, B.Sc & M.Sc', icon: Stethoscope, color: 'from-rose-500 to-red-600' },
            { id: 'intermediate', name: 'Inter Hub', sub: 'MPC, BiPC, MEC, CEC', icon: BookMarked, color: 'from-amber-500 to-yellow-600' },
            { id: 'school', name: 'School Hub', sub: 'Classes 1 to 10', icon: School, color: 'from-emerald-500 to-teal-600' },
          ].map((hub) => {
            const Icon = hub.icon;
            const isCurrent = profile.category === hub.id;

            return (
              <div
                key={hub.id}
                onClick={() => onSwitchCategory(hub.id)}
                className={`p-3.5 rounded-2xl border cursor-pointer transition-all hover:scale-105 shadow-xs ${
                  isCurrent 
                    ? 'border-brand-500 bg-brand-50/50 dark:bg-brand-950/40 ring-2 ring-brand-500/20'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300'
                }`}
              >
                <div className={`w-8 h-8 rounded-xl bg-gradient-to-tr ${hub.color} text-white flex items-center justify-center mb-2 shadow-xs`}>
                  <Icon className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                  {hub.name}
                </h4>
                <p className="text-[10px] text-slate-400 mt-0.5 truncate">
                  {hub.sub}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* My Subjects Grid */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-brand-600" />
            <span>My Enrolled Subjects ({relevantSubjects.length})</span>
          </h2>
          <button 
            onClick={() => onNavigateToView('materials')}
            className="text-xs font-bold text-brand-600 dark:text-brand-400 hover:underline"
          >
            All Materials →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {relevantSubjects.map((sub) => (
            <div
              key={sub.id}
              onClick={() => onNavigateToView('materials')}
              className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs hover:border-brand-400 cursor-pointer transition-all group"
            >
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-bold text-brand-600 bg-brand-50 dark:bg-brand-950/70 px-2 py-0.5 rounded-md">
                  {sub.semesterOrClass}
                </span>
                <span className="text-slate-400">{sub.totalMaterials} notes</span>
              </div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-brand-600 transition-colors">
                {sub.name}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                {sub.description}
              </p>
              <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-between text-[11px]">
                <span className="text-slate-400">Progress</span>
                <span className="font-bold text-brand-600">{sub.progressPercent}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Daily Quiz & Quick PYQ Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Daily Diagnostic Quiz Widget */}
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-500 fill-amber-500" /> Daily Brain Teaser
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-50 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300">
                +10 XP
              </span>
            </div>

            {dailyMCQ ? (
              <>
                <p className="text-xs font-semibold text-brand-600 mb-1">
                  {dailyMCQ.subjectName} • {dailyMCQ.topic}
                </p>
                <h4 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white leading-snug">
                  {dailyMCQ.question}
                </h4>
              </>
            ) : (
              <p className="text-xs text-slate-500">Practice questions loaded for today.</p>
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <span className="text-xs text-slate-400">Test understanding with timer</span>
            <button
              onClick={onStartQuiz}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-xl text-xs font-extrabold shadow-sm transition-all"
            >
              Solve Daily Quiz Now
            </button>
          </div>
        </div>

        {/* Previous Year Question Papers (PYQs) Shortcut */}
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-brand-500" /> Solved Question Papers
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300">
                Model Solutions
              </span>
            </div>

            <div className="space-y-2">
              {pyqMaterials.length > 0 ? (
                pyqMaterials.slice(0, 2).map((pyq) => (
                  <div
                    key={pyq.id}
                    onClick={() => onOpenMaterial(pyq)}
                    className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-brand-50 hover:text-brand-600 dark:hover:bg-brand-950/40 cursor-pointer transition-colors flex items-center justify-between group"
                  >
                    <div>
                      <h5 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-brand-600">
                        {pyq.title}
                      </h5>
                      <span className="text-[10px] text-slate-400">{pyq.readTimeMinutes} min • {pyq.boardOrUniversity}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                ))
              ) : (
                <div className="text-xs text-slate-500 p-2">
                  Solved model examination papers available in the library.
                </div>
              )}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <span className="text-xs text-slate-400">Includes 5 & 10-mark answers</span>
            <button
              onClick={() => onNavigateToView('materials')}
              className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-bold shadow-sm transition-all"
            >
              Browse All Papers
            </button>
          </div>
        </div>

      </div>

      {/* Trending & High-Yield Study Resources */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-500" />
            <span>Trending in Your Course</span>
          </h2>
          <span className="text-xs text-slate-400">Verified Curriculum</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {trendingMaterials.map((mat) => {
            const isBookmarked = bookmarks.includes(mat.id);
            return (
              <div
                key={mat.id}
                className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs hover:border-brand-400 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-brand-50 dark:bg-brand-950/80 text-brand-700 dark:text-brand-300">
                      {mat.materialType.replace('_', ' ')}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleBookmark(mat.id);
                      }}
                      className="p-1 text-slate-400 hover:text-amber-500"
                    >
                      <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-amber-500 text-amber-500' : ''}`} />
                    </button>
                  </div>
                  <h4 
                    onClick={() => onOpenMaterial(mat)}
                    className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white group-hover:text-brand-600 cursor-pointer transition-colors"
                  >
                    {mat.title}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                    {mat.description}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                  <span>{mat.readTimeMinutes} min read</span>
                  <span 
                    onClick={() => onOpenMaterial(mat)}
                    className="text-brand-600 dark:text-brand-400 font-bold cursor-pointer group-hover:underline"
                  >
                    Read Note →
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};

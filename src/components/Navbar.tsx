import React from 'react';
import { 
  Sparkles, 
  Search, 
  Moon, 
  Sun, 
  Crown, 
  Flame, 
  ChevronDown, 
  ShieldCheck, 
  GraduationCap, 
  SlidersHorizontal 
} from 'lucide-react';
import { StudentProfile, EducationCategory } from '../types';

interface NavbarProps {
  profile: StudentProfile;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenSearch: () => void;
  onOpenCategorySwitcher: () => void;
  onOpenPremium: () => void;
  onOpenOnboarding: () => void;
  onOpenAdmin: () => void;
  activeView: string;
  setActiveView: (view: string) => void;
}

const CATEGORY_LABELS: Record<EducationCategory, { label: string; badge: string; color: string }> = {
  school: { label: 'School (1–10)', badge: 'Classes 1–10', color: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700' },
  intermediate: { label: 'Intermediate', badge: '11th & 12th', color: 'bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300 border-amber-300 dark:border-amber-700' },
  btech: { label: 'B.Tech Engineering', badge: 'B.Tech', color: 'bg-blue-100 text-blue-800 dark:bg-blue-950/80 dark:text-blue-300 border-blue-300 dark:border-blue-700' },
  nursing: { label: 'Nursing Hub', badge: 'Nursing', color: 'bg-rose-100 text-rose-800 dark:bg-rose-950/80 dark:text-rose-300 border-rose-300 dark:border-rose-700' },
};

export const Navbar: React.FC<NavbarProps> = ({
  profile,
  darkMode,
  onToggleDarkMode,
  onOpenSearch,
  onOpenCategorySwitcher,
  onOpenPremium,
  onOpenOnboarding,
  onOpenAdmin,
  activeView,
  setActiveView
}) => {
  const catInfo = CATEGORY_LABELS[profile.category] || CATEGORY_LABELS.btech;

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/90 dark:bg-slate-900/90 border-b border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Category Selector */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setActiveView('home')} 
              className="flex items-center gap-2 group text-left"
              title="EduNexus Home"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 via-brand-500 to-brand-accent flex items-center justify-center text-white shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div className="hidden sm:block">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-brand-600 to-brand-accent bg-clip-text text-transparent">
                    EduNexus
                  </span>
                  <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-brand-100 dark:bg-brand-900/60 text-brand-700 dark:text-brand-300">
                    Pro
                  </span>
                </div>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium leading-none">
                  Everything you need to learn.
                </p>
              </div>
            </button>

            {/* Quick Category Switcher Pill */}
            <button
              onClick={onOpenCategorySwitcher}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-semibold border shadow-xs transition-all hover:scale-105 ${catInfo.color}`}
              title="Switch education level"
            >
              <span>{catInfo.badge}</span>
              <ChevronDown className="w-3.5 h-3.5 opacity-70" />
            </button>
          </div>

          {/* Search Trigger Bar (Desktop) */}
          <div className="hidden md:flex flex-1 max-w-md mx-6">
            <button
              onClick={onOpenSearch}
              className="w-full flex items-center justify-between px-3.5 py-2 text-sm text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800/80 rounded-full border border-slate-200 dark:border-slate-700 hover:border-brand-400 dark:hover:border-brand-500 transition-colors shadow-inner"
            >
              <div className="flex items-center gap-2.5">
                <Search className="w-4 h-4 text-slate-400" />
                <span>Search notes, subjects, PDFs, papers...</span>
              </div>
              <kbd className="hidden lg:inline-block px-1.5 py-0.5 text-[10px] font-mono font-semibold text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-700">
                Ctrl+K
              </kbd>
            </button>
          </div>

          {/* Action Tools & User Status */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Icon (Mobile) */}
            <button
              onClick={onOpenSearch}
              aria-label="Search"
              className="md:hidden p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Study Streak Badge */}
            <div 
              className="flex items-center gap-1 px-2.5 py-1 bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800/60 rounded-full text-xs font-bold text-amber-700 dark:text-amber-400"
              title={`${profile.streakDays} day study streak! Keep going!`}
            >
              <Flame className="w-4 h-4 text-amber-500 fill-amber-500 animate-pulse" />
              <span>{profile.streakDays}d</span>
            </div>

            {/* Premium Upgrade Button */}
            <button
              onClick={onOpenPremium}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all shadow-sm ${
                profile.isPremium
                  ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 shadow-amber-500/20'
                  : 'bg-brand-50 hover:bg-brand-100 text-brand-700 dark:bg-brand-950/70 dark:text-brand-300 dark:hover:bg-brand-900/80 border border-brand-200 dark:border-brand-800'
              }`}
            >
              <Crown className="w-3.5 h-3.5 fill-current" />
              <span className="hidden sm:inline">{profile.isPremium ? 'Premium Plan' : 'Go Pro'}</span>
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={onToggleDarkMode}
              aria-label="Toggle theme"
              className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
            </button>

            {/* Admin Portal Toggle */}
            <button
              onClick={onOpenAdmin}
              className="hidden lg:flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 transition-colors"
              title="Admin & Content Manager"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-brand-500" />
              <span>Admin</span>
            </button>

            {/* Academic Profile Quick Switcher / Avatar */}
            <button
              onClick={onOpenOnboarding}
              className="flex items-center gap-1.5 p-1 rounded-full hover:ring-2 hover:ring-brand-500/50 transition-all"
              title="Edit Academic Profile"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-brand-600 to-violet-600 text-white font-bold text-xs flex items-center justify-center border-2 border-white dark:border-slate-800 shadow">
                {profile.fullName.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </div>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};

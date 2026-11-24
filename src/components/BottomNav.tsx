import React from 'react';
import { 
  Home, 
  BookOpen, 
  Sparkles, 
  CheckCircle2, 
  User, 
  CalendarClock
} from 'lucide-react';

interface BottomNavProps {
  activeView: string;
  setActiveView: (view: string) => void;
  onOpenPlanner: () => void;
  streakCount: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeView,
  setActiveView,
  onOpenPlanner,
  streakCount
}) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'materials', label: 'Materials', icon: BookOpen },
    { id: 'ai-tutor', label: 'AI Tutor', icon: Sparkles, highlight: true },
    { id: 'practice', label: 'Practice', icon: CheckCircle2 },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 transition-colors shadow-lg pb-safe">
      <div className="max-w-md mx-auto px-4 h-16 flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;

          if (item.highlight) {
            return (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id)}
                className="relative -top-3 flex flex-col items-center group focus:outline-none"
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-transform group-hover:scale-105 active:scale-95 ${
                  isActive 
                    ? 'bg-gradient-to-tr from-brand-600 to-brand-accent text-white ring-4 ring-brand-100 dark:ring-brand-950/80 shadow-brand-500/30'
                    : 'bg-gradient-to-tr from-brand-500 to-indigo-600 text-white shadow-brand-500/20'
                }`}>
                  <Sparkles className="w-5 h-5 animate-pulse" />
                </div>
                <span className={`text-[11px] font-bold mt-1 tracking-tight ${
                  isActive ? 'text-brand-600 dark:text-brand-400' : 'text-slate-600 dark:text-slate-400'
                }`}>
                  {item.label}
                </span>
              </button>
            );
          }

          return (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`flex flex-col items-center justify-center w-14 py-1 rounded-xl transition-all ${
                isActive 
                  ? 'text-brand-600 dark:text-brand-400' 
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110 stroke-[2.4]' : 'stroke-[1.8]'}`} />
                {item.id === 'practice' && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-brand-500 rounded-full" />
                )}
              </div>
              <span className={`text-[11px] mt-1 transition-all ${isActive ? 'font-bold' : 'font-medium'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

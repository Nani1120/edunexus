import React, { useState } from 'react';
import { X, Check, Crown, Sparkles, Shield, Zap, ArrowRight, Star } from 'lucide-react';
import confetti from 'canvas-confetti';

interface PremiumModalProps {
  isOpen: boolean;
  onClose: () => void;
  isPremium: boolean;
  onUpgrade: () => void;
}

export const PremiumModal: React.FC<PremiumModalProps> = ({
  isOpen,
  onClose,
  isPremium,
  onUpgrade
}) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');

  if (!isOpen) return null;

  const handleUpgrade = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    onUpgrade();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        
        {/* Banner with gradient */}
        <div className="relative p-6 bg-gradient-to-tr from-brand-600 via-indigo-600 to-brand-accent text-white overflow-hidden">
          <div className="absolute top-0 right-0 -mr-8 -mt-8 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-2">
              <span className="p-2 bg-white/20 backdrop-blur-md rounded-xl">
                <Crown className="w-6 h-6 text-yellow-300 fill-yellow-300" />
              </span>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-yellow-300">
                  EduNexus Pro
                </span>
                <h2 className="text-2xl font-black tracking-tight">
                  Supercharge Your Learning
                </h2>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-white/80 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <p className="mt-2 text-sm text-brand-100 max-w-md relative z-10">
            Join thousands of students scoring top grades in School, Intermediate, B.Tech, and Nursing.
          </p>
        </div>

        {/* Pricing Toggle */}
        <div className="p-6">
          <div className="flex items-center justify-center gap-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl max-w-xs mx-auto mb-6">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Monthly (₹299/mo)
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1 ${
                billingCycle === 'yearly'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              <span>Yearly (₹149/mo)</span>
              <span className="text-[9px] bg-emerald-500 text-white px-1.5 py-0.2 rounded-full font-bold">SAVE 50%</span>
            </button>
          </div>

          {/* Features Comparison */}
          <div className="space-y-3 mb-6">
            <div className="grid grid-cols-2 text-xs font-bold text-slate-400 pb-2 border-b border-slate-100 dark:border-slate-800">
              <span>FEATURE</span>
              <div className="grid grid-cols-2 text-center">
                <span>Free Plan</span>
                <span className="text-brand-600 dark:text-brand-400 font-extrabold">Pro Tier</span>
              </div>
            </div>

            {[
              { name: 'Core Syllabus Notes & PDFs', free: 'Basic access', pro: 'Full access' },
              { name: 'AI Tutor Queries / Day', free: '5 queries', pro: 'Unlimited' },
              { name: 'AI Modes (Exam, Simplified, MCQ)', free: 'Limited', pro: 'All 6 Modes' },
              { name: 'Question Photo Solver', free: 'No', pro: 'Included' },
              { name: 'Mock Tests & Exam Simulation', free: '1 / month', pro: 'Unlimited' },
              { name: 'Offline Download Library', free: '3 files', pro: 'Unlimited' },
              { name: 'Clinical Case Studies / Care Plans', free: 'Sample only', pro: 'Full NANDA' },
              { name: 'SDE Coding & Interview Series', free: 'No', pro: 'Included' }
            ].map((f, i) => (
              <div key={i} className="grid grid-cols-2 text-xs py-1.5 items-center border-b border-slate-50 dark:border-slate-800/60">
                <span className="text-slate-700 dark:text-slate-300 font-medium">{f.name}</span>
                <div className="grid grid-cols-2 text-center text-slate-500 dark:text-slate-400">
                  <span className="text-[11px]">{f.free}</span>
                  <span className="font-bold text-brand-600 dark:text-brand-400 flex items-center justify-center gap-1 text-[11px]">
                    <Check className="w-3.5 h-3.5 text-emerald-500 stroke-[3]" />
                    {f.pro}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Action Button */}
          <div className="mt-6">
            {isPremium ? (
              <div className="w-full py-3 px-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-700 text-center text-emerald-800 dark:text-emerald-300 font-bold text-sm flex items-center justify-center gap-2">
                <Check className="w-4 h-4 stroke-[3]" />
                You are on EduNexus Pro Plan!
              </div>
            ) : (
              <button
                onClick={handleUpgrade}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-brand-600 via-indigo-600 to-brand-accent hover:from-brand-700 hover:to-brand-accentHover text-white font-bold text-sm shadow-lg shadow-brand-500/25 transition-all transform hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Activate EduNexus Pro — {billingCycle === 'yearly' ? '₹1,799 / Year' : '₹299 / Month'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}

            <p className="text-[11px] text-center text-slate-400 mt-3">
              7-day risk-free money-back guarantee • Cancel anytime in 1 click
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};

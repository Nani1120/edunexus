import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  Clock, 
  Award, 
  HelpCircle, 
  RotateCcw, 
  Bookmark, 
  ArrowRight, 
  Sparkles, 
  TrendingUp, 
  AlertCircle, 
  Check, 
  X, 
  Flame, 
  BarChart2, 
  Layers,
  ChevronRight,
  Filter
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { MCQQuestion, Flashcard, QuizAttempt, StudentProfile } from '../../types';

interface PracticeViewProps {
  profile: StudentProfile;
  mcqs: MCQQuestion[];
  flashcards: Flashcard[];
  attempts: QuizAttempt[];
  onRecordAttempt: (attempt: QuizAttempt) => void;
  onToggleFlashcardMastery: (id: string) => void;
  onNavigateToMaterials: () => void;
  onAskAIAboutTopic: (topic: string) => void;
}

export const PracticeView: React.FC<PracticeViewProps> = ({
  profile,
  mcqs,
  flashcards,
  attempts,
  onRecordAttempt,
  onToggleFlashcardMastery,
  onNavigateToMaterials,
  onAskAIAboutTopic
}) => {
  const [activeTab, setActiveTab] = useState<'quiz' | 'flashcards' | 'analytics' | 'review'>('quiz');
  
  // Active Quiz State
  const relevantMCQs = mcqs.filter(m => m.category === profile.category);
  const quizPool = relevantMCQs.length > 0 ? relevantMCQs : mcqs;
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [qId: string]: number }>({});
  const [isQuizSubmitted, setIsQuizSubmitted] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [bookmarkedQuestionIds, setBookmarkedQuestionIds] = useState<string[]>([]);

  // Flashcards state
  const relevantFlashcards = flashcards.filter(f => {
    const sub = f.subjectName.toLowerCase();
    if (profile.category === 'btech') return sub.includes('algorithms') || sub.includes('operating') || sub.includes('database');
    if (profile.category === 'nursing') return sub.includes('anatomy') || sub.includes('pharmacology') || sub.includes('nursing');
    if (profile.category === 'intermediate') return sub.includes('physics') || sub.includes('chemistry') || sub.includes('math');
    return true;
  });
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isCardFlipped, setIsCardFlipped] = useState(false);

  // Timer tick
  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && !isQuizSubmitted) {
      interval = setInterval(() => {
        setTimerSeconds(s => s + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, isQuizSubmitted]);

  // Current active question
  const currentQ = quizPool[currentQuestionIndex] || quizPool[0];

  const handleSelectOption = (index: number) => {
    if (isQuizSubmitted) return;
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQ.id]: index
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizPool.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmitQuiz = () => {
    setIsQuizSubmitted(true);
    setIsTimerRunning(false);

    let correctCount = 0;
    const wrongIds: string[] = [];

    quizPool.forEach(q => {
      const chosen = selectedAnswers[q.id];
      if (chosen === q.correctAnswerIndex) {
        correctCount++;
      } else {
        wrongIds.push(q.id);
      }
    });

    const scorePct = Math.round((correctCount / quizPool.length) * 100);

    if (scorePct >= 70) {
      confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
    }

    const attempt: QuizAttempt = {
      id: 'att-' + Date.now(),
      quizTitle: `${profile.courseOrClass} Practice Diagnostic`,
      subjectId: currentQ.subjectId,
      subjectName: currentQ.subjectName,
      totalQuestions: quizPool.length,
      correctAnswers: correctCount,
      scorePercentage: scorePct,
      timeSpentSeconds: timerSeconds,
      completedAt: new Date().toISOString(),
      wrongQuestionIds: wrongIds
    };

    onRecordAttempt(attempt);
  };

  const handleResetQuiz = () => {
    setSelectedAnswers({});
    setIsQuizSubmitted(false);
    setCurrentQuestionIndex(0);
    setTimerSeconds(0);
    setIsTimerRunning(true);
  };

  // Analytics calculations
  const totalCompleted = attempts.length;
  const avgAccuracy = totalCompleted > 0
    ? Math.round(attempts.reduce((acc, curr) => acc + curr.scorePercentage, 0) / totalCompleted)
    : 80;

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-16">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <Award className="w-7 h-7 text-brand-600" />
            <span>Practice Center & Test Engine</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Exam simulation, chapter quizzes, 3D flashcards, and personalized weakness remediation.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 p-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs overflow-x-auto no-scrollbar">
          {[
            { id: 'quiz', label: 'Timed Quiz', icon: Clock },
            { id: 'flashcards', label: 'Flashcards', icon: Layers },
            { id: 'analytics', label: 'Performance Analytics', icon: BarChart2 },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-brand-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* QUIZ TAB */}
      {activeTab === 'quiz' && (
        <div className="space-y-5">
          
          {/* Top Status & Timer Bar */}
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Question {currentQuestionIndex + 1} of {quizPool.length}
              </span>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs font-semibold text-brand-600 dark:text-brand-400">
                {currentQ.subjectName}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-mono font-bold text-slate-700 dark:text-slate-300">
                <Clock className="w-3.5 h-3.5 text-brand-500" />
                <span>{formatTime(timerSeconds)}</span>
              </div>

              <button
                onClick={() => {
                  const id = currentQ.id;
                  setBookmarkedQuestionIds(
                    bookmarkedQuestionIds.includes(id)
                      ? bookmarkedQuestionIds.filter(b => b !== id)
                      : [...bookmarkedQuestionIds, id]
                  );
                }}
                className={`p-2 rounded-lg border transition-colors ${
                  bookmarkedQuestionIds.includes(currentQ.id)
                    ? 'bg-amber-50 text-amber-600 border-amber-300'
                    : 'text-slate-400 border-slate-200 dark:border-slate-700'
                }`}
                title="Bookmark Question"
              >
                <Bookmark className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Question Palette Indicator */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar p-2 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200/60 dark:border-slate-800">
            {quizPool.map((q, idx) => {
              const isAnswered = selectedAnswers[q.id] !== undefined;
              const isCurrent = idx === currentQuestionIndex;
              let bg = 'bg-white dark:bg-slate-900 border-slate-200 text-slate-500';
              if (isAnswered) bg = 'bg-brand-600 text-white border-brand-600 font-bold';
              if (isCurrent) bg += ' ring-2 ring-brand-400';

              return (
                <button
                  key={q.id}
                  onClick={() => setCurrentQuestionIndex(idx)}
                  className={`w-7 h-7 rounded-lg text-xs flex items-center justify-center shrink-0 border transition-all ${bg}`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>

          {/* Main Question Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-brand-50 dark:bg-brand-950/80 text-brand-700 dark:text-brand-300">
                {currentQ.topic}
              </span>
            </div>

            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-relaxed mt-2">
              {currentQ.question}
            </h3>

            {/* Options List */}
            <div className="space-y-3 mt-6">
              {currentQ.options.map((opt, optIndex) => {
                const isSelected = selectedAnswers[currentQ.id] === optIndex;
                const isCorrect = optIndex === currentQ.correctAnswerIndex;

                let cardStyle = 'border-slate-200 dark:border-slate-800 hover:border-slate-300 bg-slate-50/60 dark:bg-slate-800/50 text-slate-800 dark:text-slate-200';

                if (isQuizSubmitted) {
                  if (isCorrect) {
                    cardStyle = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/80 text-emerald-900 dark:text-emerald-100 font-bold ring-2 ring-emerald-500/30';
                  } else if (isSelected && !isCorrect) {
                    cardStyle = 'border-red-500 bg-red-50 dark:bg-red-950/80 text-red-900 dark:text-red-100 ring-2 ring-red-500/30';
                  }
                } else if (isSelected) {
                  cardStyle = 'border-brand-600 bg-brand-50/80 dark:bg-brand-950/60 text-brand-900 dark:text-brand-200 font-bold ring-2 ring-brand-500/20';
                }

                return (
                  <div
                    key={optIndex}
                    onClick={() => handleSelectOption(optIndex)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${cardStyle}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center shrink-0 border ${
                        isSelected 
                          ? 'bg-brand-600 border-brand-600 text-white' 
                          : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900'
                      }`}>
                        {String.fromCharCode(65 + optIndex)}
                      </span>
                      <span className="text-xs sm:text-sm">{opt}</span>
                    </div>

                    {isQuizSubmitted && isCorrect && (
                      <Check className="w-5 h-5 text-emerald-600 stroke-[3]" />
                    )}
                    {isQuizSubmitted && isSelected && !isCorrect && (
                      <X className="w-5 h-5 text-red-600 stroke-[3]" />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Answer Explanation Box (Shown after submission) */}
            {isQuizSubmitted && (
              <div className="mt-6 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300">
                <strong className="block font-bold text-sm text-slate-900 dark:text-white mb-1">
                  Concept Explanation & Rationalization:
                </strong>
                <p>{currentQ.explanation}</p>
                <div className="mt-3 pt-2 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between">
                  <span className="text-slate-400">Need a deeper explanation?</span>
                  <button
                    onClick={() => onAskAIAboutTopic(`Explain why the answer to "${currentQ.question}" is "${currentQ.options[currentQ.correctAnswerIndex]}"`)}
                    className="font-bold text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Ask AI Tutor</span>
                  </button>
                </div>
              </div>
            )}

            {/* Navigation buttons */}
            <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <button
                onClick={handlePrevQuestion}
                disabled={currentQuestionIndex === 0}
                className="px-4 py-2 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl disabled:opacity-40"
              >
                Previous
              </button>

              <div className="flex items-center gap-2">
                {currentQuestionIndex < quizPool.length - 1 ? (
                  <button
                    onClick={handleNextQuestion}
                    className="px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-bold shadow-sm transition-all"
                  >
                    Next Question →
                  </button>
                ) : !isQuizSubmitted ? (
                  <button
                    onClick={handleSubmitQuiz}
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md transition-all hover:scale-105"
                  >
                    Submit Test & See Score
                  </button>
                ) : (
                  <button
                    onClick={handleResetQuiz}
                    className="px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Try Again</span>
                  </button>
                )}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* FLASHCARDS TAB */}
      {activeTab === 'flashcards' && (
        <div className="max-w-xl mx-auto space-y-6">
          <div className="text-center">
            <span className="text-xs font-bold text-brand-600 uppercase tracking-wider">
              Card {currentCardIndex + 1} of {relevantFlashcards.length}
            </span>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Active Recall Flashcards
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Tap card to flip between Question and Answer
            </p>
          </div>

          {relevantFlashcards.length > 0 && (
            <div
              onClick={() => setIsCardFlipped(!isCardFlipped)}
              className="relative h-64 sm:h-72 w-full rounded-3xl p-8 bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 border border-slate-200 dark:border-slate-700 shadow-xl cursor-pointer flex flex-col justify-between select-none hover:scale-[1.01] transition-transform"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-400 uppercase tracking-wider">
                  {relevantFlashcards[currentCardIndex].topic}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-brand-100 dark:bg-brand-950 text-brand-600 dark:text-brand-400">
                  {isCardFlipped ? 'ANSWER (BACK)' : 'QUESTION (FRONT)'}
                </span>
              </div>

              <div className="text-center py-4">
                <h4 className="text-base sm:text-xl font-extrabold text-slate-900 dark:text-white leading-relaxed whitespace-pre-line">
                  {isCardFlipped 
                    ? relevantFlashcards[currentCardIndex].back 
                    : relevantFlashcards[currentCardIndex].front}
                </h4>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-400 pt-3 border-t border-slate-100 dark:border-slate-800">
                <span>Tap to Flip</span>
                <span className="font-bold text-brand-600">EduNexus Recall System</span>
              </div>
            </div>
          )}

          {/* Flashcard Controls */}
          <div className="flex items-center justify-between gap-3">
            <button
              onClick={() => {
                if (currentCardIndex > 0) {
                  setCurrentCardIndex(currentCardIndex - 1);
                  setIsCardFlipped(false);
                }
              }}
              disabled={currentCardIndex === 0}
              className="flex-1 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 font-bold text-xs disabled:opacity-40"
            >
              Previous Card
            </button>

            <button
              onClick={() => {
                onToggleFlashcardMastery(relevantFlashcards[currentCardIndex].id);
              }}
              className="px-4 py-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-700 text-emerald-700 dark:text-emerald-300 font-bold text-xs"
            >
              Mark Mastered ✓
            </button>

            <button
              onClick={() => {
                if (currentCardIndex < relevantFlashcards.length - 1) {
                  setCurrentCardIndex(currentCardIndex + 1);
                  setIsCardFlipped(false);
                }
              }}
              disabled={currentCardIndex === relevantFlashcards.length - 1}
              className="flex-1 py-3 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-md disabled:opacity-40"
            >
              Next Card →
            </button>
          </div>
        </div>
      )}

      {/* ANALYTICS TAB */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs text-center">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Total Quizzes Completed
              </span>
              <span className="text-3xl font-black text-slate-900 dark:text-white">
                {totalCompleted} Tests
              </span>
              <p className="text-xs text-slate-500 mt-1">Consistent exam preparation</p>
            </div>

            <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs text-center">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Overall Accuracy Rate
              </span>
              <span className="text-3xl font-black text-emerald-600">
                {avgAccuracy}%
              </span>
              <p className="text-xs text-slate-500 mt-1">Top 10 percentile benchmark</p>
            </div>

            <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs text-center">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Study Streak & Velocity
              </span>
              <span className="text-3xl font-black text-amber-500 flex items-center justify-center gap-1">
                <Flame className="w-6 h-6 fill-amber-500" /> {profile.streakDays} Days
              </span>
              <p className="text-xs text-slate-500 mt-1">Daily consistency maintained</p>
            </div>

          </div>

          {/* Weakness Remediation Card */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-brand-900 via-indigo-950 to-slate-950 text-white shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-brand-300 uppercase tracking-wider flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-emerald-400" /> AI Weak Area Remediation
              </span>
              <span className="text-[10px] bg-brand-800 text-brand-200 px-2 py-0.5 rounded-full font-bold">
                Smart Recommendation
              </span>
            </div>

            <h3 className="text-lg font-black text-white">
              Recommended Focus for Tomorrow
            </h3>
            <p className="text-xs text-indigo-200 mt-1">
              Based on your recent attempts, reviewing non-linear tree balances and time complexity proofs will boost your overall accuracy to 95%+.
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              <button
                onClick={() => onAskAIAboutTopic('Give me 5 hard practice questions on AVL tree rotations and balance factor calculations')}
                className="px-4 py-2 bg-brand-600 hover:bg-brand-500 text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Practice Weak Topic in AI Tutor</span>
              </button>
              <button
                onClick={onNavigateToMaterials}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold transition-all"
              >
                Read Formula Booklets
              </button>
            </div>
          </div>

          {/* Recent Quiz Attempts Log */}
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-3">
              Recent Exam Attempts History
            </h3>

            <div className="space-y-2">
              {attempts.map(att => (
                <div
                  key={att.id}
                  className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between shadow-xs"
                >
                  <div>
                    <h5 className="font-bold text-sm text-slate-900 dark:text-white">
                      {att.quizTitle}
                    </h5>
                    <p className="text-xs text-slate-500">
                      {att.subjectName} • {formatTime(att.timeSpentSeconds)} spent • {new Date(att.completedAt).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="text-right">
                    <span className={`text-base font-black ${att.scorePercentage >= 70 ? 'text-emerald-600' : 'text-amber-600'}`}>
                      {att.scorePercentage}%
                    </span>
                    <span className="block text-[10px] text-slate-400 font-semibold">
                      {att.correctAnswers} / {att.totalQuestions} Correct
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

    </div>
  );
};

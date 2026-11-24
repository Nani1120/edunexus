import React, { useState } from 'react';
import { 
  CalendarClock, 
  Plus, 
  CheckCircle2, 
  Circle, 
  Clock, 
  Sparkles, 
  Trash2, 
  AlertCircle, 
  BookOpen, 
  Target,
  Calendar,
  Layers
} from 'lucide-react';
import { StudyTask, ExamSchedule, StudentProfile } from '../../types';

interface PlannerViewProps {
  profile: StudentProfile;
  tasks: StudyTask[];
  exams: ExamSchedule[];
  onToggleTask: (id: string) => void;
  onAddTask: (task: StudyTask) => void;
  onDeleteTask: (id: string) => void;
  onAddExam: (exam: ExamSchedule) => void;
  onNavigateToMaterials: () => void;
}

export const PlannerView: React.FC<PlannerViewProps> = ({
  profile,
  tasks,
  exams,
  onToggleTask,
  onAddTask,
  onDeleteTask,
  onAddExam,
  onNavigateToMaterials
}) => {
  const [showAddTask, setShowAddTask] = useState(false);
  const [showAddExam, setShowAddExam] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskSubject, setNewTaskSubject] = useState(profile.selectedSubjects[0] || 'Core Subject');
  const [newTaskMinutes, setNewTaskMinutes] = useState(45);
  const [newTaskPriority, setNewTaskPriority] = useState<'high' | 'medium' | 'low'>('medium');

  const [newExamTitle, setNewExamTitle] = useState('');
  const [newExamSubject, setNewExamSubject] = useState('');
  const [newExamDate, setNewExamDate] = useState('2026-12-20');

  const completedCount = tasks.filter(t => t.isCompleted).length;
  const progressPercent = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    onAddTask({
      id: 'task-' + Date.now(),
      title: newTaskTitle,
      subjectName: newTaskSubject,
      estimatedMinutes: newTaskMinutes,
      deadline: 'Today',
      isCompleted: false,
      priority: newTaskPriority
    });

    setNewTaskTitle('');
    setShowAddTask(false);
  };

  const handleCreateExam = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExamTitle.trim()) return;

    onAddExam({
      id: 'exam-' + Date.now(),
      title: newExamTitle,
      subjectName: newExamSubject || 'Semester Final',
      examDate: newExamDate,
      totalMarks: 100,
      syllabusCoveredPercent: 60
    });

    setNewExamTitle('');
    setShowAddExam(false);
  };

  const handleAutoGeneratePlan = () => {
    const generatedTasks: StudyTask[] = [
      {
        id: 'gen-1',
        title: 'Revise Unit 1 & Unit 2 Core Lecture Notes (35 mins)',
        subjectName: profile.courseOrClass,
        estimatedMinutes: 35,
        deadline: 'Today',
        isCompleted: false,
        priority: 'high'
      },
      {
        id: 'gen-2',
        title: 'Solve 10 Previous Year Question (PYQ) Problems with Model Answers',
        subjectName: profile.courseOrClass,
        estimatedMinutes: 45,
        deadline: 'Tomorrow',
        isCompleted: false,
        priority: 'high'
      },
      {
        id: 'gen-3',
        title: 'Active Recall: Review 15 Topic Flashcards before sleeping',
        subjectName: profile.courseOrClass,
        estimatedMinutes: 20,
        deadline: 'Today',
        isCompleted: false,
        priority: 'medium'
      }
    ];

    generatedTasks.forEach(t => onAddTask(t));
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-16">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <CalendarClock className="w-7 h-7 text-brand-600" />
            <span>Smart Study Planner</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Adaptive schedule generation, exam milestones, and daily focused learning blocks.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleAutoGeneratePlan}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-gradient-to-r from-brand-600 to-brand-accent text-white rounded-xl text-xs font-bold shadow-md hover:scale-105 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Auto-Generate Plan</span>
          </button>
          <button
            onClick={() => setShowAddTask(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl text-xs font-bold shadow-xs hover:opacity-90 transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Task</span>
          </button>
        </div>
      </div>

      {/* Progress & Milestones Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Daily Tasks Progress */}
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Target className="w-4 h-4 text-brand-500" /> Goal Progress
            </span>
            <span className="text-xs font-bold text-brand-600">
              {completedCount} / {tasks.length} Completed
            </span>
          </div>

          <div className="my-3">
            <div className="flex items-baseline justify-between mb-1">
              <span className="text-2xl font-black text-slate-900 dark:text-white">
                {progressPercent}%
              </span>
              <span className="text-xs text-slate-400">Completion Rate</span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
              <div 
                className="bg-gradient-to-r from-brand-600 to-emerald-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          <div className="text-xs text-slate-500 pt-2 border-t border-slate-100 dark:border-slate-800">
            {progressPercent === 100 
              ? '🎉 Outstanding! All study tasks finished for today!' 
              : 'Keep pushing! Daily consistency creates top rankers.'}
          </div>
        </div>

        {/* Exam Milestones Card */}
        <div className="md:col-span-2 p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-indigo-500" /> Target Examination Schedule
            </span>
            <button
              onClick={() => setShowAddExam(true)}
              className="text-xs font-bold text-brand-600 hover:underline"
            >
              + Add Exam
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-2">
            {exams.map(exam => {
              const diff = new Date(exam.examDate).getTime() - new Date().getTime();
              const daysLeft = Math.max(1, Math.ceil(diff / (1000 * 60 * 60 * 24)));
              return (
                <div
                  key={exam.id}
                  className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 flex items-center justify-between"
                >
                  <div>
                    <h5 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white truncate max-w-[180px]">
                      {exam.title}
                    </h5>
                    <p className="text-[10px] text-slate-400">{exam.subjectName} • {exam.examDate}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-extrabold text-brand-600">{daysLeft}d</span>
                    <span className="block text-[9px] text-slate-400 uppercase">Left</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-xs text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-between">
            <span>Schedules synchronized with academic calendar</span>
            <span className="font-semibold text-slate-700 dark:text-slate-300">Target Score: 95%+</span>
          </div>
        </div>

      </div>

      {/* Task Creation Form Drawer */}
      {showAddTask && (
        <form onSubmit={handleCreateTask} className="p-5 rounded-3xl bg-brand-50 dark:bg-brand-950/60 border border-brand-200 dark:border-brand-800 space-y-3 animate-fadeIn">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-sm text-brand-900 dark:text-brand-200">
              Create New Focused Study Task
            </h4>
            <button type="button" onClick={() => setShowAddTask(false)} className="text-xs text-slate-400">Cancel</button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <input
              type="text"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              placeholder="e.g., Revise Deadlock Coffman conditions & Banker's Algo"
              className="sm:col-span-2 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-semibold"
              required
            />
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="15"
                max="180"
                step="15"
                value={newTaskMinutes}
                onChange={(e) => setNewTaskMinutes(Number(e.target.value))}
                className="w-24 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-semibold"
              />
              <span className="text-xs font-semibold text-slate-500">Mins</span>
              <button
                type="submit"
                className="flex-1 py-2.5 bg-brand-600 text-white rounded-xl text-xs font-bold shadow-md"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Add Exam Drawer */}
      {showAddExam && (
        <form onSubmit={handleCreateExam} className="p-5 rounded-3xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 space-y-3 animate-fadeIn">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-sm text-indigo-900 dark:text-indigo-200">
              Add Academic Examination Milestone
            </h4>
            <button type="button" onClick={() => setShowAddExam(false)} className="text-xs text-slate-400">Cancel</button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <input
              type="text"
              value={newExamTitle}
              onChange={(e) => setNewExamTitle(e.target.value)}
              placeholder="Exam Name (e.g. End Semester Exam Set-A)"
              className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-semibold"
              required
            />
            <input
              type="date"
              value={newExamDate}
              onChange={(e) => setNewExamDate(e.target.value)}
              className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-semibold"
              required
            />
            <button
              type="submit"
              className="py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-bold shadow-md"
            >
              Add Exam Milestone
            </button>
          </div>
        </form>
      )}

      {/* Study Tasks Checklist */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
            <span>Today's Study Action Checklist ({tasks.length})</span>
          </h3>
          <span className="text-xs text-slate-400">Tap circle to toggle completion</span>
        </div>

        <div className="space-y-2">
          {tasks.map((task) => (
            <div
              key={task.id}
              className={`p-4 rounded-2xl border transition-all flex items-center justify-between gap-3 shadow-xs ${
                task.isCompleted
                  ? 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 opacity-60'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-brand-400'
              }`}
            >
              <div 
                className="flex items-center gap-3.5 flex-1 cursor-pointer"
                onClick={() => onToggleTask(task.id)}
              >
                <button
                  type="button"
                  className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                    task.isCompleted
                      ? 'bg-emerald-500 text-white'
                      : 'border-2 border-slate-300 dark:border-slate-700 hover:border-brand-500'
                  }`}
                >
                  {task.isCompleted && <CheckCircle2 className="w-4 h-4 stroke-[3]" />}
                </button>

                <div>
                  <h4 className={`text-xs sm:text-sm font-bold text-slate-900 dark:text-white ${
                    task.isCompleted ? 'line-through text-slate-400 dark:text-slate-500' : ''
                  }`}>
                    {task.title}
                  </h4>
                  <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-0.5">
                    <span className="font-semibold text-brand-600">{task.subjectName}</span>
                    <span>•</span>
                    <span className="flex items-center gap-0.5"><Clock className="w-3 h-3" /> {task.estimatedMinutes} mins</span>
                    <span>•</span>
                    <span className={`font-bold uppercase ${
                      task.priority === 'high' ? 'text-red-500' : 'text-slate-400'
                    }`}>
                      {task.priority} Priority
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => onDeleteTask(task.id)}
                className="p-1.5 text-slate-400 hover:text-red-500 transition-colors"
                title="Delete task"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Upload, 
  Plus, 
  BookOpen, 
  HelpCircle, 
  AlertTriangle, 
  CheckCircle2, 
  Trash2, 
  Edit, 
  Users, 
  BarChart2, 
  FileText, 
  X, 
  Check, 
  Layers,
  ArrowLeft
} from 'lucide-react';
import { StudyMaterial, Subject, MCQQuestion, UserReport, UserRole, EducationCategory, MaterialType, PreferredLanguage } from '../../types';

interface AdminPortalProps {
  currentRole: UserRole;
  onChangeRole: (role: UserRole) => void;
  materials: StudyMaterial[];
  subjects: Subject[];
  reports: UserReport[];
  onAddMaterial: (mat: StudyMaterial) => void;
  onUpdateMaterialStatus: (id: string, status: StudyMaterial['verificationStatus']) => void;
  onDeleteMaterial: (id: string) => void;
  onUpdateReportStatus: (id: string, status: UserReport['status']) => void;
  onAddSubject: (sub: Subject) => void;
  onAddMCQ: (mcq: MCQQuestion) => void;
  onBackToApp: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({
  currentRole,
  onChangeRole,
  materials,
  subjects,
  reports,
  onAddMaterial,
  onUpdateMaterialStatus,
  onDeleteMaterial,
  onUpdateReportStatus,
  onAddSubject,
  onAddMCQ,
  onBackToApp
}) => {
  const [activeTab, setActiveTab] = useState<'materials' | 'upload' | 'reports' | 'subjects' | 'mcqs' | 'analytics'>('materials');

  // New Material form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<EducationCategory>('btech');
  const [boardOrUniversity, setBoardOrUniversity] = useState('JNTU / State Univ');
  const [course, setCourse] = useState('B.Tech 3rd Year');
  const [subjectId, setSubjectId] = useState(subjects[0]?.id || '');
  const [materialType, setMaterialType] = useState<MaterialType>('pdf_notes');
  const [contentBody, setContentBody] = useState('');
  const [author, setAuthor] = useState('Faculty Academic Council');
  const [readTime, setReadTime] = useState(20);
  const [pageCount, setPageCount] = useState(15);
  const [isPremiumOnly, setIsPremiumOnly] = useState(false);
  const [tagsInput, setTagsInput] = useState('ExamNotes, CoreSyllabus');

  // New MCQ form state
  const [mcqTopic, setMcqTopic] = useState('');
  const [mcqQuestion, setMcqQuestion] = useState('');
  const [opt0, setOpt0] = useState('');
  const [opt1, setOpt1] = useState('');
  const [opt2, setOpt2] = useState('');
  const [opt3, setOpt3] = useState('');
  const [mcqCorrectIndex, setMcqCorrectIndex] = useState(0);
  const [mcqExplanation, setMcqExplanation] = useState('');

  // Handle material creation
  const handleCreateMaterial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const matchedSubject = subjects.find(s => s.id === subjectId) || subjects[0];

    const newMaterial: StudyMaterial = {
      id: 'mat-' + Date.now(),
      title,
      description,
      category,
      boardOrUniversity,
      course,
      subjectId: matchedSubject ? matchedSubject.id : 'sub-gen',
      subjectName: matchedSubject ? matchedSubject.name : 'General Studies',
      materialType,
      language: 'en',
      contentBody,
      readTimeMinutes: readTime,
      pageCount,
      uploadDate: new Date().toISOString().split('T')[0],
      tags: tagsInput.split(',').map(t => t.trim()),
      authorOrSource: author,
      verificationStatus: 'verified',
      isPremiumOnly,
      viewsCount: 1,
      downloadsCount: 0,
      bookmarksCount: 0
    };

    onAddMaterial(newMaterial);
    alert('Material successfully published to verified library!');
    setTitle('');
    setDescription('');
    setContentBody('');
    setActiveTab('materials');
  };

  // Handle MCQ creation
  const handleCreateMCQ = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mcqQuestion.trim()) return;

    const matchedSubject = subjects.find(s => s.id === subjectId) || subjects[0];

    const newMCQ: MCQQuestion = {
      id: 'mcq-' + Date.now(),
      subjectId: matchedSubject ? matchedSubject.id : 'sub-gen',
      subjectName: matchedSubject ? matchedSubject.name : 'General',
      topic: mcqTopic || 'General Chapter Test',
      category,
      question: mcqQuestion,
      options: [opt0 || 'Option A', opt1 || 'Option B', opt2 || 'Option C', opt3 || 'Option D'],
      correctAnswerIndex: mcqCorrectIndex,
      explanation: mcqExplanation || 'Standard verified textbook rationale.',
      difficulty: 'medium'
    };

    onAddMCQ(newMCQ);
    alert('Question added to test bank!');
    setMcqQuestion('');
    setOpt0('');
    setOpt1('');
    setOpt2('');
    setOpt3('');
    setMcqExplanation('');
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-16">
      
      {/* Admin Top Navigation & Role Switcher */}
      <div className="p-6 rounded-3xl bg-slate-900 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-brand-500 rounded-lg text-white">
              <ShieldCheck className="w-5 h-5" />
            </span>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight">
              EduNexus Staff & Admin Console
            </h1>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-brand-900 text-brand-300 border border-brand-700">
              RBAC Protected
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Course curriculum governance, material verification, moderation queue, and user roles.
          </p>
        </div>

        {/* Role Switcher Pill Bar for Demo */}
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-slate-800 rounded-xl p-1 text-xs">
            <span className="text-[10px] font-bold text-slate-400 uppercase px-2">Role:</span>
            {(['student', 'content_editor', 'moderator', 'admin'] as UserRole[]).map((r) => (
              <button
                key={r}
                onClick={() => onChangeRole(r)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold capitalize transition-all ${
                  currentRole === r
                    ? 'bg-brand-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {r.replace('_', ' ')}
              </button>
            ))}
          </div>

          <button
            onClick={onBackToApp}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Student App</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 p-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs overflow-x-auto no-scrollbar">
        {[
          { id: 'materials', label: `Materials (${materials.length})`, icon: FileText },
          { id: 'upload', label: 'Upload / Publish', icon: Upload },
          { id: 'reports', label: `Report Queue (${reports.length})`, icon: AlertTriangle },
          { id: 'mcqs', label: 'Create MCQs', icon: HelpCircle },
          { id: 'analytics', label: 'Platform Analytics', icon: BarChart2 },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
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

      {/* TAB 1: MATERIALS MANAGEMENT */}
      {activeTab === 'materials' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Curriculum Study Materials Library ({materials.length})
            </h3>
            <button
              onClick={() => setActiveTab('upload')}
              className="px-3.5 py-1.5 bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold rounded-xl flex items-center gap-1 shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Publish New Material</span>
            </button>
          </div>

          <div className="space-y-2">
            {materials.map((mat) => (
              <div
                key={mat.id}
                className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-brand-300">
                      {mat.category.toUpperCase()} • {mat.materialType.replace('_', ' ')}
                    </span>
                    <span className="text-xs font-semibold text-slate-500">
                      {mat.subjectName}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      mat.verificationStatus === 'verified' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {mat.verificationStatus}
                    </span>
                  </div>

                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                    {mat.title}
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Author: {mat.authorOrSource} • Uploaded: {mat.uploadDate} • {mat.viewsCount} Views • {mat.downloadsCount} Downloads
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {mat.verificationStatus !== 'verified' && (
                    <button
                      onClick={() => onUpdateMaterialStatus(mat.id, 'verified')}
                      className="px-3 py-1 bg-emerald-600 text-white rounded-lg text-xs font-bold"
                    >
                      Approve
                    </button>
                  )}
                  <button
                    onClick={() => onDeleteMaterial(mat.id)}
                    className="p-2 text-slate-400 hover:text-red-500 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                    title="Delete Material"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: UPLOAD MATERIAL */}
      {activeTab === 'upload' && (
        <form onSubmit={handleCreateMaterial} className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Publish New Academic Study Material
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Material will be immediately indexed in full-text search and delivered to matching students.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Document Title (Required)
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Unit 4: Microprocessors 8086 Architecture & Timing Diagrams"
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Education Level
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as EducationCategory)}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold"
              >
                <option value="btech">B.Tech Engineering</option>
                <option value="nursing">Nursing Education</option>
                <option value="intermediate">Intermediate (11-12)</option>
                <option value="school">School (Classes 1-10)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Subject
              </label>
              <select
                value={subjectId}
                onChange={(e) => setSubjectId(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold"
              >
                {subjects.map(s => (
                  <option key={s.id} value={s.id}>{s.name} ({s.category.toUpperCase()})</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Resource Type
              </label>
              <select
                value={materialType}
                onChange={(e) => setMaterialType(e.target.value as MaterialType)}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold"
              >
                <option value="pdf_notes">Lecture Notes (PDF)</option>
                <option value="pyq">Previous Question Paper (PYQ)</option>
                <option value="formula_sheet">Formula & Derivations</option>
                <option value="care_plan">Nursing Care Plan</option>
                <option value="drug_study">Drug Study</option>
                <option value="clinical_case">Clinical Case Study</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Author / Faculty
              </label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Short Description / Summary
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief summary of topics covered, unit scope, and target examination relevance..."
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Full Document Text / Markdown Content
            </label>
            <textarea
              value={contentBody}
              onChange={(e) => setContentBody(e.target.value)}
              placeholder="Paste lecture notes or chapter contents here with Markdown and formulas..."
              rows={8}
              className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono text-xs"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
              <input
                type="checkbox"
                checked={isPremiumOnly}
                onChange={(e) => setIsPremiumOnly(e.target.checked)}
                className="w-4 h-4 accent-brand-600 rounded"
              />
              <span>Mark as EduNexus Pro Tier Exclusive</span>
            </label>

            <button
              type="submit"
              className="px-6 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-bold shadow-md transition-all hover:scale-105"
            >
              Publish to EduNexus Library
            </button>
          </div>
        </form>
      )}

      {/* TAB 3: USER REPORTS MODERATION */}
      {activeTab === 'reports' && (
        <div className="space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            User Quality & Inaccuracy Reports Queue ({reports.length})
          </h3>

          <div className="space-y-3">
            {reports.map((rep) => (
              <div
                key={rep.id}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row sm:items-start justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-red-100 text-red-800">
                      {rep.reason.replace('_', ' ')}
                    </span>
                    <span className="text-xs text-slate-400">
                      Reported by {rep.reportedBy} • {new Date(rep.reportedAt).toLocaleDateString()}
                    </span>
                  </div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                    {rep.materialTitle}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700">
                    "{rep.details}"
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {rep.status === 'pending' ? (
                    <>
                      <button
                        onClick={() => onUpdateReportStatus(rep.id, 'resolved')}
                        className="px-3 py-1.5 bg-emerald-600 text-white rounded-lg text-xs font-bold"
                      >
                        Resolve & Fix
                      </button>
                      <button
                        onClick={() => onUpdateReportStatus(rep.id, 'dismissed')}
                        className="px-3 py-1.5 bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold"
                      >
                        Dismiss
                      </button>
                    </>
                  ) : (
                    <span className="text-xs font-bold text-emerald-600 capitalize">
                      ✓ {rep.status}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: CREATE MCQS */}
      {activeTab === 'mcqs' && (
        <form onSubmit={handleCreateMCQ} className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Add New MCQ to Question Bank
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Topic</label>
              <input
                type="text"
                value={mcqTopic}
                onChange={(e) => setMcqTopic(e.target.value)}
                placeholder="e.g. Tree Traversals"
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Subject</label>
              <select
                value={subjectId}
                onChange={(e) => setSubjectId(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold"
              >
                {subjects.map(s => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Question Statement</label>
            <textarea
              value={mcqQuestion}
              onChange={(e) => setMcqQuestion(e.target.value)}
              placeholder="Enter question text..."
              rows={2}
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { val: opt0, set: setOpt0, idx: 0, label: 'Option A' },
              { val: opt1, set: setOpt1, idx: 1, label: 'Option B' },
              { val: opt2, set: setOpt2, idx: 2, label: 'Option C' },
              { val: opt3, set: setOpt3, idx: 3, label: 'Option D' },
            ].map(o => (
              <div key={o.idx} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="correctAnswer"
                  checked={mcqCorrectIndex === o.idx}
                  onChange={() => setMcqCorrectIndex(o.idx)}
                  className="accent-brand-600"
                />
                <input
                  type="text"
                  value={o.val}
                  onChange={(e) => o.set(e.target.value)}
                  placeholder={o.label}
                  className="flex-1 p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs"
                  required
                />
              </div>
            ))}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Explanation & Rationale</label>
            <textarea
              value={mcqExplanation}
              onChange={(e) => setMcqExplanation(e.target.value)}
              placeholder="Detailed explanation displayed to students after testing..."
              rows={2}
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs"
            />
          </div>

          <button
            type="submit"
            className="px-6 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-bold shadow-md"
          >
            Add MCQ to Test Bank
          </button>
        </form>
      )}

      {/* TAB 5: ANALYTICS */}
      {activeTab === 'analytics' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs text-center">
              <span className="text-2xl font-black text-brand-600">{materials.length}</span>
              <p className="text-xs text-slate-400 font-bold mt-1">Total Materials</p>
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs text-center">
              <span className="text-2xl font-black text-emerald-600">4,820</span>
              <p className="text-xs text-slate-400 font-bold mt-1">Active Students</p>
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs text-center">
              <span className="text-2xl font-black text-indigo-600">18,420</span>
              <p className="text-xs text-slate-400 font-bold mt-1">Tests Attempted</p>
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs text-center">
              <span className="text-2xl font-black text-amber-500">99.4%</span>
              <p className="text-xs text-slate-400 font-bold mt-1">Verified Accuracy</p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

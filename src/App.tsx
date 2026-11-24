import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { BottomNav } from './components/BottomNav';
import { HomeView } from './components/views/HomeView';
import { MaterialsView } from './components/views/MaterialsView';
import { AITutorView } from './components/views/AITutorView';
import { PracticeView } from './components/views/PracticeView';
import { ProfileView } from './components/views/ProfileView';
import { PlannerView } from './components/views/PlannerView';
import { AdminPortal } from './components/views/AdminPortal';
import { NursingHub } from './components/hubs/NursingHub';
import { BTechHub } from './components/hubs/BTechHub';
import { IntermediateHub } from './components/hubs/IntermediateHub';
import { SchoolHub } from './components/hubs/SchoolHub';

import { CategorySwitcherModal } from './components/CategorySwitcherModal';
import { OnboardingModal } from './components/OnboardingModal';
import { DocumentViewerModal } from './components/DocumentViewerModal';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { PremiumModal } from './components/PremiumModal';
import { ReportModal } from './components/ReportModal';

import { storageService } from './services/storage';
import { 
  StudentProfile, 
  StudyMaterial, 
  Subject, 
  MCQQuestion, 
  Flashcard, 
  StudyTask, 
  ExamSchedule, 
  QuizAttempt, 
  UserReport, 
  AIMessage, 
  EducationCategory, 
  UserRole 
} from './types';

export default function App() {
  // Local state initialized from storageService
  const [profile, setProfile] = useState<StudentProfile>(() => storageService.getProfile());
  const [subjects, setSubjects] = useState<Subject[]>(() => storageService.getSubjects());
  const [materials, setMaterials] = useState<StudyMaterial[]>(() => storageService.getMaterials());
  const [bookmarks, setBookmarks] = useState<string[]>(() => storageService.getBookmarks());
  const [downloads, setDownloads] = useState<string[]>(() => storageService.getDownloads());
  const [mcqs, setMCQs] = useState<MCQQuestion[]>(() => storageService.getMCQs());
  const [attempts, setAttempts] = useState<QuizAttempt[]>(() => storageService.getQuizAttempts());
  const [flashcards, setFlashcards] = useState<Flashcard[]>(() => storageService.getFlashcards());
  const [tasks, setTasks] = useState<StudyTask[]>(() => storageService.getStudyTasks());
  const [exams, setExams] = useState<ExamSchedule[]>(() => storageService.getExamSchedules());
  const [reports, setReports] = useState<UserReport[]>(() => storageService.getUserReports());
  const [aiChats, setAIChats] = useState<AIMessage[]>(() => storageService.getAIChats());

  // App UI State
  const [activeView, setActiveView] = useState<string>('home');
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('edunexus_dark_mode') === 'true';
  });

  // Modals state
  const [isCategorySwitcherOpen, setIsCategorySwitcherOpen] = useState(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isPremiumOpen, setIsPremiumOpen] = useState(false);
  const [selectedMaterialForViewer, setSelectedMaterialForViewer] = useState<StudyMaterial | null>(null);
  const [materialToReport, setMaterialToReport] = useState<StudyMaterial | null>(null);
  const [prefilledAITopic, setPrefilledAITopic] = useState<string | undefined>(undefined);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync dark mode class
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('edunexus_dark_mode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('edunexus_dark_mode', 'false');
    }
  }, [darkMode]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  // Profile Updates
  const handleUpdateProfile = (updated: Partial<StudentProfile>) => {
    const res = storageService.updateProfile(updated);
    setProfile(res);
    showToast('Academic profile updated');
  };

  const handleSwitchCategory = (category: EducationCategory) => {
    const res = storageService.switchCategory(category);
    setProfile(res);
    showToast(`Switched to ${category.toUpperCase()} Hub`);
  };

  // Bookmarks & Downloads
  const handleToggleBookmark = (id: string) => {
    const isBookmarked = storageService.toggleBookmark(id);
    setBookmarks(storageService.getBookmarks());
    setMaterials(storageService.getMaterials());
    showToast(isBookmarked ? 'Saved to Bookmarks' : 'Removed from Bookmarks');
  };

  const handleDownload = (id: string) => {
    storageService.saveDownload(id);
    setDownloads(storageService.getDownloads());
    setMaterials(storageService.getMaterials());
    showToast('Saved to Offline Library');
  };

  const handleRemoveDownload = (id: string) => {
    storageService.removeDownload(id);
    setDownloads(storageService.getDownloads());
    setMaterials(storageService.getMaterials());
    showToast('Removed from Offline Library');
  };

  // Materials & Admin
  const handleAddMaterial = (mat: StudyMaterial) => {
    storageService.addMaterial(mat);
    setMaterials(storageService.getMaterials());
    showToast('Material published successfully');
  };

  const handleUpdateMaterialStatus = (id: string, status: StudyMaterial['verificationStatus']) => {
    storageService.updateMaterialStatus(id, status);
    setMaterials(storageService.getMaterials());
    showToast('Material verification status updated');
  };

  const handleDeleteMaterial = (id: string) => {
    storageService.deleteMaterial(id);
    setMaterials(storageService.getMaterials());
    showToast('Material deleted');
  };

  // Quizzes & Attempts
  const handleRecordAttempt = (att: QuizAttempt) => {
    storageService.recordQuizAttempt(att);
    setAttempts(storageService.getQuizAttempts());
    setProfile(storageService.getProfile());
    showToast(`Quiz completed! Score: ${att.scorePercentage}%`);
  };

  const handleToggleFlashcardMastery = (id: string) => {
    storageService.toggleFlashcardMastered(id);
    setFlashcards(storageService.getFlashcards());
  };

  // Tasks & Planner
  const handleToggleTask = (id: string) => {
    storageService.toggleTaskCompleted(id);
    setTasks(storageService.getStudyTasks());
  };

  const handleAddTask = (task: StudyTask) => {
    storageService.addTask(task);
    setTasks(storageService.getStudyTasks());
    showToast('Task added to study planner');
  };

  const handleDeleteTask = (id: string) => {
    storageService.deleteTask(id);
    setTasks(storageService.getStudyTasks());
  };

  const handleAddExam = (exam: ExamSchedule) => {
    storageService.addExamSchedule(exam);
    setExams(storageService.getExamSchedules());
    showToast('Exam milestone scheduled');
  };

  // Reports
  const handleSubmitReport = (rep: UserReport) => {
    storageService.submitReport(rep);
    setReports(storageService.getUserReports());
    showToast('Report submitted for moderation');
  };

  const handleUpdateReportStatus = (id: string, status: UserReport['status']) => {
    storageService.updateReportStatus(id, status);
    setReports(storageService.getUserReports());
    showToast(`Report ${status}`);
  };

  // Reset Everything
  const handleResetData = () => {
    storageService.resetAllData();
    window.location.reload();
  };

  // Open Document Viewer
  const handleOpenMaterial = (mat: StudyMaterial) => {
    setSelectedMaterialForViewer(mat);
  };

  const handleAskAIAboutTopic = (topic: string) => {
    setPrefilledAITopic(topic);
    setActiveView('ai-tutor');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 px-4 py-2.5 rounded-2xl bg-slate-900 text-white dark:bg-white dark:text-slate-950 font-bold text-xs shadow-2xl animate-fadeIn border border-slate-700 dark:border-slate-200">
          {toastMessage}
        </div>
      )}

      {/* Main Top Navbar */}
      <Navbar
        profile={profile}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenCategorySwitcher={() => setIsCategorySwitcherOpen(true)}
        onOpenPremium={() => setIsPremiumOpen(true)}
        onOpenOnboarding={() => setIsOnboardingOpen(true)}
        onOpenAdmin={() => setActiveView('admin')}
        activeView={activeView}
        setActiveView={setActiveView}
      />

      {/* Main Content View Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeView === 'home' && (
          <HomeView
            profile={profile}
            materials={materials}
            subjects={subjects}
            dailyMCQ={mcqs[0] || null}
            upcomingExam={exams[0] || null}
            onOpenMaterial={handleOpenMaterial}
            onOpenSearch={() => setIsSearchOpen(true)}
            onNavigateToView={(v) => setActiveView(v)}
            onStartQuiz={() => setActiveView('practice')}
            onOpenOnboarding={() => setIsOnboardingOpen(true)}
            onSwitchCategory={handleSwitchCategory}
            bookmarks={bookmarks}
            onToggleBookmark={handleToggleBookmark}
          />
        )}

        {activeView === 'materials' && (
          <MaterialsView
            materials={materials}
            subjects={subjects}
            onOpenMaterial={handleOpenMaterial}
            bookmarks={bookmarks}
            onToggleBookmark={handleToggleBookmark}
            downloads={downloads}
            onDownload={handleDownload}
            onOpenReport={(mat) => setMaterialToReport(mat)}
            currentCategory={profile.category}
          />
        )}

        {activeView === 'ai-tutor' && (
          <AITutorView
            profile={profile}
            initialTopic={prefilledAITopic}
            chatHistory={aiChats}
            onSaveChats={(chats) => {
              setAIChats(chats);
              storageService.saveAIChats(chats);
            }}
            onNavigateToPractice={() => setActiveView('practice')}
          />
        )}

        {activeView === 'practice' && (
          <PracticeView
            profile={profile}
            mcqs={mcqs}
            flashcards={flashcards}
            attempts={attempts}
            onRecordAttempt={handleRecordAttempt}
            onToggleFlashcardMastery={handleToggleFlashcardMastery}
            onNavigateToMaterials={() => setActiveView('materials')}
            onAskAIAboutTopic={handleAskAIAboutTopic}
          />
        )}

        {activeView === 'profile' && (
          <ProfileView
            profile={profile}
            materials={materials}
            bookmarks={bookmarks}
            downloads={downloads}
            onToggleBookmark={handleToggleBookmark}
            onRemoveDownload={handleRemoveDownload}
            onOpenMaterial={handleOpenMaterial}
            onUpdateProfile={handleUpdateProfile}
            onOpenOnboarding={() => setIsOnboardingOpen(true)}
            onOpenPremium={() => setIsPremiumOpen(true)}
            darkMode={darkMode}
            onToggleDarkMode={() => setDarkMode(!darkMode)}
            onResetData={handleResetData}
          />
        )}

        {activeView === 'planner' && (
          <PlannerView
            profile={profile}
            tasks={tasks}
            exams={exams}
            onToggleTask={handleToggleTask}
            onAddTask={handleAddTask}
            onDeleteTask={handleDeleteTask}
            onAddExam={handleAddExam}
            onNavigateToMaterials={() => setActiveView('materials')}
          />
        )}

        {/* Dedicated Sector Hubs */}
        {activeView === 'hub-nursing' && (
          <NursingHub
            materials={materials}
            subjects={subjects}
            onOpenMaterial={handleOpenMaterial}
            onAskAIAboutTopic={handleAskAIAboutTopic}
          />
        )}

        {activeView === 'hub-btech' && (
          <BTechHub
            materials={materials}
            subjects={subjects}
            onOpenMaterial={handleOpenMaterial}
            onAskAIAboutTopic={handleAskAIAboutTopic}
          />
        )}

        {activeView === 'hub-inter' && (
          <IntermediateHub
            materials={materials}
            subjects={subjects}
            onOpenMaterial={handleOpenMaterial}
            onAskAIAboutTopic={handleAskAIAboutTopic}
          />
        )}

        {activeView === 'hub-school' && (
          <SchoolHub
            materials={materials}
            subjects={subjects}
            onOpenMaterial={handleOpenMaterial}
            onAskAIAboutTopic={handleAskAIAboutTopic}
          />
        )}

        {/* Staff & Admin Console */}
        {activeView === 'admin' && (
          <AdminPortal
            currentRole={profile.role}
            onChangeRole={(r) => handleUpdateProfile({ role: r })}
            materials={materials}
            subjects={subjects}
            reports={reports}
            onAddMaterial={handleAddMaterial}
            onUpdateMaterialStatus={handleUpdateMaterialStatus}
            onDeleteMaterial={handleDeleteMaterial}
            onUpdateReportStatus={handleUpdateReportStatus}
            onAddSubject={(s) => {
              storageService.addSubject(s);
              setSubjects(storageService.getSubjects());
            }}
            onAddMCQ={(m) => {
              storageService.addMCQ(m);
              setMCQs(storageService.getMCQs());
            }}
            onBackToApp={() => setActiveView('home')}
          />
        )}
      </main>

      {/* 5-Item Mobile Bottom Navigation */}
      {activeView !== 'admin' && (
        <BottomNav
          activeView={activeView}
          setActiveView={setActiveView}
          onOpenPlanner={() => setActiveView('planner')}
          streakCount={profile.streakDays}
        />
      )}

      {/* Category Switcher Modal */}
      <CategorySwitcherModal
        isOpen={isCategorySwitcherOpen}
        onClose={() => setIsCategorySwitcherOpen(false)}
        currentCategory={profile.category}
        onSelectCategory={(cat) => {
          handleSwitchCategory(cat);
          if (cat === 'nursing') setActiveView('hub-nursing');
          else if (cat === 'btech') setActiveView('hub-btech');
          else if (cat === 'intermediate') setActiveView('hub-inter');
          else if (cat === 'school') setActiveView('hub-school');
        }}
      />

      {/* Onboarding & Academic Profile Modal */}
      <OnboardingModal
        isOpen={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
        currentProfile={profile}
        onSaveProfile={handleUpdateProfile}
      />

      {/* Document / PDF Reader Modal */}
      <DocumentViewerModal
        material={selectedMaterialForViewer}
        isOpen={!!selectedMaterialForViewer}
        onClose={() => setSelectedMaterialForViewer(null)}
        isBookmarked={selectedMaterialForViewer ? bookmarks.includes(selectedMaterialForViewer.id) : false}
        onToggleBookmark={handleToggleBookmark}
        isDownloaded={selectedMaterialForViewer ? downloads.includes(selectedMaterialForViewer.id) : false}
        onDownload={handleDownload}
        onOpenReport={(mat) => setMaterialToReport(mat)}
        onAskAIAboutNote={(mat) => {
          setPrefilledAITopic(`Please explain and summarize the key concepts of: ${mat.title}`);
          setActiveView('ai-tutor');
        }}
      />

      {/* Global Search Modal (Ctrl+K) */}
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        materials={materials}
        subjects={subjects}
        onSelectMaterial={handleOpenMaterial}
        onSelectSubject={() => setActiveView('materials')}
      />

      {/* Pro Tier Upgrade Modal */}
      <PremiumModal
        isOpen={isPremiumOpen}
        onClose={() => setIsPremiumOpen(false)}
        isPremium={profile.isPremium}
        onUpgrade={() => {
          handleUpdateProfile({ isPremium: true });
          setIsPremiumOpen(false);
          showToast('🎉 Welcome to EduNexus Pro!');
        }}
      />

      {/* Content Reporting Modal */}
      <ReportModal
        isOpen={!!materialToReport}
        onClose={() => setMaterialToReport(null)}
        material={materialToReport}
        onSubmitReport={handleSubmitReport}
        userName={profile.fullName}
      />

    </div>
  );
}

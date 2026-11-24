import {
  StudentProfile,
  Subject,
  StudyMaterial,
  MCQQuestion,
  Flashcard,
  StudyTask,
  ExamSchedule,
  QuizAttempt,
  UserReport,
  AIMessage,
  EducationCategory
} from '../types';
import {
  INITIAL_PROFILE,
  MOCK_SUBJECTS,
  MOCK_MATERIALS,
  MOCK_MCQS,
  MOCK_FLASHCARDS,
  MOCK_STUDY_TASKS,
  MOCK_EXAM_SCHEDULES,
  MOCK_USER_REPORTS
} from '../data/mockData';

const STORAGE_KEYS = {
  PROFILE: 'edunexus_profile_v1',
  SUBJECTS: 'edunexus_subjects_v1',
  MATERIALS: 'edunexus_materials_v1',
  BOOKMARKS: 'edunexus_bookmarks_v1',
  DOWNLOADS: 'edunexus_downloads_v1',
  MCQS: 'edunexus_mcqs_v1',
  ATTEMPTS: 'edunexus_attempts_v1',
  FLASHCARDS: 'edunexus_flashcards_v1',
  TASKS: 'edunexus_tasks_v1',
  EXAMS: 'edunexus_exams_v1',
  REPORTS: 'edunexus_reports_v1',
  AI_CHATS: 'edunexus_ai_chats_v1',
  THEME: 'edunexus_theme_v1',
  SUPABASE_CONFIG: 'edunexus_supabase_cfg_v1'
};

class StorageService {
  private get<T>(key: string, defaultValue: T): T {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch {
      return defaultValue;
    }
  }

  private set<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.warn('Storage write failed', e);
    }
  }

  // --- Profile ---
  getProfile(): StudentProfile {
    return this.get<StudentProfile>(STORAGE_KEYS.PROFILE, INITIAL_PROFILE);
  }

  updateProfile(profile: Partial<StudentProfile>): StudentProfile {
    const current = this.getProfile();
    const updated = { ...current, ...profile };
    this.set(STORAGE_KEYS.PROFILE, updated);
    return updated;
  }

  // Quick category switch helper that also updates the profile's primary course & subjects
  switchCategory(category: EducationCategory): StudentProfile {
    const profile = this.getProfile();
    let courseOrClass = 'B.Tech 3rd Year';
    let branchOrStream = 'CSE';
    let boardOrUniversity = 'State Technical University';
    let semester: number | undefined = 5;

    if (category === 'nursing') {
      courseOrClass = 'B.Sc Nursing';
      branchOrStream = 'B.Sc / GNM';
      boardOrUniversity = 'Indian Nursing Council (INC)';
      semester = 2;
    } else if (category === 'intermediate') {
      courseOrClass = 'Intermediate 2nd Year';
      branchOrStream = 'MPC';
      boardOrUniversity = 'Board of Intermediate Education';
      semester = undefined;
    } else if (category === 'school') {
      courseOrClass = 'Class 10';
      branchOrStream = 'General';
      boardOrUniversity = 'CBSE';
      semester = undefined;
    }

    const relevantSubjects = this.getSubjects().filter(s => s.category === category);
    const selectedSubjects = relevantSubjects.slice(0, 4).map(s => s.id);

    return this.updateProfile({
      category,
      courseOrClass,
      branchOrStream,
      boardOrUniversity,
      semester,
      selectedSubjects
    });
  }

  // --- Subjects ---
  getSubjects(): Subject[] {
    return this.get<Subject[]>(STORAGE_KEYS.SUBJECTS, MOCK_SUBJECTS);
  }

  addSubject(subject: Subject): void {
    const subjects = this.getSubjects();
    subjects.push(subject);
    this.set(STORAGE_KEYS.SUBJECTS, subjects);
  }

  // --- Materials ---
  getMaterials(): StudyMaterial[] {
    return this.get<StudyMaterial[]>(STORAGE_KEYS.MATERIALS, MOCK_MATERIALS);
  }

  addMaterial(material: StudyMaterial): void {
    const materials = this.getMaterials();
    materials.unshift(material);
    this.set(STORAGE_KEYS.MATERIALS, materials);
  }

  updateMaterialStatus(id: string, status: StudyMaterial['verificationStatus']): void {
    const materials = this.getMaterials().map(m => m.id === id ? { ...m, verificationStatus: status } : m);
    this.set(STORAGE_KEYS.MATERIALS, materials);
  }

  deleteMaterial(id: string): void {
    const materials = this.getMaterials().filter(m => m.id !== id);
    this.set(STORAGE_KEYS.MATERIALS, materials);
  }

  // --- Bookmarks ---
  getBookmarks(): string[] {
    return this.get<string[]>(STORAGE_KEYS.BOOKMARKS, ['mat-btech-dsa-01', 'mat-nurs-cardio-01']);
  }

  toggleBookmark(materialId: string): boolean {
    const bookmarks = this.getBookmarks();
    const index = bookmarks.indexOf(materialId);
    let isBookmarked = false;
    if (index > -1) {
      bookmarks.splice(index, 1);
      isBookmarked = false;
    } else {
      bookmarks.push(materialId);
      isBookmarked = true;
    }
    this.set(STORAGE_KEYS.BOOKMARKS, bookmarks);

    // update bookmark count in material
    const materials = this.getMaterials().map(m => {
      if (m.id === materialId) {
        return { ...m, bookmarksCount: m.bookmarksCount + (isBookmarked ? 1 : -1) };
      }
      return m;
    });
    this.set(STORAGE_KEYS.MATERIALS, materials);

    return isBookmarked;
  }

  // --- Downloads (Offline library) ---
  getDownloads(): string[] {
    return this.get<string[]>(STORAGE_KEYS.DOWNLOADS, ['mat-btech-dsa-01']);
  }

  saveDownload(materialId: string): void {
    const downloads = this.getDownloads();
    if (!downloads.includes(materialId)) {
      downloads.push(materialId);
      this.set(STORAGE_KEYS.DOWNLOADS, downloads);
    }
    // update download count in material
    const materials = this.getMaterials().map(m => {
      if (m.id === materialId) {
        return { ...m, downloadsCount: m.downloadsCount + 1 };
      }
      return m;
    });
    this.set(STORAGE_KEYS.MATERIALS, materials);
  }

  removeDownload(materialId: string): void {
    const downloads = this.getDownloads().filter(id => id !== materialId);
    this.set(STORAGE_KEYS.DOWNLOADS, downloads);
  }

  // --- MCQs & Quizzes ---
  getMCQs(): MCQQuestion[] {
    return this.get<MCQQuestion[]>(STORAGE_KEYS.MCQS, MOCK_MCQS);
  }

  addMCQ(question: MCQQuestion): void {
    const mcqs = this.getMCQs();
    mcqs.push(question);
    this.set(STORAGE_KEYS.MCQS, mcqs);
  }

  getQuizAttempts(): QuizAttempt[] {
    return this.get<QuizAttempt[]>(STORAGE_KEYS.ATTEMPTS, [
      {
        id: 'att-1',
        quizTitle: 'Daily Rapid Diagnostic Quiz',
        subjectId: 'sub-btech-cse-dsa',
        subjectName: 'Data Structures & Algorithms',
        totalQuestions: 5,
        correctAnswers: 4,
        scorePercentage: 80,
        timeSpentSeconds: 140,
        completedAt: '2026-11-23T14:30:00Z',
        wrongQuestionIds: ['mcq-btech-dsa-2']
      }
    ]);
  }

  recordQuizAttempt(attempt: QuizAttempt): void {
    const attempts = this.getQuizAttempts();
    attempts.unshift(attempt);
    this.set(STORAGE_KEYS.ATTEMPTS, attempts);

    // Update student streak & minutes studied
    const profile = this.getProfile();
    const addedMinutes = Math.max(5, Math.ceil(attempt.timeSpentSeconds / 60));
    this.updateProfile({
      minutesStudiedToday: (profile.minutesStudiedToday || 0) + addedMinutes,
      streakDays: profile.streakDays || 1
    });
  }

  // --- Flashcards ---
  getFlashcards(): Flashcard[] {
    return this.get<Flashcard[]>(STORAGE_KEYS.FLASHCARDS, MOCK_FLASHCARDS);
  }

  toggleFlashcardMastered(id: string): void {
    const cards = this.getFlashcards().map(c => c.id === id ? { ...c, mastered: !c.mastered } : c);
    this.set(STORAGE_KEYS.FLASHCARDS, cards);
  }

  // --- Tasks & Planner ---
  getStudyTasks(): StudyTask[] {
    return this.get<StudyTask[]>(STORAGE_KEYS.TASKS, MOCK_STUDY_TASKS);
  }

  toggleTaskCompleted(id: string): void {
    const tasks = this.getStudyTasks().map(t => t.id === id ? { ...t, isCompleted: !t.isCompleted } : t);
    this.set(STORAGE_KEYS.TASKS, tasks);
  }

  addTask(task: StudyTask): void {
    const tasks = this.getStudyTasks();
    tasks.push(task);
    this.set(STORAGE_KEYS.TASKS, tasks);
  }

  deleteTask(id: string): void {
    const tasks = this.getStudyTasks().filter(t => t.id !== id);
    this.set(STORAGE_KEYS.TASKS, tasks);
  }

  // --- Exam Schedules ---
  getExamSchedules(): ExamSchedule[] {
    return this.get<ExamSchedule[]>(STORAGE_KEYS.EXAMS, MOCK_EXAM_SCHEDULES);
  }

  addExamSchedule(exam: ExamSchedule): void {
    const exams = this.getExamSchedules();
    exams.push(exam);
    this.set(STORAGE_KEYS.EXAMS, exams);
  }

  // --- Reports (Moderation) ---
  getUserReports(): UserReport[] {
    return this.get<UserReport[]>(STORAGE_KEYS.REPORTS, MOCK_USER_REPORTS);
  }

  submitReport(report: UserReport): void {
    const reports = this.getUserReports();
    reports.unshift(report);
    this.set(STORAGE_KEYS.REPORTS, reports);
  }

  updateReportStatus(id: string, status: UserReport['status']): void {
    const reports = this.getUserReports().map(r => r.id === id ? { ...r, status } : r);
    this.set(STORAGE_KEYS.REPORTS, reports);
  }

  // --- AI Chat History ---
  getAIChats(): AIMessage[] {
    return this.get<AIMessage[]>(STORAGE_KEYS.AI_CHATS, [
      {
        id: 'msg-welcome',
        sender: 'assistant',
        content: `Hello ${this.getProfile().fullName.split(' ')[0]}! I'm your **EduNexus AI Academic Tutor**. 

I understand your curriculum (**${this.getProfile().category.toUpperCase()} • ${this.getProfile().courseOrClass}**). 

You can ask me to:
- Explain difficult concepts simply
- Generate step-by-step 5 or 10-mark exam answers
- Create instant practice MCQs
- Summarize long chapters
- Translate or explain in **English**, **Telugu (తెలుగు)**, or **Hindi (हिंदी)**

What would you like to master today?`,
        timestamp: new Date().toISOString(),
        mode: 'explain_simply',
        language: this.getProfile().preferredLanguage,
        suggestedFollowUps: [
          'Explain AVL tree rotations with examples',
          'Give me a 10-mark answer on Cardiac Conduction System',
          'Explain Reimer-Tiemann reaction mechanism',
          'Prove that √5 is irrational step-by-step'
        ]
      }
    ]);
  }

  saveAIChats(messages: AIMessage[]): void {
    this.set(STORAGE_KEYS.AI_CHATS, messages);
  }

  // Reset to initial mock data
  resetAllData(): void {
    Object.values(STORAGE_KEYS).forEach(k => localStorage.removeItem(k));
  }
}

export const storageService = new StorageService();

export type EducationCategory = 'school' | 'intermediate' | 'btech' | 'nursing';

export type UserRole = 'student' | 'content_editor' | 'moderator' | 'admin';

export type PreferredLanguage = 'en' | 'te' | 'hi';

export type MaterialType = 
  | 'pdf_notes' 
  | 'text_notes' 
  | 'textbook' 
  | 'pyq' 
  | 'important_questions' 
  | 'mcqs' 
  | 'assignments' 
  | 'lab_record' 
  | 'formula_sheet' 
  | 'study_guide'
  | 'revision_notes' 
  | 'flashcard' 
  | 'video_lesson'
  | 'clinical_case'
  | 'care_plan'
  | 'drug_study';

export type VerificationStatus = 'verified' | 'official' | 'community' | 'under_review';

export interface StudentProfile {
  id: string;
  fullName: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  category: EducationCategory;
  boardOrUniversity: string;
  courseOrClass: string; // e.g. "Class 10", "2nd Year", "B.Tech 3rd Year", "B.Sc Nursing"
  branchOrStream?: string; // e.g. "CSE", "MPC", "BiPC", "GNM"
  semester?: number; // 1-8 for B.Tech / Nursing
  selectedSubjects: string[];
  preferredLanguage: PreferredLanguage;
  dailyGoalMinutes: number;
  streakDays: number;
  lastStudyDate?: string;
  minutesStudiedToday: number;
  isPremium: boolean;
  isOnboarded: boolean;
  createdAt: string;
}

export interface Subject {
  id: string;
  code?: string;
  name: string;
  category: EducationCategory;
  branchOrStream?: string;
  semesterOrClass: string;
  description: string;
  iconName: string;
  colorScheme: string;
  totalChapters: number;
  totalMaterials: number;
  progressPercent?: number;
}

export interface Chapter {
  id: string;
  subjectId: string;
  title: string;
  orderIndex: number;
  keyTopics: string[];
  summary?: string;
}

export interface StudyMaterial {
  id: string;
  title: string;
  description: string;
  category: EducationCategory;
  boardOrUniversity: string;
  course: string;
  branchOrStream?: string;
  semester?: number;
  subjectId: string;
  subjectName: string;
  chapterTitle?: string;
  materialType: MaterialType;
  language: PreferredLanguage;
  fileUrl?: string;
  contentBody?: string;
  readTimeMinutes: number;
  pageCount?: number;
  uploadDate: string;
  tags: string[];
  authorOrSource: string;
  verificationStatus: VerificationStatus;
  isPremiumOnly: boolean;
  viewsCount: number;
  downloadsCount: number;
  bookmarksCount: number;
}

export interface MCQQuestion {
  id: string;
  subjectId: string;
  subjectName: string;
  topic: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: EducationCategory;
  codeSnippet?: string;
}

export interface QuizAttempt {
  id: string;
  quizTitle: string;
  subjectId: string;
  subjectName: string;
  totalQuestions: number;
  correctAnswers: number;
  scorePercentage: number;
  timeSpentSeconds: number;
  completedAt: string;
  wrongQuestionIds: string[];
}

export interface Flashcard {
  id: string;
  subjectId: string;
  subjectName: string;
  front: string;
  back: string;
  topic: string;
  mastered?: boolean;
}

export interface StudyTask {
  id: string;
  title: string;
  subjectName: string;
  estimatedMinutes: number;
  deadline: string;
  isCompleted: boolean;
  priority: 'high' | 'medium' | 'low';
}

export interface ExamSchedule {
  id: string;
  title: string;
  subjectName: string;
  examDate: string;
  totalMarks?: number;
  syllabusCoveredPercent: number;
}

export interface AIMessage {
  id: string;
  sender: 'user' | 'assistant';
  content: string;
  timestamp: string;
  mode?: 'explain_simply' | 'detailed' | 'exam_mode' | 'short_notes' | 'mcq_practice' | 'revision';
  language?: PreferredLanguage;
  citations?: string[];
  suggestedFollowUps?: string[];
  quizData?: {
    question: string;
    options: string[];
    answerIndex: number;
    explanation: string;
  };
}

export interface UserReport {
  id: string;
  materialId: string;
  materialTitle: string;
  reason: 'incorrect_information' | 'outdated' | 'copyright' | 'poor_quality' | 'other';
  details: string;
  reportedBy: string;
  reportedAt: string;
  status: 'pending' | 'resolved' | 'dismissed';
}

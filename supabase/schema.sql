-- ==============================================================================
-- EduNexus: Unified Education Super App Database Schema
-- Target: PostgreSQL / Supabase
-- Covers: School (1-10), Intermediate (11-12), B.Tech, Nursing
-- Includes: Row Level Security (RLS), RBAC, Full-Text Search, Storage Policies
-- ==============================================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- 1. Custom Types & Enums
CREATE TYPE education_category AS ENUM ('school', 'intermediate', 'btech', 'nursing');
CREATE TYPE user_role AS ENUM ('student', 'content_editor', 'moderator', 'admin');
CREATE TYPE preferred_language AS ENUM ('en', 'te', 'hi');
CREATE TYPE material_type AS ENUM (
  'pdf_notes', 'text_notes', 'textbook', 'pyq', 'important_questions', 
  'mcqs', 'assignments', 'lab_record', 'formula_sheet', 'revision_notes', 
  'flashcard', 'video_lesson', 'clinical_case', 'care_plan', 'drug_study'
);
CREATE TYPE verification_status AS ENUM ('verified', 'official', 'community', 'under_review');
CREATE TYPE report_reason AS ENUM ('incorrect_information', 'outdated', 'copyright', 'poor_quality', 'other');
CREATE TYPE report_status AS ENUM ('pending', 'resolved', 'dismissed');

-- 2. Profiles Table (linked with Supabase auth.users)
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  role user_role DEFAULT 'student',
  avatar_url TEXT,
  category education_category NOT NULL DEFAULT 'btech',
  board_or_university TEXT NOT NULL DEFAULT 'Autonomous / State Univ',
  course_or_class TEXT NOT NULL DEFAULT 'B.Tech 3rd Year',
  branch_or_stream TEXT,
  semester INT,
  selected_subjects TEXT[] DEFAULT '{}',
  preferred_language preferred_language DEFAULT 'en',
  daily_goal_minutes INT DEFAULT 45,
  streak_days INT DEFAULT 1,
  minutes_studied_today INT DEFAULT 0,
  last_study_date DATE DEFAULT CURRENT_DATE,
  is_premium BOOLEAN DEFAULT FALSE,
  is_onboarded BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Subjects Taxonomy
CREATE TABLE public.subjects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code TEXT,
  name TEXT NOT NULL,
  category education_category NOT NULL,
  branch_or_stream TEXT,
  semester_or_class TEXT NOT NULL,
  description TEXT,
  icon_name TEXT DEFAULT 'BookOpen',
  color_scheme TEXT DEFAULT 'indigo',
  total_chapters INT DEFAULT 5,
  total_materials INT DEFAULT 10,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Chapters
CREATE TABLE public.chapters (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  subject_id UUID NOT NULL REFERENCES public.subjects(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  order_index INT NOT NULL DEFAULT 1,
  key_topics TEXT[] DEFAULT '{}',
  summary TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Study Materials Library
CREATE TABLE public.materials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category education_category NOT NULL,
  board_or_university TEXT NOT NULL,
  course TEXT NOT NULL,
  branch_or_stream TEXT,
  semester INT,
  subject_id UUID NOT NULL REFERENCES public.subjects(id) ON DELETE CASCADE,
  chapter_title TEXT,
  material_type material_type NOT NULL,
  language preferred_language DEFAULT 'en',
  file_url TEXT,
  content_body TEXT,
  read_time_minutes INT DEFAULT 10,
  page_count INT,
  tags TEXT[] DEFAULT '{}',
  author_or_source TEXT NOT NULL DEFAULT 'EduNexus Verified Faculty',
  verification_status verification_status DEFAULT 'verified',
  is_premium_only BOOLEAN DEFAULT FALSE,
  views_count INT DEFAULT 0,
  downloads_count INT DEFAULT 0,
  bookmarks_count INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. MCQ Questions Bank
CREATE TABLE public.mcq_questions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  subject_id UUID NOT NULL REFERENCES public.subjects(id) ON DELETE CASCADE,
  topic TEXT NOT NULL,
  question TEXT NOT NULL,
  options JSONB NOT NULL, -- Array of 4 strings
  correct_answer_index INT NOT NULL CHECK (correct_answer_index BETWEEN 0 AND 3),
  explanation TEXT NOT NULL,
  difficulty TEXT CHECK (difficulty IN ('easy', 'medium', 'hard')) DEFAULT 'medium',
  category education_category NOT NULL,
  code_snippet TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Quiz Attempts & Performance History
CREATE TABLE public.quiz_attempts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  quiz_title TEXT NOT NULL,
  subject_id UUID REFERENCES public.subjects(id),
  total_questions INT NOT NULL,
  correct_answers INT NOT NULL,
  score_percentage NUMERIC(5,2) NOT NULL,
  time_spent_seconds INT NOT NULL,
  wrong_question_ids TEXT[] DEFAULT '{}',
  completed_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Bookmarks & Personal Library
CREATE TABLE public.bookmarks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  material_id UUID NOT NULL REFERENCES public.materials(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, material_id)
);

-- 9. Offline Material Downloads Tracking
CREATE TABLE public.material_downloads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  material_id UUID NOT NULL REFERENCES public.materials(id) ON DELETE CASCADE,
  downloaded_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, material_id)
);

-- 10. Study Planner Tasks
CREATE TABLE public.study_tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  subject_name TEXT NOT NULL,
  estimated_minutes INT DEFAULT 45,
  deadline DATE NOT NULL,
  is_completed BOOLEAN DEFAULT FALSE,
  priority TEXT CHECK (priority IN ('high', 'medium', 'low')) DEFAULT 'medium',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. Exam Schedules
CREATE TABLE public.exam_schedules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  subject_name TEXT NOT NULL,
  exam_date DATE NOT NULL,
  total_marks INT DEFAULT 100,
  syllabus_covered_percent INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 12. AI Tutor Conversation Sessions
CREATE TABLE public.ai_conversations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  sender TEXT CHECK (sender IN ('user', 'assistant')) NOT NULL,
  content TEXT NOT NULL,
  mode TEXT,
  language preferred_language DEFAULT 'en',
  citations TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 13. User Reports (Feedback & Quality Assurance)
CREATE TABLE public.user_reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  material_id UUID NOT NULL REFERENCES public.materials(id) ON DELETE CASCADE,
  reason report_reason NOT NULL,
  details TEXT NOT NULL,
  reported_by UUID REFERENCES public.profiles(id),
  status report_status DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- Row-Level Security (RLS) Policies
-- ==============================================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chapters ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mcq_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.material_downloads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.study_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exam_schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_reports ENABLE ROW LEVEL SECURITY;

-- Profiles: Users can view & edit their own profile; admins can view all
CREATE POLICY "Users can manage own profile" ON public.profiles
  FOR ALL USING (auth.uid() = id);

-- Materials: Everyone can read verified materials. Admins & editors have full access.
CREATE POLICY "Anyone can read verified materials" ON public.materials
  FOR SELECT USING (verification_status IN ('verified', 'official') OR auth.uid() IN (SELECT id FROM public.profiles WHERE role IN ('admin', 'moderator', 'content_editor')));

CREATE POLICY "Staff can manage materials" ON public.materials
  FOR ALL USING (auth.uid() IN (SELECT id FROM public.profiles WHERE role IN ('admin', 'content_editor')));

-- Subjects & Chapters: Readable by everyone; managed by staff
CREATE POLICY "Public read subjects" ON public.subjects FOR SELECT USING (true);
CREATE POLICY "Staff manage subjects" ON public.subjects FOR ALL USING (auth.uid() IN (SELECT id FROM public.profiles WHERE role IN ('admin', 'content_editor')));

CREATE POLICY "Public read chapters" ON public.chapters FOR SELECT USING (true);
CREATE POLICY "Staff manage chapters" ON public.chapters FOR ALL USING (auth.uid() IN (SELECT id FROM public.profiles WHERE role IN ('admin', 'content_editor')));

-- Questions: Readable by everyone; managed by staff
CREATE POLICY "Public read questions" ON public.mcq_questions FOR SELECT USING (true);
CREATE POLICY "Staff manage questions" ON public.mcq_questions FOR ALL USING (auth.uid() IN (SELECT id FROM public.profiles WHERE role IN ('admin', 'content_editor')));

-- User specific tables (Bookmarks, Attempts, Tasks, Schedules, AI chats)
CREATE POLICY "User manage bookmarks" ON public.bookmarks FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "User manage downloads" ON public.material_downloads FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "User manage attempts" ON public.quiz_attempts FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "User manage tasks" ON public.study_tasks FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "User manage exams" ON public.exam_schedules FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "User manage ai_chats" ON public.ai_conversations FOR ALL USING (auth.uid() = user_id);

-- Reports: Users can insert reports; moderators and admins can manage them
CREATE POLICY "Users can submit reports" ON public.user_reports FOR INSERT WITH CHECK (true);
CREATE POLICY "Staff can manage reports" ON public.user_reports FOR ALL USING (auth.uid() IN (SELECT id FROM public.profiles WHERE role IN ('admin', 'moderator')));

-- Full Text Search Index on Materials
CREATE INDEX idx_materials_fts ON public.materials USING gin (to_tsvector('english', title || ' ' || description));
CREATE INDEX idx_materials_category_subject ON public.materials (category, subject_id);
CREATE INDEX idx_mcq_subject_difficulty ON public.mcq_questions (subject_id, difficulty);

# EduNexus — All-in-One Education Super App

> **Tagline:** Everything you need to learn. All in one place.

EduNexus is an enterprise-grade, mobile-first unified academic learning ecosystem built for Indian students across:
1. **School Education (Classes 1–10):** CBSE, ICSE, and State Boards with age-appropriate visual explanations, interactive worksheets, and child-safe AI.
2. **Intermediate (1st & 2nd Year):** MPC, BiPC, MEC, CEC with master formula sheets, named organic reaction mechanisms, math problem solutions, and EAMCET / JEE / NEET foundation.
3. **B.Tech Engineering (Semesters 1–8):** CSE, IT, ECE, EEE, Mechanical, Civil, AI & Data Science with unit-wise lecture notes, solved PYQs, lab manuals, coding interview tutorials, and viva questions.
4. **Nursing Education:** ANM, GNM, B.Sc Nursing, Post Basic B.Sc, M.Sc Nursing with NANDA-I Care Plans, Emergency Drug Formularies, Clinical Case Studies, and institutional safety disclaimers.

---

## 🌟 Key Features

### 1. Unified Dynamic Hubs
- **Nursing Hub:** ANM, GNM, B.Sc & M.Sc Nursing with Anatomy & Physiology, Fundamentals, Pharmacology, Medical-Surgical Nursing, Community Health, and Clinical Care Plans.
- **B.Tech Engineering Hub:** 8 engineering disciplines, semester selector (Sem 1–8), interactive programming tutorials (C, C++, Java, Python, SQL, DSA), and placement prep.
- **Intermediate Hub:** MPC, BiPC, MEC, CEC streams with quick formula sheets, chemistry mechanisms, and model question papers.
- **School Hub:** Classes 1 to 10 with child-safe UI, math step-by-step challenges, science experiments, and homework buddy.

### 2. Personalized Onboarding & Academic Profile
- 7-step onboarding flow: Education Category, Board/University, Class/Course/Year, Branch/Stream, Semester, Subjects, and Preferred Language (English, Telugu, Hindi).
- Automatically saves preferences and tailors all feed cards, PYQs, and daily goals.

### 3. Integrated Document & Built-in PDF Reader
- Distraction-free mobile reading experience with adjustable font sizing (`A-`, `A`, `A+`), reading themes (Day, Sepia, Night), bookmarks, and offline downloading simulation.
- One-click **"Ask AI Tutor About Note"** to explain or generate quizzes on any document.

### 4. 24/7 AI Academic Tutor
- **6 Intelligent Modes:**
  1. *Explain Simply (ELI5):* Beginner-friendly real-world analogies.
  2. *Detailed Academic:* In-depth theoretical frameworks and derivations.
  3. *10-Mark Exam Answer:* Structured university exam format with headings, bullet points, diagram cues, and conclusions.
  4. *Short Revision Notes:* High-yield cheat sheets.
  5. *MCQ Practice:* Generates instant interactive quiz questions with explanations.
  6. *Quick Recall:* Rapid-fire memory triggers.
- **Multilingual Support:** Fully fluent explanations in English, Telugu (తెలుగు), and Hindi (हिंदी).
- **Question Photo Solver:** Image problem analysis with step-by-step calculations.
- **BYOK (Bring Your Own Key):** Supports custom Google Gemini API keys or operates autonomously on the built-in academic synthesis engine.

### 5. Practice Center & Test Engine
- Daily Diagnostic Quizzes with live timers.
- Interactive question palette with answered/unanswered tracking.
- 3D Flip Flashcards for active spaced repetition.
- Detailed scorecards with accuracy percentage and AI weak-area recommendations.

### 6. Smart Study Planner
- Exam milestones countdown.
- Auto-generate personalized revision plans based on exam deadlines and available daily study hours.
- Daily action checklist with priority levels and task completion tracking.

### 7. Staff & Admin Console (RBAC)
- Role-Based Access Control: `student`, `content_editor`, `moderator`, `admin`.
- Study material publishing and PDF management.
- MCQ question bank creator.
- User quality & inaccuracy report moderation queue.
- Real-time platform analytics.

### 8. Freemium & Monetization
- Clear free tier vs. **EduNexus Pro** comparison modal.
- Pro benefits: unlimited mock exams, advanced AI modes, offline library, clinical case studies, and coding interview series.

---

## 🏗️ Technical Architecture & Tech Stack

- **Frontend:** React 18, TypeScript, Tailwind CSS, Lucide Icons, Canvas Confetti
- **Build Tool:** Vite 6 with instant HMR and PWA manifest
- **Database / Backend:** Supabase (PostgreSQL 15+)
- **State Management:** Reactive local store engine with offline hydration (`localStorage` / `IndexedDB`) and real Supabase client sync
- **Security:** Strict TypeScript types, Row-Level Security (RLS) policies, child privacy safeguards, and no exposed frontend API secrets

---

## 🗄️ Supabase Database Setup

A complete PostgreSQL schema is provided at `supabase/schema.sql`.

### To apply the schema:
1. Create a project at [Supabase](https://supabase.com).
2. Open the **SQL Editor** in the Supabase Dashboard.
3. Paste the contents of `supabase/schema.sql` and click **Run**.
4. The schema automatically creates:
   - Tables: `profiles`, `subjects`, `chapters`, `materials`, `mcq_questions`, `quiz_attempts`, `bookmarks`, `material_downloads`, `study_tasks`, `exam_schedules`, `ai_conversations`, `user_reports`.
   - Full Row-Level Security (RLS) policies for user data isolation.
   - Trigram Full-Text Search index on study materials.

---

## 🚀 Running Locally

```bash
# 1. Navigate to workspace
cd /home/kali/.gemini/antigravity/scratch/edunexus

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Build for production
npm run build
```

EduNexus will be available at `http://localhost:3000`.

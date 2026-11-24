import React, { useState } from 'react';
import { 
  X, 
  Check, 
  ArrowRight, 
  ArrowLeft, 
  GraduationCap, 
  School, 
  BookMarked, 
  Stethoscope, 
  Sparkles, 
  Globe 
} from 'lucide-react';
import { StudentProfile, EducationCategory, PreferredLanguage } from '../types';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentProfile: StudentProfile;
  onSaveProfile: (profile: Partial<StudentProfile>) => void;
}

const BOARDS_BY_CAT: Record<EducationCategory, string[]> = {
  school: ['CBSE (Central Board)', 'ICSE / CISCE', 'State Board (Telangana / AP / others)', 'International Baccalaureate (IB)', 'Cambridge (IGCSE)'],
  intermediate: ['BIE Telangana (TSBIE)', 'BIE Andhra Pradesh (BIEAP)', 'CBSE Class 11-12', 'ICSE (ISC 11-12)', 'Maharashtra / Karnataka / Other State Boards'],
  btech: ['Jawaharlal Nehru Technological University (JNTU)', 'Osmania University (OU)', 'Anna University', 'Visvesvaraya Technological University (VTU)', 'Autonomous Engineering College', 'IIT / NIT / IIIT'],
  nursing: ['Indian Nursing Council (INC)', 'KNR University of Health Sciences', 'Dr. NTR University of Health Sciences', 'RGUHS Bangalore', 'AIIMS / State Health University']
};

const STREAMS_BY_CAT: Record<EducationCategory, { branch: string; courses: string[] }[]> = {
  school: [
    { branch: 'Primary (Classes 1–5)', courses: ['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5'] },
    { branch: 'Middle (Classes 6–8)', courses: ['Class 6', 'Class 7', 'Class 8'] },
    { branch: 'Secondary (Classes 9–10)', courses: ['Class 9', 'Class 10'] },
  ],
  intermediate: [
    { branch: 'MPC (Maths, Physics, Chemistry)', courses: ['1st Year (Class 11)', '2nd Year (Class 12)'] },
    { branch: 'BiPC (Biology, Physics, Chemistry)', courses: ['1st Year (Class 11)', '2nd Year (Class 12)'] },
    { branch: 'MEC (Maths, Economics, Commerce)', courses: ['1st Year (Class 11)', '2nd Year (Class 12)'] },
    { branch: 'CEC (Civics, Economics, Commerce)', courses: ['1st Year (Class 11)', '2nd Year (Class 12)'] },
  ],
  btech: [
    { branch: 'Computer Science & Engineering (CSE)', courses: ['1st Year', '2nd Year', '3rd Year', '4th Year'] },
    { branch: 'Artificial Intelligence & Data Science (AI & DS)', courses: ['1st Year', '2nd Year', '3rd Year', '4th Year'] },
    { branch: 'Electronics & Communication Engineering (ECE)', courses: ['1st Year', '2nd Year', '3rd Year', '4th Year'] },
    { branch: 'Electrical & Electronics Engineering (EEE)', courses: ['1st Year', '2nd Year', '3rd Year', '4th Year'] },
    { branch: 'Mechanical Engineering', courses: ['1st Year', '2nd Year', '3rd Year', '4th Year'] },
    { branch: 'Civil Engineering', courses: ['1st Year', '2nd Year', '3rd Year', '4th Year'] },
  ],
  nursing: [
    { branch: 'B.Sc Nursing', courses: ['1st Year', '2nd Year', '3rd Year', '4th Year'] },
    { branch: 'General Nursing & Midwifery (GNM)', courses: ['1st Year', '2nd Year', '3rd Year'] },
    { branch: 'Auxiliary Nursing & Midwifery (ANM)', courses: ['1st Year', '2nd Year'] },
    { branch: 'Post Basic B.Sc Nursing', courses: ['1st Year', '2nd Year'] },
    { branch: 'M.Sc Nursing (Specialization)', courses: ['1st Year', '2nd Year'] },
  ]
};

const DEFAULT_SUBJECTS_MAP: Record<EducationCategory, string[]> = {
  school: ['Mathematics', 'Science (Physics, Chem, Bio)', 'Social Science', 'English', 'Regional Language'],
  intermediate: ['Mathematics / Biology', 'Physics', 'Chemistry', 'English', 'Sanskrit / Regional'],
  btech: ['Data Structures & Algorithms', 'Operating Systems', 'Database Management Systems', 'Computer Networks', 'Discrete Mathematics'],
  nursing: ['Anatomy and Physiology', 'Fundamentals of Nursing', 'Pharmacology', 'Medical-Surgical Nursing', 'Community Health Nursing']
};

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  isOpen,
  onClose,
  currentProfile,
  onSaveProfile
}) => {
  const [step, setStep] = useState<number>(1);
  const [fullName, setFullName] = useState(currentProfile.fullName);
  const [category, setCategory] = useState<EducationCategory>(currentProfile.category);
  const [board, setBoard] = useState(currentProfile.boardOrUniversity || BOARDS_BY_CAT[currentProfile.category][0]);
  const [stream, setStream] = useState(currentProfile.branchOrStream || STREAMS_BY_CAT[currentProfile.category][0].branch);
  const [course, setCourse] = useState(currentProfile.courseOrClass || '3rd Year');
  const [semester, setSemester] = useState<number>(currentProfile.semester || 5);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>(
    currentProfile.selectedSubjects.length > 0 ? currentProfile.selectedSubjects : DEFAULT_SUBJECTS_MAP[currentProfile.category]
  );
  const [language, setLanguage] = useState<PreferredLanguage>(currentProfile.preferredLanguage || 'en');
  const [dailyGoalMinutes, setDailyGoalMinutes] = useState(currentProfile.dailyGoalMinutes || 60);

  if (!isOpen) return null;

  const handleCategoryChange = (newCat: EducationCategory) => {
    setCategory(newCat);
    setBoard(BOARDS_BY_CAT[newCat][0]);
    setStream(STREAMS_BY_CAT[newCat][0].branch);
    setCourse(STREAMS_BY_CAT[newCat][0].courses[0]);
    setSelectedSubjects(DEFAULT_SUBJECTS_MAP[newCat]);
  };

  const handleToggleSubject = (sub: string) => {
    if (selectedSubjects.includes(sub)) {
      if (selectedSubjects.length > 1) {
        setSelectedSubjects(selectedSubjects.filter(s => s !== sub));
      }
    } else {
      setSelectedSubjects([...selectedSubjects, sub]);
    }
  };

  const handleFinish = () => {
    onSaveProfile({
      fullName,
      category,
      boardOrUniversity: board,
      branchOrStream: stream,
      courseOrClass: course,
      semester: category === 'btech' || category === 'nursing' ? semester : undefined,
      selectedSubjects,
      preferredLanguage: language,
      dailyGoalMinutes,
      isOnboarded: true
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Progress Bar Header */}
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40">
          <div className="flex items-center justify-between mb-3">
            <div>
              <span className="text-xs font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wider">
                Step {step} of 5 • Academic Personalization
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                {step === 1 && 'Select Your Education Category'}
                {step === 2 && 'Board / University & Course'}
                {step === 3 && 'Branch / Stream & Semester'}
                {step === 4 && 'Choose Your Focus Subjects'}
                {step === 5 && 'Language & Daily Study Goal'}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-200/50 dark:hover:bg-slate-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Stepper bar */}
          <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
            <div 
              className="bg-gradient-to-r from-brand-600 to-brand-accent h-full transition-all duration-300"
              style={{ width: `${(step / 5) * 100}%` }}
            />
          </div>
        </div>

        {/* Step Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Your Full Name
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-brand-500"
                  placeholder="Enter your name"
                />
              </div>

              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                Choose Primary Education Level
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { id: 'btech' as EducationCategory, title: 'B.Tech Engineering', desc: 'CSE, ECE, EEE, MECH, CIVIL, AI & DS (Sem 1-8)', icon: GraduationCap, color: 'from-blue-600 to-indigo-600' },
                  { id: 'nursing' as EducationCategory, title: 'Nursing Education', desc: 'ANM, GNM, B.Sc & M.Sc Nursing, Clinicals & Care Plans', icon: Stethoscope, color: 'from-rose-500 to-red-600' },
                  { id: 'intermediate' as EducationCategory, title: 'Intermediate (11th & 12th)', desc: 'MPC, BiPC, MEC, CEC with Board & Entrance Prep', icon: BookMarked, color: 'from-amber-500 to-yellow-600' },
                  { id: 'school' as EducationCategory, title: 'School (Classes 1–10)', desc: 'CBSE, ICSE, State Boards with Worksheets & Quizzes', icon: School, color: 'from-emerald-500 to-teal-600' },
                ].map((item) => {
                  const Icon = item.icon;
                  const isSelected = category === item.id;
                  return (
                    <div
                      key={item.id}
                      onClick={() => handleCategoryChange(item.id)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                        isSelected 
                          ? 'border-brand-500 bg-brand-50/50 dark:bg-brand-950/40 ring-2 ring-brand-500/20'
                          : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${item.color} text-white flex items-center justify-center shrink-0`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                            {item.title}
                          </h4>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                            {item.desc}
                          </p>
                        </div>
                        {isSelected && (
                          <div className="w-6 h-6 rounded-full bg-brand-500 text-white flex items-center justify-center">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Select Board or University
                </label>
                <div className="space-y-2">
                  {BOARDS_BY_CAT[category].map((b, i) => (
                    <div
                      key={i}
                      onClick={() => setBoard(b)}
                      className={`p-3 rounded-xl border text-xs font-semibold cursor-pointer transition-all flex items-center justify-between ${
                        board === b 
                          ? 'border-brand-500 bg-brand-50 dark:bg-brand-950/40 text-brand-700 dark:text-brand-300' 
                          : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                      }`}
                    >
                      <span>{b}</span>
                      {board === b && <Check className="w-4 h-4 text-brand-600 stroke-[3]" />}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Select Branch or Stream
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {STREAMS_BY_CAT[category].map((s, i) => (
                    <div
                      key={i}
                      onClick={() => {
                        setStream(s.branch);
                        setCourse(s.courses[0]);
                      }}
                      className={`p-3 rounded-xl border text-xs font-semibold cursor-pointer transition-all flex items-center justify-between ${
                        stream === s.branch
                          ? 'border-brand-500 bg-brand-50 dark:bg-brand-950/40 text-brand-700 dark:text-brand-300'
                          : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                      }`}
                    >
                      <span>{s.branch}</span>
                      {stream === s.branch && <Check className="w-4 h-4 text-brand-600 stroke-[3]" />}
                    </div>
                  ))}
                </div>
              </div>

              {(category === 'btech' || category === 'nursing') && (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Select Current Semester
                  </label>
                  <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                      <button
                        key={sem}
                        type="button"
                        onClick={() => setSemester(sem)}
                        className={`py-2 rounded-xl text-xs font-bold transition-all ${
                          semester === sem
                            ? 'bg-brand-600 text-white shadow-sm'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                        }`}
                      >
                        Sem {sem}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">
                  Select the subjects you are studying this academic year. You can customize them anytime.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {DEFAULT_SUBJECTS_MAP[category].map((sub, i) => {
                    const isChecked = selectedSubjects.includes(sub);
                    return (
                      <div
                        key={i}
                        onClick={() => handleToggleSubject(sub)}
                        className={`p-3 rounded-xl border text-xs font-bold cursor-pointer transition-all flex items-center justify-between ${
                          isChecked
                            ? 'border-brand-500 bg-brand-50 dark:bg-brand-950/40 text-brand-700 dark:text-brand-300'
                            : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                        }`}
                      >
                        <span>{sub}</span>
                        <div className={`w-4 h-4 rounded flex items-center justify-center border ${
                          isChecked ? 'bg-brand-600 border-brand-600 text-white' : 'border-slate-300 dark:border-slate-700'
                        }`}>
                          {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-1.5">
                  <Globe className="w-4 h-4 text-brand-500" />
                  <span>Preferred Learning & AI Tutor Language</span>
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'en' as PreferredLanguage, label: 'English', sub: 'Global English' },
                    { id: 'te' as PreferredLanguage, label: 'తెలుగు (Telugu)', sub: 'ఆంధ్ర & తెలంగాణ' },
                    { id: 'hi' as PreferredLanguage, label: 'हिंदी (Hindi)', sub: 'राष्ट्रीय भाषा' },
                  ].map((lang) => (
                    <div
                      key={lang.id}
                      onClick={() => setLanguage(lang.id)}
                      className={`p-3 rounded-xl border text-center cursor-pointer transition-all ${
                        language === lang.id
                          ? 'border-brand-500 bg-brand-50 dark:bg-brand-950/40 ring-2 ring-brand-500/20 text-brand-700 dark:text-brand-300'
                          : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                      }`}
                    >
                      <h5 className="font-bold text-xs sm:text-sm">{lang.label}</h5>
                      <span className="text-[10px] text-slate-400 block mt-0.5">{lang.sub}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Daily Study Target
                  </label>
                  <span className="text-xs font-bold text-brand-600 dark:text-brand-400">
                    {dailyGoalMinutes} Minutes / Day
                  </span>
                </div>
                <input
                  type="range"
                  min="15"
                  max="180"
                  step="15"
                  value={dailyGoalMinutes}
                  onChange={(e) => setDailyGoalMinutes(Number(e.target.value))}
                  className="w-full accent-brand-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                  <span>15 min (Light)</span>
                  <span>60 min (Recommended)</span>
                  <span>3 Hours (Exam Sprint)</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/60 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          {step > 1 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-slate-700 rounded-xl transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          ) : <div />}

          {step < 5 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="flex items-center gap-1.5 px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold rounded-xl shadow-md transition-all hover:scale-105"
            >
              <span>Next Step</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleFinish}
              className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-brand-600 to-brand-accent hover:from-brand-700 hover:to-brand-accentHover text-white text-xs font-bold rounded-xl shadow-lg shadow-brand-500/25 transition-all hover:scale-105"
            >
              <Sparkles className="w-4 h-4" />
              <span>Save & Launch My Dashboard</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
};

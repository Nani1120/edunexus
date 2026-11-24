import React, { useState, useMemo } from 'react';
import { 
  BookOpen, 
  Search, 
  Filter, 
  Bookmark, 
  Download, 
  CheckCircle2, 
  Clock, 
  Share2, 
  AlertCircle, 
  Sparkles, 
  ChevronDown,
  Layers,
  GraduationCap
} from 'lucide-react';
import { StudyMaterial, Subject, EducationCategory, MaterialType, PreferredLanguage } from '../../types';

interface MaterialsViewProps {
  materials: StudyMaterial[];
  subjects: Subject[];
  onOpenMaterial: (material: StudyMaterial) => void;
  bookmarks: string[];
  onToggleBookmark: (id: string) => void;
  downloads: string[];
  onDownload: (id: string) => void;
  onOpenReport: (material: StudyMaterial) => void;
  currentCategory: EducationCategory;
}

export const MaterialsView: React.FC<MaterialsViewProps> = ({
  materials,
  subjects,
  onOpenMaterial,
  bookmarks,
  onToggleBookmark,
  downloads,
  onDownload,
  onOpenReport,
  currentCategory
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCat, setSelectedCat] = useState<string>(currentCategory);
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedLang, setSelectedLang] = useState<string>('all');
  const [showVerifiedOnly, setShowVerifiedOnly] = useState(false);

  // Subject options according to category
  const filteredSubjectOptions = useMemo(() => {
    if (selectedCat === 'all') return subjects;
    return subjects.filter(s => s.category === selectedCat);
  }, [selectedCat, subjects]);

  // Master filtered list
  const filteredMaterials = useMemo(() => {
    return materials.filter(m => {
      const matchSearch = !searchQuery || 
        m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchCat = selectedCat === 'all' || m.category === selectedCat;
      const matchSubject = selectedSubject === 'all' || m.subjectId === selectedSubject;
      const matchType = selectedType === 'all' || m.materialType === selectedType;
      const matchLang = selectedLang === 'all' || m.language === selectedLang;
      const matchVerified = !showVerifiedOnly || m.verificationStatus === 'verified' || m.verificationStatus === 'official';

      return matchSearch && matchCat && matchSubject && matchType && matchLang && matchVerified;
    });
  }, [materials, searchQuery, selectedCat, selectedSubject, selectedType, selectedLang, showVerifiedOnly]);

  return (
    <div className="space-y-6 animate-fadeIn pb-16">
      
      {/* Title & Stats */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <BookOpen className="w-7 h-7 text-brand-600" />
            <span>Academic Library</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Searchable repository of accredited lecture notes, solved PYQs, formula books & lab manuals.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
          <span className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <strong>{filteredMaterials.length}</strong> items found
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        
        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search within documents by title, chapter, tag, or topic..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>

        {/* Dropdown Filters Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {/* Education Level */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
              Education Level
            </label>
            <select
              value={selectedCat}
              onChange={(e) => {
                setSelectedCat(e.target.value);
                setSelectedSubject('all');
              }}
              className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none"
            >
              <option value="all">All Levels</option>
              <option value="btech">B.Tech Engineering</option>
              <option value="nursing">Nursing Education</option>
              <option value="intermediate">Intermediate (11-12)</option>
              <option value="school">School (Classes 1-10)</option>
            </select>
          </div>

          {/* Subject */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
              Subject
            </label>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none truncate"
            >
              <option value="all">All Subjects</option>
              {filteredSubjectOptions.map(s => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </div>

          {/* Material Type */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
              Resource Format
            </label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none"
            >
              <option value="all">All Formats</option>
              <option value="pdf_notes">Lecture Notes (PDF)</option>
              <option value="pyq">Previous Papers (PYQ)</option>
              <option value="formula_sheet">Formula & Derivations</option>
              <option value="care_plan">Nursing Care Plans</option>
              <option value="drug_study">Pharmacology Drug Study</option>
              <option value="mcqs">Topic MCQs</option>
              <option value="study_guide">Study Guides</option>
            </select>
          </div>

          {/* Language & Verified Toggle */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
              Language
            </label>
            <select
              value={selectedLang}
              onChange={(e) => setSelectedLang(e.target.value)}
              className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none"
            >
              <option value="all">All Languages</option>
              <option value="en">English</option>
              <option value="te">తెలుగు (Telugu)</option>
              <option value="hi">हिंदी (Hindi)</option>
            </select>
          </div>
        </div>

        {/* Verified Only Checkbox */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
          <label className="flex items-center gap-2 cursor-pointer text-slate-600 dark:text-slate-300 font-medium">
            <input
              type="checkbox"
              checked={showVerifiedOnly}
              onChange={(e) => setShowVerifiedOnly(e.target.checked)}
              className="rounded text-brand-600 focus:ring-brand-500 accent-brand-600 w-4 h-4"
            />
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              Verified Syllabus & Official University Faculty Only
            </span>
          </label>

          {(searchQuery || selectedCat !== 'all' || selectedSubject !== 'all' || selectedType !== 'all') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCat('all');
                setSelectedSubject('all');
                setSelectedType('all');
                setSelectedLang('all');
                setShowVerifiedOnly(false);
              }}
              className="text-xs text-brand-600 dark:text-brand-400 font-bold hover:underline"
            >
              Clear Filters
            </button>
          )}
        </div>

      </div>

      {/* Materials Results Grid */}
      {filteredMaterials.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMaterials.map((mat) => {
            const isBookmarked = bookmarks.includes(mat.id);
            const isDownloaded = downloads.includes(mat.id);

            return (
              <div
                key={mat.id}
                onClick={() => onOpenMaterial(mat)}
                className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs hover:shadow-md hover:border-brand-400 dark:hover:border-brand-600 transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-brand-50 dark:bg-brand-950/80 text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-900">
                      {mat.materialType.replace('_', ' ')}
                    </span>
                    <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => onToggleBookmark(mat.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-amber-500 transition-colors"
                        title={isBookmarked ? 'Remove Bookmark' : 'Add to Bookmarks'}
                      >
                        <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-500 text-amber-500' : ''}`} />
                      </button>
                      <button
                        onClick={() => onDownload(mat.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-500 transition-colors"
                        title={isDownloaded ? 'Downloaded Offline' : 'Save Offline'}
                      >
                        <Download className={`w-4 h-4 ${isDownloaded ? 'text-emerald-500' : ''}`} />
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-[11px] text-slate-400 font-medium mb-1">
                    <span>{mat.subjectName}</span>
                    <span>•</span>
                    <span>{mat.course}</span>
                  </div>

                  <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white group-hover:text-brand-600 transition-colors line-clamp-2">
                    {mat.title}
                  </h3>

                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                    {mat.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-400">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{mat.readTimeMinutes} mins</span>
                    {mat.verificationStatus === 'verified' && (
                      <span className="flex items-center gap-0.5 text-emerald-600 font-semibold ml-2 text-[11px]">
                        <CheckCircle2 className="w-3 h-3" /> Verified
                      </span>
                    )}
                  </div>
                  <span className="font-bold text-brand-600 dark:text-brand-400 group-hover:translate-x-0.5 transition-transform">
                    Read Document →
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="p-12 text-center rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <BookOpen className="w-12 h-12 text-slate-400 mx-auto mb-3 opacity-40" />
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            No study materials found
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
            Try adjusting your filters or search keywords. You can also ask the AI Tutor to generate notes for this topic.
          </p>
        </div>
      )}

    </div>
  );
};

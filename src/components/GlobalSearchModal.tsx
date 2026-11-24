import React, { useState, useEffect, useMemo } from 'react';
import { 
  X, 
  Search, 
  BookOpen, 
  FileText, 
  GraduationCap, 
  Sparkles, 
  Clock, 
  ChevronRight, 
  Filter, 
  CheckCircle2,
  Stethoscope
} from 'lucide-react';
import { StudyMaterial, Subject, EducationCategory } from '../types';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  materials: StudyMaterial[];
  subjects: Subject[];
  onSelectMaterial: (material: StudyMaterial) => void;
  onSelectSubject: (subject: Subject) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  materials,
  subjects,
  onSelectMaterial,
  onSelectSubject
}) => {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [recentSearches, setRecentSearches] = useState<string[]>([
    'AVL Tree Rotations',
    'Cardiac Conduction',
    'Bankers Algorithm',
    'Class 10 Real Numbers',
    'Organic Chemistry Reimer-Tiemann'
  ]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        // Toggle modal
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const filteredMaterials = useMemo(() => {
    if (!query.trim() && selectedCategory === 'all' && selectedType === 'all') return [];
    const q = query.toLowerCase().trim();

    return materials.filter(m => {
      const matchQuery = !q || (
        m.title.toLowerCase().includes(q) ||
        m.description.toLowerCase().includes(q) ||
        m.subjectName.toLowerCase().includes(q) ||
        m.tags.some(t => t.toLowerCase().includes(q))
      );
      const matchCat = selectedCategory === 'all' || m.category === selectedCategory;
      const matchType = selectedType === 'all' || m.materialType === selectedType;
      return matchQuery && matchCat && matchType;
    });
  }, [query, selectedCategory, selectedType, materials]);

  const filteredSubjects = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();
    return subjects.filter(s => 
      s.name.toLowerCase().includes(q) || 
      s.description.toLowerCase().includes(q) ||
      (s.code && s.code.toLowerCase().includes(q))
    );
  }, [query, subjects]);

  if (!isOpen) return null;

  const handlePickSearch = (term: string) => {
    setQuery(term);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-12 sm:pt-20 px-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[80vh]">
        
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-brand-500" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search notes, PYQs, subjects, topics, formulas..."
            autoFocus
            className="flex-1 bg-transparent border-none text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold"
          >
            Esc
          </button>
        </div>

        {/* Filter Pills */}
        <div className="px-4 py-2.5 bg-slate-50/70 dark:bg-slate-800/40 border-b border-slate-200 dark:border-slate-800 flex items-center gap-2 overflow-x-auto text-xs no-scrollbar">
          <span className="text-slate-400 font-semibold flex items-center gap-1 shrink-0">
            <Filter className="w-3.5 h-3.5" /> Filters:
          </span>
          {[
            { id: 'all', label: 'All Levels' },
            { id: 'btech', label: 'B.Tech' },
            { id: 'nursing', label: 'Nursing' },
            { id: 'intermediate', label: 'Inter' },
            { id: 'school', label: 'School' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-2.5 py-1 rounded-full font-medium shrink-0 transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-brand-600 text-white font-bold'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100'
              }`}
            >
              {cat.label}
            </button>
          ))}

          <span className="text-slate-300 dark:text-slate-700">|</span>

          {[
            { id: 'all', label: 'All Types' },
            { id: 'pdf_notes', label: 'Notes' },
            { id: 'pyq', label: 'PYQs' },
            { id: 'formula_sheet', label: 'Formulas' },
            { id: 'care_plan', label: 'Care Plans' },
          ].map((type) => (
            <button
              key={type.id}
              onClick={() => setSelectedType(type.id)}
              className={`px-2.5 py-1 rounded-full font-medium shrink-0 transition-colors ${
                selectedType === type.id
                  ? 'bg-slate-800 dark:bg-slate-200 text-white dark:text-slate-900 font-bold'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100'
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>

        {/* Search Results / Suggestions */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {!query.trim() && (
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Recent Trending Searches
              </p>
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((term, i) => (
                  <button
                    key={i}
                    onClick={() => handlePickSearch(term)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-800 hover:bg-brand-50 hover:text-brand-600 dark:hover:bg-brand-950/60 dark:hover:text-brand-300 text-slate-700 dark:text-slate-300 transition-colors"
                  >
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span>{term}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Subjects match */}
          {filteredSubjects.length > 0 && (
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Subjects Found ({filteredSubjects.length})
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {filteredSubjects.map(sub => (
                  <div
                    key={sub.id}
                    onClick={() => {
                      onSelectSubject(sub);
                      onClose();
                    }}
                    className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/80 hover:border-brand-500 cursor-pointer transition-all flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-brand-100 dark:bg-brand-900/60 text-brand-600 dark:text-brand-400 flex items-center justify-center">
                        <BookOpen className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-brand-600 transition-colors">
                          {sub.name}
                        </h4>
                        <p className="text-[10px] text-slate-400">
                          {sub.semesterOrClass} • {sub.totalMaterials} materials
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Materials match */}
          {filteredMaterials.length > 0 && (
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Study Materials ({filteredMaterials.length})
              </p>
              <div className="space-y-2">
                {filteredMaterials.map(mat => (
                  <div
                    key={mat.id}
                    onClick={() => {
                      onSelectMaterial(mat);
                      onClose();
                    }}
                    className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/80 hover:border-brand-500 cursor-pointer transition-all group"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-brand-50 dark:bg-brand-950/70 text-brand-600 dark:text-brand-300 border border-brand-200 dark:border-brand-800">
                            {mat.materialType.replace('_', ' ')}
                          </span>
                          <span className="text-[10px] text-slate-400">
                            {mat.subjectName}
                          </span>
                          {mat.verificationStatus === 'verified' && (
                            <span className="flex items-center gap-0.5 text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">
                              <CheckCircle2 className="w-3 h-3" /> Verified
                            </span>
                          )}
                        </div>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-brand-600 transition-colors">
                          {mat.title}
                        </h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                          {mat.description}
                        </p>
                      </div>
                      <span className="text-xs font-medium text-slate-400 whitespace-nowrap flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {mat.readTimeMinutes}m
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {query.trim() && filteredMaterials.length === 0 && filteredSubjects.length === 0 && (
            <div className="py-12 text-center">
              <Search className="w-8 h-8 text-slate-400 mx-auto mb-2 opacity-50" />
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                No matching materials found for "{query}"
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Try searching by subject name, topic, or broader keywords.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

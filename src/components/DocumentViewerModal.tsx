import React, { useState } from 'react';
import { 
  X, 
  Bookmark, 
  Download, 
  Share2, 
  AlertCircle, 
  CheckCircle2, 
  Sparkles, 
  Type, 
  BookOpen, 
  Printer, 
  Check, 
  ArrowLeft,
  ChevronDown
} from 'lucide-react';
import { StudyMaterial } from '../types';

interface DocumentViewerModalProps {
  material: StudyMaterial | null;
  isOpen: boolean;
  onClose: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
  isDownloaded: boolean;
  onDownload: (id: string) => void;
  onOpenReport: (material: StudyMaterial) => void;
  onAskAIAboutNote: (material: StudyMaterial) => void;
}

export const DocumentViewerModal: React.FC<DocumentViewerModalProps> = ({
  material,
  isOpen,
  onClose,
  isBookmarked,
  onToggleBookmark,
  isDownloaded,
  onDownload,
  onOpenReport,
  onAskAIAboutNote
}) => {
  const [fontSize, setFontSize] = useState<'sm' | 'base' | 'lg' | 'xl'>('base');
  const [readingTheme, setReadingTheme] = useState<'default' | 'sepia' | 'dark'>('default');
  const [copiedLink, setCopiedLink] = useState(false);

  if (!isOpen || !material) return null;

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const themeClasses = {
    default: 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100',
    sepia: 'bg-[#fcf8ed] text-[#433422] border-[#e8dfc8]',
    dark: 'bg-slate-950 text-slate-100 border-slate-800'
  }[readingTheme];

  const fontSizeClasses = {
    sm: 'text-xs leading-relaxed',
    base: 'text-sm sm:text-base leading-relaxed',
    lg: 'text-base sm:text-lg leading-relaxed',
    xl: 'text-lg sm:text-xl leading-relaxed'
  }[fontSize];

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      
      {/* Top Action Toolbar */}
      <div className="w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 py-3 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back</span>
          </button>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-brand-100 dark:bg-brand-950/80 text-brand-700 dark:text-brand-300">
                {material.materialType.replace('_', ' ')}
              </span>
              <span className="text-xs font-semibold text-slate-500 truncate max-w-[200px] sm:max-w-md">
                {material.subjectName}
              </span>
            </div>
            <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white truncate max-w-[240px] sm:max-w-lg">
              {material.title}
            </h2>
          </div>
        </div>

        {/* Reader Controls */}
        <div className="flex items-center gap-2">
          {/* Font Size Adjuster */}
          <div className="hidden sm:flex items-center bg-slate-100 dark:bg-slate-800 rounded-lg p-0.5 text-xs font-semibold text-slate-600 dark:text-slate-400">
            <button
              onClick={() => setFontSize('sm')}
              className={`px-2 py-1 rounded ${fontSize === 'sm' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs' : ''}`}
            >
              A-
            </button>
            <button
              onClick={() => setFontSize('base')}
              className={`px-2 py-1 rounded ${fontSize === 'base' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs' : ''}`}
            >
              A
            </button>
            <button
              onClick={() => setFontSize('lg')}
              className={`px-2 py-1 rounded ${fontSize === 'lg' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs' : ''}`}
            >
              A+
            </button>
          </div>

          {/* Ask AI about this Document */}
          <button
            onClick={() => {
              onClose();
              onAskAIAboutNote(material);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-brand-600 to-brand-accent text-white rounded-lg text-xs font-bold shadow-sm hover:scale-105 transition-all"
            title="Ask AI Tutor to explain or quiz you on this document"
          >
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span className="hidden md:inline">Ask AI Tutor</span>
          </button>

          {/* Bookmark */}
          <button
            onClick={() => onToggleBookmark(material.id)}
            className={`p-2 rounded-lg border transition-colors ${
              isBookmarked
                ? 'bg-amber-50 dark:bg-amber-950/60 border-amber-300 dark:border-amber-700 text-amber-600'
                : 'text-slate-500 border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
            title={isBookmarked ? 'Remove Bookmark' : 'Save to Bookmarks'}
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
          </button>

          {/* Offline Download */}
          <button
            onClick={() => onDownload(material.id)}
            className={`p-2 rounded-lg border transition-colors ${
              isDownloaded
                ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-300 dark:border-emerald-700 text-emerald-600'
                : 'text-slate-500 border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
            title={isDownloaded ? 'Downloaded Offline' : 'Download for Offline Reading'}
          >
            <Download className="w-4 h-4" />
          </button>

          {/* Share */}
          <button
            onClick={handleShare}
            className="p-2 text-slate-500 border border-slate-200 dark:border-slate-800 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Share note link"
          >
            {copiedLink ? <Check className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4" />}
          </button>

          {/* Report */}
          <button
            onClick={() => onOpenReport(material)}
            className="p-2 text-slate-400 hover:text-red-500 border border-slate-200 dark:border-slate-800 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Report an error or copyright concern"
          >
            <AlertCircle className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Document Body */}
      <div className="flex-1 overflow-y-auto px-4 py-8">
        <div className={`max-w-4xl mx-auto rounded-2xl shadow-xl border p-6 sm:p-10 transition-all ${themeClasses}`}>
          
          {/* Header Metadata */}
          <div className="border-b border-slate-200/60 dark:border-slate-800 pb-6 mb-8">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-brand-500 text-white">
                {material.course}
              </span>
              <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                {material.boardOrUniversity}
              </span>
              {material.verificationStatus === 'verified' && (
                <span className="flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Official Verified Syllabus
                </span>
              )}
            </div>

            <h1 className="text-xl sm:text-3xl font-extrabold tracking-tight">
              {material.title}
            </h1>

            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              {material.description}
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-slate-400">
              <span>Author / Source: <strong className="text-slate-700 dark:text-slate-300">{material.authorOrSource}</strong></span>
              <span>•</span>
              <span>Estimated Reading: <strong className="text-slate-700 dark:text-slate-300">{material.readTimeMinutes} mins</strong></span>
              {material.pageCount && (
                <>
                  <span>•</span>
                  <span>Pages: <strong className="text-slate-700 dark:text-slate-300">{material.pageCount}</strong></span>
                </>
              )}
            </div>
          </div>

          {/* Formatted Markdown / Document Text Content */}
          <article className={`prose dark:prose-invert max-w-none ${fontSizeClasses}`}>
            {material.contentBody ? (
              <div 
                className="whitespace-pre-line leading-relaxed font-sans"
                dangerouslySetInnerHTML={{
                  __html: material.contentBody
                    .replace(/### (.*)/g, '<h3 class="text-lg font-bold text-slate-900 dark:text-white mt-4 mb-2">$1</h3>')
                    .replace(/## (.*)/g, '<h2 class="text-xl font-bold text-slate-900 dark:text-white mt-6 mb-3 border-b border-slate-200 dark:border-slate-800 pb-1">$1</h2>')
                    .replace(/# (.*)/g, '<h1 class="text-2xl font-black text-slate-900 dark:text-white mt-8 mb-4">$1</h1>')
                    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-slate-900 dark:text-slate-100">$1</strong>')
                    .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
                }}
              />
            ) : (
              <p className="text-slate-500 italic">No text content available.</p>
            )}
          </article>

          {/* Tags */}
          <div className="mt-10 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-semibold text-slate-400 mr-2">Tags:</span>
            {material.tags.map((tag, i) => (
              <span 
                key={i}
                className="text-xs px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-full font-medium"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Clinical / Educational Safety Notice for Nursing */}
          {material.category === 'nursing' && (
            <div className="mt-6 p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-xs text-rose-800 dark:text-rose-300">
              <strong className="block font-bold mb-1">Nursing & Clinical Educational Disclaimer:</strong>
              This material is designed solely for nursing students preparing for academic and council examinations. Clinical procedures, medication dosages, and patient interventions must always comply with approved hospital protocols, physician orders, and institutional policies.
            </div>
          )}

          {/* Footer Interactive Actions */}
          <div className="mt-8 p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-brand-600" />
              <div>
                <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  Ready to test your understanding?
                </p>
                <p className="text-[11px] text-slate-500">
                  Take the instant 5-question topic quiz or generate flashcards.
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                onClose();
                onAskAIAboutNote(material);
              }}
              className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-lg text-xs font-bold transition-all shadow-md"
            >
              Quiz Me on This Note
            </button>
          </div>

        </div>
      </div>

    </div>
  );
};

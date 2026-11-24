import React, { useState } from 'react';
import { 
  User, 
  Settings, 
  Bookmark, 
  Download, 
  Flame, 
  Clock, 
  Award, 
  Moon, 
  Sun, 
  Globe, 
  Bell, 
  ShieldCheck, 
  RotateCcw, 
  BookOpen, 
  Sparkles, 
  Crown, 
  CheckCircle2, 
  ChevronRight,
  Database,
  Trash2
} from 'lucide-react';
import { StudentProfile, StudyMaterial, PreferredLanguage } from '../../types';

interface ProfileViewProps {
  profile: StudentProfile;
  materials: StudyMaterial[];
  bookmarks: string[];
  downloads: string[];
  onToggleBookmark: (id: string) => void;
  onRemoveDownload: (id: string) => void;
  onOpenMaterial: (material: StudyMaterial) => void;
  onUpdateProfile: (updated: Partial<StudentProfile>) => void;
  onOpenOnboarding: () => void;
  onOpenPremium: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onResetData: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  profile,
  materials,
  bookmarks,
  downloads,
  onToggleBookmark,
  onRemoveDownload,
  onOpenMaterial,
  onUpdateProfile,
  onOpenOnboarding,
  onOpenPremium,
  darkMode,
  onToggleDarkMode,
  onResetData
}) => {
  const [activeTab, setActiveTab] = useState<'library' | 'settings'>('library');
  const [libraryFilter, setLibraryFilter] = useState<'bookmarks' | 'downloads'>('bookmarks');
  const [notificationEnabled, setNotificationEnabled] = useState(true);

  const bookmarkedMaterials = materials.filter(m => bookmarks.includes(m.id));
  const downloadedMaterials = materials.filter(m => downloads.includes(m.id));

  return (
    <div className="space-y-6 animate-fadeIn pb-16">
      
      {/* Profile Header Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-white via-slate-50 to-brand-50/30 dark:from-slate-900 dark:via-slate-900 dark:to-brand-950/20 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-brand-600 via-brand-500 to-brand-accent text-white font-black text-2xl flex items-center justify-center shadow-lg shadow-brand-500/25 border-4 border-white dark:border-slate-800">
            {profile.fullName.split(' ').map(n => n[0]).join('').slice(0, 2)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                {profile.fullName}
              </h1>
              {profile.isPremium ? (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 flex items-center gap-1 shadow-xs">
                  <Crown className="w-3 h-3 fill-current" /> Pro
                </span>
              ) : (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                  Student
                </span>
              )}
            </div>

            <p className="text-xs sm:text-sm font-semibold text-brand-600 dark:text-brand-400 mt-0.5">
              {profile.category.toUpperCase()} • {profile.courseOrClass} {profile.branchOrStream ? `(${profile.branchOrStream})` : ''}
            </p>
            <p className="text-xs text-slate-400 mt-0.5">
              {profile.boardOrUniversity}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenOnboarding}
            className="px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-slate-50 transition-colors shadow-xs"
          >
            Edit Academic Profile
          </button>
          {!profile.isPremium && (
            <button
              onClick={onOpenPremium}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-brand-600 to-brand-accent text-white text-xs font-bold shadow-md hover:scale-105 transition-all"
            >
              Upgrade to Pro
            </button>
          )}
        </div>
      </div>

      {/* Progress & Gamification Stat Counters */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs text-center">
          <Flame className="w-6 h-6 text-amber-500 fill-amber-500 mx-auto mb-1" />
          <span className="text-2xl font-black text-slate-900 dark:text-white">
            {profile.streakDays} Days
          </span>
          <p className="text-[11px] text-slate-400 font-semibold mt-0.5">Study Streak</p>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs text-center">
          <Clock className="w-6 h-6 text-brand-500 mx-auto mb-1" />
          <span className="text-2xl font-black text-slate-900 dark:text-white">
            {profile.minutesStudiedToday}m
          </span>
          <p className="text-[11px] text-slate-400 font-semibold mt-0.5">Studied Today</p>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs text-center">
          <Bookmark className="w-6 h-6 text-indigo-500 mx-auto mb-1" />
          <span className="text-2xl font-black text-slate-900 dark:text-white">
            {bookmarks.length}
          </span>
          <p className="text-[11px] text-slate-400 font-semibold mt-0.5">Saved Notes</p>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs text-center">
          <Download className="w-6 h-6 text-emerald-500 mx-auto mb-1" />
          <span className="text-2xl font-black text-slate-900 dark:text-white">
            {downloads.length}
          </span>
          <p className="text-[11px] text-slate-400 font-semibold mt-0.5">Offline Files</p>
        </div>
      </div>

      {/* Main Tab Toggle: Library vs Settings */}
      <div className="flex items-center gap-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl max-w-sm">
        <button
          onClick={() => setActiveTab('library')}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'library'
              ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>My Personal Library</span>
        </button>
        <button
          onClick={() => setActiveTab('settings')}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'settings'
              ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          <Settings className="w-3.5 h-3.5" />
          <span>App Settings</span>
        </button>
      </div>

      {/* TAB 1: MY LIBRARY */}
      {activeTab === 'library' && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setLibraryFilter('bookmarks')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                libraryFilter === 'bookmarks'
                  ? 'bg-brand-600 text-white'
                  : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
              }`}
            >
              Bookmarked Notes ({bookmarkedMaterials.length})
            </button>
            <button
              onClick={() => setLibraryFilter('downloads')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                libraryFilter === 'downloads'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
              }`}
            >
              Downloaded Offline Files ({downloadedMaterials.length})
            </button>
          </div>

          {/* Library Cards Grid */}
          {libraryFilter === 'bookmarks' ? (
            bookmarkedMaterials.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {bookmarkedMaterials.map(mat => (
                  <div
                    key={mat.id}
                    onClick={() => onOpenMaterial(mat)}
                    className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-brand-400 cursor-pointer transition-all flex items-center justify-between group"
                  >
                    <div>
                      <span className="text-[10px] font-bold uppercase text-brand-600">
                        {mat.materialType.replace('_', ' ')} • {mat.subjectName}
                      </span>
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-brand-600">
                        {mat.title}
                      </h4>
                      <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">{mat.description}</p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleBookmark(mat.id);
                      }}
                      className="p-2 text-amber-500 hover:text-slate-400"
                      title="Remove bookmark"
                    >
                      <Bookmark className="w-4 h-4 fill-current" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs text-slate-400">
                No bookmarked notes yet. Tap the bookmark icon on any material to save it here.
              </div>
            )
          ) : (
            downloadedMaterials.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {downloadedMaterials.map(mat => (
                  <div
                    key={mat.id}
                    onClick={() => onOpenMaterial(mat)}
                    className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-emerald-400 cursor-pointer transition-all flex items-center justify-between group"
                  >
                    <div>
                      <span className="text-[10px] font-bold uppercase text-emerald-600 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Available Offline • {mat.subjectName}
                      </span>
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-emerald-600">
                        {mat.title}
                      </h4>
                      <p className="text-xs text-slate-400 mt-0.5">{mat.readTimeMinutes} min reading time</p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onRemoveDownload(mat.id);
                      }}
                      className="p-2 text-slate-400 hover:text-red-500"
                      title="Delete offline file"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs text-slate-400">
                No offline files downloaded yet. Tap download on any study note for full offline access.
              </div>
            )
          )}
        </div>
      )}

      {/* TAB 2: SETTINGS */}
      {activeTab === 'settings' && (
        <div className="space-y-4">
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-5">
            
            {/* Preferred Language */}
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Globe className="w-4 h-4 text-brand-600" />
                  <span>Language Preference</span>
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Content and AI Tutor default response language
                </p>
              </div>

              <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-semibold">
                {[
                  { id: 'en' as PreferredLanguage, label: 'EN' },
                  { id: 'te' as PreferredLanguage, label: 'తెలుగు' },
                  { id: 'hi' as PreferredLanguage, label: 'हिंदी' },
                ].map(l => (
                  <button
                    key={l.id}
                    onClick={() => onUpdateProfile({ preferredLanguage: l.id })}
                    className={`px-3 py-1 rounded-lg transition-all ${
                      profile.preferredLanguage === l.id
                        ? 'bg-brand-600 text-white font-bold'
                        : 'text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </div>

            <hr className="border-slate-100 dark:border-slate-800" />

            {/* Dark Mode */}
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  {darkMode ? <Moon className="w-4 h-4 text-indigo-400" /> : <Sun className="w-4 h-4 text-amber-500" />}
                  <span>Display Theme</span>
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Switch between Dark and Light mode
                </p>
              </div>

              <button
                onClick={onToggleDarkMode}
                className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-200 transition-colors"
              >
                {darkMode ? 'Dark Mode (Active)' : 'Light Mode (Active)'}
              </button>
            </div>

            <hr className="border-slate-100 dark:border-slate-800" />

            {/* Notifications */}
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Bell className="w-4 h-4 text-amber-500" />
                  <span>Exam Countdown & Daily Study Reminders</span>
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Receive notifications to maintain your daily study streak
                </p>
              </div>

              <button
                onClick={() => setNotificationEnabled(!notificationEnabled)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                  notificationEnabled
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
                }`}
              >
                {notificationEnabled ? 'Enabled' : 'Disabled'}
              </button>
            </div>

            <hr className="border-slate-100 dark:border-slate-800" />

            {/* Backend Database Status */}
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Database className="w-4 h-4 text-emerald-500" />
                  <span>Backend Storage & Cloud Sync Engine</span>
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Supabase schema active with local persistent caching
                </p>
              </div>

              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Operational
              </span>
            </div>

            <hr className="border-slate-100 dark:border-slate-800" />

            {/* Reset Data */}
            <div className="flex items-center justify-between pt-2">
              <div>
                <h4 className="text-sm font-bold text-red-600">
                  Reset App Data
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Restore default initial mock data, subjects, and exams
                </p>
              </div>

              <button
                onClick={() => {
                  if (confirm('Reset all EduNexus data back to default initial state?')) {
                    onResetData();
                  }
                }}
                className="px-4 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 dark:bg-red-950/60 dark:text-red-300 text-xs font-bold border border-red-200 dark:border-red-800 transition-colors"
              >
                Reset Everything
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

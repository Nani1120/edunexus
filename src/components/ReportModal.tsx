import React, { useState } from 'react';
import { X, AlertTriangle, Check, ShieldAlert } from 'lucide-react';
import { StudyMaterial, UserReport } from '../types';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  material: StudyMaterial | null;
  onSubmitReport: (report: UserReport) => void;
  userName: string;
}

export const ReportModal: React.FC<ReportModalProps> = ({
  isOpen,
  onClose,
  material,
  onSubmitReport,
  userName
}) => {
  const [reason, setReason] = useState<UserReport['reason']>('incorrect_information');
  const [details, setDetails] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen || !material) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!details.trim()) return;

    const report: UserReport = {
      id: 'rep-' + Date.now(),
      materialId: material.id,
      materialTitle: material.title,
      reason,
      details,
      reportedBy: userName,
      reportedAt: new Date().toISOString(),
      status: 'pending'
    };

    onSubmitReport(report);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setDetails('');
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="p-2 bg-red-100 dark:bg-red-950/80 text-red-600 dark:text-red-400 rounded-lg">
              <ShieldAlert className="w-5 h-5" />
            </span>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white">
                Report Study Material
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Help our academic moderation team maintain 100% verified accuracy
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center">
            <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-950 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <Check className="w-6 h-6 stroke-[3]" />
            </div>
            <h4 className="font-bold text-slate-900 dark:text-white text-base">
              Report Submitted Successfully
            </h4>
            <p className="text-xs text-slate-500 mt-1">
              Our faculty editors will review this material within 24 hours. Thank you!
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Resource Title
              </label>
              <div className="p-2.5 bg-slate-50 dark:bg-slate-800/80 rounded-lg text-xs font-medium text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700">
                {material.title}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Reason for Reporting
              </label>
              <select
                value={reason}
                onChange={(e) => setReason(e.target.value as UserReport['reason'])}
                className="w-full p-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                <option value="incorrect_information">Inaccurate / Incorrect Scientific Formula or Concept</option>
                <option value="outdated">Outdated Syllabus / Obsolete Pattern</option>
                <option value="copyright">Copyright or Attribution Concern</option>
                <option value="poor_quality">Poor Readability / Missing Pages</option>
                <option value="other">Other Issue</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Specific Details & Corrections (Required)
              </label>
              <textarea
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="Please describe specifically what is wrong (e.g., 'In Section 2, the formula for Drift Velocity should use electron charge e instead of mass m')..."
                rows={4}
                required
                className="w-full p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 resize-none"
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!details.trim()}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white rounded-lg text-xs font-bold shadow-md transition-colors"
              >
                Submit Report to Moderators
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};

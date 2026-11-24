import React, { useState } from 'react';
import { 
  GraduationCap, 
  Code, 
  Cpu, 
  Terminal, 
  Briefcase, 
  BookOpen, 
  FileText, 
  Play, 
  Copy, 
  Check, 
  Search, 
  Layers 
} from 'lucide-react';
import { StudyMaterial, Subject } from '../../types';

interface BTechHubProps {
  materials: StudyMaterial[];
  subjects: Subject[];
  onOpenMaterial: (material: StudyMaterial) => void;
  onAskAIAboutTopic: (topic: string) => void;
}

const BRANCHES = [
  { id: 'CSE', name: 'Computer Science (CSE)' },
  { id: 'AI & Data Science', name: 'AI & Data Science' },
  { id: 'ECE', name: 'Electronics & Comm (ECE)' },
  { id: 'EEE', name: 'Electrical & Electronics (EEE)' },
  { id: 'Mechanical', name: 'Mechanical Engineering' },
  { id: 'Civil', name: 'Civil Engineering' },
];

const CODE_TUTORIALS = [
  {
    title: 'Two Pointer Technique (Container With Most Water)',
    language: 'Java',
    difficulty: 'Medium',
    category: 'Placement Prep',
    code: `public class Solution {
    public int maxArea(int[] height) {
        int left = 0, right = height.length - 1;
        int maxArea = 0;
        while (left < right) {
            int currentArea = Math.min(height[left], height[right]) * (right - left);
            maxArea = Math.max(maxArea, currentArea);
            if (height[left] < height[right]) left++;
            else right--;
        }
        return maxArea;
    }
}`
  },
  {
    title: 'Breadth-First Search (BFS) on Graph',
    language: 'C++',
    difficulty: 'Medium',
    category: 'DSA Core',
    code: `#include <iostream>
#include <vector>
#include <queue>
using namespace std;

void bfs(int start, vector<vector<int>>& adj, int V) {
    vector<bool> visited(V, false);
    queue<int> q;
    visited[start] = true;
    q.push(start);
    while (!q.empty()) {
        int node = q.front(); q.pop();
        cout << node << " ";
        for (int neighbor : adj[node]) {
            if (!visited[neighbor]) {
                visited[neighbor] = true;
                q.push(neighbor);
            }
        }
    }
}`
  },
  {
    title: 'Banker’s Algorithm: Safety State Check',
    language: 'Python',
    difficulty: 'Hard',
    category: 'Operating Systems',
    code: `def is_safe_state(processes, avail, max_claim, alloc):
    n = len(processes)
    m = len(avail)
    need = [[max_claim[i][j] - alloc[i][j] for j in range(m)] for i in range(n)]
    finish = [False] * n
    safe_seq = []
    work = list(avail)

    for _ in range(n):
        for i in range(n):
            if not finish[i] and all(need[i][j] <= work[j] for j in range(m)):
                for j in range(m):
                    work[j] += alloc[i][j]
                finish[i] = True
                safe_seq.append(i)
                break
    return (all(finish), safe_seq)`
  }
];

export const BTechHub: React.FC<BTechHubProps> = ({
  materials,
  subjects,
  onOpenMaterial,
  onAskAIAboutTopic
}) => {
  const [selectedBranch, setSelectedBranch] = useState('CSE');
  const [selectedSemester, setSelectedSemester] = useState<number>(5);
  const [selectedView, setSelectedView] = useState<'notes' | 'coding' | 'placement'>('notes');
  const [copiedCodeIndex, setCopiedCodeIndex] = useState<number | null>(null);

  const btechSubjects = subjects.filter(s => s.category === 'btech');
  const btechMaterials = materials.filter(m => m.category === 'btech');

  const handleCopyCode = (code: string, index: number) => {
    navigator.clipboard?.writeText(code);
    setCopiedCodeIndex(index);
    setTimeout(() => setCopiedCodeIndex(null), 2000);
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      
      {/* Banner */}
      <div className="relative rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-700 to-violet-800 text-white p-6 sm:p-8 overflow-hidden shadow-xl">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold uppercase tracking-wider mb-3">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>B.Tech Engineering Super Hub</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            Master Engineering & Tech Careers
          </h1>
          <p className="text-sm text-blue-100 mt-2">
            Semester 1 to 8 curricula across 8 engineering branches. Complete solved PYQs, lab record manuals, viva preparations, and coding interview guides.
          </p>

          {/* Branch Pills */}
          <div className="flex flex-wrap gap-2 mt-4">
            {BRANCHES.map((b) => (
              <button
                key={b.id}
                onClick={() => setSelectedBranch(b.id)}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                  selectedBranch === b.id
                    ? 'bg-white text-blue-700 shadow-md'
                    : 'bg-white/20 hover:bg-white/30 text-white'
                }`}
              >
                {b.name}
              </button>
            ))}
          </div>
        </div>

        <div className="hidden lg:flex absolute right-8 top-1/2 -translate-y-1/2 p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex-col items-center">
          <Code className="w-12 h-12 text-blue-200" />
          <span className="text-xs font-bold mt-2">DSA & Coding</span>
        </div>
      </div>

      {/* Semester Selector Bar */}
      <div className="flex items-center justify-between p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider pl-2 shrink-0">
            Semester:
          </span>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
            <button
              key={sem}
              onClick={() => setSelectedSemester(sem)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedSemester === sem
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              Sem {sem}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1 shrink-0 pl-2">
          <button
            onClick={() => setSelectedView('notes')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              selectedView === 'notes' ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900' : 'text-slate-500 hover:bg-slate-100'
            }`}
          >
            Syllabus Notes
          </button>
          <button
            onClick={() => setSelectedView('coding')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              selectedView === 'coding' ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900' : 'text-slate-500 hover:bg-slate-100'
            }`}
          >
            Coding Practice
          </button>
        </div>
      </div>

      {/* Conditional View: Notes vs Coding Sandbox */}
      {selectedView === 'coding' ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Terminal className="w-5 h-5 text-indigo-600" />
              <span>Interactive Programming Tutorials & Algorithms</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {CODE_TUTORIALS.map((tutorial, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-900 text-slate-100 overflow-hidden shadow-lg"
              >
                <div className="p-4 bg-slate-800/80 border-b border-slate-700/60 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500" />
                    <span className="w-3 h-3 rounded-full bg-yellow-500" />
                    <span className="w-3 h-3 rounded-full bg-green-500" />
                    <span className="ml-2 font-mono text-xs font-bold text-slate-200">
                      {tutorial.title}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-500/20 text-blue-300">
                      {tutorial.language}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleCopyCode(tutorial.code, idx)}
                      className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-700 hover:bg-slate-600 text-[11px] font-medium text-slate-200 transition-colors"
                    >
                      {copiedCodeIndex === idx ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => onAskAIAboutTopic(`Explain this ${tutorial.language} implementation of ${tutorial.title}`)}
                      className="flex items-center gap-1 px-2.5 py-1 rounded bg-indigo-600 hover:bg-indigo-500 text-[11px] font-bold text-white transition-colors"
                    >
                      <span>Explain in AI Tutor</span>
                    </button>
                  </div>
                </div>

                <pre className="p-5 font-mono text-xs leading-relaxed overflow-x-auto text-emerald-300">
                  <code>{tutorial.code}</code>
                </pre>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Engineering Subjects */}
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-blue-600" />
              <span>Core Subjects ({btechSubjects.length})</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {btechSubjects.map((sub) => (
                <div
                  key={sub.id}
                  onClick={() => onAskAIAboutTopic(sub.name)}
                  className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs hover:border-blue-400 transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-mono font-semibold text-blue-600">{sub.code}</span>
                    <span className="text-slate-400">{sub.totalMaterials} materials</span>
                  </div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                    {sub.name}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                    {sub.description}
                  </p>
                  <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-between text-[11px]">
                    <span className="text-slate-400">Coverage</span>
                    <span className="font-bold text-blue-600">{sub.progressPercent}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Engineering Materials Grid */}
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-3">
              Semester Study Materials, PYQs & Manuals
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {btechMaterials.map((mat) => (
                <div
                  key={mat.id}
                  onClick={() => onOpenMaterial(mat)}
                  className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow-md hover:border-blue-400 transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900">
                        {mat.materialType.replace('_', ' ')}
                      </span>
                      <span className="text-xs text-slate-400">
                        {mat.readTimeMinutes} min read
                      </span>
                    </div>
                    <h4 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                      {mat.title}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                      {mat.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-400">
                    <span className="truncate max-w-[200px]">{mat.authorOrSource}</span>
                    <button className="text-blue-600 dark:text-blue-400 font-bold group-hover:translate-x-0.5 transition-transform">
                      Read Online →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

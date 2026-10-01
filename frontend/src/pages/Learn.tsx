import React, { useEffect, useState } from 'react';
import { BookOpen, CheckCircle, AlertTriangle, ShieldCheck, ChevronRight, Check } from 'lucide-react';
import { apiService } from '../services/api';
import { LearningModule } from '../types';

export const Learn: React.FC = () => {
  const [modules, setModules] = useState<LearningModule[]>([]);
  const [activeModule, setActiveModule] = useState<LearningModule | null>(null);
  const [completedIds, setCompletedIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const [modData, progressData] = await Promise.all([
        apiService.getModules(),
        apiService.getUserProgress()
      ]);
      setModules(modData);
      if (modData.length > 0) {
        setActiveModule(modData[0]);
      }
      setCompletedIds(progressData.completed_module_ids || []);
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleMarkComplete = async (modId: string) => {
    if (!completedIds.includes(modId)) {
      const updated = [...completedIds, modId];
      setCompletedIds(updated);
      await apiService.markModuleComplete(modId);
    }
  };

  const progressPercent = Math.round((completedIds.length / 10) * 100);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-brand-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* HEADER & PROGRESS BAR */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-brand-400 font-bold text-xs uppercase tracking-wider mb-1">
              <BookOpen className="w-4 h-4" /> Interactive Training Curriculum
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Phishing Awareness Training Modules
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Master the 10 core cybersecurity awareness modules to protect yourself online.
            </p>
          </div>

          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 shrink-0 min-w-[220px]">
            <div className="flex items-center justify-between text-xs font-bold mb-2">
              <span className="text-slate-400">Learning Progress</span>
              <span className="text-brand-400">{progressPercent}%</span>
            </div>
            <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
              <div
                className="h-full bg-gradient-to-r from-brand-600 via-brand-500 to-shield-light rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="text-[10px] text-slate-500 text-right mt-1.5 font-medium">
              {completedIds.length} of 10 Modules Completed
            </div>
          </div>
        </div>
      </div>

      {/* MODULE SELECTION & READER GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Module Sidebar List */}
        <div className="lg:col-span-4 space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 px-2 mb-3">
            Training Modules Index
          </h3>
          
          <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1 custom-scrollbar">
            {modules.map((mod) => {
              const isCompleted = completedIds.includes(mod.id);
              const isActive = activeModule?.id === mod.id;

              return (
                <button
                  key={mod.id}
                  onClick={() => setActiveModule(mod)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 flex items-start gap-3.5 ${
                    isActive
                      ? 'bg-brand-500/10 border-brand-500/50 shadow-md shadow-brand-500/10'
                      : 'bg-slate-900/80 border-slate-800 hover:bg-slate-800/80'
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 ${
                      isCompleted
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                        : isActive
                        ? 'bg-brand-500 text-white'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {isCompleted ? <Check className="w-4 h-4" /> : mod.module_number}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <span className={`text-xs font-bold truncate ${isActive ? 'text-white' : 'text-slate-200'}`}>
                        {mod.title}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">{mod.description}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Module Detailed Content Reader */}
        {activeModule && (
          <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-8 shadow-xl">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-brand-400">
                  Module 0{activeModule.module_number}
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                  {activeModule.title}
                </h2>
              </div>

              <button
                onClick={() => handleMarkComplete(activeModule.id)}
                disabled={completedIds.includes(activeModule.id)}
                className={`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition ${
                  completedIds.includes(activeModule.id)
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 cursor-default'
                    : 'bg-gradient-to-r from-brand-600 to-shield-dark text-white hover:opacity-90 shadow-md shadow-brand-500/20'
                }`}
              >
                {completedIds.includes(activeModule.id) ? (
                  <>
                    <CheckCircle className="w-4 h-4" /> Completed
                  </>
                ) : (
                  <>Mark as Completed</>
                )}
              </button>
            </div>

            {/* Explanation */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-slate-200 uppercase tracking-wide">Overview & Explanation</h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-950 p-5 rounded-2xl border border-slate-800/80">
                {activeModule.explanation}
              </p>
            </div>

            {/* Warning Signs */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-amber-400 uppercase tracking-wide flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" /> Warning Signs to Watch For
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {activeModule.warning_signs.map((sign, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-amber-500/5 border border-amber-500/20 text-xs text-slate-300 flex items-start gap-2.5">
                    <span className="text-amber-400 font-bold shrink-0 mt-0.5">•</span>
                    <span>{sign}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Fictional Example */}
            {activeModule.fictional_example && activeModule.fictional_example.body && (
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-slate-200 uppercase tracking-wide">Fictional Attack Example</h4>
                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 text-xs font-mono">
                  {activeModule.fictional_example.sender && (
                    <div className="text-slate-400">
                      <span className="text-slate-500 font-bold">From: </span>
                      <span className="text-rose-400">{activeModule.fictional_example.sender}</span>
                    </div>
                  )}
                  {activeModule.fictional_example.subject && (
                    <div className="text-slate-400">
                      <span className="text-slate-500 font-bold">Subject: </span>
                      <span className="text-slate-200">{activeModule.fictional_example.subject}</span>
                    </div>
                  )}
                  <div className="pt-2 border-t border-slate-800 text-slate-300 whitespace-pre-wrap font-sans leading-relaxed">
                    {activeModule.fictional_example.body}
                  </div>
                </div>
              </div>
            )}

            {/* Safety Tips */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-emerald-400 uppercase tracking-wide flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" /> Essential Safety Rules
              </h4>
              <ul className="space-y-2">
                {activeModule.safety_tips.map((tip, idx) => (
                  <li key={idx} className="p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/20 text-xs text-slate-300 flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

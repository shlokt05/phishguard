import React, { useEffect, useState } from 'react';
import { BookOpen, CheckCircle, AlertTriangle, ShieldCheck, ChevronRight, Check, Crosshair } from 'lucide-react';
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
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* HEADER & PROGRESS BAR */}
      <div className="bg-[#131B2A] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 font-mono font-bold text-xs uppercase tracking-wider mb-1">
              <BookOpen className="w-4 h-4" /> CORE DEFENSE CURRICULUM
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight font-sans">
              Phishing Awareness Training Modules
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 font-sans">
              Master the 10 foundational cybersecurity awareness modules to build resilience against digital deception.
            </p>
          </div>

          <div className="bg-[#0A0E17] p-4 rounded-xl border border-white/10 shrink-0 min-w-[220px]">
            <div className="flex items-center justify-between text-xs font-mono mb-2">
              <span className="text-slate-400">CURRICULUM MASTERY</span>
              <span className="text-emerald-400 font-bold">{progressPercent}%</span>
            </div>
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="text-[10px] font-mono text-slate-500 text-right mt-1.5">
              {completedIds.length} of 10 Modules Completed
            </div>
          </div>
        </div>
      </div>

      {/* MODULE SELECTION & READER GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Module Sidebar List */}
        <div className="lg:col-span-4 space-y-2">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 px-2 mb-3">
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
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-200 flex items-start gap-3.5 ${
                    isActive
                      ? 'bg-emerald-500/10 border-emerald-500/50 shadow-md shadow-emerald-500/10'
                      : 'bg-[#131B2A] border-white/5 hover:border-white/20'
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono font-bold text-xs shrink-0 mt-0.5 ${
                      isCompleted
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                        : isActive
                        ? 'bg-emerald-500 text-white'
                        : 'bg-[#0A0E17] text-slate-400 border border-white/10'
                    }`}
                  >
                    {isCompleted ? <Check className="w-4 h-4" /> : mod.module_number}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <span className={`text-xs font-bold font-sans truncate ${isActive ? 'text-white' : 'text-slate-200'}`}>
                        {mod.title}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5 font-sans">{mod.description}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Module Detailed Content Reader */}
        {activeModule && (
          <div className="lg:col-span-8 bg-[#131B2A] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-8 shadow-xl">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-400">
                  Module 0{activeModule.module_number}
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white mt-1 font-sans">
                  {activeModule.title}
                </h2>
              </div>

              <button
                onClick={() => handleMarkComplete(activeModule.id)}
                disabled={completedIds.includes(activeModule.id)}
                className={`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition ${
                  completedIds.includes(activeModule.id)
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 cursor-default'
                    : 'bg-emerald-500 hover:bg-emerald-400 text-white shadow-lg shadow-emerald-500/20'
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
              <h4 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">Overview & Explanation</h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-[#0A0E17] p-5 rounded-xl border border-white/10 font-sans">
                {activeModule.explanation}
              </p>
            </div>

            {/* Warning Signs */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono font-bold text-rose-400 uppercase tracking-wider flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-400" /> Warning Signs to Watch For
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {activeModule.warning_signs.map((sign, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-rose-950/20 border border-rose-500/30 text-xs text-slate-300 flex items-start gap-2.5">
                    <span className="text-rose-400 font-bold shrink-0 mt-0.5">•</span>
                    <span className="font-sans">{sign}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Fictional Example */}
            {activeModule.fictional_example && activeModule.fictional_example.body && (
              <div className="space-y-3">
                <h4 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">Fictional Attack Example</h4>
                <div className="p-5 rounded-xl bg-[#0A0E17] border border-white/10 space-y-3 text-xs font-mono">
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
                  <div className="pt-2 border-t border-white/10 text-slate-300 whitespace-pre-wrap font-sans leading-relaxed">
                    {activeModule.fictional_example.body}
                  </div>
                </div>
              </div>
            )}

            {/* Safety Tips */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> Essential Safety Rules
              </h4>
              <ul className="space-y-2">
                {activeModule.safety_tips.map((tip, idx) => (
                  <li key={idx} className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-xs text-slate-300 flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="font-sans">{tip}</span>
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

export default Learn;

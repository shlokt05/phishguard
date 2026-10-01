import React, { useEffect, useState } from 'react';
import { ShieldCheck, CheckSquare, Square, Lock, AlertOctagon, Info } from 'lucide-react';
import { apiService } from '../services/api';
import { INITIAL_SAFETY_RULES } from '../../../backend/src/data/seedData';

export const Safety: React.FC = () => {
  const [completedRuleIds, setCompletedRuleIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiService.getUserProgress().then(progress => {
      setCompletedRuleIds(progress.safety_rule_ids || [1, 2, 3, 4, 8]);
      setLoading(false);
    });
  }, []);

  const toggleRule = async (id: number) => {
    let updated: number[];
    if (completedRuleIds.includes(id)) {
      updated = completedRuleIds.filter(r => r !== id);
    } else {
      updated = [...completedRuleIds, id];
    }
    setCompletedRuleIds(updated);
    await apiService.saveSafetyProgress(updated);
  };

  const checklistPercent = Math.round((completedRuleIds.length / INITIAL_SAFETY_RULES.length) * 100);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* HEADER */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/30 text-xs font-bold text-brand-400">
          <ShieldCheck className="w-4 h-4" /> Personal Security Protocol
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          10 GOLDEN SAFETY RULES
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
          Adopt these 10 core safety habits to immunize your personal accounts, devices, and digital identity against online threats.
        </p>
      </div>

      {/* 10 SAFETY RULES GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {INITIAL_SAFETY_RULES.map((rule) => (
          <div key={rule.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex items-start gap-4 hover:border-brand-500/30 transition">
            <div className="w-10 h-10 rounded-xl bg-brand-500/10 border border-brand-500/30 text-brand-400 flex items-center justify-center font-bold text-sm shrink-0">
              {rule.id}
            </div>
            <div className="space-y-1">
              <h3 className="font-extrabold text-white text-base">{rule.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{rule.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* BEFORE YOU CLICK INTERACTIVE CHECKLIST */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-brand-400">Interactive Assessment</span>
            <h2 className="text-2xl font-extrabold text-white">BEFORE YOU CLICK CHECKLIST</h2>
            <p className="text-xs text-slate-400 mt-1">Check off the security rules you practice routinely.</p>
          </div>

          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 min-w-[200px]">
            <div className="flex items-center justify-between text-xs font-bold mb-1">
              <span className="text-slate-400">Checklist Score</span>
              <span className="text-emerald-400">{checklistPercent}%</span>
            </div>
            <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                style={{ width: `${checklistPercent}%` }}
              />
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {INITIAL_SAFETY_RULES.map((rule) => {
            const isChecked = completedRuleIds.includes(rule.id);
            return (
              <button
                key={rule.id}
                onClick={() => toggleRule(rule.id)}
                className={`w-full text-left p-4 rounded-xl border flex items-center justify-between gap-4 transition ${
                  isChecked
                    ? 'bg-emerald-500/10 border-emerald-500/40 text-white'
                    : 'bg-slate-950 border-slate-800/80 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`text-sm font-bold ${isChecked ? 'text-emerald-400' : 'text-slate-500'}`}>
                    {isChecked ? <CheckSquare className="w-5 h-5 text-emerald-400" /> : <Square className="w-5 h-5" />}
                  </div>
                  <span className="text-xs font-bold">{rule.title}</span>
                </div>

                <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800">
                  {isChecked ? 'Practicing' : 'Pending'}
                </span>
              </button>
            );
          })}
        </div>

        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-400 flex items-start gap-3">
          <Info className="w-4 h-4 text-brand-400 shrink-0 mt-0.5" />
          <p>
            Your safety checklist progress is automatically stored in your database profile so you can revisit and track your defense habits anytime.
          </p>
        </div>

      </div>
    </div>
  );
};

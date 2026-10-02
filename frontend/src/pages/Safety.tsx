import React, { useEffect, useState } from 'react';
import { ShieldCheck, CheckSquare, Square, Lock, AlertOctagon, Info, Crosshair } from 'lucide-react';
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
      <div className="bg-[#131B2A] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono font-bold text-emerald-400">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>TACTICAL CYBER DEFENSE PROTOCOLS</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-sans">
          10 GOLDEN SAFETY RULES
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
          Operational security habits designed to immunize personal accounts, credentials, and digital communication devices against phishing and cyber extortion.
        </p>
      </div>

      {/* 10 SAFETY RULES GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {INITIAL_SAFETY_RULES.map((rule) => (
          <div key={rule.id} className="bg-[#131B2A] border border-white/10 rounded-2xl p-6 flex items-start gap-4 hover:border-emerald-500/30 transition shadow-xl group">
            <div className="w-10 h-10 rounded-xl bg-[#0A0E17] border border-white/10 text-emerald-400 flex items-center justify-center font-mono font-bold text-sm shrink-0 group-hover:border-emerald-500/40 transition">
              {rule.id < 10 ? `0${rule.id}` : rule.id}
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-white text-base font-sans">{rule.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">{rule.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* BEFORE YOU CLICK INTERACTIVE CHECKLIST */}
      <div className="bg-[#131B2A] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-400">Tactical Readiness Audit</span>
            <h2 className="text-2xl font-black text-white font-sans mt-0.5">BEFORE YOU CLICK CHECKLIST</h2>
            <p className="text-xs text-slate-400 mt-1">Audit the security habits you practice routinely in daily digital life.</p>
          </div>

          <div className="bg-[#0A0E17] p-4 rounded-xl border border-white/10 min-w-[220px]">
            <div className="flex items-center justify-between text-xs font-mono mb-2">
              <span className="text-slate-400">DEFENSE COMPLIANCE</span>
              <span className="text-emerald-400 font-bold">{checklistPercent}%</span>
            </div>
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                style={{ width: `${checklistPercent}%` }}
              />
            </div>
            <div className="text-[10px] font-mono text-slate-500 text-right mt-1.5">
              {completedRuleIds.length} of {INITIAL_SAFETY_RULES.length} Protocols Active
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
                className={`w-full text-left p-4 rounded-xl border flex items-center justify-between gap-4 transition duration-150 ${
                  isChecked
                    ? 'bg-emerald-950/20 border-emerald-500/40 text-white'
                    : 'bg-[#0A0E17] border-white/5 text-slate-400 hover:border-white/20'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`text-sm font-bold ${isChecked ? 'text-emerald-400' : 'text-slate-500'}`}>
                    {isChecked ? <CheckSquare className="w-5 h-5 text-emerald-400" /> : <Square className="w-5 h-5" />}
                  </div>
                  <span className="text-xs font-bold font-sans text-slate-200">{rule.title}</span>
                </div>

                <span className={`text-[10px] font-mono uppercase font-bold tracking-wider px-2.5 py-1 rounded border ${
                  isChecked 
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' 
                    : 'bg-[#131B2A] border-white/10 text-slate-500'
                }`}>
                  {isChecked ? 'ENFORCED' : 'PENDING'}
                </span>
              </button>
            );
          })}
        </div>

        <div className="p-4 rounded-xl bg-[#0A0E17] border border-white/10 text-xs text-slate-400 flex items-start gap-3">
          <Info className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <p className="font-sans">
            Safety protocol states persist locally across your sessions, allowing continuous measurement of your cybersecurity posture.
          </p>
        </div>

      </div>
    </div>
  );
};

export default Safety;

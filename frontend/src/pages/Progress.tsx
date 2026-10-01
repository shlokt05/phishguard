import React, { useEffect, useState } from 'react';
import { Award, BookOpen, Search, ShieldCheck, Image, CheckCircle, BarChart2, User as UserIcon } from 'lucide-react';
import { apiService } from '../services/api';
import { UserProgressData } from '../types';
import { useAuth } from '../context/AuthContext';

export const Progress: React.FC = () => {
  const [progress, setProgress] = useState<UserProgressData | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    apiService.getUserProgress().then(data => {
      setProgress(data);
      setLoading(false);
    });
  }, []);

  if (loading || !progress) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-brand-500"></div>
      </div>
    );
  }

  const statCards = [
    {
      title: "Learning Progress",
      value: `${progress.learning_progress_percent}%`,
      subtext: `${progress.completed_modules_count} of 10 Modules Completed`,
      icon: BookOpen,
      color: "from-blue-600 to-indigo-600"
    },
    {
      title: "Quiz Best Score",
      value: `${progress.quiz_best_score} / ${progress.quiz_total_questions}`,
      subtext: `Best Score: ${progress.quiz_best_percentage}%`,
      icon: Award,
      color: "from-purple-600 to-pink-600"
    },
    {
      title: "Detection Accuracy",
      value: `${progress.detection_correct_count} / ${progress.detection_total_attempts}`,
      subtext: "Correct Scenario Assessments",
      icon: Search,
      color: "from-amber-500 to-red-600"
    },
    {
      title: "Safety Checklist",
      value: `${progress.safety_rules_completed_count} / 10`,
      subtext: "Golden Rules Adopted",
      icon: ShieldCheck,
      color: "from-emerald-500 to-teal-600"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* PROFILE HEADER */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-brand-600 to-shield-dark text-white flex items-center justify-center font-extrabold text-xl shadow-lg shadow-brand-500/20">
              {user?.name.charAt(0).toUpperCase() || 'P'}
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-brand-400">Personal Dashboard</span>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-white">{user?.name || 'Student Progress'}</h1>
              <p className="text-xs text-slate-400">{user?.email || 'student@phishguard.demo'}</p>
            </div>
          </div>

          <div className="px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-bold text-slate-300 flex items-center gap-2">
            <BarChart2 className="w-4 h-4 text-brand-400" /> Database Live Sync
          </div>
        </div>
      </div>

      {/* METRIC CARDS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, idx) => {
          const IconComp = card.icon;
          return (
            <div key={idx} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400">{card.title}</span>
                <div className={`w-9 h-9 rounded-xl bg-gradient-to-tr ${card.color} flex items-center justify-center text-white`}>
                  <IconComp className="w-4 h-4" />
                </div>
              </div>

              <div className="text-3xl font-extrabold text-white">{card.value}</div>
              <div className="text-[11px] font-medium text-slate-400">{card.subtext}</div>
            </div>
          );
        })}
      </div>

      {/* DETAILED PROGRESS BREAKDOWN */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Module Progress Breakdown */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <h3 className="font-extrabold text-lg text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-brand-400" /> Curriculum Module Completion
          </h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-slate-300">Modules Completed ({progress.completed_modules_count} / 10)</span>
              <span className="text-brand-400">{progress.learning_progress_percent}%</span>
            </div>
            <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
              <div
                className="h-full bg-gradient-to-r from-brand-600 via-brand-500 to-shield-light rounded-full transition-all duration-500"
                style={{ width: `${progress.learning_progress_percent}%` }}
              />
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-400 space-y-2">
            <span className="font-bold text-slate-300 block">Completed Module Identifiers:</span>
            {progress.completed_module_ids && progress.completed_module_ids.length > 0 ? (
              <div className="flex flex-wrap gap-1.5">
                {progress.completed_module_ids.map(id => (
                  <span key={id} className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 text-[10px] font-mono border border-emerald-500/30">
                    ✓ {id}
                  </span>
                ))}
              </div>
            ) : (
              <p>No modules completed yet. Visit the Learn page to begin!</p>
            )}
          </div>
        </div>

        {/* Safety & Campaign Metrics */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <h3 className="font-extrabold text-lg text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" /> Security Readiness Overview
          </h3>

          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <span className="text-slate-400">Safety Rules Adopted:</span>
              <span className="font-bold text-emerald-400">{progress.safety_rules_completed_count} / 10</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <span className="text-slate-400">Quiz Best Score Percentage:</span>
              <span className="font-bold text-brand-400">{progress.quiz_best_percentage}%</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <span className="text-slate-400">Posters Gallery Viewed:</span>
              <span className="font-bold text-slate-200">8 Awareness Posters</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

import React, { useEffect, useState } from 'react';
import { Search, ShieldAlert, ShieldCheck, AlertTriangle, CheckCircle, XCircle, ChevronRight, RefreshCw } from 'lucide-react';
import { apiService } from '../services/api';
import { DetectionChallenge } from '../types';

export const Detect: React.FC = () => {
  const [challenges, setChallenges] = useState<DetectionChallenge[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedChoice, setSelectedChoice] = useState<'SAFE' | 'PHISHING' | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    apiService.getDetectionChallenges().then(data => {
      setChallenges(data);
      setLoading(false);
    });
  }, []);

  if (loading || challenges.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-brand-500"></div>
      </div>
    );
  }

  const currentChallenge = challenges[currentIndex];

  const handleChoice = (choice: 'SAFE' | 'PHISHING') => {
    if (isAnswered) return;
    setSelectedChoice(choice);
    setIsAnswered(true);

    const isCorrect = (choice === 'PHISHING') === currentChallenge.is_phishing;
    if (isCorrect) {
      setScore(prev => prev + 1);
    }

    apiService.saveDetectionResult(currentChallenge.id, choice, isCorrect);
  };

  const handleNext = () => {
    if (currentIndex < challenges.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedChoice(null);
      setIsAnswered(false);
    }
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setSelectedChoice(null);
    setIsAnswered(false);
    setScore(0);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* HEADER */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/30 text-xs font-bold text-brand-400">
            <Search className="w-4 h-4" /> Interactive Detection Simulator
          </div>
          <div className="text-xs font-bold text-slate-400">
            Scenario {currentIndex + 1} of {challenges.length}
          </div>
        </div>
        
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          PHISHING MESSAGE DETECTION
        </h1>
        <p className="text-xs sm:text-sm text-slate-300">
          Analyze real-world fictional messages across Email, SMS, Messaging DMs, and Fake Logins. Decide if the message is Safe or Phishing!
        </p>
      </div>

      {/* SCENARIO CARD */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
        
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-400">
            {currentChallenge.scenario_title}
          </span>
          <span className="px-2.5 py-1 rounded-full bg-slate-800 text-[10px] font-bold text-slate-300 uppercase">
            Type: {currentChallenge.type}
          </span>
        </div>

        {/* Message View Window */}
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-3 font-mono text-xs">
          {currentChallenge.sender && (
            <div className="text-slate-400">
              <span className="text-slate-500 font-bold">From: </span>
              <span className="text-slate-200">{currentChallenge.sender}</span>
            </div>
          )}
          {currentChallenge.subject && (
            <div className="text-slate-400">
              <span className="text-slate-500 font-bold">Subject: </span>
              <span className="text-slate-200">{currentChallenge.subject}</span>
            </div>
          )}
          <div className="pt-3 border-t border-slate-800 text-slate-200 font-sans leading-relaxed whitespace-pre-wrap">
            {currentChallenge.content}
          </div>
        </div>

        {/* Question Prompt */}
        <div className="text-center space-y-4 pt-2">
          <h3 className="text-base font-extrabold text-white uppercase tracking-wider">
            Is this Safe or Phishing?
          </h3>

          <div className="flex justify-center gap-4">
            <button
              onClick={() => handleChoice('SAFE')}
              disabled={isAnswered}
              className={`px-8 py-3 rounded-2xl font-bold text-xs flex items-center gap-2 border transition ${
                selectedChoice === 'SAFE'
                  ? 'bg-emerald-500 text-white border-emerald-400 shadow-lg shadow-emerald-500/20'
                  : 'bg-slate-950 border-slate-800 text-emerald-400 hover:bg-emerald-500/10'
              }`}
            >
              <ShieldCheck className="w-4 h-4" /> SAFE
            </button>

            <button
              onClick={() => handleChoice('PHISHING')}
              disabled={isAnswered}
              className={`px-8 py-3 rounded-2xl font-bold text-xs flex items-center gap-2 border transition ${
                selectedChoice === 'PHISHING'
                  ? 'bg-rose-600 text-white border-rose-500 shadow-lg shadow-rose-600/20'
                  : 'bg-slate-950 border-slate-800 text-rose-400 hover:bg-rose-500/10'
              }`}
            >
              <ShieldAlert className="w-4 h-4" /> PHISHING
            </button>
          </div>
        </div>

        {/* Immediate Feedback Box */}
        {isAnswered && (
          <div className={`p-6 rounded-2xl border space-y-4 animate-in fade-in ${
            (selectedChoice === 'PHISHING') === currentChallenge.is_phishing
              ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300'
              : 'bg-rose-500/10 border-rose-500/40 text-rose-300'
          }`}>
            <div className="flex items-center gap-2 text-base font-extrabold">
              {(selectedChoice === 'PHISHING') === currentChallenge.is_phishing ? (
                <>
                  <CheckCircle className="w-5 h-5 text-emerald-400" /> Correct Assessment!
                </>
              ) : (
                <>
                  <XCircle className="w-5 h-5 text-rose-400" /> Incorrect Assessment
                </>
              )}
            </div>

            <p className="text-xs leading-relaxed text-slate-200">
              {currentChallenge.explanation}
            </p>

            {currentChallenge.red_flags && currentChallenge.red_flags.length > 0 && (
              <div className="space-y-2 pt-2 border-t border-slate-800/80">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4" /> Red Flags Identified:
                </span>
                <ul className="space-y-1">
                  {currentChallenge.red_flags.map((flag, idx) => (
                    <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                      <span className="text-rose-400 font-bold">•</span>
                      <span>{flag}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Navigation Next button */}
        {isAnswered && (
          <div className="flex justify-end pt-2">
            {currentIndex < challenges.length - 1 ? (
              <button
                onClick={handleNext}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-brand-600 to-shield-dark text-white font-bold text-xs flex items-center gap-2 hover:opacity-90 transition shadow-md shadow-brand-500/20"
              >
                Next Scenario <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleReset}
                className="px-6 py-3 rounded-xl bg-slate-800 text-white font-bold text-xs flex items-center gap-2 hover:bg-slate-700 transition"
              >
                <RefreshCw className="w-4 h-4" /> Restart Detection Practice
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

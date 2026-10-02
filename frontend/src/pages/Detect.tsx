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
      <div className="bg-[#131B2A] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xl">
        <div 
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', whiteSpace: 'nowrap' }} 
          className="gap-2 sm:gap-4"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono font-bold text-emerald-400 shrink-0">
            <Search className="w-4 h-4 shrink-0" style={{ width: '15px', height: '15px' }} /> 
            <span>Interactive Detection Simulator</span>
          </div>
          <div className="text-xs font-mono font-bold text-slate-400 shrink-0">
            Scenario {currentIndex + 1} of {challenges.length}
          </div>
        </div>
        
        <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight font-sans">
          PHISHING MESSAGE DETECTION
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Analyze real-world simulated threat messages across Email, SMS, Messaging DMs, and Fake Logins. Decide if the message is Authentic or Phishing!
        </p>
      </div>

      {/* SCENARIO CARD */}
      <div className="bg-[#131B2A] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
        
        {/* Scenario Header with exact flex and badge specifications */}
        <div 
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px' }} 
          className="border-b border-white/10 pb-4"
        >
          <span 
            className="text-xs sm:text-sm font-bold uppercase tracking-wider text-emerald-400 leading-snug"
            style={{ flex: 1 }}
          >
            {currentChallenge.scenario_title}
          </span>
          <span 
            style={{ whiteSpace: 'nowrap', padding: '4px 8px' }}
            className="rounded-md bg-[#0A0E17] border border-white/10 text-[10px] font-mono font-bold text-slate-300 uppercase shrink-0"
          >
            TYPE: {currentChallenge.type}
          </span>
        </div>

        {/* Message View Window */}
        <div className="bg-[#0A0E17] border border-white/10 rounded-xl p-5 space-y-3 font-mono text-xs">
          {currentChallenge.sender && (
            <div className="text-slate-400 flex items-baseline gap-2">
              <span className="text-slate-500 font-bold uppercase text-[10px]">From:</span>
              <span className="text-slate-200 select-all font-mono">{currentChallenge.sender}</span>
            </div>
          )}
          {currentChallenge.subject && (
            <div className="text-slate-400 flex items-baseline gap-2">
              <span className="text-slate-500 font-bold uppercase text-[10px]">Subject:</span>
              <span className="text-slate-200 font-sans font-semibold">{currentChallenge.subject}</span>
            </div>
          )}
          <div className="pt-3 border-t border-white/10 text-slate-200 font-sans text-xs sm:text-sm leading-relaxed whitespace-pre-wrap">
            {currentChallenge.content}
          </div>
        </div>

        {/* Question Prompt */}
        <div className="text-center space-y-4 pt-2">
          <h3 className="text-xs sm:text-sm font-black text-slate-300 uppercase tracking-widest font-mono">
            TACTICAL ASSESSMENT: IS THIS SAFE OR PHISHING?
          </h3>

          <div className="flex justify-center gap-4">
            <button
              onClick={() => handleChoice('SAFE')}
              disabled={isAnswered}
              className={`px-8 py-3 rounded-xl font-bold text-xs flex items-center gap-2 border transition-all duration-200 ${
                selectedChoice === 'SAFE'
                  ? 'bg-emerald-500 text-white border-emerald-400 shadow-lg shadow-emerald-500/25 scale-105'
                  : 'bg-[#0A0E17] border-white/10 text-emerald-400 hover:bg-emerald-500/10 hover:border-emerald-500/30'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>AUTHENTIC / SAFE</span>
            </button>

            <button
              onClick={() => handleChoice('PHISHING')}
              disabled={isAnswered}
              className={`px-8 py-3 rounded-xl font-bold text-xs flex items-center gap-2 border transition-all duration-200 ${
                selectedChoice === 'PHISHING'
                  ? 'bg-rose-600 text-white border-rose-500 shadow-lg shadow-rose-600/25 scale-105'
                  : 'bg-[#0A0E17] border-white/10 text-rose-400 hover:bg-rose-500/10 hover:border-rose-500/30'
              }`}
            >
              <ShieldAlert className="w-4 h-4 text-rose-400" />
              <span>MALICIOUS / PHISHING</span>
            </button>
          </div>
        </div>

        {/* Immediate Feedback Box */}
        {isAnswered && (
          <div className={`p-6 rounded-xl border space-y-4 animate-in fade-in duration-200 ${
            (selectedChoice === 'PHISHING') === currentChallenge.is_phishing
              ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300'
              : 'bg-rose-950/30 border-rose-500/40 text-rose-300'
          }`}>
            <div className="flex items-center gap-2 text-base font-extrabold font-sans">
              {(selectedChoice === 'PHISHING') === currentChallenge.is_phishing ? (
                <>
                  <CheckCircle className="w-5 h-5 text-emerald-400" /> Correct Assessment!
                </>
              ) : (
                <>
                  <XCircle className="w-5 h-5 text-rose-400" /> Threat Misclassification Detected
                </>
              )}
            </div>

            <p className="text-xs leading-relaxed text-slate-200">
              {currentChallenge.explanation}
            </p>

            {currentChallenge.red_flags && currentChallenge.red_flags.length > 0 && (
              <div className="space-y-2 pt-2 border-t border-white/10">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-rose-400" /> Forensic Red Flags:
                </span>
                <ul className="space-y-1.5">
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
                className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-xs flex items-center gap-2 transition shadow-lg shadow-emerald-500/20"
              >
                <span>Next Scenario</span> <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleReset}
                className="px-6 py-3 rounded-xl bg-[#0A0E17] border border-white/10 text-white font-bold text-xs flex items-center gap-2 hover:bg-white/5 transition"
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

import React, { useEffect, useState } from 'react';
import { Award, ChevronLeft, ChevronRight, CheckCircle2, XCircle, RotateCcw, HelpCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { apiService } from '../services/api';
import { QuizQuestion } from '../types';

export const Quiz: React.FC = () => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [showExplanation, setShowExplanation] = useState<Record<number, boolean>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    apiService.getQuizQuestions().then(data => {
      setQuestions(data);
      setLoading(false);
    });
  }, []);

  if (loading || questions.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-brand-500"></div>
      </div>
    );
  }

  const currentQ = questions[currentIndex];
  const selectedOption = userAnswers[currentQ.question_number];

  const handleSelect = (qNum: number, optIdx: number) => {
    if (isSubmitted) return;
    setUserAnswers(prev => ({ ...prev, [qNum]: optIdx }));
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach(q => {
      if (userAnswers[q.question_number] === q.correct_option) {
        score += 1;
      }
    });
    return score;
  };

  const handleSubmitQuiz = async () => {
    setIsSubmitted(true);
    const score = calculateScore();
    await apiService.saveQuizResult(score, questions.length);

    if (score / questions.length >= 0.7) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const handleRetake = () => {
    setCurrentIndex(0);
    setUserAnswers({});
    setShowExplanation({});
    setIsSubmitted(false);
  };

  const finalScore = calculateScore();
  const finalPercentage = Math.round((finalScore / questions.length) * 100);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* HEADER */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/30 text-xs font-bold text-brand-400">
            <Award className="w-4 h-4" /> 15-Question Security Assessment
          </div>
          <span className="text-xs font-bold text-slate-400">
            Question {currentIndex + 1} of {questions.length}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          PHISHING KNOWLEDGE QUIZ
        </h1>

        {/* Progress bar */}
        <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
          <div
            className="h-full bg-gradient-to-r from-brand-600 to-shield-dark rounded-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* FINAL RESULTS VIEW */}
      {isSubmitted ? (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center space-y-6 shadow-2xl animate-in fade-in">
          
          <div className="w-20 h-20 mx-auto rounded-3xl bg-brand-500/10 border border-brand-500/30 flex items-center justify-center text-brand-400">
            <Award className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <h2 className="text-3xl font-extrabold text-white">QUIZ COMPLETED!</h2>
            <p className="text-xs text-slate-400">Your score has been saved to your progress dashboard.</p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 max-w-sm mx-auto space-y-2">
            <div className="text-4xl font-black text-brand-400">{finalScore} / {questions.length}</div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Score: {finalPercentage}%
            </div>
          </div>

          <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
            {finalPercentage >= 80
              ? '🎉 Outstanding! You demonstrated superior phishing awareness and defense knowledge.'
              : '👍 Good effort! Review your incorrect answers below and retake the quiz to sharpen your defense.'}
          </p>

          <button
            onClick={handleRetake}
            className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-brand-600 to-shield-dark text-white font-bold text-xs flex items-center gap-2 mx-auto hover:opacity-90 transition shadow-lg shadow-brand-500/20"
          >
            <RotateCcw className="w-4 h-4" /> RETAKE QUIZ
          </button>
        </div>
      ) : (
        /* QUESTION CARD VIEW */
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
          
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-400">
              Category: {currentQ.category}
            </span>
            <span className="text-[10px] uppercase font-bold text-slate-400 px-2.5 py-1 bg-slate-950 rounded-full border border-slate-800">
              Multiple Choice
            </span>
          </div>

          <h3 className="text-lg sm:text-xl font-bold text-white leading-relaxed">
            {currentQ.question_number}. {currentQ.question_text}
          </h3>

          <div className="space-y-3">
            {currentQ.options.map((opt, idx) => {
              const isSelected = selectedOption === idx;
              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(currentQ.question_number, idx)}
                  className={`w-full text-left p-4 rounded-2xl border text-xs font-medium flex items-center justify-between gap-3 transition-all ${
                    isSelected
                      ? 'bg-brand-500/10 border-brand-500 text-white font-semibold shadow-md shadow-brand-500/10'
                      : 'bg-slate-950 border-slate-800/80 text-slate-300 hover:border-slate-700 hover:text-white'
                  }`}
                >
                  <span>{opt}</span>
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center font-bold text-[10px] shrink-0 ${
                      isSelected ? 'bg-brand-500 border-brand-400 text-white' : 'border-slate-700 text-slate-500'
                    }`}
                  >
                    {String.fromCharCode(65 + idx)}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Explanation reveal button */}
          <div className="pt-2 flex items-center justify-between border-t border-slate-800">
            <button
              onClick={() =>
                setShowExplanation(prev => ({ ...prev, [currentQ.question_number]: !prev[currentQ.question_number] }))
              }
              className="text-xs font-bold text-slate-400 hover:text-brand-400 flex items-center gap-1.5 transition"
            >
              <HelpCircle className="w-4 h-4" />
              {showExplanation[currentQ.question_number] ? 'Hide Explanation' : 'View Explanation'}
            </button>

            {selectedOption !== undefined && (
              <span className="text-[11px] font-bold text-emerald-400">Option Selected</span>
            )}
          </div>

          {showExplanation[currentQ.question_number] && (
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 leading-relaxed animate-in fade-in space-y-1">
              <strong className="text-brand-400 block font-bold">Explanation:</strong>
              <p>{currentQ.explanation}</p>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            <button
              onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
              disabled={currentIndex === 0}
              className="px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-bold text-slate-300 hover:bg-slate-800 disabled:opacity-40 flex items-center gap-1"
            >
              <ChevronLeft className="w-4 h-4" /> Previous
            </button>

            {currentIndex < questions.length - 1 ? (
              <button
                onClick={() => setCurrentIndex(prev => Math.min(questions.length - 1, prev + 1))}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-600 to-shield-dark text-white text-xs font-bold flex items-center gap-1 hover:opacity-90 transition"
              >
                Next <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmitQuiz}
                disabled={Object.keys(userAnswers).length < questions.length}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white text-xs font-bold hover:opacity-90 disabled:opacity-40 transition shadow-lg shadow-emerald-500/20"
              >
                Submit Final Quiz
              </button>
            )}
          </div>

        </div>
      )}

    </div>
  );
};

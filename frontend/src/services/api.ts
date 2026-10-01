import { LearningModule, QuizQuestion, DetectionChallenge, Poster, UserProgressData } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const getAuthHeaders = (): Record<string, string> => {
  const token = localStorage.getItem('phishguard_token');
  const userId = localStorage.getItem('phishguard_user_id') || 'guest-user-999';
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'X-User-Id': userId
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

export const apiService = {
  // Health check
  checkHealth: async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/health`);
      if (!res.ok) throw new Error('API server unavailable');
      return await res.json();
    } catch (err) {
      return { status: 'offline' };
    }
  },

  // Modules
  getModules: async (): Promise<LearningModule[]> => {
    try {
      const res = await fetch(`${API_BASE_URL}/modules`, { headers: getAuthHeaders() });
      if (!res.ok) throw new Error('Failed to fetch modules');
      return await res.json();
    } catch (err) {
      console.warn('API error, using local fallback modules');
      const { INITIAL_MODULES } = await import('../../../backend/src/data/seedData');
      return INITIAL_MODULES as any;
    }
  },

  getModuleById: async (id: string): Promise<LearningModule | null> => {
    try {
      const res = await fetch(`${API_BASE_URL}/modules/${id}`, { headers: getAuthHeaders() });
      if (!res.ok) throw new Error('Module fetch failed');
      return await res.json();
    } catch (err) {
      const { INITIAL_MODULES } = await import('../../../backend/src/data/seedData');
      return (INITIAL_MODULES.find(m => m.id === id || m.module_number.toString() === id) as any) || null;
    }
  },

  // Quiz
  getQuizQuestions: async (): Promise<QuizQuestion[]> => {
    try {
      const res = await fetch(`${API_BASE_URL}/quiz/questions`, { headers: getAuthHeaders() });
      if (!res.ok) throw new Error('Failed to fetch quiz questions');
      return await res.json();
    } catch (err) {
      const { INITIAL_QUIZ_QUESTIONS } = await import('../../../backend/src/data/seedData');
      return INITIAL_QUIZ_QUESTIONS as any;
    }
  },

  saveQuizResult: async (score: number, totalQuestions: number) => {
    try {
      const res = await fetch(`${API_BASE_URL}/quiz/results`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ score, total_questions: totalQuestions })
      });
      return await res.json();
    } catch (err) {
      console.warn('Local result saving fallback');
      const currentBest = Number(localStorage.getItem('phishguard_quiz_best') || 0);
      if (score > currentBest) {
        localStorage.setItem('phishguard_quiz_best', score.toString());
      }
      return { score, total_questions: totalQuestions, percentage: (score / totalQuestions) * 100 };
    }
  },

  // Detection Challenges
  getDetectionChallenges: async (): Promise<DetectionChallenge[]> => {
    try {
      const res = await fetch(`${API_BASE_URL}/detection/challenges`, { headers: getAuthHeaders() });
      if (!res.ok) throw new Error('Failed to fetch challenges');
      return await res.json();
    } catch (err) {
      const { INITIAL_DETECTION_CHALLENGES } = await import('../../../backend/src/data/seedData');
      return INITIAL_DETECTION_CHALLENGES as any;
    }
  },

  saveDetectionResult: async (challengeId: string, userChoice: string, isCorrect: boolean) => {
    try {
      const res = await fetch(`${API_BASE_URL}/detection/results`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ challenge_id: challengeId, user_choice: userChoice, is_correct: isCorrect })
      });
      return await res.json();
    } catch (err) {
      return { challenge_id: challengeId, user_choice: userChoice, is_correct: isCorrect };
    }
  },

  // Posters
  getPosters: async (): Promise<Poster[]> => {
    try {
      const res = await fetch(`${API_BASE_URL}/posters`, { headers: getAuthHeaders() });
      if (!res.ok) throw new Error('Failed to fetch posters');
      return await res.json();
    } catch (err) {
      const { INITIAL_POSTERS } = await import('../../../backend/src/data/seedData');
      return INITIAL_POSTERS as any;
    }
  },

  // Progress
  getUserProgress: async (): Promise<UserProgressData> => {
    try {
      const res = await fetch(`${API_BASE_URL}/progress`, { headers: getAuthHeaders() });
      if (!res.ok) throw new Error('Failed to fetch user progress');
      return await res.json();
    } catch (err) {
      const completedModules = JSON.parse(localStorage.getItem('phishguard_completed_modules') || '["mod-1", "mod-2"]');
      const safetyRuleIds = JSON.parse(localStorage.getItem('phishguard_safety_rules') || '[1, 2, 3, 4, 8]');
      const quizBest = Number(localStorage.getItem('phishguard_quiz_best') || 13);
      
      return {
        user_id: localStorage.getItem('phishguard_user_id') || 'guest-123',
        learning_progress_percent: Math.round((completedModules.length / 10) * 100),
        completed_modules_count: completedModules.length,
        completed_module_ids: completedModules,
        quiz_best_score: quizBest,
        quiz_total_questions: 15,
        quiz_best_percentage: Math.round((quizBest / 15) * 100),
        detection_correct_count: 4,
        detection_total_attempts: 5,
        safety_rules_completed_count: safetyRuleIds.length,
        safety_rule_ids: safetyRuleIds,
        posters_viewed_count: 8
      };
    }
  },

  markModuleComplete: async (moduleId: string) => {
    try {
      await fetch(`${API_BASE_URL}/progress`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ module_id: moduleId, completed: true })
      });
    } catch (e) {
      const completed = JSON.parse(localStorage.getItem('phishguard_completed_modules') || '[]');
      if (!completed.includes(moduleId)) {
        completed.push(moduleId);
        localStorage.setItem('phishguard_completed_modules', JSON.stringify(completed));
      }
    }
  },

  saveSafetyProgress: async (completedRuleIds: number[]) => {
    try {
      await fetch(`${API_BASE_URL}/progress`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ safety_rule_ids: completedRuleIds })
      });
    } catch (e) {
      localStorage.setItem('phishguard_safety_rules', JSON.stringify(completedRuleIds));
    }
  }
};

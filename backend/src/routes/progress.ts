import { Router, Response } from 'express';
import { authenticateUser, AuthenticatedRequest } from '../middleware/auth';
import { supabase, isSupabaseConfigured } from '../config/supabase';

const router = Router();

const mockUserProgress = new Map<string, {
  completed_module_ids: string[];
  safety_rule_ids: number[];
  posters_viewed: number;
}>();

router.get('/', authenticateUser, async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user?.id;

  if (!userId) {
    return res.status(400).json({ error: 'User ID missing' });
  }

  if (isSupabaseConfigured && supabase) {
    try {
      const [modulesRes, quizRes, detectionRes, safetyRes] = await Promise.all([
        supabase.from('user_progress').select('module_id').eq('user_id', userId).eq('completed', true),
        supabase.from('quiz_results').select('*').eq('user_id', userId).order('score', { ascending: false }),
        supabase.from('detection_results').select('*').eq('user_id', userId),
        supabase.from('safety_progress').select('completed_rule_ids').eq('user_id', userId).single()
      ]);

      const completedModules = modulesRes.data ? modulesRes.data.map(m => m.module_id) : [];
      const bestQuizScore = quizRes.data && quizRes.data.length > 0 ? quizRes.data[0].score : 0;
      const totalQuizQuestions = quizRes.data && quizRes.data.length > 0 ? quizRes.data[0].total_questions : 15;
      
      const detectionAttempts = detectionRes.data || [];
      const correctDetections = detectionAttempts.filter(d => d.is_correct).length;
      
      const safetyRuleIds = safetyRes.data ? safetyRes.data.completed_rule_ids : [];

      return res.json({
        user_id: userId,
        learning_progress_percent: Math.round((completedModules.length / 10) * 100),
        completed_modules_count: completedModules.length,
        completed_module_ids: completedModules,
        quiz_best_score: bestQuizScore,
        quiz_total_questions: totalQuizQuestions,
        quiz_best_percentage: totalQuizQuestions > 0 ? Math.round((bestQuizScore / totalQuizQuestions) * 100) : 0,
        detection_correct_count: correctDetections,
        detection_total_attempts: detectionAttempts.length,
        safety_rules_completed_count: Array.isArray(safetyRuleIds) ? safetyRuleIds.length : 0,
        safety_rule_ids: safetyRuleIds,
        posters_viewed_count: 8
      });
    } catch (e) {
      console.error('Error fetching progress from Supabase:', e);
    }
  }

  // Fallback in-memory response
  const userProgress = mockUserProgress.get(userId) || {
    completed_module_ids: ['mod-1', 'mod-2'],
    safety_rule_ids: [1, 2, 3, 4, 8],
    posters_viewed: 6
  };

  return res.json({
    user_id: userId,
    learning_progress_percent: Math.round((userProgress.completed_module_ids.length / 10) * 100),
    completed_modules_count: userProgress.completed_module_ids.length,
    completed_module_ids: userProgress.completed_module_ids,
    quiz_best_score: 13,
    quiz_total_questions: 15,
    quiz_best_percentage: 87,
    detection_correct_count: 4,
    detection_total_attempts: 5,
    safety_rules_completed_count: userProgress.safety_rule_ids.length,
    safety_rule_ids: userProgress.safety_rule_ids,
    posters_viewed_count: userProgress.posters_viewed
  });
});

router.post('/', authenticateUser, async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user?.id;
  const { module_id, completed, safety_rule_ids } = req.body;

  if (!userId) {
    return res.status(400).json({ error: 'User ID missing' });
  }

  if (module_id) {
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase
          .from('user_progress')
          .upsert({ user_id: userId, module_id, completed: completed ?? true, completed_at: new Date().toISOString() });
      } catch (e) {
        console.error('Failed to update module progress in Supabase:', e);
      }
    }

    const current = mockUserProgress.get(userId) || { completed_module_ids: [], safety_rule_ids: [], posters_viewed: 5 };
    if (!current.completed_module_ids.includes(module_id)) {
      current.completed_module_ids.push(module_id);
    }
    mockUserProgress.set(userId, current);
  }

  if (safety_rule_ids && Array.isArray(safety_rule_ids)) {
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase
          .from('safety_progress')
          .upsert({ user_id: userId, completed_rule_ids: safety_rule_ids, updated_at: new Date().toISOString() });
      } catch (e) {
        console.error('Failed to update safety progress in Supabase:', e);
      }
    }

    const current = mockUserProgress.get(userId) || { completed_module_ids: [], safety_rule_ids: [], posters_viewed: 5 };
    current.safety_rule_ids = safety_rule_ids;
    mockUserProgress.set(userId, current);
  }

  return res.json({ message: 'Progress updated successfully' });
});

export default router;

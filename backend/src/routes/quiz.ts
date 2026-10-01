import { Router, Request, Response } from 'express';
import { INITIAL_QUIZ_QUESTIONS } from '../data/seedData';
import { supabase, isSupabaseConfigured } from '../config/supabase';
import { authenticateUser, AuthenticatedRequest } from '../middleware/auth';

const router = Router();

// In-memory quiz results fallback
const mockQuizResults = new Map<string, any[]>();

router.get('/questions', async (req: Request, res: Response) => {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('quiz_questions')
        .select('*')
        .order('question_number', { ascending: true });

      if (!error && data && data.length > 0) {
        return res.json(data);
      }
    } catch (e) {
      console.warn('Supabase quiz questions fetch failed, using seed data');
    }
  }

  return res.json(INITIAL_QUIZ_QUESTIONS);
});

router.post('/results', authenticateUser, async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user?.id;
  const { score, total_questions } = req.body;

  if (score === undefined || total_questions === undefined) {
    return res.status(400).json({ error: 'score and total_questions are required' });
  }

  const percentage = Number(((score / total_questions) * 100).toFixed(2));
  const resultRecord = {
    user_id: userId,
    score,
    total_questions,
    percentage,
    completed_at: new Date().toISOString()
  };

  if (isSupabaseConfigured && supabase && userId) {
    try {
      const { data, error } = await supabase
        .from('quiz_results')
        .insert([resultRecord])
        .select();

      if (!error && data) {
        return res.status(201).json(data[0]);
      }
    } catch (e) {
      console.error('Failed saving quiz result to Supabase:', e);
    }
  }

  // Fallback storage
  if (userId) {
    const existing = mockQuizResults.get(userId) || [];
    existing.push(resultRecord);
    mockQuizResults.set(userId, existing);
  }

  return res.status(201).json(resultRecord);
});

router.get('/results', authenticateUser, async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user?.id;

  if (!userId) {
    return res.status(400).json({ error: 'User ID missing' });
  }

  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('quiz_results')
        .select('*')
        .eq('user_id', userId)
        .order('completed_at', { ascending: false });

      if (!error && data) {
        return res.json(data);
      }
    } catch (e) {
      console.error('Error fetching quiz results:', e);
    }
  }

  const results = mockQuizResults.get(userId) || [];
  return res.json(results);
});

export default router;

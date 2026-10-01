import { Router, Request, Response } from 'express';
import { INITIAL_DETECTION_CHALLENGES } from '../data/seedData';
import { supabase, isSupabaseConfigured } from '../config/supabase';
import { authenticateUser, AuthenticatedRequest } from '../middleware/auth';

const router = Router();
const mockDetectionResults = new Map<string, any[]>();

router.get('/challenges', async (req: Request, res: Response) => {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('detection_challenges')
        .select('*');

      if (!error && data && data.length > 0) {
        return res.json(data);
      }
    } catch (e) {
      console.warn('Supabase detection challenges fetch failed, using seed data');
    }
  }

  return res.json(INITIAL_DETECTION_CHALLENGES);
});

router.post('/results', authenticateUser, async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user?.id;
  const { challenge_id, user_choice, is_correct } = req.body;

  if (!challenge_id || !user_choice || is_correct === undefined) {
    return res.status(400).json({ error: 'challenge_id, user_choice and is_correct are required' });
  }

  const resultRecord = {
    user_id: userId,
    challenge_id,
    user_choice,
    is_correct,
    answered_at: new Date().toISOString()
  };

  if (isSupabaseConfigured && supabase && userId) {
    try {
      const { data, error } = await supabase
        .from('detection_results')
        .insert([resultRecord])
        .select();

      if (!error && data) {
        return res.status(201).json(data[0]);
      }
    } catch (e) {
      console.error('Error saving detection result to Supabase:', e);
    }
  }

  if (userId) {
    const existing = mockDetectionResults.get(userId) || [];
    existing.push(resultRecord);
    mockDetectionResults.set(userId, existing);
  }

  return res.status(201).json(resultRecord);
});

export default router;

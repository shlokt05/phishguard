import { Router, Request, Response } from 'express';
import { INITIAL_POSTERS } from '../data/seedData';
import { supabase, isSupabaseConfigured } from '../config/supabase';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('posters')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data && data.length > 0) {
        return res.json(data);
      }
    } catch (e) {
      console.warn('Supabase posters fetch failed, using seed data');
    }
  }

  return res.json(INITIAL_POSTERS);
});

export default router;

import { Router, Request, Response } from 'express';
import { INITIAL_MODULES } from '../data/seedData';
import { supabase, isSupabaseConfigured } from '../config/supabase';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('learning_modules')
        .select('*')
        .order('module_number', { ascending: true });

      if (!error && data && data.length > 0) {
        return res.json(data);
      }
    } catch (e) {
      console.warn('Supabase modules fetch failed, utilizing seed data');
    }
  }

  return res.json(INITIAL_MODULES);
});

router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('learning_modules')
        .select('*')
        .eq('id', id)
        .single();

      if (!error && data) {
        return res.json(data);
      }
    } catch (e) {
      // fallback
    }
  }

  const moduleItem = INITIAL_MODULES.find(
    m => m.id === id || m.module_number.toString() === id
  );

  if (!moduleItem) {
    return res.status(404).json({ error: 'Module not found' });
  }

  return res.json(moduleItem);
});

export default router;

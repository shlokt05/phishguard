import { Router, Request, Response } from 'express';
import { supabase, isSupabaseConfigured } from '../config/supabase';

const router = Router();

// In-memory store for fallback mode
const mockUsers = new Map<string, { id: string; name: string; email: string; passwordHash: string }>();

router.post('/register', async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({ error: 'Name, email and password are required' });
  }

  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name }
        }
      });

      if (error) {
        return res.status(400).json({ error: error.message });
      }

      if (data.user) {
        await supabase.from('profiles').insert([
          { id: data.user.id, name, email }
        ]);
      }

      return res.status(201).json({
        message: 'User registered successfully',
        user: { id: data.user?.id, email, name },
        session: data.session
      });
    } catch (err: any) {
      return res.status(500).json({ error: err.message || 'Registration failed' });
    }
  } else {
    // Fallback mode registration
    const existing = Array.from(mockUsers.values()).find(u => u.email === email);
    if (existing) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    const userId = 'usr-' + Math.random().toString(36).substring(2, 9);
    const newUser = { id: userId, name, email, passwordHash: password };
    mockUsers.set(userId, newUser);

    return res.status(201).json({
      message: 'User registered successfully (Demo Mode)',
      user: { id: userId, email, name },
      token: `demo-token-${userId}`
    });
  }
});

router.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        return res.status(401).json({ error: error.message });
      }

      const name = data.user.user_metadata?.name || email.split('@')[0];

      return res.json({
        message: 'Login successful',
        user: { id: data.user.id, email, name },
        session: data.session
      });
    } catch (err: any) {
      return res.status(500).json({ error: err.message || 'Login failed' });
    }
  } else {
    // Fallback mode login
    const user = Array.from(mockUsers.values()).find(u => u.email === email && u.passwordHash === password);
    if (!user && email !== 'demo@phishguard.com') {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const userId = user ? user.id : 'usr-demo-1';
    const name = user ? user.name : 'Demo Student';

    return res.json({
      message: 'Login successful (Demo Mode)',
      user: { id: userId, email, name },
      token: `demo-token-${userId}`
    });
  }
});

router.post('/logout', (req: Request, res: Response) => {
  return res.json({ message: 'Logged out successfully' });
});

export default router;

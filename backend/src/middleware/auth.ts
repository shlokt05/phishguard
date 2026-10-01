import { Request, Response, NextFunction } from 'express';
import { supabase } from '../config/supabase';

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    name?: string;
  };
}

export const authenticateUser = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    // If guest/demo user header is passed
    const guestUserId = req.headers['x-user-id'] as string;
    if (guestUserId) {
      req.user = {
        id: guestUserId,
        email: 'user@phishguard.demo',
        name: 'PhishGuard User'
      };
      return next();
    }
    return res.status(401).json({ error: 'Unauthorized: Missing or invalid authorization token' });
  }

  const token = authHeader.split(' ')[1];

  if (!supabase) {
    // In fallback mode, accept simulated JWT or user ID
    req.user = {
      id: token.length > 20 ? 'demo-user-123' : token,
      email: 'user@phishguard.demo',
      name: 'Demo Student'
    };
    return next();
  }

  try {
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      return res.status(401).json({ error: 'Unauthorized: Invalid token session' });
    }

    req.user = {
      id: user.id,
      email: user.email || '',
      name: user.user_metadata?.name || user.email?.split('@')[0]
    };

    next();
  } catch (err) {
    return res.status(401).json({ error: 'Unauthorized: Error validating authentication' });
  }
};

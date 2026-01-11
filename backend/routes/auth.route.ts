import { Router, type Express } from 'express';
import passport from 'passport';
import { handleGoogleCallback, getCurrentUser, logout } from '../controllers/auth.controller.js';
import { authenticateToken, AuthRequest } from '../middlewares/auth.middleware.js';

const router = Router() as Express.Router;

router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })
);

router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/auth/failure',
    session: false,
  }),
  handleGoogleCallback
);

router.get('/user', authenticateToken as any, getCurrentUser);

router.post('/logout', logout);

router.get('/failure', (req, res) => {
  res.status(401).json({ error: 'Authentication failed' });
});

router.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
});

export default router;

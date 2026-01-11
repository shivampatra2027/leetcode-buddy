import { Request, Response } from 'express';
import { generateToken } from '../utils/jwt.js';
import { User } from '../models/User.model.js';
import { AuthRequest } from '../middlewares/auth.middleware.js';

export const handleGoogleCallback = (req: Request, res: Response) => {
  const user = req.user as User;

  if (!user) {
    return res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:3000'}?error=auth_failed`);
  }

  // Generate JWT token
  const token = generateToken(user.id, user.email);

  // Send token to frontend (you can also redirect with token)
  res.send(`
    <html>
      <head>
        <title>Authentication Successful</title>
      </head>
      <body>
        <script>
          // Send message to extension
          if (window.opener) {
            window.opener.postMessage({
              type: 'AUTH_SUCCESS',
              token: '${token}',
              user: ${JSON.stringify({
                id: user.id,
                email: user.email,
                name: user.name,
                picture: user.picture
              })}
            }, '*');
            window.close();
          } else {
            // Fallback for direct browser access
            localStorage.setItem('token', '${token}');
            localStorage.setItem('user', '${JSON.stringify(user)}');
            window.location.href = '${process.env.FRONTEND_URL || 'http://localhost:3000'}';
          }
        </script>
        <p>Authentication successful! You can close this window.</p>
      </body>
    </html>
  `);
};

export const getCurrentUser = (req: AuthRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  res.json({
    user: req.user,
  });
};

export const logout = (req: Request, res: Response) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ error: 'Logout failed' });
    }
    res.json({ message: 'Logged out successfully' });
  });
};

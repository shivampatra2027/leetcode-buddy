import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { config } from '../config/config.route.js';
import { User } from '../models/User.model.js';

// In-memory user store (replace with database in production)
const users = new Map<string, User>();

export const setupPassport = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: config.googleClientId,
        clientSecret: config.googleClientSecret,
        callbackURL: config.googleCallbackUrl,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const email = profile.emails?.[0]?.value;
          const picture = profile.photos?.[0]?.value;

          if (!email) {
            return done(new Error('No email found in Google profile'), undefined);
          }

          let user = Array.from(users.values()).find(u => u.googleId === profile.id);

          if (!user) {
            user = {
              id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
              email,
              name: profile.displayName || 'User',
              picture,
              googleId: profile.id,
              createdAt: new Date(),
            };
            users.set(user.id, user);
          }

          return done(null, user);
        } catch (error) {
          return done(error as Error, undefined);
        }
      }
    )
  );

  passport.serializeUser((user: any, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id: string, done) => {
    const user = users.get(id);
    done(null, user || null);
  });
};

export const getUserById = (id: string): User | undefined => {
  return users.get(id);
};

export const getUserByEmail = (email: string): User | undefined => {
  return Array.from(users.values()).find(u => u.email === email);
};

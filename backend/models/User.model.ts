export interface User {
  id: string;
  email: string;
  name: string;
  picture?: string;
  googleId?: string;
  createdAt: Date;
}

export interface JWTPayload {
  userId: string;
  email: string;
  iat?: number;
  exp?: number;
}

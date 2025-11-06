import jwt from 'jsonwebtoken';
import { InMemoryUser } from '../services/userStore';

const generateAccessToken = (user: InMemoryUser | { _id: string }): string => {
  const payload = {
    sub: user._id
  };
  return jwt.sign(payload, process.env.JWT_SECRET || 'default-secret', { expiresIn: '1d' });
};

const generateRefreshToken = (user: InMemoryUser | { _id: string }): string => {
  const payload = {
    sub: user._id
  };
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET || 'default-refresh-secret', { expiresIn: '30d' });
};

export {
  generateAccessToken,
  generateRefreshToken
};

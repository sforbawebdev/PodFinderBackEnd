import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

const SECRET_KEY = process.env.SECRET_KEY || 'your_secret_key';

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    const decoded = verify(token, SECRET_KEY);
    req.body.userId = decoded as { userId: number };
    next();
  } catch (error) {
    res.status(400).json({ error: 'Invalid token.' });
  }
};
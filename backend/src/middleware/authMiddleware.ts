import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { memoryDB } from '../storage/memoryDB';
import User from '../models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';
const usePostgreSQL = process.env.USE_POSTGRESQL === 'true';

export interface AuthRequest extends Request {
  user?: {
    id: number;
    email: string;
    role: string;
  };
}

export const authenticateToken = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: number; email: string };
    
    if (usePostgreSQL) {
      const user = await User.findByPk(decoded.id);
      if (!user) {
        return res.status(401).json({ message: 'User not found' });
      }
      req.user = { id: user.id, email: user.email, role: user.role };
    } else {
      const user = memoryDB.findUserById(decoded.id);
      if (!user) {
        return res.status(401).json({ message: 'User not found' });
      }
      req.user = { id: user.id, email: user.email, role: user.role };
    }
    
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid token' });
  }
};

export const requireAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Authentication required' });
  }
  
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access required' });
  }
  
  next();
};
import jwt from 'jsonwebtoken';
import { findUserById } from '../data/users.js';

const JWT_SECRET = 'your-super-secret-jwt-key-change-in-production';

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    
    const user = findUserById(decoded.userId);
    if (!user) {
      return res.status(403).json({ message: 'User not found' });
    }
    
    req.user = user;
    next();
  });
};

// Add role to token payload for demo UAC
export const generateToken = (user) => {
  return jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: '24h' });
};
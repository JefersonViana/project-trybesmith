import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const { jwtSecret = 'secret' } = process.env;

export default function validateToken(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).json({ message: 'Token not found' });
  try {
    const payload = jwt.verify(authorization.replace('Bearer ', ''), jwtSecret);
    req.body.payload = payload;
    return next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}
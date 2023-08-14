import jwt from 'jsonwebtoken';
import { User } from '../types/User';

const { jwtSecret = 'secret' } = process.env;

export default function generateToken(user: User): string {
  const token = jwt.sign(user, jwtSecret);
  return token;
}
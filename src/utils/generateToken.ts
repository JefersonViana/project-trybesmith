import jwt, { SignOptions } from 'jsonwebtoken';
import { User } from '../types/User';

const { jwtSecret = 'secret' } = process.env;
const config: SignOptions = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

export default function generateToken(user: User): string {
  const token = jwt.sign(user, jwtSecret, config);
  return token;
}
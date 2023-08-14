import { Request, Response } from 'express';
import loginService from '../services/login.service';
import mapStatusHTTP from '../utils/mapStatusHTTP';

async function getUser(req: Request, res: Response) {
  const { status, data } = await loginService.getUser(req.body);
  
  if (status !== 'SUCCESSFUL') return res.status(mapStatusHTTP(status)).json(data);

  return res.status(200).json({ token: data });
}

export default {
  getUser,
};
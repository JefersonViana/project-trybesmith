import { Request, Response } from 'express';
import ordersService from '../services/orders.service';

async function list(_req: Request, res: Response) {
  const { status, data } = await ordersService.list();
  return res.status(status !== 'SUCCESSFUL' ? 500 : 200).json(data);
}

export default {
  list,
};
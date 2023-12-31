import { Request, Response } from 'express';
import productsService from '../services/products.service';
import mapStatusHTTP from '../utils/mapStatusHTTP';

async function create(req: Request, res: Response) {
  const { status, data } = await productsService.create(req.body);
  
  if (status !== 'SUCCESSFUL') return res.status(mapStatusHTTP(status)).json(data);

  return res.status(201).json(data);
}

async function list(_req: Request, res: Response) {
  const { status, data } = await productsService.list();
  return res.status(status !== 'SUCCESSFUL' ? 500 : 200).json(data);
}

export default {
  create,
  list,
};
import express, { Request, Response } from 'express';

const app = express();

app.use(express.json());

app.get(
  '/',
  (_req: Request, res: Response) => res.status(201).json({ message: 'Aplicação funcionando' }),
);

export default app;

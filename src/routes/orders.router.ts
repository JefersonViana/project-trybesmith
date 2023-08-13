import { Router } from 'express';
import ordersController from '../controllers/orders.controller';

const ordersRouter = Router();

// ordersRouter.post('/', ordersController.create);
ordersRouter.get('/', ordersController.list);

export default ordersRouter;

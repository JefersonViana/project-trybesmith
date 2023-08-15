import { Router } from 'express';
import ordersController from '../controllers/orders.controller';
import validateToken from '../middlewares/validateToken';
import checkFields from '../middlewares/checkFields';

const ordersRouter = Router();

ordersRouter.post('/', validateToken, checkFields, ordersController.create);
ordersRouter.get('/', ordersController.list);

export default ordersRouter;

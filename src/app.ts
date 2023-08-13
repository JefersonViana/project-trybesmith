import express from 'express';
import productsRouter from './routes/products.router';
import ordersRouter from './routes/orders.router';

const app = express();

app.use(express.json());
app.use('/products', productsRouter);
app.use('/orders', ordersRouter);

export default app;

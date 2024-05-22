import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { ProductsRoutes } from './app/modules/products/products.route';
import { OrdersRoutes } from './app/modules/orders/orders.route';
import CustomError from './errors/CustomeErrors';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

//application routes

app.use('/api/products', ProductsRoutes);
app.use('/api/orders', OrdersRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome product management api server!');
});

app.all('*', (req: Request, res: Response, next: NextFunction) => {
  next(new CustomError('Route not found', 404));
});

app.use((err: CustomError, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

export default app;

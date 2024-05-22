
import express,{Application, NextFunction, Request, Response} from 'express'
import cors from 'cors'
import { ProductsRoutes } from './app/modules/products/products.route';
import { OrdersRoutes } from './app/modules/orders/orders.route';
import { number } from 'zod';


const app: Application = express();



//parsers
app.use(express.json());
app.use(cors())


//application routes

app.use("/api/products", ProductsRoutes)
app.use("/api/orders", OrdersRoutes)




app.get('/', (req:Request, res:Response) => {
  res.send('Ecommerce API')
})

app.all("*",(req:Request,res:Response,next:NextFunction)=>{
const error = new Error(`Route not found`);
error.status = 404;
  next(error)
});

app.use((err:any, req:Request, res:Response, next:NextFunction) => {
  res.status(err.status || 500).json({
    success:false,
    message: err.message,
  });
});

export default app;
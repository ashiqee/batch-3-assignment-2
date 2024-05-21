
import express,{Application, Request, Response} from 'express'
import cors from 'cors'
import { ProductsRoutes } from './app/modules/products/products.route';


const app: Application = express();



//parsers
app.use(express.json());
app.use(cors())


//application routes

app.use("/api/products", ProductsRoutes)


app.get('/', (req:Request, res:Response) => {
  res.send('Ecommerce API')
})


export default app;
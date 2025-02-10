import express, { Application, Request, Response } from 'express';
import { ProductRoutes } from './app/modules/product/product.routes';

//cors
const app: Application = express();

// parser
app.use(express.json());
// cors here

// routes
app.use('/api/products', ProductRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

export default app;

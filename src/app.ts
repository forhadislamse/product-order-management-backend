import express, { Application, Request, Response } from 'express';
//cors
const app: Application = express();

// parser
// routes

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

export default app;

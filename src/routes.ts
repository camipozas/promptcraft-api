import { Request, Response } from 'express';

export const helloWorld = (_req: Request, res: Response) => {
  res.send('Hello World!');
};
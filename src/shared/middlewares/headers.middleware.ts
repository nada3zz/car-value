import { INestApplication } from '@nestjs/common';
import { NextFunction, Request, Response } from "express";

export function setupSecurityHeaders(app: INestApplication) {
  app.use((req: Request, res: Response, next: NextFunction): void => {
    res.removeHeader('x-powered-by');
    res.removeHeader('date');
    next();
  });
}

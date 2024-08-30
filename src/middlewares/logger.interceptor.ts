// src/common/logger.interceptor.ts

import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { NextFunction } from 'express';

@Injectable()
export class LoggingMiddleWare implements NestMiddleware {
  logger = new Logger('Response');
  constructor() {}
  use(req: any, res: any, next: NextFunction) {
    const { method, originalUrl: url } = req;
    const reqTime = new Date().getTime();
    res.on('finish', () => {
      const { statusCode } = res;
      const resTime = new Date().getTime();
      if (statusCode === 201 || statusCode === 200) {
        this.logger.log(
          `${method} ${url} ${statusCode} ${resTime - reqTime}ms`,
        );
      }
    });
    next();
  }
}

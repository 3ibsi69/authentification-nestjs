import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Response, Request } from 'express';
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  logger = new Logger('ExceptionFilter');
  constructor() {}
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    this.logger.error(
      ` ${request.method} ${request.originalUrl} ${status} error ${exception.message}`,
    );
    const errorDetails = exception.getResponse();
    response.status(status).json({ error: true, errorDetails });
  }
}

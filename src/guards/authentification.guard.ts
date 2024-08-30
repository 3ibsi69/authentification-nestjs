import {
  CanActivate,
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt/dist';
import { Request } from 'express';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const token = this.extractTokenFromHeader(request);
      if (!token) {
        throw new UnauthorizedException('Token not found');
      }
      const payload = this.jwtService.verify(token);
      request.user = payload;
    } catch (e) {
      throw new UnauthorizedException('Invalid token');
    }
    return true;
  }
  private extractTokenFromHeader(request: Request): string | undefined {
    return request.headers.authorization.split(' ')[1];
  }
}

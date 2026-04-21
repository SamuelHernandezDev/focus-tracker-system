//backend\src\auth\guards\jwt-auth.guard.ts
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { Request } from 'express';
import { JwtPayload } from '../types/jwt-payload.type';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();

    const token = request.cookies?.token;

    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    try {
      const payload = this.jwtService.verify<JwtPayload>(token);

      request['user'] = {
        id: payload.sub,
        email: payload.email,
      };

      return true;
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
//backend\src\auth\auth.service.ts

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { mockUsers } from '../users/data/mock-users';
import { JwtPayload } from './types/jwt-payload.type';
import { User } from '../users/types/user.type';
import type { Response, Request } from 'express';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<Omit<User, 'password'>> {
    const user = mockUsers.find((u) => u.email === email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (user.password !== password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const { password: _, ...result } = user;

    return result;
  }

  async login(email: string, password: string, res: Response) {
    const user = await this.validateUser(email, password);

    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
    };

    const token = this.jwtService.sign(payload);

    res.cookie('token', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
    });

    return {
      user,
    };
  }

  // ======================
  // EXTENSION TOKEN
  // ======================

  generateExtensionToken(userId: string, email: string) {
    return this.jwtService.sign(
      {
        sub: userId,
        email,
        type: 'extension',
      },
      {
        expiresIn: '7d',
      },
    );
  }

  async getMe(req: Request) {
    const token = req.cookies?.token;

    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    try {
      const payload = this.jwtService.verify<JwtPayload>(token);

      return {
        user: {
          id: payload.sub,
          email: payload.email,
        },
      };
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }

  async logout(res: Response) {
    res.clearCookie('token', {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
    });

    return {
      message: 'Logged out successfully',
    };
  }

  test() {
    return {
      message: 'Auth module working',
    };
  }
}

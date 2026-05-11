//backend\src\auth\auth.controller.ts

import {
  Controller,
  Get,
  Post,
  Body,
  Res,
  Req,
  UseGuards,
} from '@nestjs/common';

import type { AuthRequest } from './types/auth-request.type';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

import type { Response, Request } from 'express';

import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  test() {
    return this.authService.test();
  }

  // ======================
  // LOGIN
  // ======================

  @Post('login')
  login(@Body() body: LoginDto, @Res({ passthrough: true }) res: Response) {
    return this.authService.login(body.email, body.password, res);
  }

  // ======================
  // ME
  // ======================

  @Get('me')
  getMe(@Req() req: Request) {
    return this.authService.getMe(req);
  }

  // ======================
  // EXTENSION TOKEN
  // ======================

  @Post('extension-token')
  @UseGuards(JwtAuthGuard)
  getExtensionToken(@Req() req: AuthRequest) {
    const user = req.user;

    const token = this.authService.generateExtensionToken(user.id, user.email);

    return {
      token,
    };
  }

  // ======================
  // LOGOUT
  // ======================

  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    return this.authService.logout(res);
  }

  // ======================
  // TEST PROTECTED
  // ======================

  @Get('protected')
  @UseGuards(JwtAuthGuard)
  protected() {
    return {
      message: 'You are authenticated',
    };
  }
}

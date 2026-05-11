//backend\src\auth\auth.module.ts

import { Module } from '@nestjs/common';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

import { JwtModule } from '@nestjs/jwt';

import { ConfigService } from '@nestjs/config';

import { PassportModule } from '@nestjs/passport';

import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    // ======================
    // PASSPORT
    // ======================

    PassportModule,

    // ======================
    // JWT
    // ======================

    JwtModule.registerAsync({
      inject: [ConfigService],

      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET')!,

        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRES_IN')! as any,
        },
      }),
    }),
  ],

  controllers: [AuthController],

  providers: [AuthService, JwtStrategy],

  exports: [AuthService, JwtModule, PassportModule],
})
export class AuthModule {}

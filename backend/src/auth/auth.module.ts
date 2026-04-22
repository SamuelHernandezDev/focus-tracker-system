// backend\src\auth\auth.module.ts
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        // Obtenemos las variables pero asignamos un valor por defecto para evitar el error "secretOrPrivateKey must have a value"
        const secret = configService.get<string>('JWT_SECRET') || 'secret_key_residencia_itt_2026';
        const expiresIn = configService.get<string>('JWT_EXPIRES_IN') || '1d';

        return {
          secret: secret,
          signOptions: {
            expiresIn: expiresIn as any,
          },
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [
    AuthService,
    JwtModule,
  ],
})
export class AuthModule {}
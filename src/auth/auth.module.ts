import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guards/auth.guard';


@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true, // 전역으로 JwtModule 사용
      secret: jwtConstants.secret, // JWT 비밀키
      signOptions: { expiresIn: '1h' }, // JWT 토큰 유효 기간
    }),
  ],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,  // 전역 가드로 AuthGuard 등록
      useClass: AuthGuard,
    },
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
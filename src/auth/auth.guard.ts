import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from './decorators/public.decorator'

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService, private reflector: Reflector) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        // Public 데코레이터가 설정된 경로인지 확인
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        // Public 데코레이터가 설정된 경로라면 인증 체크를 건너뜀
        if (isPublic) {
            return true;
        }

        // 요청 객체 가져오기
        const request = context.switchToHttp().getRequest();
        // 요청 헤더에서 JWT 토큰 추출
        const token = this.extractTokenFromHeader(request);
        // JWT 토큰이 없으면 UnauthorizedException 예외 발생
        if (!token) {
            throw new UnauthorizedException();
        }
        try {
            // JWT 토큰 검증
            const payload = await this.jwtService.verifyAsync(token, {
                secret: jwtConstants.secret,
            });
            // 유효한 토큰이라면 페이로드를 요청 객체에 할당
            request['user'] = payload;
        } catch {
            // 토큰 검증에 실패하면 UnauthorizedException 예외 발생
            throw new UnauthorizedException();
        }
        return true;
    }

    // 요청 헤더에서 JWT 토큰 추출하는 메서드
    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}

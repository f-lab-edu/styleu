import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async login(email: string, pass: string): Promise<{ access_token: string }> {
        // 이메일로 사용자 정보 조회
        const user = await this.usersService.findByEmail(email);
        // 사용자가 없거나 비밀번호가 일치하지 않으면 UnauthorizedException 예외 발생
        if (user?.password !== pass) {
            throw new UnauthorizedException();
        }
        const payload = { sub: user.id, email: user.email };
        // Access token 발급
        return {
            access_token: await this.jwtService.sign(payload),
        };
    }
}
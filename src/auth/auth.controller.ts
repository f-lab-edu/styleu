import { Controller, Get, Post, Body, HttpCode, HttpStatus, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserLoginDto } from './dto/login.dto';
import { AuthGuard } from './guards/auth.guard';
import { Public } from "./decorators/public.decorator";
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    // Public 데코레이터로 인해 인증 없이 접근 가능
    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('login')
    async login(@Body() userLoginDto: UserLoginDto) {
        return this.authService.login(userLoginDto.email, userLoginDto.password);
    }

    // AuthGuard를 적용하여 인증이 필요한 경로로 설정
    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user; // 요청 객체에서 user 데이터 반환
    }
}
import { ExceptionFilter, Catch, ArgumentsHost, UnauthorizedException, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(UnauthorizedException)
export class UnauthorizedExceptionFilter implements ExceptionFilter {
    catch(exception: UnauthorizedException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.UNAUTHORIZED;

        // 보안에 민감한 정보는 서버 로그에만 기록
        console.error(`Unauthorized access attempt: ${request.url}`, exception.message);

        // 클라이언트에게는 일반적인 메시지 전달
        response
            .status(status)
            .json({
                statusCode: status,
                timestamp: new Date().toISOString(),
                path: request.url,
                message: '접근이 거부되었습니다.',
            });
    }
}

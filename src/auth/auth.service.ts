import { Injectable, UnauthorizedException } from '@nestjs/common'
import { UsersService } from '../users/users.service'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(email: string, pass: string): Promise<{ access_token: string }> {
    // 이메일로 사용자 정보 조회
    const user = await this.usersService.findByEmail(email)
    console.log(user)
    // 사용자가 없거나 비밀번호가 일치하지 않으면 UnauthorizedException 예외 발생
    if (!user) {
      throw new UnauthorizedException('The user was not found.')
    }
    if (user.password !== pass) {
      throw new UnauthorizedException(`The user (email: ${email}} password does not match`)
    }
    const payload = { sub: user.id, email: user.email, role: user.role.name }
    // Access token 발급
    return {
      access_token: this.jwtService.sign(payload),
    }
  }
}

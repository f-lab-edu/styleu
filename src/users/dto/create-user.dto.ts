import { IsInt, IsNotEmpty } from 'class-validator'
export class CreateUserDto {
  email: string
  nickname: string
  password: string

  @IsInt()
  @IsNotEmpty()
  roleId: number
}

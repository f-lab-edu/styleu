import { IsInt, IsNotEmpty, IsBoolean } from 'class-validator'
export class CreateBoardDto {
  title: string
  content?: string
  @IsInt()
  @IsNotEmpty()
  userId?: number
  @IsBoolean()
  isVisible?: boolean
}

import { IsInt, IsNotEmpty } from 'class-validator';
export class CreateBoardDto {
    // id: number;
    title: string;
    content?: string;

    @IsInt()
    @IsNotEmpty()
    userId?: number;
}
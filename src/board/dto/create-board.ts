import { Prisma } from "@prisma/client";

export class CreateBoardDto implements Prisma.boardCreateInput{
    id: number;
    title: string;
    content?: string;
}
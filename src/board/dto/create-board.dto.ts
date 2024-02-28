import { Prisma } from "@prisma/client";

export class CreateBoardDto implements Prisma.BoardCreateInput {
    // id: number;
    title: string;
    content?: string;
}
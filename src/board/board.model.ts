import { Prisma } from "@prisma/client";

export class Board implements Prisma.BoardCreateInput{
  id: number;
  title: string;
  content?: string;
}
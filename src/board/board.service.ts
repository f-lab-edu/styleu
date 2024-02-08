import { PrismaService } from "src/prisma.service";
import { Board } from "./board.model";
import { Injectable } from "@nestjs/common";


@Injectable()
export class BoardService{

  constructor(private prisma: PrismaService){}

  async getAllBoard(): Promise<Board[]>{
    return this.prisma.board.findMany()
  }

  async getBoard(id:number): Promise<Board | null>{
    return this.prisma.board.findUnique({where: {id:Number(id)}})
  }

  async createBoard(data: Board): Promise<Board>{
    return this.prisma.board.create({
      data,
    })
  }

  async updateBoard(id:number,data:Board):Promise<Board>{

    return this.prisma.board.update({
      where: {id:Number(id)},
      data: { title: data.title, content: data.content }
    })
  }

  async deleteBoard(id:number):Promise<Board>{
    return this.prisma.board.delete({
      where:{id: Number(id)}
    })
  }
}
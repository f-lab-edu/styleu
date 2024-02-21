import { PrismaService } from "src/prisma.service";
import { CreateBoardDto } from "./dto/create-board";
import { Injectable } from "@nestjs/common";


@Injectable()
export class BoardService{

  constructor(private prisma: PrismaService){}

  async getAllBoard(): Promise<CreateBoardDto[]>{
    return this.prisma.board.findMany()
  }

  async getBoard(id:number): Promise<CreateBoardDto | null>{
    return this.prisma.board.findUnique({where: {id:Number(id)}})
  }

  async createBoard(data: CreateBoardDto): Promise<CreateBoardDto>{
    return this.prisma.board.create({
      data,
    })
  }

  async updateBoard(id:number,data:CreateBoardDto):Promise<CreateBoardDto>{

    return this.prisma.board.update({
      where: {id:Number(id)},
      data: { title: data.title, content: data.content }
    })
  }

  async deleteBoard(id:number):Promise<CreateBoardDto>{
    return this.prisma.board.delete({
      where:{id: Number(id)}
    })
  }
}
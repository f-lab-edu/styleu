import { PrismaService } from "src/prisma.service";
import { CreateBoardDto } from "./dto/create-board.dto";
import {Injectable, NotFoundException} from "@nestjs/common";

@Injectable()
export class BoardService{

  constructor(private prisma: PrismaService){}

  async createBoard(createBoardDto: CreateBoardDto) {
    const {title, content, userId} = createBoardDto;

    return this.prisma.board.create({
      data: {
        content,
        title,
        user: {
          connect: {
            id: userId
          }
        }
      }
    });
  }


  async getAllBoard(): Promise<CreateBoardDto[]>{
    return this.prisma.board.findMany({});
  };

  async getBoard(id:number): Promise<CreateBoardDto | null>{
    const board = this.prisma.board.findUnique({
      where: {id},
    });
    if (!board) {
      throw new NotFoundException(`Board with ID ${id} not found`);
    }
    return board;
  };

  async findAllBoardsByUserId(userId: number) {
    return this.prisma.board.findMany({
      where: {
        userId: Number(userId),
      },
      include: {
        user:true
      }
    });
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

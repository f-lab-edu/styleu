import { PrismaService } from "src/prisma.service";
import { CreateBoardDto } from "./dto/create-board.dto";
import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class BoardService{

  constructor(private prisma: PrismaService){}

  async updateVisibility(id: number, userId: number, isVisible: boolean): Promise<CreateBoardDto> {
    const board = await this.prisma.board.findUnique({
      where: { id },
    });

    if (!board) {
      throw new NotFoundException();
    }

    if (board.userId !== userId) {
      throw new UnauthorizedException();
    }

    const updatedBoard = await this.prisma.board.update({
      where: { id },
      data: { isVisible },
    });

    return updatedBoard;
  }

  async createBoard(createBoardDto: CreateBoardDto) {
    const {title, content, userId, isVisible} = createBoardDto;

    return this.prisma.board.create({
      data: {
        content,
        title,
        user: {
          connect: {
            id: userId
          }
        },
        isVisible
      }
    });
  }

  async getAllBoard(): Promise<CreateBoardDto[]>{
    return this.prisma.board.findMany({
      where: { isVisible: true },
    });
  };

  async getBoard(id:number): Promise<CreateBoardDto | null>{
    const board = this.prisma.board.findUnique({
      where: {id, isVisible: true},
    });
    if (!board) {
      throw new NotFoundException(`Board with ID ${id} not found`);
    }
    return board;
  };

  async findAllBoardsByUserId(userId: number) {
    return this.prisma.board.findMany({
      where: {
        userId: userId
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

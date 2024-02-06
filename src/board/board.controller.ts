import { Body, Controller, Delete, Get, Param, Post, Put, Req, Res } from "@nestjs/common";
import { Board } from "./board.model";
import { BoardService } from "./board.service";
import { Request, Response } from "express";

@Controller('api/v1/board')
export class BoardController{

  constructor(private readonly boardService: BoardService){}


  @Get()
  async getAllBoard(@Req() request:Request, @Res() response:Response ):Promise<any>{
    const result =  await this.boardService.getAllBoard()
    return response.status(200).json({
      status: "Ok!",
      message: "Successfully fetch data!",
      result: result
    })
  }

  @Post()
  async postBoard(@Body() postData: Board):Promise<Board>{
    return this.boardService.createBoard(postData)
  }

  @Get(':id')
  async getBoard(@Param('id') id:number):Promise<Board | null>{
    return this.boardService.getBoard(id)
  }

  @Delete(':id')
  async deleteBoard(@Param('id') id:number):Promise<Board>{
    return this.boardService.deleteBoard(id)
  }

  @Put(':id')
  async updateBook(@Param('id') id: number,@Body() data: Board): Promise<Board> {
    return this.boardService.updateBoard(id,data);
  }
}
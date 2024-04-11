import { Body, Controller, Get, Param, Post, Delete, Put, Request, UseGuards, Patch } from '@nestjs/common'
import { BoardService } from './board.service'
import { CreateBoardDto } from './dto/create-board.dto'
import { AuthGuard } from '../auth/guards/auth.guard'
import { ForbiddenException } from '@nestjs/common'

@Controller('api/v1/board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Patch('/:id/visibility')
  @UseGuards(AuthGuard)
  async updateVisibility(
    @Param('id') id: number,
    @Request() req,
    @Body('isVisible') isVisible: boolean,
  ): Promise<CreateBoardDto> {
    console.log(req.user)
    return this.boardService.updateVisibility(id, req.user.sub, isVisible)
  }

  @Post()
  async postBoard(@Body() postData: CreateBoardDto): Promise<CreateBoardDto> {
    return this.boardService.createBoard(postData)
  }

  @Get()
  async getAllBoard(): Promise<CreateBoardDto[]> {
    return this.boardService.getAllBoard()
  }

  @Get(':id')
  async getBoard(@Param('id') id: number): Promise<CreateBoardDto | null> {
    return this.boardService.getBoard(id)
  }

  @Get('post/:userId')
  @UseGuards(AuthGuard)
  async findAllBoardsByUserId(@Param('userId') userId: number, @Request() req) {
    if (userId !== req.user.sub) {
      throw new ForbiddenException('Access denied')
    }
    return this.boardService.findAllBoardsByUserId(userId)
  }

  @Put(':id')
  async updateBoard(@Param('id') id: number, @Body() data: CreateBoardDto): Promise<CreateBoardDto> {
    return this.boardService.updateBoard(id, data)
  }

  @Delete(':id')
  async deleteBoard(@Param('id') id: number): Promise<CreateBoardDto> {
    return this.boardService.deleteBoard(id)
  }
}

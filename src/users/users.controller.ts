import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public } from "../auth/decorators/public.decorator";
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
// import { GetUsersDto } from './dto/get-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }
  @Get()
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  findAll() {
    // 모든 사용자 정보를 반환하는 로직
    return this.usersService.findAll();
  }

  @Public()
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    // const { name, email } = createUserDto;
    // return `유저를 생성했습니다. 이름: ${name}, 이메일: ${email}`;
    return this.usersService.createUser(createUserDto)
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto): Promise<UpdateUserDto> {
    return this.usersService.update(id, updateUserDto)
  }

  @Get(':id')
  findOneRedirection(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: number):Promise<CreateUserDto>{
    return this.usersService.deleteUser(id)
  }

}
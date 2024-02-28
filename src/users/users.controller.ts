import { Controller, Get, Post, Body, Param, Res, Redirect, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
// import { GetUsersDto } from './dto/get-user.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { UserLoginDto } from "./dto/user-login.dto";

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    // const { name, email } = createUserDto;

    // return `유저를 생성했습니다. 이름: ${name}, 이메일: ${email}`;
    return this.usersService.createUser(createUserDto)
  }

  @Post('email-verify')
  async verifyEmail(@Query() dto: VerifyEmailDto):Promise<string> {
    console.log(dto);
    return
  }

  @Post('login')
  async login(@Body() dto: UserLoginDto):Promise<string> {
    console.log(dto);
    return
  }

  // @Get()
  // findAll(@Res() res, @Query() dto: GetUsersDto) {
  //   console.log(dto);
  //
  //   const users = this.usersService.findAll()
  //
  //   return res.status(200).send(users);
  // }

  // @Redirect('https://nestjs.com', 301)
  @Get(':id')
  findOneRedirection(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }


}
import { PrismaService } from "src/prisma.service";
import { Injectable, HttpException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService){}
  async createUser(createUserDto: CreateUserDto) {
    return this.prisma.user.create({
      data: createUserDto
    })
  }

  // findAll() {
  //   return `This action returns all users`;
  // }

  async findOne(id: number) {
    const found = await this.prisma.user.findUnique({where: {id:Number(id)}})
    if(!found){
      throw new HttpException(`there is no ${id}`, 400);
    }
    const { password, id: userId, ...result } = found;
    return result;
    // return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
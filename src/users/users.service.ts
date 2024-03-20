import { PrismaService } from "src/prisma.service";
import { Injectable, HttpException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Prisma, User } from "@prisma/client";

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService){}

  findAll() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        nickname: true,
        roleId: true
      },
    });
  }

  async createUser(createUserDto: CreateUserDto) {
    const { email, nickname, password, roleId } = createUserDto
    return this.prisma.user.create({
      data: {
        email,
        nickname,
        password,
        role: {
          connect:{
            id: roleId
          }
        }
      }
    })

  }

  async findByEmail(email: string):Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async findOne(id: number): Promise<Omit<Prisma.UserCreateInput, 'password' | 'id'>> {
    const found = await this.prisma.user.findUnique({where: {id:id}})
    console.log("found: ", found)
    if(!found){
      throw new HttpException(`there is no ${id}`, 400);
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, id: userId, ...result } = found;
    return result;
    // return `This action returns a #${id} user`;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<{[key: string]: any}> {
    return this.prisma.user.update({
      where: {id: id},
      data: updateUserDto
    })
    // return `This action updates a #${id} user`;
  }

  async deleteUser(id: number):Promise<CreateUserDto> {
    return this.prisma.user.delete({where: {id:id}})
    // return `This action removes a #${id} user`;
  }
}
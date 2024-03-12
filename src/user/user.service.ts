import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findOne(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async findAll() {
    return this.prisma.user.findMany();
  }

  // Prisma.UserCreateInput or CreateUserDto?
  async create(createUserDto: CreateUserDto) {
    const user = {
      ...createUserDto,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    return this.prisma.user.create({ data: user });
  }

  async updatePassword(id: string, updatePasswordDto: UpdatePasswordDto) {
    return this.prisma.user.update({
      where: { id },
      data: {
        password: updatePasswordDto.newPassword,
        version: { increment: 1 },
        updatedAt: Date.now(),
      },
    });
  }

  async remove(id: string) {
    return this.prisma.user.delete({ where: { id } });
  }
}

import { Injectable } from '@nestjs/common';
import { db } from 'src/database/db';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  create(createUserDto: CreateUserDto) {
    const user: User = {
      id: uuidv4(),
      ...createUserDto,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    db.users.push(user);

    return user;
  }

  findAll() {
    return db.users;
  }

  findOne(id: string) {
    return db.users.find((user) => user.id === id);
  }

  update(id: string, updatePasswordDto: UpdatePasswordDto) {
    const user = this.findOne(id);

    user.password = updatePasswordDto.newPassword;
    user.version += 1;
    user.updatedAt = Date.now();

    return user;
  }

  remove(id: string) {
    const userIndex = db.users.findIndex((user) => user.id === id);

    db.users.splice(userIndex, 1);
  }
}

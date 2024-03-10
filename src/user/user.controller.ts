import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseFilters,
} from '@nestjs/common';
import { NotFoundExceptionFilter } from 'src/filters/entity-not-found-exception.filter';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UserService } from './user.service';

// TODO
// @UseInterceptors(ClassSerializerInterceptor)

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // TODO
  // @Get('seed')
  // seed() {
  //   const userFactory = (idx: number): Partial<User> => ({
  //     id: `${idx}`,
  //     login: `user${idx}`,
  //     password: `password${idx}`,
  //   });

  //   this.userService.seed(userFactory, 10);

  //   return this.userService.findAll();
  // }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    const createdUser = this.userService.create(createUserDto);
    // TODO find a better way to handle this
    const { password, ...userWithoutPassword } = createdUser;

    return userWithoutPassword;
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @UseFilters(new NotFoundExceptionFilter())
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    const user = this.userService.findOne(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const currentUserPassword = this.userService.findOne(id).password;

    if (updatePasswordDto.oldPassword !== currentUserPassword) {
      throw new ForbiddenException('Forbidden, old password is incorrect');
    }

    const updatedUser = this.userService.updatePassword(id, updatePasswordDto);
    // TODO find a better way to handle this
    const { password, ...userWithoutPassword } = updatedUser;

    return userWithoutPassword;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    const user = this.userService.findOne(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    this.userService.remove(id);
  }
}

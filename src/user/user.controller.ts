import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { StatusCodes } from 'http-status-codes';
import { Logger } from 'src/logger/logger.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UserService } from './user.service';

// TODO
// @UseInterceptors(ClassSerializerInterceptor)

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private logger: Logger,
  ) {
    this.logger.setContext('CatsService');
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const createdUser = await this.userService.create(createUserDto);
    // TODO find a better way to handle this
    const { password, ...userWithoutPassword } = createdUser;

    return userWithoutPassword;
  }

  @Get()
  async findAll() {
    const users = await this.userService.findAll();

    // TODO find a better way to handle this
    const usersWithoutPassword = users.map(({ password, ...user }) => user);

    return usersWithoutPassword;
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const user = await this.userService.findOne(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    const user = await this.userService.findOne(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const { password: currentUserPassword } = await this.userService.findOne(
      id,
    );

    if (updatePasswordDto.oldPassword !== currentUserPassword) {
      throw new ForbiddenException('Forbidden, old password is incorrect');
    }

    const updatedUser = await this.userService.updatePassword(
      id,
      updatePasswordDto as any,
    );
    // TODO find a better way to handle this
    const { password, ...userWithoutPassword } = updatedUser;

    return userWithoutPassword;
  }

  @Delete(':id')
  @HttpCode(StatusCodes.NO_CONTENT)
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    const user = await this.userService.findOne(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.userService.remove(id);
  }
}

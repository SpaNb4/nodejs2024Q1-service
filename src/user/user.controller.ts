import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { StatusCodes } from 'http-status-codes';
import { validate } from 'uuid';
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
  create(@Body() createUserDto: CreateUserDto, @Res() res) {
    const createdUser = this.userService.create(createUserDto);
    // TODO find a better way to handle this
    const { password, ...userWithoutPassword } = createdUser;

    res.status(StatusCodes.CREATED).json(userWithoutPassword);
  }

  @Get()
  findAll(@Res() res) {
    const users = this.userService.findAll();

    res.status(StatusCodes.OK).json(users);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string, @Res() res) {
    const user = this.userService.findOne(id);

    if (!user) {
      res.status(StatusCodes.NOT_FOUND).json({ error: 'User not found' });
      return;
    }

    res.status(StatusCodes.OK).json(user);
  }

  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
    @Res() res,
  ) {
    if (!updatePasswordDto.newPassword || !updatePasswordDto.oldPassword) {
      res.status(StatusCodes.BAD_REQUEST).json({
        error: 'Invalid request, new password, and old password are required',
      });
      return;
    }

    if (!this.userService.findOne(id)) {
      res.status(StatusCodes.NOT_FOUND).json({ error: 'User not found' });
      return;
    }

    const currentUserPassword = this.userService.findOne(id).password;

    if (updatePasswordDto.oldPassword !== currentUserPassword) {
      res.status(StatusCodes.FORBIDDEN).json({
        error: 'Forbidden, old password is incorrect',
      });
      return;
    }

    const updatedUser = this.userService.updatePassword(id, updatePasswordDto);
    // TODO find a better way to handle this
    const { password, ...userWithoutPassword } = updatedUser;

    res.status(StatusCodes.OK).json(userWithoutPassword);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string, @Res() res) {
    if (!this.userService.findOne(id)) {
      res.status(StatusCodes.NOT_FOUND).json({ error: 'User not found' });
      return;
    }

    this.userService.remove(id);

    res.status(StatusCodes.NO_CONTENT).send();
  }
}

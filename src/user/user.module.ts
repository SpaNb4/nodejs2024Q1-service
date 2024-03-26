import { Module } from '@nestjs/common';
import { Logger } from 'src/logger/logger.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [UserService, Logger],
  imports: [Logger],
})
export class UserModule {}

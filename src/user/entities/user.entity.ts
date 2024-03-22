import { IsInt, IsNotEmpty, IsString, IsUUID, Min } from 'class-validator';

const invalidRequestMessage = 'Invalid request, login, password are required';

export class User {
  @IsUUID(4)
  id: string;

  @IsString()
  @IsNotEmpty({ message: invalidRequestMessage })
  login: string;

  @IsString()
  @IsNotEmpty({ message: invalidRequestMessage })
  // TODO
  // @Exclude({ toPlainOnly: true })
  password: string;

  @IsInt()
  @Min(1)
  version: number;

  @IsInt()
  createdAt: number;

  @IsInt()
  updatedAt: number;

  // TODO
  // constructor(data: Partial<User>) {
  //   Object.assign(this, data);
  // }
}

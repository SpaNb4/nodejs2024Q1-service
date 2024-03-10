import { IsInt, IsNotEmpty, IsString, IsUUID, Min } from 'class-validator';

export class User {
  @IsUUID(4)
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  login: string;

  @IsString()
  @IsNotEmpty()
  // TODO
  // @Exclude({ toPlainOnly: true })
  password: string;

  @IsInt()
  @Min(1)
  @IsNotEmpty()
  version: number;

  @IsInt()
  @IsNotEmpty()
  createdAt: number;

  @IsInt()
  @IsNotEmpty()
  updatedAt: number;

  // TODO
  // constructor(data: Partial<User>) {
  //   Object.assign(this, data);
  // }
}

import { IsNotEmpty, IsString } from 'class-validator';

export class UpdatePasswordDto {
  @IsString()
  @IsNotEmpty({
    message: 'Invalid request, new password, and old password are required',
  })
  oldPassword: string;

  @IsString()
  @IsNotEmpty({
    message: 'Invalid request, new password, and old password are required',
  })
  newPassword: string;
}

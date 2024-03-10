import { IsBoolean, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class Artist {
  @IsUUID(4)
  @IsNotEmpty({ message: 'Invalid request, name, and grammy are required' })
  id: string;

  @IsString()
  @IsNotEmpty({ message: 'Invalid request, name, and grammy are required' })
  name: string;

  @IsBoolean()
  @IsNotEmpty({ message: 'Invalid request, name, and grammy are required' })
  grammy: boolean;
}

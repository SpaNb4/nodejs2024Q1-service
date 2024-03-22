import { IsInt, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { IsNullable } from 'src/validators/is-nullable';

const invalidRequestMessage =
  'Invalid request, name, year, and artistId are required';

export class Album {
  @IsUUID(4)
  id: string;

  @IsString()
  @IsNotEmpty({
    message: invalidRequestMessage,
  })
  name: string;

  @IsInt()
  @IsNotEmpty({
    message: invalidRequestMessage,
  })
  year: number;

  @IsUUID(4)
  @IsNullable()
  @IsNotEmpty({
    message: invalidRequestMessage,
  })
  artistId: string | null;
}

import { IsInt, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { IsNullable } from 'src/validators/is-nullable';

export class Album {
  @IsUUID(4)
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty({
    message: 'Invalid request, name, year, and artistId are required',
  })
  name: string;

  @IsInt()
  @IsNotEmpty({
    message: 'Invalid request, name, year, and artistId are required',
  })
  year: number;

  @IsUUID(4)
  @IsNullable()
  @IsNotEmpty({
    message: 'Invalid request, name, year, and artistId are required',
  })
  artistId: string | null;
}

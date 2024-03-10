import { IsInt, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { IsNullable } from 'src/validators/is-nullable';

export class Track {
  @IsUUID(4)
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty({
    message:
      'Invalid request, name, artistId, albumId, and duration are required',
  })
  name: string;

  @IsUUID(4)
  @IsNullable()
  @IsNotEmpty({
    message:
      'Invalid request, name, artistId, albumId, and duration are required',
  })
  artistId: string | null;

  @IsUUID(4)
  @IsNullable()
  @IsNotEmpty({
    message:
      'Invalid request, name, artistId, albumId, and duration are required',
  })
  albumId: string | null;

  @IsInt()
  @IsNotEmpty({
    message:
      'Invalid request, name, artistId, albumId, and duration are required',
  })
  duration: number;
}

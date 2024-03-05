import { Artist } from '../entities/artist.entity';

export type CreateArtistDto = Pick<Artist, 'name' | 'grammy'>;

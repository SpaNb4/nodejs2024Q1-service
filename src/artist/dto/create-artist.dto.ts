import { Artist } from '../entities/artist.entity';

export type CreateArtistDto = Omit<Artist, 'id'>;

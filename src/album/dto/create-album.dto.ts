import { Album } from '../entities/album.entity';

export type CreateAlbumDto = Omit<Album, 'id'>;

import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';
import { Favorites } from 'src/favorites/entities/favorite.entity';
import { Track } from 'src/track/entities/track.entity';
import { User } from 'src/user/entities/user.entity';

// TODO replace it with shared class?
// https://discord.com/channels/755676888680366081/1069908830017835071/1070450720387641406
interface Database {
  users: User[];
  artists: Artist[];
  tracks: Track[];
  albums: Album[];
  favorites: Favorites;
}

export const db: Database = {
  users: [],
  artists: [],
  tracks: [],
  albums: [],
  favorites: {
    artists: [],
    albums: [],
    tracks: [],
  },
};

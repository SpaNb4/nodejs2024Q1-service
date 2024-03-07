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
  users: [
    {
      id: '84ee5f9a-f00f-43ee-897d-e80892a83492',
      login: 'John',
      password: 'password',
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
    {
      id: '079080c7-a79f-41b8-b0c7-a8106d740e03',
      login: 'Jane',
      password: 'password',
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
    {
      id: 'b7f43170-1ce7-479e-9632-a5881991ef63',
      login: 'Mike',
      password: 'password',
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
    {
      id: '407a6857-5d8b-4114-abf7-16c3cf926e72',
      login: 'Emily',
      password: 'password',
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
    {
      id: 'b2939ec7-2fc2-4a6e-9ff0-f37cded8fe89',
      login: 'David',
      password: 'password',
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
  ],
  artists: [],
  tracks: [],
  albums: [
    {
      id: 'f4b3b3e3-3b6e-4f3d-8f6e-6e3d4f3b3b4f',
      name: 'The Dark Side of the Moon',
      year: 1973,
      artistId: null,
    },
  ],
  favorites: {
    artists: [],
    albums: [],
    tracks: [],
  },
};

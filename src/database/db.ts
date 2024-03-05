import { Artist } from 'src/artist/entities/artist.entity';
import { Track } from 'src/track/entities/track.entity';
import { User } from 'src/user/entities/user.entity';

interface Database {
  users: User[];
  artists: Artist[];
  tracks: Track[];
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
};

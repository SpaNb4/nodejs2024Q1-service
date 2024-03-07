import { Injectable } from '@nestjs/common';
import { db } from 'src/database/db';
// import { UpdateFavoriteDto } from './dto/update-favorite.dto';

@Injectable()
export class FavoritesService {
  findAll() {
    const favoritesArtistsIds = db.favorites.artists;
    const favoritesAlbumsIds = db.favorites.albums;
    const favoritesTracksIds = db.favorites.tracks;

    const artists = db.artists.filter((artist) =>
      favoritesArtistsIds.includes(artist.id),
    );

    const albums = db.albums.filter((album) =>
      favoritesAlbumsIds.includes(album.id),
    );

    const tracks = db.tracks.filter((track) =>
      favoritesTracksIds.includes(track.id),
    );

    return {
      artists,
      albums,
      tracks,
    };
  }

  addTrackToFavorite(id: string) {
    db.favorites.tracks.push(id);
  }

  addAlbumToFavorite(id: string) {
    db.favorites.albums.push(id);
  }

  addArtistToFavorite(id: string) {
    db.favorites.artists.push(id);
  }

  removeTrackFromFavorite(id: string) {
    const index = db.favorites.tracks.indexOf(id);

    if (index > -1) {
      db.favorites.tracks.splice(index, 1);
    }
  }

  removeAlbumFromFavorite(id: string) {
    const index = db.favorites.albums.indexOf(id);

    if (index > -1) {
      db.favorites.albums.splice(index, 1);
    }
  }

  removeArtistFromFavorite(id: string) {
    const index = db.favorites.artists.indexOf(id);

    if (index > -1) {
      db.favorites.artists.splice(index, 1);
    }
  }
}

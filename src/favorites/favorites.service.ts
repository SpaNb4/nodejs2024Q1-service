import { Injectable } from '@nestjs/common';
import { AlbumService } from 'src/album/album.service';
import { ArtistService } from 'src/artist/artist.service';
import { TrackService } from 'src/track/track.service';
import { Favorites } from './entities/favorite.entity';

@Injectable()
export class FavoritesService {
  private favorites: Favorites = {
    artists: [],
    albums: [],
    tracks: [],
  };

  constructor(
    private readonly artistService: ArtistService,
    private readonly albumService: AlbumService,
    private readonly trackService: TrackService,
  ) {}

  getFavorites() {
    const artists = this.artistService
      .findAll()
      .filter((artist) => this.favorites.artists.includes(artist.id));

    const albums = this.albumService
      .findAll()
      .filter((album) => this.favorites.albums.includes(album.id));

    const tracks = this.trackService
      .findAll()
      .filter((track) => this.favorites.tracks.includes(track.id));

    return {
      artists,
      albums,
      tracks,
    };
  }

  addTrackToFavorite(id: string) {
    this.favorites.tracks.push(id);
  }

  addAlbumToFavorite(id: string) {
    this.favorites.albums.push(id);
  }

  addArtistToFavorite(id: string) {
    this.favorites.artists.push(id);
  }

  removeTrackFromFavorite(id: string) {
    const index = this.favorites.tracks.indexOf(id);

    if (index > -1) {
      this.favorites.tracks.splice(index, 1);
    }
  }

  removeAlbumFromFavorite(id: string) {
    const index = this.favorites.albums.indexOf(id);

    if (index > -1) {
      this.favorites.albums.splice(index, 1);
    }
  }

  removeArtistFromFavorite(id: string) {
    const index = this.favorites.artists.indexOf(id);

    if (index > -1) {
      this.favorites.artists.splice(index, 1);
    }
  }
}

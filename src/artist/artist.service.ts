import { Injectable } from '@nestjs/common';
import { AlbumService } from 'src/album/album.service';
import { DatabaseService } from 'src/database/database.service';

import { TrackService } from 'src/track/track.service';
import { Artist } from './entities/artist.entity';

@Injectable()
export class ArtistService extends DatabaseService<Artist> {
  constructor(
    private readonly albumService: TrackService,
    private readonly trackService: AlbumService,
  ) {
    super();
  }

  removeArtist(id: string) {
    super.remove(id);

    const artistAlbums = this.albumService
      .findAll()
      .filter((album) => album.artistId === id);

    artistAlbums.forEach((album) => {
      album.artistId = null;
    });

    const artistTracks = this.trackService
      .findAll()
      .filter((track) => track.artistId === id);

    artistTracks.forEach((track) => {
      track.artistId = null;
    });
  }
}

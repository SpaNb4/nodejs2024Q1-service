import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { TrackService } from 'src/track/track.service';
import { Album } from './entities/album.entity';

@Injectable()
export class AlbumService extends DatabaseService<Album> {
  constructor(private readonly trackService: TrackService) {
    super();
  }

  removeAlbum(id: string) {
    super.remove(id);

    const albumTracks = this.trackService
      .findAll()
      .filter((track) => track.albumId === id);

    albumTracks.forEach((track) => {
      track.albumId = null;
    });
  }
}

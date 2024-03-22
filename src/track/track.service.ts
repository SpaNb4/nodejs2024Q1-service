import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Track } from './entities/track.entity';

@Injectable()
export class TrackService extends DatabaseService<Track> {
  constructor() {
    super();
  }
}

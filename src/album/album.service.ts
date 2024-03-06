import { Injectable } from '@nestjs/common';
import { db } from 'src/database/db';
import { v4 as uuidv4 } from 'uuid';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Injectable()
export class AlbumService {
  create(createAlbumDto: CreateAlbumDto) {
    const album = {
      id: uuidv4(),
      ...createAlbumDto,
    };

    db.albums.push(album);

    return album;
  }

  findAll() {
    return db.albums;
  }

  findOne(id: string) {
    return db.albums.find((album) => album.id === id);
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album = this.findOne(id);

    Object.assign(album, updateAlbumDto);

    return album;
  }

  remove(id: string) {
    const albumIndex = db.albums.findIndex((album) => album.id === id);

    db.albums.splice(albumIndex, 1);
  }
}

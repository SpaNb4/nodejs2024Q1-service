import { Injectable } from '@nestjs/common';
import { Album } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { TrackService } from 'src/track/track.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Injectable()
export class AlbumService {
  constructor(
    private prisma: PrismaService,
    private trackService: TrackService,
  ) {}

  async findOne(id: string) {
    return this.prisma.album.findUnique({ where: { id } });
  }

  async findAll(): Promise<Album[]> {
    return this.prisma.album.findMany();
  }

  async create(createAlbumDto: CreateAlbumDto) {
    return this.prisma.album.create({ data: createAlbumDto });
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    return this.prisma.album.update({ where: { id }, data: updateAlbumDto });
  }

  async removeAlbum(id: string) {
    await this.prisma.album.delete({ where: { id } });

    const tracks = await this.trackService.findAll();

    const albumTracks = tracks.filter((track) => track.albumId === id);

    albumTracks.forEach((track) => {
      track.albumId = null;
    });
  }
}

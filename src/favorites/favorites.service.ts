import { Injectable } from '@nestjs/common';
import { Album, Artist, Track } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

const FAVORITES_ID = '1';

@Injectable()
export class FavoritesService {
  constructor(private prisma: PrismaService) {
    void this.initializeFavoritesRecord();
  }

  private async initializeFavoritesRecord(): Promise<void> {
    const favorites = await this.prisma.favorites.findUnique({
      where: { id: FAVORITES_ID },
    });

    if (!favorites) {
      await this.prisma.favorites.create({
        data: { id: FAVORITES_ID },
      });
    }
  }

  async getFavorites(): Promise<{
    artists: Artist[];
    albums: Album[];
    tracks: Track[];
  }> {
    return this.prisma.favorites.findFirst({
      include: {
        artists: true,
        albums: true,
        tracks: true,
      },
    });
  }

  async addTrackToFavorite(trackId: string) {
    await this.prisma.favorites.update({
      where: { id: FAVORITES_ID },
      data: {
        tracks: { connect: { id: trackId } },
      },
    });
  }

  async addAlbumToFavorite(albumId: string) {
    await this.prisma.favorites.update({
      where: { id: FAVORITES_ID },
      data: {
        albums: { connect: { id: albumId } },
      },
    });
  }

  async addArtistToFavorite(artistId: string) {
    await this.prisma.favorites.update({
      where: { id: FAVORITES_ID },
      data: {
        artists: { connect: { id: artistId } },
      },
    });
  }

  async removeTrackFromFavorite(trackId: string) {
    await this.prisma.favorites.update({
      where: { id: FAVORITES_ID },
      data: {
        tracks: { disconnect: { id: trackId } },
      },
    });
  }

  async removeAlbumFromFavorite(albumId: string) {
    await this.prisma.favorites.update({
      where: { id: FAVORITES_ID },
      data: {
        albums: { disconnect: { id: albumId } },
      },
    });
  }

  async removeArtistFromFavorite(artistId: string) {
    await this.prisma.favorites.update({
      where: { id: FAVORITES_ID },
      data: {
        artists: { disconnect: { id: artistId } },
      },
    });
  }
}

import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  UnprocessableEntityException,
} from '@nestjs/common';
import { AlbumService } from 'src/album/album.service';
import { ArtistService } from 'src/artist/artist.service';
import { TrackService } from 'src/track/track.service';
import { FavoritesService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(
    private readonly favoritesService: FavoritesService,
    private readonly trackService: TrackService,
    private readonly albumService: AlbumService,
    private readonly artistService: ArtistService,
  ) {}

  @Get()
  async findAll() {
    return await this.favoritesService.getFavorites();
  }

  @Post('track/:id')
  async addTrackToFavorite(@Param('id', ParseUUIDPipe) id: string) {
    const track = await this.trackService.findOne(id);

    if (!track) {
      throw new UnprocessableEntityException('Track not found');
    }

    await this.favoritesService.addTrackToFavorite(id);
  }

  @Post('album/:id')
  async addAlbumToFavorite(@Param('id', ParseUUIDPipe) id: string) {
    const album = await this.albumService.findOne(id);

    if (!album) {
      throw new UnprocessableEntityException('Album not found');
    }

    this.favoritesService.addAlbumToFavorite(id);
  }

  @Post('artist/:id')
  async addArtistToFavorite(@Param('id', ParseUUIDPipe) id: string) {
    const artist = await this.artistService.findOne(id);

    if (!artist) {
      throw new UnprocessableEntityException('Artist not found');
    }

    await this.favoritesService.addArtistToFavorite(id);
  }

  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeTrackFromFavorite(@Param('id', ParseUUIDPipe) id: string) {
    const track = await this.trackService.findOne(id);

    if (!track) {
      throw new NotFoundException('Track not found');
    }

    await this.favoritesService.removeTrackFromFavorite(id);
  }

  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeAlbumFromFavorite(@Param('id', ParseUUIDPipe) id: string) {
    const album = await this.albumService.findOne(id);

    if (!album) {
      throw new NotFoundException('Album not found');
    }

    await this.favoritesService.removeAlbumFromFavorite(id);
  }

  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeArtistFromFavorite(@Param('id', ParseUUIDPipe) id: string) {
    const artist = await this.artistService.findOne(id);

    if (!artist) {
      throw new NotFoundException('Artist not found');
    }

    await this.favoritesService.removeArtistFromFavorite(id);
  }
}

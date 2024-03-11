import {
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  UnprocessableEntityException,
} from '@nestjs/common';
import { StatusCodes } from 'http-status-codes';
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
  findAll() {
    return this.favoritesService.getFavorites();
  }

  @Post('track/:id')
  addTrackToFavorite(@Param('id', ParseUUIDPipe) id: string) {
    const track = this.trackService.findOne(id);

    if (!track) {
      throw new UnprocessableEntityException('Track not found');
    }

    this.favoritesService.addTrackToFavorite(id);
  }

  @Post('album/:id')
  addAlbumToFavorite(@Param('id', ParseUUIDPipe) id: string) {
    const album = this.albumService.findOne(id);

    if (!album) {
      throw new UnprocessableEntityException('Album not found');
    }

    this.favoritesService.addAlbumToFavorite(id);
  }

  @Post('artist/:id')
  addArtistToFavorite(@Param('id', ParseUUIDPipe) id: string) {
    const artist = this.artistService.findOne(id);

    if (!artist) {
      throw new UnprocessableEntityException('Artist not found');
    }

    this.favoritesService.addArtistToFavorite(id);
  }

  @Delete('track/:id')
  @HttpCode(StatusCodes.NO_CONTENT)
  removeTrackFromFavorite(@Param('id', ParseUUIDPipe) id: string) {
    const track = this.trackService.findOne(id);

    if (!track) {
      throw new NotFoundException('Track not found');
    }

    this.favoritesService.removeTrackFromFavorite(id);
  }

  @Delete('album/:id')
  @HttpCode(StatusCodes.NO_CONTENT)
  removeAlbumFromFavorite(@Param('id', ParseUUIDPipe) id: string) {
    const album = this.albumService.findOne(id);

    if (!album) {
      throw new NotFoundException('Album not found');
    }

    this.favoritesService.removeAlbumFromFavorite(id);
  }

  @Delete('artist/:id')
  @HttpCode(StatusCodes.NO_CONTENT)
  removeArtistFromFavorite(@Param('id', ParseUUIDPipe) id: string) {
    const artist = this.artistService.findOne(id);

    if (!artist) {
      throw new NotFoundException('Artist not found');
    }

    this.favoritesService.removeArtistFromFavorite(id);
  }
}

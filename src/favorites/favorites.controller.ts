import {
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Res,
} from '@nestjs/common';
import { StatusCodes } from 'http-status-codes';
import { AlbumService } from 'src/album/album.service';
import { ArtistService } from 'src/artist/artist.service';
import { TrackService } from 'src/track/track.service';
import { validate } from 'uuid';
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
  addTrackToFavorite(@Param('id', ParseUUIDPipe) id: string, @Res() res) {
    if (!this.trackService.findOne(id)) {
      res
        .status(StatusCodes.UNPROCESSABLE_ENTITY)
        .json({ error: `Track with id ${id} not found` });
      return;
    }

    this.favoritesService.addTrackToFavorite(id);

    res.status(StatusCodes.CREATED).send('Track added to favorites');
  }

  @Post('album/:id')
  addAlbumToFavorite(@Param('id', ParseUUIDPipe) id: string, @Res() res) {
    if (!validate(id)) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: 'Invalid request, id should be a valid uuid' });
      return;
    }

    if (!this.albumService.findOne(id)) {
      res
        .status(StatusCodes.UNPROCESSABLE_ENTITY)
        .json({ error: `Album with id ${id} not found` });
      return;
    }

    this.favoritesService.addAlbumToFavorite(id);

    res.status(StatusCodes.CREATED).send('Album added to favorites');
  }

  @Post('artist/:id')
  addArtistToFavorite(@Param('id', ParseUUIDPipe) id: string, @Res() res) {
    if (!this.artistService.findOne(id)) {
      res
        .status(StatusCodes.UNPROCESSABLE_ENTITY)
        .json({ error: `Artist with id ${id} not found` });
      return;
    }

    this.favoritesService.addArtistToFavorite(id);

    res.status(StatusCodes.CREATED).send('Artist added to favorites');
  }

  @Delete('track/:id')
  removeTrackFromFavorite(@Param('id', ParseUUIDPipe) id: string, @Res() res) {
    if (!this.trackService.findOne(id)) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: `Track with id ${id} not found` });
      return;
    }

    this.favoritesService.removeTrackFromFavorite(id);

    res.status(StatusCodes.NO_CONTENT).send('Track removed from favorites');
  }

  @Delete('album/:id')
  removeAlbumFromFavorite(@Param('id', ParseUUIDPipe) id: string, @Res() res) {
    if (!this.albumService.findOne(id)) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: `Album with id ${id} not found` });
      return;
    }

    this.favoritesService.removeAlbumFromFavorite(id);

    res.status(StatusCodes.NO_CONTENT).send('Album removed from favorites');
  }

  @Delete('artist/:id')
  removeArtistFromFavorite(@Param('id', ParseUUIDPipe) id: string, @Res() res) {
    if (!this.artistService.findOne(id)) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: `Artist with id ${id} not found` });
      return;
    }

    this.favoritesService.removeArtistFromFavorite(id);

    res.status(StatusCodes.NO_CONTENT).send('Artist removed from favorites');
  }
}

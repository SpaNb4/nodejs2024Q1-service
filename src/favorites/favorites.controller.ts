import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  UseFilters,
} from '@nestjs/common';
import { NotFoundExceptionFilter } from 'src/filters/entity-not-found-exception.filter';
import { FavoritesService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  findAll() {
    return this.favoritesService.getFavorites();
  }

  @Post('track/:id')
  @UseFilters(new NotFoundExceptionFilter(HttpStatus.UNPROCESSABLE_ENTITY))
  addTrackToFavorite(@Param('id', ParseUUIDPipe) id: string) {
    this.favoritesService.addTrackToFavorite(id);
  }

  @Post('album/:id')
  @UseFilters(new NotFoundExceptionFilter(HttpStatus.UNPROCESSABLE_ENTITY))
  addAlbumToFavorite(@Param('id', ParseUUIDPipe) id: string) {
    this.favoritesService.addAlbumToFavorite(id);
  }

  @Post('artist/:id')
  @UseFilters(new NotFoundExceptionFilter(HttpStatus.UNPROCESSABLE_ENTITY))
  addArtistToFavorite(@Param('id', ParseUUIDPipe) id: string) {
    this.favoritesService.addArtistToFavorite(id);
  }

  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseFilters(new NotFoundExceptionFilter())
  removeTrackFromFavorite(@Param('id', ParseUUIDPipe) id: string) {
    this.favoritesService.removeTrackFromFavorite(id);
  }

  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseFilters(new NotFoundExceptionFilter())
  removeAlbumFromFavorite(@Param('id', ParseUUIDPipe) id: string) {
    this.favoritesService.removeAlbumFromFavorite(id);
  }

  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseFilters(new NotFoundExceptionFilter())
  removeArtistFromFavorite(@Param('id', ParseUUIDPipe) id: string) {
    this.favoritesService.removeArtistFromFavorite(id);
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { StatusCodes } from 'http-status-codes';
import { TrackService } from 'src/track/track.service';
import { validate } from 'uuid';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Controller('album')
export class AlbumController {
  constructor(
    private readonly albumService: AlbumService,
    private readonly trackService: TrackService,
  ) {}

  @Post()
  create(@Body() createAlbumDto: CreateAlbumDto, @Res() res) {
    if (
      !createAlbumDto.name ||
      !createAlbumDto.year ||
      createAlbumDto.artistId === undefined
    ) {
      res.status(StatusCodes.BAD_REQUEST).json({
        error: 'Invalid request, name, year, and artistId are required',
      });
      return;
    }

    const createdAlbum = this.albumService.create(createAlbumDto);

    res.status(StatusCodes.CREATED).json(createdAlbum);
  }

  @Get()
  findAll(@Res() res) {
    const albums = this.albumService.findAll();

    res.status(StatusCodes.OK).json(albums);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Res() res) {
    if (!validate(id)) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: 'Invalid id format provided, must be UUID' });
      return;
    }

    const album = this.albumService.findOne(id);

    if (!album) {
      res.status(StatusCodes.NOT_FOUND).json({ error: 'Album not found' });
      return;
    }

    res.status(StatusCodes.OK).json(album);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
    @Res() res,
  ) {
    if (!validate(id)) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: 'Invalid id format provided, must be UUID' });
      return;
    }

    // TODO validate types using class validator?
    if (
      !updateAlbumDto.name ||
      typeof updateAlbumDto.name !== 'string' ||
      !updateAlbumDto.year ||
      typeof updateAlbumDto.year !== 'number' ||
      updateAlbumDto.artistId === undefined
    ) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: 'Invalid request, at least one field is required' });
      return;
    }

    if (!this.albumService.findOne(id)) {
      res.status(StatusCodes.NOT_FOUND).json({ error: 'Album not found' });
      return;
    }

    const updatedAlbum = this.albumService.update(id, updateAlbumDto);

    res.status(StatusCodes.OK).json(updatedAlbum);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Res() res) {
    if (!validate(id)) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: 'Invalid id format provided, must be UUID' });
      return;
    }

    const album = this.albumService.findOne(id);

    if (!album) {
      res.status(StatusCodes.NOT_FOUND).json({ error: 'Album not found' });
      return;
    }

    // TODO find a better way to handle this
    const tracks = this.trackService.findAll();
    const albumTracks = tracks.filter((track) => track.albumId === id);

    albumTracks.forEach((track) => {
      track.albumId = null;
    });
    //

    this.albumService.remove(id);

    res.status(StatusCodes.NO_CONTENT).send();
  }
}

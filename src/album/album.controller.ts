import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { StatusCodes } from 'http-status-codes';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

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
  findOne(@Param('id', ParseUUIDPipe) id: string, @Res() res) {
    const album = this.albumService.findOne(id);

    if (!album) {
      res.status(StatusCodes.NOT_FOUND).json({ error: 'Album not found' });
      return;
    }

    res.status(StatusCodes.OK).json(album);
  }

  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
    @Res() res,
  ) {
    // TODO validate types using class validator?
    if (
      typeof updateAlbumDto.name !== 'string' ||
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
  remove(@Param('id', ParseUUIDPipe) id: string, @Res() res) {
    const album = this.albumService.findOne(id);

    if (!album) {
      res.status(StatusCodes.NOT_FOUND).json({ error: 'Album not found' });
      return;
    }

    this.albumService.removeAlbum(id);

    res.status(StatusCodes.NO_CONTENT).send();
  }
}

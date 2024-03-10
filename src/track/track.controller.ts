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
import { validate } from 'uuid';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackService } from './track.service';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post()
  create(@Body() createTrackDto: CreateTrackDto, @Res() res) {
    if (
      !createTrackDto.name ||
      createTrackDto.artistId === undefined ||
      createTrackDto.albumId === undefined ||
      !createTrackDto.duration
    ) {
      res.status(StatusCodes.BAD_REQUEST).json({
        error:
          'Invalid request, name, artistId, albumId, and duration are required',
      });
      return;
    }

    const createdTrack = this.trackService.create(createTrackDto);

    res.status(StatusCodes.CREATED).json(createdTrack);
  }

  @Get()
  findAll(@Res() res) {
    const tracks = this.trackService.findAll();

    res.status(StatusCodes.OK).json(tracks);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string, @Res() res) {
    const track = this.trackService.findOne(id);

    if (!track) {
      res.status(StatusCodes.NOT_FOUND).json({ error: 'Track not found' });
      return;
    }

    res.status(StatusCodes.OK).json(track);
  }

  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTrackDto: UpdateTrackDto,
    @Res() res,
  ) {
    if (
      !updateTrackDto.name ||
      updateTrackDto.artistId === undefined ||
      updateTrackDto.albumId === undefined ||
      updateTrackDto.duration === undefined
    ) {
      res.status(StatusCodes.BAD_REQUEST).json({
        error:
          'Invalid request, name, artistId, albumId, and duration are required',
      });
      return;
    }

    if (!this.trackService.findOne(id)) {
      res.status(StatusCodes.NOT_FOUND).json({ error: 'Track not found' });
      return;
    }

    const updatedTrack = this.trackService.update(id, updateTrackDto);

    res.status(StatusCodes.OK).json(updatedTrack);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string, @Res() res) {
    if (!this.trackService.findOne(id)) {
      res.status(StatusCodes.NOT_FOUND).json({ error: 'Track not found' });
      return;
    }

    this.trackService.remove(id);

    res.status(StatusCodes.NO_CONTENT).send();
  }
}

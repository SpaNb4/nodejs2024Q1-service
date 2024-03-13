import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@Injectable()
export class TrackService {
  constructor(private prisma: PrismaService) {}

  async findOne(id: string) {
    return this.prisma.track.findUnique({ where: { id } });
  }

  async findAll() {
    return this.prisma.track.findMany();
  }

  async create(createTrackDto: CreateTrackDto) {
    return this.prisma.track.create({ data: createTrackDto });
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    return this.prisma.track.update({ where: { id }, data: updateTrackDto });
  }

  async remove(id: string) {
    return this.prisma.track.delete({ where: { id } });
  }
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Injectable()
export class ArtistService {
  constructor(private prisma: PrismaService) {}

  async findOne(id: string) {
    return this.prisma.artist.findUnique({ where: { id } });
  }

  async findAll() {
    return this.prisma.artist.findMany();
  }

  async create(createArtistDto: CreateArtistDto) {
    return this.prisma.artist.create({ data: createArtistDto });
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    return this.prisma.artist.update({ where: { id }, data: updateArtistDto });
  }

  async remove(id: string) {
    return this.prisma.artist.delete({ where: { id } });
  }
}

import { Module } from '@nestjs/common';
import { AlbumModule } from './album/album.module';
import { ArtistModule } from './artist/artist.module';
import { AuthModule } from './auth/auth.module';
import { FavoritesModule } from './favorites/favorites.module';
import { LoggerModule } from './logger/logger.module';
import { PrismaModule } from './prisma/prisma.module';
import { TrackModule } from './track/track.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    UserModule,
    ArtistModule,
    TrackModule,
    AlbumModule,
    FavoritesModule,
    PrismaModule,
    AuthModule,
    LoggerModule,
  ],
})
export class AppModule {}

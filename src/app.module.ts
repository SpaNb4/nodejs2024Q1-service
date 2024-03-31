import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AlbumModule } from './album/album.module';
import { ArtistModule } from './artist/artist.module';
import { AuthGuard } from './auth/auth.guard';
import { AuthModule } from './auth/auth.module';
import { FavoritesModule } from './favorites/favorites.module';
import { Logger } from './logger/logger.service';
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
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    Logger,
  ],
})
export class AppModule {}

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "login" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1,
    "createdAt" BIGINT NOT NULL DEFAULT 0,
    "updatedAt" BIGINT NOT NULL DEFAULT 0,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Artist" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "grammy" BOOLEAN NOT NULL,

    CONSTRAINT "Artist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Album" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "artistId" TEXT,

    CONSTRAINT "Album_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Track" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "artistId" TEXT,
    "albumId" TEXT,
    "duration" INTEGER NOT NULL,

    CONSTRAINT "Track_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Favorites" (
    "id" TEXT NOT NULL,

    CONSTRAINT "Favorites_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_FavoriteArtists" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_FavoriteAlbums" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_FavoriteTracks" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_FavoriteArtists_AB_unique" ON "_FavoriteArtists"("A", "B");

-- CreateIndex
CREATE INDEX "_FavoriteArtists_B_index" ON "_FavoriteArtists"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_FavoriteAlbums_AB_unique" ON "_FavoriteAlbums"("A", "B");

-- CreateIndex
CREATE INDEX "_FavoriteAlbums_B_index" ON "_FavoriteAlbums"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_FavoriteTracks_AB_unique" ON "_FavoriteTracks"("A", "B");

-- CreateIndex
CREATE INDEX "_FavoriteTracks_B_index" ON "_FavoriteTracks"("B");

-- AddForeignKey
ALTER TABLE "Album" ADD CONSTRAINT "Album_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Track" ADD CONSTRAINT "Track_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Track" ADD CONSTRAINT "Track_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FavoriteArtists" ADD CONSTRAINT "_FavoriteArtists_A_fkey" FOREIGN KEY ("A") REFERENCES "Artist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FavoriteArtists" ADD CONSTRAINT "_FavoriteArtists_B_fkey" FOREIGN KEY ("B") REFERENCES "Favorites"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FavoriteAlbums" ADD CONSTRAINT "_FavoriteAlbums_A_fkey" FOREIGN KEY ("A") REFERENCES "Album"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FavoriteAlbums" ADD CONSTRAINT "_FavoriteAlbums_B_fkey" FOREIGN KEY ("B") REFERENCES "Favorites"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FavoriteTracks" ADD CONSTRAINT "_FavoriteTracks_A_fkey" FOREIGN KEY ("A") REFERENCES "Favorites"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FavoriteTracks" ADD CONSTRAINT "_FavoriteTracks_B_fkey" FOREIGN KEY ("B") REFERENCES "Track"("id") ON DELETE CASCADE ON UPDATE CASCADE;

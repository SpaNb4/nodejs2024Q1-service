# Stage 1: Install dependencies and build the app
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npx prisma generate
RUN npm run build

# Stage 2: Copy built artifacts and set up production environment
FROM node:20-alpine AS production

WORKDIR /app

COPY --from=build /app/package*.json ./
COPY --from=build /app/dist ./dist/
COPY --from=build /app/prisma ./prisma/
COPY --from=build /app/tsconfig*.json ./
COPY --from=build /app/doc/api.yaml ./doc/api.yaml

RUN npm ci --omit=dev

CMD sh -c "npx prisma migrate dev --name init && npm run start:dev"

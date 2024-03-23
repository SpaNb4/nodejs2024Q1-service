FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm ci

COPY . .

RUN npm run build

FROM node:20-alpine AS production

WORKDIR /app

COPY --from=build /app/package*.json ./
COPY --from=build /app/dist ./dist/
COPY --from=build /app/prisma ./prisma/
COPY --from=build /app/tsconfig*.json ./
COPY --from=build /app/doc/api.yaml ./doc/api.yaml

RUN npm ci --omit=dev

CMD sh -c "npx prisma migrate deploy && npm run start:dev"

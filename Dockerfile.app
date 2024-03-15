FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

CMD sh -c "npx prisma migrate dev --name init && npm run start:dev"
# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- Docker - [Download & Install Docker](https://www.docker.com/get-started).

## Cloning the repository

```
git clone git@github.com:SpaNb4/nodejs2024Q1-service.git
```

## Installing dependencies

```
npm ci
```

## You can run the application in two ways:

### Using Docker for both the application and the database

#### Running the application and the database

```
docker compose up
```

By default, the application will run on port 4000, in development mode, so it will automatically restart when you make changes to the code in the `src` directory.

#### Stopping the application and the database

```
docker compose down
```

### Using Docker for the database and running the application locally

#### Changing the environment variable

```
POSTGRES_HOST=localhost
```

#### Running the database

```
docker compose up -d postgres
```

#### Migrating the database

```
npx prisma migrate deploy
```

#### Running the application locally

```
npm run start:dev
```

## Environment variables

Create a `.env` file in the root directory of the project and add the following environment variables:

- BACKEND_PORT: The port on which the backend application will run.
- POSTGRES_HOST: The hostname of the Postgres database.
- POSTGRES_PORT: The port number of the Postgres database.
- POSTGRES_USER: The username for accessing the Postgres database.
- POSTGRES_PASSWORD: The password for accessing the Postgres database.
- POSTGRES_DB: The name of the Postgres database.
- PGADMIN_PORT: The port on which PgAdmin will run.
- PGADMIN_DEFAULT_EMAIL: The default email address for PgAdmin.
- PGADMIN_DEFAULT_PASSWORD: The default password for PgAdmin.
- DATABASE_URL: The connection URL for the Prisma ORM.

## PgAdmin

If you want to access the PgAdmin interface and manage the Postgres database, you can do so by visiting http://localhost:5050 in your browser. You can log in using the email and password you provided in the `.env` file.

## OpenAPI/Swagger

You can access the OpenAPI documentation by typing http://localhost:4000/api/ in your browser.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

After application running open new terminal and enter:

- To run all tests without authorization

```
npm run test
```

- To run only one of all test suites

```
npm run test -- <path to suite>
```

- To run all test with authorization

```
npm run test:auth
```

- To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

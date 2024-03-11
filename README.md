# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Cloning the repository

```
git clone git@github.com:SpaNb4/nodejs2024Q1-service.git
```

## Installing dependencies

```
npm ci
```

## Running application

Production mode:

```
npm start
```

Development mode:

```
npm run start:dev
```

By default, the application will run on port 4000. You can change it by changing the `PORT` variable in the `.env` file.

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

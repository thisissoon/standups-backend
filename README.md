![soon_ logo](https://user-images.githubusercontent.com/20629455/28109490-27c0b602-66e7-11e7-9918-578beb7dfa9d.png)
![screen shot 2017-07-12 at 09 52 39](https://user-images.githubusercontent.com/20629455/28109776-2833e306-66e8-11e7-86d6-b285d08b3cb1.png)

___
<br>

# Stand-ups Visualisation Backend

A simple Express, PostgresSQL and Sequelize Web API for the serving of data from SOON_'s daily stand-ups. This repo also includes code for parsing `stand-up.txt` files into JSON, running database migrations and seeding data.

This project was used as a learning tool for: 

* Express application generator, 
* Sequelize and it's CLI, 
* relational databases, 
* environment variables and app configuration,
* HAL API specification,
* API Blueprint,
* integration testing with Dredd,
* continuous integration with CircleCI, and
* deployment with Docker, AWS and nginx.

This API is used by other web apps where SOON_ stand-up data is required.

This API utilises SOON_'s `node-standups` node module in the `stand-up.txt` data parsing process.

This repo makes SOON_'s stand-up data publicly accessible. This data can be replaced with similarly formated data.

`docs/backend.apib` can be viewed with [aglio](https://www.npmjs.com/package/aglio).

### Docker Setup

#### 1. spin up containers
```shell
docker-compose up -d
```

#### 2. enter container
```shell
$ docker exec -i -t standupsvisualisationbackend_web_1 sh
```

#### 3. parse input data
```shell
$ npm run data:parse
```

#### 4. initialise database
```shell
$ DB_NAME=stand-ups npm run db:init
```
Endpoints detailed in the API documentation now served with the data stored in the database on `localhost:3000/api` unless configured otherwise.

Any postgreSQL data will persist in this repo's `.data/` directory.

### Local Setup

#### 1. install dependencies

```shell
$ npm i
```

#### 2. create database

```shell
$ psql
```

```shell
CREATE DATEBASE "stand-ups";
```

Creates a postgreSQL database, here called `stand-ups`.

#### 3. parse input data

```shell
$ npm run data:parse
```

Consumes `data/stand-ups.txt` and produces `data/stand-ups.json`.

The input file path can be configured with the `PATH` argument:

```shell
$ npm run data:parse -- PATH=/path/to/your/file
```

The input file must included date followed by positions followed by summaries in the follow the following format:
```
12/12/2017: foo > bar | bar > foo
```
Any errors in the data will be logged to the terminal and can then be corrected.

#### 4. initialise database

```shell
$ DB_NAME=stand-ups npm run db:init
```

Make sure to pass in the the name of your database as an environment variable (defaults to `stand-ups-test` otherwise).

Runs the database migrations (`/db/migrations`) and the seed file (`/db/seed/index.js`) with `data/staff-members.json` and `data/stand-ups.json` as inputs.

Any errors in the `stand-ups.json` file (missing staff members or duplicate names) will be logged to the terminal and not saved to the database. These can then be address, the database dropped and `db:init` ran again.

#### 5. spin up the server

```shell
$ DB_NAME=stand-ups npm start
```
Make sure to pass in the the name of your database as an environment variable (defaults to `stand-ups-test` otherwise).

Serves the endpoints detailed in the API documentation with the data stored in the database on `localhost:3000` unless configured otherwise.

### Testing

```shell
$ npm test
```

Drops test database if exists, creates new database, runs migrations and executes Dredd. Dredd runs the fixtures, spins up the server and tests that the APIs responses to each of the requests in the API docs are as expected.

### Configuration

Configuration options, as well as their node environment variables are detailed below (these can also be found in `config/config.js`).

* username: `process.env.DB_USERNAME`,
* password: `process.env.DB_PASSWORD`,
* database: `process.env.DB_NAME`,
* host: `process.env.DB_HOST`,
* logging: `process.env.DB_LOGGING`,
* loggerLevel: `process.env.LOGGER_LEVEL`,
* serverPort: `process.env.SERVER_PORT`,
* testDb: `process.env.TEST_DB_NAME`,
* root: `process.env.ROOT`

### Task List

- [ ] Deal more elegantly with the initial seeding of data.


![soon_ logo](https://user-images.githubusercontent.com/20629455/28109490-27c0b602-66e7-11e7-9918-578beb7dfa9d.png)
![screen shot 2017-07-12 at 09 52 39](https://user-images.githubusercontent.com/20629455/28109776-2833e306-66e8-11e7-86d6-b285d08b3cb1.png)

___
<br>

# Stand-ups Visualisation Backend

A simple Express, PostgresSQL and Sequelize Web API and Database configuration for the storage and serving of data from SOON_'s daily stand-ups.

This project was used as a learning tool for: 

* Express application generator, 
* Sequelize and it's CLI, 
* relational databases, 
* environment variables and app configuration,
* HAL API specification,
* API Blueprint,
* integration testing with Dredd, and
* continous integration with CircleCI.

This API is used by other web services where SOON_ stand-up data is required. For example CLIs where stand-up data can be entered and posted  to this server to be saved.

This API utilises SOON_'s `node-standups` node module in the database seeding process.

### Local Development Setup

With the app's default configuration the below commands will populate the database with the test data provided in the repo and serve the endpoints detailed in the API Blueprint `doc/backend.apib` locally on port 3000.

Development and production seed data can be added in the following file structure.

This data, and relevant databases can then by used by setting the `NODE_ENV` environment variable to the  appropriate value (`dev` or `prod`) with the setup commands.

```shell
|__data
| |_production
| | |_input
| | | |_production-data.txt
| |_development
| | |_input
| | | |_development-data.txt
``` 

#### 1. Install Dependencies

```shell
$ npm i
```

#### 2. Parse Input Data

```shell
$ npm run data:parse
```

Consumes the first file in the `data/test/input` folder and produces a `stand-ups.json` file in `data/test`. The JSON file will later be used to seed the database.

#### 3. Initialise Database

```shell
$ npm run db:init
```

Drops, creates, migrates and seeds the database.

#### 4. Spin Up The Server

```shell
$ npm start
```

Serves the endpoints detailed in the API documentation with the data stored in the database.

### Testing

```shell
$ npm test
```

With the app's default configuration initialises the test DB, spins up the server, executes the fixtures and uses Dredd to test whether the requests to the API detailed in the API Blueprint recieve an expected response.

### Configuration

Configuration options, as well as their node environment variables are detailed below (these can also be found in `config/config.js`).

* username: `process.env.DB_USERNAME`,
* password: `process.env.DB_PASSWORD`,
* database: `process.env.DB_NAME`,
* host: `process.env.DB_HOST`,
* logging: `process.env.DB_LOGGING`,
* loggerLevel: `process.env.LOGGER_LEVEL`,
* parseData: `process.env.PARSE_DATA`,
* serverPort: `process.env.SERVER_PORT`

Furthermore, there are three preset modes to set the above values appropriately; `test`, `dev`, and `prod`. These can be activated by setting the node environment variable `NODE_ENV` equal to the desired mode. For example:

`NODE_ENV=dev npm start`
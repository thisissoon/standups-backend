const fs             = require('fs');
const StandupParser  = require('standup-parser').StandupParser;

const config         = require('../config/config');
const logger         = require('../logger').logger;

const standupParser  = new StandupParser(logger);

const path = process.argv
  .filter(element => element.includes('PATH'))
  .map(element => element.split('=')[1])[0];

standupParser.parse(path)
  .then(json => {
    fs.writeFile(`${__dirname}/stand-ups.json`, JSON.stringify(json), 'utf8', function (err) {
      if (err) {
        logger.log('error', err);
        process.exit(1);
      }
      logger.log('info', 'The file was saved!');
    });
  })
  .catch(err => {
    console.log(err);
  });

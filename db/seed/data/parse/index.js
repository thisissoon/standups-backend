const fs             = require('fs');
const StandupParser  = require('standup-parser').StandupParser;

const logger         = require('../../../../logger').logger;

const standupParser  = new StandupParser(logger);

standupParser.parse(`${__dirname}/input`)
  .then(json => {
    fs.writeFile(`${__dirname}/../stand-ups.json`, JSON.stringify(json), 'utf8', function (err) {
      if (err) {
        logger.log('error', err);
        process.exit(1);
      }
      logger.log('info', 'The file was saved!');
    });
  });

const fs             = require('fs');
const StandupParser  = require('standup-parser').StandupParser;

const config         = require('../../config/config')[process.env.MODE || 'dev'];
const logger         = require('../../logger').logger;

const standupParser  = new StandupParser(logger);

standupParser.parse(`${__dirname}/../${config.data}/input`)
  .then(json => {
    fs.writeFile(`${__dirname}/../${config.data}/stand-ups.json`, JSON.stringify(json), 'utf8', function (err) {
      if (err) {
        logger.log('error', err);
        process.exit(1);
      }
      logger.log('info', 'The file was saved!');
    });
  });
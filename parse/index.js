const fs             = require('fs');
const StandupParser  = require('standup-parser').StandupParser;
const Logger         = require('logger').Logger;

const logger         = new Logger;

const getFileName    = require('./parser-methods').getFileName;

const inputFileName = getFileName(`${__dirname}/input`);
const inputFilePath = `${__dirname}/input/${inputFileName}.txt`;

const args = process.argv? process.argv.slice(2) : null;

const standupParser  = new StandupParser;
standupParser.logger.debugLevel = args? args[0] : 'success';

standupParser.parse(inputFilePath)
  .then(json => {
    fs.writeFile(`${__dirname}/../seed/data/stand-ups.json`, JSON.stringify(json), 'utf8', function (err) {
      if (err) {
        logger.log('error', err);
        process.exit(1);
      }
      logger.log('info', 'The file was saved!');
    });
  });

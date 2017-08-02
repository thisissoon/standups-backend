const fs             = require('fs');
const StandupParser  = require('standup-parser').StandupParser;
const getFileName    = require('./parser-methods').getFileName;
const clearFolder    = require('./parser-methods').clearFolder;

const inputFileName = getFileName(`${__dirname}/input`);
const inputFilePath = `${__dirname}/input/${inputFileName}.txt`;

const args = process.argv? process.argv.slice(2) : null;

const standupParser  = new StandupParser;
standupParser.logger.debugLevel = args? args[0] : 'info';

clearFolder(`${__dirname}/output`)
  .then(() => standupParser.parse(inputFilePath))
  .then(json => {
    fs.writeFile(`${__dirname}/output/${inputFileName}.json`, JSON.stringify(json), 'utf8', function (err) {
      if (err) {
        return console.log(err);
      }
      console.log('The file was saved!');
    });
  });

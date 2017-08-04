const sequelize        = require('../db/db.config.js').sequelize;
const saveStaffMembers = require('./staff-members.js').saveStaffMembers;
const saveStandUps     = require('./stand-ups.js').saveStandUps;
const Logger           = require('logger').Logger;
const parserMethods    = require('../parser/parser-methods');

const logger           = new Logger();
logger.debugLevel      = 'success';

const jsonFileName     = parserMethods.getFileName(`${__dirname}/../parser/output`);
const staffMembers     = require('./staff-members.json');
const standUps         = require(`../parser/output/${jsonFileName}`);

sequelize.query('DELETE FROM "Position"')
  .then(sequelize.query('DELETE FROM "Day"'))
  .then(sequelize.query('DELETE FROM "Summary"'))
  .then(sequelize.query('DELETE FROM "StaffMember"'))
  .then(() => saveStaffMembers(staffMembers))
  .then(() => saveStandUps(standUps))
  .then(() => process.exit())
  .catch(err => {
    logger.log('error', err);
    process.exit();
  });
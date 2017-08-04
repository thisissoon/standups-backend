const sequelize = require('../db/db.config.js').sequelize;
const saveStaffMembers = require('./seeders').saveStaffMembers;
const saveStandUps = require('./seeders').saveStandUps;
const Logger = require('logger').Logger;

const logger = new Logger();
logger.debugLevel = 'success';

const staffMembers = require('./data/staff-members.json');
const standUps = require(`./data/stand-ups.json`);

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
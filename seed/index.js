const saveStaffMembers = require('./seeders').saveStaffMembers;
const saveStandUps = require('./seeders').saveStandUps;
const Logger = require('logger').Logger;

const logger = new Logger();
logger.debugLevel = 'success';

const staffMembers = require('./data/staff-members.json');
const standUps = require(`./data/stand-ups.json`);

saveStaffMembers(staffMembers)
  .then(() => saveStandUps(standUps))
  .then(() => process.exit())
  .catch(err => {
    logger.log('error', err);
    process.exit();
  });
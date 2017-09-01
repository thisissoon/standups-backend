const saveStaffMembers = require('./seeders').saveStaffMembers;
const saveStandUps = require('./seeders').saveStandUps;

const logger = require('../../logger').logger;

const staffMembers = require('./data/staff-members.json');
const standUps = require(`./data/stand-ups.json`);

saveStaffMembers(staffMembers)
  .then(() => {
    logger.log('info', 'staff saved');
    return saveStandUps(standUps);
  })
  .then(() => process.exit())
  .catch(err => {
    logger.log('error', err);
    process.exit();
  });
const config = require('../../config/config')[process.env.MODE || 'dev'];
const saveStaffMembers = require('./staff-members').saveStaffMembers;
const saveStandUps = require('./stand-ups').saveStandUps;

const logger = require('../../logger').logger;

const staffMembers = require(`../../data/${config.data}/staff-members.json`);
const standUps = require(`../../data/${config.data}/stand-ups.json`);

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